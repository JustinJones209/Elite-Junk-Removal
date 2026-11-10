import Image from "next/image";
import Link from "next/link";
import { Phone, Check, Zap, FileText, MapPin, Recycle, Heart, Star } from "lucide-react";
import { BUSINESS, PHONE_DISPLAY, PHONE_TEL, PROCESS_STEPS, GOOGLE_REVIEW_URL, SOCIALS } from "@/lib/site";
import { WHY_US } from "@/lib/m7-content";
import { IMAGES } from "@/lib/images";

/** M7 dark urgency band. Real hours only; no 24/7 claim (the site never made one). */
export function UrgencyBand() {
  return (
    <section className="band band-dark" aria-labelledby="urg-h">
      <div className="wrap urgent">
        <div className="reveal">
          <p className="eyebrow">Need It Gone Today?</p>
          <h2 id="urg-h" className="display h-sec" style={{ marginTop: 14 }}>Same-Day Junk Removal in Tyler</h2>
          <p className="lede mt-m muted-text">
            In most cases we offer same-day or next-day service across Tyler and East Texas. Call early and
            there&apos;s a good chance we can be there the same day.
          </p>
          <ul>
            <li><Check aria-hidden="true" /> Moving out and the deadline is close</li>
            <li><Check aria-hidden="true" /> Storm debris and branches in the yard</li>
            <li><Check aria-hidden="true" /> Eviction or rental turnover cleanouts</li>
            <li><Check aria-hidden="true" /> Estate cleanouts on a closing date</li>
          </ul>
          <div className="btn-row mt-l">
            <a className="btn btn-accent btn-lg" href={`tel:${PHONE_TEL}`}><Phone aria-hidden="true" /> Call {PHONE_DISPLAY}</a>
            <Link className="btn btn-outline-light btn-lg" href="/quote">Get Help Now</Link>
          </div>
        </div>
        <div className="hours-box reveal">
          <p className="eyebrow">Hours</p>
          <dl>
            <dt>Mon–Fri</dt><dd>7am–6pm</dd>
            <dt>Saturday</dt><dd>8am–4pm</dd>
            <dt>Sunday</dt><dd>Closed</dd>
          </dl>
          <p className="status" data-hours-status hidden><span className="dot" aria-hidden="true" /> <span data-hours-text /></p>
          <p className="muted-text" style={{ marginTop: 14, fontSize: 14 }}>Same-day and emergency service may carry an added fee.</p>
        </div>
      </div>
    </section>
  );
}

const WHY_ICONS = { fast: Zap, free: FileText, local: MapPin, recycle: Recycle } as const;

export function WhyUs() {
  return (
    <section className="band band-muted" aria-labelledby="why-h">
      <div className="wrap why">
        <div className="why-photo reveal">
          <Image src="/photos/garage-after.png" alt="A garage swept clean after a Call Me Gone cleanout" fill sizes="(min-width:1024px) 45vw, 100vw" />
        </div>
        <div>
          <div className="sec-head reveal" style={{ marginBottom: 32 }}>
            <p className="eyebrow">Why Choose Us</p>
            <h2 id="why-h" className="display h-sec">A Junk Removal Crew You Can Trust</h2>
            <p className="lede">We built our reputation on showing up, working hard, and doing right by every customer.</p>
          </div>
          <div className="why-list">
            {WHY_US.map((w) => {
              const Icon = WHY_ICONS[w.key];
              return (
                <div key={w.key} className="why-item reveal">
                  <Icon aria-hidden="true" />
                  <h3>{w.title}</h3>
                  <p>{w.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Gus stays where he was on the original site (after Why Choose Us, before Reviews), same copy. */
export function MeetGus() {
  return (
    <section id="about" className="band band-white" aria-labelledby="gus-h">
      <div className="wrap gus">
        <div className="gus-photo reveal">
          <div className="frame">
            <Image src={IMAGES.founder.src} alt={IMAGES.founder.alt} fill sizes="(min-width:1024px) 40vw, 100vw" />
          </div>
          <span className="gus-tag"><Heart aria-hidden="true" /> Locally Owned &amp; Operated</span>
        </div>
        <div className="gus-copy reveal">
          <p className="eyebrow">Meet the Team</p>
          <h2 id="gus-h" className="display h-sec" style={{ marginTop: 14, marginBottom: 20 }}>Meet Gus Morales</h2>
          <p className="lede">
            Gus runs sales and day-to-day operations for Call Me Gone Junk Removal. He&apos;s usually the voice
            you&apos;ll hear when you call, and the one making sure every job gets done right.
          </p>
          <p className="lede">No shortcuts, no mess left behind. Just an honest day&apos;s work and a job done with a spirit of excellence.</p>
          <p className="gus-quote">&ldquo;{BUSINESS.slogan}&rdquo;</p>
          <div className="btn-row mt-l">
            <Link className="btn btn-ink" href="/quote">Get Your Free Quote</Link>
            <a className="btn btn-outline" href={`tel:${PHONE_TEL}`}><Phone aria-hidden="true" /> Call Gus</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Reviews: link out only. No invented stars, counts, or testimonials. */
export function Reviews() {
  const hasGoogle = !GOOGLE_REVIEW_URL.includes("REPLACE-ME");
  return (
    <section id="reviews" className="band-sm band-muted" aria-labelledby="rev-h">
      <div className="wrap reviews reveal">
        <div>
          <p className="eyebrow">Reviews</p>
          <h2 id="rev-h" className="display h-sec" style={{ marginTop: 14 }}>Hired Us? Tell East Texas How We Did.</h2>
          <p className="lede mt-s muted-text">
            We&apos;d rather you hear it from your neighbors than from us. Reviews from real customers help other
            folks in Tyler find an honest crew.
          </p>
        </div>
        <div className="btn-row">
          {hasGoogle && (
            <a className="btn btn-ink btn-lg" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"><Star aria-hidden="true" /> Review Us on Google</a>
          )}
          {SOCIALS.facebook && (
            <a className="btn btn-outline btn-lg" href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer">See Us on Facebook</a>
          )}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="how-it-works" className="band band-white" aria-labelledby="proc-h">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">How It Works</p>
          <h2 id="proc-h" className="display h-sec">Four Steps to a Clean Space</h2>
        </div>
        <ol className="steps reveal">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className="step">
              <p className="n" aria-hidden="true">0{i + 1}<span>.</span></p>
              <h3><span className="sr-only">Step {i + 1}: </span>{s.title}</h3>
              <p>{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ClosingCTA({ heading = "Junk Removal in Tyler, TX You Can Count On" }: { heading?: string }) {
  return (
    <section className="band band-accent" aria-labelledby="close-h">
      <div className="wrap closing">
        <div>
          <p className="eyebrow">Ready to Reclaim Your Space?</p>
          <h2 id="close-h" className="display h-sec" style={{ marginTop: 14 }}>{heading}</h2>
          <p className="lede mt-s">Get a free, no-obligation quote today. Same-day service available across Tyler and all of East Texas.</p>
        </div>
        <div className="btn-row">
          <a className="btn btn-ink btn-lg" href={`tel:${PHONE_TEL}`}><Phone aria-hidden="true" /> Call {PHONE_DISPLAY}</a>
          <Link className="btn btn-outline-ink btn-lg" href="/quote">Get a Free Quote</Link>
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  h1, title, lede, crumbs, showCtas = true,
}: {
  h1: string; title: string; lede?: string; crumbs?: { name: string; href?: string }[]; showCtas?: boolean;
}) {
  return (
    <section className="page-hero on-dark">
      <div className="wrap">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="crumbs">
            {crumbs.map((c, i) => (
              <span key={c.name}>
                {i > 0 && <span aria-hidden="true"> / </span>}
                {c.href ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
              </span>
            ))}
          </nav>
        )}
        <h1 className="page-h1">{h1}</h1>
        <h2 className="display h-hero" style={{ maxWidth: 900 }}>{title}</h2>
        {lede && <p className="lede">{lede}</p>}
        {showCtas && (
          <div className="btn-row">
            <a className="btn btn-accent btn-lg" href={`tel:${PHONE_TEL}`}><Phone aria-hidden="true" /> Call {PHONE_DISPLAY}</a>
            <Link className="btn btn-outline-light btn-lg" href="/quote">Get a Free Quote</Link>
          </div>
        )}
      </div>
    </section>
  );
}
