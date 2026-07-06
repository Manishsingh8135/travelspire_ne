import type { Metadata } from "next";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { getPublishedTours, getTourBySlug } from "@/server/tours";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { readString } from "@/lib/json";
import { env } from "@/lib/env";
import { tourInquiryUrl, availabilityUrl } from "@/lib/whatsapp";
import { SiteHeader } from "@/components/site/site-header";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Badge } from "@/components/ui";
import { ChecklistCard } from "@/components/ui/checklist-card";
import { MediaImage } from "@/components/media/media-image";
import { JsonLd } from "@/components/seo/json-ld";
import { RouteRibbon, type RouteStop } from "@/components/site/route-ribbon";
import { StickyTripBar } from "@/components/site/sticky-trip-bar";
import { GalleryMosaic, type MosaicImage } from "@/components/site/gallery-mosaic";
import { PullQuote } from "@/components/site/pull-quote";
import { FieldNote } from "@/components/site/field-note";
import { TourCard } from "@/components/site/tour-card";
import { VariantTable, type Variant } from "@/components/site/variant-table";

export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const tours = await getPublishedTours();
  return tours.map((tour) => ({ slug: tour.slug }));
}

/* ── body jsonb readers (tolerant, typed at the edge) ────────────────────── */

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function strArray(body: Record<string, unknown>, key: string): string[] {
  const arr = body[key];
  return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
}

type Day = { title: string; description: string };
function itineraryDays(body: Record<string, unknown>): Day[] {
  const arr = body.itinerary;
  if (!Array.isArray(arr)) return [];
  return arr
    .map((d) => {
      const day = asRecord(d);
      return { title: String(day.title ?? ""), description: String(day.description ?? "") };
    })
    .filter((d) => d.title || d.description);
}

function routeStops(body: Record<string, unknown>): RouteStop[] {
  const arr = body.routeStops;
  if (!Array.isArray(arr)) return [];
  return arr
    .map((s) => {
      const stop = asRecord(s);
      return { name: String(stop.name ?? ""), note: stop.note ? String(stop.note) : null };
    })
    .filter((s) => s.name);
}

function galleryImages(body: Record<string, unknown>, title: string): MosaicImage[] {
  return strArray(body, "gallery").map((src, i) => ({
    src,
    alt: `${title} — expedition photograph ${i + 1}`,
  }));
}

function variants(body: Record<string, unknown>): Variant[] {
  const arr = body.variants;
  if (!Array.isArray(arr)) return [];
  return arr
    .map((v) => {
      const item = asRecord(v);
      return {
        name: String(item.name ?? ""),
        price: typeof item.price === "number" ? item.price : NaN,
        days: typeof item.days === "number" ? item.days : null,
        nights: typeof item.nights === "number" ? item.nights : null,
        note: item.note ? String(item.note) : null,
        inclusions: Array.isArray(item.inclusions)
          ? item.inclusions.filter((x): x is string => typeof x === "string")
          : [],
      };
    })
    .filter((v) => v.name && Number.isFinite(v.price));
}

type Testimonial = { quote: string; name: string; location?: string; date?: string };
function testimonials(body: Record<string, unknown>): Testimonial[] {
  const arr = body.testimonials;
  if (!Array.isArray(arr)) return [];
  return arr
    .map((t) => {
      const item = asRecord(t);
      return {
        quote: String(item.quote ?? ""),
        name: String(item.name ?? ""),
        location: item.location ? String(item.location) : undefined,
        date: item.date ? String(item.date) : undefined,
      };
    })
    .filter((t) => t.quote && t.name);
}

/* ── metadata ─────────────────────────────────────────────────────────────── */

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

/* ── page ─────────────────────────────────────────────────────────────────── */

const DIFFICULTY_TICKS: Record<string, string> = {
  easy: "▲△△ EASY",
  moderate: "▲▲△ MODERATE",
  challenging: "▲▲▲ CHALLENGING",
};

export default async function TourPage({ params }: Params) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const body = asRecord(tour.body);
  const overview = readString(tour.body, "overview");
  const highlights = strArray(body, "highlights");
  const inclusions = strArray(body, "inclusions");
  const exclusions = strArray(body, "exclusions");
  const carry = strArray(body, "thingsToCarry");
  const days = itineraryDays(body);
  const stops = routeStops(body);
  const gallery = galleryImages(body, tour.title);
  const quotes = testimonials(body);
  const importantNote = readString(tour.body, "importantNote");
  const location = readString(tour.body, "location") ?? "Arunachal Pradesh";
  const packageVariants = variants(body);
  const maxGroup = typeof body.maxGroupSize === "number" ? body.maxGroupSize : null;

  const base = env.NEXT_PUBLIC_SITE_URL;
  const url = `${base}/tours/${slug}`;
  const whatsAppHref = tourInquiryUrl({ title: tour.title, durationDays: tour.duration_days });

  const others = (await getPublishedTours()).filter((t) => t.slug !== slug).slice(0, 3);

  const facts = [
    tour.duration_days ? `${tour.duration_days} DAYS` : null,
    tour.difficulty ? DIFFICULTY_TICKS[tour.difficulty] : null,
    maxGroup ? `MAX ${maxGroup}` : null,
    tour.best_time ? `BEST · ${tour.best_time}` : null,
  ].filter(Boolean) as string[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    url,
    ...(overview || tour.subtitle ? { description: overview ?? tour.subtitle } : {}),
    ...(tour.price_inr
      ? {
          offers: {
            "@type": "Offer",
            price: tour.price_inr,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url,
          },
        }
      : {}),
    ...(days.length
      ? {
          itinerary: {
            "@type": "ItemList",
            numberOfItems: days.length,
            itemListElement: days.map((day, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: day.title || `Day ${i + 1}`,
            })),
          },
        }
      : {}),
  };

  return (
    <>
      <SiteHeader />
      {/* pb clears the mobile StickyTripBar */}
      <main className="pb-28 lg:pb-16">
        {/* ── Cover ─────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[92rem] px-5 pt-6 sm:px-8 lg:px-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" as Route },
              { label: "Expeditions", href: "/tours" as Route },
              { label: tour.title },
            ]}
          />
          <div className="relative mt-5 overflow-hidden rounded-3xl bg-muted shadow-panel">
            <div className="relative aspect-[4/3] sm:aspect-[21/10]">
              {tour.hero ? (
                <MediaImage
                  media={tour.hero}
                  priority
                  sizes="(min-width: 1472px) 1408px, 100vw"
                />
              ) : null}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-charcoal-950/75 via-charcoal-950/15 to-transparent"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10" data-tone="forest">
              <div className="flex items-center gap-2">
                <Badge variant="accent" className="capitalize">
                  {tour.type}
                </Badge>
                <span className="font-mono text-[11px] tracking-[0.18em] text-mist-200 uppercase">
                  {location}
                </span>
              </div>
              <h1 className="mt-3 max-w-3xl font-display text-3xl leading-[1.05] font-medium text-balance text-mist-50 sm:text-5xl">
                {tour.title}
              </h1>
              {tour.subtitle ? (
                <p className="mt-2 max-w-xl text-sm text-pretty text-mist-200/90 sm:text-base">
                  {tour.subtitle}
                </p>
              ) : null}
            </div>
          </div>
          {/* facts bar */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-border-subtle bg-card px-5 py-3.5 font-mono text-xs tracking-[0.12em] tabular-nums shadow-panel uppercase sm:gap-x-6">
            {facts.map((fact, i) => (
              <span key={fact} className="flex items-center gap-4 sm:gap-6">
                {i > 0 ? <span aria-hidden className="hidden size-1 rotate-45 bg-secondary/50 sm:block" /> : null}
                {fact}
              </span>
            ))}
            {tour.price_inr ? (
              <span className="ml-auto font-semibold text-foreground">
                FROM ₹{tour.price_inr.toLocaleString("en-IN")}
              </span>
            ) : null}
          </div>
        </section>

        {/* ── Body + rail ───────────────────────────────────────────────── */}
        <div className="mx-auto mt-10 grid max-w-[92rem] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12 lg:px-12">
          <article className="flex min-w-0 flex-col gap-12">
            {overview ? (
              <p className="max-w-3xl text-lg leading-relaxed text-pretty">{overview}</p>
            ) : null}

            {stops.length >= 2 ? <RouteRibbon stops={stops} /> : null}

            {days.length ? (
              <section className="flex flex-col gap-5" aria-label="Itinerary">
                <h2 className="font-display text-2xl font-medium sm:text-3xl">Day by day</h2>
                <ol className="flex flex-col">
                  {days.map((day, i) => (
                    <li key={i} className="flex gap-4 sm:gap-5">
                      <div className="flex flex-col items-center">
                        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border-subtle bg-card font-mono text-xs tabular-nums text-secondary shadow-panel">
                          {i + 1}
                        </span>
                        {i < days.length - 1 ? (
                          <span aria-hidden className="my-1 w-px flex-1 border-l border-dashed border-border-strong" />
                        ) : null}
                      </div>
                      <div className="flex flex-col gap-1 pb-7">
                        <h3 className="font-display text-lg leading-snug font-medium sm:text-xl">
                          {day.title || `Day ${i + 1}`}
                        </h3>
                        {day.description ? (
                          <p className="max-w-2xl leading-relaxed text-pretty text-muted-foreground">
                            {day.description}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {highlights.length ? (
              <section className="flex flex-col gap-3" aria-label="Highlights">
                <h2 className="font-display text-2xl font-medium sm:text-3xl">Highlights</h2>
                <ul className="flex max-w-2xl flex-wrap gap-2">
                  {highlights.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border-subtle bg-card px-3.5 py-1.5 text-sm text-pretty shadow-panel"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {(inclusions.length || exclusions.length) ? (
              <section className="grid gap-5 sm:grid-cols-2" aria-label="What's included">
                <ChecklistCard title="Included" items={inclusions} mark="yes" />
                <ChecklistCard title="Not included" items={exclusions} mark="no" />
              </section>
            ) : null}

            {carry.length ? <ChecklistCard title="Carry this" items={carry} mark="neutral" /> : null}

            {packageVariants.length ? (
              <VariantTable
                variants={packageVariants}
                whatsAppHref={(name) => availabilityUrl(`${tour.title} — ${name}`)}
              />
            ) : null}

            {importantNote ? (
              <FieldNote kicker="Before you book">{importantNote}</FieldNote>
            ) : null}

            {gallery.length ? <GalleryMosaic images={gallery} /> : null}

            {quotes.length ? (
              <section className="flex flex-col gap-5" aria-label="Travelers say">
                <h2 className="font-display text-2xl font-medium sm:text-3xl">
                  From travelers who went
                </h2>
                <div className="grid gap-5">
                  {quotes.map((q) => (
                    <PullQuote
                      key={q.name}
                      quote={q.quote}
                      name={q.name}
                      meta={[q.location, q.date].filter(Boolean).join(" · ")}
                    />
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          <div className="hidden lg:block">
            <StickyTripBar
              priceInr={tour.price_inr}
              bestTime={tour.best_time}
              whatsAppHref={whatsAppHref}
              title={tour.title}
            />
          </div>
        </div>

        {/* ── Related ───────────────────────────────────────────────────── */}
        {others.length ? (
          <section
            className="mx-auto mt-16 max-w-[92rem] px-5 sm:px-8 lg:px-12"
            aria-label="More expeditions"
          >
            <h2 className="font-display text-2xl font-medium sm:text-3xl">More expeditions</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((t) => (
                <TourCard
                  key={t.slug}
                  tour={{
                    slug: t.slug,
                    title: t.title,
                    subtitle: t.subtitle,
                    hero: t.hero,
                    durationDays: t.duration_days,
                    priceInr: t.price_inr,
                    difficulty: t.difficulty,
                    routeLine: routeStops(asRecord(t.body))
                      .map((s) => s.name)
                      .join(" → "),
                  }}
                />
              ))}
            </div>
          </section>
        ) : null}
      </main>

      {/* Mobile sticky bar renders outside main flow */}
      <div className="lg:hidden">
        <StickyTripBar
          priceInr={tour.price_inr}
          bestTime={tour.best_time}
          whatsAppHref={whatsAppHref}
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
