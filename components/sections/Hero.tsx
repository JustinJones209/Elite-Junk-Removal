import Image from "next/image";
import { Phone } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { TrustBadgeRow } from "@/components/ui/TrustBadgeRow";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { BEFORE_AFTER } from "@/lib/images";

/**
 * Above-the-fold hero: the trailer wrap photo as a sharp, full-bleed
 * background (TODO(launch): swap for a real video carousel once footage is
 * ready), with a dark scrim for legibility, a big centered headline/CTAs on
 * top, then the garage before/after slider, then the trust-badge strip.
 * Always dark regardless of site theme — the photo itself is the backdrop,
 * same convention as the other fixed-dark bands on the site (WhyChooseUs,
 * Footer, etc).
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Photo banner — height is capped (rather than spanning the whole
          section incl. the slider/badges below) so the low-res source photo
          isn't stretched further than necessary and stays as sharp as
          possible. TODO(launch): replace with a higher-resolution export of
          this photo — the current source is only 1282px wide, which is the
          ceiling for how crisp this can render full-bleed on large screens. */}
      <div className="relative flex min-h-[560px] items-center overflow-hidden sm:min-h-[600px] lg:min-h-[680px]">
        <Image
          src="/photos/trailer.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          quality={100}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/15 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 pb-10 sm:px-6 sm:pt-16 sm:pb-12 lg:px-8 lg:pt-20 lg:pb-14">
          <div className="mx-auto max-w-6xl text-center">
            <style>{`
              @keyframes heroBrushStrokeReveal {
                from {
                  clip-path: polygon(
                    0% 0%, 0% 0%, -4% 10%, 3% 20%, -3% 30%, 4% 40%,
                    -4% 50%, 3% 60%, -3% 70%, 4% 80%, -2% 90%, 0% 100%, 0% 100%
                  );
                }
                to {
                  clip-path: polygon(
                    0% 0%, 106% 0%, 102% 10%, 109% 20%, 103% 30%, 110% 40%,
                    102% 50%, 109% 60%, 103% 70%, 110% 80%, 104% 90%, 106% 100%, 0% 100%
                  );
                }
              }
            `}</style>
            <h1
              className="uppercase leading-[0.95] tracking-wide text-white"
              style={{
                fontFamily: "var(--font-bangers)",
                fontSize: "clamp(3rem, 5vw + 2rem, 9.5rem)",
                WebkitTextStroke: "1.5px white",
                animation: "heroBrushStrokeReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
              }}
            >
              You Call, We Haul, It&apos;s{" "}
              <span
                className="text-brand-gradient"
                style={{ WebkitTextStroke: "1.5px #c8890a" }}
              >
                Gone!
              </span>
            </h1>
            <p
              className="mx-auto mt-8 max-w-2xl text-lg font-600 text-white sm:text-xl"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.75), 0 1px 3px rgba(0,0,0,0.9)" }}
            >
              Reclaim your space from clutter. Fast, honest, full-service junk
              removal in Tyler &amp; all of East Texas. Same-day service, free
              estimates, and a crew that treats your home like their own.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <CTAButton href={`tel:${PHONE_TEL}`} size="lg">
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call Now — {PHONE_DISPLAY}
              </CTAButton>
              <CTAButton href="/pricing" variant="secondary" size="lg">
                See Pricing
              </CTAButton>
            </div>

            <p
              className="mt-4 text-sm font-700 text-white/90"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}
            >
              Same-day service available · No obligation
            </p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-6 pb-14 sm:px-6 sm:pt-8 sm:pb-16 lg:px-8 lg:pt-8 lg:pb-20">
        {/* Garage cleanout slider */}
        <div className="relative mx-auto max-w-4xl">
          <BeforeAfterSlider pairs={[BEFORE_AFTER[0]]} light />
        </div>

        {/* Trust badges */}
        <div className="mt-12 border-t border-white/15 pt-8">
          <TrustBadgeRow light />
        </div>
      </div>
    </section>
  );
}
