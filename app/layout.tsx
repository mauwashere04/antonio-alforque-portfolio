import type { Metadata } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import "./globals.css";
import Analytics from "./_components/Analytics";
import { GSC_VERIFICATION, SITE_NAME, SITE_URL } from "./_data/site";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-public-sans",
});

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Web Developer",
  description: "Web developer in Manila building WordPress, Shopify, GoHighLevel and custom web systems.",
  address: { "@type": "PostalAddress", addressLocality: "Manila", addressCountry: "PH" },
  knowsAbout: ["WordPress", "Shopify", "GoHighLevel", "Next.js", "Web development"],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: ["web developer Manila", "WordPress developer Philippines", "Shopify developer", "GoHighLevel builder", "Next.js developer", "Antonio Alforque"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_PH",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Antonio Alforque, web developer in Manila" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${publicSans.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <Analytics />
      </body>
    </html>
  );
}
