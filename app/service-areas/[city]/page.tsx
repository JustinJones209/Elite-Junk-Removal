import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { TrustBadgeRow } from "@/components/ui/TrustBadgeRow";
import { CITY_PAGES, getCityPage } from "@/lib/cities";
import { breadcrumbSchema } from "@/lib/schema";
import {
  SERVICES,
  TESTIMONIALS,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_URL,
  BUSINESS,
} from "@/lib/site";

export function generateStaticParams() {
  return CITY_PAGES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityPage(slug);
  if (!city) return {};

  const title = `Junk Removal in ${city.name}, TX`;
  const description = `Fast, honest junk removal in ${city.name}, TX. Garage cleanouts, furniture and appliance removal, yard waste, and more. Free estimates from a local East Texas crew.`;

  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${city.slug}` },
    openGraph: {
      title: `${title} | Call Me Gone Junk Removal`,
      description,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityPage(slug);
  if (!city) notFound();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    telephone: PHONE_TEL,
    url: `${SITE_URL}/service-areas/${city.slug}`,
    areaServed: {
      "@type": "City",
      name: `${city.name}, TX`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
  };

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas" },
    { name: city.name, path: `/service-areas/${city.slug}` },
  ]);

  const otherCities = CITY_PAGES.filter((c) => c.slug !== city.slug);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Header */}
      <div className="bg-gray-light">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 md:py-20 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/service-areas" className="hover:text-gold">Service Areas</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{city.name}</span>
          </nav>
          <p className="mb-3 text-sm font-600 uppercase tracking-widest text-gold">
            {city.tagline}
          </p>
          <h1 className="font-heading text-4xl font-800 text-ink md:text-5xl">
            Junk Removal in {city.name}, TX
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{city.blurb}</p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CTAButton href={`tel:${PHONE_TEL}`} size="lg">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call Now — {PHONE_DISPLAY}
            </CTAButton>
            <CTAButton href="/quote" variant="secondary" size="lg">
              Get a Free Quote
            </CTAButton>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-8">
            <TrustBadgeRow />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <h2 className="mb-10 text-center font-heading text-2xl font-700 text-ink md:text-3xl">
          What We Haul in {city.name}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-light py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-heading text-2xl font-700 text-ink md:text-3xl">
            Trusted Across East Texas
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </div>

      {/* Nearby areas — internal linking */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <h2 className="mb-6 text-center font-heading text-xl font-700 text-ink">
          We Also Serve Nearby
        </h2>
        <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {otherCities.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/service-areas/${c.slug}`}
                className="flex items-center gap-2 rounded-lg border border-gray-100 bg-white px-3 py-2.5 shadow-sm transition-colors hover:border-gold"
              >
                <MapPin className="h-4 w-4 flex-shrink-0 text-gold" aria-hidden="true" />
                <span className="font-600 text-gray-700">{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="bg-ink-gradient mx-auto mt-12 max-w-3xl rounded-2xl p-8 text-center">
          <h2 className="font-heading text-2xl font-700 text-white">
            Ready to clear the clutter in {city.name}?
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
