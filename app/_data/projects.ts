export type Shot = "img" | "pending" | "private" | "none";

export type Project = {
  slug: string;
  name: string;
  /** Live URL; omitted for private builds. */
  href?: string;
  /** img = thumb at /captures/thumbs/{slug}.png; pending/private = typographic stand-in; none = empty quiet row. */
  shot: Shot;
  /** Quiet text-led row (plugins). */
  quiet?: boolean;
};

/** "https://www.colex.com.sg/" -> "colex.com.sg" */
export function urlLabel(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export const thumb = (slug: string) => `/captures/thumbs/${slug}.png`;

/** Index entries 02–37 (MARE is 01, Featured only). Order is the display order. */
export const indexProjects: Project[] = [
  { slug: "hue-snackable-moods", name: "Hue Snackable Moods", href: "https://findmyhue.com/", shot: "img" },
  { slug: "colex-holdings", name: "Colex Holdings", href: "https://www.colex.com.sg/", shot: "img" },
  { slug: "paracrine", name: "Paracrine Therapeutics", href: "https://www.paracrinetherapeutics.com/", shot: "img" },
  { slug: "doob-bean-bags", name: "Doob Bean Bags", href: "https://getdoob.com/", shot: "img" },
  { slug: "wearnes-starchase", name: "Wearnes Starchase", href: "https://wearnes-starchase.com/", shot: "img" },
  { slug: "greystone-advisory", name: "Greystone Advisory", href: "https://greystone.com.sg/", shot: "img" },
  { slug: "qualitees", name: "Qualitees Printing Studio", href: "https://www.qualiteesprintingstudio.com/", shot: "img" },
  { slug: "diot-siaci", name: "Diot Siaci", href: "https://asia.diot-siaci.com/", shot: "img" },
  { slug: "cambridge-cares", name: "Cambridge Cares", href: "https://www.cares.cam.ac.uk/", shot: "img" },
  { slug: "kettle-creek-hvac", name: "Kettle Creek HVAC", href: "https://demos.tul-id.com/hvac", shot: "img" },
  { slug: "smmile", name: "Smmile", href: "https://smmile.com/", shot: "img" },
  { slug: "go-fitness-gear", name: "Go Fitness Gear", href: "https://gofitnessgear.com/", shot: "img" },
  { slug: "jp-pepperdine", name: "JP Pepperdine", href: "https://www.jppepperdine.com/", shot: "img" },
  { slug: "el-vistra-hotel", name: "El Vistra Hotel", href: "https://elvistrahotelangelescity.com/", shot: "img" },
  { slug: "declarators", name: "Declarators", href: "https://declarators.com.sg/", shot: "img" },
  { slug: "bhavinis-law", name: "Bhavini's Law Practice", href: "https://bhavinislawpractice.com/", shot: "img" },
  { slug: "sunny-dental", name: "Sunny Dental Medical Supply", href: "https://sunnydms.com/", shot: "img" },
  { slug: "universal-employment", name: "Universal Employment Agency", href: "https://universalmaidagency.com/", shot: "img" },
  { slug: "jeans-wild-heart", name: "Jean's Wild Heart", href: "https://jeanswildheart.com/", shot: "img" },
  { slug: "pet-care-medic", name: "Pet Care Medic", href: "https://petcaremedic.org/", shot: "img" },
  { slug: "yellow-ribbon-cares", name: "Yellow Ribbon Cares", href: "https://yrcares.org.sg/", shot: "img" },
  { slug: "manila-football-lab", name: "Manila Football Lab", href: "https://manilafootballlab.netlify.app/", shot: "img" },
  { slug: "marano-furniture", name: "Marano Furniture", href: "https://maranofurniture.com/marano-living/", shot: "img" },
  { slug: "classic-furniture", name: "Classic Furniture", href: "https://classicfurniture.sg/", shot: "pending" },
  { slug: "decor-arts", name: "Decor Arts", href: "https://decorarts.com.sg/", shot: "img" },
  { slug: "voam", name: "Voam", href: "https://voam.co/", shot: "img" },
  { slug: "allied-telesis", name: "Allied Telesis", href: "https://www.alliedtelesis.com/", shot: "img" },
  { slug: "the-digital-banker", name: "The Digital Banker", href: "https://thedigitalbanker.com/", shot: "img" },
  { slug: "global-private-banker", name: "Global Private Banker", href: "https://globalprivatebanker.net/", shot: "img" },
  { slug: "idp", name: "IDP System", shot: "private" },
  { slug: "sme-chatbot", name: "SME Chatbot", shot: "private" },
  { slug: "cgl-demo", name: "CGL Demo Homepage", shot: "private" },
  { slug: "bricksable", name: "Bricksable", href: "https://bricksable.com/", shot: "img", quiet: true },
  { slug: "calboy", name: "Calboy Appointment Scheduler", href: "https://smmooth.com/product/calboy-appointment-scheduler/", shot: "none", quiet: true },
  { slug: "reggie-event", name: "Reggie Event", href: "https://smmooth.com/product/reggie-event/", shot: "none", quiet: true },
  { slug: "smooth-smtp", name: "Smooth SMTP", href: "https://smmooth.com/product/smooth-smtp/", shot: "none", quiet: true },
];

/** Carousel (12): Hue → Sunny Dental. Hero collage sites and MARE are excluded. */
const carouselSlugs = [
  "hue-snackable-moods",
  "colex-holdings",
  "paracrine",
  "doob-bean-bags",
  "wearnes-starchase",
  "greystone-advisory",
  "qualitees",
  "diot-siaci",
  "cambridge-cares",
  "declarators",
  "bhavinis-law",
  "sunny-dental",
];

export const carouselProjects: Project[] = carouselSlugs.map((slug) => {
  const p = indexProjects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown carousel slug: ${slug}`);
  return p;
});

/** Hero collage: five live frames. On mobile only f1 and f2 show (f3–f5 are hidden via CSS). */
export const heroFrames = [
  { cls: "f1", chrome: "demos.tul-id.com/hvac", img: "kettle-creek-hvac", name: "Kettle Creek HVAC", href: "https://demos.tul-id.com/hvac", live: true },
  { cls: "f2", chrome: "smmile.com", img: "smmile", name: "Smmile", href: "https://smmile.com/", live: false },
  { cls: "f3", chrome: "gofitnessgear.com", img: "go-fitness-gear", name: "Go Fitness Gear", href: "https://gofitnessgear.com/", live: false },
  { cls: "f4", chrome: "jppepperdine.com", img: "jp-pepperdine", name: "JP Pepperdine", href: "https://www.jppepperdine.com/", live: false },
  { cls: "f5", chrome: "elvistrahotelangelescity.com", img: "el-vistra-hotel", name: "El Vistra Hotel", href: "https://elvistrahotelangelescity.com/", live: false },
];

/** Every public project (MARE + index entries that have a live URL), for the "Also live" marquee. */
export const publicProjects: Project[] = [
  { slug: "mare-wear", name: "MARE", href: "https://marewear.ph/", shot: "img" } as Project,
  ...indexProjects,
].filter((p) => p.href);
