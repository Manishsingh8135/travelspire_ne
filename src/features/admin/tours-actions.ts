"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/db/database.types";
import type { UpdateRow } from "@/lib/supabase/types";
import { TourFormSchema, fieldErrorsOf } from "./schemas";
import { dbErrorToState, type FormState } from "./db-error";
import { ItinerarySchema, type ItineraryDay } from "@/lib/tours/itinerary";
import { PricingSchema, fromPrice, type Pricing } from "@/lib/tours/pricing";

/** Keep `format` in sync with the legacy `type` until the code swaps over. */
const TYPE_TO_FORMAT: Record<string, string> = {
  adventure: "expedition",
  nature: "expedition",
  cultural: "cultural",
  pilgrimage: "pilgrimage",
  festival: "festival",
  trek: "trek",
};

/** body.itinerary stays derived from the rich days so the public dossier
 * remains consistent until its rebuild (13-admin-editor-system §3.5). */
function deriveLegacyItinerary(days: ItineraryDay[]): { title: string; description: string }[] {
  return days.map((d) => ({
    title: d.title,
    description: [
      d.summary ?? "",
      ...(d.sightseeing ?? []).map((s) => `• ${s.name}`),
      d.overnight ? `Overnight stay at ${d.overnight.name}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  }));
}

type TourData = z.infer<typeof TourFormSchema>;

function emptyToUndef(v: FormDataEntryValue | null): string | undefined {
  if (v == null) return undefined;
  const s = String(v).trim();
  return s === "" ? undefined : s;
}

function lines(s?: string): string[] {
  return (s ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Parse the ItineraryEditor's hidden JSON field into clean, non-empty days. */
function parseItinerary(v: FormDataEntryValue | null): { title: string; description: string }[] {
  if (typeof v !== "string" || !v.trim()) return [];
  try {
    const arr = JSON.parse(v);
    if (!Array.isArray(arr)) return [];
    return arr
      .map((d) => ({
        title: String((d as { title?: unknown })?.title ?? "").trim(),
        description: String((d as { description?: unknown })?.description ?? "").trim(),
      }))
      .filter((d) => d.title || d.description);
  } catch {
    return [];
  }
}

function parse(formData: FormData) {
  return TourFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    subtitle: emptyToUndef(formData.get("subtitle")),
    regionId: formData.get("regionId") ?? undefined,
    type: formData.get("type"),
    difficulty: formData.get("difficulty"),
    durationDays: emptyToUndef(formData.get("durationDays")),
    nights: emptyToUndef(formData.get("nights")),
    maxGroupSize: emptyToUndef(formData.get("maxGroupSize")),
    priceInr: emptyToUndef(formData.get("priceInr")),
    bestTime: emptyToUndef(formData.get("bestTime")),
    itineraryRich: emptyToUndef(formData.get("itineraryRich")),
    pricing: emptyToUndef(formData.get("pricing")),
    overview: emptyToUndef(formData.get("overview")),
    highlights: emptyToUndef(formData.get("highlights")),
    inclusions: emptyToUndef(formData.get("inclusions")),
    exclusions: emptyToUndef(formData.get("exclusions")),
    itinerary: parseItinerary(formData.get("itinerary")),
    seoTitle: emptyToUndef(formData.get("seoTitle")),
    seoDescription: emptyToUndef(formData.get("seoDescription")),
  });
}

function toWrite(data: TourData) {
  const seo: Json = {
    ...(data.seoTitle ? { title: data.seoTitle } : {}),
    ...(data.seoDescription ? { description: data.seoDescription } : {}),
  };
  const highlights = lines(data.highlights);
  const inclusions = lines(data.inclusions);
  const exclusions = lines(data.exclusions);
  const itinerary = data.itinerary ?? [];
  const body: Record<string, Json> = {
    ...(data.overview ? { overview: data.overview } : {}),
    ...(highlights.length ? { highlights } : {}),
    ...(inclusions.length ? { inclusions } : {}),
    ...(exclusions.length ? { exclusions } : {}),
    ...(itinerary.length ? { itinerary } : {}),
  };
  return {
    title: data.title,
    slug: data.slug,
    subtitle: data.subtitle ?? null,
    region_id: data.regionId ? data.regionId : null,
    type: data.type,
    difficulty: data.difficulty,
    duration_days: data.durationDays ?? null,
    price_inr: data.priceInr ?? null,
    best_time: data.bestTime ?? null,
    body: Object.keys(body).length ? body : null,
    seo,
  };
}

function revalidateTours() {
  revalidatePath("/admin/tours");
  revalidatePath("/tours");
  revalidatePath("/tours/[slug]", "page");
  revalidatePath("/sitemap.xml");
}

export async function createTour(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsOf(parsed.error) };
  }
  const sb = createSupabaseAdminClient();
  const { error } = await sb.from("tours").insert(toWrite(parsed.data));
  if (error) return dbErrorToState(error);
  revalidateTours();
  redirect("/admin/tours");
}

export async function updateTour(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsOf(parsed.error) };
  }
  // ── Rich payloads: validate with the REAL contracts before any write ──
  // (data-safety §3.4 — invalid JSON never partially writes.)
  let richDays: ItineraryDay[] | null = null;
  if (parsed.data.itineraryRich) {
    try {
      richDays = ItinerarySchema.parse(JSON.parse(parsed.data.itineraryRich));
    } catch {
      return { error: "Itinerary data failed validation — nothing was saved. Reload and retry." };
    }
  }
  let pricingMatrix: Pricing | null = null;
  if (parsed.data.pricing) {
    try {
      const p = PricingSchema.parse(JSON.parse(parsed.data.pricing));
      pricingMatrix = p.modes.length ? p : null;
    } catch {
      return { error: "Pricing data failed validation — nothing was saved. Reload and retry." };
    }
  }

  const sb = createSupabaseAdminClient();
  // Merge body: the form owns overview/highlights/inclusions/exclusions/itinerary;
  // enriched keys (gallery, routeStops, thingsToCarry, testimonials, …) written by
  // importers/other editors must survive an admin save.
  const { data: existing, error: readErr } = await sb
    .from("tours")
    .select("body, price_inr")
    .eq("id", id)
    .maybeSingle();
  if (readErr) return dbErrorToState(readErr);
  const write = toWrite(parsed.data);
  const prevBody =
    existing?.body && typeof existing.body === "object" && !Array.isArray(existing.body)
      ? (existing.body as Record<string, Json>)
      : {};
  const formBody =
    write.body && typeof write.body === "object" && !Array.isArray(write.body)
      ? (write.body as Record<string, Json>)
      : {};
  // Form-owned keys are always replaced (so clearing a field really clears it).
  const FORM_KEYS = ["overview", "highlights", "inclusions", "exclusions", "itinerary"] as const;
  const merged: Record<string, Json> = { ...prevBody, ...formBody };
  for (const key of FORM_KEYS) {
    if (!(key in formBody)) delete merged[key];
  }
  // The composer posts rich days: tour_days become the source of truth and
  // body.itinerary is DERIVED for public back-compat until the dossier rebuild.
  if (richDays) {
    if (richDays.length) merged.itinerary = deriveLegacyItinerary(richDays) as unknown as Json;
    else delete merged.itinerary;
  }

  const columns: UpdateRow<"tours"> = {
    ...write,
    body: Object.keys(merged).length ? merged : null,
    format: (TYPE_TO_FORMAT[parsed.data.type] ?? "expedition") as UpdateRow<"tours">["format"],
    nights: parsed.data.nights ?? null,
    max_group_size: parsed.data.maxGroupSize ?? null,
  };
  if (pricingMatrix) {
    columns.pricing = pricingMatrix as unknown as Json;
    // "From ₹X" is computed, never typed (03 §4).
    columns.price_inr = fromPrice(pricingMatrix) ?? write.price_inr;
  }

  const { error } = await sb.from("tours").update(columns).eq("id", id);
  if (error) return dbErrorToState(error);

  // Replace the day rows (source-owned, same pattern as the importer).
  if (richDays) {
    const del = await sb.from("tour_days").delete().eq("tour_id", id);
    if (del.error) return dbErrorToState(del.error);
    if (richDays.length) {
      const ins = await sb.from("tour_days").insert(
        richDays.map((d) => ({
          tour_id: id,
          day_no: d.dayNo,
          title: d.title || null,
          body: d as unknown as Json,
          place_ids: [],
        })),
      );
      if (ins.error) return dbErrorToState(ins.error);
    }
  }

  revalidateTours();
  // Stay in the editor — the shell toasts and clears its dirty state.
  return { ok: true };
}

export async function setTourPublished(id: string, published: boolean): Promise<void> {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  const { error } = await sb
    .from("tours")
    .update({
      status: published ? "published" : "draft",
      published_at: published ? new Date().toISOString() : null,
    })
    .eq("id", id);
  if (error) throw error;
  revalidateTours();
}
