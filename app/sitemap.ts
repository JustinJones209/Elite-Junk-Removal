import type { MetadataRoute } from "next";
import { CITY_PAGES } from "@/lib/cities";
import { SITE_URL } from "@/lib/site";

/**
 * XML sitemap. /thank-you is intentionally excluded (noindex confirmation page).
 * TODO(launch): SITE_URL must be the real production domain for valid URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/quote`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/service-areas`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    ...CITY_PAGES.map((city) => ({
      url: `${SITE_URL}/service-areas/${city.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
