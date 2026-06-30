"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type UploadState = { error?: string; ok?: boolean };

const ENTITY_ADMIN_PATH = {
  tours: "/admin/tours",
  places: "/admin/places",
  regions: "/admin/regions",
} as const;
export type HeroEntity = keyof typeof ENTITY_ADMIN_PATH;

const MAX_BYTES = 8_000_000;

export async function uploadHeroImage(
  entity: HeroEntity,
  id: string,
  _prev: UploadState,
  formData: FormData,
): Promise<UploadState> {
  await requireAdmin();

  const file = formData.get("file");
  const alt = String(formData.get("alt") ?? "").trim();
  if (!(file instanceof File) || file.size === 0) return { error: "Choose an image." };
  if (!file.type.startsWith("image/")) return { error: "That file isn't an image." };
  if (file.size > MAX_BYTES) return { error: "Image must be under 8 MB." };

  const sb = createSupabaseAdminClient();
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${entity}/${id}/${crypto.randomUUID()}.${ext}`;

  const { error: upErr } = await sb.storage
    .from("media")
    .upload(path, file, { contentType: file.type, upsert: true });
  if (upErr) return { error: upErr.message };

  const { data: media, error: mErr } = await sb
    .from("media")
    .insert({ storage_path: path, alt: alt || null, kind: "image" })
    .select("id")
    .single();
  if (mErr) return { error: mErr.message };

  const { error: linkErr } = await sb.from(entity).update({ hero_media_id: media.id }).eq("id", id);
  if (linkErr) return { error: linkErr.message };

  revalidatePath(`${ENTITY_ADMIN_PATH[entity]}/${id}`);
  if (entity === "tours") {
    revalidatePath("/tours");
    revalidatePath("/tours/[slug]", "page");
  }
  return { ok: true };
}
