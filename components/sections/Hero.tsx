import Image from "next/image";
import { Phone } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { TrustBadgeRow } from "@/components/ui/TrustBadgeRow";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { PHONE_DISPLAY, PHONE_TEL, BUSINESS } from "@/lib/site";
import { BEFORE_AFTER } from "@/lib/images";

/**
 * Above-the-fold hero: the trailer photo as a full-bleed (but uncropped —
 * object-contain, so the whole trailer stays visible) background
 * (TODO(launch): swap for a real video carousel once footage is ready),
 * centered headline/CTAs on top, then the garage before/after slider, then
 * the trust-badge strip. Respects system light/dark mode throughout.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-ink">
      {/* Trailer photo background — object-contain so the full trailer is
          always visible rather than cropped in by object-cover. Softly
          blurred and scrimmed so its own text doesn't compete with the
          headline sitting on top. */}
      <div className="absolute inset-0">
        <Image
          src="/photos/trailer.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="object-contain blur-md scale-105"
        />
        <div className="absolute inset-0 bg-white/90 dark:bg-ink/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/85 to-white dark:from-ink/50 dark:via-ink/85 dark:to-ink" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        {/* Copy */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full bg-gold/10 px-4 py-1.5 text-sm font-600 text-gold">
            Locally Owned in {BUSINESS.city}, {BUSINESS.regionName}
          </p>
          <h1 className="font-heading text-4xl font-800 uppercase leading-[1.1] tracking-tight text-ink dark:text-white sm:text-5xl lg:text-6xl">
            You Call, We Haul, It&apos;s{" "}
            <span className="text-brand-gradient">Gone</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600 dark:text-white/75">
            Reclaim your space from clutter. Fast, honest, full-service junk
            removal in Tyler &amp; all of East Texas. Same-day service, free
            estimates, and a crew that treats your home like their own.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CTAButton href={`tel:${PHONE_TEL}`} size="lg">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call Now — {PHONE_DISPLAY}
            </CTAButton>
            <CTAButton href="/quote" variant="secondary" size="lg">
              Get a Free Quote
            </CTAButton>
          </div>

          <p className="mt-4 text-sm font-600 text-gray-500 dark:text-white/60">
            Same-day service available · No obligation
          </p>
        </div>

        {/* Garage cleanout slider */}
        <div className="relative mx-auto mt-12 max-w-4xl">
          <BeforeAfterSlider pairs={[BEFORE_AFTER[0]]} />
        </div>

        {/* Trust badges */}
        <div className="mt-12 border-t border-gray-200 dark:border-white/10 pt-8">
          <TrustBadgeRow />
        </div>
      </div>
    </section>
  );
}
