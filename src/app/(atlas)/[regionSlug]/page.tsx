import type { Metadata } from "next";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { getPlacesInRegion, getRegionBySlug, getRegions } from "@/server/atlas";
import { buildMetadata } from "@/lib/seo";
import { readString } from "@/lib/json";
import { env } from "@/lib/env";
import { SiteHeader } from "@/components/site/site-header";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PlaceCard } from "@/components/atlas/place-card";
import { JsonLd } from "@/components/seo/json-ld";

export const revalidate = 3600;

type Params = { params: Promise<{ regionSlug: string }> };

export async function generateStaticParams() {
  const regions = await getRegions();
  return regions.map((region) => ({ regionSlug: region.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { regionSlug } = await params;
  const region = await getRegionBySlug(regionSlug);
  if (!region) return {};
  return buildMetadata(region.seo, {
    title: region.name,
    description:
      readString(region.seo, "description") ??
      `Explore ${region.name}, Northeast India — places, seasons and how to go.`,
    path: `/${regionSlug}`,
  });
}

export default async function RegionPage({ params }: Params) {
  const { regionSlug } = await params;
  const region = await getRegionBySlug(regionSlug);
  if (!region) notFound();

  const places = await getPlacesInRegion(region.id);
  const intro = readString(region.body, "intro") ?? readString(region.seo, "description");
  const base = env.NEXT_PUBLIC_SITE_URL;
  const url = `${base}/${regionSlug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: region.name,
      url,
      ...(intro ? { description: intro } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        { "@type": "ListItem", position: 2, name: region.name, item: url },
      ],
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" as Route }, { label: region.name }]} />

        <header className="mt-6 flex flex-col gap-4 border-b border-border-subtle pb-10">
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            {region.level} · Northeast India
          </p>
          <h1 className="font-display text-5xl font-medium text-balance">{region.name}</h1>
          {intro ? (
            <p className="max-w-2xl text-lg text-muted-foreground text-pretty">{intro}</p>
          ) : null}
        </header>

        <section className="py-10">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-medium">Places</h2>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {places.length} {places.length === 1 ? "place" : "places"}
            </span>
          </div>
          {places.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {places.map((place) => (
                <PlaceCard key={place.id} place={place} regionSlug={regionSlug} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No places published yet.</p>
          )}
        </section>
      </main>
      <JsonLd data={jsonLd} />
    </>
  );
}
