import Link from "next/link";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceAreaMap } from "@/components/ui/ServiceAreaMap";
import { Reveal } from "@/components/ui/Reveal";
import { CITY_PAGES } from "@/lib/cities";
import { SERVICE_REGION } from "@/lib/site";

/** Service-area section: map placeholder + list of served cities. */
export function ServiceArea() {
  return (
    <section id="service-areas" className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Where We Work"
            heading="Proudly Serving All of East Texas"
            subtext="Based in Tyler and covering the surrounding communities. If you're nearby and don't see your town, just ask — chances are we'll come to you."
          />
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ServiceAreaMap />
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h3 className="mb-5 font-heading text-xl font-700 text-white">
                Cities &amp; Towns We Serve
              </h3>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {CITY_PAGES.map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/service-areas/${city.slug}`}
                      className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface px-3 py-2.5 shadow-sm transition-colors hover:bg-gold/10"
                    >
                      <MapPin className="h-4 w-4 flex-shrink-0 text-gold" aria-hidden="true" />
                      <span className="font-600 text-white/80">{city.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-white/70">…{SERVICE_REGION}.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
