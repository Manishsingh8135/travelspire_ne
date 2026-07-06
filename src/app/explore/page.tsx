import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Lock, MapPin } from "lucide-react";
import { getMappablePlaces, getRegions, getPlacesInRegion } from "@/server/atlas";
import { getPublishedTours } from "@/server/tours";
import { LivingMap } from "@/components/map/living-map";
import { SiteHeader } from "@/components/site/site-header";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { itemListJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { TourCard } from "@/components/site/tour-card";
import { Eyebrow } from "@/components/ui";
import { env } from "@/lib/env";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "The Living Map of Northeast India",
  description:
    "Every place, road and journey on one map — the spatial index of the Northeast. Explore published places, expeditions and the layers only locals know.",
  alternates: { canonical: "/explore" },
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export default async function ExplorePage() {
  const [places, regions, tours] = await Promise.all([
    getMappablePlaces().catch(() => []),
    getRegions().catch(() => []),
    getPublishedTours().catch(() => []),
  ]);
  const regionPlaces = await Promise.all(
    regions.map(async (region) => ({
      region,
      places: await getPlacesInRegion(region.id).catch(() => []),
    })),
  );
  const base = env.NEXT_PUBLIC_SITE_URL;

  const facts = [
    `${places.length} MAPPED PLACES`,
    `${regions.length} ${regions.length === 1 ? "STATE" : "STATES"} LIVE`,
    tours.length ? `${tours.length} EXPEDITIONS` : null,
  ].filter(Boolean) as string[];

  return (
    <>
      <SiteHeader />
      <main>
        {/* ── The map table ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[92rem] px-5 pt-6 sm:px-8 lg:px-12">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" as Route }, { label: "The Living Map" }]}
          />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <Eyebrow tone="pine" ornament>
                The Living Map
              </Eyebrow>
              <h1 className="mt-3 font-display text-4xl leading-[1.04] font-medium text-balance sm:text-5xl">
                The Northeast, <span className="italic text-secondary">unfolded.</span>
              </h1>
            </div>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.14em] text-muted-foreground tabular-nums uppercase">
              {facts.map((fact, i) => (
                <span key={fact} className="flex items-center gap-3">
                  {i > 0 ? <span aria-hidden className="size-1 rotate-45 bg-secondary/50" /> : null}
                  {fact}
                </span>
              ))}
            </p>
          </div>

          <div className="relative mt-6 h-[62vh] overflow-hidden rounded-3xl border border-border-subtle shadow-panel sm:h-[68vh] lg:h-[74vh]">
            <LivingMap places={places} token={env.NEXT_PUBLIC_MAPBOX_TOKEN} />
          </div>
          <p className="mt-3 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            Every pin is a published field entry · more mapped weekly
          </p>
        </section>

        {/* ── The index — the crawlable mirror of the map ──────────────── */}
        <section
          className="mx-auto mt-16 max-w-[92rem] px-5 sm:px-8 lg:px-12"
          aria-label="The atlas, as a list"
        >
          <h2 className="font-display text-2xl font-medium sm:text-3xl">The atlas, as a list.</h2>
          <p className="mt-2 max-w-xl text-pretty text-muted-foreground">
            Everything on the map, in reading order — every entry a real page.
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {regionPlaces.map(({ region, places: rp }) => (
              <div
                key={region.id}
                className="rounded-2xl border border-border-subtle bg-card p-6 shadow-panel"
              >
                <Link
                  href={`/${region.slug}` as Route}
                  className="group flex items-baseline justify-between gap-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <h3 className="font-display text-xl font-medium">{region.name}</h3>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <ul className="mt-4 flex flex-col">
                  {rp.map((place) => (
                    <li key={place.id} className="border-b border-border-subtle last:border-0">
                      <Link
                        href={`/${region.slug}/${place.slug}` as Route}
                        className="flex min-h-11 items-center justify-between gap-3 py-2 outline-none hover:text-secondary focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="flex items-center gap-2.5">
                          <MapPin className="size-3.5 shrink-0 text-secondary/70" />
                          {place.name}
                        </span>
                        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                          {place.kind}
                          {place.elevation_m
                            ? ` · ${place.elevation_m.toLocaleString("en-IN")} m`
                            : ""}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Journeys across it ───────────────────────────────────────── */}
        {tours.length ? (
          <section
            className="mx-auto mt-16 max-w-[92rem] px-5 sm:px-8 lg:px-12"
            aria-label="Journeys across the map"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-medium sm:text-3xl">
                Journeys across it.
              </h2>
              <Link
                href={"/tours" as Route}
                className="group inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.18em] uppercase underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
              >
                The full catalogue
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tours.slice(0, 3).map((tour) => (
                <TourCard
                  key={tour.slug}
                  tour={{
                    slug: tour.slug,
                    title: tour.title,
                    subtitle: tour.subtitle,
                    hero: tour.hero,
                    durationDays: tour.duration_days,
                    priceInr: tour.price_inr,
                    difficulty: tour.difficulty,
                    routeLine: (() => {
                      const stops = asRecord(tour.body).routeStops;
                      return Array.isArray(stops)
                        ? stops
                            .map((s) => String(asRecord(s).name ?? ""))
                            .filter(Boolean)
                            .join(" → ")
                        : "";
                    })(),
                  }}
                />
              ))}
            </div>
          </section>
        ) : null}

        {/* ── The one night moment ─────────────────────────────────────── */}
        <section className="mx-auto my-16 max-w-[92rem] px-5 sm:px-8 lg:px-12">
          <div
            data-tone="forest"
            className="relative overflow-hidden rounded-3xl bg-background px-6 py-10 text-foreground shadow-lift sm:px-10"
          >
            <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                  <Lock className="size-3.5" />
                  The hidden layer
                </p>
                <h2 className="mt-3 font-display text-2xl font-medium text-balance sm:text-3xl">
                  Some pins never make this map.
                </h2>
                <p className="mt-2 text-pretty text-muted-foreground">
                  Secret spots, sourced by local scouts and protected by design — Explorers get
                  the key.
                </p>
              </div>
              <Link
                href={"/#membership" as Route}
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-accent/40 px-5 py-2.5 text-sm font-medium tracking-wide text-accent uppercase transition-colors duration-200 outline-none hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring"
              >
                Become an Explorer
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <JsonLd
        data={itemListJsonLd(
          "Mapped places of Northeast India",
          regionPlaces.flatMap(({ region, places: rp }) =>
            rp.map((p) => ({ name: p.name, url: `${base}/${region.slug}/${p.slug}` })),
          ),
        )}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "The Living Map", path: "/explore" },
        ])}
      />
    </>
  );
}
