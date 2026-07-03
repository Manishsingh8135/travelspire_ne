/**
 * Import the 8 legacy tours (with itineraries) into the `tours` table as DRAFTS.
 *
 *   node --env-file=.env.local --import tsx scripts/import-legacy-tours.ts [--dry]
 *
 * - Idempotent by slug (skips tours that already exist — safe to re-run).
 * - Imports as `draft` so you review + bulk-publish from /admin/tours.
 * - Itinerary activities are folded into each day's description (bulleted) so
 *   nothing is lost and the admin itinerary editor round-trips cleanly.
 * - Images are NOT handled here — add hero images via the admin uploader.
 */
import { createClient } from "@supabase/supabase-js";
import { regularTours } from "../legacy/v1/data/tours/tour-data";

const dry = process.argv.includes("--dry");
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !secret) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY.");
  process.exit(1);
}

const TOUR_TYPES = ["adventure", "cultural", "nature", "pilgrimage", "festival", "trek"];
const DIFFICULTIES = ["easy", "moderate", "challenging"];

type LegacyDay = { title?: string; description?: string; activities?: string[] };
type LegacyTour = {
  slug: string;
  title: string;
  subtitle?: string;
  type?: string;
  difficulty?: string;
  duration?: string;
  price?: number;
  bestTimeToVisit?: string;
  location?: string;
  overview?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: LegacyDay[];
};

const tourType = (s?: string) => {
  const t = (s ?? "").toLowerCase();
  return TOUR_TYPES.includes(t) ? t : "adventure";
};
const difficulty = (s?: string) => {
  const d = (s ?? "").toLowerCase();
  return DIFFICULTIES.includes(d) ? d : "moderate";
};
const durationDays = (s?: string) => {
  const m = (s ?? "").match(/(\d+)\s*Days?/i);
  return m ? Number(m[1]) : null;
};
const strList = (v?: string[]) =>
  Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : [];

function itineraryBody(days?: LegacyDay[]) {
  return (days ?? [])
    .map((day) => {
      const acts = strList(day.activities);
      const description = [day.description?.trim(), ...acts.map((a) => `• ${a}`)]
        .filter(Boolean)
        .join("\n");
      return { title: (day.title ?? "").trim(), description };
    })
    .filter((d) => d.title || d.description);
}

async function main() {
  const sb = createClient(url!, secret!, { auth: { persistSession: false } });

  const { data: regions, error: rErr } = await sb.from("regions").select("id, name");
  if (rErr) throw rErr;
  const arunachal = (regions ?? []).find((r) => /arunachal/i.test(r.name));
  console.log(`Region match: ${arunachal ? arunachal.name : "none (region_id left null)"}\n`);

  const tours = regularTours as unknown as LegacyTour[];
  let inserted = 0;
  let skipped = 0;

  for (const t of tours) {
    const itinerary = itineraryBody(t.itinerary);
    const highlights = strList(t.highlights);
    const inclusions = strList(t.inclusions);
    const exclusions = strList(t.exclusions);
    const body = {
      ...(t.overview ? { overview: t.overview.trim() } : {}),
      ...(highlights.length ? { highlights } : {}),
      ...(inclusions.length ? { inclusions } : {}),
      ...(exclusions.length ? { exclusions } : {}),
      ...(itinerary.length ? { itinerary } : {}),
    };
    const row = {
      slug: t.slug,
      title: t.title,
      subtitle: t.subtitle ?? null,
      type: tourType(t.type),
      difficulty: difficulty(t.difficulty),
      duration_days: durationDays(t.duration),
      price_inr: typeof t.price === "number" ? t.price : null,
      best_time: t.bestTimeToVisit ?? null,
      region_id: arunachal?.id ?? null,
      body,
      status: "draft" as const,
    };

    console.log(
      `${row.slug.padEnd(28)} ${row.type}/${row.difficulty}  ` +
        `${row.duration_days ?? "?"}d  ₹${row.price_inr ?? "?"}  ` +
        `${itinerary.length} days  ${highlights.length} highlights`,
    );

    if (dry) continue;

    const { data: existing } = await sb
      .from("tours")
      .select("id")
      .eq("slug", row.slug)
      .maybeSingle();
    if (existing) {
      console.log(`   ↳ already exists — skipped`);
      skipped += 1;
      continue;
    }
    const { error } = await sb.from("tours").insert(row);
    if (error) {
      console.log(`   ↳ ✗ ${error.message}`);
    } else {
      inserted += 1;
    }
  }

  console.log(
    dry
      ? `\nDry run — ${tours.length} tours transformed, nothing written.`
      : `\nDone — ${inserted} inserted, ${skipped} skipped (already present).`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
