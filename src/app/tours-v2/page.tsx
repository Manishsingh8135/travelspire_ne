import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { getPublishedTours, type TourWithHero } from "@/server/tours";
import { customTripUrl } from "@/lib/whatsapp";
import { bodyOf, daysUntilStart, stopNames, tourFromPrice } from "@/lib/tours/read";
import { SiteHeader } from "@/components/site/site-header";
import { MediaImage } from "@/components/media/media-image";
import { ContourField } from "@/components/marketing/decor/contour-field";
import { RidgeMotif } from "@/components/marketing/decor/ridge-motif";
import { cn } from "@/lib/cn";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "The Journeys — Northeast India, guided",
  description:
    "Eleven small-group journeys across Arunachal and beyond — real roads, local crews, permits handled.",
};

/* ── vocabulary ──────────────────────────────────────────────────────────── */

const WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen",
  "Nineteen", "Twenty",
] as const;
const countWord = (n: number) => WORDS[n] ?? String(n);

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

type LenKey = "short" | "classic" | "epic";
const LENGTHS: { key: LenKey; label: string; test: (d: number) => boolean }[] = [
  { key: "short", label: "≤ 3 days", test: (d) => d <= 3 },
  { key: "classic", label: "4–6 days", test: (d) => d >= 4 && d <= 6 },
  { key: "epic", label: "7+ days", test: (d) => d >= 7 },
];

const TYPES = ["adventure", "festival"] as const;
type TypeKey = (typeof TYPES)[number];

function href(type: TypeKey | null, len: LenKey | null): Route {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (len) params.set("len", len);
  const qs = params.toString();
  return (qs ? `/tours-v2?${qs}` : "/tours-v2") as Route;
}

/* ── the journey spread — photography IS the card ────────────────────────── */

function JourneySpread({ tour, index, flip }: { tour: TourWithHero; index: number; flip: boolean }) {
  const body = bodyOf(tour);
  const from = tourFromPrice(tour);
  const route = stopNames(body).join("  →  ");
  const facts: React.ReactNode[] = [];
  if (tour.duration_days)
    facts.push(
      <span key="d">
        <strong className="font-semibold text-foreground">{tour.duration_days} days</strong>
      </span>,
    );
  if (from)
    facts.push(
      <span key="p">
        from <strong className="font-semibold text-foreground">{inr(from)}</strong>
      </span>,
    );
  if (tour.difficulty) facts.push(<span key="f">{tour.difficulty}</span>);

  return (
    <Link
      href={`/tours-v2/${tour.slug}` as Route}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className={cn(
          "grid items-center gap-6 md:gap-10 lg:gap-16",
          "md:grid-cols-12",
        )}
      >
        {/* the photograph — edge-to-edge on mobile, dominant on desktop */}
        <div
          className={cn(
            "relative -mx-5 sm:mx-0 md:col-span-7",
            flip && "md:order-2",
          )}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-muted sm:rounded-3xl md:aspect-[4/3]">
            {tour.hero ? (
              <MediaImage
                media={tour.hero}
                sizes="(min-width: 768px) 58vw, 100vw"
                className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            ) : null}
            {/* mobile: the title lives ON the photograph */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-charcoal-950/85 to-transparent md:hidden"
            />
            <div className="absolute inset-x-5 bottom-5 md:hidden">
              <p className="font-editorial text-[clamp(2rem,9vw,2.9rem)] leading-[1.02] text-mist-50">
                {tour.title}
              </p>
            </div>
          </div>
        </div>

        {/* the entry */}
        <div className={cn("min-w-0 md:col-span-5", flip && "md:order-1")}>
          <p
            aria-hidden
            className="font-editorial text-ghost text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.85]"
          >
            {String(index).padStart(2, "0")}
          </p>
          <h3 className="mt-2 hidden font-editorial text-[clamp(2.25rem,3.4vw,3.5rem)] leading-[1.02] text-balance md:block">
            {tour.title}
          </h3>
          {tour.subtitle ? (
            <p className="mt-3 max-w-md text-lg leading-relaxed text-pretty text-muted-foreground md:mt-4 md:text-xl">
              {tour.subtitle}
            </p>
          ) : null}
          <p className="mt-4 flex flex-wrap items-baseline gap-x-3 text-lg text-muted-foreground md:mt-6 md:text-xl">
            {facts.map((f, i) => (
              <span key={i} className="flex items-baseline gap-3">
                {i > 0 ? <span aria-hidden>·</span> : null}
                {f}
              </span>
            ))}
          </p>
          {route ? (
            <p className="mt-4 text-[13px] font-semibold tracking-[0.18em] text-secondary uppercase">
              {route}
            </p>
          ) : null}
          <p className="mt-5 inline-flex items-center gap-2 text-lg font-medium underline-offset-8 group-hover:underline md:mt-7">
            See the journey
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}

/* ── page ─────────────────────────────────────────────────────────────────── */

type SP = Promise<{ type?: string; len?: string }>;

export default async function ToursV2Page({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const activeType = TYPES.find((t) => t === sp.type) ?? null;
  const activeLen = LENGTHS.find((l) => l.key === sp.len)?.key ?? null;

  const all = await getPublishedTours();
  const lenTest = activeLen ? LENGTHS.find((l) => l.key === activeLen)!.test : null;
  const tours = all.filter(
    (t) =>
      (!activeType || t.type === activeType) &&
      (!lenTest || (t.duration_days != null && lenTest(t.duration_days))),
  );

  const fromPrices = all.map(tourFromPrice).filter((p): p is number => p != null);
  const daysArr = all.map((t) => t.duration_days).filter((d): d is number => d != null);

  /* chapters: expeditions by window; festivals get their own dated band */
  const expeditions = tours.filter((t) => (t.format ?? t.type) !== "festival");
  const windows = new Map<string, TourWithHero[]>();
  for (const t of expeditions) {
    const key = t.best_time?.trim() || "Any month";
    windows.set(key, [...(windows.get(key) ?? []), t]);
  }
  const allFestivals = all
    .filter((t) => (t.format ?? t.type) === "festival")
    .map((t) => ({ tour: t, countdown: daysUntilStart(bodyOf(t)) }))
    .sort((a, b) => (a.countdown ?? 999) - (b.countdown ?? 999));

  /* Numerals are editorial, sequential in display order (expeditions flow first). */
  const displayOrder = [...windows.values()].flat();
  const numberOf = new Map(displayOrder.map((t, i) => [t.slug, i + 1]));
  const countFor = (type: TypeKey | null, len: LenKey | null) => {
    const lt = len ? LENGTHS.find((l) => l.key === len)!.test : null;
    return all.filter(
      (t) =>
        (!type || t.type === type) &&
        (!lt || (t.duration_days != null && lt(t.duration_days))),
    ).length;
  };

  const filterLink = (label: string, active: boolean, to: Route, count?: number) => (
    <Link
      key={label + String(to)}
      href={to}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative shrink-0 pb-2 text-base font-medium whitespace-nowrap transition-colors md:text-lg",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
      {count != null ? (
        <sup className="ml-1 text-xs font-semibold text-secondary">{count}</sup>
      ) : null}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-primary transition-opacity",
          active ? "opacity-100" : "opacity-0",
        )}
      />
    </Link>
  );

  return (
    <>
      <SiteHeader />
      <main>
        {/* ── THE STATEMENT ──────────────────────────────────────────────── */}
        <section className="relative flex min-h-[78svh] flex-col justify-end overflow-hidden">
          <ContourField
            aria-hidden
            className="pointer-events-none absolute -top-6 right-0 h-[60%] w-[52rem] max-w-full text-foreground opacity-[0.05] dark:opacity-[0.08]"
          />
          <div className="mx-auto w-full max-w-[90rem] px-5 pb-14 sm:px-8 md:pb-20 lg:px-14">
            <p className="text-xs font-semibold tracking-[0.28em] text-secondary uppercase md:text-sm">
              The catalogue · {new Date().getFullYear()}
            </p>
            <h1 className="mt-5 max-w-5xl font-editorial text-[clamp(3.25rem,10vw,8.5rem)] leading-[0.95] text-balance">
              {countWord(all.length)} journeys into the <em>Northeast.</em>
            </h1>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 md:mt-12">
              <p className="max-w-md text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
                Small groups, local crews, real roads. Every journey here has been driven, slept
                and eaten by us.
              </p>
              {daysArr.length && fromPrices.length ? (
                <p className="text-base text-muted-foreground md:text-lg">
                  {Math.min(...daysArr)}–{Math.max(...daysArr)} days · from{" "}
                  <strong className="font-semibold text-foreground">
                    {inr(Math.min(...fromPrices))}
                  </strong>{" "}
                  · permits handled
                </p>
              ) : null}
            </div>
          </div>
        </section>

        {/* ── THE FILTER BAR ─────────────────────────────────────────────── */}
        <nav
          aria-label="Filter journeys"
          className="sticky top-16 z-30 border-y border-border-subtle bg-background/90 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-[90rem] items-center gap-7 overflow-x-auto px-5 pt-4 [scrollbar-width:none] sm:px-8 md:gap-9 lg:px-14">
            {filterLink("Everything", !activeType && !activeLen, href(null, null), all.length)}
            {filterLink(
              "Expeditions",
              activeType === "adventure",
              href(activeType === "adventure" ? null : "adventure", activeLen),
              countFor("adventure", activeLen),
            )}
            {filterLink(
              "Festivals",
              activeType === "festival",
              href(activeType === "festival" ? null : "festival", activeLen),
              countFor("festival", activeLen),
            )}
            <span aria-hidden className="h-5 w-px shrink-0 bg-border-default" />
            {LENGTHS.map((l) =>
              filterLink(
                l.label,
                activeLen === l.key,
                href(activeType, activeLen === l.key ? null : l.key),
                countFor(activeType, l.key),
              ),
            )}
          </div>
        </nav>

        {/* ── THE JOURNEYS ───────────────────────────────────────────────── */}
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-14">
          {[...windows.entries()].map(([window, group]) => (
            <section key={window} aria-label={`Journeys — ${window}`} className="pt-16 md:pt-24">
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-border-subtle pb-6 md:pb-8">
                <h2 className="font-editorial text-[clamp(2rem,4.5vw,3.5rem)] leading-none italic">
                  Riding out
                </h2>
                <p className="text-base text-muted-foreground md:text-lg">{window}</p>
                <p
                  aria-hidden
                  className="ml-auto font-editorial text-3xl text-ghost leading-none md:text-4xl"
                >
                  {String(group.length).padStart(2, "0")}
                </p>
              </div>
              <div className="flex flex-col gap-16 pt-10 md:gap-28 md:pt-16">
                {group.map((tour, i) => (
                  <JourneySpread
                    key={tour.slug}
                    tour={tour}
                    index={numberOf.get(tour.slug) ?? i + 1}
                    flip={i % 2 === 1}
                  />
                ))}
              </div>
            </section>
          ))}

          {tours.length === 0 ? (
            <p className="py-24 text-center text-xl text-muted-foreground">
              Nothing matches that filter —{" "}
              <Link href={"/tours-v2" as Route} className="font-medium text-foreground underline underline-offset-4">
                see everything
              </Link>
              .
            </p>
          ) : null}
        </div>

        {/* ── THE DATED ONES — festivals ─────────────────────────────────── */}
        {allFestivals.length > 0 && activeType !== "adventure" ? (
          <section
            data-tone="forest"
            aria-label="Festival journeys"
            className="relative mt-20 overflow-hidden bg-background py-16 text-foreground md:mt-28 md:py-24"
          >
            <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-14">
              <h2 className="max-w-3xl font-editorial text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] text-balance">
                Some journeys have a <em>date.</em>
              </h2>
              <div className="mt-12 grid gap-x-8 gap-y-14 md:mt-16 md:grid-cols-3">
                {allFestivals.map(({ tour, countdown }) => {
                  const from = tourFromPrice(tour);
                  return (
                    <Link
                      key={tour.slug}
                      href={`/tours-v2/${tour.slug}` as Route}
                      className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <p className="font-editorial text-3xl text-accent md:text-4xl">
                        {tour.best_time?.replace(/,\s*\d{4}$/, "") ?? "Dates soon"}
                      </p>
                      {countdown != null ? (
                        <p className="mt-1 text-base text-muted-foreground italic md:text-lg">
                          in {countdown} days
                        </p>
                      ) : null}
                      <div className="relative mt-5 aspect-[16/11] overflow-hidden rounded-2xl bg-muted">
                        {tour.hero ? (
                          <MediaImage
                            media={tour.hero}
                            sizes="(min-width: 768px) 30vw, 92vw"
                            className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                          />
                        ) : null}
                      </div>
                      <p className="mt-4 font-editorial text-2xl leading-tight md:text-[1.7rem]">
                        {tour.title}
                      </p>
                      {from ? (
                        <p className="mt-2 text-lg text-muted-foreground">
                          from <strong className="font-semibold text-foreground">{inr(from)}</strong>
                        </p>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {/* ── THE CLOSER ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <RidgeMotif
            aria-hidden
            className="pointer-events-none absolute right-0 bottom-0 h-40 w-[40rem] max-w-full text-foreground opacity-[0.05] dark:opacity-[0.09]"
          />
          <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-14">
            <h2 className="max-w-3xl font-editorial text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] text-balance">
              Can&apos;t find your dates? <em>We build around them.</em>
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-10">
              <a
                href={customTripUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-13 items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-[background-color,transform] duration-150 outline-none hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px md:text-lg"
              >
                Plan a custom trip
                <span aria-hidden>→</span>
              </a>
              <p className="text-base text-muted-foreground md:text-lg">
                Max 12 people · local crews · permits handled
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
