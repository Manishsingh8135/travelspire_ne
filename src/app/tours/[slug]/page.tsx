import type { Metadata } from "next";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { getPublishedTours, getTourBySlug, getTourDays, getTourEvents } from "@/server/tours";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { readString } from "@/lib/json";
import { env } from "@/lib/env";
import { tourInquiryUrl, helloUrl } from "@/lib/whatsapp";
import {
  arrangeRows,
  bodyOf,
  legacyDays,
  overnightNodes,
  parsePricing,
  routeLine,
  difficultyTicks,
  strArray,
  testimonialsOf,
  tourFromPrice,
} from "@/lib/tours/read";
import { SiteHeader } from "@/components/site/site-header";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { MediaImage } from "@/components/media/media-image";
import { JsonLd } from "@/components/seo/json-ld";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ManifestBar, type ManifestCell } from "@/components/site/manifest-bar";
import { RouteRibbon } from "@/components/site/route-ribbon";
import { DayJournal } from "@/components/site/day-journal";
import { ManifestSheet } from "@/components/site/manifest-sheet";
import { RateCard } from "@/components/site/rate-card";
import { ArrangeLedger } from "@/components/site/arrange-ledger";
import { BookingSlip } from "@/components/site/booking-slip";
import { FieldNote } from "@/components/site/field-note";
import { GalleryMosaic, type MosaicImage } from "@/components/site/gallery-mosaic";
import { PullQuote } from "@/components/site/pull-quote";
import { TicketCard } from "@/components/site/ticket-card";
import { NextExpedition } from "@/components/site/next-expedition";
import { Eyebrow } from "@/components/ui";
import { AltitudeTicks } from "@/components/icons/field-icons";
import { CompassRose } from "@/components/marketing/decor/compass-rose";
import { RidgeMotif } from "@/components/marketing/decor/ridge-motif";

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
    title: tour.title,
    description: tour.subtitle ?? readString(tour.body, "overview"),
    path: `/tours/${slug}`,
  });
}

/* ── small local readers ─────────────────────────────────────────────────── */

function stopNames(body: Record<string, unknown>): string[] {
  if (!Array.isArray(body.routeStops)) return [];
  return body.routeStops.flatMap((s) =>
    s && typeof s === "object" && typeof (s as { name?: unknown }).name === "string"
      ? [(s as { name: string }).name]
      : [],
  );
}

/** Days until the festival's start date (body.eventDates) — null when unknowable. */
function daysUntilStart(body: Record<string, unknown>): number | null {
  const dates = body.eventDates;
  if (!dates || typeof dates !== "object") return null;
  const r = dates as Record<string, unknown>;
  const raw = [r.start, r.startsOn, r.from].find((v) => typeof v === "string") as
    | string
    | undefined;
  if (!raw) return null;
  const t = Date.parse(raw);
  if (Number.isNaN(t)) return null;
  const days = Math.ceil((t - Date.now()) / 86_400_000);
  return days > 0 && days < 400 ? days : null;
}

/** Shared compact section head — eyebrow + display title + optional right chip. */
function SectionHead({
  eyebrow,
  title,
  chip,
}: {
  eyebrow: string;
  title: React.ReactNode;
  chip?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-2.5 font-display text-2xl leading-tight font-medium text-balance sm:text-3xl">
          {title}
        </h2>
      </div>
      {chip ?? null}
    </div>
  );
}

/* ── page ─────────────────────────────────────────────────────────────────── */

export default async function TourPage({ params }: Params) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const [structuredDays, events, allTours] = await Promise.all([
    getTourDays(tour.id).catch(() => []),
    getTourEvents(tour.id, tour.festival_id).catch(() => []),
    getPublishedTours(),
  ]);

  const body = bodyOf(tour);
  const days = structuredDays.length ? structuredDays : legacyDays(body);
  const nodes = overnightNodes(days);
  const pricing = parsePricing(tour.pricing);
  const fromInr = tourFromPrice(tour);

  const overview = readString(tour.body, "overview");
  const highlights = strArray(body.highlights);
  const inclusions = strArray(body.inclusions);
  const exclusions = strArray(body.exclusions);
  const carry = strArray(body.thingsToCarry);
  const facilities = strArray(body.facilities);
  const whoFor = strArray(body.whoFor);
  const notFor = strArray(body.notFor);
  const arrange = arrangeRows(body);
  const quotes = testimonialsOf(body);
  const importantNote = readString(tour.body, "importantNote");
  const location = readString(tour.body, "location");

  const gallery: MosaicImage[] = strArray(body.gallery).map((src, i) => ({
    src,
    alt: `${tour.title} — expedition photograph ${i + 1}`,
  }));

  const isFestival = (tour.format ?? tour.type) === "festival";
  const format = (tour.format ?? tour.type ?? "expedition").replace(/_/g, " ");
  const gateway = nodes[0]?.name ?? stopNames(body)[0] ?? null;
  const ticks = difficultyTicks(tour.difficulty);
  const countdown = isFestival ? daysUntilStart(body) : null;
  const manifestCode = `TSNE-${(slug.split("-")[0] ?? "trip").toUpperCase()}-${tour.duration_days ?? "?"}D`;

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.starts_on >= today);

  /* the manifest bar — every value computed */
  const fromLabel = fromInr ? `₹${fromInr.toLocaleString("en-IN")}` : null;
  const cells = (
    isFestival
      ? [
          tour.best_time ? { label: "Dates", value: tour.best_time, href: "#rates" } : null,
          location ? { label: "Venue", value: location.split(",")[0] } : null,
          pricing
            ? { label: "Packages", value: `${pricing.modes.length} options`, href: "#rates" }
            : null,
          countdown ? { label: "Starts", value: `In ${countdown} days`, accent: true } : null,
          fromLabel ? { label: "From", value: `${fromLabel} / pax`, href: "#rates" } : null,
        ]
      : [
          tour.duration_days
            ? {
                label: "Duration",
                value: tour.nights != null ? `${tour.duration_days}D · ${tour.nights}N` : `${tour.duration_days} days`,
                href: "#itinerary",
              }
            : null,
          ticks && tour.difficulty
            ? { label: "Difficulty", value: `${ticks} ${tour.difficulty}` }
            : null,
          tour.max_group_size ? { label: "Group", value: `Max ${tour.max_group_size}` } : null,
          gateway ? { label: "Gateway", value: `Ex-${gateway}`, href: "#route" } : null,
          tour.best_time ? { label: "Window", value: tour.best_time } : null,
          fromLabel ? { label: "From", value: `${fromLabel} / pax`, href: "#rates" } : null,
        ]
  ).filter(Boolean) as ManifestCell[];

  const base = env.NEXT_PUBLIC_SITE_URL;
  const url = `${base}/tours/${slug}`;
  const whatsAppHref = tourInquiryUrl({ title: tour.title, durationDays: tour.duration_days });

  const others = allTours.filter((t) => t.slug !== slug);
  const selfIndex = allTours.findIndex((t) => t.slug === slug);
  const next = allTours.length > 1 ? allTours[(selfIndex + 1) % allTours.length] : null;
  const related = others.filter((t) => t.slug !== next?.slug).slice(0, 3);

  /* JSON-LD — one Offer per rate-card tier (eligibleQuantity carries group size) */
  const offers = pricing
    ? pricing.modes.flatMap((mode) =>
        mode.mode === "group"
          ? mode.tiers.map((tier) => ({
              "@type": "Offer",
              name: tier.groupSize > 0 ? `Group of ${tier.groupSize}` : "Group trip",
              price: tier.pricePax,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              url,
              ...(tier.groupSize > 0
                ? {
                    eligibleQuantity: {
                      "@type": "QuantitativeValue",
                      value: tier.groupSize,
                      unitText: "travelers",
                    },
                  }
                : {}),
            }))
          : [
              {
                "@type": "Offer",
                name: mode.label ?? (mode.mode === "private" ? "Private" : "Package"),
                price: mode.pricePax,
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
                url,
              },
            ],
      )
    : tour.price_inr
      ? [
          {
            "@type": "Offer",
            price: tour.price_inr,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url,
          },
        ]
      : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    url,
    ...(overview || tour.subtitle ? { description: overview ?? tour.subtitle } : {}),
    ...(offers.length ? { offers } : {}),
    ...(days.length
      ? {
          itinerary: {
            "@type": "ItemList",
            numberOfItems: days.length,
            itemListElement: days.map((day, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: day.title,
            })),
          },
        }
      : {}),
  };

  const gutters = "mx-auto w-full max-w-[92rem] px-5 sm:px-8 lg:px-12";

  return (
    <>
      <SiteHeader />
      {/* pb clears the mobile BookingSlip bar */}
      <main className="pb-24 lg:pb-0">
        {/* ── §1 COVER — full-bleed, the manifest bar docked over its foot ── */}
        <section className="relative">
          <div className="relative flex min-h-[68svh] flex-col justify-between sm:min-h-[78svh]" data-tone="forest">
            <div className="absolute inset-0 bg-muted">
              {tour.hero ? (
                <MediaImage media={tour.hero} priority sizes="100vw" />
              ) : null}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-charcoal-950/25"
              />
            </div>
            <div className={`relative z-10 ${gutters} pt-5`}>
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" as Route },
                  { label: "Expeditions", href: "/tours" as Route },
                  { label: tour.title },
                ]}
              />
            </div>
            <div className={`relative z-10 ${gutters} pb-16 sm:pb-20`}>
              <p className="font-mono text-[11px] font-medium tracking-[0.22em] text-mist-200 uppercase">
                {format}
                {location ? ` · ${location.split(",")[0]}` : " · Northeast India"}
              </p>
              <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.02] font-medium text-balance text-mist-50 sm:text-5xl lg:text-6xl">
                {tour.title}
              </h1>
              {tour.subtitle ? (
                <p className="mt-3 max-w-xl font-display text-lg leading-snug text-pretty text-mist-200/90 italic sm:text-xl">
                  {tour.subtitle}
                </p>
              ) : null}
            </div>
          </div>
          <div className={`${gutters} -mt-9 sm:-mt-11`}>
            <ManifestBar cells={cells} />
          </div>
        </section>

        <MotionProvider>
          <div
            className={`${gutters} mt-14 grid gap-12 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-14`}
          >
            <article className="flex min-w-0 flex-col gap-16 sm:gap-20">
              {/* ── §2 THE ROUTE ─────────────────────────────────────────── */}
              {nodes.length >= 2 ? (
                <section id="route" aria-label="The route" className="relative scroll-mt-24">
                  <CompassRose
                    aria-hidden
                    className="pointer-events-none absolute -top-8 right-0 size-28 text-foreground opacity-[0.05]"
                  />
                  <SectionHead
                    eyebrow="The route"
                    title="Where this journey goes."
                    chip={
                      tour.altitude_max_m ? (
                        <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground tabular-nums uppercase">
                          <AltitudeTicks aria-hidden className="size-4 text-secondary" />
                          [ Max alt {tour.altitude_max_m.toLocaleString("en-IN")} m ]
                        </p>
                      ) : null
                    }
                  />
                  <RouteRibbon nodes={nodes} className="mt-8" />
                </section>
              ) : null}

              {/* ── §3 OVERVIEW + HIGHLIGHTS ─────────────────────────────── */}
              {overview || highlights.length ? (
                <section aria-label="Overview" className="grid gap-10 lg:grid-cols-12">
                  {overview ? (
                    <p className="max-w-2xl text-lg leading-relaxed text-pretty first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.82] first-letter:text-secondary lg:col-span-7">
                      {overview}
                    </p>
                  ) : null}
                  {highlights.length ? (
                    <div className="lg:col-span-5">
                      <div className="rounded-xl border border-border-subtle bg-card shadow-panel">
                        <p className="border-b border-border-subtle px-5 py-3 font-mono text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                          Highlights — Nº
                        </p>
                        <ol className="px-5 py-1.5">
                          {highlights.map((item, i) => (
                            <li
                              key={item}
                              className="flex gap-4 border-b border-dotted border-border-subtle py-2.5 text-sm leading-relaxed text-pretty last:border-0"
                            >
                              <span className="shrink-0 font-mono text-xs text-secondary tabular-nums">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {item}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  ) : null}
                </section>
              ) : null}

              {/* ── §4 DAY BY DAY — the heart ────────────────────────────── */}
              {days.length ? (
                <section id="itinerary" aria-label="Day by day" className="scroll-mt-24">
                  <SectionHead
                    eyebrow="Day by day"
                    title="The field plan."
                    chip={
                      <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground tabular-nums uppercase">
                        [ {days.length} days ]
                      </p>
                    }
                  />
                  <DayJournal days={days} className="mt-8" />
                </section>
              ) : null}

              {/* ── §5 WHO THIS IS FOR / NOT FOR ─────────────────────────── */}
              {whoFor.length && notFor.length ? (
                <section aria-label="Who this trip is for" className="grid gap-5 sm:grid-cols-2">
                  <FieldNote kicker="For you if —" className="rotate-[0.4deg]">
                    <ul className="flex flex-col gap-2.5 text-base leading-relaxed">
                      {whoFor.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span aria-hidden className="text-secondary">
                            —
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </FieldNote>
                  <FieldNote kicker="Not for you if —" className="-rotate-[0.4deg]">
                    <ul className="flex flex-col gap-2.5 text-base leading-relaxed">
                      {notFor.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span aria-hidden className="text-danger">
                            —
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </FieldNote>
                </section>
              ) : null}

              {/* ── §6 WHAT WE ARRANGE — the moat panel (sand) ───────────── */}
              {arrange.length ? (
                <section aria-label="What we arrange">
                  <div
                    data-tone="sand"
                    className="rounded-2xl border border-border-subtle bg-background px-6 py-8 text-foreground sm:px-10 sm:py-10"
                  >
                    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
                      <div>
                        <Eyebrow>What we arrange</Eyebrow>
                        <h2 className="mt-3 font-display text-2xl leading-snug font-medium text-balance sm:text-3xl">
                          {gateway ? (
                            <>
                              You land in {gateway}.{" "}
                              <em className="text-secondary">
                                Everything after that is ours.
                              </em>
                            </>
                          ) : (
                            <>
                              You book the package.{" "}
                              <em className="text-secondary">
                                Everything on the ground is ours.
                              </em>
                            </>
                          )}
                        </h2>
                      </div>
                      <ArrangeLedger rows={arrange} />
                    </div>
                  </div>
                </section>
              ) : null}

              {/* ── §7 THE EXPEDITION MANIFEST ───────────────────────────── */}
              <section id="carry" aria-label="Expedition manifest" className="scroll-mt-24">
                <ManifestSheet
                  code={manifestCode}
                  inclusions={inclusions}
                  exclusions={exclusions}
                  carry={carry}
                  facilities={facilities}
                />
              </section>

              {/* ── §8 RATES & DATES ─────────────────────────────────────── */}
              {(pricing || fromInr) && (
                <section id="rates" aria-label="Rates and dates" className="scroll-mt-24">
                  <SectionHead
                    eyebrow="Rates & dates"
                    title="What it costs, honestly."
                    chip={
                      isFestival && tour.best_time ? (
                        <p className="font-mono text-[11px] tracking-[0.14em] uppercase">
                          <span className="text-muted-foreground">[ {tour.best_time} ]</span>
                          {countdown ? (
                            <span className="ml-3 font-semibold text-accent tabular-nums">
                              In {countdown} days
                            </span>
                          ) : null}
                        </p>
                      ) : null
                    }
                  />
                  {upcoming.length ? (
                    <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
                      {upcoming.map((event) => (
                        <li
                          key={`${event.label}-${event.starts_on}`}
                          className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground tabular-nums uppercase"
                        >
                          <span className="text-foreground">{event.label}</span>
                          {" — "}
                          {event.starts_on}
                          {event.ends_on && event.ends_on !== event.starts_on
                            ? ` → ${event.ends_on}`
                            : ""}
                          {event.status === "sold_out" ? (
                            <span className="ml-2 text-danger line-through">sold out</span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <RateCard
                    tourTitle={tour.title}
                    pricing={pricing}
                    priceInr={tour.price_inr}
                    className="mt-8"
                  />
                </section>
              )}

              {/* ── §9 BEFORE YOU BOOK — the night moment ────────────────── */}
              {importantNote ? (
                <section aria-label="Before you book">
                  {/* text-foreground is REQUIRED with data-tone: the body's color
                      resolved against the light tokens and inherits through —
                      the tone remap only takes effect where color is re-read. */}
                  <div
                    data-tone="forest"
                    className="relative overflow-hidden rounded-2xl border border-border-subtle bg-background px-6 py-12 text-center text-foreground sm:px-12 sm:py-16"
                  >
                    <RidgeMotif
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 -bottom-2 h-28 w-full text-mist-50 opacity-[0.06]"
                    />
                    <p className="font-mono text-[11px] font-medium tracking-[0.24em] text-accent uppercase">
                      Read this first
                    </p>
                    <p className="mx-auto mt-5 max-w-2xl font-display text-lg leading-relaxed text-pretty sm:text-xl">
                      {importantNote}
                    </p>
                  </div>
                </section>
              ) : null}

              {/* ── §10 GALLERY + VOICES ─────────────────────────────────── */}
              {gallery.length >= 3 ? (
                <div>
                  <GalleryMosaic images={gallery} />
                  <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    Photography — Travelspire field team
                  </p>
                </div>
              ) : null}

              {quotes.length ? (
                <section
                  aria-label="From travelers who went"
                  className="border-t border-border-subtle pt-14"
                >
                  {quotes.map((q) => (
                    <PullQuote
                      key={q.name}
                      quote={q.quote}
                      name={q.name}
                      meta={[q.location, q.date].filter(Boolean).join(" · ")}
                    />
                  ))}
                </section>
              ) : null}
            </article>

            {/* the rail */}
            <div className="hidden lg:block">
              <BookingSlip
                fromInr={fromInr}
                window={tour.best_time}
                whatsAppHref={whatsAppHref}
                askHref={helloUrl()}
                title={tour.title}
              />
            </div>
          </div>

          {/* ── §11 RELATED ──────────────────────────────────────────────── */}
          {related.length ? (
            <section
              aria-label="More from the catalogue"
              className={`${gutters} mt-20 mb-16 sm:mt-24 sm:mb-20`}
            >
              <SectionHead eyebrow="More from the catalogue" title="Other journeys." />
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((t) => {
                  const tb = bodyOf(t);
                  return (
                    <TicketCard
                      key={t.slug}
                      ticket={{
                        slug: t.slug,
                        title: t.title,
                        hero: t.hero,
                        routeLine: routeLine(stopNames(tb)),
                        duration:
                          t.nights != null && t.duration_days
                            ? `${t.duration_days}D/${t.nights}N`
                            : t.duration_days
                              ? `${t.duration_days}D`
                              : null,
                        ticks: difficultyTicks(t.difficulty),
                        fromInr: tourFromPrice(t),
                      }}
                    />
                  );
                })}
              </div>
            </section>
          ) : null}
        </MotionProvider>

        {/* ── the page-turn ──────────────────────────────────────────────── */}
        {next ? <NextExpedition title={next.title} slug={next.slug} /> : null}
      </main>

      {/* Mobile slip renders outside main flow */}
      <div className="lg:hidden">
        <BookingSlip
          fromInr={fromInr}
          window={tour.best_time}
          whatsAppHref={whatsAppHref}
          askHref={helloUrl()}
          title={tour.title}
        />
      </div>

      <JsonLd data={jsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Expeditions", path: "/tours" },
          { name: tour.title, path: `/tours/${slug}` },
        ])}
      />
    </>
  );
}
