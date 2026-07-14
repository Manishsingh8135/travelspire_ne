/**
 * Seed the Arunachal Pradesh state-hub content (regions.body) — the first
 * authored content of the atlas. Every fact traces to the verified sheet:
 * docs-new/08-blueprint/research/arunachal-facts-2026-07.md (research of
 * 2026-07-14; two-stage adversarial verification). Voice: field journal —
 * specific, honest, no filler.
 *
 *   node --env-file=.env.local --import tsx scripts/seed-arunachal-hub.ts [--dry]
 *
 * Idempotent: merges into body (owns its keys, preserves others).
 * Also applies two verified data corrections (Ziro 2026 event dates; the
 * Mechuka circuit's gompa-age hedge).
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

const HUB = {
  soul_line: "Where India's day begins.",

  intro:
    "Arunachal Pradesh is the largest and least-travelled state of the Northeast — river plains at 100 metres rising to Kangto at 7,042, twenty-six major tribes, and one road into each great valley. The country's first sunlight touches the mainland here, at Dong. Most of it runs on a permit, a good driver, and knowing who to ask — which is exactly the part we handle.",

  vitals: {
    capital: "Itanagar",
    permit_chip: "ILP",
    best_window: "Oct–Nov · Mar–Apr",
    elevation_range: "~100 m – 7,042 m",
    tribes: "26 major tribes · 100+ sub-tribes",
    gateway_cities: ["Guwahati", "Dibrugarh", "Tezpur"],
  },

  answers: [
    {
      q: "Do I need a permit for Arunachal Pradesh?",
      a: "Yes. Indians need a Tourist eILP — apply online at eilp.arunachal.gov.in (₹300 up to 3 days, ₹500 for 4–14 days; usually approved within a day). Foreign nationals need a Protected Area Permit via e-FRRO: groups of two or more through a registered operator, USD 30 royalty per head. On our trips, permits are handled before you land.",
    },
    {
      q: "When should I go?",
      a: "October–November and March–early April are the clear-sky windows. December–February is snow season — Tawang stays reachable through the Sela Tunnel, but keep a buffer day for the high spurs. June–September is monsoon: the Ziro side stays workable with slack; Mechuka and Anini are one-road valleys and genuinely not advisable.",
    },
    {
      q: "How many days do I need?",
      a: "One circuit deserves 5–7 days; two circuits, 10–13. Distances lie here — 250 km is a full day's drive. Plan by valley, not by kilometres.",
    },
    {
      q: "How do I reach Arunachal?",
      a: "Fly to Donyi Polo Airport, Itanagar (nonstop from Delhi and Kolkata), or land at Guwahati or Dibrugarh and drive in through Bhalukpong (for Tawang), Banderdewa (for Itanagar), or the eastern bridges to Pasighat and Roing. The overnight Donyi Polo Express links Guwahati with Naharlagun railhead.",
    },
    {
      q: "Is Tawang open in winter?",
      a: "Yes — since March 2024 the Sela Tunnel keeps the Tawang road open all year. The pass-top viewpoints above the tunnel still close during heavy snowfall, usually briefly.",
    },
  ],

  signature_moments: [
    {
      title: "The first light in the country",
      prose:
        "At Dong, a grass ridge above the Lohit near Walong, mainland India's day begins — around 5:45 in winter, close to 4 a.m. in June. You walk up in the dark from Walong with a torch and tea in a flask, and watch the light arrive before anyone else in the country has it. Since the millennium morning of January 1, 2000, this little village has been the country's first page.",
      place_slug: null,
    },
    {
      title: "India's largest monastery",
      prose:
        "Tawang Monastery — Gaden Namgyal Lhatse — has stood on its ridge since 1680–81, founded by Merak Lama Lodre Gyatso at the wish of the Fifth Dalai Lama. It is the largest monastery in India, home to several hundred monks, and the Sixth Dalai Lama was born a short walk away at Urgelling. Come for morning prayers: butter lamps, low horns, and ten thousand feet of cold, bright air.",
      place_slug: "tawang",
    },
    {
      title: "The tunnel that ended winter",
      prose:
        "For decades, snow on the 13,700-foot Sela Pass decided who reached Tawang. Since March 2024, the Sela Tunnel runs beneath the snowline and the road stays open all year — the pass top is now the scenic detour, prayer flags against a frozen lake, rather than the gamble. Winter in Monpa country is finally a plan, not a hope.",
      place_slug: null,
    },
    {
      title: "A valley the world is watching",
      prose:
        "In Ziro, the Apatani grow rice and raise fish in the same flooded fields, a system so distinct that the valley has sat on UNESCO's World Heritage tentative list since 2014. Pine ridges, bamboo homes, and in late September, one of India's best-loved independent music festivals plays between the paddies.",
      place_slug: "ziro",
    },
  ],

  getting_there: {
    airports: [
      {
        name: "Donyi Polo Airport, Itanagar (HGI)",
        note: "IndiGo nonstop from Delhi (near-daily) and Kolkata. Alliance Air small-aircraft links to Guwahati and Tezu run 1–3×/week — reconfirm schedules before booking.",
      },
      {
        name: "Dibrugarh (Assam)",
        note: "The practical gateway for the eastern circuits — Mechuka, Dong–Walong, Anini, Dambuk. Most of our expeditions start here.",
      },
      {
        name: "Guwahati (Assam)",
        note: "The Northeast's biggest flight network; onward by road or the overnight train.",
      },
    ],
    railheads: [
      {
        name: "Naharlagun",
        note: "~15 km from Itanagar. Overnight Donyi Polo Express via Guwahati (departs ~20:20), a daytime Shatabdi to Guwahati, and a twice-weekly AC express to Delhi (Anand Vihar) — check running days.",
      },
    ],
    road_gates: [
      { gate: "Bhalukpong", from: "Tezpur, 56 km", opens: "Bomdila · Dirang · Tawang" },
      { gate: "Banderdewa", from: "Guwahati via NH-15", opens: "Itanagar & the capital region" },
      { gate: "Ruksin", from: "Dibrugarh via the Bogibeel bridge", opens: "Pasighat & the Siang valley" },
      { gate: "Shantipur", from: "Tinsukia via the Dhola–Sadiya bridge", opens: "Roing · Mayodia · Anini" },
      { gate: "Likabali", from: "North Lakhimpur side", opens: "Aalo & the road to Mechuka" },
      { gate: "Dirak", from: "Tinsukia", opens: "Namsai · Tezu · the Lohit valley" },
      { gate: "Namchik", from: "Margherita side", opens: "Miao & Namdapha" },
    ],
    note: "Your permit is checked at every gate — keep the eILP PDF saved offline. On every Travelspire trip, the gate paperwork is done before you land.",
  },

  // 12-month band — from the verified season audit (incidents 2024–26 cited in the research sheet).
  season: {
    months: [
      { m: 1, glyph: "snow", road_risk: 1, note: "Coldest; Tawang open via the tunnel, high spurs snow out" },
      { m: 2, glyph: "snow", road_risk: 1, note: "Late-winter snow up high; crisp, sunny valleys" },
      { m: 3, glyph: "sun", road_risk: 0, note: "Thaw and rhododendrons; spring at its best" },
      { m: 4, glyph: "sun", road_risk: 1, note: "Good until mid-month; afternoon storms build" },
      { m: 5, glyph: "rain", road_risk: 1, note: "Pre-monsoon rain; first slips on the highways" },
      { m: 6, glyph: "rain", road_risk: 2, note: "Monsoon onset; highways cut most years" },
      { m: 7, glyph: "rain", road_risk: 2, note: "Peak monsoon; remote valleys risk being cut off" },
      { m: 8, glyph: "rain", road_risk: 2, note: "Saturated slopes; landslides even in weak years" },
      { m: 9, glyph: "rain", road_risk: 1, note: "Tapers late-month; Ziro festival season" },
      { m: 10, glyph: "sun", road_risk: 0, note: "The clearest skies of the year; season opens" },
      { m: 11, glyph: "sun", road_risk: 0, note: "Dry and sharp; first snow on the passes late-month" },
      { m: 12, glyph: "snow", road_risk: 1, note: "Snow season and peak crowds; carry buffer days" },
    ],
    best_window: "Oct–Nov · Mar–early Apr",
    monsoon_note:
      "June–September is not just wetter — main highways were cut in 2024, 2025 and 2026. Ziro works with slack; one-road valleys (Mechuka, Anini) don't.",
  },

  faqs: [
    {
      q: "How long does the ILP take?",
      a: "It's an online form at eilp.arunachal.gov.in — typically approved within hours, up to a day. ₹300 for stays up to 3 days, ₹500 for 4–14 days. The tourist permit caps at 14 days; longer stays use a provisional permit.",
    },
    {
      q: "Can foreigners travel here? Solo?",
      a: "Yes, on a Protected Area Permit issued electronically through e-FRRO — the working rule is a group of two or more sponsored by a registered operator, with a USD 30 per-head state royalty. Solo travellers need prior clearance from the Ministry of Home Affairs, which takes longer. Apply at least 15 days ahead (about 30 if applying from abroad).",
    },
    {
      q: "Is monsoon travel possible?",
      a: "On the Itanagar–Ziro side, yes — with loose plans and a spare day. For Mechuka, Anini and the Dong valley, no: each hangs on a single road, and June–September landslides turn a delay into being cut off. Every recent year has proven it.",
    },
    {
      q: "Which airport should I fly into?",
      a: "For Tawang and the west: Guwahati or Tezpur, entering at Bhalukpong. For Itanagar and Ziro: Donyi Polo (Itanagar) direct from Delhi/Kolkata. For everything east — Mechuka, Dong, Anini, Dambuk: Dibrugarh.",
    },
    {
      q: "Are the festival dates fixed?",
      a: "Some are gazetted and fixed: Reh (Feb 1), Nyokum (Feb 26), Mopin (Apr 5), Sangken (Apr 14), Dree (Jul 5), Solung (from Sep 1). The Buddhist festivals move with the lunar calendar — Torgya and Losar shift each year — and event festivals like Ziro Music announce dates annually.",
    },
    {
      q: "Is Ziro a UNESCO World Heritage Site?",
      a: "Not yet — the Apatani cultural landscape has been on UNESCO's tentative list since 2014. No site in Arunachal is inscribed so far.",
    },
  ],

  verified: {
    on: "2026-07-14",
    method:
      "Two-stage research: deep-research sweep (108 agents, 26 sources, 25 claims 3-vote verified) + targeted verification fleet (13 claim groups × 3 refuters + season audit). Source of record: docs-new/08-blueprint/research/arunachal-facts-2026-07.md",
  },
};

async function main() {
  const { data: region, error } = await sb
    .from("regions")
    .select("id, body")
    .eq("slug", "arunachal-pradesh")
    .single();
  if (error) throw error;

  const body = { ...(region.body ?? {}), ...HUB };
  console.log(
    `[hub] arunachal-pradesh — ${HUB.answers.length} answers · ${HUB.signature_moments.length} moments · ` +
      `${HUB.getting_there.road_gates.length} gates · 12-month season · ${HUB.faqs.length} FAQs`,
  );
  if (!dry) {
    const { error: upErr } = await sb.from("regions").update({ body }).eq("id", region.id);
    if (upErr) throw upErr;
  }
  console.log("   ✓ hub body written");

  // ── Verified corrections ──────────────────────────────────────────────────
  // 1. Ziro Festival of Music 2026 runs Sep 24–27 (official zirofestival.com),
  //    not Sep 25–28 (legacy data was off by one day on both ends).
  const { data: ziroFest } = await sb
    .from("festivals")
    .select("id")
    .eq("slug", "ziro-festival-of-music")
    .single();
  if (ziroFest) {
    if (!dry) {
      const { error: evErr } = await sb
        .from("events")
        .update({ starts_on: "2026-09-24", ends_on: "2026-09-27" })
        .eq("festival_id", ziroFest.id)
        .eq("year", 2026);
      if (evErr) throw evErr;
    }
    console.log("   ✓ Ziro 2026 edition corrected → Sep 24–27 (zirofestival.com)");
  }

  // 2. Mechuka circuit intro: the gompa's age is oral-history — hedge it, and
  //    match the official "contemporary of Tawang" framing.
  if (!dry) {
    const { data: mech } = await sb
      .from("regions")
      .select("id, body")
      .eq("slug", "mechuka-shi-yomi")
      .single();
    if (mech) {
      const { error: mErr } = await sb
        .from("regions")
        .update({
          body: {
            ...(mech.body ?? {}),
            intro:
              "The far valley near the line: a gompa said to be four centuries old, hanging bridges, and the last café before the mountains end.",
          },
        })
        .eq("id", mech.id);
      if (mErr) throw mErr;
    }
  }
  console.log("   ✓ Mechuka circuit intro hedged (oral-history dating)");

  console.log(dry ? "\nDRY RUN — nothing written." : "\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
