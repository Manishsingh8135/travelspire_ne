import type { FAQSection } from "@/types/faqs/faq";
import { anini2026Src } from "@/data/seo/image-seo-data";

// Evergreen destination hub: Anini, Dibang Valley.
// Every fact here should be verifiable on the ground — this page outlives the festival.

export const aniniMeta = {
  name: "Anini",
  region: "Dibang Valley",
  state: "Arunachal Pradesh",
  coordinates: { lat: "28.79806", lng: "95.90361" },
  elevationM: 1970,
  districtAreaKm2: "9,129",
  density: "< 1 person / km²",
  forestCover: "~80%",
  distanceFromRoingKm: 235,
  airport: "Dibrugarh (DIB)",
  bestMonths: "October – April",
  permit: "ILP — must mention Dibang Valley",
} as const;

export const aniniHeroImages = {
  desktop: {
    src: anini2026Src.rainbowGlamping,
    width: 4032,
    height: 3024,
  },
  mobile: {
    src: anini2026Src.benchBoardwalk,
    width: 3024,
    height: 4032,
  },
  alt: "Anini plateau in Dibang Valley — meadows, boardwalks and a Himalayan sky after rain",
} as const;

export const aniniHeroFacts = [
  { value: "1,970 m", label: "Altitude" },
  { value: "235 km", label: "From Roing · NH-313" },
  { value: "ILP", label: "Permit required" },
  { value: "Oct–Apr", label: "Best window" },
] as const;

export const aniniStats = [
  { value: "9,129", unit: "km²", label: "District area — Arunachal's largest" },
  { value: "<1", unit: "person / km²", label: "Among the least-inhabited places on Earth" },
  { value: "~80%", unit: "forest", label: "Land under forest cover" },
  { value: "0", unit: "dams", label: "On the rivers that run through it" },
] as const;

export interface AniniExperience {
  index: string;
  title: string;
  story: string;
  meta: string;
  image: string;
  imageAlt: string;
}

export const aniniExperiences: AniniExperience[] = [
  {
    index: "01",
    title: "Dri Valley",
    story:
      "The river Anini wakes up beside. A guided walk up the Dri is suspension bridges, cold green water and forests the Idu Mishmi have read for centuries.",
    meta: "Guided day walk · starts from town",
    image: "/images/places/anini-new/anini-new-portrait-4.jpg",
    imageAlt: "The Dri river valley near Anini",
  },
  {
    index: "02",
    title: "Pomo Grassland",
    story:
      "Horizon country. Rolling high meadows where the sky does most of the talking — the single most photogenic half-day out of Anini.",
    meta: "Half day · best at first light",
    image: "/images/places/pomo/pomo3.JPG",
    imageAlt: "The rolling grassland horizon at Pomo",
  },
  {
    index: "03",
    title: "The Waterfall Circuit",
    story:
      "A string of roadside and short-trail falls around the plateau — easy half-day spots with route hints from people who actually drive past them weekly.",
    meta: "Half day · monsoon-fed, fullest Sep–Nov",
    image: anini2026Src.mistyFalls,
    imageAlt: "Multi-tiered waterfall dropping through mist and forest near Anini, Dibang Valley",
  },
  {
    index: "04",
    title: "Kiwi Orchards",
    story:
      "India's hidden kiwi country. Mountain orchards framed by Himalayan ridgelines — visit a working orchard and taste what altitude does to fruit.",
    meta: "1–2 hrs · harvest visits in autumn",
    image: "/images/places/anini-new/anini-new-portrait-5.jpg",
    imageAlt: "Orchard slopes around Anini under high ridgelines",
  },
  {
    index: "05",
    title: "Dibang Wildlife Sanctuary",
    story:
      "One of India's least-disturbed wildernesses — clouded leopard, Mishmi takin, red panda country. Fringes are accessible with permits and a local guide.",
    meta: "Full day · permits + guide required",
    image: "/images/places/anini-new/anini-new-portrait-1.jpg",
    imageAlt: "Dense montane forest in Dibang Valley",
  },
  {
    index: "06",
    title: "Idu Mishmi Village Walks",
    story:
      "Slow, guide-accompanied walks through the villages of the valley's custodians — bamboo craft, forest knowledge, and food you'll think about for years.",
    meta: "Half day · always with a community guide",
    image: "/images/places/anini-new/anini-new-portrait-7.jpg",
    imageAlt: "Village country in the hills around Anini",
  },
  {
    index: "07",
    title: "Seven Lakes Trek",
    story:
      "A guided walk to the tarns above Anini — flooded meadows, pine forest and still alpine water. A proper trek day, not a viewpoint stop. Fitness required; we only run it with a local guide.",
    meta: "Full day · guided only · weather-dependent",
    image: anini2026Src.sevenLakesSign,
    imageAlt:
      "Travellers at the official Anini Seven Lakes Trek trailhead sign in Dibang Valley",
  },
];

// Indicative elevation profile of NH-313, Roing → Anini.
// Altitudes at named points are published figures; the curve between is indicative.
export const aniniRouteProfile = [
  { km: 0, name: "Roing", elev: 390, note: "Base town — fuel, cash, network" },
  { km: 22, name: "Tiwarigaon", elev: 700, note: "Tea stop before the climb" },
  { km: 48, name: "Coffee House", elev: 2200, note: "Last comfort halt" },
  { km: 56, name: "Mayodia Pass", elev: 2655, note: "Route high point" },
  { km: 65, name: "65 KM", elev: 2350, note: "Lunch halt" },
  { km: 90, name: "Hunli", elev: 1240, note: "First town after the pass" },
  { km: 140, name: "Angolin", elev: 1050, note: "Slide-zone corridor" },
  { km: 175, name: "Etalin", elev: 800, note: "Designated lunch stop" },
  { km: 235, name: "Anini", elev: 1968, note: "The plateau reveal" },
] as const;

export const aniniSeasons = [
  { month: "Jan", tone: "good", label: "Cold, clear mornings" },
  { month: "Feb", tone: "good", label: "Crisp, snow on high ridges" },
  { month: "Mar", tone: "best", label: "Clear skies, orchids" },
  { month: "Apr", tone: "best", label: "Peak visibility" },
  { month: "May", tone: "caution", label: "Haze, pre-monsoon showers" },
  { month: "Jun", tone: "avoid", label: "Monsoon arrives" },
  { month: "Jul", tone: "avoid", label: "Heavy rain, slide risk" },
  { month: "Aug", tone: "avoid", label: "Peak monsoon" },
  { month: "Sep", tone: "caution", label: "Late monsoon · festival month" },
  { month: "Oct", tone: "best", label: "Post-monsoon clarity" },
  { month: "Nov", tone: "best", label: "Golden light, kiwi harvest" },
  { month: "Dec", tone: "good", label: "Cold, quiet, Mayodia snow" },
] as const;

export const aniniStays = [
  {
    type: "Idu Mishmi homestays",
    body: "The real way to sleep in Anini — family-run, meals included, stories free. We book the ones we've personally stayed in.",
  },
  {
    type: "Government Circuit House",
    body: "Basic but dependable rooms booked through the DC office. Reserve well in advance — inventory is tiny.",
  },
  {
    type: "Curated campsites",
    body: "Star-first camping on private sites around the plateau, with proper bedding and a kitchen crew.",
  },
] as const;

export const aniniPractical = [
  { label: "Permit", value: "ILP with 'Dibang Valley' mentioned — we arrange it" },
  { label: "Cash", value: "Carry enough — Anini has banks, but cash and power can fail" },
  { label: "Network", value: "Patchy in town, long dead zones on the road — go offline-first" },
  { label: "Fuel", value: "Tank full in Roing; don't count on stock beyond it" },
  { label: "Health", value: "Basic pharmacy in town — carry personal medication" },
  { label: "Driving", value: "Daylight only on NH-313; depart Roing by 6 AM" },
  { label: "Etiquette", value: "Ask before photographing people or homes" },
  { label: "Pack", value: "Warm layer, rain shell, power bank, torch" },
] as const;

// Gallery: anini-new (Anini plateau) + pomo (Pomo Grassland) only — captions name real places.
export const aniniFrames = [
  { src: anini2026Src.sevenLakesSign, alt: "Travellers at the Anini Seven Lakes Trek trailhead sign in Dibang Valley", caption: "Seven Lakes Trek" },
  { src: anini2026Src.emuliSign, alt: "Emuli Grassland sign above Anini with mountain ridges behind", caption: "Emuli Grassland" },
  { src: anini2026Src.rainbowGlamping, alt: "Double rainbow over mountains, sunflowers and glamping tents at Anini", caption: "After the rain" },
  { src: anini2026Src.pomoRidgeTrail, alt: "Trekkers on a grassy ridge trail on the Pomo route near Anini", caption: "Pomo trail" },
  { src: anini2026Src.sevenLakesTarn, alt: "Alpine tarn on the Seven Lakes trek near Anini, Dibang Valley", caption: "Seven Lakes" },
  { src: "/images/places/anini-new/anini-new-landscape-13.jpeg", alt: "The high plateau at Anini between the Dri and Mathun rivers", caption: "Anini Plateau" },
  { src: anini2026Src.cascadeFalls, alt: "Wide cascade waterfall on the Anini waterfall circuit, Dibang Valley", caption: "Waterfall circuit" },
  { src: anini2026Src.aFrameCabins, alt: "A-frame cabins under mist and a mountainside waterfall at Anini", caption: "Valley stays" },
] as const;

export const aniniFaqSection: FAQSection = {
  title: "Anini — practical questions",
  description:
    "Answered by the team that drives the Roing–Anini road every week. For festival-specific questions, see the Anini Winter Fest page.",
  faqs: [
    {
      id: "anini-worth",
      question: "Is Anini worth visiting without the festival?",
      answer:
        "Honestly, the festival is just the excuse — the valley is the main event. Anini is the headquarters of India's least-visited district: waterfalls, high grasslands, kiwi orchards, Idu Mishmi villages and some of the darkest night skies in the country. Travellers who come outside festival season often have entire viewpoints to themselves.",
    },
    {
      id: "anini-days",
      question: "How many days do I need for Anini?",
      answer:
        "Minimum 4–5 days door-to-door from Dibrugarh: one day to Roing, one long day up to Anini, two full days in the valley, one day back. Add 2–4 days for the valley samplers (Dri, Aeyo, Pomo, waterfalls). The big treks — Seven Lakes, Dri Valley, Athu Popu — are separate 7–11 day expeditions, not add-ons.",
    },
    {
      id: "anini-permit",
      question: "Do I need a permit for Anini?",
      answer:
        "Yes — an Inner Line Permit with 'Dibang Valley' explicitly mentioned, checked at multiple posts on the way up. It takes 15–30 minutes on the Arunachal eILP portal. Every Travelspire journey includes permit assistance; foreign nationals need a Protected Area Permit instead.",
    },
    {
      id: "anini-reach",
      question: "How do I reach Anini?",
      answer:
        "Fly to Dibrugarh (DIB), drive 5–6 hours to Roing, then 235 km on NH-313 over the 2,655 m Mayodia Pass to Anini — 6–7 hours in dry conditions, 8–10 in festival season. SUVs and 4WDs only, daylight driving only, tank full in Roing. Or skip all of that planning and ride with us.",
    },
    {
      id: "anini-when",
      question: "When is the best time to visit Anini?",
      answer:
        "October to April is the honest window: October–November brings post-monsoon clarity and golden light, December–February is cold and quiet with snow on the high ridges (and sometimes on Mayodia), March–April is peak visibility. Avoid the June–August monsoon. September is festival month — beautiful but wet; travel with people who know the road.",
    },
    {
      id: "anini-safe",
      question: "Is Anini safe for solo travellers and women?",
      answer:
        "The valley itself is one of India's safest, most close-knit regions — the real risk is the road, not the people. Travel in daylight, in a proper vehicle, with a driver who knows NH-313. In town, normal mountain-town courtesy applies: ask before photographing people, and take a local guide for village visits.",
    },
    {
      id: "anini-stay",
      question: "Where can I stay in Anini?",
      answer:
        "Three honest options: Idu Mishmi homestays (best experience — meals included), the government Circuit House (book through the DC office, limited rooms), and curated campsites around the plateau. Festival weekend sells everything out weeks ahead — lock stays the moment your dates are fixed.",
    },
  ],
};

export const aniniNextPlaces = [
  {
    name: "Dambuk",
    blurb: "Orange orchards and the Dibang riverbanks — Lower Dibang's golden bowl.",
    href: "/tours/dambuk-anini-ofam",
    image: "/images/places/dambuk/Dambuk_1.jpg",
  },
  {
    name: "Dong Valley",
    blurb: "Where India sees its first sunrise — the far eastern frontier.",
    href: "/tours/dong-valley-expedition",
    image: "/images/places/dong-new/dong-new-landscape-8.jpg",
  },
  {
    name: "Mechuka",
    blurb: "Meadows, monasteries and the Siyom river in West Siang.",
    href: "/tours/mechuka-expedition",
    image: "/images/places/mechuka-new/Mechuka2026/mechuka-valley-ridge-viewpoint-town.jpg",
  },
  {
    name: "Ziro Valley",
    blurb: "Paddy-field amphitheatres and India's most loved indie festival.",
    href: "/ziro-music-festival-2026",
    image: "/images/places/ziro-new/ziro-new-landscape-1.jpeg",
  },
] as const;
