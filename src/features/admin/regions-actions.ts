"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/db/database.types";
import { RegionFormSchema, fieldErrorsOf } from "./schemas";
import { revalidatePublicAtlas } from "./revalidate";
import { dbErrorToState, type FormState } from "./db-error";

type RegionWrite = {
  name: string;
  slug: string;
  level: string;
  parent_id: string | null;
  body: Json | null;
  seo: Json;
};

function parse(formData: FormData) {
  return RegionFormSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    level: formData.get("level"),
    parentId: formData.get("parentId") || undefined,
    intro: formData.get("intro") || undefined,
    seoTitle: formData.get("seoTitle") || undefined,
    seoDescription: formData.get("seoDescription") || undefined,
  });
}

function toWrite(data: {
  name: string;
  slug: string;
  level: string;
  parentId?: string;
  intro?: string;
  seoTitle?: string;
  seoDescription?: string;
}): RegionWrite {
  const seo: Json = {
    ...(data.seoTitle ? { title: data.seoTitle } : {}),
    ...(data.seoDescription ? { description: data.seoDescription } : {}),
  };
  const body: Json | null = data.intro ? { intro: data.intro } : null;
  return {
    name: data.name,
    slug: data.slug,
    level: data.level,
    parent_id: data.parentId ? data.parentId : null,
    body,
    seo,
  };
}

function revalidateAtlas() {
  revalidatePath("/admin/regions");
  revalidatePublicAtlas();
}

export async function createRegion(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsOf(parsed.error) };
  }
  const sb = createSupabaseAdminClient();
  const { error } = await sb.from("regions").insert(toWrite(parsed.data));
  if (error) return dbErrorToState(error);
  revalidateAtlas();
  redirect("/admin/regions");
}

export async function updateRegion(
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
  // Merge body: the form owns only `intro`. Hub-content keys (soul_line,
  // vitals, answers, signature_moments, getting_there, season, faqs, …)
  // are written by content seeds and MUST survive admin saves.
  const { data: existing } = await sb.from("regions").select("body").eq("id", id).maybeSingle();
  const existingBody =
    existing?.body && typeof existing.body === "object" && !Array.isArray(existing.body)
      ? (existing.body as Record<string, Json>)
      : {};
  const merged: Record<string, Json> = { ...existingBody };
  const intro = parsed.data.intro?.trim();
  if (intro) merged.intro = intro;
  else delete merged.intro;
  write.body = Object.keys(merged).length ? merged : null;
  const { error } = await sb.from("regions").update(write).eq("id", id);
  if (error) return dbErrorToState(error);
  revalidateAtlas();
  redirect("/admin/regions");
}

export async function setRegionPublished(id: string, published: boolean): Promise<void> {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  const { error } = await sb
    .from("regions")
    .update({
      status: published ? "published" : "draft",
      published_at: published ? new Date().toISOString() : null,
    })
    .eq("id", id);
  if (error) throw error;
  revalidateAtlas();
}
