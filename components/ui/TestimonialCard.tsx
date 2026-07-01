import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/site";

/**
 * Single customer testimonial: star rating, quote, and attribution.
 */
export function TestimonialCard({ quote, name, location, rating }: Testimonial) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? "fill-safety-orange text-safety-orange" : "text-gray-300"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="flex-1 text-gray-700">
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-5 border-t border-gray-100 pt-4">
        <span className="block font-heading font-700 text-navy">{name}</span>
        <span className="block text-sm text-gray-500">{location}</span>
      </figcaption>
    </figure>
  );
}
