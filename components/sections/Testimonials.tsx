import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/site";

/** Customer reviews — grid on desktop, carousel on mobile. */
export function Testimonials() {
  return (
    <section id="reviews" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Reviews"
            heading="What Your Neighbors Are Saying"
          />
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-safety-orange text-safety-orange" />
              ))}
            </div>
            <span className="font-600 text-gray-600">
              Trusted across East Texas
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12">
            <TestimonialCarousel testimonials={TESTIMONIALS} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
