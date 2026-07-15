import { ItineraryDaySchema, type ItineraryDay } from "@/lib/tours/itinerary";
import { PricingSchema, fromPrice, type Pricing } from "@/lib/tours/pricing";
import type { Tour } from "@/lib/supabase/types";

/**
 * Public read helpers — the ONE contract both the admin composers and the
 * public dossier/catalogue read through. Kills the divergent-contract problem
 * where the public pages re-parsed loose jsonb with weaker ad-hoc readers.
 * Client-safe (no server-only imports); tolerant at every edge — public pages
 * degrade, never throw.
 */

/* ── jsonb edges ─────────────────────────────────────────────────────────── */

export function bodyOf(tour: Pick<Tour, "body">): Record<string, unknown> {
  const b = tour.body;
  return b && typeof b === "object" && !Array.isArray(b) ? (b as Record<string, unknown>) : {};
}

export function strArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string" && v.trim().length > 0);
}

/* ── pricing ─────────────────────────────────────────────────────────────── */

/** Parse `tours.pricing` jsonb into the typed matrix; null when absent/invalid/empty. */
export function parsePricing(json: unknown): Pricing | null {
  const parsed = PricingSchema.safeParse(json);
  if (!parsed.success || parsed.data.modes.length === 0) return null;
  return parsed.data;
}

/** The "from ₹X" everywhere: matrix min, falling back to the flat column. Computed, never typed. */
export function tourFromPrice(tour: Pick<Tour, "pricing" | "price_inr">): number | null {
  return fromPrice(parsePricing(tour.pricing)) ?? tour.price_inr;
}

export function formatInr(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

/* ── itinerary days ──────────────────────────────────────────────────────── */

export type TourDayRow = { day_no: number; title: string | null; body: unknown };

/**
 * Tolerant per-day parse: a malformed row degrades to a minimal day (the
 * journal stays continuous — day 3 never silently vanishes mid-read).
 */
export function parseDay(row: TourDayRow): ItineraryDay {
  const parsed = ItineraryDaySchema.safeParse(row.body);
  if (parsed.success) return parsed.data;
  const legacy =
    row.body && typeof row.body === "object" ? (row.body as Record<string, unknown>) : {};
  return {
    dayNo: row.day_no,
    title: row.title ?? `Day ${row.day_no}`,
    summary: typeof legacy.description === "string" ? legacy.description : null,
    sightseeing: [],
    tags: [],
  };
}

/**
 * Legacy body.itinerary ({title, description} prose) lifted into minimal
 * ItineraryDays — the fallback when tour_days is empty, so ONE journal
 * renderer serves both eras.
 */
export function legacyDays(body: Record<string, unknown>): ItineraryDay[] {
  if (!Array.isArray(body.itinerary)) return [];
  return body.itinerary.flatMap((raw, i) => {
    if (!raw || typeof raw !== "object") return [];
    const day = raw as Record<string, unknown>;
    const title = typeof day.title === "string" ? day.title : "";
    const summary = typeof day.description === "string" ? day.description : null;
    if (!title && !summary) return [];
    return [
      {
        dayNo: i + 1,
        title: title || `Day ${i + 1}`,
        summary,
        sightseeing: [],
        tags: [],
      } satisfies ItineraryDay,
    ];
  });
}

/* ── the route spine ─────────────────────────────────────────────────────── */

export type RibbonNode = {
  name: string;
  /** 0 = the gateway (you start here, you don't sleep here). */
  nights: number;
  note?: string | null;
};

/**
 * The ribbon spine derived from where you actually sleep: gateway (day-1
 * route.from) then consecutive overnights grouped with night counts
 * ("ANINI ×3"). Returns [] below two nodes — the ribbon hides, per spec.
 */
export function overnightNodes(days: ItineraryDay[]): RibbonNode[] {
  const nodes: RibbonNode[] = [];
  const gateway = days[0]?.route?.from?.trim();
  if (gateway) nodes.push({ name: gateway, nights: 0 });
  for (const day of days) {
    const name = day.overnight?.name?.trim();
    if (!name) continue;
    const prev = nodes[nodes.length - 1];
    if (prev && prev.name.toLowerCase() === name.toLowerCase()) prev.nights += 1;
    else nodes.push({ name, nights: 1 });
  }
  return nodes.length >= 2 ? nodes : [];
}

/** Stop names out of the legacy body.routeStops (ribbon/route-line fallback). */
export function stopNames(body: Record<string, unknown>): string[] {
  if (!Array.isArray(body.routeStops)) return [];
  return body.routeStops.flatMap((s) =>
    s && typeof s === "object" && typeof (s as { name?: unknown }).name === "string"
      ? [(s as { name: string }).name]
      : [],
  );
}

/** Days until a festival tour starts (body.eventDates) — null when unknowable. */
export function daysUntilStart(body: Record<string, unknown>, now = Date.now()): number | null {
  const dates = body.eventDates;
  if (!dates || typeof dates !== "object") return null;
  const r = dates as Record<string, unknown>;
  const raw = [r.start, r.startsOn, r.from].find((v) => typeof v === "string") as
    | string
    | undefined;
  if (!raw) return null;
  const t = Date.parse(raw);
  if (Number.isNaN(t)) return null;
  const days = Math.ceil((t - now) / 86_400_000);
  return days > 0 && days < 400 ? days : null;
}

/** "DIBRUGARH → AALO → MECHUKA" — middle-truncated past `max` names. */
export function routeLine(names: string[], max = 3): string | null {
  const clean = names.map((n) => n.trim()).filter(Boolean).map((n) => n.toUpperCase());
  if (clean.length < 2) return null;
  if (clean.length <= max) return clean.join(" → ");
  return [...clean.slice(0, max - 1), "‥", clean[clean.length - 1]].join(" → ");
}

/* ── facts vocabulary ────────────────────────────────────────────────────── */

const DIFFICULTY_TICKS: Record<string, string> = {
  easy: "▲△△",
  moderate: "▲▲△",
  challenging: "▲▲▲",
};

/** "▲▲△" — the difficulty rendered as summit ticks (shared ticket/manifest grammar). */
export function difficultyTicks(difficulty: string | null | undefined): string | null {
  if (!difficulty) return null;
  return DIFFICULTY_TICKS[difficulty] ?? difficulty.toUpperCase();
}

/** "6D/5N" — the compact field notation (ticket facts row). */
export function shortDuration(days: number | null, nights?: number | null): string | null {
  if (!days) return null;
  return nights != null ? `${days}D/${nights}N` : `${days}D`;
}

/* ── editorial body blocks (seeded, founder-editable) ────────────────────── */

export type Testimonial = {
  quote: string;
  name: string;
  location?: string | null;
  date?: string | null;
};

export function testimonialsOf(body: Record<string, unknown>): Testimonial[] {
  if (!Array.isArray(body.testimonials)) return [];
  return body.testimonials.flatMap((t) => {
    if (!t || typeof t !== "object") return [];
    const r = t as Record<string, unknown>;
    if (typeof r.quote !== "string" || typeof r.name !== "string") return [];
    return [
      {
        quote: r.quote,
        name: r.name,
        location: typeof r.location === "string" ? r.location : null,
        date: typeof r.date === "string" ? r.date : null,
      },
    ];
  });
}

export const ARRANGE_ICONS = ["permit", "vehicle", "guide", "stay"] as const;
export type ArrangeIcon = (typeof ARRANGE_ICONS)[number];
export type ArrangeRow = { icon: ArrangeIcon; label: string; status: string };

/** The moat-panel ledger rows (`body.arrange`, seeded from real inclusions). */
export function arrangeRows(body: Record<string, unknown>): ArrangeRow[] {
  if (!Array.isArray(body.arrange)) return [];
  return body.arrange.flatMap((row) => {
    if (!row || typeof row !== "object") return [];
    const r = row as Record<string, unknown>;
    if (typeof r.label !== "string" || typeof r.status !== "string") return [];
    const icon = ARRANGE_ICONS.includes(r.icon as ArrangeIcon) ? (r.icon as ArrangeIcon) : "stay";
    return [{ icon, label: r.label, status: r.status }];
  });
}
