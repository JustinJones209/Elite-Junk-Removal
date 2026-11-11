import Image from "next/image";
import Link from "next/link";
import { Phone, Check } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, BUSINESS } from "@/lib/site";

/**
 * Full-width hero: stock photo of a crew loading a van, dark scrim for AA
 * contrast, headline + subcopy spanning the screen. No motion.
 * Photo: Pexels #7464403 (RDNE Stock project), placeholder Justin may swap.
 */
export function Hero() {
  return (
    <section className="hero hero-full" aria-labelledby="hero-h">
      <Image
        src="/photos/stock/hero-crew-loading.jpg"
        alt="Two-person crew lifting a couch into the back of a van for haul-away"
        width={2560}
        height={1707}
        priority
        fetchPriority="high"
        quality={60}
        sizes="100vw"
        className="hero-img"
      />
      <div className="wrap hero-inner">
        <h1 className="h1-keyword">Junk Removal in Tyler, TX</h1>
        <h2 id="hero-h" className="display h-hero">{BUSINESS.slogan}</h2>
        <p className="sub">
          Fast, honest, full-service junk removal in Tyler &amp; all of East Texas. Free estimates,
          and a crew that treats your home like their own.
        </p>
        <div className="btn-row">
          <a className="btn btn-accent btn-lg hero-call" href={`tel:${PHONE_TEL}`}>
            <Phone aria-hidden="true" /> Call {PHONE_DISPLAY}
          </a>
          <Link className="btn btn-outline-light btn-lg" href="/#quote">Get a Free Quote</Link>
        </div>
        <div className="hero-trust">
          <span><Check aria-hidden="true" /> Same-day service available</span>
          <span><Check aria-hidden="true" /> No obligation</span>
          <span><Check aria-hidden="true" /> Locally owned</span>
        </div>
        <p className="hero-price">
          Single items <strong>from $50</strong> · Partial trailer loads <strong>from $175</strong>{" "}
          <Link href="/#pricing" className="prose-link">See what your load costs</Link>
        </p>
      </div>
    </section>
  );
}
