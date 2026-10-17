// Hornbill Festival — the evergreen hub at /hornbill-festival.
//
// Sources (checked 16 Oct 2026): Tourism Nagaland, the Nagaland ILP portal
// and Home Department notifications, DIPR Nagaland press releases, and news
// reports (Morung Express, Eastern Mirror, EastMojo, Tribune, ANI/IANS).
// Anything not yet announced for 2026 is labelled with the year it comes
// from. When the 2026 entry fee, programme or PAP decision is announced,
// update `hornbillStatus`, the matching FAQ answers and `hornbillMeta.checked`.

export const hornbillMeta = {
  url: "/hornbill-festival",
  edition: 27,
  year: 2026,
  start: "2026-12-01",
  end: "2026-12-10",
  datesLabel: "1–10 Dec 2026",
  venue: "Naga Heritage Village, Kisama",
  checked: "16 October 2026",
  checkedIso: "2026-10-16",
  geo: { lat: 25.6236, lng: 94.1186 },
  packagesHref: "/tours/hornbill-festival-2026",
} as const;

export const hornbillImages = {
  hero: {
    src: "/images/places/hornbill/Hornbill_3.PNG",
    alt: "A Naga tribal troupe in red shawls and feathered headgear crossing the main arena at Kisama during the Hornbill Festival",
  },
  dance: {
    src: "/images/places/hornbill/Hornbill_2.WEBP",
    alt: "Naga warriors in hornbill-feather headgear leaping mid-dance in the arena at Kisama",
  },
  dzukou: {
    src: "/images/places/hornbill/Dzoku_3.jpg",
    alt: "Tents above the rolling hills of Dzükou Valley at sunset, on the Nagaland–Manipur border",
  },
} as const;

/* What is confirmed for this edition and what is still awaited. The page
   shows this as a dated status board, so it must stay honest. */
export const hornbillStatus: { label: string; value: string; confirmed: boolean }[] = [
  { label: "Dates", value: "1–10 December 2026, the 27th edition", confirmed: true },
  { label: "Venue", value: "Naga Heritage Village, Kisama, 12 km south of Kohima", confirmed: true },
  { label: "Permit for Indians", value: "Nagaland ILP, ₹200 for 30 days, online only", confirmed: true },
  { label: "Entry ticket", value: "₹150 a day in 2025; the 2026 rate is usually announced in late November", confirmed: false },
  { label: "Partner countries", value: "To be decided by the state committee", confirmed: false },
  { label: "Day-wise programme", value: "Published close to the festival", confirmed: false },
  { label: "PAP waiver for foreigners", value: "Waived for 1–10 Dec in 2025; not yet announced for 2026", confirmed: false },
];

/* Crowd forecast for 2026, read off the Tourism Department's daily counts
   for 2025 (opening 22,508 · Sat 22,786 · Sun 24,923 · closing 33,535;
   midweek days 15–19k). 2025's weekend fell on days 6–7; 2026's falls on
   days 5–6. */
export type CrowdLevel = "busiest" | "busy" | "steady" | "calmer";

export const hornbillDays: { date: string; day: string; crowd: CrowdLevel; note: string }[] = [
  { date: "1", day: "Tue", crowd: "busy", note: "Opening day, Statehood Day" },
  { date: "2", day: "Wed", crowd: "steady", note: "" },
  { date: "3", day: "Thu", crowd: "calmer", note: "" },
  { date: "4", day: "Fri", crowd: "steady", note: "" },
  { date: "5", day: "Sat", crowd: "busy", note: "Weekend" },
  { date: "6", day: "Sun", crowd: "busy", note: "Weekend" },
  { date: "7", day: "Mon", crowd: "calmer", note: "" },
  { date: "8", day: "Tue", crowd: "calmer", note: "" },
  { date: "9", day: "Wed", crowd: "steady", note: "Carnival parade in Kohima (2025)" },
  { date: "10", day: "Thu", crowd: "busiest", note: "Closing day and bonfire" },
];

export const hornbillHappenings: { title: string; story: string; meta?: string }[] = [
  {
    title: "Tribal performances at Unity Plaza",
    story:
      "The heart of it. Each tribe's troupe takes the main arena in turn with war dances, harvest songs, folk games and log-drum calls. Sessions run morning and afternoon, each hosted by a different minister and chief guest.",
    meta: "Daily, from mid-morning",
  },
  {
    title: "The morungs and Naga food",
    story:
      "Every tribe keeps a traditional morung (dormitory house) in the village, and each one cooks: smoked pork with bamboo shoot, axone, sticky rice steamed in leaves. In 2025 the state capped prices at ₹350 a plate.",
    meta: "All day",
  },
  {
    title: "Hornbill Music Festival",
    story:
      "Evening sets at Kisama from Naga bands and international acts. In 2025 the line-up came from Ireland, Scotland, Japan, South Korea and France. The old Hornbill Rock Contest ended in 2019.",
    meta: "From about 5 PM",
  },
  {
    title: "Kohima Night Carnival",
    story:
      "Back in town, Kohima turns into a food and market fair run by the Kohima Chamber of Commerce: stalls from local start-ups and self-help groups, and a carnival parade on one night.",
    meta: "5–9 PM daily",
  },
  {
    title: "Naga wrestling and the King Chilli contest",
    story:
      "The International Naga Wrestling Championship is held at Kigwema next door, on 4 December in 2025, with a category for visitors. The King Chilli and pineapple eating contests are a crowd favourite.",
    meta: "Dates in the official programme",
  },
  {
    title: "Crafts, the WWII Museum and the closing bonfire",
    story:
      "Made-in-Nagaland weaving, beadwork and bamboo craft at the Bamboo Pavilion. The Second World War Museum inside the village tells the story of the 1944 Battle of Kohima. On 10 December the festival closes with a bonfire at Unity Plaza.",
    meta: "Bonfire on the evening of 10 Dec",
  },
];

// nagaland.gov.in lists 17 recognised tribes; Tikhir was recognised in 2022.
export const nagaTribes = [
  "Angami",
  "Ao",
  "Chakhesang",
  "Chang",
  "Kachari",
  "Khiamniungan",
  "Konyak",
  "Kuki",
  "Lotha",
  "Phom",
  "Pochury",
  "Rengma",
  "Sangtam",
  "Sumi",
  "Tikhir",
  "Yimkhiung",
  "Zeliang",
] as const;

export const hornbillRoute: { title: string; body: string }[] = [
  {
    title: "Fly or take the train to Dimapur",
    body: "Dimapur (DMU) is the nearest airport, with most flights from Kolkata and Guwahati, and the nearest main railway station. There is no train to Kohima yet; the line is due around 2029.",
  },
  {
    title: "Get your ILP before you leave home",
    body: "Dimapur is inside the Inner Line too, so you need the permit from the moment you leave the airport or station. Only passengers changing trains or flights are exempt.",
  },
  {
    title: "Dimapur to Kohima: about 74 km",
    body: "Two to three hours normally, longer in festival week. The four-lane highway is still being built (now due June 2027), so expect stretches of roadworks.",
  },
  {
    title: "Kohima to Kisama: about 12 km",
    body: "Around 40 minutes in festival traffic. In 2025 the state bus ran a shuttle from 8 AM to 10 PM: ₹50 from PHQ Junction, ₹80 from the ISBT. In 2024 private cars parked at Kigwema, with a free shuttle to the gate.",
  },
];

export const hornbillPermits: { label: string; value: string }[] = [
  { label: "Indian visitors", value: "Nagaland ILP, ₹200 for 30 days, applied for at ilp.nagaland.gov.in. Offline applications stopped on 31 Dec 2024." },
  { label: "How long", value: "Usually approved within about four hours on a working day. Nobody approves on Sundays, so apply on a weekday." },
  { label: "Documents", value: "A recent photo and one ID: Aadhaar, PAN, voter ID, bank passbook or ration card. JPG or PNG, under 300 KB." },
  { label: "Foreign visitors", value: "A ₹500 Foreigner ILP plus a Protected Area Permit. The PAP was waived for the festival dates in 2025; no 2026 waiver has been announced." },
  { label: "Entry ticket", value: "₹150 per person per day in 2025, the same for everyone, sold at the gate. We update this page when the 2026 rate is out." },
  { label: "At check-in", value: "Hotels and homestays report guests from outside Nagaland to the police, so keep your ILP and photo ID to hand." },
];

export const hornbillWeather: { label: string; value: string }[] = [
  { label: "Days", value: "Around 17 °C in Kohima, dry and clear. December averages under one rainy day." },
  { label: "Nights", value: "Around 5 °C, with frost on some mornings. Colder in Dzükou." },
  { label: "Wear", value: "Layers, a warm jacket for evenings, comfortable shoes for a day on your feet, and trekking shoes for Dzükou." },
  { label: "Money", value: "Carry cash for morung food, shuttles and small stalls. UPI slows down when the network is crowded." },
  { label: "Alcohol", value: "Nagaland is officially dry under the 1989 prohibition law. Don't plan around buying a drink." },
  { label: "Photos", value: "Ask before close portraits, stay out of the arena during performances, and treat the morungs as people's spaces." },
];

export const hornbillStays: { type: string; body: string }[] = [
  {
    type: "Kohima hotels and homestays",
    body: "The most choice and the easiest evenings at the Night Carnival, at the cost of a daily ride to Kisama. Tourism Nagaland publishes an approved homestay list. Rates climb sharply in the first week.",
  },
  {
    type: "Kigwema village homestays",
    body: "Walking distance from the venue, in a working Angami village. There are few rooms and they go first, so book as soon as your dates are fixed.",
  },
  {
    type: "Festival campsites",
    body: "Tented camps open around Kisama for the festival, with bonfires and shared meals. It is the most atmospheric way to stay, and our packages start here, from ₹1,799.",
  },
];

export const hornbillDzukou = {
  paragraphs: [
    "Dzükou is the valley most people pair with Hornbill: rolling grassland at about 2,450 m on the Nagaland–Manipur border, a few hours' climb from Viswema or Jakhama, south of Kisama. In December the grass turns gold and the nights are far colder than Kohima's.",
    "The rules have changed. Since October 2025 every trekker must go with a guide registered with the Southern Angami Youth Organisation, which manages the valley, and nobody may start in or out after 3 PM in winter.",
    "Dry-season fires closed the valley in December 2025 and again in January–February 2026. We watch for closures, and if Dzükou shuts we swap in Khonoma village or a Japfü day so your trip still holds.",
  ],
} as const;

export const hornbillNearby: { title: string; story: string; meta: string }[] = [
  {
    title: "Kohima War Cemetery",
    story:
      "On Garrison Hill, where the 1944 battle turned. 1,420 Commonwealth graves and a memorial to 917 Hindu and Sikh soldiers, under the epitaph “When you go home, tell them of us…”",
    meta: "In Kohima town · 1 hour",
  },
  {
    title: "Khonoma",
    story:
      "An Angami village of terraced fields and stone gateways, known for banning hunting across its forest in 1998. A half day of walking, and the best counterpoint to festival crowds.",
    meta: "About 20 km from Kohima · half day",
  },
  {
    title: "Tuophema",
    story:
      "A village-run tourist settlement of traditional cottages, one for each of its twelve clans. Quiet, and good for a night after the festival.",
    meta: "About 40 km north of Kohima",
  },
  {
    title: "Japfü Peak",
    story:
      "Nagaland's second-highest summit, climbed from Kigwema beside the festival grounds. A long, steep day; most people start before dawn.",
    meta: "From Kigwema · about 5 hours up",
  },
];

export const hornbillFaqs: { question: string; answer: string }[] = [
  {
    question: "When is the Hornbill Festival 2026?",
    answer:
      "1 to 10 December 2026, the 27th edition. It always opens on 1 December, Nagaland Statehood Day, and runs for ten days.",
  },
  {
    question: "Where is the Hornbill Festival held?",
    answer:
      "At the Naga Heritage Village in Kisama, about 12 km south of Kohima on the Kohima–Imphal highway (NH-29). The nearest airport and main railway station are in Dimapur, about 85 km away.",
  },
  {
    question: "Do I need a permit for the Hornbill Festival?",
    answer:
      "Yes. Indian visitors from outside Nagaland need an Inner Line Permit: ₹200 for 30 days, applied for online at ilp.nagaland.gov.in. Dimapur is inside the Inner Line too. Foreign visitors need a ₹500 Foreigner ILP plus a Protected Area Permit unless a festival waiver is announced, as it was in 2025.",
  },
  {
    question: "What is the Hornbill Festival ticket price?",
    answer:
      "In 2025 entry was ₹150 per person per day, the same for locals, Indian visitors and foreigners, sold at the gate. The 2026 rate is usually announced in late November, and we update this page when it is.",
  },
  {
    question: "Which days are best to visit?",
    answer:
      "For space to move and photograph, go midweek. In 2026 that means 3, 7 or 8 December. For atmosphere, the opening day (1 Dec) and the weekend (5–6 Dec) are packed. The closing day on 10 December is the busiest of all: 33,535 people came on the last day in 2025.",
  },
  {
    question: "How many days do I need?",
    answer:
      "Two full days at Kisama covers the performances, the morungs and an evening of music. Add a day for Kohima and Khonoma, and two for the Dzükou trek. Four to five days in all is the sweet spot.",
  },
  {
    question: "How do I reach Kisama from Guwahati?",
    answer:
      "Take a flight or train to Dimapur, then drive about 74 km to Kohima and 12 km on to Kisama. Our packages pick up from Dimapur or Kohima, so you only need to get yourself to Dimapur.",
  },
  {
    question: "How many tribes take part?",
    answer:
      "Nagaland has 17 recognised tribes, and all of them perform; the Tikhir became the 17th in 2022. In 2025, 18 cultural troupes took part, including the Garo. Older pages that say 16 are out of date.",
  },
  {
    question: "Why is it called the Hornbill Festival?",
    answer:
      "The great hornbill is revered across Naga folklore, and its feathers crown the headgear of many tribes. The state named the festival after it when it began in December 2000, bringing every tribe's festival to one place. That is why it is called the Festival of Festivals.",
  },
  {
    question: "Can I camp at the Hornbill Festival?",
    answer:
      "Yes. Tented campsites open around Kisama and Kohima for the festival, with bonfires and shared meals. Our Hornbill camping package starts at ₹1,799 per person and includes the tent and breakfast.",
  },
  {
    question: "Is the Hornbill Festival safe, including for solo women?",
    answer:
      "Yes, by the standards of any large festival. Families come in big numbers, and tourist police are posted in Kohima and Dimapur during festival week. The usual sense applies: plan your ride back before dark, and stay somewhere that has looked after travellers before.",
  },
  {
    question: "Can I do the Dzükou Valley trek during Hornbill?",
    answer:
      "Usually, yes. Since October 2025 a registered local guide is mandatory, and no trekking starts after 3 PM in winter. Fires closed the valley in December 2025, so we always keep a backup day planned.",
  },
  {
    question: "Is this the Hornbill festival in Karnataka?",
    answer:
      "No. This page is about the Hornbill Festival of Nagaland, the cultural festival at Kisama. Hornbill events in Karnataka are separate bird-watching festivals.",
  },
];
