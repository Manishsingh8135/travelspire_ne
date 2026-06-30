import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Tour } from "@/lib/supabase/types";

/** Admin reads (service-role) — see drafts too. */

export async function listToursForAdmin(): Promise<Tour[]> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb
    .from("tours")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getTourForAdmin(id: string): Promise<Tour | null> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb.from("tours").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

/** Region options for the tour form's picker. */
export async function getRegionOptions(): Promise<{ id: string; name: string }[]> {
  const sb = createSupabaseAdminClient();
  const { data, error } = await sb.from("regions").select("id, name").order("name");
  if (error) throw error;
  return data ?? [];
}
