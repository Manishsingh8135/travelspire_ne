import type { FAQSection } from "@/types/faqs/faq";
import type { Tour } from "@/types/tours/tour";
import type { Frame, FrameTone } from "@/lib/media";
import {
  mechuka2026Images,
  mechuka2026Src,
  anini2026Src,
} from "@/data/seo/image-seo-data";

/**
 * Canonical product record for the 12N/13D circuit.
 *
 * Keep commercial truth here: the dedicated page, All Tours card, WhatsApp
 * links and structured data all read from these exports. Pomo is deliberately
 * not included in the base package. The supplied sales sheet named it as an
 * inclusion but did not schedule the acclimatisation, Chigu night or 12-hour
 * trek day that the expedition requires. It is therefore offered only as a
 * separately quoted extension.
 */
export const circuitMeta = {
  slug: "mechuka-dong-anini-tour-package",
  url: "https://travelspirene.com/tours/mechuka-dong-anini-tour-package",
  title: "Mechuka · Dong · Anini",
  shortTitle: "Mechuka + Dong + Anini",
  duration: "12 Nights / 13 Days",
  season: "October – April",
  route: "Dibrugarh · Aalo · Mechuka · Namsai · Walong · Dong · Roing · Anini",
  fromPrice: 37499,
  updated: "2026-08-20",
  published: "2026-08-20",
  operator: "Travelspire North-East",
  focusKeyphrase: "Mechuka Dong Anini tour package",
} as const;

export const circuitHero = {
  desktop: {
    src: "/images/tours/mechuka-dong-anini/mechuka-dong-anini-tour-hero.jpg",
    width: 1600,
    height: 900,
    alt: "Mountain valley, cottages and a journey vehicle in Mechuka, Arunachal Pradesh",
  },
  mobile: {
    src: mechuka2026Src.riverViewpoint,
    width: 3024,
    height: 4032,
    alt: "Traveller at a riverside railing overlooking the Yargyap Chu river and mist-covered mountains in Mechuka Valley, Arunachal Pradesh",
  },
} as const;

export const circuitFacts = [
  { value: "13", unit: "days", label: "12 nights on the road" },
  { value: "3", unit: "regions", label: "one continuous circuit" },
  { value: "02:00", unit: "start", label: "Dong sunrise morning" },
  { value: "4–6", unit: "pax", label: "group pricing" },
] as const;

export const circuitIntro = {
  kicker: "The grand circuit",
  title: "Three journeys, joined properly.",
  lead: "This Mechuka Dong Anini tour package is not a collection of disconnected day trips. It is a 13-day crossing of Arunachal Pradesh: first the monastery valley of Mechuka, then the far-eastern road to Walong and Dong, and finally the river country around Anini.",
  body: [
    "The itinerary uses Aalo, Namsai, Roing and Walong as real staging nights, not invisible transfers. That matters on a route this long: it keeps the drive sequence readable, preserves time at the destinations, and makes the 02:00 Dong start possible without pretending every day is easy.",
    "Expect mountain roads, simple hotels and homestays, early departures and plans that respond to weather. In return, you get three very different Arunachal landscapes in one privately transported journey from Dibrugarh back to Dibrugarh.",
  ],
  truths: [
    "A long overland expedition with several full driving days",
    "Private transport, local stays, breakfast and dinner included",
    "A guided pre-dawn Dong experience and permit handling",
    "Flexible sequencing when roads, weather or local access require it",
  ],
} as const;

export const circuitChapters: Array<{
  id: string;
  days: string;
  place: string;
  eyebrow: string;
  title: string;
  description: string;
  frame: Frame;
}> = [
  {
    id: "mechuka",
    days: "Days 01–05",
    place: "Mechuka",
    eyebrow: "The western valley",
    title: "Monasteries, high roads and time to stay.",
    description:
      "Reach Mechuka through Aalo, keep two complete exploration days, then return without compressing the valley into a rushed turnaround.",
    frame: {
      src: mechuka2026Src.goldenBuddha,
      alt: "Golden seated Buddha statue on an ornate red and gold pedestal at dusk in Mechuka, Arunachal Pradesh",
      width: 3024,
      height: 4032,
      place: "Mechuka",
      tone: "brass",
    },
  },
  {
    id: "dong",
    days: "Days 06–09",
    place: "Dong & Walong",
    eyebrow: "The far east",
    title: "Leave before dawn. Watch the valley wake.",
    description:
      "Cross through Namsai and Hayuliang to Walong, then begin the Dong morning before sunrise and continue to Kaho with a local guide.",
    frame: {
      src: "/images/tours/mechuka-dong-anini/dong-walong-mountain-village.jpg",
      alt: "Mountain village beneath high ridges in the Dong and Walong region",
      width: 1198,
      height: 1600,
      place: "Dong & Walong",
      tone: "ink",
    },
  },
  {
    id: "anini",
    days: "Days 10–13",
    place: "Anini",
    eyebrow: "The Dibang finish",
    title: "Rivers, grassland and three unhurried nights.",
    description:
      "Climb from Roing over Mayodia, then use Anini as a base for the Dri-side country, Matu, Emuli, Karu and a final homestay bonfire.",
    frame: {
      src: anini2026Src.mistyFalls,
      alt: "Multi-tiered waterfall dropping through mist and forest near Anini in Dibang Valley",
      width: 4284,
      height: 5712,
      place: "Anini",
      tone: "moss",
    },
  },
];

const mechukaArchiveTones: FrameTone[] = [
  "moss",
  "ink",
  "stone",
  "brass",
  "ember",
  "moss",
  "brass",
  "ink",
];

const mechukaFrameSize: Record<string, { width: number; height: number }> = {
  [mechuka2026Src.winterSnow]: { width: 5712, height: 4284 },
  [mechuka2026Src.homestayCabins]: { width: 3072, height: 4780 },
};

export const circuitMechukaArchive: Frame[] = mechuka2026Images.map(
  (image, index) => ({
    src: image.src,
    alt: image.alt,
    width: mechukaFrameSize[image.src]?.width ?? 3024,
    height: mechukaFrameSize[image.src]?.height ?? 4032,
    place: "Mechuka",
    tone: mechukaArchiveTones[index] ?? "moss",
  }),
);

export type CircuitDay = {
  day: number;
  chapter: "mechuka" | "dong" | "anini";
  from: string;
  to: string;
  title: string;
  departure?: string;
  journey?: string;
  summary: string;
  stops: string[];
  stay: string;
  note?: string;
};

export const circuitDays: CircuitDay[] = [
  {
    day: 1,
    chapter: "mechuka",
    from: "Dibrugarh",
    to: "Aalo",
    title: "Across the Brahmaputra to Aalo",
    journey: "Approx. 250 km · about 6 hours",
    summary:
      "Start early from Dibrugarh and cross the Bogibeel Bridge before continuing into Arunachal Pradesh for the first staging night.",
    stops: ["Bogibeel Bridge", "Roadside meal halts", "Aalo town"],
    stay: "Aalo · hotel or homestay",
  },
  {
    day: 2,
    chapter: "mechuka",
    from: "Aalo",
    to: "Mechuka",
    title: "Enter the Mechuka Valley",
    summary:
      "Take the mountain road from Aalo, cross the Yorlung bridge corridor and arrive with time to settle in and walk through town.",
    stops: ["Yorlung bridge", "Mechuka Valley arrival", "Local market"],
    stay: "Mechuka · hotel or homestay",
    note: "The Aalo–Mechuka road is weather-sensitive; the day is kept flexible.",
  },
  {
    day: 3,
    chapter: "mechuka",
    from: "Mechuka",
    to: "Mechuka",
    title: "Old Mechuka, monasteries and bridges",
    summary:
      "A full local day for the valley’s Buddhist landmarks, viewpoints and the places that give the town its character.",
    stops: [
      "Ancient monastery",
      "108 stupas",
      "Dorjeeling zero point",
      "Gautse hanging bridge",
      "Buddha Park",
      "New gompa and town viewpoint",
      "Prayer wheel",
    ],
    stay: "Mechuka · hotel or homestay",
  },
  {
    day: 4,
    chapter: "mechuka",
    from: "Mechuka",
    to: "Lamang corridor",
    title: "The high road towards Lamang Pass",
    summary:
      "Follow the border road as far as access, weather and permits allow, with a series of short stops rather than one hurried destination chase.",
    stops: [
      "Lamang Pass corridor",
      "Helicopter crash point",
      "Last café stop",
      "Jang Bahadur waterfall",
      "Gurudwara",
      "Hanuman Camp",
      "Lucky stone",
    ],
    stay: "Mechuka · hotel or homestay",
    note: "The furthest point reached is controlled by local access and security conditions on the day.",
  },
  {
    day: 5,
    chapter: "mechuka",
    from: "Mechuka",
    to: "Aalo",
    title: "Return to Aalo",
    summary:
      "Leave the valley for Aalo, then keep the evening light with a local market walk and time at the town’s café or chat-house area.",
    stops: ["Mechuka–Aalo road", "Aalo local market", "Evening café stop"],
    stay: "Aalo · hotel or homestay",
  },
  {
    day: 6,
    chapter: "dong",
    from: "Aalo",
    to: "Namsai / Chowkham",
    title: "A transit day with a golden finish",
    summary:
      "Cross east for the next chapter of the circuit and finish around Namsai or Chowkham with an unhurried visit to the Golden Pagoda.",
    stops: [
      "Eastbound road journey",
      "Golden Pagoda (Kongmu Kham)",
      "Rest evening",
    ],
    stay: "Namsai or Chowkham · hotel or homestay",
  },
  {
    day: 7,
    chapter: "dong",
    from: "Namsai",
    to: "Walong",
    title: "Follow the Lohit country to Walong",
    summary:
      "A long eastern drive through Hayuliang into Anjaw district, arriving in Walong early enough to prepare for the pre-dawn start.",
    stops: ["Hayuliang lunch halt", "Anjaw mountain road", "Walong arrival"],
    stay: "Walong · guesthouse or homestay",
  },
  {
    day: 8,
    chapter: "dong",
    from: "Walong",
    to: "Dong / Kaho",
    title: "Dong before sunrise, Kaho after breakfast",
    departure: "Around 02:00 · guide confirms the final time",
    summary:
      "Begin in darkness for the guided Dong sunrise walk, then return to the valley for the war memorial and the border settlements around Kaho.",
    stops: [
      "Dong sunrise walk",
      "Walong war memorial",
      "Kaho village",
      "Dong suspension footbridge",
    ],
    stay: "Dong · local stay",
    note: "Sunrise visibility is weather-dependent and cannot be guaranteed.",
  },
  {
    day: 9,
    chapter: "dong",
    from: "Dong / Walong",
    to: "Roing",
    title: "Back west to the Dibang gateway",
    summary:
      "Retrace the Anjaw road with a meal stop in Hayuliang, then continue to Roing for a proper night before climbing to Anini.",
    stops: ["Hayuliang lunch halt", "Lohit valley road", "Roing"],
    stay: "Roing · hotel or homestay",
  },
  {
    day: 10,
    chapter: "anini",
    from: "Roing",
    to: "Anini",
    title: "Over Mayodia into Dibang Valley",
    summary:
      "Climb from the plains into the Mishmi Hills, cross Mayodia and continue through Hunli to the Anini plateau.",
    stops: ["Mayodia Pass", "Hunli road corridor", "Anini plateau arrival"],
    stay: "Anini · homestay",
    note: "This is a mountain-road day; arrival time moves with fog, rain and road work.",
  },
  {
    day: 11,
    chapter: "anini",
    from: "Anini",
    to: "Dri-side valleys",
    title: "Waterfall country below Anini",
    summary:
      "Spend the day around the lower valleys and river country, choosing the exact set of stops according to road access and daylight.",
    stops: [
      "Dree Afra",
      "Chigu",
      "Mawuando",
      "Dri River",
      "Matu waterfall",
      "Acheso",
      "Matu, if conditions allow",
    ],
    stay: "Anini · homestay",
  },
  {
    day: 12,
    chapter: "anini",
    from: "Anini",
    to: "Emuli & Karu",
    title: "The high meadows and the last fire",
    departure: "Around 09:00",
    summary:
      "A gentler final exploration day across the accessible grasslands above town, followed by the market and a bonfire at the homestay.",
    stops: [
      "Emuli Grassland",
      "Valley viewpoints",
      "Karu Grassland",
      "Karu Viewpoint",
      "Anini market",
      "Homestay bonfire",
    ],
    stay: "Anini · homestay",
  },
  {
    day: 13,
    chapter: "anini",
    from: "Anini",
    to: "Dibrugarh",
    title: "Mayodia and the road home",
    summary:
      "Leave early via Hunli and Mayodia, descend to the plains and cross the Dr. Bhupen Hazarika Setu before the Dibrugarh drop.",
    stops: [
      "Hunli",
      "Mayodia Pass",
      "Dr. Bhupen Hazarika Setu",
      "Dibrugarh drop",
    ],
    stay: "Trip ends in Dibrugarh",
    note: "Keep onward flights and trains for the following day; mountain-road delays are possible.",
  },
];

export const circuitPricing = {
  currency: "₹",
  title: "One circuit. Four honest prices.",
  standfirst:
    "The vehicle, driver and route logistics are fixed costs. The per-person rate changes only with the number of travellers sharing them.",
  tiers: [
    {
      id: "group-six",
      size: 6,
      label: "Group of 6",
      price: 37499,
      badge: "Best value",
      note: "The complete 12N/13D circuit with all six seats priced together.",
    },
    {
      id: "group-five",
      size: 5,
      label: "Group of 5",
      price: 43299,
      badge: null,
      note: "The same vehicle, route and inclusions shared between five travellers.",
    },
    {
      id: "group-four",
      size: 4,
      label: "Group of 4",
      price: 54399,
      badge: "More room",
      note: "A smaller group with more cabin space on the long transfer days.",
    },
    {
      id: "private",
      size: 2,
      label: "Private couple / twin",
      price: 69999,
      badge: "Private",
      note: "A dedicated vehicle and itinerary for two travellers sharing a room.",
    },
  ],
  fineprint: [
    "Every listed price is per person for the full 12-night / 13-day circuit, ex-Dibrugarh.",
    "Final departure dates, room mix and vehicle are confirmed before payment.",
    "Weather, road conditions and local access can change the order of sightseeing without reducing the trip length.",
  ],
} as const;

export const circuitIncluded = [
  {
    name: "Private transportation",
    note: "Vehicle and driver for the complete Dibrugarh round trip",
  },
  {
    name: "Accommodation",
    note: "Twelve nights in route-appropriate hotels, guesthouses or homestays",
  },
  {
    name: "Breakfast & dinner",
    note: "Two included meals on each stay day, subject to departure timing",
  },
  {
    name: "Inner Line Permit",
    note: "Standard permit assistance for eligible Indian travellers",
  },
  {
    name: "Lamang access formalities",
    note: "Permit coordination where required and available",
  },
  {
    name: "Guide charges",
    note: "Local guiding for the guided sectors, including Dong",
  },
  { name: "Forest pass", note: "Where the confirmed route requires it" },
  { name: "First-aid kit", note: "Basic vehicle-carried first-aid supplies" },
] as const;

export const circuitExcluded = [
  { name: "Lunch", note: "Roadside and local meal stops, paid directly" },
  {
    name: "Room heater",
    note: "Charged separately where a property offers one",
  },
  { name: "Flights & trains", note: "Travel to and from Dibrugarh" },
  {
    name: "Entry tickets",
    note: "Any ticket not specifically included in the final quote",
  },
  {
    name: "Personal expenses",
    note: "Shopping, laundry, extra beverages and personal purchases",
  },
  {
    name: "Unlisted services",
    note: "Anything not written in the confirmed inclusion sheet",
  },
] as const;

export const circuitStay = {
  title: "Simple stays, chosen for the road.",
  body: "The circuit uses a mix of hotels, guesthouses and homestays. Geysers or hot-water arrangements are expected at the confirmed properties, but standards vary sharply between Aalo, Mechuka, Walong, Dong and Anini. The final room list is shared before departure.",
  items: [
    "12 nights total across seven route bases",
    "Couple/twin sharing unless the final quote states otherwise",
    "Remote-area stays are functional, locally run and limited in inventory",
    "Room heaters, where available, are not included",
  ],
} as const;

export const circuitPomoExtension = {
  kicker: "Important product note",
  title: "Pomo is an extension—not a hidden Day 11 detour.",
  body: "A real Pomo Grassland trek needs a Chigu staging night, a 03:00 start and most of a day on foot. None of that exists in the 13-day schedule above. To keep the itinerary safe and honest, Pomo trek transport, guide and permits are not included in the base price. Ask us to quote a longer Anini extension if Pomo is essential to your trip.",
  href: "/tours/anini-pomo-grassland-expedition",
  linkLabel: "See the dedicated Pomo expedition",
} as const;

export const circuitCarry = [
  "Government photo ID and spare digital copies for permit processing",
  "Warm layers for Mechuka, Walong, Dong, Mayodia and Anini",
  "Walking shoes with grip for the pre-dawn Dong trail",
  "Headlamp with fresh batteries",
  "Rain shell, compact day pack and reusable water bottle",
  "Personal medication and motion-sickness support if required",
  "Power bank; electricity and network are inconsistent on remote sectors",
] as const;

export const circuitFaq: FAQSection = {
  title: "Questions before thirteen days on the road",
  description:
    "Clear answers about the route, permits, stays, meals, Dong morning and the Pomo extension.",
  faqs: [
    {
      id: "route",
      question: "What route does the Mechuka Dong Anini tour package follow?",
      answer:
        "The circuit starts and ends in Dibrugarh. It runs through Aalo to Mechuka, crosses east through Namsai to Walong and Dong, returns through Roing, then finishes with three nights in Anini before the Mayodia road back to Dibrugarh.",
    },
    {
      id: "difficulty",
      question: "How difficult is this 13-day Arunachal tour?",
      answer:
        "The sightseeing is moderate, but the expedition is demanding because of its length, mountain roads and several early starts. The Dong morning involves walking before daylight on uneven ground. It suits travellers who can tolerate long drives and simple remote stays.",
    },
    {
      id: "dong-sunrise",
      question: "Is the Dong sunrise guaranteed?",
      answer:
        "No. The guided pre-dawn experience is part of the itinerary, but cloud, rain and local conditions decide visibility. The guide also sets the exact departure time based on the season and trail conditions.",
    },
    {
      id: "permits",
      question: "Are Arunachal permits included?",
      answer:
        "Inner Line Permit assistance for eligible Indian travellers is included, together with route-specific permit coordination listed in the confirmed package. Foreign nationals have different Protected Area Permit requirements and should contact Travelspire well before booking.",
    },
    {
      id: "meals",
      question: "Which meals are included?",
      answer:
        "Breakfast and dinner are included. Lunch is excluded and is taken at local restaurants or roadside stops so the driving schedule can remain flexible. Very early departures may require a packed or adjusted breakfast depending on the property.",
    },
    {
      id: "stays",
      question: "What kind of accommodation should I expect?",
      answer:
        "A practical mix of hotels, guesthouses and homestays, selected according to what is reliable on each sector. Remote properties are simpler than city hotels. The exact twelve-night room plan and sharing basis are confirmed before payment.",
    },
    {
      id: "pomo",
      question: "Is the Pomo Grassland trek included in these 13 days?",
      answer:
        "No. Pomo requires a separate Chigu staging night and a dedicated twelve-hour trek day, which are not present in this itinerary. Travelspire can quote an extended version with the necessary guide, transport and permits rather than squeezing it unsafely into Day 11.",
    },
    {
      id: "spellings",
      question: "Are Mechuka, Mechukha and Menchuka the same place?",
      answer:
        "They are alternate English spellings used for the same valley and town in Shi Yomi district. This page uses Mechuka consistently while retaining the common variants for search and trip documents.",
    },
    {
      id: "onward-travel",
      question: "Can I book a flight or train on Day 13?",
      answer:
        "Do not book a tightly timed onward connection for that evening. Anini to Dibrugarh is a long mountain-road journey and delays are possible. The safer plan is to stay in Dibrugarh and travel onward the following morning.",
    },
  ],
};

export const circuitRelated = [
  {
    title: "Six Days in the Dibang",
    label: "Pomo extension",
    href: "/tours/anini-pomo-grassland-expedition",
    image: "/images/places/pomo/pomo3.JPG",
    alt: "Rolling Pomo grassland above Anini in Dibang Valley",
  },
  {
    title: "The Way to Anini",
    label: "Road guide",
    href: "/guides/dibrugarh-to-anini",
    image: "/images/places/anini-new/anini-new-landscape-13.jpeg",
    alt: "Aerial view of a river bend and roadside camp in the Anini region",
  },
  {
    title: "Arunachal Pradesh ILP",
    label: "Permit guide",
    href: "/permits/arunachal-pradesh-ilp",
    image: mechuka2026Src.goldenBuddha,
    alt: "Golden seated Buddha statue on an ornate red and gold pedestal at dusk in Mechuka, Arunachal Pradesh",
  },
] as const;

export const circuitSeoImages = [
  {
    src: circuitHero.desktop.src,
    title: "Mechuka valley on the Mechuka Dong Anini tour",
    alt: circuitHero.desktop.alt,
  },
  {
    src: circuitHero.mobile.src,
    title: "Yargyap Chu river viewpoint on the Mechuka Dong Anini tour",
    alt: circuitHero.mobile.alt,
  },
  ...circuitChapters.map((chapter) => ({
    src: chapter.frame.src,
    title: `${chapter.place} on the 13-day Arunachal circuit`,
    alt: chapter.frame.alt,
  })),
  ...mechuka2026Images.map((image) => ({
    src: image.src,
    title: image.title,
    alt: image.alt,
  })),
].filter(
  (image, index, list) =>
    list.findIndex((item) => item.src === image.src) === index,
);

const routeStops = [
  {
    name: "Dibrugarh",
    location: [27.4728, 95.017] as [number, number],
    description: "Pickup and final drop",
  },
  {
    name: "Aalo",
    location: [28.17, 94.8] as [number, number],
    description: "Gateway and staging town for Mechuka",
  },
  {
    name: "Mechuka",
    location: [28.6, 94.15] as [number, number],
    description: "Five-day western chapter",
  },
  {
    name: "Namsai",
    location: [27.6667, 95.8667] as [number, number],
    description: "Golden Pagoda and eastern staging night",
  },
  {
    name: "Dong",
    location: [28.15, 97.1333] as [number, number],
    description: "Guided pre-dawn valley experience",
  },
  {
    name: "Roing",
    location: [28.14, 95.84] as [number, number],
    description: "Gateway night before Anini",
  },
  {
    name: "Anini",
    location: [28.8427, 95.8997] as [number, number],
    description: "Three-night Dibang Valley base",
  },
];

export const mechukaDongAniniTour: Tour = {
  id: "mechuka-dong-anini-13-days",
  slug: circuitMeta.slug,
  type: "Adventure",
  title: circuitMeta.shortTitle,
  subtitle: "A 13-day grand circuit across Arunachal Pradesh",
  overview:
    "Travel from Dibrugarh through Aalo to Mechuka, cross east for the Dong sunrise and Kaho, then finish with three nights around Anini, Mayodia, Emuli and Karu.",
  duration: "13 Days / 12 Nights",
  location: "Mechuka, Dong & Anini, Arunachal Pradesh",
  startDate: circuitMeta.season,
  price: circuitMeta.fromPrice,
  featured: true,
  trending: true,
  upcoming: false,
  tags: [
    "mechuka",
    "mechukha",
    "menchuka",
    "dong-valley",
    "walong",
    "kaho",
    "anini",
    "arunachal-circuit",
    "private-road-trip",
  ],
  heroImage: circuitHero.desktop.src,
  thumbnail: circuitHero.desktop.src,
  gallery: [
    mechuka2026Src.ridgeViewpoint,
    mechuka2026Src.goldenBuddha,
    mechuka2026Src.winterSnow,
    mechuka2026Src.riverViewpoint,
    mechuka2026Src.helicopterLandmark,
    mechuka2026Src.homestayCabins,
    mechuka2026Src.dorjeelingSignpost,
    mechuka2026Src.salmanPoint,
    circuitChapters[1].frame.src,
    circuitChapters[2].frame.src,
  ],
  highlights: [
    "Two full exploration days in Mechuka",
    "Pre-dawn guided Dong Valley experience",
    "Kaho and the Walong war memorial",
    "Golden Pagoda at Namsai",
    "Mayodia Pass and the road to Anini",
    "Dri-side waterfalls, Emuli and Karu grasslands",
    "Twelve nights with private transportation",
  ],
  itinerary: circuitDays.map((day) => ({
    title: `Day ${day.day}: ${day.title}`,
    description: day.summary,
    activities: [...day.stops, `Overnight: ${day.stay}`],
  })),
  route: {
    points: routeStops.map((stop) => stop.location),
    stops: routeStops,
  },
  inclusions: circuitIncluded.map((item) => `${item.name}: ${item.note}`),
  exclusions: circuitExcluded.map((item) => `${item.name}: ${item.note}`),
  importantNote:
    "Pomo Grassland is not included in the base 13-day circuit because it requires additional staging and a dedicated trek day. Road, weather and local access may change the order of sightseeing.",
  thingsToCarry: [...circuitCarry],
  maxGroupSize: 6,
  difficulty: "Moderate",
  bestTimeToVisit: [
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
  ],
  createdAt: circuitMeta.published,
  updatedAt: circuitMeta.updated,
};
