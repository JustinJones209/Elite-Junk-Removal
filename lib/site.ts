/**
 * Central site configuration — single source of truth for business info,
 * contact details, and content data used across the site.
 *
 * TODO(launch): Swap every value marked "TODO" below with real details
 * before going live (street address, hours, socials).
 */

import type { LucideIcon } from "lucide-react";
import {
  Sofa,
  Home,
  Hammer,
  Warehouse,
  Trash2,
  Building2,
  Zap,
  Handshake,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  PhoneCall,
  ClipboardList,
  Truck,
  Sparkles,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Business / contact                                                        */
/* -------------------------------------------------------------------------- */

// PHONE_DISPLAY is what users see; PHONE_TEL is the dialable tel: value.
export const PHONE_DISPLAY = "(903) 279-5441";
export const PHONE_TEL = "+19032795441";

export const EMAIL = "callmegonejunk@yahoo.com";

// TODO(launch): Confirm callmegonejunk.com is live before pointing canonical
// URLs, OpenGraph, sitemap, and JSON-LD at it (used here as the production domain).
export const SITE_URL = "https://callmegonejunk.com";

export const BUSINESS = {
  name: "Call Me Gone Junk Removal",
  manager: "Gus Morales",
  managerTitle: "Sales / Manager",
  slogan: "You Call, We Haul, It's Gone!",
  // TODO(launch): Replace with the real street address if the business
  // operates from a storefront/yard; otherwise keep city-level only.
  city: "Tyler",
  region: "TX",
  regionName: "Texas",
  country: "US",
  streetAddress: "Tyler, TX",
  // TODO(launch): Confirm real business hours.
  hours: "Mon–Fri 7am–6pm · Sat 8am–4pm",
} as const;

// TODO(launch): Add real Instagram/Google profile URLs. Leave empty to hide an icon.
export const SOCIALS = {
  facebook: "https://facebook.com/CallMeGoneJunkRemoval",
  instagram: "",
  google: "",
} as const;

/* -------------------------------------------------------------------------- */
/*  Service area                                                              */
/* -------------------------------------------------------------------------- */

/** Primary named cities/towns served (used in copy, footer, JSON-LD). */
export const SERVICE_AREAS = [
  "Tyler",
  "Bullard",
  "Whitehouse",
  "Flint",
  "Palestine",
  "Lindale",
  "Jacksonville",
  "Rusk",
  "Longview",
  "Kilgore",
] as const;

/** Included in areaServed / copy as the catch-all region. */
export const SERVICE_REGION = "and surrounding East Texas communities";

/* -------------------------------------------------------------------------- */
/*  Trust badges                                                              */
/* -------------------------------------------------------------------------- */

export interface TrustBadge {
  icon: LucideIcon;
  label: string;
}

export const TRUST_BADGES: TrustBadge[] = [
  { icon: Zap, label: "Fast Service" },
  { icon: Handshake, label: "Fair Prices" },
  { icon: CheckCircle2, label: "Done Right" },
  { icon: ShieldCheck, label: "Insured" },
];

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    icon: Trash2,
    title: "Junk Removal & Haul Off",
    description:
      "Big or small, if it needs to go, we'll haul it off — furniture, appliances, junk piling up in the garage, you name it.",
  },
  {
    icon: Home,
    title: "Full-Service Clean Outs",
    description:
      "Garages, attics, basements, and sheds — we clear the whole space in one visit so you can finally use it again.",
  },
  {
    icon: Sofa,
    title: "Furniture & Appliance Removal",
    description:
      "Couches, mattresses, fridges, washers and dryers hauled out without a scratch on your walls or floors.",
  },
  {
    icon: Hammer,
    title: "Construction & Yard Debris",
    description:
      "Post-remodel job-site debris, branches, brush, and storm cleanup cleared fast so you can move on.",
  },
  {
    icon: Warehouse,
    title: "Storage Units & Estate Cleanouts",
    description:
      "Full storage-unit and estate cleanouts handled with care and discretion, including eviction cleanouts.",
  },
  {
    icon: Building2,
    title: "Residential & Commercial",
    description:
      "We handle homes and businesses alike — porches, decks, and property clean-out jobs of any size.",
  },
];

/* -------------------------------------------------------------------------- */
/*  How it works                                                             */
/* -------------------------------------------------------------------------- */

export interface ProcessStepData {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStepData[] = [
  {
    icon: PhoneCall,
    title: "You Call",
    description:
      "Reach out by phone or request a free quote online — tell us what needs to go.",
  },
  {
    icon: ClipboardList,
    title: "Get a Fair Price",
    description:
      "We give you an honest, upfront price. No hidden fees, no obligation.",
  },
  {
    icon: Truck,
    title: "We Haul",
    description:
      "Our crew shows up on time and hauls it all — you don't lift a finger.",
  },
  {
    icon: Sparkles,
    title: "It's Gone",
    description:
      "We sweep up and dispose or recycle responsibly. You enjoy the clean space.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Testimonials                                                              */
/* -------------------------------------------------------------------------- */

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  rating: number;
}

// TODO(launch): Replace with real, verified customer reviews (with permission).
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Gus and his crew cleared out my parents' garage in a single afternoon. Professional, respectful, and fairly priced. Couldn't ask for more.",
    name: "Sarah",
    location: "Tyler, TX",
    rating: 5,
  },
  {
    quote:
      "Called in the morning and they came the same day. They hauled off an old fridge and a couch and left everything spotless. Highly recommend.",
    name: "Marcus",
    location: "Whitehouse, TX",
    rating: 5,
  },
  {
    quote:
      "After my remodel I had debris everywhere. Call Me Gone handled it all quickly and the quote was exactly what I paid. Honest local business.",
    name: "Deborah",
    location: "Lindale, TX",
    rating: 5,
  },
  {
    quote:
      "They handled a full estate cleanout with so much care during a hard time for our family. Kind, efficient, and trustworthy people.",
    name: "James",
    location: "Longview, TX",
    rating: 5,
  },
];

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

export interface FAQ {
  question: string;
  answer: string;
}

export const FAQS: FAQ[] = [
  {
    question: "How much does junk removal cost?",
    answer:
      "Pricing is based on the volume of junk (how much space it takes up in our trailer) and the type of items. We always give you an honest, upfront quote before we start — with no hidden fees and no obligation to book. See our Pricing page for typical ranges.",
  },
  {
    question: "What items do you take?",
    answer:
      "Furniture, appliances, mattresses, construction debris, yard waste, garage and attic clutter, estate and storage-unit cleanouts, and most household junk. We cannot take hazardous materials like paint, chemicals, or asbestos — just ask and we'll point you in the right direction.",
  },
  {
    question: "How fast can you come out?",
    answer:
      "In most cases we offer same-day or next-day service across Tyler and East Texas. Call us early and there's a good chance we can be there the same day. Same-day and emergency service may carry an added fee.",
  },
  {
    question: "Do you offer any discounts?",
    answer:
      "Yes — 10% off for military, first responders, seniors (65+), and repeat customers. Discounts can't be combined, but we'll always apply whichever one saves you the most.",
  },
  {
    question: "Do I need to be present for the pickup?",
    answer:
      "Not necessarily. Many customers arrange for us to access the items and handle payment remotely. We'll confirm the details with you when you book so everything goes smoothly.",
  },
  {
    question: "Does the quote include travel?",
    answer:
      "Our estimates account for the job itself; jobs farther out from Tyler may include a travel fee, which we'll always disclose upfront before you book — never as a surprise on pickup day.",
  },
  {
    question: "What do you do with the junk?",
    answer:
      "We're committed to responsible disposal. Whenever possible we donate usable items and recycle metal, appliances, and materials — keeping as much as we can out of the landfill.",
  },
];
