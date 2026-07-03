/**
 * Upload each legacy tour's hero image to Supabase Storage and link it.
 *
 *   node --env-file=.env.local --import tsx scripts/import-legacy-tour-images.ts [--dry]
 *
 * - Reads the heroImage file from `public/…`, uploads to `media/tours/<slug>/hero.<ext>`,
 *   creates a `media` row (alt from title + location), sets tours.hero_media_id.
 * - Idempotent: skips tours that already have a hero. Run the tour import first.
 * - `--dry` just reports which hero files exist / are missing.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { regularTours } from "../legacy/v1/data/tours/tour-data";

const dry = process.argv.includes("--dry");
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !secret) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY.");
  process.exit(1);
}

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

type LegacyTour = { slug: string; title: string; location?: string; heroImage?: string };

async function main() {
  const sb = createClient(url!, secret!, { auth: { persistSession: false } });
  const tours = regularTours as unknown as LegacyTour[];
  let uploaded = 0;
  let skipped = 0;
  let missing = 0;

  for (const t of tours) {
    if (!t.heroImage) {
      console.log(`${t.slug.padEnd(28)} — no heroImage`);
      continue;
    }
    const rel = t.heroImage.replace(/^\//, "");
    const filePath = join(process.cwd(), "public", rel);
    const exists = existsSync(filePath);
    console.log(`${t.slug.padEnd(28)} ${exists ? "✓" : "✗ MISSING"}  ${t.heroImage}`);
    if (!exists) {
      missing += 1;
      continue;
    }
    if (dry) continue;

    const { data: tour, error: tErr } = await sb
      .from("tours")
      .select("id, hero_media_id")
      .eq("slug", t.slug)
      .maybeSingle();
    if (tErr) throw tErr;
    if (!tour) {
      console.log(`   ↳ not in DB — run import-legacy-tours.ts first`);
      continue;
    }
    if (tour.hero_media_id) {
      console.log(`   ↳ already has a hero — skipped`);
      skipped += 1;
      continue;
    }

    const ext = extname(filePath).toLowerCase();
    const contentType = MIME[ext] ?? "application/octet-stream";
    const buffer = readFileSync(filePath);
    const storagePath = `tours/${t.slug}/hero${ext}`;

    const { error: upErr } = await sb.storage
      .from("media")
      .upload(storagePath, buffer, { contentType, upsert: true });
    if (upErr) {
      console.log(`   ↳ ✗ upload: ${upErr.message}`);
      continue;
    }

    const alt = `${t.title}${t.location ? ` — ${t.location}` : ""}`;
    const { data: media, error: mErr } = await sb
      .from("media")
      .insert({ storage_path: storagePath, alt, kind: "image" })
      .select("id")
      .single();
    if (mErr) {
      console.log(`   ↳ ✗ media row: ${mErr.message}`);
      continue;
    }

    const { error: linkErr } = await sb
      .from("tours")
      .update({ hero_media_id: media.id })
      .eq("id", tour.id);
    if (linkErr) {
      console.log(`   ↳ ✗ link: ${linkErr.message}`);
      continue;
    }
    console.log(`   ↳ uploaded → ${storagePath}`);
    uploaded += 1;
  }

  console.log(
    dry
      ? `\nDry run — ${missing} missing hero file(s).`
      : `\nDone — ${uploaded} uploaded, ${skipped} skipped, ${missing} missing.`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
