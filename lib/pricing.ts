/**
 * Pricing page content. The top-level tiles give a quick at-a-glance range;
 * the itemized lists further down (SINGLE_ITEM_PRICES, TRAILER_LOAD_PRICES,
 * EXTRA_CHARGES, CLEANOUT_TYPES, ITEMS_WE_TAKE) mirror the real pricing flyer
 * so visitors can find their exact item before calling.
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

/** Single-item pricing, straight from the flyer. */
export const SINGLE_ITEM_PRICES = [
  { item: "Mattress", price: "$85 – $125" },
  { item: "Box Spring", price: "$65 – $95" },
  { item: "Recliner", price: "$85 – $125" },
  { item: "Couch", price: "$125 – $175" },
  { item: "Loveseat", price: "$100 – $150" },
  { item: "Refrigerator", price: "$100 – $175" },
  { item: "Washer", price: "$85 – $125" },
  { item: "Dryer", price: "$85 – $125" },
  { item: "Stove", price: "$100 – $150" },
  { item: "Dishwasher", price: "$75 – $100" },
  { item: "Microwave", price: "$50 – $75" },
  { item: "Hot Water Heater", price: "$85 – $150" },
  { item: "Exercise Equipment", price: "$100 – $200" },
  { item: "Tires", price: "$20 each", note: "plus disposal fee if required" },
] as const;

/** 14-foot dump trailer load pricing, straight from the flyer. */
export const TRAILER_LOAD_PRICES = [
  { size: "¼ Load", price: "$175 – $250" },
  { size: "½ Load", price: "$300 – $400" },
  { size: "¾ Load", price: "$450 – $550" },
  { size: "Full Load", price: "$600 – $750" },
] as const;

/** Factors that can move a quote up from the base range, with typical add-on ranges. */
export const EXTRA_CHARGES = [
  { label: "Heavy Items (pianos, safes, concrete, etc.)", amount: "$50 – $300" },
  { label: "Upstairs Carry", amount: "$25 – $100" },
  { label: "Long Carry (over 50 feet)", amount: "$25 – $75" },
  { label: "Same-Day or Emergency Service", amount: "$50 – $100" },
  {
    label: "Appliances Containing Refrigerant",
    amount: "Additional disposal cost",
    note: "if disposal fees apply",
  },
] as const;

/** Kept for the "What Can Affect Your Price" summary list higher up the page. */
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
