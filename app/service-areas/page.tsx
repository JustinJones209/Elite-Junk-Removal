import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CITY_PAGES } from "@/lib/cities";
import { breadcrumbSchema } from "@/lib/schema";
import { SERVICE_REGION } from "@/lib/site";
import { SERVICE_ZIPS } from "@/lib/m7-content";
import { PageHero, ClosingCTA } from "@/components/m7/Bands";
import { ZipChecker } from "@/components/m7/ServiceAreaSection";

export const metadata: Metadata = {
  title: "Service Areas in East Texas",
  description:
    "Call Me Gone Junk Removal serves Tyler, Bullard, Whitehouse, Flint, Palestine, Lindale, Jacksonville, Rusk, Longview, Kilgore, and surrounding East Texas.",
  alternates: { canonical: "/service-areas" },
};

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Service Areas", path: "/service-areas" },
]);

export default function ServiceAreasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PageHero
        h1="Junk Removal Service Areas in East Texas"
        title="Serving Tyler & All of East Texas"
        lede="Based in Tyler, we cover a wide radius across East Texas. If your town isn't listed but you're nearby, reach out. Chances are we can still help."
        crumbs={[{ name: "Home", href: "/" }, { name: "Service Areas" }]}
      />
      <section className="band band-white" aria-labelledby="cities-h">
        <div className="wrap area">
          <div>
            <p className="eyebrow">Cities &amp; Towns</p>
            <h2 id="cities-h" className="display h-sec" style={{ marginTop: 14 }}>Cities &amp; Towns We Serve</h2>
            <ul className="city-list mt-m">
              {CITY_PAGES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/service-areas/${c.slug}`}>{c.name}<ArrowRight aria-hidden="true" /></Link>
                </li>
              ))}
            </ul>
            <p className="mt-s muted-text">…{SERVICE_REGION}.</p>
          </div>
          <ZipChecker />
        </div>
      </section>
      <section className="band-sm band-muted" aria-labelledby="zips-h">
        <div className="wrap">
          <h2 id="zips-h" className="display" style={{ fontSize: "1.8rem" }}>ZIP Codes We Cover</h2>
          <p className="mt-s" style={{ maxWidth: "70ch" }}>{SERVICE_ZIPS.join(" · ")}</p>
          <p className="mt-s muted-text">Don&apos;t see your ZIP code? Call us. We serve many more communities across East Texas.</p>
        </div>
      </section>
      <ClosingCTA heading="Ready to Clear the Clutter?" />
    </>
  );
}
