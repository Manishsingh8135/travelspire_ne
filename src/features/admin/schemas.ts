import { z } from "zod";

const slug = z
  .string()
  .min(1, "Required")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase letters, numbers and hyphens only");

export const RegionFormSchema = z.object({
  name: z.string().min(1, "Required"),
  slug,
  level: z.enum(["state", "district", "valley"]),
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
    intro: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  })
  .refine((d) => (d.lat == null) === (d.lng == null), {
    message: "Provide both latitude and longitude, or neither.",
    path: ["lat"],
  });

export type PlaceForm = z.infer<typeof PlaceFormSchema>;

/** First error message per field, for form display. */
export function fieldErrorsOf(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
