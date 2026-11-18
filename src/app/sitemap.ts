import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Pinned to the last real content update — avoids churning lastmod on every
// build, which dilutes the signal Google uses to schedule recrawls.
const LAST_MODIFIED = "2026-06-10";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: LAST_MODIFIED,
    },
  ];
}
