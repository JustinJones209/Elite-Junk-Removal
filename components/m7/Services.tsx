import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICE_CARDS } from "@/lib/m7-content";

/**
 * M7 service grid with photos. One lead card + four photo cards + one wide
 * strip, so it is not an identical 3-up grid. Whole card is one link.
 */
export function Services() {
  const [lead, ...rest] = SERVICE_CARDS;
  const grid = rest.slice(0, 4);
  const wide = rest[4];
  const href = (s: string) => `/quote?service=${encodeURIComponent(s)}`;
  return (
    <section id="services" className="band band-white" aria-labelledby="svc-h">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">What We Haul</p>
          <h2 id="svc-h" className="display h-sec">Junk Removal for Every Job</h2>
          <p className="lede">
            From a single couch to a whole-home cleanout, we handle it all, responsibly and without
            the heavy lifting on your end.
          </p>
        </div>
        <div className="svc-grid">
          <Link className="svc-card lead reveal" href={href(lead.service)}>
            <div className="ph">
              <Image src={lead.src} alt={lead.alt} fill sizes="(min-width:1080px) 50vw, 100vw" />
            </div>
            <div className="bd">
              <h3>{lead.title}</h3>
              <p>{lead.description}</p>
              <span className="more">Get a price <ArrowRight size={14} aria-hidden="true" /><span className="sr-only"> for {lead.title}</span></span>
            </div>
          </Link>
          {grid.map((s) => (
            <Link key={s.title} className="svc-card reveal" href={href(s.service)}>
              <div className="ph">
                <Image src={s.src} alt={s.alt} fill sizes="(min-width:1080px) 25vw, (min-width:720px) 50vw, 100vw" />
              </div>
              <div className="bd">
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <span className="more">Get a price <ArrowRight size={14} aria-hidden="true" /><span className="sr-only"> for {s.title}</span></span>
              </div>
            </Link>
          ))}
        </div>
        {wide && (
          <div className="svc-wide reveal">
            <div>
              <h3>{wide.title}</h3>
              <p className="mt-s">{wide.description}</p>
            </div>
            <Link className="btn btn-outline" href={href(wide.service)}>Get a price<span className="sr-only"> for residential and commercial jobs</span></Link>
          </div>
        )}
      </div>
    </section>
  );
}
