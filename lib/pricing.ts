/**
 * Pricing page content. Kept to simplified starting-at ranges rather than a
 * full line-item price sheet — enough to set expectations, while still
 * pointing every visitor toward a free, no-obligation quote.
 */

import type { LucideIcon } from "lucide-react";
import { Package, Truck, Warehouse, Shield, Siren, Users, Repeat } from "lucide-react";

export interface PricingTier {
  icon: LucideIcon;
  label: string;
  priceFrom: string;
  description: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    icon: Package,
    label: "Single Item",
    priceFrom: "Starting at $50",
    description:
      "A mattress, couch, fridge, or other single piece — priced by item, picked up fast.",
  },
  {
    icon: Truck,
    label: "Partial Trailer Load",
    priceFrom: "Starting at $175",
    description:
      "A quarter to half load in our 14-foot dump trailer — great for a garage or room's worth of junk.",
  },
  {
    icon: Warehouse,
    label: "Full Trailer Load",
    priceFrom: "Up to $750",
    description:
      "A full 14-foot trailer load — sized for full clean outs, estate jobs, and major debris hauls.",
  },
];

/** Factors that can move a quote up from the base range. */
export const PRICE_FACTORS = [
  "Heavy or bulky items (pianos, safes, concrete, etc.)",
  "Carrying items upstairs",
  "Long carry distance (over 50 feet to the truck)",
  "Same-day or emergency service",
  "Appliances requiring refrigerant disposal",
  "Travel distance outside our home service area",
];

export interface Discount {
  icon: LucideIcon;
  label: string;
  amount: string;
}

export const DISCOUNTS: Discount[] = [
  { icon: Shield, label: "Military", amount: "10% off" },
  { icon: Siren, label: "First Responders", amount: "10% off" },
  { icon: Users, label: "Seniors (65+)", amount: "10% off" },
  { icon: Repeat, label: "Repeat Customers", amount: "10% off" },
];
