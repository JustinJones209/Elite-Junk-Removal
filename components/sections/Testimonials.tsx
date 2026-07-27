import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { getGoogleReviews } from "@/lib/google-reviews";
import { GOOGLE_REVIEW_URL } from "@/lib/site";

/**
 * Live 5-star Google reviews — grid on desktop, carousel on mobile.
 * Until the first real review comes in, shows a "leave us a review" CTA
 * instead of any placeholder/fake testimonials.
 */
export async function Testimonials() {
  const reviews = await getGoogleReviews();
  const hasReviews = reviews.length > 0;

  return (
    <section id="reviews" className="bg-white dark:bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Google Reviews"
            heading={
              hasReviews ? "What Your Neighbors Are Saying" : "Be Our First Google Review"
            }
          />
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="font-600 text-gray-600 dark:text-white/70">
              Trusted across East Texas
            </span>
          </div>
        </Reveal>

        {hasReviews ? (
          <Reveal delay={0.1}>
            <div className="mt-12">
              <TestimonialCarousel testimonials={reviews} />
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-xl text-center">
              <p className="text-gray-600 dark:text-white/70">
                We&apos;re just getting started on Google — if we&apos;ve helped clear out your
                space, a quick review helps other East Texas neighbors find us.
              </p>
              <div className="mt-6 flex justify-center">
                <CTAButton href={GOOGLE_REVIEW_URL} variant="secondary" size="lg">
                  Leave Us a Google Review
                </CTAButton>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
