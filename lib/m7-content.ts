/**
 * Content used by the M7 redesign. Every fact here already exists on the
 * current site (lib/site.ts, lib/pricing.ts, app/service-areas/page.tsx,
 * FAQ copy). Nothing new is claimed. Photo pairings are layout choices only.
 */
import { SERVICES } from "@/lib/site";

/** Same ZIP list the current /service-areas page publishes. TODO(launch): verify with Gus. */
export const SERVICE_ZIPS = [
  "75701", "75702", "75703", "75704", "75705", "75707", "75708", "75709",
  "75750", "75757", "75766", "75771", "75785", "75662", "75601", "75603",
] as const;

/** Photos in /public/photos (plus one stock placeholder), mapped onto the six services. */
const SERVICE_PHOTOS: Record<string, { src: string; alt: string; service: string }> = {
  "Junk Removal & Haul Off": {
    // Stock placeholder (Pexels #7464681, RDNE Stock project). Swap for a real job photo.
    src: "/photos/stock/haul-off-mover.jpg",
    alt: "Mover carrying a couch out of a home for haul-off",
    service: "Other / Not Sure",
  },
  "Full-Service Clean Outs": {
    src: "/photos/garage-before.png",
    alt: "Packed garage before a cleanout",
    service: "Garage / Attic Cleanout",
  },
  "Furniture & Appliance Removal": {
    src: "/photos/storage-before.png",
    alt: "Furniture and boxes waiting to be hauled off",
    service: "Furniture Removal",
  },
  "Construction & Yard Debris": {
    src: "/photos/yard-before.png",
    alt: "Yard covered in branches and debris before haul-away",
    service: "Yard Waste",
  },
  "Storage Units & Estate Cleanouts": {
    src: "/photos/storage-after.png",
    alt: "Storage unit emptied and swept after a cleanout",
    service: "Storage / Shed Cleanout",
  },
  "Residential & Commercial": {
    src: "/photos/garage-after.png",
    alt: "Garage cleared out after a cleanout",
    service: "Other / Not Sure",
  },
};

export const SERVICE_CARDS = SERVICES.map((s) => ({
  title: s.title,
  description: s.description,
  ...SERVICE_PHOTOS[s.title],
}));

/** Load-size estimator. Prices map ONLY onto lib/pricing.ts tiers. */
export const LOAD_STEPS = [
  { short: "Single", label: "Single Item", fill: 10, price: "$50", prefix: "Starting at", count: 50, examples: "A mattress, couch, fridge, or other single piece.", hint: "Single item" },
  { short: "1/4", label: "Quarter Trailer", fill: 25, price: "$175", prefix: "Starting at", count: 175, examples: "A quarter load in our 14-foot dump trailer.", hint: "About a 1/4 trailer load" },
  { short: "1/2", label: "Half Trailer", fill: 50, price: "$175", prefix: "Starting at", count: 175, examples: "A half load: a garage or room's worth of junk.", hint: "About a 1/2 trailer load" },
  { short: "3/4", label: "3/4 Trailer", fill: 75, price: "Call", prefix: "For an exact quote", count: 0, examples: "More than a half load, less than full. We'll price it with you.", hint: "About a 3/4 trailer load" },
  { short: "Full", label: "Full Trailer", fill: 100, price: "$750", prefix: "Up to", count: 750, examples: "A full 14-foot trailer: full cleanouts, estate jobs, major debris hauls.", hint: "Full trailer load" },
] as const;

/** Items for the "what we take" picker. Wording comes from existing site copy. */
export const PICK_ITEMS = [
  "Couch / sofa", "Mattress", "Fridge", "Washer & dryer", "Furniture", "Appliances",
  "Boxes & household junk", "Garage clutter", "Attic clutter", "Basement clutter",
  "Shed contents", "Storage unit contents", "Estate contents", "Construction debris",
  "Branches & brush", "Storm cleanup", "Porch or deck removal", "Eviction cleanout",
] as const;

export const WHY_US = [
  { key: "fast", title: "Fast Scheduling", description: "Need it gone fast? Call early and we'll do our best to fit you in the same day." },
  { key: "free", title: "Free, No-Obligation Estimates", description: "Honest, upfront pricing before we lift a thing. No pressure." },
  { key: "local", title: "Locally Owned & Operated", description: "A trusted East Texas neighbor, not a faceless franchise." },
  { key: "recycle", title: "Responsible Disposal", description: "We donate and recycle whatever we can to keep it out of the landfill." },
] as const;
