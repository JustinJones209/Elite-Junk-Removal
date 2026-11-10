import Link from "next/link";
import Image from "next/image";
import { CITY_PAGES } from "@/lib/cities";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, BUSINESS, SOCIALS, SERVICES } from "@/lib/site";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap cols">
        <div>
          <Link href="/" className="logo-box" aria-label={`${BUSINESS.name} home`}>
            <Image src="/photos/logo.png" alt="Call Me Gone Junk Removal" width={900} height={606} sizes="90px" />
          </Link>
          <p style={{ marginTop: 16 }}>{BUSINESS.slogan}</p>
          <p style={{ marginTop: 8 }}>Fast, honest junk removal serving Tyler and all of East Texas. Locally owned &amp; operated.</p>
          {SOCIALS.facebook && (
            <a className="fb" href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer">
              <FacebookIcon /> Facebook
            </a>
          )}
        </div>
        <nav aria-label="Services">
          <h2>Services</h2>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.title}><Link href="/#services">{s.title}</Link></li>
            ))}
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </nav>
        <nav aria-label="Service areas">
          <h2>Service Areas</h2>
          <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
            {CITY_PAGES.map((c) => (
              <li key={c.slug} style={{ marginTop: 0 }}><Link href={`/service-areas/${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
          <p style={{ marginTop: 10 }}><Link href="/service-areas">+ surrounding East Texas</Link></p>
        </nav>
        <div>
          <h2>Contact</h2>
          <ul>
            <li><a href={`tel:${PHONE_TEL}`} style={{ fontWeight: 600, color: "#fff" }}>{PHONE_DISPLAY}</a></li>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li>{BUSINESS.city}, {BUSINESS.region}</li>
            <li>{BUSINESS.hours}</li>
            <li>Ask for {BUSINESS.manager}, {BUSINESS.managerTitle}</li>
          </ul>
        </div>
      </div>
      <div className="wrap legal">
        <span>&copy; {year} {BUSINESS.name}. All rights reserved. Locally owned &amp; operated.</span>
        <span><Link href="/privacy">Privacy Policy</Link> · <Link href="/faq">FAQ</Link> · <Link href="/quote">Get a Free Quote</Link></span>
      </div>
    </footer>
  );
}
