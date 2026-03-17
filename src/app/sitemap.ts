import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { POSTS } from "@/lib/blog-data";
import { PROJECTS } from "@/lib/work-data";

const BASE_URL = "https://parasmottanportfolio.online";

/**
 * Recursively walks the Next.js App Router directory and collects all
 * route segments that contain a `page.tsx` / `page.jsx` / `page.js` file.
 *
 * Rules:
 *  - Skips dynamic segments (directories wrapped in [ ])  — those are
 *    expanded below using their actual data sources.
 *  - Skips route groups (directories wrapped in ( )).
 *  - Skips Next.js internals: `api/`, `_` prefixes, hidden dirs.
 *
 * Returns paths relative to the app root, e.g. ["", "about", "blog", "contact"]
 */
function collectStaticRoutes(
  dir: string,
  appRoot: string,
  routes: string[] = []
): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const hasPage = entries.some(
    (e) =>
      e.isFile() &&
      /^page\.(tsx|jsx|js|ts)$/.test(e.name)
  );

  if (hasPage) {
    // Convert absolute dir path → URL segment
    const relative = path.relative(appRoot, dir).replace(/\\/g, "/");
    routes.push(relative); // "" for root, "about" for /about, etc.
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const name = entry.name;

    // Skip dynamic segments — handled separately per data source
    if (name.startsWith("[")) continue;
    // Skip route groups (Next.js layout groups)
    if (name.startsWith("(")) continue;
    // Skip API routes
    if (name === "api") continue;
    // Skip hidden/internal directories
    if (name.startsWith("_") || name.startsWith(".")) continue;

    collectStaticRoutes(path.join(dir, name), appRoot, routes);
  }

  return routes;
}

/** Map a filesystem segment path to a URL and pick sensible SEO defaults */
function segmentToEntry(
  segment: string,
  now: Date
): MetadataRoute.Sitemap[number] {
  const urlPath = segment === "" ? "" : `/${segment}`;
  const url = `${BASE_URL}${urlPath}`;

  // Priority / change-frequency heuristics based on segment depth & name
  const depth = segment === "" ? 0 : segment.split("/").length;
  const isRoot = segment === "";
  const isHighTraffic = ["blog", "work"].includes(segment);
  const isLegal = ["privacy-policy", "terms-and-conditions"].includes(segment);

  return {
    url,
    lastModified: now,
    changeFrequency: isLegal
      ? "yearly"
      : isHighTraffic
      ? "weekly"
      : depth <= 1
      ? "monthly"
      : "monthly",
    priority: isRoot
      ? 1.0
      : isHighTraffic
      ? 0.9
      : isLegal
      ? 0.3
      : 0.8 - depth * 0.1,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── 1. Auto-discover all static routes from the filesystem ────────────────
  const appDir = path.join(process.cwd(), "src", "app");
  const staticSegments = collectStaticRoutes(appDir, appDir);
  const staticRoutes = staticSegments.map((seg) => segmentToEntry(seg, now));

  // ── 2. Dynamic blog routes — derived from the blog data source ──────────
  //    POSTS is the canonical data source (src/lib/blog-data.ts).
  //    When a new post is added there it automatically appears here.
  const blogRoutes: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${encodeURIComponent(post.slug)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── 3. Dynamic work/project routes — derived from the projects data source
  const workRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${BASE_URL}/work/${encodeURIComponent(project.slug)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...workRoutes];
}
