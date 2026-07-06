import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { getPublishedTours } from "@/server/tours";
import { itemListJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { env } from "@/lib/env";
import { customTripUrl } from "@/lib/whatsapp";
import { SiteHeader } from "@/components/site/site-header";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { HubHero } from "@/components/site/hub-hero";
import { TourCard } from "@/components/site/tour-card";
import { WhatsAppCTA } from "@/components/site/whatsapp-cta";
import { MediaImage } from "@/components/media/media-image";
import { cn } from "@/lib/cn";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Expeditions — guided journeys across Northeast India",
  description:
    "Small-group expeditions through Arunachal Pradesh and beyond — Tawang, Mechuka, Dong Valley, Anini. Real itineraries, local crews, permits handled.",
  alternates: { canonical: "/tours" },
};

const TYPES = ["adventure", "cultural", "nature", "pilgrimage", "festival", "trek"] as const;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function routeLine(body: unknown): string {
  const stops = asRecord(body).routeStops;
  if (!Array.isArray(stops)) return "";
  return stops
    .map((s) => String(asRecord(s).name ?? ""))
    .filter(Boolean)
    .join(" → ");
}

type SP = Promise<{ type?: string }>;

export default async function ToursPage({ searchParams }: { searchParams: SP }) {
  const { type } = await searchParams;
  const activeType = TYPES.find((t) => t === type) ?? null;

  const all = await getPublishedTours();
  const tours = activeType ? all.filter((t) => t.type === activeType) : all;

  // Computed facts — never typed claims.
  const prices = all.map((t) => t.price_inr).filter((p): p is number => p != null);
  const daysArr = all.map((t) => t.duration_days).filter((d): d is number => d != null);
  const facts = [
    `${all.length} EXPEDITIONS`,
    daysArr.length ? `${Math.min(...daysArr)}–${Math.max(...daysArr)} DAYS` : null,
    prices.length ? `FROM ₹${Math.min(...prices).toLocaleString("en-IN")}` : null,
  ].filter(Boolean) as string[];

  // Featured = the expedition with traveler testimonials (earned, not picked).
  const featured =
    tours.find((t) => Array.isArray(asRecord(t.body).testimonials)) ?? tours[0] ?? null;
  const rest = tours.filter((t) => t.slug !== featured?.slug);

  // The season's catalogue — grouped by when you can actually go.
  const groups = new Map<string, typeof rest>();
  for (const tour of rest) {
    const key = tour.best_time?.trim() || "Year-round";
    const group = groups.get(key) ?? [];
    group.push(tour);
    groups.set(key, group);
  }

  const base = env.NEXT_PUBLIC_SITE_URL;
  const presentTypes = TYPES.filter((t) => all.some((tour) => tour.type === t));

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[92rem] px-5 pt-6 pb-20 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" as Route }, { label: "Expeditions" }]} />

        <HubHero
          className="mt-8"
          eyebrow="Expeditions · The Catalogue"
          title={
            <>
              Journeys worth{" "}
              <span className="italic text-secondary">crossing the country for.</span>
            </>
          }
          lead="Small groups, local crews, real roads. Every expedition here has been driven, slept and eaten by us — permits handled, surprises kept to the good kind."
          facts={facts}
        />

        {/* Filter chips — server links, zero client JS, crawl-safe */}
        {presentTypes.length > 1 ? (
          <nav aria-label="Filter by type" className="mt-8 flex flex-wrap items-center gap-2">
            {[null, ...presentTypes].map((t) => {
              const active = activeType === t;
              return (
                <Link
                  key={t ?? "all"}
                  href={(t ? `/tours?type=${t}` : "/tours") as Route}
                  className={cn(
                    "min-h-11 content-center rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors",
                    active
                      ? "border-secondary bg-secondary text-secondary-foreground"
                      : "border-border-default text-muted-foreground hover:bg-muted",
                  )}
                >
                  {t ?? "All"}
                </Link>
              );
            })}
          </nav>
        ) : null}

        {/* The featured departure */}
        {featured ? (
          <Link
            href={`/tours/${featured.slug}` as Route}
            className="group relative mt-10 block overflow-hidden rounded-3xl shadow-lift outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="relative aspect-[4/3] sm:aspect-[21/9]">
              {featured.hero ? (
                <MediaImage
                  media={featured.hero}
                  priority
                  sizes="(min-width: 1472px) 1408px, 100vw"
                  className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                />
              ) : null}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10" data-tone="forest">
              <p className="font-mono text-[11px] tracking-[0.2em] text-mist-200 uppercase">
                Featured expedition
                {routeLine(featured.body) ? ` · ${routeLine(featured.body)}` : ""}
              </p>
              <h2 className="mt-2 max-w-2xl font-display text-3xl leading-[1.05] font-medium text-balance text-mist-50 sm:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 font-mono text-xs tracking-[0.14em] text-mist-100 tabular-nums uppercase">
                {featured.duration_days ? <span>{featured.duration_days} days</span> : null}
                {featured.price_inr ? (
                  <span>From ₹{featured.price_inr.toLocaleString("en-IN")}</span>
                ) : null}
                <span className="inline-flex items-center gap-1.5">
                  The story
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </p>
            </div>
          </Link>
        ) : null}

        {/* The season's catalogue */}
        {[...groups.entries()].map(([window, groupTours]) => (
          <section key={window} className="mt-14" aria-label={`Best time ${window}`}>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 className="font-display text-2xl font-medium sm:text-3xl">
                {window === "Year-round" ? "Any month works" : "Riding out"}
              </h2>
              <span className="font-mono text-xs tracking-[0.18em] text-secondary uppercase">
                {window}
              </span>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {groupTours.map((tour) => (
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
                    routeLine: routeLine(tour.body),
                  }}
                />
              ))}
            </div>
          </section>
        ))}

        {tours.length === 0 ? (
          <p className="mt-14 rounded-2xl border border-dashed border-border-default p-10 text-center text-muted-foreground">
            No expeditions match that filter yet —{" "}
            <Link href={"/tours" as Route} className="text-secondary underline underline-offset-4">
              see all of them
            </Link>
            .
          </p>
        ) : null}

        {/* The promise footer */}
        <section className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-border-subtle bg-mist-200/60 p-8 sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-medium text-balance sm:text-3xl">
              Can&apos;t decide? Tell us your dates.
            </h2>
            <p className="mt-2 text-pretty text-muted-foreground">
              We build custom routes around your window, your pace and your machine — permits
              included.
            </p>
          </div>
          <WhatsAppCTA href={customTripUrl()} note="Replies within the hour · IST daytime">
            Plan a custom trip
          </WhatsAppCTA>
        </section>
      </main>

      <JsonLd
        data={itemListJsonLd(
          "Expeditions across Northeast India",
          all.map((t) => ({ name: t.title, url: `${base}/tours/${t.slug}` })),
        )}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Expeditions", path: "/tours" },
        ])}
      />
    </>
  );
}
