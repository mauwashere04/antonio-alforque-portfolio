export type Shot = "img" | "pending" | "private" | "none";

/** Build platform, verified per site (generator meta / cdn.shopify.com / wp-content / GHL assets). */
export type Platform = "wordpress" | "shopify" | "ghl" | "custom" | "plugin";

/** Client sector, from each site's own homepage copy. */
export type Sector = "retail" | "finance" | "health" | "hospitality" | "industry" | "software";

export type Project = {
  slug: string;
  name: string;
  /** Live URL; omitted for private builds. */
  href?: string;
  /** img = thumb at /captures/thumbs/{slug}.(webp|png); pending/private = typographic stand-in; none = empty quiet row. */
  shot: Shot;
  platform: Platform;
  sector: Sector;
  /** Quiet text-led row (no image). */
  quiet?: boolean;
};

export const platformLabels: Record<Platform, string> = {
  wordpress: "WordPress",
  shopify: "Shopify",
  ghl: "GoHighLevel",
  custom: "Custom build",
  plugin: "Plugins",
};

export const sectorLabels: Record<Sector, string> = {
  retail: "Retail",
  finance: "Finance & services",
  health: "Health & care",
  hospitality: "Hospitality & sport",
  industry: "Industry & tech",
  software: "Software",
};

/** "https://www.colex.com.sg/" -> "colex.com.sg" */
export function urlLabel(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export const thumb = (slug: string) => `/captures/thumbs/${slug}.png`;
export const thumbWebp = (slug: string) => `/captures/thumbs/${slug}.webp`;

/** All 51 projects, 01-51. Order is the display order: best-looking hero first, then private builds, then plugins. */
export const indexProjects: Project[] = [
  { slug: "mare-wear", name: "MARE", href: "https://marewear.ph/", shot: "img", platform: "shopify", sector: "retail" },
  { slug: "marano-furniture", name: "Marano Furniture", href: "https://maranofurniture.com/marano-living/", shot: "img", platform: "wordpress", sector: "retail" },
  { slug: "go-fitness-gear", name: "Go Fitness Gear", href: "https://gofitnessgear.com/", shot: "img", platform: "shopify", sector: "retail" },
  { slug: "classic-furniture", name: "Classic Furniture", href: "https://classicfurniture.sg/", shot: "img", platform: "wordpress", sector: "retail" },
  { slug: "paracrine", name: "Paracrine Therapeutics", href: "https://www.paracrinetherapeutics.com/", shot: "img", platform: "wordpress", sector: "health" },
  { slug: "wearnes-starchase", name: "Wearnes Starchase", href: "https://wearnes-starchase.com/", shot: "img", platform: "wordpress", sector: "retail" },
  { slug: "doob-bean-bags", name: "Doob Bean Bags", href: "https://getdoob.com/", shot: "img", platform: "shopify", sector: "retail" },
  { slug: "greystone-advisory", name: "Greystone Advisory", href: "https://greystone.com.sg/", shot: "img", platform: "wordpress", sector: "finance" },
  { slug: "hue-snackable-moods", name: "Hue Snackable Moods", href: "https://findmyhue.com/", shot: "img", platform: "shopify", sector: "retail" },
  { slug: "cambridge-cares", name: "Cambridge Cares", href: "https://www.cares.cam.ac.uk/", shot: "img", platform: "wordpress", sector: "health" },
  { slug: "declarators", name: "Declarators", href: "https://declarators.com.sg/", shot: "img", platform: "wordpress", sector: "finance" },
  { slug: "colex-holdings", name: "Colex Holdings", href: "https://www.colex.com.sg/", shot: "img", platform: "wordpress", sector: "industry" },
  { slug: "kettle-creek-hvac", name: "Kettle Creek HVAC", href: "https://demos.tul-id.com/hvac", shot: "img", platform: "ghl", sector: "industry" },
  { slug: "kestrel-ridge-roofing", name: "Kestrel Ridge Roofing", href: "https://demos.tul-id.com/roofing", shot: "img", platform: "ghl", sector: "industry" },
  { slug: "halloway-lane-aesthetics", name: "Halloway Lane Aesthetics", href: "https://demos.tul-id.com/medspa", shot: "img", platform: "ghl", sector: "health" },
  { slug: "hollis-row-dental", name: "Hollis Row Dental", href: "https://demos.tul-id.com/dental", shot: "img", platform: "ghl", sector: "health" },
  { slug: "tulid-ghl-landing", name: "TUL-ID Digital", href: "https://go.tul-id.com/", shot: "img", platform: "ghl", sector: "finance" },
  { slug: "voam", name: "Voam", href: "https://voam.co/", shot: "img", platform: "wordpress", sector: "industry" },
  { slug: "el-vistra-hotel", name: "El Vistra Hotel", href: "https://elvistrahotelangelescity.com/", shot: "img", platform: "wordpress", sector: "hospitality" },
  { slug: "diot-siaci", name: "Diot Siaci", href: "https://asia.diot-siaci.com/", shot: "img", platform: "wordpress", sector: "finance" },
  { slug: "universal-employment", name: "Universal Employment Agency", href: "https://universalmaidagency.com/", shot: "img", platform: "wordpress", sector: "finance" },
  { slug: "bhavinis-law", name: "Bhavini's Law Practice", href: "https://bhavinislawpractice.com/", shot: "img", platform: "wordpress", sector: "finance" },
  { slug: "jp-pepperdine", name: "JP Pepperdine", href: "https://www.jppepperdine.com/", shot: "img", platform: "wordpress", sector: "hospitality" },
  { slug: "qualitees", name: "Qualitees Printing Studio", href: "https://www.qualiteesprintingstudio.com/", shot: "img", platform: "custom", sector: "retail" },
  { slug: "smmile", name: "Smmile", href: "https://smmile.com/", shot: "img", platform: "custom", sector: "finance" },
  { slug: "yellow-ribbon-cares", name: "Yellow Ribbon Cares", href: "https://yrcares.org.sg/", shot: "img", platform: "wordpress", sector: "health" },
  { slug: "sunny-dental", name: "Sunny Dental Medical Supply", href: "https://sunnydms.com/", shot: "img", platform: "wordpress", sector: "health" },
  { slug: "vesiderm", name: "Vesiderm", href: "https://vesiderm.com/", shot: "img", platform: "wordpress", sector: "health" },
  { slug: "manila-football-lab", name: "Manila Football Lab", href: "https://manilafootballlab.netlify.app/", shot: "img", platform: "custom", sector: "hospitality" },
  { slug: "jeans-wild-heart", name: "Jean's Wild Heart", href: "https://jeanswildheart.com/", shot: "img", platform: "wordpress", sector: "retail" },
  { slug: "decor-arts", name: "Decor Arts", href: "https://decorarts.com.sg/", shot: "img", platform: "wordpress", sector: "retail" },
  { slug: "pet-care-medic", name: "Pet Care Medic", href: "https://petcaremedic.org/", shot: "img", platform: "wordpress", sector: "health" },
  { slug: "allied-telesis", name: "Allied Telesis", href: "https://www.alliedtelesis.com/", shot: "img", platform: "wordpress", sector: "industry" },
  { slug: "the-digital-banker", name: "The Digital Banker", href: "https://thedigitalbanker.com/", shot: "img", platform: "wordpress", sector: "finance" },
  { slug: "global-private-banker", name: "Global Private Banker", href: "https://globalprivatebanker.net/", shot: "img", platform: "wordpress", sector: "finance" },
  { slug: "sagecollab", name: "SageCollab", href: "https://sagecollab.bevootech.com/", shot: "img", platform: "custom", sector: "software" },
  { slug: "bevootech", name: "Bevootech", href: "https://bevootech.com/", shot: "img", platform: "custom", sector: "industry" },
  { slug: "idp", name: "IDP System", shot: "img", platform: "custom", sector: "software" },
  { slug: "sme-chatbot", name: "SME Chatbot", shot: "img", platform: "custom", sector: "software" },
  { slug: "tagroup", name: "TAGroup", shot: "img", platform: "wordpress", sector: "industry" },
  { slug: "document-management", name: "Document Management System", shot: "img", platform: "custom", sector: "software" },
  { slug: "car-workshop", name: "Car Workshop System", shot: "img", platform: "custom", sector: "industry" },
  { slug: "webman", name: "Webman System", shot: "img", platform: "custom", sector: "software" },
  { slug: "xero-project-tracker", name: "Xero Project Tracker", shot: "img", platform: "custom", sector: "finance" },
  { slug: "fitivate-events", name: "Fitivate Events Manager", shot: "img", platform: "custom", sector: "health" },
  { slug: "material-tracking", name: "Material Tracking System", shot: "img", platform: "custom", sector: "industry" },
  { slug: "cgl-demo", name: "CGL Demo Homepage", href: "https://cgl-demo.netlify.app/", shot: "img", platform: "custom", sector: "industry" },
  { slug: "bricksable", name: "Bricksable", href: "https://bricksable.com/", shot: "img", platform: "plugin", sector: "software" },
  { slug: "calboy", name: "Calboy Appointment Scheduler", href: "https://smmooth.com/product/calboy-appointment-scheduler/", shot: "img", platform: "plugin", sector: "software" },
  { slug: "reggie-event", name: "Reggie Event", href: "https://smmooth.com/product/reggie-event/", shot: "img", platform: "plugin", sector: "software" },
  { slug: "smooth-smtp", name: "Smooth SMTP", href: "https://smmooth.com/product/smooth-smtp/", shot: "img", platform: "plugin", sector: "software" },
];

/** Carousel (12): slot 1 Hue (unchanged), 2 Marano, 3 JP Pepperdine, then the strongest remaining heroes. MARE is excluded (Featured). */
const carouselSlugs = [
  "hue-snackable-moods",
  "marano-furniture",
  "jp-pepperdine",
  "paracrine",
  "wearnes-starchase",
  "classic-furniture",
  "doob-bean-bags",
  "greystone-advisory",
  "cambridge-cares",
  "declarators",
  "colex-holdings",
  "voam",
];

export const carouselProjects: Project[] = carouselSlugs.map((slug) => {
  const p = indexProjects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown carousel slug: ${slug}`);
  return p;
});

/**
 * Hero collage: five live frames. f3 is hidden at ≤720px; f4/f5 are hidden at ≤1024px.
 * `hideBelow` feeds a 1×1 <source> for that range so hidden frames never download their image.
 * `sizes` matches each slot's rendered width (collage ≈ 768px wide at desktop).
 */
export const heroFrames = [
  { cls: "f1", chrome: "demos.tul-id.com/hvac", img: "kettle-creek-hvac", name: "Kettle Creek HVAC", href: "https://demos.tul-id.com/hvac", live: true, sizes: "(max-width:720px) 92vw, (max-width:1024px) 60vw, 461px", hideBelow: 0 },
  { cls: "f2", chrome: "smmile.com", img: "smmile", name: "Smmile", href: "https://smmile.com/", live: false, sizes: "(max-width:720px) 58vw, (max-width:1024px) 38vw, 292px", hideBelow: 0 },
  { cls: "f3", chrome: "gofitnessgear.com", img: "go-fitness-gear", name: "Go Fitness Gear", href: "https://gofitnessgear.com/", live: false, sizes: "(max-width:1024px) 36vw, 276px", hideBelow: 720 },
  { cls: "f4", chrome: "jppepperdine.com", img: "jp-pepperdine", name: "JP Pepperdine", href: "https://www.jppepperdine.com/", live: false, sizes: "207px", hideBelow: 1024 },
  { cls: "f5", chrome: "elvistrahotelangelescity.com", img: "el-vistra-hotel", name: "El Vistra Hotel", href: "https://elvistrahotelangelescity.com/", live: false, sizes: "215px", hideBelow: 1024 },
];

/** Every public project with a live URL, for the "Also live" marquee (34). */
export const publicProjects: Project[] = indexProjects.filter((p) => p.href);
