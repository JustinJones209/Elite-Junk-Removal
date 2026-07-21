import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { ServiceAreaMap } from "@/components/ui/ServiceAreaMap";
import { CTAButton } from "@/components/ui/CTAButton";
import { CITY_PAGES } from "@/lib/cities";
import { breadcrumbSchema } from "@/lib/schema";
import { SERVICE_REGION, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Call Me Gone Junk Removal serves Tyler, Bullard, Whitehouse, Flint, Palestine, Lindale, Jacksonville, Rusk, Longview, Kilgore, and all of East Texas.",
  alternates: { canonical: "/service-areas" },
};

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Service Areas", path: "/service-areas" },
]);

// TODO(launch): Verify these ZIP codes with Gus and expand as needed.
const ZIP_CODES = [
  "75701", "75702", "75703", "75704", "75705", "75707", "75708", "75709",
  "75750", "75757", "75766", "75771", "75785", "75662", "75601", "75603",
];

export default function ServiceAreasPage() {
  return (
    <div className="bg-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Header */}
      <div className="bg-gray-light">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 md:py-20 lg:px-8">
          <p className="mb-3 text-sm font-600 uppercase tracking-widest text-gold">
            Where We Work
          </p>
          <h1 className="font-heading text-4xl font-800 text-white md:text-5xl">
            Serving Tyler &amp; All of East Texas
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Based in Tyler, we cover a wide radius across East Texas. If your
            town isn&apos;t listed but you&apos;re nearby, reach out — chances
            are we can still help.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        {/* Map */}
        <div className="mx-auto max-w-4xl">
          <ServiceAreaMap />
        </div>

        {/* Cities */}
        <div className="mt-14">
          <h2 className="mb-6 text-center font-heading text-2xl font-700 text-white">
            Cities &amp; Towns We Serve
          </h2>
          <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {CITY_PAGES.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/service-areas/${city.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface px-4 py-3 shadow-sm transition-colors hover:border-gold"
                >
                  <MapPin className="h-4 w-4 flex-shrink-0 text-gold" aria-hidden="true" />
                  <span className="font-600 text-white/80">{city.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center text-white/70">…{SERVICE_REGION}.</p>
        </div>

        {/* ZIP codes */}
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl bg-gray-light p-6 sm:p-8">
          <h2 className="mb-4 font-heading text-xl font-700 text-white">
            ZIP Codes We Cover
          </h2>
          <div className="flex flex-wrap gap-2">
            {ZIP_CODES.map((zip) => (
              <span
                key={zip}
                className="rounded-full bg-surface px-3 py-1.5 text-sm font-600 text-white/80 shadow-sm"
              >
                {zip}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-white/60">
            Don&apos;t see your ZIP code? Call us — we serve many more communities
            across East Texas.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-ink-gradient mx-auto mt-12 max-w-3xl rounded-2xl p-8 text-center">
          <h2 className="font-heading text-2xl font-700 text-white">
            Ready to clear the clutter?
          </h2>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <CTAButton href={`tel:${PHONE_TEL}`} size="lg">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call Now — {PHONE_DISPLAY}
            </CTAButton>
            <CTAButton href="/quote" variant="ghost" size="lg">
              Get a Free Quote
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
