import type { FAQSection } from "@/types/faqs/faq";
import type { Tour } from "@/types/tours/tour";
import type { Frame, FrameTone } from "@/lib/media";
import {
  mechuka2026Images,
  mechuka2026Src,
  anini2026Src,
} from "@/data/seo/image-seo-data";

/**
 * Canonical product record for the 15N/16D circuit.
 *
 * Keep commercial truth here: the dedicated page, All Tours card, WhatsApp
 * links and structured data all read from these exports. The itinerary,
 * prices and inclusions follow the October 2026 sales sheet: Mechuka first,
 * then Anini with the Pomo Grassland trek on Day 10, then Namsai, Walong and
 * Dong. The slug and product name predate the reorder and are kept for search.
 */
export const circuitMeta = {
  slug: "mechuka-dong-anini-tour-package",
  url: "https://travelspirene.com/tours/mechuka-dong-anini-tour-package",
  title: "Mechuka · Dong · Anini",
  shortTitle: "Mechuka + Dong + Anini",
  duration: "15 Nights / 16 Days",
  season: "October – April",
  route: "Dibrugarh · Aalo · Mechuka · Roing · Anini · Namsai · Walong · Dong",
  fromPrice: 58999,
  updated: "2026-10-17",
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

export const circuitIntro = {
  kicker: "The grand circuit",
  title: "Three journeys, joined properly.",
  lead: "This Mechuka Dong Anini tour package is not a collection of disconnected day trips. It is a 16-day crossing of Arunachal Pradesh: first the monastery valley of Mechuka, then the river country and Pomo grassland around Anini, and finally the far-eastern road to Walong and Dong.",
  body: [
    "The itinerary uses Aalo, Roing, Namsai and Walong as real staging nights, not invisible transfers. That matters on a route this long: it keeps the drive sequence readable, preserves time at the destinations, and makes the 03:30 Pomo start and the 02:00 Dong start possible without pretending every day is easy.",
    "Expect mountain roads, simple hotels and homestays, early departures and plans that respond to weather. In return, you get three very different Arunachal landscapes in one privately transported journey from Dibrugarh back to Dibrugarh.",
  ],
  truths: [
    "A long overland expedition with several full driving days",
    "Own vehicle and local stays; breakfast daily, plus dinner on the private departure",
    "The Pomo Grassland trek and a guided pre-dawn Dong walk, permits included",
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
    days: "Days 01–06",
    place: "Mechuka",
    eyebrow: "The western valley",
    title: "Monasteries, high roads and time to stay.",
    description:
      "Reach Mechuka through Aalo, sleep a night at Dorjeeling, walk the Mechuka La trail and follow the border road to Lamang Pass before returning to Aalo.",
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
    id: "anini",
    days: "Days 07–12",
    place: "Anini",
    eyebrow: "The Dibang middle",
    title: "Waterfalls, Pomo grassland and the last fire.",
    description:
      "Cross to Roing, climb over Mayodia, then use Anini as a base for the Dri-side falls, the Pomo Grassland trek, Matu and the Emuli and Karu meadows.",
    frame: {
      src: anini2026Src.mistyFalls,
      alt: "Multi-tiered waterfall dropping through mist and forest near Anini in Dibang Valley",
      width: 4284,
      height: 5712,
      place: "Anini",
      tone: "moss",
    },
  },
  {
    id: "dong",
    days: "Days 13–16",
    place: "Dong & Walong",
    eyebrow: "The far east",
    title: "Leave before dawn. Watch the valley wake.",
    description:
      "Drop to Namsai, follow the Lohit past Parshuram Kund to Walong, then start the Dong walk at 02:00 for India's first sunrise before the long road home.",
    frame: {
      src: "/images/tours/mechuka-dong-anini/dong-walong-mountain-village.jpg",
      alt: "Mountain village beneath high ridges in the Dong and Walong region",
      width: 1198,
      height: 1600,
      place: "Dong & Walong",
      tone: "ink",
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
      "Start early from Dibrugarh and cross the Bogibeel Bridge — India's longest rail-road bridge — then drive on to Aalo (Along), the district headquarters of West Siang.",
    stops: ["Bogibeel Bridge", "West Siang road", "Aalo town"],
    stay: "Aalo · hotel or homestay",
  },
  {
    day: 2,
    chapter: "mechuka",
    from: "Aalo",
    to: "Mechuka",
    title: "Enter the Mechuka Valley",
    summary:
      "Take the mountain road from Aalo, cross the Yorlung bridge into the Mechuka Valley, check in, and walk through town and the local market.",
    stops: ["Yorlung bridge", "Mechuka Valley arrival", "Mechuka town", "Local market"],
    stay: "Mechuka · hotel or homestay",
    note: "The Aalo–Mechuka road is weather-sensitive; the day is kept flexible.",
  },
  {
    day: 3,
    chapter: "mechuka",
    from: "Mechuka",
    to: "Dorjeeling",
    title: "The old monastery and Dorjeeling",
    summary:
      "Begin at Mechuka's 400-year-old monastery and the 108 stupas, then go up the valley to Dorjeeling's zero point for a night away from town.",
    stops: ["Ancient monastery (400 years old)", "108 stupas", "Dorjeeling zero point"],
    stay: "Dorjeeling · homestay",
  },
  {
    day: 4,
    chapter: "mechuka",
    from: "Dorjeeling",
    to: "Mechuka",
    title: "Mechuka La, bridges and the great prayer wheel",
    summary:
      "Walk the Mechuka La trail, then work back through the valley's landmarks: the Gautse hanging bridge, Buddha Park, the new gompa above town and the biggest prayer wheel in the valley.",
    stops: [
      "Mechuka La trek",
      "Gautse hanging bridge",
      "Buddha Park",
      "New gompa & town viewpoint",
      "Biggest prayer wheel (mani wheel)",
    ],
    stay: "Mechuka · hotel or homestay",
  },
  {
    day: 5,
    chapter: "mechuka",
    from: "Mechuka",
    to: "Lamang Pass",
    title: "The high road to Lamang Pass",
    summary:
      "Follow the border road to Lamang Pass with a run of short stops on the way, from India's last café to the Jang Bahadur waterfall.",
    stops: [
      "Lamang Pass",
      "Helicopter crash point",
      "India's last café",
      "Jang Bahadur waterfall",
      "Gurudwara",
      "Hanuman Camp",
      "Lucky stone",
    ],
    stay: "Mechuka · hotel or homestay",
    note: "Lamang Pass permits are included; the furthest point reached still depends on local access and security conditions on the day.",
  },
  {
    day: 6,
    chapter: "mechuka",
    from: "Mechuka",
    to: "Aalo",
    title: "Back to Aalo",
    summary:
      "Leave the valley for Aalo and keep the evening for the town: the chat house and a walk through the local market.",
    stops: ["Mechuka–Aalo road", "Aalo chat house", "Aalo local market"],
    stay: "Aalo · hotel or homestay",
  },
  {
    day: 7,
    chapter: "anini",
    from: "Aalo",
    to: "Roing",
    title: "Across to the Dibang gateway",
    summary:
      "A full transfer day east to Roing, the last town before the mountain road to Anini.",
    stops: ["Aalo–Roing road", "Roing"],
    stay: "Roing · hotel or homestay",
  },
  {
    day: 8,
    chapter: "anini",
    from: "Roing",
    to: "Anini",
    title: "Over Mayodia into Dibang Valley",
    summary:
      "Climb from the plains into the Mishmi Hills, cross Mayodia Pass, stop at the Hunli off-road point and continue to the Anini plateau.",
    stops: ["Mayodia Pass", "Hunli off-road point", "Anini plateau arrival"],
    stay: "Anini · homestay",
    note: "This is a mountain-road day; arrival time moves with fog, rain and road work.",
  },
  {
    day: 9,
    chapter: "anini",
    from: "Anini",
    to: "Dri valley",
    title: "Waterfall country below Anini",
    summary:
      "A full day on the valley floor: Dree Afra, the Dri valley and Chigu camp, then the Mawuando viewpoint and three falls — Deccan, Ahi and Bruni.",
    stops: [
      "Dree Afra",
      "Dri valley",
      "Chigu camp",
      "Mawuando",
      "Deccan Falls",
      "Ahi Falls",
      "Bruni Falls",
    ],
    stay: "Anini · homestay",
  },
  {
    day: 10,
    chapter: "anini",
    from: "Anini",
    to: "Pomo Grassland",
    title: "The Pomo Grassland trek",
    departure: "03:30",
    summary:
      "The hard day of the trip. Headlamps at 03:30, then 10–12 hours on foot through forest to the open grassland and back down, with a trek guide and the Pomo permits arranged.",
    stops: ["03:30 start", "Forest climb", "Pomo Grassland", "Descent by daylight"],
    stay: "Acheso · local stay",
    note: "Weather decides the summit. If Pomo is closed on the day, we substitute the lower meadows and tell you plainly it is not the same thing.",
  },
  {
    day: 11,
    chapter: "anini",
    from: "Acheso",
    to: "Anini",
    title: "Matu, the glass bridge and Gipulin",
    summary:
      "An easier day after the trek: the Matu waterfall, the glass bridge over the gorge, Gipulin village and the Anini museum.",
    stops: ["Matu waterfall", "Glass bridge", "Gipulin village", "Anini museum"],
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
      "The grasslands above town you can reach without a twelve-hour day, then the evening market and a last night at the homestay with a bonfire.",
    stops: [
      "Emuli Grassland",
      "Valley viewpoints",
      "Karu Grassland",
      "Karu Viewpoint",
      "Anini market walk",
      "Homestay bonfire",
    ],
    stay: "Anini · homestay",
  },
  {
    day: 13,
    chapter: "dong",
    from: "Anini",
    to: "Namsai",
    title: "Down the mountain to Namsai",
    summary:
      "Leave Anini over Mayodia and drop to the plains, turning east for a night in Namsai before the Lohit road.",
    stops: ["Mayodia Pass", "Roing", "Namsai"],
    stay: "Namsai · hotel or homestay",
  },
  {
    day: 14,
    chapter: "dong",
    from: "Namsai",
    to: "Walong",
    title: "Parshuram Kund and the Lohit road to Walong",
    summary:
      "Stop at Parshuram Kund, then follow the Lohit through Anjaw district to Walong, arriving early enough to rest before the pre-dawn start.",
    stops: ["Parshuram Kund", "Lohit valley road", "Walong arrival"],
    stay: "Walong · guesthouse or homestay",
  },
  {
    day: 15,
    chapter: "dong",
    from: "Walong",
    to: "Dong / Kaho",
    title: "India's first sunrise, then Kaho",
    departure: "Around 02:00 · guide confirms the final time",
    summary:
      "Begin in darkness for the guided Dong Valley trek and India's first sunrise, then return to the valley for the war memorial, Kaho village and the Dong suspension footbridge.",
    stops: [
      "Dong Valley sunrise trek",
      "Walong war memorial",
      "Lunch stop in Walong",
      "Kaho village",
      "Dong suspension footbridge",
    ],
    stay: "Dong · local stay",
    note: "Sunrise visibility is weather-dependent and cannot be guaranteed.",
  },
  {
    day: 16,
    chapter: "dong",
    from: "Dong / Walong",
    to: "Dibrugarh",
    title: "The long road home",
    summary:
      "The long drive back down the Lohit, with a lunch stop at Hayuliang, and the drop in Dibrugarh.",
    stops: ["Hayuliang lunch stop", "Lohit valley road", "Dibrugarh drop"],
    stay: "Trip ends in Dibrugarh",
    note: "Keep onward flights and trains for the following day; mountain-road delays are possible.",
  },
];

export const circuitPricing = {
  currency: "₹",
  title: "One circuit. Three honest prices.",
  standfirst:
    "The vehicle, driver and route logistics are fixed costs. Groups pay per person; the private departure is one price for two.",
  tiers: [
    {
      id: "group-five",
      size: 5,
      label: "Group of 5",
      price: 58999,
      basis: "person",
      badge: "Best value",
      note: "The complete 15N/16D circuit with all five seats priced together. Breakfast included.",
    },
    {
      id: "group-four",
      size: 4,
      label: "Group of 4",
      price: 61999,
      basis: "person",
      badge: "More room",
      note: "A smaller group with more cabin space on the long transfer days. Breakfast included.",
    },
    {
      id: "private",
      size: 2,
      label: "Private couple / twin",
      price: 189999,
      basis: "party",
      badge: "Private",
      note: "A dedicated vehicle and itinerary for two travellers sharing a room. Breakfast and dinner included.",
    },
  ],
  fineprint: [
    "Group prices are per person for the full 15-night / 16-day circuit, ex-Dibrugarh. The private price is the total for two travellers.",
    "Group departures include breakfast; the private departure includes breakfast and dinner. Lunch is never included.",
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
    note: "Fifteen nights in route-appropriate hotels, guesthouses or homestays",
  },
  {
    name: "Breakfast",
    note: "On each stay day, subject to departure timing",
  },
  {
    name: "Dinner — private only",
    note: "Included on each stay day on the private departure",
  },
  {
    name: "Inner Line Permit",
    note: "Standard permit assistance for eligible Indian travellers",
  },
  { name: "Lamang Pass permit", note: "Arranged for the Day 5 border road" },
  { name: "Pomo trek permit", note: "Arranged for the Day 10 grassland trek" },
  { name: "Dong trek permit", note: "Arranged for the Day 15 sunrise trek" },
  {
    name: "Guide charges",
    note: "Local guiding for the guided sectors, including Pomo and Dong",
  },
  { name: "Forest pass", note: "Where the route requires it" },
  { name: "First-aid kit", note: "Basic vehicle-carried first-aid supplies" },
] as const;

export const circuitExcluded = [
  { name: "Lunch", note: "Roadside and local meal stops, paid directly" },
  {
    name: "Dinner on group departures",
    note: "Taken at the night's stay or nearby, paid directly",
  },
  {
    name: "Room heater",
    note: "Charged separately where a property offers one",
  },
  { name: "Flights & trains", note: "Travel to and from Dibrugarh" },
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
  body: "The circuit uses a mix of hotels, guesthouses and homestays, with a geyser for hot water at the confirmed properties. Standards still vary sharply between Aalo, Mechuka, Anini, Walong and Dong. The final room list is shared before departure.",
  items: [
    "15 nights total across nine route stops",
    "Couple/twin sharing unless the final quote states otherwise",
    "Remote-area stays are functional, locally run and limited in inventory",
    "Room heaters, where available, are not included",
  ],
} as const;

export const circuitPomoDay = {
  title: "Day 10 is a real trek.",
  body: "The Pomo Grassland trek starts at 03:30 and runs 10–12 hours on foot, with a trek guide and the Pomo permits included. You need working knees and some recent walking in your legs. If anyone in your group would rather sit it out, tell us at booking and we will plan their day in Anini.",
  href: "/tours/anini-pomo-grassland-expedition",
  linkLabel: "Read more about the Pomo trek",
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
  title: "Questions before sixteen days on the road",
  description:
    "Clear answers about the route, permits, stays, meals, Dong morning and the Pomo extension.",
  faqs: [
    {
      id: "route",
      question: "What route does the Mechuka Dong Anini tour package follow?",
      answer:
        "The circuit starts and ends in Dibrugarh. It runs through Aalo to Mechuka for five nights, back to Aalo, then east to Roing and over Mayodia to Anini for the Dibang chapter and the Pomo trek. From Anini it drops to Namsai, follows the Lohit to Walong and Dong, and returns to Dibrugarh on Day 16.",
    },
    {
      id: "difficulty",
      question: "How difficult is this 16-day Arunachal tour?",
      answer:
        "The sightseeing is moderate, but the expedition is demanding because of its length, mountain roads and several early starts. The Pomo Grassland trek on Day 10 is 10–12 hours on foot, and the Dong morning involves walking before daylight on uneven ground. It suits travellers who can tolerate long drives and simple remote stays.",
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
        "Yes. The Inner Line Permit for eligible Indian travellers is included, together with the Lamang Pass, Pomo trek and Dong trek permits and the forest pass. Foreign nationals have different Protected Area Permit requirements and should contact Travelspire well before booking.",
    },
    {
      id: "meals",
      question: "Which meals are included?",
      answer:
        "On group departures breakfast is included. On the private departure breakfast and dinner are both included. Lunch is never included and is taken at local restaurants or roadside stops so the driving schedule can remain flexible. Very early departures may require a packed or adjusted breakfast depending on the property.",
    },
    {
      id: "stays",
      question: "What kind of accommodation should I expect?",
      answer:
        "A practical mix of hotels, guesthouses and homestays, selected according to what is reliable on each sector, with geysers for hot water. Remote properties are simpler than city hotels. The exact fifteen-night room plan and sharing basis are confirmed before payment.",
    },
    {
      id: "pomo",
      question: "Is the Pomo Grassland trek included?",
      answer:
        "Yes. Day 10 is the Pomo Grassland trek: a 03:30 start, 10–12 hours on foot, and a night at Acheso afterwards. The trek guide and Pomo permits are included. It is a hard day — if anyone in your group would rather skip it, tell us at booking.",
    },
    {
      id: "spellings",
      question: "Are Mechuka, Mechukha and Menchuka the same place?",
      answer:
        "They are alternate English spellings used for the same valley and town in Shi Yomi district. This page uses Mechuka consistently while retaining the common variants for search and trip documents.",
    },
    {
      id: "onward-travel",
      question: "Can I book a flight or train on Day 16?",
      answer:
        "Do not book a tightly timed onward connection for that evening. Walong to Dibrugarh is a long mountain-road journey and delays are possible. The safer plan is to stay in Dibrugarh and travel onward the following morning.",
    },
  ],
};

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
    title: `${chapter.place} on the 16-day Arunachal circuit`,
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
    description: "The western chapter, with Dorjeeling and Lamang Pass",
  },
  {
    name: "Roing",
    location: [28.14, 95.84] as [number, number],
    description: "Gateway night before Anini",
  },
  {
    name: "Anini",
    location: [28.8427, 95.8997] as [number, number],
    description: "Dibang Valley base and the Pomo Grassland trek",
  },
  {
    name: "Namsai",
    location: [27.6667, 95.8667] as [number, number],
    description: "Eastern staging night",
  },
  {
    name: "Walong",
    location: [28.1167, 97.0167] as [number, number],
    description: "Staging town for the Dong sunrise",
  },
  {
    name: "Dong",
    location: [28.15, 97.1333] as [number, number],
    description: "Guided pre-dawn valley experience",
  },
];

export const mechukaDongAniniTour: Tour = {
  id: "mechuka-dong-anini-16-days",
  slug: circuitMeta.slug,
  type: "Adventure",
  title: circuitMeta.shortTitle,
  subtitle: "A 16-day grand circuit across Arunachal Pradesh",
  overview:
    "Travel from Dibrugarh through Aalo to Mechuka, cross to Anini for the Pomo Grassland trek, Emuli and Karu, then finish in the far east with the Dong sunrise and Kaho.",
  duration: "16 Days / 15 Nights",
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
    "Mechuka La trek, Dorjeeling and Lamang Pass",
    "The Pomo Grassland trek above Anini",
    "Pre-dawn guided Dong Valley sunrise trek",
    "Kaho and the Walong war memorial",
    "Mayodia Pass and the road to Anini",
    "Dri-side waterfalls, Emuli and Karu grasslands",
    "Fifteen nights with private transportation",
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
    "Day 10 is the Pomo Grassland trek: a 03:30 start and 10–12 hours on foot. Road, weather and local access may change the order of sightseeing.",
  thingsToCarry: [...circuitCarry],
  maxGroupSize: 5,
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
