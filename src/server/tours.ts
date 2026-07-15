import "server-only";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { HeroMedia } from "@/lib/media";
import type { Tables, Tour } from "@/lib/supabase/types";
import type { ItineraryDay } from "@/lib/tours/itinerary";
import { parseDay } from "@/lib/tours/read";

export type TourWithHero = Tour & { hero: HeroMedia | null };
export type TourEvent = Pick<
  Tables<"events">,
  "kind" | "label" | "starts_on" | "ends_on" | "status" | "year"
>;

const HERO_SELECT = "*, hero:media!hero_media_id(storage_path, alt, width, height)";

/** Public reads — anon client, RLS returns published tours only (+ their hero). */

export async function getPublishedTours(): Promise<TourWithHero[]> {
  const sb = createSupabasePublicClient();
  const { data, error } = await sb
    .from("tours")
    .select(HERO_SELECT)
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as TourWithHero[];
}

export async function getTourBySlug(slug: string): Promise<TourWithHero | null> {
  const sb = createSupabasePublicClient();
  const { data, error } = await sb
    .from("tours")
    .select(HERO_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as unknown as TourWithHero | null;
}

/**
 * The structured day-by-day itinerary (tour_days, RLS: published parent only).
 * Per-day tolerant parse — a malformed row degrades to a minimal day, the
 * public journal never throws. Empty array ⇒ the dossier falls back to the
 * legacy body.itinerary prose.
 */
export async function getTourDays(tourId: string): Promise<ItineraryDay[]> {
  const sb = createSupabasePublicClient();
  const { data, error } = await sb
    .from("tour_days")
    .select("day_no, title, body")
    .eq("tour_id", tourId)
    .order("day_no", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(parseDay);
}

/**
 * Dated instances for the DeparturesStrip: the tour's own departures plus its
 * festival's editions (RLS scopes both to published parents). Ordered soonest
 * first; the page filters to upcoming.
 */
export async function getTourEvents(
  tourId: string,
  festivalId: string | null,
): Promise<TourEvent[]> {
  const sb = createSupabasePublicClient();
  const orFilter = festivalId
    ? `tour_id.eq.${tourId},festival_id.eq.${festivalId}`
    : `tour_id.eq.${tourId}`;
  const { data, error } = await sb
    .from("events")
    .select("kind, label, starts_on, ends_on, status, year")
    .or(orFilter)
    .order("starts_on", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
