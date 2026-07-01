import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  BUSINESS,
  SOCIALS,
  SERVICE_AREAS,
} from "@/lib/site";

// Inline brand glyphs — lucide-react no longer ships brand icons.
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/quote", label: "Get a Free Quote" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 inline-block" aria-label={`${BUSINESS.name} home`}>
              <Logo variant="dark" />
            </Link>
            <p className="text-sm leading-relaxed">{BUSINESS.slogan}</p>

            {/* Socials */}
            <div className="mt-5 flex gap-3">
              {SOCIALS.facebook && (
                <a
                  href={SOCIALS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Elite Junk Removal on Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-safety-orange"
                >
                  <FacebookIcon className="h-4 w-4 text-white" />
                </a>
              )}
              {SOCIALS.instagram && (
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Elite Junk Removal on Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-safety-orange"
                >
                  <InstagramIcon className="h-4 w-4 text-white" />
                </a>
              )}
              {/* TODO(launch): Add real social links in lib/site.ts (SOCIALS). */}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h2 className="mb-4 font-heading text-sm font-700 uppercase tracking-widest text-white">
              Quick Links
            </h2>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Service areas */}
          <div>
            <h2 className="mb-4 font-heading text-sm font-700 uppercase tracking-widest text-white">
              Service Areas
            </h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {SERVICE_AREAS.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm">+ surrounding East Texas</p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-4 font-heading text-sm font-700 uppercase tracking-widest text-white">
              Get in Touch
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 flex-shrink-0 text-amber" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 flex-shrink-0 text-amber" aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 text-amber" aria-hidden="true" />
                {BUSINESS.city}, {BUSINESS.region}
              </li>
              <li className="text-white/60">{BUSINESS.hours}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/60">
          <p className="mb-2">
            Fast, honest junk removal serving Tyler and all of East Texas.
          </p>
          <p>
            &copy; {year} {BUSINESS.name}. All rights reserved. Owned &amp; operated by{" "}
            {BUSINESS.owner}.
          </p>
        </div>
      </div>
    </footer>
  );
}
