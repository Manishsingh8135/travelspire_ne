/**
 * Enrich the 8 imported tours with the legacy fields the first import skipped:
 * gallery, thingsToCarry, importantNote, maxGroupSize, route stops, tags —
 * plus the 3 real testimonials mapped to their tours. Merges into `body`
 * (never overwrites existing keys it doesn't own).
 *
 *   node --env-file=.env.local --import tsx scripts/enrich-legacy-tours.ts
 *
 * Idempotent: re-running writes the same values.
 */
import { createClient } from "@supabase/supabase-js";
import { regularTours } from "../legacy/v1/data/tours/tour-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !secret) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY.");
  process.exit(1);
}

// Real testimonials from legacy, mapped to tour slugs by destination.
const TESTIMONIALS: Record<
  string,
  { quote: string; name: string; location: string; date: string }[]
> = {
  "tawang-expedition": [
    {
      quote:
        "Watching the morning prayers at Tawang Monastery, with hundreds of butter lamps flickering — it felt like time stood still. The evening with a local family, sharing butter tea, made −10°C feel cozy.",
      name: "Arjun Nair",
      location: "Bangalore",
      date: "January 2024",
    },
  ],
  "dong-valley-expedition": [
    {
      quote:
        "Standing at Dong at 5 a.m., first light touching India before anywhere else — worth every kilometre of the drive. Our guide knew every bend and every story.",
      name: "Meera Desai",
      location: "Mumbai",
      date: "December 2023",
    },
  ],
  "anini-expedition": [
    {
      quote:
        "Anini is the quietest place I've ever been. Mishmi hospitality, clouds below the road, and not one moment that felt packaged.",
      name: "Kabir Mathur",
      location: "Delhi",
      date: "November 2023",
    },
  ],
};

type LegacyTour = {
  slug: string;
  gallery?: string[];
  thingsToCarry?: string[];
  importantNote?: string;
  maxGroupSize?: number;
  tags?: string[];
  route?: {
    stops?: { name: string; location: [number, number]; description?: string }[];
  };
};

async function main() {
  const sb = createClient(url!, secret!, { auth: { persistSession: false } });
  let updated = 0;

  for (const t of regularTours as unknown as LegacyTour[]) {
    const { data: row, error } = await sb
      .from("tours")
      .select("id, body")
      .eq("slug", t.slug)
      .maybeSingle();
    if (error) throw error;
    if (!row) {
      console.log(`${t.slug.padEnd(28)} — not in DB, skipped`);
      continue;
    }

    const body = (row.body ?? {}) as Record<string, unknown>;
    const enriched = {
      ...body,
      ...(t.gallery?.length ? { gallery: t.gallery } : {}),
      ...(t.thingsToCarry?.length ? { thingsToCarry: t.thingsToCarry } : {}),
      ...(t.importantNote ? { importantNote: t.importantNote.trim() } : {}),
      ...(t.maxGroupSize ? { maxGroupSize: t.maxGroupSize } : {}),
      ...(t.tags?.length ? { tags: t.tags } : {}),
      ...(t.route?.stops?.length
        ? {
            routeStops: t.route.stops.map((s) => ({
              name: s.name,
              lat: s.location[0],
              lng: s.location[1],
              note: s.description ?? null,
            })),
          }
        : {}),
      ...(TESTIMONIALS[t.slug] ? { testimonials: TESTIMONIALS[t.slug] } : {}),
    };

    const { error: upErr } = await sb.from("tours").update({ body: enriched }).eq("id", row.id);
    if (upErr) {
      console.log(`${t.slug.padEnd(28)} ✗ ${upErr.message}`);
      continue;
    }
    const keys = Object.keys(enriched).filter((k) => !(k in body));
    console.log(`${t.slug.padEnd(28)} ✓ +${keys.join(", ") || "(refresh)"}`);
    updated += 1;
  }
  console.log(`\nDone — ${updated} tours enriched.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
