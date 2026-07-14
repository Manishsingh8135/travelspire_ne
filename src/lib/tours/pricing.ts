import { z } from "zod";

/**
 * The pricing matrix — real Travelspire pricing is a function of group size
 * plus a private rate, never a single number. Stored in `tours.pricing`.
 * Spec: docs-new/08-blueprint/03 §4. "From ₹X" is ALWAYS computed, never typed.
 */

export const GroupTierSchema = z.object({
  groupSize: z.number().int().min(1),
  pricePax: z.number().int().min(0),
});
export type GroupTier = z.infer<typeof GroupTierSchema>;

export const PricingModeSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("group"),
    label: z.string().nullish(),
    tiers: z.array(GroupTierSchema).min(1),
  }),
  z.object({
    mode: z.literal("private"),
    label: z.string().nullish(),
    pricePax: z.number().int().min(0),
  }),
  // Festival variant tiers (Hornbill Camping ₹1,799 / Premium ₹9,299…) — unified
  // into the same matrix so there is ONE pricing model, not two.
  z.object({
    mode: z.literal("variant"),
    label: z.string().min(1),
    pricePax: z.number().int().min(0),
    nights: z.number().int().min(0).nullish(),
    days: z.number().int().min(1).nullish(),
    description: z.string().nullish(),
    inclusions: z.array(z.string()).default([]),
  }),
]);
export type PricingMode = z.infer<typeof PricingModeSchema>;

export const PricingSchema = z.object({
  currency: z.literal("INR").default("INR"),
  per: z.literal("pax").default("pax"),
  modes: z.array(PricingModeSchema),
});
export type Pricing = z.infer<typeof PricingSchema>;

/** The catalogue/dossier "from ₹X" — min across every mode. Null when unpriced. */
export function fromPrice(pricing: Pricing | null | undefined): number | null {
  if (!pricing || pricing.modes.length === 0) return null;
  const all = pricing.modes.flatMap((m) =>
    m.mode === "group" ? m.tiers.map((t) => t.pricePax) : [m.pricePax],
  );
  return all.length ? Math.min(...all) : null;
}

/** "6 days · 5 nights" — the 5N/6D notation, displayed. */
export function durationLabel(days: number | null, nights: number | null): string | null {
  if (!days) return null;
  const d = `${days} day${days === 1 ? "" : "s"}`;
  return nights != null ? `${d} · ${nights} night${nights === 1 ? "" : "s"}` : d;
}

/** Parse "5N/6D" → { nights, days }. */
export function parseDurationNotation(text: string): { nights: number; days: number } | null {
  const m = /(\d+)\s*N\s*\/\s*(\d+)\s*D/i.exec(text);
  if (!m) return null;
  return { nights: Number(m[1]), days: Number(m[2]) };
}
