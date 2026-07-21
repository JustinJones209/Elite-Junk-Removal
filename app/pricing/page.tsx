import type { Metadata } from "next";
import { Phone, Check } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbSchema } from "@/lib/schema";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { PRICING_TIERS, PRICE_FACTORS, DISCOUNTS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, upfront junk removal pricing from Call Me Gone Junk Removal — single items, partial and full trailer loads, plus discounts for military, first responders, seniors, and repeat customers.",
  alternates: { canonical: "/pricing" },
};

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
]);

export default function PricingPage() {
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
            Pricing
          </p>
          <h1 className="font-heading text-4xl font-800 text-white md:text-5xl">
            Simple, Fair Pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Every job is different, so every quote is free and given upfront
            before we lift a thing. Here&apos;s what most jobs run.
          </p>
        </div>
      </div>

      {/* Tiers */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {PRICING_TIERS.map((tier, i) => (
            <Reveal key={tier.label} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-surface-border bg-surface p-8 text-center shadow-sm transition-all hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <tier.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-xl font-700 text-white">
                  {tier.label}
                </h2>
                <p className="mt-2 font-heading text-2xl font-800 text-brand-gradient">
                  {tier.priceFrom}
                </p>
                <p className="mt-3 text-white/70">{tier.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-white/60">
          Final price depends on volume, weight, and material — we&apos;ll
          always confirm the exact number with you before we start.
        </p>

        {/* What affects price */}
        <Reveal>
          <div className="mx-auto mt-16 max-w-3xl">
            <h2 className="text-center font-heading text-2xl font-700 text-white md:text-3xl">
              What Can Affect Your Price
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {PRICE_FACTORS.map((factor) => (
                <li key={factor} className="flex items-start gap-2 text-white/80">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" aria-hidden="true" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Discounts */}
        <Reveal>
          <div className="mx-auto mt-16 max-w-4xl rounded-2xl bg-gray-light p-8 md:p-10">
            <h2 className="text-center font-heading text-2xl font-700 text-white md:text-3xl">
              Discounts
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DISCOUNTS.map((discount) => (
                <div key={discount.label} className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <discount.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="font-heading font-700 text-white">{discount.label}</p>
                  <p className="text-sm text-white/70">{discount.amount}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-white/60">
              Discounts cannot be combined.
            </p>
          </div>
        </Reveal>

        {/* CTA */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl bg-ink-dark p-8 text-center">
          <h2 className="font-heading text-2xl font-700 text-white">
            Get Your Exact Price
          </h2>
          <p className="mt-2 text-white/80">
            Tell us what needs to go and we&apos;ll give you a free, honest
            quote — no obligation.
          </p>
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
