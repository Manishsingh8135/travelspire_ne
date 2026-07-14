"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { revalidatePublicAtlas } from "./revalidate";

export type ContentTable =
  | "tours"
  | "places"
  | "regions"
  | "festivals"
  | "tribes"
  | "permit_zones";
const ALLOWED: ContentTable[] = [
  "tours",
  "places",
  "regions",
  "festivals",
  "tribes",
  "permit_zones",
];

/** Admin route segment per table (permit_zones lives at /admin/permits). */
const ADMIN_SEGMENT: Record<ContentTable, string> = {
  tours: "tours",
  places: "places",
  regions: "regions",
  festivals: "festivals",
  tribes: "tribes",
  permit_zones: "permits",
};

function revalidateFor(table: ContentTable) {
  revalidatePath(`/admin/${ADMIN_SEGMENT[table]}`);
  revalidatePath("/admin");
  if (table === "tours") {
    revalidatePath("/tours");
    revalidatePath("/tours/[slug]", "page");
  } else if (table === "places" || table === "regions") {
    revalidatePublicAtlas();
  }
  // festivals/tribes/permit_zones: no public routes yet — admin paths suffice.
  revalidatePath("/sitemap.xml");
}

async function patch(
  table: ContentTable,
  ids: string[],
  values: Record<string, unknown>,
): Promise<void> {
  await requireAdmin();
  if (!ALLOWED.includes(table)) throw new Error("Unknown table");
  if (ids.length === 0) return;
  const sb = createSupabaseAdminClient();
  // `table` is a runtime union, so the typed builder collapses update() to never.
  const { error } = await sb.from(table).update(values as never).in("id", ids);
  if (error) throw error;
  revalidateFor(table);
}

export async function setPublished(
  table: ContentTable,
  ids: string[],
  published: boolean,
): Promise<void> {
  await patch(table, ids, {
    status: published ? "published" : "draft",
    published_at: published ? new Date().toISOString() : null,
  });
}

/** Archive = soft, restorable (status `archived`); restore returns to draft. */
export async function setArchived(
  table: ContentTable,
  ids: string[],
  archived: boolean,
): Promise<void> {
  await patch(table, ids, { status: archived ? "archived" : "draft" });
}

/** Trash — soft delete via `deleted_at`; hidden from all admin lists. */
export async function softDelete(table: ContentTable, ids: string[]): Promise<void> {
  await patch(table, ids, { deleted_at: new Date().toISOString() });
}

export async function restoreDeleted(table: ContentTable, ids: string[]): Promise<void> {
  await patch(table, ids, { deleted_at: null, status: "draft" });
}
