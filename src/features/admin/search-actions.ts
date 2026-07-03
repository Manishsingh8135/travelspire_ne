"use server";

import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type SearchHit = {
  id: string;
  kind: "tour" | "place" | "region";
  label: string;
  sub: string;
  status: string;
  href: string;
};

/** PostgREST `.or()` uses commas/parens as syntax — neutralize them in the term. */
function sanitize(q: string): string {
  return q.replace(/[,()*%]/g, " ").trim().slice(0, 64);
}

/** Fuzzy-ish name/slug search across content entities for the command palette. */
export async function searchAdminEntities(q: string): Promise<SearchHit[]> {
  await requireAdmin();
  const term = sanitize(q);
  if (!term) return [];

  const sb = createSupabaseAdminClient();
  const like = `%${term}%`;
  const [tours, places, regions] = await Promise.all([
    sb
      .from("tours")
      .select("id, title, slug, status")
      .or(`title.ilike.${like},slug.ilike.${like}`)
      .is("deleted_at", null)
      .limit(5),
    sb
      .from("places")
      .select("id, name, slug, status")
      .or(`name.ilike.${like},slug.ilike.${like}`)
      .is("deleted_at", null)
      .limit(5),
    sb
      .from("regions")
      .select("id, name, slug, status")
      .or(`name.ilike.${like},slug.ilike.${like}`)
      .is("deleted_at", null)
      .limit(5),
  ]);

  const hits: SearchHit[] = [];
  for (const t of tours.data ?? [])
    hits.push({ id: t.id, kind: "tour", label: t.title, sub: t.slug, status: t.status, href: `/admin/tours/${t.id}` });
  for (const p of places.data ?? [])
    hits.push({ id: p.id, kind: "place", label: p.name, sub: p.slug, status: p.status, href: `/admin/places/${p.id}` });
  for (const r of regions.data ?? [])
    hits.push({ id: r.id, kind: "region", label: r.name, sub: r.slug, status: r.status, href: `/admin/regions/${r.id}` });
  return hits;
}
