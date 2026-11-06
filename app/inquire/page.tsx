import type { Metadata } from "next";
import Link from "next/link";
import InquireWizard from "../_components/InquireWizard";

export const metadata: Metadata = {
  title: "Inquire — Antonio Alforque",
};

export default function InquirePage() {
  return (
    <div className="inq-shell">
      <header className="site-header on-ink">
        <div className="wrap bar">
          <Link className="brand" href="/">
            Antonio Alforque<small>Inquire</small>
          </Link>
          <Link className="btn btn-ghost" href="/" style={{ padding: "10px 16px" }}>
            ← Back to work
          </Link>
        </div>
      </header>
      <InquireWizard />
    </div>
  );
}
