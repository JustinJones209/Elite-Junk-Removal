import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CITY_PAGES } from "@/lib/cities";
import { SERVICE_REGION } from "@/lib/site";
import { SERVICE_ZIPS } from "@/lib/m7-content";

export function ZipChecker() {
  const cities = CITY_PAGES.map((c) => ({ name: c.name, href: `/service-areas/${c.slug}` }));
  return (
    <div className="zipcheck on-dark">
      <p className="eyebrow">Do You Serve My Area?</p>
      <h3 className="display" style={{ fontSize: "1.9rem", marginTop: 12 }}>Check Your ZIP or Town</h3>
      <form data-zipcheck data-zips={SERVICE_ZIPS.join(",")} data-cities={JSON.stringify(cities)} action="/service-areas">
        <label htmlFor="zipq" className="sr-only">ZIP code or town</label>
        <input id="zipq" name="q" className="inp" type="text" inputMode="text" autoComplete="postal-code" placeholder="e.g. 75703 or Whitehouse" />
        <button type="submit" className="btn btn-accent">Check</button>
      </form>
      <p className="zip-result" data-zip-result aria-live="polite" />
      <p className="muted-text" style={{ fontSize: 14, marginTop: 6 }}>Not listed? We cover a wide radius around Tyler. Call to confirm.</p>
    </div>
  );
}

export function ServiceAreaSection() {
  return (
    <section id="service-areas" className="band band-muted" aria-labelledby="area-h">
      <div className="wrap area">
        <div className="reveal">
          <p className="eyebrow">Where We Work</p>
          <h2 id="area-h" className="display h-sec" style={{ marginTop: 14 }}>Your Trusted Local Junk Haulers from Tyler, TX</h2>
          <p className="lede mt-s">
            Based in Tyler and covering the surrounding communities. If you&apos;re nearby and don&apos;t see your town,
            just ask. Chances are we&apos;ll come to you.
          </p>
          <ul className="city-list mt-m">
            {CITY_PAGES.map((c) => (
              <li key={c.slug}>
                <Link href={`/service-areas/${c.slug}`}>
                  {c.name}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-s muted-text">…{SERVICE_REGION}.</p>
          <Link href="/service-areas" className="btn btn-outline mt-m">Explore Service Areas</Link>
        </div>
        <div className="reveal"><ZipChecker /></div>
      </div>
    </section>
  );
}
