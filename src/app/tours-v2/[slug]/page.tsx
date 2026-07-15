import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { getPublishedTours, getTourBySlug, getTourDays } from "@/server/tours";
import { buildMetadata } from "@/lib/seo";
import { readString } from "@/lib/json";
import { tourInquiryUrl, availabilityUrl } from "@/lib/whatsapp";
import type { ItineraryDay } from "@/lib/tours/itinerary";
import type { Pricing } from "@/lib/tours/pricing";
import {
  bodyOf,
  daysUntilStart,
  legacyDays,
  overnightNodes,
  parsePricing,
  strArray,
  tourFromPrice,
} from "@/lib/tours/read";
import { SiteHeader } from "@/components/site/site-header";
import { MediaImage } from "@/components/media/media-image";
import { Photo } from "@/components/ui/photo";
import { RidgeMotif } from "@/components/marketing/decor/ridge-motif";
import { cn } from "@/lib/cn";

export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const tours = await getPublishedTours();
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return {};
  return buildMetadata(tour.seo, {
    title: `${tour.title} — v2 preview`,
    description: tour.subtitle ?? readString(tour.body, "overview"),
    path: `/tours-v2/${slug}`,
  });
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ── the big facts — numerals as editorial, never stat tiles ─────────────── */

function BigFacts({ facts }: { facts: { value: string; label: string; em?: boolean }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-between lg:gap-x-12">
      {facts.map((f) => (
        <div key={f.label} className="min-w-0">
          <dd
            className={cn(
              "font-editorial leading-none tabular-nums",
              f.em ? "text-[2rem] italic md:text-[2.6rem]" : "text-4xl md:text-5xl",
            )}
          >
            {f.value}
          </dd>
          <dt className="mt-2.5 text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase md:text-xs">
            {f.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

/* ── the route, human-sized ──────────────────────────────────────────────── */

function RouteLine({ nodes }: { nodes: { name: string; nights: number }[] }) {
  if (nodes.length < 2) return null;
  return (
    <ol className="flex flex-col gap-0 sm:flex-row sm:flex-wrap sm:items-start sm:gap-y-6">
      {nodes.map((node, i) => (
        <li key={`${node.name}-${i}`} className="flex items-start sm:items-center">
          <div className="flex items-baseline gap-3 sm:block sm:text-center">
            <span
              aria-hidden
              className={cn(
                "relative top-[1px] inline-block size-3 shrink-0 rounded-full sm:top-0",
                node.nights === 0 ? "border-2 border-secondary" : "bg-secondary",
              )}
            />
            <div className="sm:mt-2.5">
              <p className="text-base leading-tight font-semibold md:text-lg">{node.name}</p>
              <p className="mt-0.5 text-sm text-muted-foreground italic md:text-base">
                {node.nights === 0 ? "start" : node.nights === 1 ? "1 night" : `${node.nights} nights`}
              </p>
            </div>
          </div>
          {i < nodes.length - 1 ? (
            <span
              aria-hidden
              className="mtx my-2 ml-[5px] h-8 w-px bg-border-strong sm:mx-4 sm:my-0 sm:mt-[5px] sm:h-px sm:w-10 md:w-16 lg:w-20"
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/* ── a day, as a chapter ─────────────────────────────────────────────────── */

function DayChapter({ day }: { day: ItineraryDay }) {
  const meta = [
    day.distanceKm ? `${day.distanceKm} km` : null,
    day.driveTime ?? null,
    day.tripTime ? `departs ${day.tripTime}` : null,
  ].filter(Boolean) as string[];
  const overnightType = day.overnight?.type;

  return (
    <article className="grid gap-x-10 gap-y-2 border-t border-border-subtle py-10 md:grid-cols-[minmax(0,13rem)_1fr] md:py-16">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase md:text-xs">
          Day
        </p>
        <p
          aria-hidden
          className="font-editorial text-ghost -mt-1 text-[clamp(4rem,12vw,7.5rem)] leading-[0.9] tabular-nums md:mt-0"
        >
          {String(day.dayNo).padStart(2, "0")}
        </p>
      </div>

      <div className="min-w-0">
        {day.route ? (
          <p className="text-sm font-semibold tracking-[0.16em] text-secondary uppercase md:text-base">
            {day.route.from} → {day.route.to}
          </p>
        ) : null}
        <h3 className="mt-2 font-editorial text-3xl leading-[1.05] text-balance md:text-[2.75rem]">
          {day.title}
        </h3>
        {meta.length ? (
          <p className="mt-3 text-base text-muted-foreground md:text-lg">{meta.join(" · ")}</p>
        ) : null}
        {day.summary ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
            {day.summary}
          </p>
        ) : null}

        {day.sightseeing.length ? (
          <p className="mt-5 max-w-2xl text-base leading-loose md:text-lg">
            {day.sightseeing.map((item, i) => (
              <span key={`${item.name}-${i}`} className="whitespace-nowrap">
                {i > 0 ? <span aria-hidden className="mx-3 text-secondary">·</span> : null}
                <span className="whitespace-normal">{item.name}</span>
              </span>
            ))}
          </p>
        ) : null}

        {day.overnight ? (
          <p className="mt-6 text-lg font-medium md:text-xl">
            <span aria-hidden className="mr-2.5 text-secondary">☾</span>
            Night in {day.overnight.name}
            {overnightType ? (
              <span className="text-muted-foreground italic"> — {overnightType}</span>
            ) : null}
          </p>
        ) : null}

        {day.tags.includes("sunrise") ? (
          <p className="mt-6 rounded-2xl bg-accent-subtle px-6 py-5 font-editorial text-xl leading-snug italic md:px-8 md:text-2xl">
            Sunrise day{day.tripTime ? ` — on the road by ${day.tripTime.toLowerCase()}` : ""}. Worth
            every lost hour of sleep.
          </p>
        ) : null}
        {day.tags.includes("trek") ? (
          <p className="mt-6 rounded-2xl bg-pine-100 px-6 py-5 font-editorial text-xl leading-snug italic md:px-8 md:text-2xl dark:bg-pine-950">
            Trekking day — real walking, a local guide, no vehicle support on the trail.
          </p>
        ) : null}
      </div>
    </article>
  );
}

/* ── rates as editorial rows ─────────────────────────────────────────────── */

function RateRows({ pricing, priceInr, title }: { pricing: Pricing | null; priceInr: number | null; title: string }) {
  type Row = { key: string; label: string; sub?: string | null; price: number; ask: string };
  const rows: Row[] = pricing
    ? pricing.modes.flatMap((m): Row[] =>
        m.mode === "group"
          ? m.tiers.map((t) => ({
              key: `g${t.groupSize}`,
              label: t.groupSize > 0 ? `Group of ${t.groupSize}` : (m.label ?? "Group"),
              price: t.pricePax,
              ask: t.groupSize > 0 ? `group of ${t.groupSize}` : "group",
            }))
          : m.mode === "private"
            ? [{ key: "p", label: m.label ?? "Private", price: m.pricePax, ask: m.label ?? "private" }]
            : [
                {
                  key: m.label,
                  label: m.label,
                  sub:
                    [
                      m.nights != null && m.days != null ? `${m.nights} nights / ${m.days} days` : null,
                      m.inclusions.length ? m.inclusions.join(" · ") : null,
                    ]
                      .filter(Boolean)
                      .join(" — ") || null,
                  price: m.pricePax,
                  ask: m.label,
                },
              ],
      )
    : priceInr != null
      ? [{ key: "flat", label: "Per person", price: priceInr, ask: "standard" }]
      : [];
  if (rows.length === 0) return null;
  const min = rows.reduce((a, b) => (b.price < a.price ? b : a));

  return (
    <div>
      {rows.map((row) => (
        <div
          key={row.key}
          className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-border-subtle py-6 md:py-7"
        >
          <div className="min-w-0 max-w-xl">
            <p className="text-lg font-medium md:text-xl">{row.label}</p>
            {row.sub ? (
              <p className="mt-1.5 text-base leading-relaxed text-pretty text-muted-foreground">
                {row.sub}
              </p>
            ) : null}
            <a
              href={availabilityUrl(title, row.ask)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-base font-medium text-secondary underline-offset-4 hover:underline"
            >
              Ask availability →
            </a>
          </div>
          <p className="font-editorial text-3xl tabular-nums md:text-4xl">
            {inr(row.price)}
            <span className="ml-2 font-sans text-sm text-muted-foreground md:text-base">/ person</span>
          </p>
        </div>
      ))}
      <p className="border-t border-border-subtle pt-5 text-base text-muted-foreground italic">
        {pricing
          ? `"From ${inr(min.price)}" is the ${min.label.toLowerCase()} rate. No prepayment to ask.`
          : "Group and private rates on WhatsApp. No prepayment to ask."}
      </p>
    </div>
  );
}

/* ── page ─────────────────────────────────────────────────────────────────── */

export default async function TourV2Page({ params }: Params) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const [structuredDays, allTours] = await Promise.all([
    getTourDays(tour.id).catch(() => []),
    getPublishedTours(),
  ]);

  const body = bodyOf(tour);
  const days = structuredDays.length ? structuredDays : legacyDays(body);
  const nodes = overnightNodes(days);
  const pricing = parsePricing(tour.pricing);
  const from = tourFromPrice(tour);
  const overview = readString(tour.body, "overview");
  const highlights = strArray(body.highlights);
  const inclusions = strArray(body.inclusions);
  const exclusions = strArray(body.exclusions);
  const carry = strArray(body.thingsToCarry);
  const permitTags = strArray(body.permit_tags);
  const note = readString(tour.body, "importantNote");
  const gallery = strArray(body.gallery);
  const quotes = (Array.isArray(body.testimonials) ? body.testimonials : []).flatMap((t) => {
    if (!t || typeof t !== "object") return [];
    const r = t as Record<string, unknown>;
    return typeof r.quote === "string" && typeof r.name === "string"
      ? [{ quote: r.quote, name: r.name, location: typeof r.location === "string" ? r.location : null }]
      : [];
  });
  const isFestival = (tour.format ?? tour.type) === "festival";
  const countdown = isFestival ? daysUntilStart(body) : null;

  const facts = [
    tour.duration_days ? { value: String(tour.duration_days), label: "days" } : null,
    tour.nights != null ? { value: String(tour.nights), label: "nights" } : null,
    from ? { value: inr(from), label: "from, per person" } : null,
    tour.max_group_size ? { value: String(tour.max_group_size), label: "max group" } : null,
    tour.altitude_max_m
      ? { value: `${tour.altitude_max_m.toLocaleString("en-IN")} m`, label: "max altitude" }
      : null,
    isFestival && countdown != null
      ? { value: `${countdown} days`, label: "until it starts", em: true }
      : tour.best_time
        ? { value: tour.best_time, label: "the window", em: true }
        : null,
  ].filter(Boolean) as { value: string; label: string; em?: boolean }[];

  const whatsAppHref = tourInquiryUrl({ title: tour.title, durationDays: tour.duration_days });
  const selfIndex = allTours.findIndex((t) => t.slug === slug);
  const next = allTours.length > 1 ? allTours[(selfIndex + 1) % allTours.length] : null;

  const gutters = "mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-14";

  return (
    <>
      <SiteHeader />
      <main className="pb-32">
        {/* ── COVER — full viewport ──────────────────────────────────────── */}
        <section className="relative flex min-h-[92svh] flex-col justify-end" data-tone="forest">
          <div className="absolute inset-0 bg-muted">
            {tour.hero ? <MediaImage media={tour.hero} priority sizes="100vw" /> : null}
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-charcoal-950/85 via-charcoal-950/15 to-charcoal-950/30"
            />
          </div>
          <div className={`relative z-10 ${gutters} pt-6`}>
            <Link
              href={"/tours-v2" as Route}
              className="absolute top-6 text-sm font-medium text-mist-200 transition-colors hover:text-mist-50 md:text-base"
            >
              ← All journeys
            </Link>
          </div>
          <div className={`relative z-10 ${gutters} pb-14 md:pb-20`}>
            <p className="text-xs font-semibold tracking-[0.28em] text-mist-200 uppercase md:text-sm">
              {(tour.format ?? tour.type ?? "journey").replace(/_/g, " ")} · Northeast India
            </p>
            <h1 className="mt-4 max-w-5xl font-editorial text-[clamp(3rem,9.5vw,7.5rem)] leading-[0.95] text-balance text-mist-50">
              {tour.title}
            </h1>
            {tour.subtitle ? (
              <p className="mt-5 max-w-2xl font-editorial text-xl leading-snug text-pretty text-mist-200 italic md:text-3xl">
                {tour.subtitle}
              </p>
            ) : null}
          </div>
        </section>

        {/* ── THE NUMBERS ────────────────────────────────────────────────── */}
        <section className={`${gutters} border-b border-border-subtle py-10 md:py-14`}>
          <BigFacts facts={facts} />
        </section>

        {/* ── OVERVIEW + HIGHLIGHTS ──────────────────────────────────────── */}
        {overview || highlights.length ? (
          <section className={`${gutters} grid gap-14 py-16 md:py-24 lg:grid-cols-12 lg:gap-10`}>
            {overview ? (
              <p className="max-w-3xl text-xl leading-relaxed text-pretty md:text-2xl md:leading-[1.6] lg:col-span-7">
                {overview}
              </p>
            ) : null}
            {highlights.length ? (
              <div className="lg:col-span-5 lg:pl-10">
                <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase md:text-xs">
                  The highlights
                </p>
                <ol className="mt-5">
                  {highlights.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-5 border-b border-border-subtle py-3.5 last:border-0 md:py-4"
                    >
                      <span
                        aria-hidden
                        className="font-editorial text-2xl text-secondary tabular-nums md:text-3xl"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg leading-snug text-pretty md:text-xl">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </section>
        ) : null}

        {/* ── THE ROUTE ──────────────────────────────────────────────────── */}
        {nodes.length >= 2 ? (
          <section className={`${gutters} pb-16 md:pb-24`} aria-label="The route">
            <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2">
              <h2 className="font-editorial text-[clamp(2.25rem,5vw,4rem)] leading-none">
                Where it <em>goes.</em>
              </h2>
              {tour.altitude_max_m ? (
                <p className="text-lg text-muted-foreground md:text-xl">
                  up to{" "}
                  <strong className="font-semibold text-foreground">
                    {tour.altitude_max_m.toLocaleString("en-IN")} m
                  </strong>
                </p>
              ) : null}
            </div>
            <div className="mt-10 md:mt-14">
              <RouteLine nodes={nodes} />
            </div>
          </section>
        ) : null}

        {/* ── DAY BY DAY ─────────────────────────────────────────────────── */}
        {days.length ? (
          <section className={`${gutters} pb-16 md:pb-24`} aria-label="Day by day">
            <h2 className="pb-8 font-editorial text-[clamp(2.25rem,5vw,4rem)] leading-none md:pb-12">
              Day by <em>day.</em>
            </h2>
            {days.length > 7 ? (
              <>
                {days.slice(0, 6).map((day) => (
                  <DayChapter key={day.dayNo} day={day} />
                ))}
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-center gap-3 border-t border-border-subtle py-6 text-lg font-medium select-none hover:text-secondary [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">Show all {days.length} days ↓</span>
                    <span className="hidden group-open:inline">Show fewer ↑</span>
                  </summary>
                  {days.slice(6).map((day) => (
                    <DayChapter key={day.dayNo} day={day} />
                  ))}
                </details>
              </>
            ) : (
              days.map((day) => <DayChapter key={day.dayNo} day={day} />)
            )}
          </section>
        ) : null}

        {/* ── COVERED / NOT / PACK ───────────────────────────────────────── */}
        {inclusions.length || exclusions.length || carry.length ? (
          <section className={`${gutters} pb-16 md:pb-24`} aria-label="What's covered">
            {permitTags.length ? (
              <p className="mb-10 max-w-3xl font-editorial text-2xl leading-snug text-balance md:mb-14 md:text-4xl">
                Permits handled — <em>{permitTags.join(", ")}</em> — before you even land.
              </p>
            ) : null}
            <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
              {(
                [
                  ["What's covered", "✓", "text-success", inclusions],
                  ["What's not", "✕", "text-danger", exclusions],
                  ["Pack this", "○", "text-muted-foreground", carry],
                ] as const
              )
                .filter(([, , , items]) => items.length > 0)
                .map(([heading, glyph, color, items]) => (
                  <div key={heading}>
                    <h3 className="font-editorial text-2xl md:text-3xl">{heading}</h3>
                    <ul className="mt-5">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3.5 border-b border-border-subtle py-3 text-base leading-relaxed text-pretty last:border-0 md:text-lg"
                        >
                          <span aria-hidden className={cn("shrink-0 text-lg", color)}>
                            {glyph}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </section>
        ) : null}

        {/* ── RATES ──────────────────────────────────────────────────────── */}
        {(pricing || from) && (
          <section className={`${gutters} pb-16 md:pb-24`} aria-label="Rates">
            <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 pb-8 md:pb-12">
              <h2 className="font-editorial text-[clamp(2.25rem,5vw,4rem)] leading-none">
                What it <em>costs.</em>
              </h2>
              {isFestival && tour.best_time ? (
                <p className="text-lg md:text-xl">
                  {tour.best_time}
                  {countdown != null ? (
                    <span className="ml-3 font-editorial text-accent italic">
                      in {countdown} days
                    </span>
                  ) : null}
                </p>
              ) : null}
            </div>
            <RateRows pricing={pricing} priceInr={tour.price_inr} title={tour.title} />
          </section>
        )}

        {/* ── READ THIS FIRST ────────────────────────────────────────────── */}
        {note ? (
          <section
            data-tone="forest"
            className="relative overflow-hidden bg-background py-20 text-center text-foreground md:py-28"
          >
            <RidgeMotif
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full text-mist-50 opacity-[0.07]"
            />
            <div className={gutters}>
              <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase md:text-sm">
                Read this first
              </p>
              <p className="mx-auto mt-7 max-w-3xl font-editorial text-2xl leading-snug text-pretty italic md:text-[2.4rem] md:leading-[1.25]">
                {note}
              </p>
            </div>
          </section>
        ) : null}

        {/* ── THE ROAD, IN PICTURES ──────────────────────────────────────── */}
        {gallery.length >= 3 ? (
          <section className="py-16 md:py-24" aria-label="Photographs from the road">
            <div className={`${gutters} flex items-baseline justify-between gap-6 pb-8 md:pb-10`}>
              <h2 className="font-editorial text-[clamp(2.25rem,5vw,4rem)] leading-none">
                From the <em>road.</em>
              </h2>
              <p className="hidden text-base text-muted-foreground md:block">drag →</p>
            </div>
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 md:gap-6 lg:px-14 [scrollbar-width:thin]">
              {gallery.map((src, i) => (
                <div
                  key={src}
                  className={cn(
                    "relative shrink-0 snap-start overflow-hidden rounded-2xl bg-muted",
                    "h-[46svh] md:h-[60svh]",
                    i % 3 === 1 ? "aspect-[4/5]" : i % 3 === 2 ? "aspect-square" : "aspect-[4/3]",
                  )}
                >
                  <Photo
                    src={src}
                    alt={`${tour.title} — photograph ${i + 1}`}
                    fill
                    sizes="(min-width: 768px) 55vw, 88vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* ── A VOICE ────────────────────────────────────────────────────── */}
        {quotes.length ? (
          <section className={`${gutters} py-14 md:py-20`} aria-label="From a traveler">
            {quotes.map((q) => (
              <figure key={q.name} className="mx-auto max-w-4xl text-center">
                <blockquote className="font-editorial text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.2] text-balance italic">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-7 text-base text-muted-foreground md:text-lg">
                  — {q.name}
                  {q.location ? `, ${q.location}` : ""}
                </figcaption>
              </figure>
            ))}
          </section>
        ) : null}

        {/* ── NEXT ───────────────────────────────────────────────────────── */}
        {next ? (
          <Link
            href={`/tours-v2/${next.slug}` as Route}
            className="group relative mt-10 block overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="relative flex min-h-[44svh] flex-col justify-end md:min-h-[52svh]">
              <div className="absolute inset-0 bg-muted">
                {next.hero ? (
                  <MediaImage
                    media={next.hero}
                    sizes="100vw"
                    className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                  />
                ) : null}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-charcoal-950/85 via-charcoal-950/30 to-charcoal-950/20"
                />
              </div>
              <div className={`relative z-10 ${gutters} pb-10 md:pb-14`}>
                <p className="text-xs font-semibold tracking-[0.28em] text-mist-200 uppercase md:text-sm">
                  Next journey
                </p>
                <p className="mt-3 flex items-baseline gap-5 font-editorial text-[clamp(2.25rem,6vw,4.75rem)] leading-[1] text-mist-50">
                  {next.title}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-3"
                  >
                    →
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ) : null}
      </main>

      {/* ── THE DOCK — one floating action, both breakpoints ─────────────── */}
      <div className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 mx-auto flex max-w-xl items-center justify-between gap-4 rounded-full border border-glass-border bg-charcoal-950/90 py-2.5 pr-2.5 pl-6 shadow-deep backdrop-blur-lg">
        <p className="min-w-0 truncate text-base text-mist-200 md:text-lg">
          {from ? (
            <>
              from <strong className="font-semibold text-mist-50">{inr(from)}</strong>
              <span className="hidden sm:inline"> / person</span>
            </>
          ) : (
            "Ask for rates"
          )}
        </p>
        <a
          href={whatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Plan ${tour.title} on WhatsApp`}
          className="inline-flex min-h-12 shrink-0 items-center gap-2.5 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground transition-transform outline-none hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px md:px-7"
        >
          Plan this trip
          <span aria-hidden>→</span>
        </a>
      </div>
    </>
  );
}
