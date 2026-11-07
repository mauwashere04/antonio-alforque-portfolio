import type { MetadataRoute } from "next";
import { SITE_URL as ORIGIN } from "./_data/site";


// Required for metadata routes when next.config uses output: "export".
export const dynamic = "force-static";


export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${ORIGIN}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${ORIGIN}/inquire`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
}
