import type { Metadata } from "next";
import { readString } from "@/lib/json";

export const SITE_NAME = "Travelspire";

/**
 * Build Next Metadata from a Publishable `seo` jsonb column (title, description,
 * canonical, ogImage, noindex) with strong fallbacks. Every published entity
 * gets sane SEO for free; admin overrides live in the jsonb. metadataBase (set
 * in the root layout) resolves relative canonical/OG URLs.
 */
export function buildMetadata(
  seo: unknown,
  fallback: { title: string; description?: string; path: string },
): Metadata {
  const title = readString(seo, "title") ?? fallback.title;
  const description = readString(seo, "description") ?? fallback.description;
  const canonical = readString(seo, "canonical") ?? fallback.path;
  const ogImage = readString(seo, "ogImage");
  const noindex =
    !!seo && typeof seo === "object" && (seo as Record<string, unknown>).noindex === true;

  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
