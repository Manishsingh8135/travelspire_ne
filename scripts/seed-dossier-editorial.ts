/**
 * Dossier editorial seed — the authored layer the Trip Dossier rebuild renders
 * (docs-new/08-blueprint/05 §3.5/§3.6) plus small verified data fixes:
 *
 *   1. body.whoFor / body.notFor — twin FieldNotes, drafted strictly from each
 *      tour's real facts (difficulty, drive hours, stay types, altitude).
 *      Founder-editable in admin later; this script OWNS the two keys.
 *   2. body.arrange — the "what we arrange" moat-panel ledger, derived from the
 *      tour's actual inclusions + permit tags. Script-owned, overwritten each run.
 *   3. body.permit_tags — backfilled only where inclusions/notes mention a
 *      permit (string-detected, logged; never invented).
 *   4. tours.altitude_max_m: tawang 13700 → 4170 (Sela Pass was stored in FEET).
 *   5. body.gallery — path case fixed against the real files in public/ (macOS
 *      is case-insensitive; Vercel/Linux is not — mismatches 404 in prod).
 *
 *   node --env-file=.env.local --import tsx scripts/seed-dossier-editorial.ts
 *
 * Idempotent: re-running writes the same values. Logs every change it makes.
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

/* ── 1. Who this is for / not for — honest, fact-traceable, founder-editable ── */

const EDITORIAL: Record<string, { whoFor: string[]; notFor: string[] }> = {
  "tawang-expedition": {
    whoFor: [
      "You want the big Himalayan set pieces — Sela Pass, Tawang Monastery, the Bum La road — in one compact week",
      "Six-to-eight-hour mountain drives between halts feel like part of the journey",
      "Cold mornings at altitude read as adventure, not hardship",
    ],
    notFor: [
      "You need every night in a proper hotel — some halts are simple homestays",
      "Winding high-altitude roads make you carsick fast",
      "You're after nightlife; evenings here are bonfires and early starts",
    ],
  },
  "dong-valley-expedition": {
    whoFor: [
      "You'll happily wake at 2 AM to watch India's first sunrise from Dong",
      "Road journeys where the destination is a viewpoint, not a resort, are your kind of trip",
      "Small-group travel — max 10 — suits you",
    ],
    notFor: [
      "You want luxury stays; nights here are homestays and guesthouses",
      "Long drives on rough patches wear you down",
      "You're expecting shops and cafés — Dong has neither",
    ],
  },
  "anini-expedition": {
    whoFor: [
      "You want the quietest corner of Arunachal — Dibang Valley, clouds below the road",
      "A guided day-trek to the Pomo meadows sounds like a highlight, not a chore",
      "Places with almost no other tourists are exactly the point",
    ],
    notFor: [
      "You need mobile signal every day — Anini connectivity is patchy at best",
      "You'd rather not walk; the Pomo day involves real trekking",
      "A hot shower every night is non-negotiable",
    ],
  },
  "dambuk-anini-ofam": {
    whoFor: [
      "You want the Orange Festival's music with a real road expedition bolted on",
      "December mountain cold is fine by you",
      "Festival crowds one day, empty valleys the next — that contrast excites you",
    ],
    notFor: [
      "You only want the festival — the festival package alone is the better buy",
      "Long drive days straight after festival nights sound exhausting",
      "You need fixed comforts; this leg moves fast",
    ],
  },
  "dambuk-golden-pagoda-ofam": {
    whoFor: [
      "You want an easy December route — festival energy, the Golden Pagoda, no hard driving",
      "It's your first trip into Arunachal and you'd rather start gentle",
      "Pairing OFAM with something cultural is the plan",
    ],
    notFor: [
      "You're chasing high passes and snow — this route stays low",
      "You want long treks; this is a road-and-culture trip",
      "Crowd-free travel is the point for you — festival season is lively",
    ],
  },
  "dambuk-dong-valley-ofam": {
    whoFor: [
      "Festival by night, India's first sunrise by dawn — you want both in one December run",
      "Early starts and long drives don't scare you",
      "You like routes almost nobody else takes",
    ],
    notFor: [
      "You need consistent sleep — the Dong sunrise means a 2 AM start",
      "You'd rather linger at OFAM the whole time",
      "Rough winter roads put you off",
    ],
  },
  "pomo-trek-expedition": {
    whoFor: [
      "You want a real trek — the Pomo meadows with a local guide who grew up here",
      "Camping and homestays feel right; comfort is a warm fire",
      "You're reasonably fit for full trekking days",
    ],
    notFor: [
      "Trekking isn't your thing — this trip is built around it",
      "You need vehicle access everywhere",
      "You want a packed sightseeing list; this is about walking one place well",
    ],
  },
  "mechuka-expedition": {
    whoFor: [
      "Mechuka is the poster valley — hanging bridges, gompas, a winding river — and you want time inside it, not a drive-by",
      "Two long travel days each way feel like a fair price for where they end",
      "Homestay evenings with local families are the point",
    ],
    notFor: [
      "You measure trips in sights per day — this one trades count for depth",
      "Twelve-plus hours of cumulative driving in and out sounds unbearable",
      "You need reliable connectivity throughout",
    ],
  },
  "menchukha-dong-anini-expedition": {
    whoFor: [
      "You want the full sweep — Mechuka, Dong's first sunrise, Anini's silence — in one long field expedition",
      "Thirteen days on the road with a group of six excites rather than scares you",
      "You've travelled the Northeast before, or you're certain you're built for this",
    ],
    notFor: [
      "This is the longest, hardest route in the catalogue — not a first taste of the region",
      "You can't be away this long",
      "You need daily comforts; this trip strings remote halts for two weeks",
    ],
  },
  "hornbill-festival-2026": {
    whoFor: [
      "You want Nagaland's biggest stage — the tribes of the state at Kisama in one December week",
      "Camping walking-distance from the venue beats commuting to it",
      "You'd rather pick a sorted package — camp to premium — than assemble the trip yourself",
    ],
    notFor: [
      "Crowds put you off — Hornbill is the region at its busiest",
      "You want a road expedition; this is a festival basecamp",
      "December cold in a tent isn't your idea of fun (look at the premium tiers instead)",
    ],
  },
  "orange-festival-2026": {
    whoFor: [
      "Music, oranges and adventure sports in one riverside December weekend",
      "Tents and cottages by the venue suit you",
      "You might bolt a Dibang Valley run onto the end",
    ],
    notFor: [
      "You want quiet — OFAM is a festival, not a retreat",
      "You need hotel comfort; this is a campsite weekend",
      "Festival logistics aren't your thing — day-tripping OFAM barely works",
    ],
  },
  "ziro-festival-2026": {
    whoFor: [
      "Four days of independent music in the Apatani valley — India's best-set festival, and you want in",
      "Camping with the crowd is part of the experience",
      "You want the package sorted — tent, breakfast, campsite — rather than DIY",
    ],
    notFor: [
      "You want Ziro's silence — festival week is the loudest the valley gets",
      "Shared camp facilities won't work for you",
      "You're mainly here to trek; this trip is the festival",
    ],
  },
};

/* ── 2. Arrange-ledger derivation (from REAL inclusions only) ────────────── */

type ArrangeRow = { icon: "permit" | "vehicle" | "guide" | "stay"; label: string; status: string };

function deriveArrange(inclusions: string[], permitTags: string[]): ArrangeRow[] {
  const all = inclusions.join(" · ").toLowerCase();
  const rows: ArrangeRow[] = [];
  if (permitTags.length > 0 || /\bilp\b|inner line permit|permit/.test(all)) {
    const label =
      permitTags.length > 0
        ? permitTags.map((t) => t.toUpperCase()).join(" · ")
        : "INNER LINE PERMIT";
    rows.push({ icon: "permit", label, status: "HANDLED" });
  }
  if (/transport|vehicle|sumo|suv|tempo|cab|4x4|pickup|drop/.test(all)) {
    rows.push({ icon: "vehicle", label: "PRIVATE VEHICLE + DRIVER", status: "INCLUDED" });
  }
  if (/guide/.test(all)) {
    rows.push({ icon: "guide", label: "LOCAL GUIDE THROUGHOUT", status: "INCLUDED" });
  }
  if (/accommodation|homestay|hotel|camp|stay|tent|cottage|dome/.test(all)) {
    rows.push({ icon: "stay", label: "EVERY NIGHT BOOKED", status: "INCLUDED" });
  }
  return rows;
}

/* ── 5. Gallery case-index of public/ (case-SENSITIVE ground truth) ──────── */

function walk(dir: string, base: string, out: Map<string, string>) {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    const rel = `${base}/${entry}`;
    if (statSync(abs).isDirectory()) walk(abs, rel, out);
    else out.set(rel.toLowerCase(), rel);
  }
}

async function main() {
  const sb = createClient(url!, secret!, { auth: { persistSession: false } });

  const actualByLower = new Map<string, string>();
  walk(join(process.cwd(), "public", "images"), "/images", actualByLower);

  /* 4. Tawang altitude: feet → metres (Sela Pass 13,700 ft = 4,170 m). */
  const { data: tawang } = await sb
    .from("tours")
    .select("id, altitude_max_m")
    .eq("slug", "tawang-expedition")
    .maybeSingle();
  if (tawang?.altitude_max_m === 13700) {
    const { error } = await sb.from("tours").update({ altitude_max_m: 4170 }).eq("id", tawang.id);
    if (error) throw error;
    console.log("tawang-expedition            ✓ altitude_max_m 13700 ft → 4170 m");
  }

  const { data: tours, error } = await sb
    .from("tours")
    .select("id, slug, body")
    .is("deleted_at", null);
  if (error) throw error;

  let updated = 0;
  for (const tour of tours ?? []) {
    const body = (tour.body ?? {}) as Record<string, unknown>;
    const notes: string[] = [];

    /* 1. whoFor / notFor (script-owned keys). */
    const editorial = EDITORIAL[tour.slug];
    if (editorial) {
      body.whoFor = editorial.whoFor;
      body.notFor = editorial.notFor;
      notes.push("whoFor/notFor");
    }

    /* 3. permit_tags backfill — only when the tour's own text mentions permits. */
    const inclusions = Array.isArray(body.inclusions)
      ? (body.inclusions as unknown[]).filter((v): v is string => typeof v === "string")
      : [];
    let permitTags = Array.isArray(body.permit_tags)
      ? (body.permit_tags as unknown[]).filter((v): v is string => typeof v === "string")
      : [];
    if (permitTags.length === 0) {
      const haystack = [
        ...inclusions,
        typeof body.importantNote === "string" ? body.importantNote : "",
        typeof body.overview === "string" ? body.overview : "",
      ]
        .join(" · ")
        .toLowerCase();
      const detected: string[] = [];
      if (/\bilp\b|inner line permit/.test(haystack)) detected.push("ILP");
      if (/forest pass/.test(haystack)) detected.push("Forest pass");
      if (detected.length > 0) {
        permitTags = detected;
        body.permit_tags = detected;
        notes.push(`permit_tags [${detected.join(", ")}]`);
      }
    }

    /* 2. arrange ledger (script-owned key; derived from real inclusions). */
    const arrange = deriveArrange(inclusions, permitTags);
    if (arrange.length > 0) {
      body.arrange = arrange;
      notes.push(`arrange ×${arrange.length} (${arrange.map((r) => r.icon).join(",")})`);
    }

    /* 5. Gallery path case fixes. */
    if (Array.isArray(body.gallery)) {
      let fixed = 0;
      const missing: string[] = [];
      body.gallery = (body.gallery as unknown[]).map((raw) => {
        if (typeof raw !== "string") return raw;
        const actual = actualByLower.get(raw.toLowerCase());
        if (!actual) {
          missing.push(raw);
          return raw;
        }
        if (actual !== raw) fixed += 1;
        return actual;
      });
      if (fixed > 0) notes.push(`gallery case ×${fixed}`);
      for (const m of missing) console.log(`${tour.slug.padEnd(32)} ⚠ gallery MISSING ${m}`);
    }

    const { error: upErr } = await sb.from("tours").update({ body }).eq("id", tour.id);
    if (upErr) {
      console.log(`${tour.slug.padEnd(32)} ✗ ${upErr.message}`);
      continue;
    }
    console.log(`${tour.slug.padEnd(32)} ✓ ${notes.join(" · ") || "(no changes)"}`);
    updated += 1;
  }
  console.log(`\nDone — ${updated} tours seeded.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
