"use client";

import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CTAButton } from "@/components/ui/CTAButton";
import { Logo } from "@/components/ui/Logo";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/service-areas", label: "Service Areas" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-white/10 bg-ink transition-shadow duration-300 ${
        scrolled ? "shadow-md shadow-black/30" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="Call Me Gone Junk Removal home">
            <Logo variant="light" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body font-500 text-white/80 hover:text-gold transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-2 font-body font-600 text-white hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
            <CTAButton href="/quote" size="sm">
              Get a Free Quote
            </CTAButton>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gold text-white"
              aria-label={`Call us now at ${PHONE_DISPLAY}`}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-white/10 bg-ink overflow-hidden"
          >
            <nav className="px-4 pt-4 pb-6 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-body font-500 text-white/80 hover:text-gold py-3 border-b border-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <CTAButton href="/quote" className="w-full" onClick={() => setMenuOpen(false)}>
                  Get a Free Quote
                </CTAButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
