import Link from "next/link";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CITY_PAGES } from "@/lib/cities";
import { SERVICE_REGION } from "@/lib/site";

/** Service-area section: list of served cities (no map graphic, kept lightweight). */
export function ServiceArea() {
  return (
    <section id="service-areas" className="bg-gray-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Where We Work"
            heading="Proudly Serving All of East Texas"
            subtext="Based in Tyler and covering the surrounding communities. If you're nearby and don't see your town, just ask — chances are we'll come to you."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-4xl">
            <h3 className="mb-5 text-center font-heading text-xl font-700 text-ink dark:text-white">
              Cities &amp; Towns We Serve
            </h3>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {CITY_PAGES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/service-areas/${city.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface px-3 py-2.5 shadow-sm transition-colors hover:bg-gold/10"
                  >
                    <MapPin className="h-4 w-4 flex-shrink-0 text-gold" aria-hidden="true" />
                    <span className="font-600 text-gray-700 dark:text-white/80">{city.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-center text-gray-600 dark:text-white/70">…{SERVICE_REGION}.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
