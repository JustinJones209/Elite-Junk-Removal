"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Optional stagger delay in seconds. */
  delay?: number;
  className?: string;
  /** Element to render as (default div). */
  as?: "div" | "li" | "section";
}

/**
 * Subtle fade + slide-up on scroll into view. Runs once. Respects
 * prefers-reduced-motion automatically via Framer Motion's reducedMotion.
 * Small distance (20px), no bounce — per the site motion guidelines.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}
