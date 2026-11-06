import type { MetadataRoute } from "next";

// Required for metadata routes when next.config uses output: "export".
export const dynamic = "force-static";

const ORIGIN = "https://antonioalforque.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${ORIGIN}/` }, { url: `${ORIGIN}/inquire` }];
}
