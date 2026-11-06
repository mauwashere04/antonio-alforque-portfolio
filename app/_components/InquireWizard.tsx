"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

/** Real GoHighLevel Strategy Call widget. No answers or contact details are ever added to this URL. */
const BOOKING_URL = "https://api.leadconnectorhq.com/widget/bookings/tul-id-strategy-call";

/** Only target for postMessage prefill. Never "*". */
const ORIGIN = "https://api.leadconnectorhq.com";

type Choice = readonly [value: string, label: string, sub: string];
type ChoiceKey = "who" | "need" | "budget";

type Answers = {
  who: string;
  need: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  note: string;
};

const TITLES = [
  "Who\u2019s reaching out?",
  "What do you need?",
  "Rough budget?",
  "How do I reach you?",
  "Pick a time",
];

const STEP_NAMES = ["Who you are", "What you need", "Budget range", "Contact", "Pick a time"];

const SUBS = [
  "Step 1 of 5 \u2014 so I know how to answer.",
  "Step 2 of 5 \u2014 pick the closest fit.",
  "Step 3 of 5 \u2014 ranges only. Helps me scope honestly.",
  "Step 4 of 5 \u2014 then we pick a time.",
  "Step 5 of 5 \u2014 choose a day and time below.",
];

const CHOICES: Record<ChoiceKey, Choice[]> = {
  who: [
    ["hiring", "Hiring manager / recruiter", "Evaluating for a role or contract"],
    ["client", "Client / founder", "Need a site, store, or GHL funnel"],
    ["agency", "Agency partner", "Overflow build or white\u2011label"],
    ["other", "Something else", "Plugin question, collaboration, or a chat"],
  ],
  need: [
    ["site", "Marketing website", "WordPress / custom"],
    ["shop", "E\u2011commerce", "Shopify or WooCommerce"],
    ["ghl", "GoHighLevel funnel", "Leads, booking, SMS"],
    ["custom", "Custom system / plugin", "Internal tools, WordPress plugins"],
    ["hire", "Hiring conversation", "Role fit, stack, availability"],
    ["unsure", "Not sure yet", "Talk it through first"],
  ],
  budget: [
    ["u2", "Under $2k", "Small page or fix"],
    ["2-5", "$2k \u2013 $5k", "Typical site or funnel"],
    ["5-15", "$5k \u2013 $15k", "Store or multi\u2011page system"],
    ["15p", "$15k+", "Larger build or retainer"],
    ["hire", "Salary / contract rate", "Hiring path"],
    ["unsure", "Not sure yet", "We can figure it out"],
  ],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const E164_RE = /^\+[1-9]\d{7,14}$/;

/** Phone starts with the Philippines country code; the visitor types the rest. */
const DEFAULT_PHONE = "+63 ";

/**
 * Normalize to E.164. A trunk "0" right after the country code is dropped
 * ("+63 0917..." -> "+63917..."). Input without a "+" is read as a Philippine number.
 */
function normalizePhone(raw: string): string {
  const input = raw.trim().replace(/^00/, "+");
  const digits = input.replace(/\D/g, "");
  if (!digits) return "";

  if (input.startsWith("+")) {
    // 63 is unambiguous; for other codes, use the digit group the visitor separated ("+44 0207...").
    const cc = digits.startsWith("63") ? "63" : (input.match(/^\+\s*(\d{1,3})(?=[\s().-])/)?.[1] ?? "");
    return `+${cc}${digits.slice(cc.length).replace(/^0/, "")}`;
  }
  if (digits.startsWith("0")) return `+63${digits.slice(1)}`;
  if (digits.startsWith("63")) return `+63${digits.slice(2).replace(/^0/, "")}`;
  return `+63${digits}`;
}

export default function InquireWizard() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    who: "",
    need: "",
    budget: "",
    name: "",
    email: "",
    phone: DEFAULT_PHONE,
    company: "",
    note: "",
  });
  const [error, setError] = useState("");

  // Step-5 prefill via the widget's postMessage handshake. Values never go in the iframe URL.
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const answersRef = useRef(answers);
  const timers = useRef(new Set<number>());
  const initialSent = useRef(false);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const sendPrefill = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const { name, email, phone } = answersRef.current;
    const [first, ...rest] = (name || "").trim().split(/\s+/).filter(Boolean);
    iframe.contentWindow?.postMessage(
      [
        "query-params",
        {
          full_name: name,
          first_name: first || "",
          last_name: rest.join(" "),
          email,
          phone,
        },
        `${location.origin}${location.pathname}`,
        "",
      ],
      ORIGIN,
    );
  }, []);

  const prefillSoon = useCallback(() => {
    const id = window.setTimeout(() => {
      timers.current.delete(id);
      sendPrefill();
    }, 300);
    timers.current.add(id);
  }, [sendPrefill]);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((id) => window.clearTimeout(id));
      pending.clear();
    };
  }, []);

  // Reply to every handshake request from the widget.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGIN) return;
      if (e.source !== iframeRef.current?.contentWindow) return;
      if (!Array.isArray(e.data) || e.data[0] !== "fetch-query-params") return;
      prefillSoon();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [prefillSoon]);

  // Proactive prefill: once per visit to step 5.
  useEffect(() => {
    if (step !== 5) {
      initialSent.current = false;
      return;
    }
    if (initialSent.current) return;
    initialSent.current = true;
    prefillSoon();
  }, [step, prefillSoon]);

  // Move keyboard focus to the new step's heading (not on first render).
  const headingRef = useRef<HTMLHeadingElement>(null);
  const prevStep = useRef(step);
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    headingRef.current?.focus();
  }, [step]);

  const set = (key: keyof Answers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    if (error) setError("");
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  };
  const next = () => setStep((s) => Math.min(5, s + 1));

  const nameBad = !answers.name.trim();
  const emailBad = !EMAIL_RE.test(answers.email.trim());
  const phoneNormalized = normalizePhone(answers.phone);
  const phoneBad = !E164_RE.test(phoneNormalized);

  const onContact = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameBad || emailBad || phoneBad) {
      setError("Name, a valid email and a valid phone number, please.");
      return;
    }
    setAnswers((a) => ({
      ...a,
      name: a.name.trim(),
      email: a.email.trim(),
      phone: phoneNormalized,
      company: a.company.trim(),
      note: a.note.trim(),
    }));
    next();
  };

  const nav = (canContinue: boolean, submit = false) => (
    <div className="inq-nav">
      {step > 1 ? (
        <button type="button" className="btn btn-ghost" onClick={back}>
          Back
        </button>
      ) : (
        <span />
      )}
      {step < 5 && (
        <button
          type={submit ? "submit" : "button"}
          className="btn btn-accent"
          disabled={!canContinue}
          onClick={submit ? undefined : next}
        >
          Continue →
        </button>
      )}
    </div>
  );

  const choices = (key: ChoiceKey) => (
    <>
      <div className="choices">
        {CHOICES[key].map(([value, label, sub], k) => {
          const on = answers[key] === value;
          return (
            <button
              type="button"
              key={value}
              className={`choice${on ? " is-on" : ""}`}
              aria-pressed={on}
              onClick={() => set(key, value)}
            >
              <span className="k" aria-hidden="true">
                {String.fromCharCode(65 + k)}
              </span>
              <strong>{label}</strong>
              <small>{sub}</small>
            </button>
          );
        })}
      </div>
      {nav(Boolean(answers[key]))}
    </>
  );

  let body: React.ReactNode;
  if (step <= 3) {
    body = choices((["who", "need", "budget"] as const)[step - 1]);
  } else if (step === 4) {
    body = (
      <form noValidate onSubmit={onContact}>
        <div className="fields">
          <label>
            Name
            <input
              value={answers.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              required
              aria-invalid={error ? nameBad : undefined}
              aria-describedby={error ? "contact-error" : undefined}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={answers.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              required
              aria-invalid={error ? emailBad : undefined}
              aria-describedby={error ? "contact-error" : undefined}
            />
          </label>
          <label className="full">
            Phone
            <input
              type="tel"
              inputMode="tel"
              value={answers.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+63 917 123 4567"
              autoComplete="tel"
              required
              aria-invalid={error ? phoneBad : undefined}
              aria-describedby={error ? "contact-error" : undefined}
            />
          </label>
          <label className="full">
            Company <em>(optional)</em>
            <input
              value={answers.company}
              onChange={(e) => set("company", e.target.value)}
              placeholder="Company or brand"
              autoComplete="organization"
            />
          </label>
          <label className="full">
            Note <em>(optional)</em>
            <textarea
              rows={3}
              value={answers.note}
              onChange={(e) => set("note", e.target.value)}
              placeholder="Role, deadline, a link — anything useful"
            />
          </label>
        </div>
        {error && (
          <p className="form-error" id="contact-error" role="alert">
            {error}
          </p>
        )}
        {nav(true, true)}
      </form>
    );
  } else {
    body = (
      <>
        <iframe ref={iframeRef} className="book-frame" src={BOOKING_URL} title="Strategy Call" />
        <p className="note">30-minute Strategy Call · Asia/Manila. Booking runs in GoHighLevel.</p>
        {nav(false)}
      </>
    );
  }

  return (
    <main className="inq-main">
      <aside className="inq-side on-ink">
        <p className="label" style={{ color: "#A8A8A8" }}>
          Inquire · about two minutes
        </p>
        <div className="big num">
          {step}
          <span>/5</span>
        </div>
        <h2>{TITLES[step - 1]}</h2>
        <p>Hiring managers and clients both start here. Calendar comes last.</p>
        <ol className="inq-steps">
          {STEP_NAMES.map((name, k) => (
            <li key={name} className={k < step - 1 ? "done" : k === step - 1 ? "now" : undefined}>
              {name}
            </li>
          ))}
        </ol>
      </aside>
      <section className="inq-panel">
        <div className="bar">
          <i style={{ width: `${step * 20}%` }} />
        </div>
        <h1 ref={headingRef} tabIndex={-1}>
          {TITLES[step - 1]}
        </h1>
        <p className="sub">{SUBS[step - 1]}</p>
        {body}
      </section>
    </main>
  );
}
