import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <header className="site-header on-ink">
        <div className="wrap bar">
          <Link className="brand" href="/">
            Antonio Alforque
          </Link>
          <Link className="btn btn-accent" href="/inquire">
            Inquire
          </Link>
        </div>
      </header>
      <main className="hero on-ink" style={{ paddingBottom: 96 }}>
        <div className="wrap">
          <p className="label" style={{ color: "#A8A8A8", marginBottom: 16 }}>
            404
          </p>
          <h1>This page isn’t live.</h1>
          <div className="hero-actions">
            <Link className="btn btn-accent" href="/">
              Back to work
            </Link>
            <Link className="btn btn-ghost" href="/inquire">
              Start a project
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
