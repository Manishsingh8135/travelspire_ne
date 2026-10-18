// app/robots.ts
import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Search engines need /_next/ (CSS, JS and every optimised /_next/image), so
// it is never blocked. AI assistants that fetch pages to answer travellers —
// ChatGPT search, Perplexity, Claude search — fall under "*" and are welcome;
// only crawlers that collect training data are turned away.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin", "/trip/", "/pay/", "/private/", "/temp/"],
      },
      {
        userAgent: ["GPTBot", "CCBot", "ClaudeBot"],
        disallow: "/",
      },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/image-sitemap.xml`],
  };
}
