import Image from "next/image";
import { Phone } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { TrustBadgeRow } from "@/components/ui/TrustBadgeRow";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { PHONE_DISPLAY, PHONE_TEL, BUSINESS } from "@/lib/site";
import { BEFORE_AFTER } from "@/lib/images";

/**
 * Above-the-fold hero: centered headline/CTAs, then the trailer photo
 * (TODO(launch): swap for a real video carousel once footage is ready),
 * then the garage before/after slider, then the trust-badge strip.
 */
export function Hero() {
  return (
    <section className="bg-warm-wash relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        {/* Copy */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full bg-gold/10 px-4 py-1.5 text-sm font-600 text-gold">
            Locally Owned in {BUSINESS.city}, {BUSINESS.regionName}
          </p>
          <h1 className="font-heading text-4xl font-800 uppercase leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            You Call, We Haul, It&apos;s{" "}
            <span className="text-brand-gradient">Gone</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600">
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

          <p className="mt-4 text-sm font-600 text-gray-500">
            Same-day service available · No obligation
          </p>
        </div>

        {/* Trailer photo — placeholder for a future video carousel */}
        <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="/photos/trailer.png"
            alt="Call Me Gone Junk Removal dump trailer"
            width={838}
            height={305}
            priority
            className="w-full object-cover"
          />
        </div>

        {/* Garage cleanout slider */}
        <div className="relative mx-auto mt-6 max-w-4xl">
          <BeforeAfterSlider pairs={[BEFORE_AFTER[0]]} />
        </div>

        {/* Trust badges */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <TrustBadgeRow />
        </div>
      </div>
    </section>
  );
}
