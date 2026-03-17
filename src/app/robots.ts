import { MetadataRoute } from "next";

/**
 * Next.js App Router robots.txt — served at /robots.txt.
 *
 * Domain resolution order:
 *  1. NEXT_PUBLIC_SITE_URL env var (set in Vercel / production .env)
 *  2. Canonical production domain (fallback — never references localhost)
 */
const BASE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL?.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : null) ?? "https://parasmottanportfolio.online";

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
