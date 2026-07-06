/**
 * Import the 3 legacy FESTIVAL tours (Hornbill, OFAM/Dambuk, Ziro) as tours
 * (type=festival) — variants, dates, galleries and all — plus their hero
 * images to Storage. Fills the festival links across the site until the
 * dedicated /festivals pages land (docs-new/07-pages/06).
 *
 *   node --env-file=.env.local --import tsx scripts/import-legacy-festival-tours.ts
 *
 * Idempotent: skips slugs that exist; hero upload skips tours with a hero.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import {
  hornbillFestival,
  orangeFestival,
  ziroFestival2026,
} from "../legacy/v1/data/tours/festival-data";

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
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatWindow(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const sm = MONTHS[s.getUTCMonth()];
  const em = MONTHS[e.getUTCMonth()];
  const range =
    sm === em ? `${sm} ${s.getUTCDate()}–${e.getUTCDate()}` : `${sm} ${s.getUTCDate()} – ${em} ${e.getUTCDate()}`;
  return `${range}, ${s.getUTCFullYear()}`;
}

function daySpan(start: string, end: string): number {
  return Math.round((Date.parse(end) - Date.parse(start)) / 86_400_000) + 1;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FESTIVALS: any[] = [hornbillFestival, orangeFestival, ziroFestival2026];

async function main() {
  const sb = createClient(url!, secret!, { auth: { persistSession: false } });
  const { data: regions } = await sb.from("regions").select("id, name");
  const regionByName = new Map(
    (regions ?? []).map((r) => [String(r.name).toLowerCase(), r.id as string]),
  );

  for (const f of FESTIVALS) {
    const existing = await sb.from("tours").select("id, hero_media_id").eq("slug", f.slug).maybeSingle();
    let tourId = existing.data?.id as string | undefined;

    if (!tourId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const variants = (f.variants ?? []).map((v: any) => ({
        name: v.name,
        price: v.price,
        days: v.duration?.days ?? null,
        nights: v.duration?.nights ?? null,
        note: v.description ?? null,
        inclusions: v.inclusions ?? [],
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const prices = variants.map((v: any) => v.price).filter((p: unknown) => typeof p === "number");
      const isArunachal = String(f.location ?? "").includes("Arunachal");
      const row = {
        slug: f.slug,
        title: f.title,
        subtitle: f.subtitle ?? null,
        type: "festival",
        difficulty: String(f.difficulty ?? "easy").toLowerCase(),
        region_id: isArunachal ? (regionByName.get("arunachal pradesh") ?? null) : null,
        duration_days: daySpan(f.eventDates.start, f.eventDates.end),
        price_inr: prices.length ? Math.min(...prices) : null,
        best_time: formatWindow(f.eventDates.start, f.eventDates.end),
        body: {
          overview: f.overview ?? null,
          highlights: f.highlights ?? [],
          inclusions: f.baseInclusions ?? [],
          exclusions: f.baseExclusions ?? [],
          thingsToCarry: f.thingsToCarry ?? [],
          importantNote: f.importantNote ?? null,
          gallery: f.gallery ?? [],
          tags: f.tags ?? [],
          variants,
          festivalName: f.festivalName ?? null,
          eventDates: { start: f.eventDates.start, end: f.eventDates.end },
          location: f.location ?? null,
        },
        seo: {},
        status: "draft",
      };
      const { data: inserted, error } = await sb.from("tours").insert(row).select("id").single();
      if (error) {
        console.log(`${f.slug.padEnd(26)} ✗ ${error.message}`);
        continue;
      }
      tourId = inserted.id;
      console.log(`${f.slug.padEnd(26)} ✓ inserted (${variants.length} variants, from ₹${row.price_inr})`);
    } else {
      console.log(`${f.slug.padEnd(26)} — exists`);
    }

    // Hero image
    if (existing.data?.hero_media_id) continue;
    const rel = String(f.heroImage ?? "").replace(/^\//, "");
    const filePath = join(process.cwd(), "public", rel);
    if (!rel || !existsSync(filePath)) {
      console.log(`   ↳ hero missing on disk: ${f.heroImage}`);
      continue;
    }
    const ext = extname(filePath).toLowerCase();
    const storagePath = `tours/${f.slug}/hero${ext}`;
    const { error: upErr } = await sb.storage
      .from("media")
      .upload(storagePath, readFileSync(filePath), {
        contentType: MIME[ext] ?? "application/octet-stream",
        upsert: true,
      });
    if (upErr) {
      console.log(`   ↳ ✗ upload: ${upErr.message}`);
      continue;
    }
    const { data: media, error: mErr } = await sb
      .from("media")
      .insert({ storage_path: storagePath, alt: `${f.title} — ${f.location}`, kind: "image" })
      .select("id")
      .single();
    if (mErr) {
      console.log(`   ↳ ✗ media: ${mErr.message}`);
      continue;
    }
    await sb.from("tours").update({ hero_media_id: media.id }).eq("id", tourId);
    console.log(`   ↳ hero → ${storagePath}`);
  }
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
