import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { getGoogleReviews } from "@/lib/google-reviews";

/**
 * Live 5-star Google reviews — grid on desktop, carousel on mobile.
 * Until the first real review comes in, shows a generic "leave us a
 * review" CTA instead of any placeholder/fake testimonials.
 *
 * TODO(launch): The button below is a no-op (no href/onClick) until the
 * Google Business Profile review link exists — wire it up to
 * GOOGLE_REVIEW_URL in lib/site.ts once that's available.
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
            heading={hasReviews ? "What Your Neighbors Are Saying" : "Leave Us a Review"}
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
            <div className="mt-10 flex justify-center">
              <CTAButton variant="secondary" size="lg">
                Leave Us a Google Review
              </CTAButton>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
