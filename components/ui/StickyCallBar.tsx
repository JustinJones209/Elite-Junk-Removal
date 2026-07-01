"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

/**
 * Fixed bottom tap-to-call bar, mobile only. Slides up after the visitor
 * scrolls past the hero so it never covers the initial above-the-fold view.
 */
export function StickyCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      initial={{ y: "100%" }}
      animate={{ y: visible ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      aria-hidden={!visible}
    >
      <a
        href={`tel:${PHONE_TEL}`}
        tabIndex={visible ? 0 : -1}
        className="flex items-center justify-center gap-3 w-full bg-brand-gradient text-white py-4 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] font-heading font-700 text-lg shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
        aria-label={`Call Elite Junk Removal now at ${PHONE_DISPLAY}`}
      >
        <Phone className="w-5 h-5" aria-hidden="true" />
        Call Now: {PHONE_DISPLAY}
      </a>
    </motion.div>
  );
}
