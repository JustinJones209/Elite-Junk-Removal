import type { Metadata } from "next";
import { Check, Shield, Siren, Users, Repeat } from "lucide-react";
import { breadcrumbSchema } from "@/lib/schema";
import { DISCOUNTS, CLEANOUT_TYPES } from "@/lib/pricing";
import { PageHero, ClosingCTA } from "@/components/m7/Bands";
import { Estimator } from "@/components/m7/Estimator";
import { PriceLadder } from "@/components/m7/Pricing";
import { WhatWeTake } from "@/components/m7/WhatWeTake";

export const metadata: Metadata = {
  title: "Junk Removal Prices in Tyler, TX",
  description:
    "Upfront junk removal pricing in Tyler, TX: single items from $50, partial trailer loads from $175, full 14-ft trailer loads up to $750. 10% discounts available.",
  alternates: { canonical: "/pricing" },
};

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
]);

const DISCOUNT_ICONS = [Shield, Siren, Users, Repeat];

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PageHero
        h1="Junk Removal Prices in Tyler, TX"
        title="Simple, Fair, Upfront Pricing"
        lede="Every job is different, so every quote is free and given upfront before we lift a thing. Here's what most jobs run."
        crumbs={[{ name: "Home", href: "/" }, { name: "Pricing" }]}
      />

      <section className="band band-white" aria-labelledby="est-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Load-Size Estimator</p>
            <h2 id="est-h" className="display h-sec">How Much Does Junk Removal Cost in Tyler?</h2>
            <p className="lede">
              Single items start at $50. Partial trailer loads (a quarter to half of our 14-foot dump trailer) start
              at $175. A full trailer load runs up to $750. Slide to your load size below.
            </p>
          </div>
          <Estimator quoteHref="/quote" />
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="tiers-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Published Prices</p>
            <h2 id="tiers-h" className="display h-sec">Three Ways We Price a Job</h2>
          </div>
          <PriceLadder />
          <p className="mt-m">Final price depends on volume, weight, and material. We&apos;ll always confirm the exact number with you before we start.</p>
        </div>
      </section>

      <section className="band band-white" aria-labelledby="clean-h">
        <div className="wrap why">
          <div className="reveal">
            <p className="eyebrow">Full-Service Cleanouts</p>
            <h2 id="clean-h" className="display h-sec" style={{ marginTop: 14 }}>No Job Too Big or Too Small</h2>
            <ul className="check-list mt-m" style={{ columns: 2, columnGap: 24 }}>
              {CLEANOUT_TYPES.map((t) => (
                <li key={t} style={{ breakInside: "avoid" }}><Check aria-hidden="true" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <div className="hours-box" style={{ borderColor: "rgba(0,0,0,.14)", borderTopColor: "#c8890a" }}>
              <p className="eyebrow">Discounts</p>
              <h2 className="display" style={{ fontSize: "2rem", marginTop: 12 }}>10% Off For</h2>
              <ul className="check-list mt-s">
                {DISCOUNTS.map((d, i) => {
                  const Icon = DISCOUNT_ICONS[i] ?? Check;
                  return (
                    <li key={d.label}><Icon aria-hidden="true" /> <span><strong>{d.label}</strong>: {d.amount}</span></li>
                  );
                })}
              </ul>
              <p className="muted-text mt-s" style={{ fontSize: 14 }}>Discounts can&apos;t be combined, but we&apos;ll always apply whichever one saves you the most.</p>
            </div>
          </div>
        </div>
      </section>

      <WhatWeTake quoteHref="/quote" />
      <ClosingCTA heading="Get Your Exact Price Today" />
    </>
  );
}
