import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { getPublishedTours } from "@/server/tours";
import { itemListJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { env } from "@/lib/env";
import { customTripUrl } from "@/lib/whatsapp";
import {
  bodyOf,
  daysUntilStart,
  difficultyTicks,
  routeLine,
  stopNames,
  tourFromPrice,
} from "@/lib/tours/read";
import { SiteHeader } from "@/components/site/site-header";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { TicketCard } from "@/components/site/ticket-card";
import { WhatsAppCTA } from "@/components/site/whatsapp-cta";
import { MediaImage } from "@/components/media/media-image";
import { WaxStamp } from "@/components/marketing/decor/wax-stamp";
import { ContourField } from "@/components/marketing/decor/contour-field";
import { RidgeMotif } from "@/components/marketing/decor/ridge-motif";
import { SunriseRidge, SnowPass, Hornbill, TrailDashed } from "@/components/icons/field-icons";
import { cn } from "@/lib/cn";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Expeditions — guided journeys across Northeast India",
  description:
    "Small-group expeditions through Arunachal Pradesh and beyond — Tawang, Mechuka, Dong Valley, Anini. Real itineraries, local crews, permits handled.",
  alternates: { canonical: "/tours" },
};

const TYPES = ["adventure", "cultural", "nature", "pilgrimage", "festival", "trek"] as const;

/** Season-rule icon: winter windows get the pass, festivals the hornbill. */
function seasonIcon(window: string, allFestivals: boolean) {
  if (allFestivals) return Hornbill;
  if (/dec|jan|feb|snow|winter/i.test(window)) return SnowPass;
  if (/oct|nov|mar|apr/i.test(window)) return SunriseRidge;
  return TrailDashed;
}

type SP = Promise<{ type?: string }>;

export default async function ToursPage({ searchParams }: { searchParams: SP }) {
  const { type } = await searchParams;
  const activeType = TYPES.find((t) => t === type) ?? null;

  const all = await getPublishedTours();
  const tours = activeType ? all.filter((t) => t.type === activeType) : all;

  /* Catalogue-wide Nº — stable across filters (position in the full list). */
  const numberOf = new Map(all.map((t, i) => [t.slug, i + 1]));

  /* The ledger line — computed, never typed. */
  const fromPrices = all.map((t) => tourFromPrice(t)).filter((p): p is number => p != null);
  const daysArr = all.map((t) => t.duration_days).filter((d): d is number => d != null);
  const ledger = [
    `${all.length} expeditions`,
    daysArr.length ? `${Math.min(...daysArr)}–${Math.max(...daysArr)} days` : null,
    fromPrices.length ? `From ₹${Math.min(...fromPrices).toLocaleString("en-IN")}` : null,
    "Permits handled",
  ].filter(Boolean) as string[];

  /* Featured = earned by testimonials, never hand-picked. */
  const featured =
    tours.find((t) => {
      const list = bodyOf(t).testimonials;
      return Array.isArray(list) && list.length > 0;
    }) ??
    tours[0] ??
    null;
  const rest = tours.filter((t) => t.slug !== featured?.slug);

  /* Season chapters — grouped by when you can actually go. Festivals collapse
     into ONE dated chapter (each carries its own date on the ticket + ledger)
     and follow the expeditions. */
  const FESTIVAL_KEY = "__festival__";
  const groups = new Map<string, typeof rest>();
  for (const tour of rest) {
    const isFest = (tour.format ?? tour.type) === "festival";
    const key = isFest ? FESTIVAL_KEY : tour.best_time?.trim() || "Year-round";
    const group = groups.get(key) ?? [];
    group.push(tour);
    groups.set(key, group);
  }
  const chapters = [...groups.entries()].sort(
    (a, b) => Number(a[0] === FESTIVAL_KEY) - Number(b[0] === FESTIVAL_KEY),
  );

  /* The festival ledger — dated departures across the whole catalogue. */
  const festivals = all
    .filter((t) => (t.format ?? t.type) === "festival" && t.best_time)
    .map((t) => ({ tour: t, countdown: daysUntilStart(bodyOf(t)) }))
    .sort((a, b) => (a.countdown ?? 999) - (b.countdown ?? 999));
  const nextUpSlug = festivals.find((f) => f.countdown != null)?.tour.slug ?? null;

  const base = env.NEXT_PUBLIC_SITE_URL;
  const presentTypes = TYPES.filter((t) => all.some((tour) => tour.type === t));
  const countOf = (t: (typeof TYPES)[number] | null) =>
    t ? all.filter((tour) => tour.type === t).length : all.length;

  const featuredBody = featured ? bodyOf(featured) : {};
  const featuredFrom = featured ? tourFromPrice(featured) : null;
  const featuredFacts = featured
    ? ([
        featured.nights != null && featured.duration_days
          ? `${featured.duration_days}D/${featured.nights}N`
          : featured.duration_days
            ? `${featured.duration_days} days`
            : null,
        difficultyTicks(featured.difficulty),
        featuredFrom ? `From ₹${featuredFrom.toLocaleString("en-IN")}` : null,
      ].filter(Boolean) as string[])
    : [];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[92rem] px-5 pt-6 pb-20 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" as Route }, { label: "Expeditions" }]} />

        {/* ── §1 THE OPENER — compact header, content dominates ──────────── */}
        <section aria-label="The expedition catalogue" className="relative mt-10 sm:mt-12">
          <ContourField
            aria-hidden
            className="pointer-events-none absolute -top-10 right-0 hidden h-64 w-[42rem] text-foreground opacity-[0.04] lg:block"
          />
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs font-medium tracking-[0.2em] text-secondary uppercase">
                The expedition catalogue · {new Date().getFullYear()}/
                {String(new Date().getFullYear() + 1).slice(2)}
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.03] font-medium text-balance sm:text-5xl">
                Journeys worth <em className="text-secondary">crossing the country</em> for.
              </h1>
            </div>
            <p className="max-w-md text-pretty text-muted-foreground lg:col-span-4 lg:justify-self-end lg:pb-1.5 lg:text-right">
              Small groups, local crews, real roads. Every expedition here has been driven, slept
              and eaten by us.
            </p>
          </div>

          {/* the ledger line */}
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border-subtle py-3.5 font-mono text-[11px] tracking-[0.16em] text-muted-foreground tabular-nums uppercase sm:mt-10 sm:gap-x-8">
            {ledger.map((fact, i) => (
              <span key={fact} className="flex items-center gap-6 sm:gap-8">
                {i > 0 ? (
                  <span aria-hidden className="text-secondary/60">
                    ▪
                  </span>
                ) : null}
                <span className={i === 0 ? "text-foreground" : undefined}>{fact}</span>
              </span>
            ))}
          </p>
        </section>

        {/* ── §2 FILTER LINE — crawl-safe links as mono bracket tokens ───── */}
        {presentTypes.length > 1 ? (
          <nav
            aria-label="Filter by type"
            className="-mx-5 mt-6 overflow-x-auto px-5 sm:mx-0 sm:px-0"
          >
            <ul className="flex w-max items-center gap-5 sm:gap-6">
              {[null, ...presentTypes].map((t) => {
                const active = activeType === t;
                return (
                  <li key={t ?? "all"}>
                    <Link
                      href={(t ? `/tours?type=${t}` : "/tours") as Route}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-block border-b-2 py-2 font-mono text-[11px] font-medium tracking-[0.16em] whitespace-nowrap uppercase transition-colors",
                        active
                          ? "border-foreground text-foreground"
                          : "border-transparent text-muted-foreground hover:border-border-strong hover:text-foreground",
                      )}
                    >
                      [ {t ?? "all"} {countOf(t)} ]
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        {/* ── §3 THE FEATURED DEPARTURE — earned, full spread ────────────── */}
        {featured ? (
          <Link
            href={`/tours/${featured.slug}` as Route}
            className="group relative mt-10 block overflow-hidden rounded-2xl shadow-lift outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="relative aspect-[4/5] sm:aspect-[21/9]">
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
                className="absolute inset-0 bg-linear-to-t from-charcoal-950/85 via-charcoal-950/25 to-transparent"
              />
              <WaxStamp
                label="Field-run"
                sub="Small group"
                className="absolute top-5 right-5 size-20 rotate-6 text-mist-100/80 sm:top-8 sm:right-8 sm:size-24"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <p className="font-mono text-[11px] tracking-[0.2em] text-mist-200 uppercase">
                Featured departure · Nº {String(numberOf.get(featured.slug) ?? 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2.5 max-w-2xl font-display text-3xl leading-[1.03] font-medium text-balance text-mist-50 sm:text-5xl">
                {featured.title}
              </h2>
              {routeLine(stopNames(featuredBody), 4) ? (
                <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-mist-200/90 uppercase">
                  {routeLine(stopNames(featuredBody), 4)}
                </p>
              ) : null}
              <p className="mt-4 flex flex-wrap items-center gap-x-3 font-mono text-xs tracking-[0.14em] text-mist-100 tabular-nums uppercase">
                {featuredFacts.map((fact, i) => (
                  <span key={fact} className="flex items-center gap-3">
                    {i > 0 ? (
                      <span aria-hidden className="text-mist-100/50">
                        ▪
                      </span>
                    ) : null}
                    {fact}
                  </span>
                ))}
                <span
                  aria-hidden
                  className="ml-1 text-base transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </p>
            </div>
          </Link>
        ) : null}

        {/* ── §4 THE SEASON CHAPTERS ─────────────────────────────────────── */}
        {chapters.map(([window, groupTours]) => {
          const allFestivals = window === FESTIVAL_KEY;
          const Icon = seasonIcon(window, allFestivals);
          const heading =
            window === "Year-round"
              ? "Any month works"
              : allFestivals
                ? "Festival dates"
                : "Riding out";
          const windowLabel = allFestivals ? "Each has its date" : window;
          return (
            <section
              key={window}
              className="mt-16 sm:mt-20"
              aria-label={allFestivals ? "Festival packages" : `Best time ${window}`}
            >
              {/* the season rule — a hairline interrupted by its label */}
              <div className="flex items-baseline gap-4 sm:gap-5">
                <div className="flex shrink-0 items-baseline gap-3">
                  <Icon aria-hidden className="size-5 shrink-0 translate-y-1 text-secondary" />
                  <h2 className="font-display text-2xl font-medium text-balance italic sm:text-3xl">
                    {heading}
                  </h2>
                  <span className="font-mono text-[11px] tracking-[0.16em] text-secondary uppercase">
                    {windowLabel}
                  </span>
                </div>
                <span aria-hidden className="h-px flex-1 translate-y-[-6px] bg-border-default" />
                <span className="shrink-0 font-mono text-[11px] tracking-[0.16em] text-muted-foreground tabular-nums uppercase">
                  {groupTours.length} departure{groupTours.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {groupTours.map((tour) => {
                  const tb = bodyOf(tour);
                  return (
                    <TicketCard
                      key={tour.slug}
                      ticket={{
                        slug: tour.slug,
                        title: tour.title,
                        hero: tour.hero,
                        routeLine: routeLine(stopNames(tb)),
                        duration:
                          tour.nights != null && tour.duration_days
                            ? `${tour.duration_days}D/${tour.nights}N`
                            : tour.duration_days
                              ? `${tour.duration_days}D`
                              : null,
                        ticks: difficultyTicks(tour.difficulty),
                        fromInr: tourFromPrice(tour),
                        index: numberOf.get(tour.slug),
                      }}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}

        {tours.length === 0 ? (
          <p className="mt-14 rounded-2xl border border-dashed border-border-default p-10 text-center text-muted-foreground">
            No expeditions match that filter yet —{" "}
            <Link href={"/tours" as Route} className="text-secondary underline underline-offset-4">
              see all of them
            </Link>
            .
          </p>
        ) : null}

        {/* ── §5 THE FESTIVAL LEDGER — some journeys have a date ─────────── */}
        {festivals.length > 0 && activeType !== "festival" ? (
          <section aria-label="Festival departures" className="mt-16 sm:mt-20">
            <div
              data-tone="sand"
              className="rounded-2xl border border-border-subtle bg-background px-6 py-8 text-foreground sm:px-10 sm:py-10"
            >
              <p className="font-mono text-xs font-medium tracking-[0.2em] text-secondary uppercase">
                Some journeys have a date
              </p>
              <h2 className="mt-3 font-display text-2xl leading-snug font-medium text-balance sm:text-3xl">
                The festival calendar.
              </h2>
              <ul className="mt-6">
                {festivals.map(({ tour, countdown }) => (
                  <li key={tour.slug}>
                    <Link
                      href={`/tours/${tour.slug}` as Route}
                      className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-dotted border-border-default py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-nowrap"
                    >
                      <span className="font-mono text-xs font-medium tracking-[0.14em] uppercase group-hover:underline group-hover:underline-offset-4">
                        {tour.title}
                      </span>
                      <span
                        aria-hidden
                        className="hidden min-w-8 flex-1 translate-y-[-3px] border-b border-dotted border-border-strong sm:block"
                      />
                      <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground tabular-nums uppercase">
                        {tour.best_time}
                      </span>
                      {countdown != null && tour.slug === nextUpSlug ? (
                        <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-accent tabular-nums uppercase">
                          In {countdown} days
                        </span>
                      ) : null}
                      <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground tabular-nums uppercase">
                        From ₹{(tourFromPrice(tour) ?? 0).toLocaleString("en-IN")}
                      </span>
                      <span
                        aria-hidden
                        className="text-sm text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* ── §6 THE CLOSER — custom departures ──────────────────────────── */}
        <section
          aria-label="Custom trips"
          className="relative mt-16 overflow-hidden border-t border-border-subtle pt-12 sm:mt-20 sm:pt-14"
        >
          <RidgeMotif
            aria-hidden
            className="pointer-events-none absolute right-0 -bottom-4 h-32 w-[36rem] text-foreground opacity-[0.05]"
          />
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="max-w-xl font-display text-3xl leading-tight font-medium text-balance sm:text-4xl">
                Can&apos;t find your dates? <em className="text-secondary">We build around them.</em>
              </h2>
              <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                <span>Max 12 people</span>
                <span aria-hidden className="text-secondary/60">
                  ▪
                </span>
                <span>Local crews only</span>
                <span aria-hidden className="text-secondary/60">
                  ▪
                </span>
                <span>Permits handled</span>
              </p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <WhatsAppCTA href={customTripUrl()} note="Replies within the hour · IST daytime">
                Plan a custom trip
              </WhatsAppCTA>
            </div>
          </div>
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
