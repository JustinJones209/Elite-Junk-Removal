import type { Metadata } from "next";
import { Phone, Check } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbSchema } from "@/lib/schema";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import {
  PRICING_TIERS,
  DISCOUNTS,
  SINGLE_ITEM_PRICES,
  TRAILER_LOAD_PRICES,
  EXTRA_CHARGES,
  CLEANOUT_TYPES,
  ITEMS_WE_TAKE,
} from "@/lib/pricing";

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
    <div className="bg-white dark:bg-ink">
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
          <h1 className="font-heading text-4xl font-800 text-ink dark:text-white md:text-5xl">
            Simple, Fair Pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-white/70">
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
                <h2 className="font-heading text-xl font-700 text-ink dark:text-white">
                  {tier.label}
                </h2>
                <p className="mt-2 font-heading text-2xl font-800 text-brand-gradient">
                  {tier.priceFrom}
                </p>
                <p className="mt-3 text-gray-600 dark:text-white/70">{tier.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-gray-500 dark:text-white/60">
          Final price depends on volume, weight, and material — we&apos;ll
          always confirm the exact number with you before we start.
        </p>

        {/* Full itemized pricing */}
        <Reveal>
          <div className="mx-auto mt-16 max-w-5xl">
            <h2 className="text-center font-heading text-2xl font-700 text-ink dark:text-white md:text-3xl">
              The Full Price List
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600 dark:text-white/70">
              Straight from our rate sheet — exact ranges for common items and
              trailer loads.
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              {/* Single item pricing */}
              <div className="overflow-hidden rounded-2xl border border-surface-border bg-surface shadow-sm">
                <div className="bg-ink px-6 py-4">
                  <h3 className="font-heading text-lg font-700 uppercase tracking-wide text-gold">
                    Single Item Pricing
                  </h3>
                </div>
                <ul className="divide-y divide-surface-border px-6">
                  {SINGLE_ITEM_PRICES.map((row) => (
                    <li
                      key={row.item}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <span className="text-gray-700 dark:text-white/80">
                        {row.item}
                        {"note" in row && row.note && (
                          <span className="block text-xs text-gray-500 dark:text-white/50">
                            {row.note}
                          </span>
                        )}
                      </span>
                      <span className="whitespace-nowrap font-700 text-ink dark:text-white">
                        {row.price}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="h-6" />
              </div>

              {/* Trailer load pricing + extra charges */}
              <div className="flex flex-col gap-8">
                <div className="overflow-hidden rounded-2xl border border-surface-border bg-surface shadow-sm">
                  <div className="bg-ink px-6 py-4">
                    <h3 className="font-heading text-lg font-700 uppercase tracking-wide text-gold">
                      Trailer Load Pricing
                    </h3>
                    <p className="text-sm text-white/60">14-foot dump trailer</p>
                  </div>
                  <ul className="divide-y divide-surface-border px-6">
                    {TRAILER_LOAD_PRICES.map((row) => (
                      <li
                        key={row.size}
                        className="flex items-center justify-between gap-4 py-3"
                      >
                        <span className="font-600 text-gray-700 dark:text-white/80">
                          {row.size}
                        </span>
                        <span className="whitespace-nowrap font-700 text-ink dark:text-white">
                          {row.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="px-6 pb-5 pt-1 text-xs text-gray-500 dark:text-white/50">
                    Prices may vary based on weight, volume, and type of
                    material.
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-surface-border bg-surface shadow-sm">
                  <div className="bg-ink px-6 py-4">
                    <h3 className="font-heading text-lg font-700 uppercase tracking-wide text-gold">
                      Extra Charges
                    </h3>
                  </div>
                  <ul className="divide-y divide-surface-border px-6">
                    {EXTRA_CHARGES.map((row) => (
                      <li
                        key={row.label}
                        className="flex items-center justify-between gap-4 py-3"
                      >
                        <span className="text-gray-700 dark:text-white/80">
                          {row.label}
                          {"note" in row && row.note && (
                            <span className="block text-xs text-gray-500 dark:text-white/50">
                              {row.note}
                            </span>
                          )}
                        </span>
                        <span className="whitespace-nowrap text-right font-700 text-ink dark:text-white">
                          {row.amount}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Full-service cleanouts + what we take */}
        <Reveal>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-gray-light p-8">
              <h2 className="font-heading text-xl font-700 text-ink dark:text-white">
                Full-Service Cleanouts
              </h2>
              <ul className="mt-5 space-y-2.5">
                {CLEANOUT_TYPES.map((type) => (
                  <li key={type} className="flex items-start gap-2 text-gray-700 dark:text-white/80">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" aria-hidden="true" />
                    <span>{type}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-gray-500 dark:text-white/60">
                No job too big or too small — we haul it all.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-light p-8">
              <h2 className="font-heading text-xl font-700 text-ink dark:text-white">
                We Take Almost Everything
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {ITEMS_WE_TAKE.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 text-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-600 text-gray-700 dark:text-white/80">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Discounts */}
        <Reveal>
          <div className="mx-auto mt-16 max-w-4xl rounded-2xl bg-gray-light p-8 md:p-10">
            <h2 className="text-center font-heading text-2xl font-700 text-ink dark:text-white md:text-3xl">
              Discounts
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DISCOUNTS.map((discount) => (
                <div key={discount.label} className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <discount.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="font-heading font-700 text-ink dark:text-white">{discount.label}</p>
                  <p className="text-sm text-gray-600 dark:text-white/70">{discount.amount}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-gray-500 dark:text-white/60">
              Discounts cannot be combined.
            </p>
          </div>
        </Reveal>

        {/* CTA */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl bg-ink p-8 text-center">
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
