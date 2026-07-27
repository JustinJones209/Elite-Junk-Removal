import type { Testimonial } from "@/lib/site";
import { TESTIMONIALS } from "@/lib/site";

/**
 * Live Google review integration for the Reviews section.
 *
 * TODO(launch): Once the Call Me Gone Google Business Profile is live, set
 * GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in the environment. As soon as
 * both are present this automatically starts pulling real 5-star reviews
 * from the Places API — no further code changes needed. Until then this
 * returns an empty list (TESTIMONIALS is empty), and the Reviews section
 * shows a "leave us a review" CTA instead.
 */
export async function getGoogleReviews(): Promise<Testimonial[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return TESTIMONIALS;
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=reviews`,
      {
        headers: { "X-Goog-Api-Key": apiKey },
        // Reviews change slowly — cache for an hour rather than refetching on every request.
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return TESTIMONIALS;

    const data: {
      reviews?: {
        rating: number;
        text?: { text: string };
        authorAttribution?: { displayName: string };
      }[];
    } = await res.json();

    const fiveStar = (data.reviews ?? [])
      .filter((review) => review.rating === 5 && review.text?.text)
      .map(
        (review): Testimonial => ({
          quote: review.text!.text,
          name: review.authorAttribution?.displayName ?? "Google User",
          location: "Google review",
          rating: review.rating,
        }),
      );

    return fiveStar.length > 0 ? fiveStar : TESTIMONIALS;
  } catch {
    return TESTIMONIALS;
  }
}
