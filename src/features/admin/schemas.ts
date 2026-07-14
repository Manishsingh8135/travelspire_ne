import { z } from "zod";

const slug = z
  .string()
  .min(1, "Required")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase letters, numbers and hyphens only");

export const RegionFormSchema = z.object({
  name: z.string().min(1, "Required"),
  slug,
  level: z.enum(["state", "district", "valley"]),
  parentId: z.union([z.uuid(), z.literal("")]).optional(),
  intro: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export type RegionForm = z.infer<typeof RegionFormSchema>;

export const PLACE_KINDS = [
  "village",
  "town",
  "lake",
  "pass",
  "peak",
  "monastery",
  "market",
  "viewpoint",
  "waterfall",
  "other",
] as const;

export const PlaceFormSchema = z
  .object({
    name: z.string().min(1, "Required"),
    slug,
    kind: z.enum(PLACE_KINDS),
    regionId: z.uuid("Pick a region"),
    elevation: z.coerce.number().int().min(0).max(9000).optional(),
    lat: z.coerce.number().min(-90).max(90).optional(),
    lng: z.coerce.number().min(-180).max(180).optional(),
    isSecret: z.boolean().optional(),
    exclusivityTier: z.coerce.number().int().min(0).max(2).optional(),
    intro: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  })
  .refine((d) => (d.lat == null) === (d.lng == null), {
    message: "Provide both latitude and longitude, or neither.",
    path: ["lat"],
  });

export type PlaceForm = z.infer<typeof PlaceFormSchema>;

export const TOUR_TYPES = [
  "adventure",
  "cultural",
  "nature",
  "pilgrimage",
  "festival",
  "trek",
] as const;
export const TOUR_DIFFICULTIES = ["easy", "moderate", "challenging"] as const;

export const TourFormSchema = z.object({
  title: z.string().min(1, "Required"),
  slug,
  subtitle: z.string().optional(),
  regionId: z.union([z.uuid(), z.literal("")]).optional(),
  type: z.enum(TOUR_TYPES),
  difficulty: z.enum(TOUR_DIFFICULTIES),
  durationDays: z.coerce.number().int().min(1).max(60).optional(),
  nights: z.coerce.number().int().min(0).max(60).optional(),
  maxGroupSize: z.coerce.number().int().min(1).max(100).optional(),
  priceInr: z.coerce.number().int().min(0).max(100_000_000).optional(),
  bestTime: z.string().optional(),
  /** Rich payloads (JSON strings) — validated in the action by the real
   * ItinerarySchema / PricingSchema so an invalid payload never partially writes. */
  itineraryRich: z.string().optional(),
  pricing: z.string().optional(),
  overview: z.string().optional(),
  highlights: z.string().optional(), // newline-separated
  inclusions: z.string().optional(), // newline-separated
  exclusions: z.string().optional(), // newline-separated
  itinerary: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export type TourForm = z.infer<typeof TourFormSchema>;

const optionalUuid = z.union([z.uuid(), z.literal("")]).optional();

export const FestivalFormSchema = z.object({
  name: z.string().min(1, "Required"),
  slug,
  tribeId: optionalUuid,
  placeId: optionalUuid,
  regionId: optionalUuid,
  month: z.coerce.number().int().min(1).max(12).optional(),
  typicalStartDay: z.coerce.number().int().min(1).max(31).optional(),
  durationDays: z.coerce.number().int().min(1).max(30).optional(),
  ruleNote: z.string().optional(),
  significance: z.string().optional(),
  whatToExpect: z.string().optional(), // PairList JSON [{a: title, b: note}]
  attendWhere: z.string().optional(),
  attendWhenNote: z.string().optional(),
  attendScarcity: z.string().optional(),
  faqs: z.string().optional(), // PairList JSON [{a: q, b: a}]
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});
export type FestivalForm = z.infer<typeof FestivalFormSchema>;

export const TribeFormSchema = z.object({
  name: z.string().min(1, "Required"),
  slug,
  who: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});
export type TribeForm = z.infer<typeof TribeFormSchema>;

export const PERMIT_TYPES = ["ILP", "PAP", "RAP", "none"] as const;

export const PermitFormSchema = z.object({
  name: z.string().min(1, "Required"),
  slug,
  permitType: z.enum(PERMIT_TYPES),
  officialPortal: z.string().optional(),
  helpline: z.string().optional(),
  processingTime: z.string().optional(),
  validity: z.string().optional(),
  indiansAllowed: z.boolean(),
  foreignersAllowed: z.boolean(),
  onArrival: z.boolean(),
  lastVerified: z.string().optional(), // yyyy-mm-dd from <input type=date>
  fee: z.string().optional(), // PairList JSON [{a: label, b: value}]
  faqs: z.string().optional(), // PairList JSON [{a: question, b: answer}]
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});
export type PermitForm = z.infer<typeof PermitFormSchema>;

/** First error message per field, for form display. */
export function fieldErrorsOf(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
