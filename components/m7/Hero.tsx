import Image from "next/image";
import Link from "next/link";
import { Phone, Check } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, BUSINESS } from "@/lib/site";

/** M7 hero: full-bleed real photo, text in a translucent dark card. No motion. */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-h">
      <Image
        src="/photos/trailer.png"
        alt="Call Me Gone Junk Removal truck and 14-foot dump trailer"
        fill
        priority
        fetchPriority="high"
        quality={60}
        sizes="(min-width: 1282px) 1282px, 100vw"
        className="hero-img"
      />
      <div className="wrap">
        <div className="hero-card">
          <h1 className="h1-keyword">Junk Removal in Tyler, TX</h1>
          <h2 id="hero-h" className="display h-hero">{BUSINESS.slogan}</h2>
          <p className="sub">
            Fast, honest, full-service junk removal in Tyler &amp; all of East Texas. Free estimates,
            and a crew that treats your home like their own.
          </p>
          <div className="btn-row">
            <a className="btn btn-accent btn-lg" href={`tel:${PHONE_TEL}`}>
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
      </div>
    </section>
  );
}
