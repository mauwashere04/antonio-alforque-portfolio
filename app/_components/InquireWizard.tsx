"use client";

import { useState, type FormEvent } from "react";

/** Real GoHighLevel Strategy Call widget. No answers or contact details are ever added to this URL. */
const BOOKING_URL = "https://api.leadconnectorhq.com/widget/bookings/tul-id-strategy-call";

type Choice = readonly [value: string, label: string, sub: string];
type ChoiceKey = "who" | "need" | "budget";

type Answers = {
  who: string;
  need: string;
  budget: string;
  name: string;
  email: string;
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

export default function InquireWizard() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    who: "",
    need: "",
    budget: "",
    name: "",
    email: "",
    company: "",
    note: "",
  });
  const [error, setError] = useState("");

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

  const onContact = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameBad || emailBad) {
      setError("Name and a valid email, please.");
      return;
    }
    setAnswers((a) => ({ ...a, name: a.name.trim(), email: a.email.trim(), company: a.company.trim(), note: a.note.trim() }));
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
              <span className="k">{String.fromCharCode(65 + k)}</span>
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
        <iframe className="book-frame" src={BOOKING_URL} title="Strategy Call" />
        <p className="note">20-minute Strategy Call · Asia/Manila. Booking runs in GoHighLevel.</p>
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
        <h1>{TITLES[step - 1]}</h1>
        <p className="sub">{SUBS[step - 1]}</p>
        {body}
      </section>
    </main>
  );
}
