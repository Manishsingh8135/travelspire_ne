"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/db/database.types";
import { RegionFormSchema, fieldErrorsOf } from "./schemas";
import { pairsFrom } from "./form-utils";
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
  const s = (name: string) => {
    const v = formData.get(name);
    if (v == null) return undefined;
    const t = String(v).trim();
    return t === "" ? undefined : t;
  };
  return RegionFormSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    level: formData.get("level"),
    parentId: formData.get("parentId") || undefined,
    intro: s("intro"),
    soulLine: s("soulLine"),
    vitalsCapital: s("vitalsCapital"),
    vitalsPermit: s("vitalsPermit"),
    vitalsBestWindow: s("vitalsBestWindow"),
    vitalsElevation: s("vitalsElevation"),
    vitalsTribes: s("vitalsTribes"),
    gatewayCities: s("gatewayCities"),
    answers: s("answers"),
    signatureMoments: s("signatureMoments"),
    airports: s("airports"),
    railheads: s("railheads"),
    roadGates: s("roadGates"),
    gettingThereNote: s("gettingThereNote"),
    season: s("season"),
    seasonBestWindow: s("seasonBestWindow"),
    seasonMonsoonNote: s("seasonMonsoonNote"),
    faqs: s("faqs"),
    seoTitle: s("seoTitle"),
    seoDescription: s("seoDescription"),
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
  const d = parsed.data;
  const write = toWrite(d);
  // Merge body: the Hub tab owns intro / soul_line / vitals / answers /
  // signature_moments / getting_there / season / faqs. Pipeline keys
  // (verified, …) MUST survive admin saves.
  const { data: existing } = await sb.from("regions").select("body").eq("id", id).maybeSingle();
  const existingBody =
    existing?.body && typeof existing.body === "object" && !Array.isArray(existing.body)
      ? (existing.body as Record<string, Json>)
      : {};
  const merged: Record<string, Json> = { ...existingBody };

  const own = (key: string, value: Json | undefined | null) => {
    if (value != null && (typeof value !== "string" || value.trim() !== "")) merged[key] = value;
    else delete merged[key];
  };
  own("intro", d.intro?.trim());
  own("soul_line", d.soulLine?.trim());

  // Vitals — fixed keys + gateway cities tokens.
  const gateways = tokensFrom(d.gatewayCities);
  const vitals: Record<string, Json> = {};
  if (d.vitalsCapital) vitals.capital = d.vitalsCapital;
  if (d.vitalsPermit) vitals.permit_chip = d.vitalsPermit;
  if (d.vitalsBestWindow) vitals.best_window = d.vitalsBestWindow;
  if (d.vitalsElevation) vitals.elevation_range = d.vitalsElevation;
  if (d.vitalsTribes) vitals.tribes = d.vitalsTribes;
  if (gateways.length) vitals.gateway_cities = gateways;
  if (Object.keys(vitals).length) merged.vitals = vitals;
  else delete merged.vitals;

  const answers = pairsFrom(d.answers).map((r) => ({ q: r.a, a: r.b }));
  if (answers.length) merged.answers = answers as unknown as Json;
  else delete merged.answers;

  // Signature moments: keep media/place refs for rows whose title is unchanged.
  const prevMoments = Array.isArray(existingBody.signature_moments)
    ? (existingBody.signature_moments as Record<string, Json>[])
    : [];
  const moments = pairsFrom(d.signatureMoments).map((r) => {
    const prev = prevMoments.find((m) => String(m.title ?? "") === r.a);
    return { ...(prev ?? {}), title: r.a, prose: r.b };
  });
  if (moments.length) merged.signature_moments = moments as unknown as Json;
  else delete merged.signature_moments;

  // Getting there.
  const airports = rowsFrom(d.airports, ["name", "note"]);
  const railheads = rowsFrom(d.railheads, ["name", "note"]);
  const roadGates = rowsFrom(d.roadGates, ["gate", "from", "opens"]);
  if (airports.length || railheads.length || roadGates.length || d.gettingThereNote) {
    merged.getting_there = {
      airports: airports as unknown as Json,
      railheads: railheads as unknown as Json,
      road_gates: roadGates as unknown as Json,
      note: d.gettingThereNote ?? null,
    };
  } else {
    delete merged.getting_there;
  }

  // Season band: 12 fixed months + the honesty notes.
  const months = monthsFrom(d.season);
  if (months.length) {
    merged.season = {
      months: months as unknown as Json,
      best_window: d.seasonBestWindow ?? null,
      monsoon_note: d.seasonMonsoonNote ?? null,
    };
  } else {
    delete merged.season;
  }

  const faqs = pairsFrom(d.faqs).map((r) => ({ q: r.a, a: r.b }));
  if (faqs.length) merged.faqs = faqs as unknown as Json;
  else delete merged.faqs;

  write.body = Object.keys(merged).length ? merged : null;
  const { error } = await sb.from("regions").update(write).eq("id", id);
  if (error) return dbErrorToState(error);
  revalidateAtlas();
  // Stay in the editor — the shell toasts and clears its dirty state.
  return { ok: true };
}

/** TokenInput hidden value: JSON string[] → clean tokens. */
function tokensFrom(v: string | undefined): string[] {
  if (!v) return [];
  try {
    const arr = JSON.parse(v);
    return Array.isArray(arr) ? arr.map((t) => String(t).trim()).filter(Boolean) : [];
  } catch {
    return [];
  }
}

/** MultiFieldList hidden value → records restricted to the given keys. */
function rowsFrom(v: string | undefined, keys: string[]): Record<string, string>[] {
  if (!v) return [];
  try {
    const arr = JSON.parse(v);
    if (!Array.isArray(arr)) return [];
    return arr
      .map((r) => {
        const row = r as Record<string, unknown>;
        return Object.fromEntries(keys.map((k) => [k, String(row[k] ?? "").trim()]));
      })
      .filter((r) => Object.values(r).some(Boolean));
  } catch {
    return [];
  }
}

/** SeasonEditor hidden value → the 12 month rows (only if any note/non-default set). */
function monthsFrom(v: string | undefined): { m: number; glyph: string; road_risk: number; note: string }[] {
  if (!v) return [];
  try {
    const arr = JSON.parse(v);
    if (!Array.isArray(arr) || arr.length === 0) return [];
    const months = arr
      .map((r) => {
        const row = r as Record<string, unknown>;
        return {
          m: Number(row.m),
          glyph: String(row.glyph ?? "sun"),
          road_risk: Number(row.road_risk ?? 0),
          note: String(row.note ?? "").trim(),
        };
      })
      .filter((r) => r.m >= 1 && r.m <= 12);
    // An untouched editor (all sun/0/empty) means "no season data" — don't write it.
    const touched = months.some((r) => r.note || r.glyph !== "sun" || r.road_risk !== 0);
    return touched ? months : [];
  } catch {
    return [];
  }
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
