import "server-only";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { Tour } from "@/lib/supabase/types";

/** Public reads — anon client, RLS returns published tours only. */

export async function getPublishedTours(): Promise<Tour[]> {
  const sb = createSupabasePublicClient();
  const { data, error } = await sb
    .from("tours")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const sb = createSupabasePublicClient();
  const { data, error } = await sb
    .from("tours")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return data;
}
