/**
 * Per-city landing page content for local SEO. Each entry needs distinct,
 * factual local flavor (not just the city name swapped in a template) so
 * these pages read as genuinely about that town rather than duplicate
 * content spun off /service-areas.
 */

export interface CityPage {
  slug: string;
  name: string;
  /** Short line under the H1 — what kind of area/community this is. */
  tagline: string;
  /** 2-3 sentence intro paragraph with real local flavor. */
  blurb: string;
}

export const CITY_PAGES: CityPage[] = [
  {
    slug: "tyler",
    name: "Tyler",
    tagline: "Our home base — the Rose City",
    blurb:
      "Tyler is home base for Call Me Gone Junk Removal, so it's usually where we can move fastest. We've cleared garages, estates, and yards all over town, and if you're in Tyler there's a good chance we can be at your door the same day you call.",
  },
  {
    slug: "bullard",
    name: "Bullard",
    tagline: "Lake Palestine's quiet neighbor",
    blurb:
      "Bullard's mix of lakeside and rural properties means our jobs here run the gamut — sheds, boat house cleanouts, yard debris after a storm. We bring a crew ready for bigger loads, wherever the property sits.",
  },
  {
    slug: "whitehouse",
    name: "Whitehouse",
    tagline: "Fast-growing Tyler suburb",
    blurb:
      "Whitehouse has grown fast, and growth means moving trucks, remodels, and garages that quietly fill up with the last owner's leftovers. We're a regular in the newer neighborhoods, helping folks start fresh or finally clear things out.",
  },
  {
    slug: "flint",
    name: "Flint",
    tagline: "Acreage and lake-country properties",
    blurb:
      "Flint's larger acreage lots mean jobs here often span more than one building — a garage, a shed, maybe an old barn. We bring a truck big enough to take it all in one trip.",
  },
  {
    slug: "palestine",
    name: "Palestine",
    tagline: "Anderson County's historic seat",
    blurb:
      "Palestine's older homes and long-settled neighborhoods mean we see a lot of estate cleanouts and inherited-property jobs here. We handle those with the same care we'd want for our own family's home.",
  },
  {
    slug: "lindale",
    name: "Lindale",
    tagline: "Antiques, growth, and I-20 access",
    blurb:
      "Lindale's a mix of long-time residents and newer subdivisions, and our jobs reflect that — everything from a single furniture pickup to a full garage-to-attic cleanout.",
  },
  {
    slug: "jacksonville",
    name: "Jacksonville",
    tagline: "Cherokee County's Tomato Capital",
    blurb:
      "Jacksonville sits a bit further out, but it's well within our regular service loop. We handle farmhouse cleanouts, old appliances, and property-clearing debris out this way just like we would closer to home.",
  },
  {
    slug: "rusk",
    name: "Rusk",
    tagline: "Historic depot town, Cherokee County seat",
    blurb:
      "Rusk's older homes and larger rural properties mean estate cleanouts and multi-generation garage purges are common calls out here. We bring the crew and truck space to clear it in one visit.",
  },
  {
    slug: "longview",
    name: "Longview",
    tagline: "Gregg County's commercial hub",
    blurb:
      "Longview's busier than most of our service area, with more commercial and construction work mixed in alongside residential cleanouts. We handle both — job-site debris just as readily as a full house cleanout.",
  },
  {
    slug: "kilgore",
    name: "Kilgore",
    tagline: "Home of the World's Richest Acre",
    blurb:
      "Kilgore's long-established neighborhoods tend to hold onto things for decades. We've cleared garages and estates all over town, old streets and new.",
  },
];

export function getCityPage(slug: string): CityPage | undefined {
  return CITY_PAGES.find((c) => c.slug === slug);
}
