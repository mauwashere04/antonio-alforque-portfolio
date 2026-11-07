import type { Metadata } from "next";
import Link from "next/link";
import Carousel from "./_components/Carousel";
import LiveMarquee from "./_components/LiveMarquee";
import ProjectIndex from "./_components/ProjectIndex";
import { carouselProjects, heroFrames, indexProjects, publicProjects } from "./_data/projects";

/** 1×1 transparent GIF: a <source> for the range where a frame is display:none, so it never downloads. */
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export const metadata: Metadata = {
  title: "Antonio Alforque — Live sites, not case-study theatre",
  description:
    "Web developer in Manila. 51 projects — WordPress, Shopify, custom systems and GoHighLevel — shown as live URLs.",
  openGraph: {
    title: "Antonio Alforque — Live sites, not case-study theatre",
    description:
      "Web developer in Manila. 51 projects — WordPress, Shopify, custom systems and GoHighLevel — shown as live URLs.",
  },
};

export default function Home() {
  return (
    <>
      <header className="site-header on-ink">
        <div className="wrap bar">
          <Link className="brand" href="/">
            Antonio Alforque<small>Web developer · Manila</small>
          </Link>
          <nav className="nav" aria-label="Primary">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <Link className="btn btn-accent" href="/inquire">
              Inquire
            </Link>
          </nav>
          <Link className="btn btn-accent nav-mobile" href="/inquire">
            Inquire
          </Link>
        </div>
      </header>

      <main>
        <section className="hero on-ink" aria-labelledby="hero-h">
          <div className="wrap">
            <h1 id="hero-h">
              <span className="live-word">Live</span> sites, <span className="soft">not case&#8209;study theatre.</span>
            </h1>
            <div className="hero-row">
              <p className="lead">
                I build WordPress, Shopify and GoHighLevel work — and every project here ends in a URL you can open
                right now.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-accent" href="/inquire">
                  Start a project
                </Link>
                <a className="btn btn-ghost" href="#work">
                  See 51 projects
                </a>
              </div>
              <ul className="audience">
                <li>
                  <b>Hiring?</b>
                  <span>Click any frame. The code is in production, not a Figma file.</span>
                </li>
                <li>
                  <b>Need a site?</b>
                  <span>Five questions, then a 30-minute call.</span>
                </li>
              </ul>
              <div className="collage" aria-label="Selected live client sites">
                {heroFrames.map((f) => (
                  <figure className={`frame ${f.cls}`} key={f.cls}>
                    <a
                      href={f.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${f.name} (opens live site in a new tab)`}
                    >
                      <div className="chrome">
                        <span>{f.chrome}</span>
                        <span>↗</span>
                      </div>
                      {f.live && <span className="live">Live</span>}
                      <picture>
                        {f.hideBelow > 0 && <source media={`(max-width:${f.hideBelow}px)`} srcSet={BLANK} />}
                        <source
                          type="image/webp"
                          srcSet={`/captures/${f.img}-800.webp 800w, /captures/${f.img}-1600.webp 1600w`}
                          sizes={f.sizes}
                        />
                        <img
                          src={`/captures/${f.img}.png`}
                          alt={`${f.name} — live homepage`}
                          width={1280}
                          height={800}
                          loading={f.cls === "f1" ? "eager" : "lazy"}
                          fetchPriority={f.cls === "f1" ? "high" : undefined}
                          decoding={f.cls === "f1" ? undefined : "async"}
                        />
                      </picture>
                    </a>
                    <figcaption className="sr-only">{f.name}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <LiveMarquee items={publicProjects} />
          </div>
        </section>

        <section className="featured" id="featured" aria-labelledby="feat-h">
          <div className="wrap">
            <div className="featured-head">
              <p className="label">Featured build</p>
              <p className="label num">01 / 51</p>
            </div>
            <div className="featured-grid">
              <a
                className="featured-media"
                href="https://marewear.ph/"
                target="_blank"
                rel="noopener"
                aria-label="MARE homepage (opens live site)"
              >
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/captures/mare-wear-800.webp 800w, /captures/mare-wear-1280.webp 1280w"
                    sizes="(max-width:1024px) 92vw, 720px"
                  />
                  <img
                    src="/captures/mare-wear.png"
                    alt="MARE homepage — editorial lookbook storefront"
                    width={1280}
                    height={800}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </a>
              <div>
                <h2 id="feat-h">
                  MARE — <em>contemporary</em> RTW on Shopify
                </h2>
                <p>
                  Editorial storefront for a Manila fashion label. Lookbook photography up front, a short product path,
                  and a brand voice that stays intimate without slowing checkout.
                </p>
                <dl className="meta">
                  <dt>Stack</dt>
                  <dd>Shopify</dd>
                  <dt>Role</dt>
                  <dd>Build</dd>
                  <dt>Status</dt>
                  <dd>Live</dd>
                </dl>
                <a className="visit" href="https://marewear.ph/" target="_blank" rel="noopener">
                  Visit marewear.ph ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="work" id="work" aria-labelledby="work-h">
          <div className="wrap">
            <Carousel items={carouselProjects} />
          </div>
        </section>

        <section className="index" id="index" aria-labelledby="idx-h">
          <div className="wrap">
            <ProjectIndex items={indexProjects} />
          </div>
        </section>

        <section className="services on-ink" id="services" aria-labelledby="svc-h">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="label" style={{ color: "#A8A8A8" }}>
                  Services
                </p>
                <h2 id="svc-h">What I ship</h2>
              </div>
              <p>Four things, done to a public URL.</p>
            </div>
            <ol className="svc-list">
              <li className="svc">
                <span className="n num">01</span>
                <h3>WordPress &amp; Shopify sites</h3>
                <p>Marketing sites, stores and content systems with a clean handoff your team can edit.</p>
              </li>
              <li className="svc">
                <span className="n num">02</span>
                <h3>GoHighLevel funnels</h3>
                <p>Lead capture, booking, SMS and email workflows — a working demo first, then production.</p>
              </li>
              <li className="svc">
                <span className="n num">03</span>
                <h3>Custom plugins &amp; systems</h3>
                <p>Appointment tools, event ticketing, SMTP logging and internal apps.</p>
              </li>
              <li className="svc">
                <span className="n num">04</span>
                <h3>E&#8209;commerce &amp; brand builds</h3>
                <p>From fashion lookbooks to B2B catalogues — launched, not left in staging.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="about" id="about" aria-labelledby="about-h">
          <div className="wrap about-grid">
            <div>
              <p className="label">About</p>
              <h2 id="about-h">One developer. Two kinds of reader.</h2>
              <p>
                <strong>Hiring managers:</strong> WordPress, Shopify, PHP/JS and GoHighLevel, with public proof you can
                open — not a private trail of mockups.
              </p>
              <p>
                <strong>Clients:</strong> a builder who finishes. Site live, funnel booking, plugins working. Based in
                Manila; working with teams in the Philippines, Singapore and remote.
              </p>
              <p>
                Also building under TUL&#8209;ID — demos and client systems with the same bias toward shipped URLs.
              </p>
            </div>
            <div className="stats">
              <div className="stat">
                <b className="num">{indexProjects.length}</b>
                <span>Projects in the index above</span>
              </div>
              <div className="stat">
                <b className="num">{indexProjects.filter((p) => p.href).length}</b>
                <span>With a public URL you can click</span>
              </div>
              <div className="stat">
                <b className="num">4</b>
                <span>
                  WordPress plugins,{" "}
                  <a href="https://smmooth.com/" target="_blank" rel="noopener">
                    on smmooth.com
                  </a>{" "}
                  + bricksable.com
                </span>
              </div>
              <div className="stat">
                <b className="num">{indexProjects.filter((p) => !p.href).length}</b>
                <span>Private builds, listed without links</span>
              </div>
            </div>
          </div>
        </section>

        <section className="inq-band" id="inquire">
          <div className="wrap inner">
            <div>
              <h2>Tell me what you’re shipping.</h2>
              <p>Five short questions, calendar last. About two minutes.</p>
            </div>
            <Link className="btn" href="/inquire">
              Start inquire →
            </Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap foot">
          <div>
            <strong>Antonio Alforque</strong>
            <br />
            Websites, stores &amp; GHL systems · Manila
          </div>
          <div>
            <a href="mailto:mauricealforque@gmail.com">mauricealforque@gmail.com</a>
            <br />
            <a href="https://linkedin.com/in/antonio-alforque" target="_blank" rel="noopener">
              LinkedIn
            </a>{" "}
            ·{" "}
            <a href="https://wa.me/639150157123" target="_blank" rel="noopener">
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
