import type { Metadata } from "next";
import Link from "next/link";
import InquireWizard from "../_components/InquireWizard";

export const metadata: Metadata = {
  title: { absolute: "Inquire — Antonio Alforque" },
  description: "Start a web project with Antonio Alforque: WordPress, Shopify, GoHighLevel or a custom build. Four quick steps.",
  alternates: { canonical: "/inquire" },
  openGraph: {
    url: "/inquire",
    title: "Inquire — Antonio Alforque",
    description: "Start a web project with Antonio Alforque: WordPress, Shopify, GoHighLevel or a custom build.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
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
