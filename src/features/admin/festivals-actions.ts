"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/db/database.types";
import type { UpdateRow } from "@/lib/supabase/types";
import { FestivalFormSchema, fieldErrorsOf } from "./schemas";
import { dbErrorToState, type FormState } from "./db-error";
import { emptyToUndef, pairsFrom, bodyRecord } from "./form-utils";

function parse(formData: FormData) {
  return FestivalFormSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    tribeId: formData.get("tribeId") ?? undefined,
    placeId: formData.get("placeId") ?? undefined,
    regionId: formData.get("regionId") ?? undefined,
    month: emptyToUndef(formData.get("month")),
    typicalStartDay: emptyToUndef(formData.get("typicalStartDay")),
    durationDays: emptyToUndef(formData.get("durationDays")),
    ruleNote: emptyToUndef(formData.get("ruleNote")),
    significance: emptyToUndef(formData.get("significance")),
    whatToExpect: emptyToUndef(formData.get("whatToExpect")),
    attendWhere: emptyToUndef(formData.get("attendWhere")),
    attendWhenNote: emptyToUndef(formData.get("attendWhenNote")),
    attendScarcity: emptyToUndef(formData.get("attendScarcity")),
    faqs: emptyToUndef(formData.get("faqs")),
    seoTitle: emptyToUndef(formData.get("seoTitle")),
    seoDescription: emptyToUndef(formData.get("seoDescription")),
  });
}

export async function updateFestival(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsOf(parsed.error) };
  }
  const d = parsed.data;
  const sb = createSupabaseAdminClient();

  // Merge body: the form owns significance / what_to_expect / attend / faqs;
  // pipeline keys (ground_truth_flags, verified, lineup, legacy_source…) survive.
  const { data: existing, error: readErr } = await sb
    .from("festivals")
    .select("body, recurrence")
    .eq("id", id)
    .maybeSingle();
  if (readErr) return dbErrorToState(readErr);
  const prevBody = bodyRecord(existing?.body);
  const prevAttend = bodyRecord(prevBody.attend);

  const whatToExpect = pairsFrom(d.whatToExpect).map((r) => ({ title: r.a, note: r.b || null }));
  const faqs = pairsFrom(d.faqs).map((r) => ({ q: r.a, a: r.b }));
  const attend = {
    ...prevAttend,
    where: d.attendWhere ?? null,
    when_note: d.attendWhenNote ?? null,
    scarcity_note: d.attendScarcity ?? null,
  };

  const merged: Record<string, unknown> = { ...prevBody, attend };
  if (d.significance) merged.significance = d.significance;
  else delete merged.significance;
  if (whatToExpect.length) merged.what_to_expect = whatToExpect;
  else delete merged.what_to_expect;
  if (faqs.length) merged.faqs = faqs;
  else delete merged.faqs;

  const prevRecurrence = bodyRecord(existing?.recurrence);
  const columns: UpdateRow<"festivals"> = {
    name: d.name,
    slug: d.slug,
    tribe_id: d.tribeId ? d.tribeId : null,
    place_id: d.placeId ? d.placeId : null,
    region_id: d.regionId ? d.regionId : null,
    recurrence: {
      ...prevRecurrence,
      month: d.month ?? null,
      typical_start_day: d.typicalStartDay ?? null,
      duration_days: d.durationDays ?? null,
      rule_note: d.ruleNote ?? null,
    } as Json,
    body: merged as Json,
    seo: {
      ...(d.seoTitle ? { title: d.seoTitle } : {}),
      ...(d.seoDescription ? { description: d.seoDescription } : {}),
    },
  };

  const { error } = await sb.from("festivals").update(columns).eq("id", id);
  if (error) return dbErrorToState(error);
  revalidatePath("/admin/festivals");
  revalidatePath("/admin");
  return { ok: true };
}
