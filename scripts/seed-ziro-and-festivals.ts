/**
 * Seed the Ziro field entry + the 9 remaining Arunachal festivals + 4 tribes +
 * upcoming editions. Facts from the 13-agent research fleet of 2026-07-14
 * (3 Ziro lenses + reconciler, 1 deep gatherer per festival) on top of the
 * verified sheet (docs-new/08-blueprint/research/arunachal-facts-2026-07.md).
 * Unverifiable claims → body.ground_truth_flags, never asserted.
 *
 *   node --env-file=.env.local --import tsx scripts/seed-ziro-and-festivals.ts [--dry]
 *
 * Idempotent: insert-if-missing by slug / (festival, year); bodies merge.
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

// ── 4 more tribes (drafts) ──────────────────────────────────────────────────
const TRIBES = [
  { slug: "nyishi", name: "Nyishi", who: "The largest tribe of central Arunachal — the Itanagar belt and the Subansiri hills. Nyokum, from February 26, gathers every god of the universe at a bamboo altar called the yugang, with the nyubu priest as the negotiator between worlds." },
  { slug: "galo", name: "Galo", who: "People of the Aalo–Basar country in the Siang west. Mopin, from April 5, honours Mopin Ane, the mother of prosperity — rice-flour ette smeared on every face, popir dance circles, and apong in bamboo cups." },
  { slug: "khamti", name: "Tai Khamti", who: "Theravada Buddhists of the Namsai plains, kin to the Tai world across the border. Sangken, from April 14, is their new year — Buddha images bathed in scented water, and three days when everyone gently soaks everyone." },
  { slug: "tangsa", name: "Tangsa", who: "People of the Patkai hills in Changlang, astride the old Stilwell Road to Myanmar. Their country hosts the Pangsau Pass International Festival each January at Nampong, a border town with a WWII cemetery in its jungle." },
];

// ── Ziro field entry (published place — enrich) ─────────────────────────────
const ZIRO_BODY = {
  field_note:
    "Ziro is really two towns: Hapoli, the working centre with the banks, hotels and the fuel pump, and Old Ziro by the airstrip, closer to the villages. Cash and network are the easiest in Arunachal — SBI, HDFC and Axis in Hapoli, Jio/Airtel 4G in town — but both thin at the village edges and vanish on the Talle trek. Top up fuel at North Lakhimpur or Itanagar before the climb anyway; pumps up here are few. For festival week in September, book months ahead or take the official camping. Talle Valley needs Forest Department permission from the DFO at Hapoli — your homestay or operator sorts it.",
  story:
    "The Ziro valley is a 1,500-metre-high bowl of rice the Apatani have engineered for centuries without a single plough or draught animal: gravity-fed channels thread water plot to plot, carp swim between the paddy stems, and millet grows on the earthen dykes. It is farming as landscape art, and it has sat on UNESCO's World Heritage tentative list since 2014. Seven villages ring the fields — Hong, Hija, Hari, Bulla, Dutta, Bamin Michi, Mudang Tage — bamboo houses pressed close, each with its lapang platform where the village still meets.\n\nFaith here is Danyi-Piilo — the Sun and the Moon — with Sunday gatherings at prayer halls called Meder Nello. In July, Dree opens the harvest season with cucumber slices handed round like prasad; in late September the paddies host one of India's best-loved independent music festivals. Half an hour south, the pine ridge at Kile Pakho looks over the whole plateau; beyond it, the Talle Valley sanctuary climbs into clouded-leopard forest.",
  approach: {
    from_gateway: "Itanagar (Hollongi airport / Naharlagun railhead) — or North Lakhimpur, Assam",
    legs: [
      { from: "Naharlagun", to: "Ziro", km: 98, time: "~3 h", note: "shared Sumos daily; overnight Donyi Polo Express connects from Guwahati" },
      { from: "Itanagar (Hollongi)", to: "Ziro", km: 100, time: "3.5–4 h", note: "via Hoj–Potin onto NH-13; two-laning works, expect diversions" },
      { from: "North Lakhimpur", to: "Ziro", km: 113, time: "3–3.5 h", note: "via Kimin and Potin; ILP checked at the gate" },
      { from: "Guwahati", to: "Ziro (air)", km: null, time: "~65 min", note: "Alliance Air Dornier to Ziro ALG, 2×/week since Dec 2024 — reconfirm it's flying" },
    ],
  },
  vitals_extra: {
    atm: "Best in the state — SBI ×2, HDFC, Axis, Central Bank in Hapoli; still carry backup cash",
    fuel: "One pump in Ziro + Yazali/Yachuli en route — top up before the climb",
    network: "Jio/Airtel 4G in town; BSNL widest in villages; nothing on the Talle trek",
    elevation_note: "Valley floor ~1,500–1,600 m; ridges to ~2,400 m",
  },
  ground_truth_flags: [
    "Alliance Air Guwahati–Ziro (Mon/Wed at launch) — confirm it's still operating before recommending.",
    "'Hong is one of Asia's largest villages' is a tourism claim with no census backing (~2,100 people in 2011) — don't print the superlative.",
    "Talle trek permission: no published fee/procedure — codify our own DFO process.",
  ],
  verified: { on: "2026-07-14", source: "13-agent research fleet (ICAR paper, district site, UNESCO, festival org)" },
};

// ── The 9 festivals ─────────────────────────────────────────────────────────
type Fest = {
  slug: string; name: string; tribe: string | null; placeSlug?: string;
  recurrence: Record<string, unknown>; significance: string;
  what_to_expect: { title: string; note?: string }[];
  attend: Record<string, unknown>; flags?: string[];
};

const FESTIVALS: Fest[] = [
  {
    slug: "torgya", name: "Torgya", tribe: "monpa", placeSlug: "tawang",
    recurrence: { month: 1, duration_days: 3, rule_note: "Days 28–30 of the 11th Tibetan month — mid/late January, movable; every 3rd year the grander Dungyur" },
    significance:
      "Three days of monastic ritual at Tawang Monastery to drive out evil and open a protected year — a festival as old as the gompa itself, attributed to its founder Merak Lama Lodre Gyatso. The name means 'casting of the torma': a three-foot ritual sculpture of barley and butter, carried out by monks in procession and cast into a bonfire, taking the year's misfortunes with it.",
    what_to_expect: [
      { title: "Cham — the masked dances", note: "Some twenty-one dances across three days in the monastery courtyard: the pre-dawn boar-masked Pha Cham asking the earth's permission, the twelve black-hat dancers of Shanag Cham, brocade robes and wooden masks of divinities." },
      { title: "The torma burning", note: "The climax — monks called Arpo carry the torma out, escorted by yak-horn-masked guardians, and cast it into fire." },
      { title: "The blessing", note: "On the last day the Abbot gives the long-life initiation; blessed barley sweets and ritual beer are shared, cloth strips tied at the wrist." },
    ],
    attend: { where: "Tawang Monastery courtyard — open to visitors", when_note: "Mid–late January; exact dates follow the lunar calendar and are announced locally. Tawang in January is snow country: the tunnel keeps the road open, carry serious layers.", scarcity_note: "Tawang's hotels are quiet in January — the festival is the reason to be there." },
    flags: ["Exact 2027 Gregorian dates — confirm with the monastery/Tawang tourism when announced.", "Whether next edition is a Dungyur (3rd-year cycle) — confirm locally."],
  },
  {
    slug: "losar", name: "Losar", tribe: "monpa", placeSlug: "tawang",
    recurrence: { month: 2, duration_days: 3, rule_note: "Tibetan lunar new year — usually late Feb/early Mar (2026: Feb 18). The Memba of Mechuka celebrate a month earlier." },
    significance:
      "The Monpa new year — a home festival more than a spectacle. Houses are swept and whitewashed on the old year's last days, khapse pastries are fried by the basketful, and the first day belongs to family: lamps in the home chapel, prayers for a clean year, nobody visiting anybody. Then the doors open — greetings, the Aji Lhamu dance-drama, and on the third day new prayer flags climb over every roof.",
    what_to_expect: [
      { title: "Khapse and butter sculptures", note: "Deep-fried good-luck pastries everywhere; butter shaped into auspicious symbols." },
      { title: "Guthuk night", note: "The old-year noodle soup with nine fortunes hidden in the dumplings — what you find is your year." },
      { title: "Flag-raising day", note: "Day three: lungta flags raised with flour thrown to the protectors, visits to the gompa." },
    ],
    attend: { where: "Tawang and the Monpa belt; Mechuka's Memba homes a month earlier", when_note: "A family festival — experience it through a homestay, not a grandstand. Dates move with the lunar calendar.", scarcity_note: null },
    flags: ["Memba Losar's exact yearly dates in Mechuka — confirm with our hosts."],
  },
  {
    slug: "nyokum", name: "Nyokum Yullo", tribe: "nyishi",
    recurrence: { month: 2, typical_start_day: 26, duration_days: 1, rule_note: "Main day gazetted Feb 26 (fixed since 1967); festivities run ~Feb 23–27" },
    significance:
      "The Nyishi pre-sowing festival that invites every god and goddess of the universe to one place at one time — Nyokum, from nyok (land) and kum (togetherness). There are no idols: the centre is the yugang, an altar built of bamboo, where the nyubu priest negotiates between people and spirits for a year without famine, flood or misfortune.",
    what_to_expect: [
      { title: "The yugang altar", note: "Bamboo architecture raised for the ritual, offerings of millet beer and rice paste." },
      { title: "The nyubu's chants", note: "The priest-shaman specifies every offering; before a mithun is offered, he consoles it with the legend of its origin — the rite is sacrificial, described here honestly." },
      { title: "The gathering", note: "Processions, dances and communal feasting around the festival grounds at Itanagar and Nyishi towns." },
    ],
    attend: { where: "Nyokum Lapang, Itanagar + Nyishi belt towns (Yazali, Joram)", when_note: "Feb 26 is the fixed main day; the capital's celebration is the easiest to attend.", scarcity_note: null },
    flags: ["Animal sacrifice at the centralized venues vs village rites — describe from our own attendance."],
  },
  {
    slug: "reh", name: "Reh", tribe: "idu-mishmi", placeSlug: "anini",
    recurrence: { month: 2, typical_start_day: 1, duration_days: 3, rule_note: "Gazetted Feb 1; central celebrations Feb 1–3; the traditional cycle runs six days" },
    significance:
      "The great festival of the Idu Mishmi, invoking Nanyi Inyitaya — the Divine Mother whose children the Idu hold themselves to be. Everything runs through the igu, the shaman: not a hereditary role but one that arrives in dreams, learned through apprenticeship. Fewer than a hundred igus remain for the whole Idu country, and Reh is where their chanting still holds the centre.",
    what_to_expect: [
      { title: "The igu's night chants", note: "Hours-long invocations to Nanyi Inyitaya and Maselo-Zinu, the priest dancing as he chants." },
      { title: "The offering days", note: "Mithun and buffalo are offered on the second day — a real and central part of the rite, told here honestly — with rice beer (yunyiphri) and meat shared with every guest." },
      { title: "Community dances", note: "The naya dance on opening night; three days of hosting where nobody leaves unfed." },
    ],
    attend: { where: "Central Rehko at Cheta (near Roing) + a parallel celebration at Anini; every Idu village keeps its own rehko", when_note: "Feb 1–3. Roing is the accessible venue; Anini in February means snow at Mayodia — go with buffer days.", scarcity_note: "Anini's few beds fill for Reh — book ahead." },
    flags: ["The six traditional day-names (Andropu, Eyanli…) are travel-sourced — verify with Idu hosts before printing."],
  },
  {
    slug: "mopin", name: "Mopin", tribe: "galo",
    recurrence: { month: 4, typical_start_day: 5, duration_days: 4, rule_note: "Gazetted Apr 5; the cycle runs ~Apr 2–8, closing with Riga Alo at the paddy fields" },
    significance:
      "The Galo new year and harvest prayer, for Mopin Ane — the mother of prosperity who, in the origin story, gave the first man Abo Tani the seeds of paddy carried in the ear-lobes of his dog. Its signature is ette: rice-flour paste smeared on every face, guest and stranger alike — rice being life here, the smearing is a blessing of purity and welcome.",
    what_to_expect: [
      { title: "Ette on your face", note: "You will not stay clean, and that is the point." },
      { title: "Popir circles", note: "The Galo dance — linked arms, turning circles, folk verses — the emotional centre of the festival." },
      { title: "Poka in bamboo", note: "Rice beer brewed by the women, served to everyone; the Aamin feast of rice, meat and bamboo shoot." },
    ],
    attend: { where: "Aalo and Basar are the big celebrations", when_note: "Apr 5 main day. Aalo doubles as the Mechuka gateway — Mopin pairs naturally with a valley trip.", scarcity_note: null },
    flags: ["Mithun offering is central at the main venues; village variation (pig/other) per GIFCC — describe from attendance."],
  },
  {
    slug: "sangken", name: "Sangken", tribe: "khamti",
    recurrence: { month: 4, typical_start_day: 14, duration_days: 3, rule_note: "Apr 14–16 — the Tai new year, sibling of Songkran and Thingyan" },
    significance:
      "The Theravada water new year of the Tai Khamti — the same mid-April sun-crossing celebrated as Songkran in Thailand and Thingyan in Myanmar, kept here in the plains of Namsai. Buddha images leave the temples for flower-decked pavilions, bathed in scented water poured through carved wooden conduits; and for three days, everyone gently drenches everyone — clean water only, a washing-away of the old year.",
    what_to_expect: [
      { title: "The processions", note: "Buddha images carried out to the kyongfra pavilions on day one, and home again on the last day — drums, cymbals, flowers." },
      { title: "The water", note: "Poured on images through the lungkong conduit, on monks' hands, on elders' feet — and splashed on you, kindly." },
      { title: "The Golden Pagoda", note: "Kongmu Kham at Namsai is the grand venue — Arunachal's biggest Theravada complex in full festival dress." },
    ],
    attend: { where: "Namsai and Chongkham — centred on the Golden Pagoda", when_note: "Apr 14–16, hot-season plains weather; an easy add-on to any eastern circuit (Namsai is the Dong/Walong road).", scarcity_note: null },
  },
  {
    slug: "dree", name: "Dree", tribe: "apatani", placeSlug: "ziro",
    recurrence: { month: 7, typical_start_day: 5, duration_days: 3, rule_note: "Jul 5 fixed — after the 1967 centralization; the date was set so the first cucumbers would be ready" },
    significance:
      "The Apatani agricultural festival of the Ziro valley — prayers to Danyi the Sun, Tamu against the pests, Metii against sickness, for a season the fields survive. Centralized in 1967 by a students' movement led by Lod Kojee; the date itself was fixed by a vegetable — the first year's cucumber slices ran short in June, so Dree moved to July 5, when the harvest's first cucumbers could be handed to everyone like prasad.",
    what_to_expect: [
      { title: "Cucumber, like prasad", note: "Dree taku — slices passed through the crowd, the first healthy harvest of the season." },
      { title: "Priests in ritual dress", note: "Fibre hats, cane haversacks, processions around the lapang platforms in the seven villages." },
      { title: "The Dree ground", note: "Games, races and cultural displays at Nenchalya near Old Ziro; village rites the evening before." },
    ],
    attend: { where: "Ziro valley — the Dree ground plus all seven villages", when_note: "Jul 5–7, monsoon season: the valley is at its greenest and the roads at their slowest — come a day early.", scarcity_note: null },
    flags: ["The popular four-deity list adds Harniang (soil) — the founder's account and district site differ; we print the district version."],
  },
  {
    slug: "solung", name: "Solung", tribe: "adi",
    recurrence: { month: 9, typical_start_day: 1, duration_days: 3, rule_note: "Officially from Sep 1 (central at Pasighat, ~Sep 1–3); village kebangs traditionally set longer cycles" },
    significance:
      "The great Adi festival of the Siang belt — sown-field prayers for the harvest to come, offered to Kine Nane, the goddess who sent paddy to starving humans through a dog and asked only that Solung be kept in return. The name itself is mithun: eso, the animal at the centre of Adi wealth and offering, in herds — lung.",
    what_to_expect: [
      { title: "The three movements", note: "Sopi-Yekpi, the offering day to Dadi Bote, keeper of animals; Binnayat, the offerings to Kine Nane of the crops; Ekop, the closing protection rites." },
      { title: "Ponung dances", note: "Women's rows swaying to the miri's ballads — the aabangs that carry Adi history." },
      { title: "Apong and the long table", note: "Rice beer brewed for weeks ahead; households host in rounds." },
    ],
    attend: { where: "Pasighat hosts the Central Solung; every Adi village keeps its own", when_note: "From Sep 1 — the monsoon's tail; Pasighat is the easy venue, an hour from the Bogibeel bridge.", scarcity_note: null },
    flags: ["Day-by-day naming varies across sources (Doreph-Long vs Yegling…) — print the three movements, confirm details with Adi hosts."],
  },
  {
    slug: "pangsau-pass-international-festival", name: "Pangsau Pass International Festival", tribe: "tangsa",
    recurrence: { month: 1, typical_start_day: 20, duration_days: 3, rule_note: "Third week of January at Nampong (2026: Jan 20–22); revived 2025 after a long pause — dates announced yearly" },
    significance:
      "A border festival on the Stilwell Road — the WWII lifeline hacked from Ledo to Kunming over the Patkai crest, whose first great obstacle, Pangsau Pass, the soldiers called Hell Gate. Nampong hosts three days of Tangsa and pan-Arunachal culture with delegations from Myanmar across the pass — a people-to-people festival on a road history closed. In the jungle nearby: a WWII cemetery of nearly a thousand Allied graves.",
    what_to_expect: [
      { title: "Troupes from both sides", note: "Arunachal's tribes and Myanmar delegations on one stage — the revival editions brought 26 communities plus cross-border troupes." },
      { title: "The Stilwell Road", note: "Jeep rallies trace the wartime route; the pass viewpoint looks to Myanmar's Lake of No Return." },
      { title: "The WWII cemetery", note: "Near Jairampur — around a thousand Allied graves, brought to light in the 1990s." },
    ],
    attend: { where: "Nampong, Changlang district — near Jairampur", when_note: "January, announced yearly. Pairs with Miao/Namdapha (the Namchik gate is the same corridor).", scarcity_note: "Accommodation is thin — festival camps + Jairampur/Miao bases." },
    flags: ["Whether visitors can currently reach the pass-top/Lake viewpoint (border rules vary by year) — confirm each edition."],
  },
];

// ── Upcoming editions (fixed-date festivals only; movable ones stay event-less) ──
const EVENTS: { festival: string; label: string; start: string; end: string }[] = [
  { festival: "solung", label: "Central Solung 2026", start: "2026-09-01", end: "2026-09-03" },
  { festival: "pangsau-pass-international-festival", label: "PPIF 2027 (dates tentative)", start: "2027-01-20", end: "2027-01-22" },
  { festival: "reh", label: "Reh 2027", start: "2027-02-01", end: "2027-02-03" },
  { festival: "nyokum", label: "Nyokum Yullo 2027", start: "2027-02-26", end: "2027-02-26" },
  { festival: "mopin", label: "Mopin 2027", start: "2027-04-05", end: "2027-04-05" },
  { festival: "sangken", label: "Sangken 2027", start: "2027-04-14", end: "2027-04-16" },
  { festival: "dree", label: "Dree 2027", start: "2027-07-05", end: "2027-07-07" },
];

async function main() {
  const { data: arunachal } = await sb.from("regions").select("id").eq("slug", "arunachal-pradesh").single();
  const { data: places } = await sb.from("places").select("id, slug");
  const placeId = new Map(places!.map((p) => [p.slug, p.id]));
  const { data: tribesExisting } = await sb.from("tribes").select("id, slug");
  const tribeId = new Map(tribesExisting!.map((t) => [t.slug, t.id]));

  // Tribes
  for (const t of TRIBES) {
    if (tribeId.has(t.slug)) { console.log(`[tribe] ${t.slug} — exists`); continue; }
    console.log(`[tribe] ${t.slug} — create (draft)`);
    if (!dry) {
      const { data: created, error } = await sb.from("tribes")
        .insert({ slug: t.slug, name: t.name, body: { who: t.who }, region_ids: [arunachal!.id], status: "draft" })
        .select("id").single();
      if (error) throw error;
      tribeId.set(t.slug, created.id);
    }
  }

  // Ziro field entry
  const { data: ziro } = await sb.from("places").select("id, body").eq("slug", "ziro").single();
  console.log(`[entry] ziro — field note ✓ story ✓ approach ${ZIRO_BODY.approach.legs.length} legs · flags ${ZIRO_BODY.ground_truth_flags.length}`);
  if (!dry) {
    const { error } = await sb.from("places").update({
      body: { ...((ziro!.body as Record<string, unknown>) ?? {}), ...ZIRO_BODY },
      permit_note: "ILP (foreigners: PAP). Talle Valley trek needs Forest Dept permission via the DFO at Hapoli — we arrange it.",
      ...(tribeId.get("apatani") ? { tribe_id: tribeId.get("apatani") } : {}),
    }).eq("id", ziro!.id);
    if (error) throw error;
  }

  // Festivals
  for (const f of FESTIVALS) {
    const { data: existing } = await sb.from("festivals").select("id").eq("slug", f.slug).maybeSingle();
    if (existing) { console.log(`[festival] ${f.slug} — exists`); continue; }
    console.log(`[festival] ${f.slug} — create (draft, month ${f.recurrence.month})`);
    if (!dry) {
      const { error } = await sb.from("festivals").insert({
        slug: f.slug,
        name: f.name,
        tribe_id: f.tribe ? (tribeId.get(f.tribe) ?? null) : null,
        place_id: f.placeSlug ? (placeId.get(f.placeSlug) ?? null) : null,
        region_id: arunachal!.id,
        recurrence: f.recurrence,
        body: {
          significance: f.significance,
          what_to_expect: f.what_to_expect,
          attend: f.attend,
          ...(f.flags?.length ? { ground_truth_flags: f.flags } : {}),
          verified: { on: "2026-07-14", source: "festival research fleet (9 gatherers, sourced)" },
        },
        seo: { description: f.significance.slice(0, 155) },
        status: "draft",
      });
      if (error) throw error;
    }
  }

  // Upcoming editions
  const { data: fests } = await sb.from("festivals").select("id, slug");
  const festId = new Map(fests!.map((x) => [x.slug, x.id]));
  for (const e of EVENTS) {
    const fid = festId.get(e.festival);
    if (!fid) { console.log(`[event] ${e.label} — festival missing, skipped`); continue; }
    const year = Number(e.start.slice(0, 4));
    const { data: existing } = await sb.from("events").select("id").eq("festival_id", fid).eq("year", year).maybeSingle();
    if (existing) { console.log(`[event] ${e.label} — exists`); continue; }
    console.log(`[event] ${e.label}: ${e.start} → ${e.end}`);
    if (!dry) {
      const { error } = await sb.from("events").insert({
        kind: "festival_edition", festival_id: fid, label: e.label,
        starts_on: e.start, ends_on: e.end, status: "scheduled",
      });
      if (error) throw error;
    }
  }

  console.log(dry ? "\nDRY RUN — nothing written." : "\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
