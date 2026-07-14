"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/db/database.types";
import type { UpdateRow } from "@/lib/supabase/types";
import { TribeFormSchema, fieldErrorsOf } from "./schemas";
import { dbErrorToState, type FormState } from "./db-error";
import { emptyToUndef, bodyRecord } from "./form-utils";

export async function updateTribe(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = TribeFormSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    who: emptyToUndef(formData.get("who")),
    seoTitle: emptyToUndef(formData.get("seoTitle")),
    seoDescription: emptyToUndef(formData.get("seoDescription")),
  });
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsOf(parsed.error) };
  }
  const d = parsed.data;
  const sb = createSupabaseAdminClient();

  // Merge body: the form owns `who`; everything else survives.
  const { data: existing, error: readErr } = await sb
    .from("tribes")
    .select("body")
    .eq("id", id)
    .maybeSingle();
  if (readErr) return dbErrorToState(readErr);
  const merged = { ...bodyRecord(existing?.body) };
  if (d.who) merged.who = d.who;
  else delete merged.who;

  const columns: UpdateRow<"tribes"> = {
    name: d.name,
    slug: d.slug,
    body: merged as Json,
    seo: {
      ...(d.seoTitle ? { title: d.seoTitle } : {}),
      ...(d.seoDescription ? { description: d.seoDescription } : {}),
    },
  };
  const { error } = await sb.from("tribes").update(columns).eq("id", id);
  if (error) return dbErrorToState(error);
  revalidatePath("/admin/tribes");
  revalidatePath("/admin");
  return { ok: true };
}
