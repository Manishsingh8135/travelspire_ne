import type { Metadata } from "next";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { getPlaceBySlug, getPlaceParams, getRegionBySlug } from "@/server/atlas";
import { buildMetadata } from "@/lib/seo";
import { readString } from "@/lib/json";
import { env } from "@/lib/env";
import { SiteHeader } from "@/components/site/site-header";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";

export const revalidate = 3600;

type Params = { params: Promise<{ regionSlug: string; placeSlug: string }> };

export async function generateStaticParams() {
  return getPlaceParams();
}

function formatCoords(lat: number | null, lng: number | null): string | null {
  if (lat == null || lng == null) return null;
  const ns = lat >= 0 ? "N" : "S";
  const ew = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}°${ns}  ${Math.abs(lng).toFixed(4)}°${ew}`;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { regionSlug, placeSlug } = await params;
  const place = await getPlaceBySlug(placeSlug);
  if (!place) return {};
  return buildMetadata(place.seo, {
    title: place.name,
    description:
      readString(place.seo, "description") ?? readString(place.body, "intro"),
    path: `/${regionSlug}/${placeSlug}`,
  });
}

export default async function PlacePage({ params }: Params) {
  const { regionSlug, placeSlug } = await params;
  const place = await getPlaceBySlug(placeSlug);
  if (!place) notFound();

  const region = await getRegionBySlug(regionSlug);
  if (!region || place.region_id !== region.id) notFound();

  const intro = readString(place.body, "intro") ?? readString(place.seo, "description");
  const coords = formatCoords(place.lat, place.lng);
  const base = env.NEXT_PUBLIC_SITE_URL;
  const url = `${base}/${regionSlug}/${placeSlug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: place.name,
      url,
      ...(intro ? { description: intro } : {}),
      ...(place.lat != null && place.lng != null
        ? { geo: { "@type": "GeoCoordinates", latitude: place.lat, longitude: place.lng } }
        : {}),
      containedInPlace: { "@type": "TouristDestination", name: region.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        { "@type": "ListItem", position: 2, name: region.name, item: `${base}/${regionSlug}` },
        { "@type": "ListItem", position: 3, name: place.name, item: url },
      ],
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-10 md:px-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" as Route },
            { label: region.name, href: `/${regionSlug}` as Route },
            { label: place.name },
          ]}
        />

        <article className="mt-6 flex flex-col gap-6">
          <header className="flex flex-col gap-3 border-b border-border-subtle pb-8">
            <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              <span className="capitalize">{place.kind}</span> · {region.name}
            </p>
            <h1 className="font-display text-5xl font-medium text-balance">{place.name}</h1>
            <dl className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm text-muted-foreground">
              {place.elevation_m ? (
                <div className="flex gap-2">
                  <dt className="text-muted-foreground/70">Elevation</dt>
                  <dd className="tabular-nums text-foreground">
                    {place.elevation_m.toLocaleString()} m
                  </dd>
                </div>
              ) : null}
              {coords ? (
                <div className="flex gap-2">
                  <dt className="text-muted-foreground/70">Coordinates</dt>
                  <dd className="tabular-nums text-foreground">{coords}</dd>
                </div>
              ) : null}
            </dl>
          </header>

          {intro ? (
            <p className="text-lg leading-relaxed text-pretty">{intro}</p>
          ) : (
            <p className="text-muted-foreground">More on {place.name} coming soon.</p>
          )}
        </article>
      </main>
      <JsonLd data={jsonLd} />
    </>
  );
}
