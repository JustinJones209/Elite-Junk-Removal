import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * robots.txt. Search and answer-engine crawlers are allowed. The thank-you
 * confirmation page is disallowed (it is also noindexed). Training-bot
 * blocks are a business decision and are not set here.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/thank-you"];
  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Claude-SearchBot",
          "Claude-User",
        ],
        allow: "/",
        disallow,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
