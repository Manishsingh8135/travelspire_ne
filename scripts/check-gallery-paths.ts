/**
 * Gallery guard — read-only. Verifies every tours.body.gallery path resolves
 * to a real file under public/ with EXACT case (macOS dev is case-insensitive;
 * Vercel/Linux is not — a case mismatch 404s in production). Exits 1 listing
 * offenders so it can gate a ship.
 *
 *   node --env-file=.env.local --import tsx scripts/check-gallery-paths.ts
 */
import { createClient } from "@supabase/supabase-js";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !secret) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY.");
  process.exit(1);
}

function walk(dir: string, base: string, out: Set<string>) {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    const rel = `${base}/${entry}`;
    if (statSync(abs).isDirectory()) walk(abs, rel, out);
    else out.add(rel);
  }
}

async function main() {
  const sb = createClient(url!, secret!, { auth: { persistSession: false } });
  const actual = new Set<string>();
  walk(join(process.cwd(), "public", "images"), "/images", actual);

  const { data: tours, error } = await sb
    .from("tours")
    .select("slug, body")
    .is("deleted_at", null);
  if (error) throw error;

  let bad = 0;
  let total = 0;
  for (const tour of tours ?? []) {
    const body = (tour.body ?? {}) as Record<string, unknown>;
    if (!Array.isArray(body.gallery)) continue;
    for (const raw of body.gallery) {
      if (typeof raw !== "string") continue;
      total += 1;
      if (!actual.has(raw)) {
        bad += 1;
        console.log(`✗ ${tour.slug}  ${raw}`);
      }
    }
  }
  console.log(`\n${total - bad}/${total} gallery paths resolve with exact case.`);
  if (bad > 0) {
    console.error(`${bad} broken path(s) — run scripts/seed-dossier-editorial.ts to case-fix.`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
