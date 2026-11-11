import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, BUSINESS } from "@/lib/site";

export const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#what-we-do", label: "What We Do" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/service-areas", label: "Service Areas" },
];

export function Header() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="topbar">
        <div className="wrap">
          <span className="tb-hours">Same-day service available · {BUSINESS.hours}</span>
          <a href={`tel:${PHONE_TEL}`}>Call Gus: {PHONE_DISPLAY}</a>
        </div>
      </div>
      <header className="site-header" data-header>
        <div className="wrap bar">
          <Link href="/" className="logo" aria-label="Call Me Gone Junk Removal home">
            <Image src="/photos/logo.png" alt="Call Me Gone Junk Removal" width={900} height={606} priority sizes="120px" />
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </nav>
          <div className="hdr-actions">
            <a className="btn btn-accent hdr-phone" href={`tel:${PHONE_TEL}`} aria-label={`Call ${PHONE_DISPLAY}`}>
              <Phone aria-hidden="true" />
              <span className="ph-num">{PHONE_DISPLAY}</span>
            </a>
            <Link className="btn btn-ink hdr-quote" href="/quote">Get a Free Quote</Link>
            <button type="button" className="menu-btn" data-menu-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
              <span data-ico-open style={{ display: "contents" }}><Menu aria-hidden="true" /></span>
              <span data-ico-close hidden><X aria-hidden="true" /></span>
            </button>
          </div>
        </div>
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" hidden>
          <div className="wrap" style={{ paddingBottom: 20 }}>
            {NAV.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
            <Link href="/quote" className="btn btn-ink" style={{ width: "100%", marginTop: 16 }}>Get a Free Quote</Link>
          </div>
        </nav>
      </header>
    </>
  );
}
