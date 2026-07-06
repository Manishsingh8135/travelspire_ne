import type { Metadata } from "next";
import { readString } from "@/lib/json";
import { env } from "@/lib/env";

export const SITE_NAME = "Travelspire";

/**
 * Site-wide identity for AI engines and search (read even where there is no
 * rich-result UI). Emit once on the homepage. See content-seo/01-seo-strategy.md.
 */
export function organizationJsonLd(): Record<string, unknown> {
  const url = env.NEXT_PUBLIC_SITE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url,
    logo: `${url}/images/logo/Travelspire_ne_logo_new.png`,
    description:
      "The living atlas, marketplaces and trip companion for Northeast India — guided when you want it, independent when you don't.",
    slogan: "Northeast India, on your own terms",
    areaServed: "Northeast India",
  };
}

/** WebSite node with a SearchAction so engines can surface site search. */
export function websiteJsonLd(): Record<string, unknown> {
  const url = env.NEXT_PUBLIC_SITE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/explore?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * ItemList node for a listing/hub (e.g. the Atlas region index). Items with a
 * real URL become linkable ListItems; name-only entries are still valid.
 * See content-seo/01-seo-strategy.md.
 */
export function itemListJsonLd(
  name: string,
  items: { name: string; url?: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { url: item.url } : {}),
    })),
  };
}

/**
 * BreadcrumbList node — always emitted together with the Breadcrumbs UI
 * (never one without the other; see docs-new/07-pages/README.md §2).
 */
export function breadcrumbJsonLd(
  items: { name: string; path?: string }[],
): Record<string, unknown> {
  const base = env.NEXT_PUBLIC_SITE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${base}${item.path}` } : {}),
    })),
  };
}

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
