/**
 * Festival split-import — the legacy FestivalTours become the new model:
 * FESTIVAL (evergreen) + EVENT (2026 edition) + the tour linked via festival_id.
 * Spec: docs-new/08-blueprint/08 §7 (the split table).
 *
 *   node --env-file=.env.local --import tsx scripts/import-festivals-split.ts [--dry]
 *
 * - Festivals land as DRAFTS (content-ops verifies significance/dates → publish).
 * - Existing tour slugs (hornbill-festival-2026…) keep working — the tour stays
 *   the package page; the festival page is additive.
 * - Creates the Nagaland region (draft) if missing — Hornbill needs its state.
 * - Idempotent by slug / (festival, year).
 */
import { createClient } from "@supabase/supabase-js";
import {
  hornbillFestival,
  orangeFestival,
  ziroFestival2026,
} from "../legacy/v1/data/tours/festival-data";
import { ziroFestivalFAQData } from "../legacy/v1/data/faqs/ziro-festival-faq-data";

const dry = process.argv.includes("--dry");
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !secret) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY.");
  process.exit(1);
}
const sb = createClient(url, secret, { auth: { persistSession: false } });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LegacyFestival = any;

/** The split map: evergreen identity per legacy festival tour. */
const SPLITS: {
  legacy: LegacyFestival;
  festivalSlug: string;
  name: string;
  month: number;
  durationDays: number;
  ruleNote: string;
  state: "arunachal-pradesh" | "nagaland";
  placeSlug?: string;
  faqs?: { question: string; answer: string }[];
}[] = [
  {
    legacy: hornbillFestival,
    festivalSlug: "hornbill",
    name: "Hornbill Festival",
    month: 12,
    durationDays: 10,
    ruleNote: "Every year, Dec 1–10, Kisama Heritage Village",
    state: "nagaland",
  },
  {
    legacy: ziroFestival2026,
    festivalSlug: "ziro-festival-of-music",
    name: "Ziro Festival of Music",
    month: 9,
    durationDays: 4,
    ruleNote: "Every year, late September, Ziro valley",
    state: "arunachal-pradesh",
    placeSlug: "ziro",
    faqs: ziroFestivalFAQData.faqs.map((f) => ({
      question: String(f.question),
      answer: String(f.answer),
    })),
  },
  {
    legacy: orangeFestival,
    festivalSlug: "orange-festival-dambuk",
    name: "Orange Festival of Adventure & Music",
    month: 12,
    durationDays: 3,
    ruleNote: "Every year, mid-December, Dambuk",
    state: "arunachal-pradesh",
  },
];

async function ensureNagaland(): Promise<string | null> {
  const { data } = await sb.from("regions").select("id").eq("slug", "nagaland").maybeSingle();
  if (data) return data.id;
  if (dry) {
    console.log("[region] would create nagaland (draft state)");
    return null;
  }
  const { data: created, error } = await sb
    .from("regions")
    .insert({
      slug: "nagaland",
      name: "Nagaland",
      level: "state",
      body: { intro: "The land of festivals — home of the Naga tribes and the Hornbill Festival." },
      status: "draft",
    })
    .select("id")
    .single();
  if (error) throw error;
  console.log("[region] created nagaland (draft state)");
  return created.id;
}

async function main() {
  const { data: regions } = await sb.from("regions").select("id, slug");
  const regionId = new Map((regions ?? []).map((r) => [r.slug, r.id]));
  if (!regionId.has("nagaland")) {
    const id = await ensureNagaland();
    if (id) regionId.set("nagaland", id);
  }
  const { data: places } = await sb.from("places").select("id, slug");
  const placeId = new Map((places ?? []).map((p) => [p.slug, p.id]));

  for (const s of SPLITS) {
    const f = s.legacy;
    // ── the evergreen festival ──
    let { data: festival } = await sb
      .from("festivals")
      .select("id")
      .eq("slug", s.festivalSlug)
      .maybeSingle();

    if (!festival) {
      const row = {
        slug: s.festivalSlug,
        name: s.name,
        region_id: regionId.get(s.state) ?? null,
        place_id: s.placeSlug ? (placeId.get(s.placeSlug) ?? null) : null,
        recurrence: { month: s.month, duration_days: s.durationDays, rule_note: s.ruleNote },
        body: {
          significance: String(f.overview ?? "").trim(),
          cultural_highlights: f.culturalHighlights ?? [],
          what_to_expect: (f.highlights ?? []).map((h: string) => ({ title: h })),
          attend: {
            where: f.location ?? null,
            scarcity_note: f.importantNote ?? null,
          },
          ...(s.faqs?.length ? { faqs: s.faqs } : {}),
          legacy_source: f.slug,
        },
        seo: {
          title: `${s.name} ${new Date(f.eventDates.start).getUTCFullYear()} — dates, packages & guide`,
          description: String(f.overview ?? "").slice(0, 155),
        },
        status: "draft" as const,
      };
      console.log(`\n[festival] ${s.festivalSlug} — DRAFT (${s.state}${s.placeSlug ? ` · ${s.placeSlug}` : ""})`);
      if (!dry) {
        const { data: created, error } = await sb
          .from("festivals")
          .insert(row)
          .select("id")
          .single();
        if (error) throw error;
        festival = created;
      }
    } else {
      console.log(`\n[festival] ${s.festivalSlug} — exists, skipped`);
    }

    // ── the dated edition ──
    if (festival && f.eventDates?.start) {
      const year = new Date(f.eventDates.start).getUTCFullYear();
      const { data: existingEvent } = await sb
        .from("events")
        .select("id")
        .eq("festival_id", festival.id)
        .eq("year", year)
        .maybeSingle();
      if (!existingEvent) {
        console.log(`   [event] ${s.name} ${year}: ${f.eventDates.start} → ${f.eventDates.end}`);
        if (!dry) {
          const { error } = await sb.from("events").insert({
            kind: "festival_edition",
            festival_id: festival.id,
            label: `${s.name} ${year}`,
            starts_on: f.eventDates.start,
            ends_on: f.eventDates.end,
            status: "open",
          });
          if (error) throw error;
        }
      } else {
        console.log(`   [event] ${year} edition exists, skipped`);
      }
    }

    // ── link the package tour ──
    if (festival) {
      const { data: tour } = await sb.from("tours").select("id, festival_id").eq("slug", f.slug).maybeSingle();
      if (tour && !tour.festival_id) {
        console.log(`   [link] tours/${f.slug} → festivals/${s.festivalSlug}`);
        if (!dry) {
          const { error } = await sb.from("tours").update({ festival_id: festival.id }).eq("id", tour.id);
          if (error) throw error;
        }
      } else {
        console.log(`   [link] ${tour ? "already linked" : `tour ${f.slug} not found`}`);
      }
    }
  }

  console.log(dry ? "\nDRY RUN — nothing written." : "\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
