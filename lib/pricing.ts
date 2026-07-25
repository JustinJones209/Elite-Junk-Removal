/**
 * Pricing page content. The top-level tiles give a quick at-a-glance range;
 * CLEANOUT_TYPES and ITEMS_WE_TAKE mirror the real pricing flyer's service
 * and item lists.
 */

import type { LucideIcon } from "lucide-react";
import {
  Package,
  Truck,
  Warehouse,
  Shield,
  Siren,
  Users,
  Repeat,
  Sofa,
  Home,
  Building2,
  Trash2,
} from "lucide-react";

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

/** Full-service cleanout types the flyer calls out. */
export const CLEANOUT_TYPES = [
  "Total Clean Outs",
  "Porches & Deck Removal",
  "Storage Cleanouts",
  "Estate Cleanouts",
  "Garage Cleanouts",
  "Basement Cleanouts",
  "Shed Cleanouts",
  "Evictions",
  "And More!",
] as const;

/** "We Take Almost Everything" category icons from the flyer. */
export const ITEMS_WE_TAKE: { icon: LucideIcon; label: string }[] = [
  { icon: Sofa, label: "Furniture" },
  { icon: Package, label: "Appliances" },
  { icon: Home, label: "Estate Cleanouts" },
  { icon: Warehouse, label: "Garage Cleanouts" },
  { icon: Trash2, label: "Construction Debris" },
  { icon: Trash2, label: "Yard Debris" },
  { icon: Warehouse, label: "Storage Cleanouts" },
  { icon: Building2, label: "Porches & Deck Removal" },
  { icon: Warehouse, label: "Storage Units" },
  { icon: Home, label: "Evictions" },
];
