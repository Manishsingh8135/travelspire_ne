/**
 * Rich itinerary + pricing import — kills the v1 regression for good.
 *
 *   node --env-file=.env.local --import tsx scripts/import-rich-itineraries.ts [--dry]
 *
 * Sources, in trust order (docs-new/08-blueprint/03 + 05 §6):
 *  1. CANONICAL WhatsApp itineraries (scripts/data/whatsapp/<slug>.txt) — parsed
 *     with the tested parser; writes tour_days + the real pricing matrix.
 *     `menchukha-dong-anini-expedition` doesn't exist yet → created as a draft.
 *  2. Legacy v1 data for the remaining tours — per-day activities[] become
 *     structured sightseeing[] (NEVER flattened), route stops+points → tours.route.
 *  3. DB body.variants on the 3 festival tours → unified `variant` pricing modes.
 *
 * Idempotent: tour_days are replaced per tour (source-owned); columns/body merge.
 * body.itinerary is left untouched (public dossier still reads it until rebuilt).
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { regularTours } from "../legacy/v1/data/tours/tour-data";
import {
  parseWhatsAppItinerary,
  parseRouteFromTitle,
  parseOvernight,
} from "../src/lib/tours/parse-whatsapp";
import { ItinerarySchema, type ItineraryDay } from "../src/lib/tours/itinerary";
import { PricingSchema, fromPrice, type Pricing, type PricingMode } from "../src/lib/tours/pricing";

const dry = process.argv.includes("--dry");
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !secret) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY.");
  process.exit(1);
}
const sb = createClient(url, secret, { auth: { persistSession: false } });

const WHATSAPP_DIR = join(import.meta.dirname, "data", "whatsapp");
/** slug → canonical WhatsApp source file. The founder's texts are the truth. */
const WHATSAPP_SOURCES: Record<string, string> = {
  "anini-expedition": "anini-expedition.txt",
  "menchukha-dong-anini-expedition": "menchukha-dong-anini-expedition.txt",
};

const KNOWN_PERMITS: [RegExp, string][] = [
  [/inner\s*line|(^|\W)ilp(\W|$)/i, "ILP"],
  [/forest\s*pass/i, "Forest pass"],
  [/lamang\s*pass\s*permit/i, "Lamang pass permit"],
  [/pomo\s*permit/i, "Pomo permit"],
];
const permitTags = (inclusions: string[]): string[] => {
  const tags = new Set<string>();
  for (const inc of inclusions)
    for (const [re, tag] of KNOWN_PERMITS) if (re.test(inc)) tags.add(tag);
  return [...tags];
};

type LegacyDay = { title?: string; description?: string; activities?: string[] };
type LegacyTour = {
  slug: string;
  duration?: string;
  altitude?: number;
  itinerary?: LegacyDay[];
  route?: {
    points?: [number, number][];
    stops?: { name: string; location: [number, number]; description?: string }[];
  };
};

/** Legacy day → ItineraryDay: activities become sightseeing tokens, never prose. */
function legacyDays(days: LegacyDay[]): ItineraryDay[] {
  return days.map((d, i) => {
    const title = (d.title ?? "").trim();
    const day: ItineraryDay = {
      dayNo: i + 1,
      title,
      route: parseRouteFromTitle(title),
      summary: d.description?.trim() || null,
      sightseeing: [],
      tags: [],
    };
    for (const raw of d.activities ?? []) {
      const act = raw.trim();
      if (!act) continue;
      const on = parseOvernight(act);
      if (on) day.overnight = on;
      else day.sightseeing.push({ name: act.replace(/[.。]+$/, "") });
    }
    if (!day.overnight && d.description) {
      const on = parseOvernight(d.description);
      if (on) day.overnight = on;
    }
    if (/trek/i.test(title)) day.tags.push("trek");
    return day;
  });
}

const legacyNights = (duration?: string): number | null => {
  const m = /(\d+)\s*Nights?/i.exec(duration ?? "");
  return m ? Number(m[1]) : null;
};

async function replaceTourDays(tourId: string, days: ItineraryDay[]) {
  const valid = ItinerarySchema.parse(days);
  if (dry) return;
  const del = await sb.from("tour_days").delete().eq("tour_id", tourId);
  if (del.error) throw del.error;
  const ins = await sb.from("tour_days").insert(
    valid.map((d) => ({
      tour_id: tourId,
      day_no: d.dayNo,
      title: d.title || null,
      body: d,
      place_ids: [],
    })),
  );
  if (ins.error) throw ins.error;
}

async function main() {
  const { data: dbTours, error } = await sb
    .from("tours")
    .select("id, slug, body, type, price_inr, nights, duration_days");
  if (error) throw error;
  const bySlug = new Map(dbTours!.map((t) => [t.slug, t]));
  const legacyBySlug = new Map(
    (regularTours as unknown as LegacyTour[]).map((t) => [t.slug, t]),
  );
  const { data: regions } = await sb.from("regions").select("id, name, level");
  const arunachal = regions!.find((r) => /arunachal/i.test(r.name) && r.level === "state");

  // ── 1. Canonical WhatsApp tours ──────────────────────────────────────────
  for (const [slug, file] of Object.entries(WHATSAPP_SOURCES)) {
    const parsed = parseWhatsAppItinerary(readFileSync(join(WHATSAPP_DIR, file), "utf8"));
    const pricing = PricingSchema.parse(parsed.pricing ?? { modes: [] });
    const from = fromPrice(pricing);
    const maxGroup = Math.max(
      0,
      ...pricing.modes.flatMap((m) => (m.mode === "group" ? m.tiers.map((t) => t.groupSize) : [])),
    );
    const existing = bySlug.get(slug);

    console.log(
      `\n[whatsapp] ${slug} — ${parsed.days.length} days · from ₹${from} · ` +
        `${parsed.inclusions.length} incl / ${parsed.exclusions.length} excl / ${parsed.facilities.length} fac · ` +
        `unparsed ${parsed.unparsed.length}`,
    );
    for (const u of parsed.unparsed) console.log(`   [review] ${u}`);

    const bodyPatch = (base: Record<string, unknown>) => ({
      ...base,
      inclusions: parsed.inclusions.length ? parsed.inclusions : base.inclusions,
      exclusions: parsed.exclusions.length ? parsed.exclusions : base.exclusions,
      ...(parsed.facilities.length ? { facilities: parsed.facilities } : {}),
      ...(permitTags(parsed.inclusions).length
        ? { permit_tags: permitTags(parsed.inclusions) }
        : {}),
      canonical_source: `whatsapp/${file}`,
    });

    if (existing) {
      if (!dry) {
        const { error: upErr } = await sb
          .from("tours")
          .update({
            pricing,
            price_inr: from ?? existing.price_inr,
            nights: parsed.nights ?? existing.nights,
            duration_days: parsed.days.length || existing.duration_days,
            ...(maxGroup > 0 ? { max_group_size: maxGroup } : {}),
            body: bodyPatch((existing.body ?? {}) as Record<string, unknown>),
          })
          .eq("id", existing.id);
        if (upErr) throw upErr;
        await replaceTourDays(existing.id, parsed.days);
      }
      console.log(`   ✓ updated existing tour + ${parsed.days.length} tour_days`);
    } else {
      if (!dry) {
        const { data: created, error: cErr } = await sb
          .from("tours")
          .insert({
            slug,
            title: "Menchukha + Dong + Anini",
            subtitle: "Three valleys, India’s first sunrise, one road",
            type: "adventure",
            format: "expedition",
            difficulty: "moderate",
            duration_days: parsed.days.length,
            nights: parsed.nights,
            price_inr: from,
            best_time: "Nov–Mar",
            region_id: arunachal?.id ?? null,
            ...(maxGroup > 0 ? { max_group_size: maxGroup } : {}),
            pricing,
            body: bodyPatch({}),
            status: "draft",
          })
          .select("id")
          .single();
        if (cErr) throw cErr;
        await replaceTourDays(created.id, parsed.days);
      }
      console.log(`   ✓ created as DRAFT + ${parsed.days.length} tour_days`);
    }
  }

  // ── 2. Legacy days + route for the remaining regular tours ──────────────
  for (const [slug, legacy] of legacyBySlug) {
    const row = bySlug.get(slug);
    if (!row) {
      console.log(`\n[legacy] ${slug} — not in DB, skipped`);
      continue;
    }
    const canonical = slug in WHATSAPP_SOURCES; // WhatsApp already wrote days/nights/pricing
    const patch: Record<string, unknown> = {};
    const nights = legacyNights(legacy.duration);
    if (nights != null && !canonical) patch.nights = nights;
    if (legacy.altitude) patch.altitude_max_m = legacy.altitude;
    const bodyMax = (row.body as Record<string, unknown> | null)?.maxGroupSize;
    if (typeof bodyMax === "number" && !canonical) patch.max_group_size = bodyMax;
    if (legacy.route?.stops?.length || legacy.route?.points?.length) {
      patch.route = {
        points: legacy.route.points ?? [],
        stops: (legacy.route.stops ?? []).map((s) => ({
          name: s.name,
          lat: s.location[0],
          lng: s.location[1],
          note: s.description ?? null,
        })),
      };
    }

    const skipDays = canonical;
    const days = skipDays ? [] : legacyDays(legacy.itinerary ?? []);
    console.log(
      `\n[legacy] ${slug} — ${skipDays ? "days: canonical wins" : `${days.length} days`}` +
        ` · route stops ${legacy.route?.stops?.length ?? 0} · nights ${patch.nights ?? "—"}`,
    );
    if (!dry) {
      if (Object.keys(patch).length) {
        const { error: upErr } = await sb.from("tours").update(patch).eq("id", row.id);
        if (upErr) throw upErr;
      }
      if (!skipDays && days.length) await replaceTourDays(row.id, days);
    }
    if (!skipDays && days.length) {
      const withOvernight = days.filter((d) => d.overnight).length;
      const sights = days.reduce((n, d) => n + d.sightseeing.length, 0);
      console.log(`   ✓ ${days.length} tour_days · ${sights} sightseeing tokens · ${withOvernight} overnights`);
    }
  }

  // ── 3. Festival tours: body.variants → unified variant pricing modes ────
  for (const t of dbTours!) {
    const variants = (t.body as Record<string, unknown> | null)?.variants as
      | { name?: string; price?: number; days?: number; nights?: number; note?: string; inclusions?: string[] }[]
      | undefined;
    if (!Array.isArray(variants) || !variants.length) continue;
    const modes: PricingMode[] = variants
      .filter((v) => typeof v.price === "number" && v.name)
      .map((v) => ({
        mode: "variant" as const,
        label: v.name!,
        pricePax: v.price!,
        nights: v.nights ?? null,
        days: v.days ?? null,
        description: v.note ?? null,
        inclusions: v.inclusions ?? [],
      }));
    if (!modes.length) continue;
    const pricing: Pricing = PricingSchema.parse({ currency: "INR", per: "pax", modes });
    console.log(`\n[variants] ${t.slug} — ${modes.length} tiers · from ₹${fromPrice(pricing)}`);
    if (!dry) {
      const { error: upErr } = await sb
        .from("tours")
        .update({ pricing, price_inr: fromPrice(pricing) ?? t.price_inr })
        .eq("id", t.id);
      if (upErr) throw upErr;
    }
    console.log(`   ✓ pricing matrix written`);
  }

  console.log(dry ? "\nDRY RUN — nothing written." : "\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
