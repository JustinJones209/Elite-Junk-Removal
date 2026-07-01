/**
 * Central site configuration — single source of truth for business info,
 * contact details, and content data used across the site.
 *
 * TODO(launch): Swap every value marked "TODO" below with Gustavo's real
 * details before going live (phone number, address, email, social links, URL).
 */

import type { LucideIcon } from "lucide-react";
import {
  Sofa,
  Refrigerator,
  Home,
  Hammer,
  Warehouse,
  Leaf,
  Zap,
  FileText,
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
export const PHONE_DISPLAY = "(903) 617-3940";
export const PHONE_TEL = "+19036173940";

// TODO(launch): Replace with the real contact email.
export const EMAIL = "hello@elitejunkremoval.com";

// TODO(launch): Replace with the production domain (used for canonical URLs,
// OpenGraph, sitemap, and JSON-LD). Must be the live https URL.
export const SITE_URL = "https://elitejunkremoval.com";

export const BUSINESS = {
  name: "Elite Junk Removal",
  owner: "Gustavo Morales",
  slogan: "We'll do the hard work so you can have the clean living.",
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

// TODO(launch): Add real social profile URLs. Leave empty to hide an icon.
export const SOCIALS = {
  facebook: "",
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
  { icon: Zap, label: "Same-Day Service" },
  { icon: FileText, label: "Free Estimates" },
  { icon: MapPin, label: "Locally Owned" },
  { icon: Truck, label: "We Haul Away" },
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
    icon: Warehouse,
    title: "Garage & Attic Cleanouts",
    description:
      "Reclaim the space you've been meaning to use — whether you want parking, a home gym, or extra workspace, we'll clear years of clutter in a day!",
  },
  {
    icon: Leaf,
    title: "Yard Waste",
    description:
      "Branches, brush, fencing, and storm debris removed to leave your yard clean and clear.",
  },
  {
    icon: Sofa,
    title: "Furniture Removal",
    description:
      "Couches, mattresses, desks, and more — hauled out without a scratch on your walls or floors.",
  },
  {
    icon: Refrigerator,
    title: "Appliance Removal",
    description:
      "Old fridges, washers, dryers, and water heaters removed and recycled the responsible way.",
  },
  {
    icon: Home,
    title: "Estate Cleanouts",
    description:
      "Full-home cleanouts handled with care and discretion during difficult transitions.",
  },
  {
    icon: Hammer,
    title: "Construction Debris",
    description:
      "Post-remodel and job-site debris cleared fast so you can move on to the finish work.",
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
    title: "Book Online or Call",
    description:
      "Reach out by phone or request a quote online — tell us what needs to go.",
  },
  {
    icon: ClipboardList,
    title: "Get a Free Quote",
    description:
      "We give you an honest, upfront price. No hidden fees, no obligation.",
  },
  {
    icon: Truck,
    title: "We Do the Heavy Lifting",
    description:
      "Our crew shows up on time and hauls it all — you don't lift a finger.",
  },
  {
    icon: Sparkles,
    title: "You Relax",
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
      "Gustavo and his crew cleared out my parents' garage in a single afternoon. Professional, respectful, and fairly priced. Couldn't ask for more.",
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
      "After my remodel I had debris everywhere. Elite handled it all quickly and the quote was exactly what I paid. Honest local business.",
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
      "Pricing is based on the volume of junk (how much space it takes up in our truck) and the type of items. We always give you an honest, upfront quote before we start — with no hidden fees and no obligation to book.",
  },
  {
    question: "What items do you take?",
    answer:
      "Furniture, appliances, mattresses, construction debris, yard waste, garage and attic clutter, estate cleanouts, and most household junk. We cannot take hazardous materials like paint, chemicals, or asbestos — just ask and we'll point you in the right direction.",
  },
  {
    question: "How fast can you come out?",
    answer:
      "In most cases we offer same-day or next-day service across Tyler and East Texas. Call us early and there's a good chance we can be there the same day.",
  },
  {
    question: "Do I need to be present for the pickup?",
    answer:
      "Not necessarily. Many customers arrange for us to access the items and handle payment remotely. We'll confirm the details with you when you book so everything goes smoothly.",
  },
  {
    question: "How is pricing determined?",
    answer:
      "We price by volume and labor — the more space your items take in the truck and the heavier the lift, the higher the cost. You'll always know the full price before we lift a thing.",
  },
  {
    question: "What do you do with the junk?",
    answer:
      "We're committed to responsible disposal. Whenever possible we donate usable items and recycle metal, appliances, and materials — keeping as much as we can out of the landfill.",
  },
];
