/**
 * Seed the first four Place Field Entries (Tawang, Mechuka, Anini, Dong) +
 * the six tribes. Every fact traces to the verified research of 2026-07-14
 * (docs-new/08-blueprint/research/arunachal-facts-2026-07.md + the 16-agent
 * field-entry fleet). Voice: field journal. Unverifiable intel is flagged in
 * body.ground_truth_flags for the founder — never silently asserted.
 *
 *   node --env-file=.env.local --import tsx scripts/seed-field-entries.ts [--dry]
 *
 * Idempotent: tribes/places insert-if-missing by slug; bodies merge (owns its
 * keys). New places (Anini, Dong) land as DRAFTS — entry_no assigns at publish.
 */
import { createClient } from "@supabase/supabase-js";

const dry = process.argv.includes("--dry");
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !secret) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY.");
  process.exit(1);
}
const sb = createClient(url, secret, { auth: { persistSession: false } });

// ── Tribes (drafts — founder reviews the one-line bios, then publishes) ─────
const TRIBES = [
  { slug: "monpa", name: "Monpa", who: "The Buddhist people of Tawang and West Kameng — Gelug monasteries, Losar in the lunar new year, Torgya's masked dances in the Tawang gompa courtyard. Farmers and herders of the high western valleys." },
  { slug: "apatani", name: "Apatani", who: "The valley people of Ziro, famous for wet-rice fields that double as fish ponds — a landscape on UNESCO's tentative list since 2014. Dree, their great agricultural festival, falls on July 5 every year." },
  { slug: "memba", name: "Memba", who: "Buddhist people of the Mechuka valley in Shi-Yomi. Their Losar comes in February, a month ahead of their Buddhist neighbours, and the hilltop gompa of Samten Yongcha keeps their oral history." },
  { slug: "idu-mishmi", name: "Idu Mishmi", who: "The people of the Dibang valleys. Reh, from February 1, invokes the divine mother Nanyi Inyitaya; Athu-Popu, a revered stone near the border passes, is where Idu souls are said to rest on their way onward." },
  { slug: "adi", name: "Adi", who: "The great tribe of the Siang belt — Pasighat, Aalo and the villages along the river. Solung, celebrated from September 1, is their harvest festival." },
  { slug: "meyor", name: "Meyor", who: "One of India's smallest communities — a few villages around Walong, Dong and Kaho in the far Lohit valley, where the country's day begins." },
];

// ── The four field entries ──────────────────────────────────────────────────
type Entry = {
  slug: string;
  create?: { name: string; kind: string; lat: number; lng: number; elevation_m: number };
  tribe: string;
  permit_note: string;
  body: Record<string, unknown>;
};

const ENTRIES: Entry[] = [
  {
    slug: "tawang",
    tribe: "monpa",
    permit_note: "ILP for town & monastery. Bum La, PT Tso and Sangetsar (Madhuri) lake need one extra day-permit from the DC office, army-countersigned — Indians only, arranged a day ahead via hotel or driver.",
    body: {
      field_note:
        "Sleep a night at Dirang or Bomdila on the way up — town sits at ~3,000 m and the lakes day goes above 4,500. Book the Bum La cab the evening before through your hotel (Tawang-registered taxis only, ₹5,500–6,000 for the vehicle; the border road shuts by early afternoon). Fuel at Dirang, then Tawang or Jang; draw cash in town — SBI, HDFC, ICICI all have branches. Airtel is your best signal, and it thins fast beyond town.",
      story:
        "Tawang is monastery country. Gaden Namgyal Lhatse — founded 1680–81 by Merak Lama Lodre Gyatso at the wish of the Fifth Dalai Lama — is the largest monastery in India, and the Sixth Dalai Lama was born a short walk downhill at Urgelling. The town looks north into a wall of 1962 history: the war memorial in town, Jaswant Garh on the pass road, and Bum La itself, thirty-seven kilometres up at the border, now a meeting point between the two armies.\n\nSince March 2024 the Sela Tunnel runs under the snowline, and winter Tawang became a plan instead of a gamble. The old road over the 4,170-metre pass is now the detour you take on purpose — prayer flags, a frozen lake, and thin bright air.",
      approach: {
        from_gateway: "Tezpur (Assam) — or Guwahati, adding ~4 h to Tezpur",
        legs: [
          { from: "Tezpur", to: "Bhalukpong", km: 56, time: "1.5–2 h", note: "ILP checked at the gate" },
          { from: "Bhalukpong", to: "Bomdila", km: 100, time: "3–4 h", note: "the big climb; roughest stretch, widening works" },
          { from: "Bomdila", to: "Dirang", km: 42, time: "1.5 h", note: "acclimatisation halt · last easy fuel" },
          { from: "Dirang", to: "Tawang", km: 135, time: "4–5 h", note: "via the Sela Tunnel (all-weather); pass-top is the scenic detour" },
        ],
      },
      vitals_extra: {
        atm: "Reliable — SBI, HDFC, ICICI, Canara branches in town",
        fuel: "Pumps at Tawang town and Jang; fill at Dirang on the way up",
        network: "Airtel strongest, BSNL fallback; patchy beyond town",
        altitude: "Town ~3,000 m — take a day easy before Sela/Bum La excursions",
      },
      ground_truth_flags: [
        "Bum La 'Indians only + taxi-union only' rule is operator-sourced (consistent, but no official notification) — confirm current practice with our Tawang drivers.",
        "Monsoon note (Jul 13, 2026): Sela Tunnel approach road took a washout; traffic on the old pass road — recheck before the next departure.",
      ],
      verified: { on: "2026-07-14", source: "docs-new/08-blueprint/research/arunachal-facts-2026-07.md + field-entry research fleet" },
    },
  },
  {
    slug: "mechuka",
    tribe: "memba",
    permit_note: "ILP for the valley (foreigners: PAP). The Lamang forward area toward the line needs a same-day Army/ITBP permit, arranged in Mechuka through your homestay.",
    body: {
      field_note:
        "Everything practical happens at Aalo: fill the tank full (there is no working pump on the 187 km beyond, nor in Mechuka), draw cash (the town's lone SBI can't be counted on), and download your maps. Airtel 4G works in the town core since 2023 — beyond it, you're offline. The Kaying–Tato stretch is the rough one; give the drive a full day and start early. Roadworks mean timed closures on the last stretch — ask the night before.",
      story:
        "Mechuka — 'medicinal water of ice' in the local reading — is a wide, pale valley of the Yargyap Chu, twenty-nine kilometres short of the McMahon Line. It is Memba country: prayer flags on rooftops, a February Losar that arrives a month before everyone else's, and on a bare hilltop west of town, Samten Yongcha — a gompa the Membas hold to be a contemporary of Tawang's, four centuries of oral history with no founding date written anywhere.\n\nHanging footbridges cross the river to hamlets like Dorjeeling; Guru Padmasambhava is said to have meditated at Neh Pemashubu, thirteen kilometres out. The Indian Air Force keeps an airstrip in the grass — no scheduled flights land here yet, which is a fair summary of the place.",
      approach: {
        from_gateway: "Dibrugarh (Assam), via the Bogibeel bridge",
        legs: [
          { from: "Dibrugarh", to: "Pasighat", km: 150, time: "4–5 h", note: "Bogibeel bridge; ILP at Ruksin gate" },
          { from: "Pasighat", to: "Aalo", km: 100, time: "4–5 h", note: "last reliable fuel, cash and network" },
          { from: "Aalo", to: "Tato", km: 140, time: "5–6 h", note: "Kaying–Tato is the rough stretch; widening works, timed closures" },
          { from: "Tato", to: "Mechuka", km: 47, time: "1.5–2 h", note: "bridge-building underway; landslide-prone in monsoon" },
        ],
      },
      vitals_extra: {
        atm: "Unreliable — one SBI branch; carry cash from Aalo/Pasighat",
        fuel: "None beyond Aalo — fill full, consider a jerrycan",
        network: "Airtel 4G in town core only; offline beyond",
        elevation_note: "Valley floor ~1,830–1,890 m (sources differ)",
      },
      ground_truth_flags: [
        "'108 Stupa' from our tour sightseeing list could not be verified by any source — confirm the local name/spot with our Mechuka host.",
        "Helicopter service (Naharlagun–Aalo–Mechuka, Mon/Fri) last confirmed flying Aug 2025 — verify current status before recommending.",
        "Homestay rates in circulation are old (₹800–1,500) — confirm current.",
      ],
      verified: { on: "2026-07-14", source: "field-entry research fleet (16 agents)" },
    },
  },
  {
    slug: "anini",
    create: { name: "Anini", kind: "town", lat: 28.79806, lng: 95.90361, elevation_m: 1968 },
    tribe: "idu-mishmi",
    permit_note: "ILP (foreigners: PAP). Treks — Seven Lakes, Athu-Popu — run only through local Idu operators.",
    body: {
      field_note:
        "Roing is your last everything: the last ATM you can trust, the last petrol pump (fill full — there is none on the 200-plus km to Anini), the last solid signal. From there the road climbs Mayodia at 2,655 m — snow blocks it for spells between November and March — and worms down to the Dibang. BSNL voice is the near-constant in town; the valleys beyond have nothing. Beds are few — Circuit House plus a handful of homestays and camps — book before you come.",
      story:
        "Anini sits on a plateau between two rivers, the Dri and the Mathun, at the head of India's emptiest district — Dibang Valley, ranked 640th of 640 in population, fewer than one person per square kilometre. The first bus in the town's history arrived on 15 January 2021; that is the scale of remote this is.\n\nThis is Idu Mishmi country. Reh, from the first of February, invokes Nanyi Inyitaya, the divine mother; far up the Mathun, near the border passes, lies Athu-Popu, the stone where Idu souls rest on their journey onward — a week's walk, made only with Idu guides. For travellers, the valleys fan out from town: Dri towards Dambuen, Mathun towards Mipi, grasslands at Emuli and Karu, waterfalls that mostly don't have signboards yet.",
      approach: {
        from_gateway: "Dibrugarh/Tinsukia (Assam), via the Dhola–Sadiya bridge",
        legs: [
          { from: "Tinsukia", to: "Roing", km: 107, time: "~3 h", note: "ILP at Shantipur gate; last fuel, cash, network" },
          { from: "Roing", to: "Mayodia Pass", km: 56, time: "2.5–3 h", note: "2,655 m; snow spells Nov–Mar; drive in daylight" },
          { from: "Mayodia", to: "Hunli", km: 34, time: "~1.5 h", note: "usual tea halt" },
          { from: "Hunli", to: "Anini", km: 100, time: "4–5 h", note: "roughest, washout-prone half; monsoon cuts it most years" },
        ],
      },
      vitals_extra: {
        atm: "None reliable — SBI branch exists; carry all cash from Roing",
        fuel: "None beyond Roing — fill full + reserve",
        network: "BSNL voice in town; nothing in the valleys beyond",
        season_note: "Oct–Apr; town sees snow late Dec–Feb",
      },
      ground_truth_flags: [
        "Reported new BPCL pump in Anini — single social-media source; confirm on the ground.",
        "Airtel data in town: sources conflict (2023 rollout vs BSNL-only reports) — confirm which carrier actually works now.",
        "Waterfall names from our itinerary (Deccan/Ahi/Bruni) are blog-verified only — confirm local names with the team.",
      ],
      verified: { on: "2026-07-14", source: "field-entry research fleet (16 agents)" },
    },
  },
  {
    slug: "dong",
    create: { name: "Dong", kind: "village", lat: 28.17, lng: 97.042, elevation_m: 1240 },
    tribe: "meyor",
    permit_note: "ILP, checked at the Dirak gate on the way in. No extra civilian permit for Dong/Walong; carry ID for the army checkposts.",
    body: {
      field_note:
        "The sunrise is a trek, not a drive. Trailhead is a hanging bridge near Tilam, fifteen-odd minutes past Walong; then five kilometres and six hundred metres up the Dong Krong ridge — start by 3:30 am with a local guide (mandatory, ~₹500 a head). Winter first light lands about 5:40; carry a layer, it's 0–6°C on top. Sleep at Walong or Tilam — Dong itself is four households and festival tents. Fuel: Tezu, and treat everything after as absent.",
      story:
        "Dong is a handful of Meyor houses on the far bank of the Lohit, reached by an iron-floored suspension bridge, seven kilometres from Walong. Its claim is simple and real: mainland India's day begins here. Identified in 1999, mobbed on the millennium morning of January 1, 2000, and now marked by a young Sunrise Festival that walked its first visitors up the ridge in the last days of 2025.\n\nWalong beside it carries the other story. In October–November 1962 this valley held the Battle of Walong — the only Indian counterattack of that war — and the memorial by the airstrip names the men of 4 Sikh and 4 Dogra who stayed. Up the road: Kibithu, the easternmost point of India's highway network, and Kaho, the first village the sun touches. The whole valley feels like a first page and a last page at once.",
      approach: {
        from_gateway: "Dibrugarh/Tinsukia (Assam) → Tezu",
        legs: [
          { from: "Tinsukia", to: "Tezu", km: 150, time: "4–5 h", note: "ILP at Dirak gate; last certain fuel and cash" },
          { from: "Tezu", to: "Hayuliang", km: 100, time: "3–4.5 h", note: "NH-113 along the Lohit; landslide zone at Tidding" },
          { from: "Hayuliang", to: "Walong", km: 95, time: "4–5 h", note: "single-lane, part under construction; slow going" },
          { from: "Walong", to: "Dong / Tilam trailhead", km: 7, time: "20–30 min + trek", note: "sunrise viewpoint is a 1.5–2 h climb from the bridge" },
        ],
      },
      vitals_extra: {
        atm: "None beyond Tezu — carry all cash",
        fuel: "Tezu; a small reported pump near Hayuliang is unconfirmed — carry reserve",
        network: "Dead zones from Hayuliang onward; BSNL sparingly at Walong",
        season_note: "Oct–Apr; festival window late Dec–Jan 1",
      },
      ground_truth_flags: [
        "Viewpoint fee/guide (₹500) and trek timings are 2024-season figures — confirm with our Walong contacts.",
        "Where we sleep guests (Walong IB vs Tilam camps vs our own tents) — codify from our own trips; sources are thin.",
        "Battle of Walong is 1962 (Sino-Indian War), NOT WWII — our older copy said WWII; corrected here and in the blueprint.",
      ],
      verified: { on: "2026-07-14", source: "field-entry research fleet (16 agents)" },
    },
  },
];

async function main() {
  const { data: arunachal } = await sb
    .from("regions").select("id").eq("slug", "arunachal-pradesh").single();

  // Tribes
  const tribeIds = new Map<string, string>();
  for (const t of TRIBES) {
    const { data: existing } = await sb.from("tribes").select("id").eq("slug", t.slug).maybeSingle();
    if (existing) {
      tribeIds.set(t.slug, existing.id);
      console.log(`[tribe] ${t.slug} — exists`);
      continue;
    }
    console.log(`[tribe] ${t.slug} — create (draft)`);
    if (!dry) {
      const { data: created, error } = await sb
        .from("tribes")
        .insert({ slug: t.slug, name: t.name, body: { who: t.who }, region_ids: arunachal ? [arunachal.id] : [], status: "draft" })
        .select("id").single();
      if (error) throw error;
      tribeIds.set(t.slug, created.id);
    }
  }

  // Places + field entries
  for (const e of ENTRIES) {
    let { data: place } = await sb.from("places").select("id, body").eq("slug", e.slug).maybeSingle();
    if (!place && e.create) {
      console.log(`[place] ${e.slug} — create (DRAFT, ${e.create.lat}, ${e.create.lng}, ${e.create.elevation_m} m)`);
      if (!dry) {
        const { data: created, error } = await sb
          .from("places")
          .insert({
            slug: e.slug,
            name: e.create.name,
            kind: e.create.kind,
            region_id: arunachal?.id ?? null,
            geom: `SRID=4326;POINT(${e.create.lng} ${e.create.lat})`,
            elevation_m: e.create.elevation_m,
            status: "draft",
          })
          .select("id, body").single();
        if (error) throw error;
        place = created;
      }
    }
    if (!place) {
      console.log(`[place] ${e.slug} — missing and no create spec, skipped`);
      continue;
    }
    const patch: Record<string, unknown> = {
      body: { ...((place.body as Record<string, unknown>) ?? {}), ...e.body },
      permit_note: e.permit_note,
    };
    const tribeId = tribeIds.get(e.tribe);
    if (tribeId) patch.tribe_id = tribeId;
    console.log(`[entry] ${e.slug} — field note ✓ story ✓ approach ${(e.body.approach as { legs: unknown[] }).legs.length} legs · flags ${(e.body.ground_truth_flags as unknown[]).length}`);
    if (!dry) {
      const { error } = await sb.from("places").update(patch).eq("id", place.id);
      if (error) throw error;
    }
  }

  console.log(dry ? "\nDRY RUN — nothing written." : "\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
