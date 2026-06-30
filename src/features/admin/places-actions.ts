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
    intro: emptyToUndef(formData.get("intro")),
    seoTitle: emptyToUndef(formData.get("seoTitle")),
    seoDescription: emptyToUndef(formData.get("seoDescription")),
  });
}

type PlaceWrite = {
  name: string;
  slug: string;
  kind: PlaceData["kind"];
  region_id: string;
  elevation_m: number | null;
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
  const { error } = await sb.from("places").update(toWrite(parsed.data)).eq("id", id);
  if (error) return dbErrorToState(error);
  revalidateAtlas();
  redirect("/admin/places");
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
