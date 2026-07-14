"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/db/database.types";
import { PlaceFormSchema, fieldErrorsOf } from "./schemas";
import { revalidatePublicAtlas } from "./revalidate";
import { dbErrorToState, type FormState } from "./db-error";
import { pairsFrom } from "./form-utils";

type PlaceData = z.infer<typeof PlaceFormSchema>;

function emptyToUndef(v: FormDataEntryValue | null): string | undefined {
  if (v == null) return undefined;
  const s = String(v).trim();
  return s === "" ? undefined : s;
}

function parse(formData: FormData) {
  return PlaceFormSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    kind: formData.get("kind"),
    regionId: formData.get("regionId"),
    elevation: emptyToUndef(formData.get("elevation")),
    lat: emptyToUndef(formData.get("lat")),
    lng: emptyToUndef(formData.get("lng")),
    isSecret: formData.get("isSecret") === "on",
    exclusivityTier: emptyToUndef(formData.get("exclusivityTier")),
    tribeId: formData.get("tribeId") ?? undefined,
    permitNote: emptyToUndef(formData.get("permitNote")),
    intro: emptyToUndef(formData.get("intro")),
    fieldNote: emptyToUndef(formData.get("fieldNote")),
    story: emptyToUndef(formData.get("story")),
    approachGateway: emptyToUndef(formData.get("approachGateway")),
    approachLegs: emptyToUndef(formData.get("approachLegs")),
    vitalsExtra: emptyToUndef(formData.get("vitalsExtra")),
    seoTitle: emptyToUndef(formData.get("seoTitle")),
    seoDescription: emptyToUndef(formData.get("seoDescription")),
  });
}

/** MultiFieldList approach legs → the body.approach.legs shape (km numeric). */
function legsFrom(v: string | undefined): { from: string; to: string; km: number | null; time: string | null; note: string | null }[] {
  if (!v) return [];
  try {
    const arr = JSON.parse(v);
    if (!Array.isArray(arr)) return [];
    return arr
      .map((r) => {
        const row = r as Record<string, unknown>;
        const km = Number(String(row.km ?? "").replace(/[^\d.]/g, ""));
        return {
          from: String(row.from ?? "").trim(),
          to: String(row.to ?? "").trim(),
          km: Number.isFinite(km) && km > 0 ? km : null,
          time: String(row.time ?? "").trim() || null,
          note: String(row.note ?? "").trim() || null,
        };
      })
      .filter((l) => l.from || l.to || l.note);
  } catch {
    return [];
  }
}

type PlaceWrite = {
  name: string;
  slug: string;
  kind: PlaceData["kind"];
  region_id: string;
  elevation_m: number | null;
  is_secret: boolean;
  exclusivity_tier: number;
  body: Json | null;
  seo: Json;
  geom?: string;
};

function toWrite(data: PlaceData): PlaceWrite {
  const seo: Json = {
    ...(data.seoTitle ? { title: data.seoTitle } : {}),
    ...(data.seoDescription ? { description: data.seoDescription } : {}),
  };
  const write: PlaceWrite = {
    name: data.name,
    slug: data.slug,
    kind: data.kind,
    region_id: data.regionId,
    elevation_m: data.elevation ?? null,
    is_secret: data.isSecret ?? false,
    exclusivity_tier: data.exclusivityTier ?? 0,
    body: data.intro ? { intro: data.intro } : null,
    seo,
  };
  if (data.lat != null && data.lng != null) {
    // lat/lng are Zod-coerced, bounded numbers → safe to interpolate as EWKT.
    write.geom = `SRID=4326;POINT(${data.lng} ${data.lat})`;
  }
  return write;
}

function revalidateAtlas() {
  revalidatePath("/admin/places");
  revalidatePublicAtlas();
}

export async function createPlace(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsOf(parsed.error) };
  }
  const sb = createSupabaseAdminClient();
  const { error } = await sb.from("places").insert(toWrite(parsed.data));
  if (error) return dbErrorToState(error);
  revalidateAtlas();
  redirect("/admin/places");
}

export async function updatePlace(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsOf(parsed.error) };
  }
  const sb = createSupabaseAdminClient();
  const write = toWrite(parsed.data);
  // Merge body: the Entry tab owns intro / field_note / story / approach /
  // vitals_extra. Pipeline keys (ground_truth_flags, verified, season, entry
  // metadata, …) MUST survive admin saves.
  const { data: existing } = await sb.from("places").select("body").eq("id", id).maybeSingle();
  const existingBody =
    existing?.body && typeof existing.body === "object" && !Array.isArray(existing.body)
      ? (existing.body as Record<string, Json>)
      : {};
  const merged: Record<string, Json> = { ...existingBody };

  const own = (key: string, value: Json | undefined | null) => {
    if (value != null && (typeof value !== "string" || value.trim() !== "")) merged[key] = value;
    else delete merged[key];
  };
  own("intro", parsed.data.intro?.trim());
  own("field_note", parsed.data.fieldNote?.trim());
  own("story", parsed.data.story?.trim());
  const legs = legsFrom(parsed.data.approachLegs);
  const gateway = parsed.data.approachGateway?.trim();
  if (legs.length || gateway) {
    const prevApproach =
      existingBody.approach && typeof existingBody.approach === "object" && !Array.isArray(existingBody.approach)
        ? (existingBody.approach as Record<string, Json>)
        : {};
    merged.approach = {
      ...prevApproach,
      from_gateway: gateway ?? null,
      legs: legs as unknown as Json,
    };
  } else {
    delete merged.approach;
  }
  const vitalsPairs = pairsFrom(parsed.data.vitalsExtra);
  if (vitalsPairs.length)
    merged.vitals_extra = Object.fromEntries(vitalsPairs.map((r) => [r.a, r.b]));
  else delete merged.vitals_extra;

  write.body = Object.keys(merged).length ? merged : null;
  const columns = {
    ...write,
    tribe_id: parsed.data.tribeId ? parsed.data.tribeId : null,
    permit_note: parsed.data.permitNote ?? null,
  };
  const { error } = await sb.from("places").update(columns).eq("id", id);
  if (error) return dbErrorToState(error);
  revalidateAtlas();
  // Stay in the editor — the shell toasts and clears its dirty state.
  return { ok: true };
}

export async function setPlacePublished(id: string, published: boolean): Promise<void> {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  const { error } = await sb
    .from("places")
    .update({
      status: published ? "published" : "draft",
      published_at: published ? new Date().toISOString() : null,
    })
    .eq("id", id);
  if (error) throw error;
  revalidateAtlas();
}
