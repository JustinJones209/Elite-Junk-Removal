import { Phone } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { TrustBadgeRow } from "@/components/ui/TrustBadgeRow";
import { Reveal } from "@/components/ui/Reveal";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

/** Full-width closing CTA band with repeated trust badges. */
export function FinalCTA() {
  return (
    <section className="bg-ink-gradient relative overflow-hidden py-16 md:py-24">
      {/* Warm orange glow accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-gold/25 blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-heading text-3xl font-800 leading-tight text-white md:text-5xl">
            Ready to Reclaim Your Space?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
            Get a free, no-obligation quote today. Same-day service available
            across Tyler and all of East Texas.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CTAButton href={`tel:${PHONE_TEL}`} size="lg">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call Now — {PHONE_DISPLAY}
            </CTAButton>
            <CTAButton href="/quote" variant="ghost" size="lg">
              Get a Free Quote
            </CTAButton>
          </div>

          <div className="mt-10">
            <TrustBadgeRow light />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
