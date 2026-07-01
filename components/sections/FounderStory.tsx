import Image from "next/image";
import { Heart } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { BUSINESS } from "@/lib/site";
import { IMAGES } from "@/lib/images";

/**
 * "Meet Gustavo" founder story — photo, warm-but-tight bio, slogan tie-in,
 * and a Family Owned & Operated callout. Trust/credibility section.
 */
export function FounderStory() {
  return (
    <section id="about" className="bg-gray-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Photo */}
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl lg:mx-0">
                <Image
                  src={IMAGES.founder.src}
                  alt={IMAGES.founder.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              {/* Family Owned badge */}
              <div className="bg-brand-gradient absolute -bottom-4 left-6 flex items-center gap-2 rounded-full px-5 py-3 text-white shadow-lg">
                <Heart className="h-5 w-5 fill-white" aria-hidden="true" />
                <span className="font-heading text-sm font-700">
                  Family Owned &amp; Operated
                </span>
              </div>
            </div>
          </Reveal>

          {/* Story */}
          <Reveal delay={0.1}>
            <div>
              <p className="mb-3 text-sm font-600 uppercase tracking-widest text-safety-orange">
                Meet the Owner
              </p>
              <h2 className="font-heading text-3xl font-800 text-navy md:text-4xl">
                Meet Gustavo Morales
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-gray-600">
                <p>
                  Gus is a husband and father of two energetic boys, and he
                  built Elite Junk Removal on a standard set by his mentor:
                  &ldquo;Hard work and clean living.&rdquo;
                </p>
                <p>
                  No shortcuts, no mess left behind — just an honest day&apos;s
                  work and a job done with a spirit of excellence.
                </p>
                <p className="font-heading text-xl font-600 italic text-navy">
                  &ldquo;{BUSINESS.slogan}&rdquo;
                </p>
              </div>
              <div className="mt-8">
                <CTAButton href="/quote" variant="secondary">
                  Get Your Free Quote
                </CTAButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
