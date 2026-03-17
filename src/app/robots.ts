import { MetadataRoute } from "next";

const BASE_URL = "https://parasmottanportfolio.online";

/**
 * Next.js App Router robots.txt.
 * Served automatically at /robots.txt.
 *
 * Allows all crawlers and points them to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
