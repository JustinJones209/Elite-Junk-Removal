import { Phone } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { TrustBadgeRow } from "@/components/ui/TrustBadgeRow";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { PHONE_DISPLAY, PHONE_TEL, BUSINESS } from "@/lib/site";
import { BEFORE_AFTER } from "@/lib/images";

/**
 * Above-the-fold hero: headline built on the slogan, two CTAs, hero photo,
 * and the trust-badge strip directly beneath.
 */
export function Hero() {
  return (
    <section className="bg-warm-wash relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <p className="mb-4 inline-flex items-center rounded-full bg-gold/10 px-4 py-1.5 text-sm font-600 text-gold">
              Locally Owned in {BUSINESS.city}, {BUSINESS.regionName}
            </p>
            <h1 className="font-heading text-4xl font-800 uppercase leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              You Call, We Haul, It&apos;s{" "}
              <span className="text-brand-gradient">Gone</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600 lg:mx-0">
              Reclaim your space from clutter. Fast, honest, full-service junk
              removal in Tyler &amp; all of East Texas. Same-day service, free
              estimates, and a crew that treats your home like their own.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <CTAButton href={`tel:${PHONE_TEL}`} size="lg">
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call Now — {PHONE_DISPLAY}
              </CTAButton>
              <CTAButton href="/quote" variant="secondary" size="lg">
                Get a Free Quote
              </CTAButton>
            </div>

            <p className="mt-4 text-sm font-600 text-gray-500">
              Same-day service available · No obligation
            </p>
          </div>

          {/* Hero image — real garage cleanout, drag to compare */}
          <div className="relative">
            <BeforeAfterSlider pairs={[BEFORE_AFTER[0]]} />
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <TrustBadgeRow />
        </div>
      </div>
    </section>
  );
}
