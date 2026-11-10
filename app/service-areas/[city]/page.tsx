import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { CITY_PAGES, getCityPage } from "@/lib/cities";
import { breadcrumbSchema } from "@/lib/schema";
import { SERVICES, SITE_URL } from "@/lib/site";
import { PageHero, ClosingCTA } from "@/components/m7/Bands";
import { Estimator } from "@/components/m7/Estimator";

export function generateStaticParams() {
  return CITY_PAGES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityPage(slug);
  if (!city) return {};
  const title = `Junk Removal in ${city.name}, TX`;
  const description = `Junk removal in ${city.name}, TX from a local East Texas crew based in Tyler. Garage cleanouts, furniture and appliance removal, yard debris. Single items from $50.`;
  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${city.slug}` },
    openGraph: { title: `${title} | Call Me Gone Junk Removal`, description },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityPage(slug);
  if (!city) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/service-areas/${city.slug}#service`,
    name: `Junk Removal in ${city.name}, TX`,
    serviceType: "Junk removal",
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "City", name: `${city.name}, TX` },
    url: `${SITE_URL}/service-areas/${city.slug}`,
  };
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas" },
    { name: city.name, path: `/service-areas/${city.slug}` },
  ]);
  const others = CITY_PAGES.filter((c) => c.slug !== city.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PageHero
        h1={`Junk Removal in ${city.name}, TX`}
        title={city.tagline}
        lede={city.blurb}
        crumbs={[{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }, { name: city.name }]}
      />
      <section className="band band-white" aria-labelledby="haul-h">
        <div className="wrap why">
          <div>
            <p className="eyebrow">What We Haul</p>
            <h2 id="haul-h" className="display h-sec" style={{ marginTop: 14 }}>What We Haul in {city.name}</h2>
            <ul className="check-list mt-m">
              {SERVICES.map((s) => (
                <li key={s.title}><Check aria-hidden="true" /> <span><strong>{s.title}.</strong> {s.description}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Price It Now</p>
            <h2 className="display h-sec" style={{ marginTop: 14, marginBottom: 24 }}>What Will My Load Cost?</h2>
            <Estimator quoteHref="/quote" />
          </div>
        </div>
      </section>
      <section className="band-sm band-muted" aria-labelledby="near-h">
        <div className="wrap">
          <h2 id="near-h" className="display" style={{ fontSize: "1.8rem" }}>We Also Serve Nearby</h2>
          <ul className="city-list mt-s">
            {others.map((c) => (
              <li key={c.slug}><Link href={`/service-areas/${c.slug}`}>{c.name}<ArrowRight aria-hidden="true" /></Link></li>
            ))}
          </ul>
        </div>
      </section>
      <ClosingCTA heading={`Ready to Clear the Clutter in ${city.name}?`} />
    </>
  );
}
