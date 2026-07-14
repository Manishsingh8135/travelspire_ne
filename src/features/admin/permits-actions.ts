"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/db/database.types";
import type { UpdateRow } from "@/lib/supabase/types";
import { PermitFormSchema, fieldErrorsOf } from "./schemas";
import { dbErrorToState, type FormState } from "./db-error";
import { emptyToUndef, checkbox, pairsFrom } from "./form-utils";

export async function updatePermit(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = PermitFormSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    permitType: formData.get("permitType"),
    officialPortal: emptyToUndef(formData.get("officialPortal")),
    helpline: emptyToUndef(formData.get("helpline")),
    processingTime: emptyToUndef(formData.get("processingTime")),
    validity: emptyToUndef(formData.get("validity")),
    indiansAllowed: checkbox(formData.get("indiansAllowed")),
    foreignersAllowed: checkbox(formData.get("foreignersAllowed")),
    onArrival: checkbox(formData.get("onArrival")),
    lastVerified: emptyToUndef(formData.get("lastVerified")),
    fee: emptyToUndef(formData.get("fee")),
    faqs: emptyToUndef(formData.get("faqs")),
    seoTitle: emptyToUndef(formData.get("seoTitle")),
    seoDescription: emptyToUndef(formData.get("seoDescription")),
  });
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: fieldErrorsOf(parsed.error) };
  }
  const d = parsed.data;

  // fee: label/value rows → the jsonb object; faqs keep the imported
  // {question, answer} shape. body (whoNeeds/entryPoints/steps/documents/
  // corrections) is pipeline-owned — untouched by this action entirely.
  const fee = Object.fromEntries(pairsFrom(d.fee).map((r) => [r.a, r.b]));
  const faqs = pairsFrom(d.faqs).map((r) => ({ question: r.a, answer: r.b }));

  const columns: UpdateRow<"permit_zones"> = {
    name: d.name,
    slug: d.slug,
    permit_type: d.permitType,
    official_portal: d.officialPortal ?? null,
    helpline: d.helpline ?? null,
    processing_time: d.processingTime ?? null,
    validity: d.validity ?? null,
    indians_allowed: d.indiansAllowed,
    foreigners_allowed: d.foreignersAllowed,
    on_arrival: d.onArrival,
    last_verified_at: d.lastVerified ? new Date(`${d.lastVerified}T00:00:00Z`).toISOString() : null,
    fee: fee as Json,
    faqs: faqs as unknown as Json[],
    seo: {
      ...(d.seoTitle ? { title: d.seoTitle } : {}),
      ...(d.seoDescription ? { description: d.seoDescription } : {}),
    },
  };
  const sb = createSupabaseAdminClient();
  const { error } = await sb.from("permit_zones").update(columns).eq("id", id);
  if (error) return dbErrorToState(error);
  revalidatePath("/admin/permits");
  revalidatePath("/admin");
  return { ok: true };
}
