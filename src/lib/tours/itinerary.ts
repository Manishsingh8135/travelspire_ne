import { z } from "zod";

/**
 * The ItineraryDay contract — the true shape of a Travelspire tour day,
 * reverse-engineered from the founder's real WhatsApp itineraries.
 * Stored per-day in `tour_days.body`. Spec: docs-new/08-blueprint/03 §2.
 *
 * NO-DOWNGRADE LAW: sightseeing stays a structured list (never flattened to
 * prose), overnight is always captured — v1 lost neither; v2 must not either.
 */

export const DAY_TAGS = [
  "trek",
  "rest",
  "sunrise",
  "border",
  "market",
  "long-drive",
] as const;
export type DayTag = (typeof DAY_TAGS)[number];

export const OVERNIGHT_TYPES = ["homestay", "camp", "tent", "hotel", "guesthouse"] as const;
export type OvernightType = (typeof OVERNIGHT_TYPES)[number];

export const SightseeingItemSchema = z.object({
  name: z.string().min(1),
  /** Links to an atlas place when one exists; most micro-POIs stay strings. */
  placeId: z.uuid().nullish(),
  note: z.string().nullish(),
});
export type SightseeingItem = z.infer<typeof SightseeingItemSchema>;

export const OvernightSchema = z.object({
  name: z.string().min(1),
  placeId: z.uuid().nullish(),
  type: z.enum(OVERNIGHT_TYPES).nullish(),
  /** The source line, kept verbatim ("Enjoy the last night at Anini Homestay with Bonfire evening."). */
  raw: z.string().nullish(),
});
export type Overnight = z.infer<typeof OvernightSchema>;

export const ItineraryDaySchema = z.object({
  dayNo: z.number().int().min(1),
  title: z.string(),
  /** From → To; null for "explore X" days. */
  route: z.object({ from: z.string(), to: z.string() }).nullish(),
  distanceKm: z.number().positive().nullish(),
  /** Free text, as quoted: "6 hours approx". */
  driveTime: z.string().nullish(),
  /** Departure/timing, evocative and verbatim: "Morning 05:00–06:30", "03:00 → 15:00". */
  tripTime: z.string().nullish(),
  summary: z.string().nullish(),
  /** The bullet list — micro-POIs. Never flattened into prose. */
  sightseeing: z.array(SightseeingItemSchema).default([]),
  /** Where you actually sleep that night. Absent only on drop-off days. */
  overnight: OvernightSchema.nullish(),
  tags: z.array(z.enum(DAY_TAGS)).default([]),
});
export type ItineraryDay = z.infer<typeof ItineraryDaySchema>;

export const ItinerarySchema = z.array(ItineraryDaySchema);
export type Itinerary = z.infer<typeof ItinerarySchema>;
