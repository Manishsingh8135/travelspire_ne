import type { FAQSection } from "@/types/faqs/faq";

// Content model for Anini Winter Fest 5.0 (19–20 Sep 2026)
// Travelspire NE is the Official Travel & Taxi Partner — festival passes are
// sold by the festival's booking partners (Zaatio, Baahi); Travelspire sells
// the journey: shared transfers, private fleet, stays and valley extensions.
// Media provenance (verified 21 Aug 2026): artist and Dibang experience media
// mirrors the live official festival site; Alo uses its Spotify artist image;
// fleet cutouts come from Toyota India and Mahindra's official model pages.

export const awfMeta = {
  name: "Anini Winter Fest",
  edition: "5.0",
  year: "2026",
  dates: {
    start: "2026-09-19",
    end: "2026-09-20",
    label: "19–20 September 2026",
  },
  location: "Anini, Dibang Valley",
  state: "Arunachal Pradesh",
  coordinates: { lat: "28.79806", lng: "95.90361" },
  elevation: "1,970 m",
  instagram: "https://instagram.com/anini_winter_fest",
  officialSite: "https://www.aniniwinterfest.com",
  lineupVerified: "21 August 2026",
  organizer: "Anini Winter Fest",
  supporters: [
    "Arunachal Tourism",
    "District Administration",
    "District Tourism Dept",
  ],
  awards: [
    {
      title: "Best Offbeat Mountain Destination",
      body: "Outlook Traveller Awards 2024",
    },
    {
      title: "Best Emerging Adventure Destination",
      body: "ATOAI 17th Annual Convention",
    },
  ],
} as const;

// ─── Evergreen pivot ────────────────────────────────────────────────────────
// The festival ends on 20 Sep 2026; the search interest in Anini does not.
// Flip `status` to "past" after the event and redeploy — one line pivots the
// whole page: a wrapped-edition banner appears, metadata switches to the
// 2027-holder framing, and the "Anini remains" section carries the traffic
// into the evergreen cluster. Until then it stays "upcoming" and nothing
// below renders.
export const awfEdition = {
  status: "upcoming" as "upcoming" | "live" | "past",
  nextYear: "2027",
} as const;

// The pages this one feeds after the festival — and already feeds today.
export const awfEvergreen = [
  {
    name: "Anini",
    blurb: "The full destination guide — stays, seasons, experiences, permits.",
    href: "/places/anini",
    image: "/images/places/anini-new/anini-new-portrait-4.jpg",
  },
  {
    name: "The Way to Anini",
    blurb:
      "The road itself, in nine chapters — the drive is half the festival.",
    href: "/guides/dibrugarh-to-anini",
    image: "/images/places/anini/Anini_10.JPG",
  },
  {
    name: "Dibang Valley",
    blurb: "The whole region hub — Dambuk, Roing, Mayodia and beyond.",
    href: "/places/dibang-valley",
    image: "/images/places/pomo/pomo1.JPG",
  },
] as const;

export const awfHeroImages = {
  desktop: {
    src: "/images/places/anini-new/anini-new-landscape-11.jpeg",
    width: 4000,
    height: 2250,
  },
  mobile: {
    src: "/images/places/anini-new/anini-new-portrait-9.jpg",
    width: 1340,
    height: 1600,
  },
  alt: "Mist rolling over the mountains of Dibang Valley around Anini, Arunachal Pradesh",
} as const;

export interface AwfArtist {
  name: string;
  day: 1 | 2;
  genre: string;
  origin: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  headliner?: boolean;
  tba?: boolean;
}

export const awfArtists: AwfArtist[] = [
  {
    name: "UNB",
    day: 1,
    genre: "Revealing Soon",
    origin: "Day 1 headliner",
    image: "/images/festivals/anini-winter-fest-2026/artists/unb.webp",
    imageAlt: "UNB, the Day 1 headliner at Anini Winter Fest 2026",
    headliner: true,
  },
  {
    name: "Anurag Dutta",
    day: 1,
    genre: "Bollywood",
    origin: "Assam",
    image: "/images/festivals/anini-winter-fest-2026/artists/anurag-dutta.webp",
    imageAlt: "Assam singer Anurag Dutta",
    imagePosition: "center 28%",
  },
  {
    name: "Alo The Band",
    day: 1,
    genre: "Bollywood · Rock",
    origin: "Kolkata",
    image: "/images/festivals/anini-winter-fest-2026/artists/alo-the-band.webp",
    imageAlt: "Kolkata-based Alo The Band",
  },
  {
    name: "Rageshree Rai",
    day: 1,
    genre: "Indie · Pop",
    origin: "Darjeeling",
    image:
      "/images/festivals/anini-winter-fest-2026/artists/rageshree-rai.webp",
    imageAlt: "Darjeeling indie pop artist Rageshree Rai",
    imagePosition: "center 20%",
  },
  {
    name: "AIOM",
    day: 1,
    genre: "DJ · Trance",
    origin: "Shillong",
    image: "/images/festivals/anini-winter-fest-2026/artists/aiom.webp",
    imageAlt: "Shillong DJ and trance artist AIOM",
    imagePosition: "center 24%",
  },
  {
    name: "Kunal Ganjawala",
    day: 2,
    genre: "Bollywood · Playback · Pop",
    origin: "Maharashtra",
    image:
      "/images/festivals/anini-winter-fest-2026/artists/kunal-ganjawala.webp",
    imageAlt: "Bollywood playback singer Kunal Ganjawala performing live",
    imagePosition: "center 24%",
    headliner: true,
  },
  {
    name: "Moko Kaza",
    day: 2,
    genre: "Rap · Hip-Hop",
    origin: "Nagaland",
    image: "/images/festivals/anini-winter-fest-2026/artists/moko-kaza.webp",
    imageAlt: "Nagaland rapper Moko Kaza",
  },
  {
    name: "Khaali Frame",
    day: 2,
    genre: "Indie · Pop",
    origin: "Assam",
    image: "/images/festivals/anini-winter-fest-2026/artists/khaali-frame.webp",
    imageAlt: "Assam indie pop act Khaali Frame",
  },
  {
    name: "Mihir Chandan",
    day: 2,
    genre: "DJ · Folktronica",
    origin: "Maharashtra",
    image:
      "/images/festivals/anini-winter-fest-2026/artists/mihir-chandan.webp",
    imageAlt: "Maharashtra folktronica artist Mihir Chandan",
  },
];

export const awfGenres = [
  "Indie",
  "Folk",
  "Electronic",
  "Tribal Fusion",
  "Rock",
] as const;

export const awfExperiences = [
  {
    index: "01",
    tag: "Music",
    title: "Live Under Open Skies",
    body: "Two stages at 1,970 m. Indie folk, regional sounds and Northeastern music you will not find anywhere else — no barriers, just music and mountains.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=70",
    imageAlt: "Crowd silhouetted against stage lights at an outdoor concert",
  },
  {
    index: "02",
    tag: "Adventure",
    title: "The Wild Dibang",
    body: "Rafting, kayaking and ATV trails on and around one of India's wildest, least-explored rivers. Grade III–IV water, old-growth jungle, zero crowds.",
    image: "/images/places/dambuk/Dambuk_3.jpg",
    imageAlt: "The Dibang river winding through dense green forest",
  },
  {
    index: "03",
    tag: "Camping",
    title: "Sleep Under Stars",
    body: "Curated camping with near-zero light pollution. Some of India's most unspoilt night skies — wake to mist rolling in off the Mishmi Hills.",
    image: "/images/places/dong-new/dong-new-landscape-8.jpg",
    imageAlt: "A river valley at dawn in the mountains of eastern Arunachal",
  },
  {
    index: "04",
    tag: "Community",
    title: "Where Strangers Become Tribe",
    body: "250 km from the nearest city, you will find your people here. Travellers, artists, locals and adventurers sharing fire and music at the edge of India.",
    image: "/images/places/anini-new/anini-new-portrait-4.jpg",
    imageAlt: "The high plateau landscape around Anini, home of the Idu Mishmi",
  },
] as const;

export const awfJourneySteps = [
  {
    index: "01",
    title: "Fly into Dibrugarh",
    meta: "2–3 hrs from Delhi · Kolkata · Bengaluru",
    body: "Dibrugarh Airport (DIB) in Assam is the nearest major airport. September is peak season in the Northeast — book flights early.",
  },
  {
    index: "02",
    title: "Get your ILP",
    meta: "15–30 mins online",
    body: "All non-Arunachal visitors need an Inner Line Permit with 'Dibang Valley' mentioned on it. We arrange it for every traveller who rides with us.",
  },
  {
    index: "03",
    title: "Drive to Roing",
    meta: "5–6 hrs · ~180 km",
    body: "Shared cab or private vehicle to Roing, the gateway town. Most travellers overnight here — and it is your last reliable fuel, ATM and network stop.",
  },
  {
    index: "04",
    title: "The road to Anini",
    meta: "235 km · plan 8–10 hrs in festival season",
    body: "NH-313 over the 2,655 m Mayodia Pass, past waterfalls, canyons and suspension bridges. In late monsoon the realistic window is 8–10 hours — depart by 6 AM, never drive after dark, and we confirm road conditions the evening before.",
  },
] as const;

export interface AwfRouteStop {
  km: number;
  name: string;
  note: string;
  alt?: string;
}

export const awfRouteStops: AwfRouteStop[] = [
  {
    km: 0,
    name: "Roing",
    note: "Base town — fuel, ATM, market, network",
    alt: "390 m",
  },
  {
    km: 22,
    name: "Tiwarigaon",
    note: "Tea & breakfast dhabas before the climb",
  },
  {
    km: 48,
    name: "Mayodia Coffee House",
    note: "Last comfortable halt before the pass",
    alt: "2,200 m",
  },
  {
    km: 56,
    name: "Mayodia Pass",
    note: "Highest point — Mishmi Hills panorama",
    alt: "2,655 m",
  },
  { km: 65, name: "65 KM", note: "Popular roadside lunch halt" },
  { km: 90, name: "Hunli", note: "First proper town after the pass" },
  {
    km: 140,
    name: "Kano · Angolin",
    note: "Landslide caution zone — daylight only",
  },
  {
    km: 175,
    name: "Etalin",
    note: "Designated lunch stop — ask about road ahead",
  },
  {
    km: 235,
    name: "Anini",
    note: "Festival grounds · 1,968 m",
    alt: "1,968 m",
  },
];

export const awfTravelTips = [
  "Tank full in Roing — don't rely on fuel between Roing and Anini, or on stock at destination",
  "Carry sufficient cash — Anini has banks, but cash, power and connectivity can fail",
  "Expect long zero-signal stretches — download everything offline before Roing",
  "Warm layer + rain shell — September at the pass is wet and cold",
  "Depart by 6:00 AM; never drive after sunset",
  "ILP must mention 'Dibang Valley' — checked at multiple posts",
];

export const awfSharedTransfer = {
  slug: "anini-winter-fest-2026-shared-transfer",
  name: "Shared Group Pickup & Drop",
  price: 5499,
  unit: "per person",
  departureDate: "2026-09-18",
  maxTravellersPerBooking: 12,
  window: "Pickup 18 Sept · Drop 21 Sept 2026",
  route: "Dibrugarh → Tinsukia → Roing → Anini",
  pickups: [
    { point: "Dibrugarh", time: "07:00 AM" },
    { point: "Tinsukia", time: "07:30 AM" },
    { point: "Roing", time: "10:00 AM" },
  ],
  meals: [
    { meal: "Breakfast", where: "Roing" },
    { meal: "Lunch", where: "65 KM" },
    { meal: "Evening snacks / dinner", where: "Angolin" },
  ],
  inclusions: [
    "Shared vehicle",
    "Fuel",
    "Driver",
    "Driver accommodation",
    "Vehicle standby",
    "ILP assistance",
  ],
  atActuals: ["Meals at dhaba stops", "ILP government fee"],
  pickupNote:
    "Separate feeder vehicles coordinate the Dibrugarh and Tinsukia reporting points. Exact map pins, vehicle, coordinator and registration details arrive with your booking confirmation.",
  note: "Miss the window and the convoy leaves without you — set two alarms. Timings subject to road and weather.",
} as const;

export const awfFleet = [
  {
    name: "Fortuner Sigma 4",
    pricePerDay: 14999,
    character: "Top of the line — glides over the rough patches",
    image:
      "/images/festivals/anini-winter-fest-2026/fleet/toyota-fortuner.webp",
    imageAlt: "Toyota Fortuner SUV, representative vehicle model",
  },
  {
    name: "Scorpio N",
    pricePerDay: 7999,
    character: "Festival favourite for groups of 5–6",
    image:
      "/images/festivals/anini-winter-fest-2026/fleet/mahindra-scorpio-n.webp",
    imageAlt: "Mahindra Scorpio N SUV, representative vehicle model",
  },
  {
    name: "Innova Crysta",
    pricePerDay: 7499,
    character: "The most comfortable ride for families",
    image:
      "/images/festivals/anini-winter-fest-2026/fleet/toyota-innova-crysta.webp",
    imageAlt: "Toyota Innova Crysta MPV, representative vehicle model",
  },
  {
    name: "Scorpio Classic",
    pricePerDay: 6999,
    character: "The trusted NH-313 workhorse",
    image:
      "/images/festivals/anini-winter-fest-2026/fleet/mahindra-scorpio-classic.webp",
    imageAlt: "Mahindra Scorpio Classic SUV, representative vehicle model",
  },
  {
    name: "Bolero Neo",
    pricePerDay: 5999,
    character: "Compact, capable, easy on the pocket",
    image:
      "/images/festivals/anini-winter-fest-2026/fleet/mahindra-bolero-neo.webp",
    imageAlt: "Mahindra Bolero Neo SUV, representative vehicle model",
  },
  {
    name: "Bolero Classic",
    pricePerDay: 5599,
    character: "Simple and dependable",
    image:
      "/images/festivals/anini-winter-fest-2026/fleet/mahindra-bolero.webp",
    imageAlt: "Mahindra Bolero SUV, representative vehicle model",
  },
] as const;

export const awfFleetInclusions = [
  "Vehicle fare",
  "Fuel",
  "Vehicle standby",
  "Driver charges",
  "Driver accommodation",
] as const;

export interface AwfPass {
  name: string;
  span: string;
  price: number;
  unit: string;
  blurb: string;
  featured?: boolean;
}

export const awfPasses: AwfPass[] = [
  {
    name: "Explorer",
    span: "Single Day",
    price: 1999,
    unit: "per person",
    blurb: "1-day festival access. Pick your day, soak in the valley.",
  },
  {
    name: "Festival Pass",
    span: "Both Days",
    price: 3499,
    unit: "per person",
    blurb: "Full 2-day festival access. The complete AWF 5.0 experience.",
    featured: true,
  },
];

export const awfPassPartners = ["Zaatio", "Baahi"] as const;

export interface AwfPackagePlan {
  plan: string;
  label: string;
  recommended?: boolean;
}

export const awfPackagePlans: AwfPackagePlan[] = [
  { plan: "2N · 3D", label: "The weekend dash — arrive, festival, return" },
  { plan: "3N · 4D", label: "Festival plus a taste of the valley" },
  {
    plan: "4N · 5D",
    label: "The full Dibang — festival, waterfalls, villages",
    recommended: true,
  },
];

export const awfBookingSteps = [
  {
    step: "01",
    title: "Choose your pass",
    body: "Explorer or full Festival Pass via the official booking partners.",
  },
  {
    step: "02",
    title: "Add adventure",
    body: "Rafting, jungle hikes, ATV trails — selected in the festival booking flow.",
  },
  {
    step: "03",
    title: "Pick your stay",
    body: "Camps, homestays and lodges — or let us bundle it for you.",
  },
  {
    step: "04",
    title: "Ride with us",
    body: "Shared transfer or private fleet — the journey is our job.",
  },
] as const;

// Media ledger rule: only photos whose location we can stand behind.
// anini-new = Anini plateau & surroundings · pomo = Pomo Grassland, Dibang Valley ·
// dambuk = Dambuk riverbanks, Lower Dibang Valley. Captions name the real place.
export const awfGallery = [
  {
    src: "/images/places/anini-new/anini-new-landscape-13.jpeg",
    alt: "The high plateau at Anini, headquarters of Dibang Valley",
    caption: "Anini Plateau",
  },
  {
    src: "/images/places/pomo/pomo1.JPG",
    alt: "Pomo grassland horizon under a wide sky",
    caption: "Pomo Grassland",
  },
  {
    src: "/images/places/anini-new/anini-new-portrait-2.jpg",
    alt: "Ridgelines in the highlands around Anini",
    caption: "Anini Highlands",
  },
  {
    src: "/images/places/dambuk/Dambuk_1.jpg",
    alt: "The Dibang riverbanks at Dambuk in golden light",
    caption: "Dambuk Riverbanks",
  },
  {
    src: "/images/places/anini-new/anini-new-portrait-6.jpg",
    alt: "Mist moving over the mountains near Anini",
    caption: "Mist over Dibang",
  },
  {
    src: "/images/places/dambuk/Dambuk_3.jpg",
    alt: "The Dibang river winding through forest at Dambuk",
    caption: "The Dibang at Dambuk",
  },
  {
    src: "/images/places/pomo/pomo4.jpg",
    alt: "Rolling hills of Pomo grassland",
    caption: "Pomo Grassland",
  },
  {
    src: "/images/places/anini-new/anini-new-portrait-3.jpg",
    alt: "Cloud and ridgeline in Dibang Valley",
    caption: "Dibang Valley",
  },
] as const;

// Three honest tiers — never mix a sacred expedition with a weekend add-on.
export interface AwfStayLongerItem {
  index: string;
  title: string;
  tier:
    | "Valley sampler · +2–4 days"
    | "Roing buffer · +1 day"
    | "Expedition · +7–11 days";
  tags: string[];
  images: Array<{ src: string; alt: string; position?: string }>;
}

export const awfStayLonger: AwfStayLongerItem[] = [
  {
    index: "01",
    title: "Waterfalls Around Anini",
    tier: "Valley sampler · +2–4 days",
    tags: ["Half-day spots", "Route hints", "Natural Pools"],
    images: [
      {
        src: "/images/festivals/anini-winter-fest-2026/experiences/anini-waterfall.webp",
        alt: "A mountain waterfall in Dibang Valley",
      },
      {
        src: "/images/festivals/anini-winter-fest-2026/experiences/karo-valley-waterfall.webp",
        alt: "Waterfall and river country in Karo Valley",
      },
    ],
  },
  {
    index: "02",
    title: "Viewpoints & Photography",
    tier: "Valley sampler · +2–4 days",
    tags: ["Sunrise Points", "Valley Overlooks", "Cloud Seas"],
    images: [
      {
        src: "/images/festivals/anini-winter-fest-2026/experiences/dibang-viewpoints.webp",
        alt: "A mountain viewpoint above Dibang Valley",
      },
      {
        src: "/images/places/anini-new/anini-new-landscape-13.jpeg",
        alt: "Cloud and layered ridgelines around Anini",
      },
    ],
  },
  {
    index: "03",
    title: "Kiwi Orchards & Farm Stays",
    tier: "Valley sampler · +2–4 days",
    tags: ["Orchard Visits", "Harvest Season", "Local Produce"],
    images: [
      {
        src: "/images/festivals/anini-winter-fest-2026/experiences/anini-kiwi.webp",
        alt: "Fresh kiwi fruit grown in the high valleys around Anini",
      },
      {
        src: "/images/places/anini-new/anini-new-portrait-5.jpg",
        alt: "Orchard and farm slopes around Anini",
      },
    ],
  },
  {
    index: "04",
    title: "Dri & Aeyo Valleys",
    tier: "Valley sampler · +2–4 days",
    tags: ["Guided Walks", "Village Stays", "River Crossings"],
    images: [
      {
        src: "/images/festivals/anini-winter-fest-2026/experiences/dri-valley.webp",
        alt: "The mountain and river landscape of Dri Valley",
      },
      {
        src: "/images/festivals/anini-winter-fest-2026/experiences/aeyo-valley.webp",
        alt: "The ridgeline and open country of Aeyo Valley",
      },
    ],
  },
  {
    index: "05",
    title: "Roing Buffer Day",
    tier: "Roing buffer · +1 day",
    tags: ["Sally Lake", "Mehao Lake", "Bhismaknagar Fort"],
    images: [
      {
        src: "/images/places/anini/Anini_3.jpg",
        alt: "Still water and forest in the foothills near Roing",
      },
      {
        src: "/images/places/anini/Anini_8.jpg",
        alt: "Evening light over the Lower Dibang foothills near Roing",
      },
    ],
  },
  {
    index: "06",
    title: "Seven Lakes · Dri Trek · Athu Popu",
    tier: "Expedition · +7–11 days",
    tags: ["Guided Only", "Fitness Required", "Sacred Route"],
    images: [
      {
        src: "/images/festivals/anini-winter-fest-2026/experiences/seven-lakes-trek.webp",
        alt: "High-altitude terrain on the Seven Lakes trek in Dibang Valley",
      },
      {
        src: "/images/festivals/anini-winter-fest-2026/experiences/athu-popu.webp",
        alt: "The sacred Athu Popu landscape in Dibang Valley",
      },
    ],
  },
];

export const awfIduGlossary = [
  { word: "Pra~ne Iga", meaning: "Welcome · Greeting" },
  { word: "Asa", meaning: "Forest spirit" },
  { word: "Afra", meaning: "River" },
  { word: "Emudu Illikhi", meaning: "Mother · Earth" },
] as const;

export interface AwfLegacyChapter {
  edition: string;
  title: string;
  note: string;
  current?: boolean;
}

export const awfLegacy: AwfLegacyChapter[] = [
  {
    edition: "1.0",
    title: "Where It All Began",
    note: "A raw, intimate community gathering rooted in Idu Mishmi culture.",
  },
  {
    edition: "2.0",
    title: "Beyond Expectations",
    note: "3× attendance growth — word spread beyond Arunachal.",
  },
  {
    edition: "3.0",
    title: "A Destination Takes Shape",
    note: "Adventure tourism arrived; visitors from 5+ states.",
  },
  {
    edition: "4.0",
    title: "The Festival Finds Its Identity",
    note: "Sold-out passes, national artists, tourism-board partnership.",
  },
  {
    edition: "5.0",
    title: "The Next Chapter",
    note: "September 2026 — the wildest edition yet.",
    current: true,
  },
];

export const awfFaqSection: FAQSection = {
  title: "Anini Winter Fest 2026 — FAQs",
  description:
    "Everything about the festival, the permits and the road — answered by the team that drives NH-313 every week.",
  faqs: [
    {
      id: "awf-ilp",
      question: "Do I need an Inner Line Permit (ILP)?",
      answer:
        "Yes. Every visitor from outside Arunachal Pradesh needs an ILP with 'Dibang Valley' explicitly mentioned on it — it is checked at multiple posts. Apply online via the Arunachal eILP portal (15–30 minutes), or let Travelspire arrange it: permit assistance is included with every shared transfer and package we run. Foreign nationals need a Protected Area Permit (PAP) instead.",
    },
    {
      id: "awf-weather",
      question: "What is the weather like in Anini in September?",
      answer:
        "Expect cool, wet, changeable late-monsoon mountain weather — pleasant when the sun breaks through, properly cold and wet when the pass clouds roll in. We don't quote exact temperatures this far out on purpose; instead, every Travelspire traveller gets a real, current forecast 7–10 days before departure. Pack a warm layer, a rain shell and sturdy shoes.",
    },
    {
      id: "awf-connectivity",
      question: "Is there mobile connectivity at the festival?",
      answer:
        "Plan for long zero-signal stretches on NH-313 and weak, patchy coverage in Anini itself. Which carrier works where changes with weather and towers — so don't plan around any network at all: download offline maps, tickets and music before Roing, tell family your itinerary, and treat any signal you find as a bonus. Consider it a feature: two days properly offline.",
    },
    {
      id: "awf-reach",
      question: "How do I reach Anini from Dibrugarh?",
      answer:
        "Dibrugarh airport → Roing (5–6 hrs, ~180 km) → Anini via NH-313 over Mayodia Pass (235 km — plan 8–10 hours in festival season). The simplest option: our festival shared transfer starts from Dibrugarh on the morning of 18 September (₹5,499 per person, return on 21 September; scheduled dhaba meal stops and ILP assistance included, government permit fee at actuals), or book a private SUV with a driver who knows every slide zone by name.",
    },
    {
      id: "awf-safety",
      question: "Is Anini safe for solo travellers and women?",
      answer:
        "Yes. Dibang Valley is one of India's safest, most close-knit regions, and the festival is built with the Idu Mishmi community. The real risk is the road, not the people — travel in daylight, in a proper SUV, with a driver who knows NH-313. Our convoys and drivers handle exactly that.",
    },
    {
      id: "awf-passes",
      question:
        "Where do I buy festival passes, and what does Travelspire sell?",
      answer:
        "Festival passes (Explorer ₹1,999 / Festival Pass ₹3,499) are sold by the festival's official booking partners, Zaatio and Baahi. Travelspire Northeast is the Official Travel & Taxi Partner — we handle getting you there and back: shared transfers, private vehicles, stays, permits and valley extensions, all in one WhatsApp message.",
    },
    {
      id: "awf-pack",
      question: "What should I pack?",
      answer:
        "Warm layers, a rain shell, broken-in shoes, a power bank, torch, personal medication and cash (no ATMs beyond Roing). Pack for a campsite at 1,970 m at the tail of the monsoon — and leave room for kiwi orchard produce on the way back.",
    },
    {
      id: "awf-extend",
      question: "Can I stay longer and explore Dibang Valley?",
      answer:
        "Please do — the festival is two days, the valley is a lifetime. Waterfalls around Anini, Dri and Aeyo valleys, Pomo grassland, Athu Popu, kiwi orchards and Idu Mishmi village walks need 3–5 extra days. We recommend arriving by 17 September; our Anini expedition packages bolt straight onto the festival weekend.",
    },
  ],
};

export const awfContact = {
  phonePrimary: "+91 98641 41211",
  phonePrimaryHref: "tel:+919864141211",
  phoneSecondary: "+91 81359 71713",
  phoneSecondaryHref: "tel:+918135971713",
  email: "info@travelspirene.com",
} as const;

// ─── Route experience (ribbon + map) ─────────────────────────────────────────
// Milestones carry coordinates for the map, and a small image stack for the
// ribbon preview — a stop can have more than one frame. Gems are the little
// in-between dots: no images, just a line of honest road knowledge.

export interface AwfMilestoneImage {
  src: string;
  alt: string;
}

export interface AwfMilestone {
  name: string;
  state: string;
  km: number; // cumulative, from Dibrugarh
  alt: number; // metres
  note: string;
  protocol: string; // what we do here — one line
  coords: [number, number]; // [lat, lng] — for the map
  images: AwfMilestoneImage[];
}

export const awfMilestones: AwfMilestone[] = [
  {
    name: "Dibrugarh",
    state: "Assam",
    km: 0,
    alt: 108,
    note: "The plains send you off — tea gardens, morning light off the Brahmaputra.",
    protocol:
      "Airport & railway pickups with exact pins and a named coordinator.",
    coords: [27.4728, 95.017],
    images: [
      {
        src: "/images/places/dambuk/Dambuk_2.jpg",
        alt: "Open river plains at the start of the drive",
      },
      {
        src: "/images/places/dambuk/Dambuk_3.jpg",
        alt: "Morning light over the Brahmaputra plains",
      },
    ],
  },
  {
    name: "Bhupen Hazarika Setu",
    state: "Assam",
    km: 80,
    alt: 112,
    note: "9.15 km over the Lohit — the bridge that ended the ferry era.",
    protocol: "Timed crossings so you never queue behind a convoy at the ramp.",
    coords: [27.363, 95.323],
    images: [
      {
        src: "/images/places/dambuk/Dambuk_6.JPG",
        alt: "The long bridge over the Lohit river",
      },
      {
        src: "/images/places/dambuk/Dambuk_1.jpg",
        alt: "Wide river light near the crossing",
      },
    ],
  },
  {
    name: "Shantipur Gate",
    state: "Assam → Arunachal",
    km: 112,
    alt: 130,
    note: "The ILP checkpoint — where Arunachal begins.",
    protocol: "Permits verified before this gate, never at it.",
    coords: [27.347, 95.579],
    images: [
      {
        src: "/images/places/anini/Anini_1.JPG",
        alt: "Forest road beyond the Shantipur check gate",
      },
    ],
  },
  {
    name: "Roing",
    state: "Arunachal Pradesh",
    km: 150,
    alt: 390,
    note: "Kilometre zero of the climb — last reliable fuel, cash and network.",
    protocol:
      "We stage the night here so the climb runs in one clean daylight push.",
    coords: [28.1428, 95.8428],
    images: [
      {
        src: "/images/places/anini/Anini_2.JPG",
        alt: "Roing bazaar at the foot of the Mishmi Hills",
      },
      {
        src: "/images/places/anini/Anini_3.jpg",
        alt: "Foothill light outside Roing",
      },
    ],
  },
  {
    name: "Coffee House",
    state: "Arunachal Pradesh",
    km: 198,
    alt: 2200,
    note: "The last comfort halt — hot tea above the clouds.",
    protocol: "A fixed leg-stretch and thermos stop on every convoy.",
    coords: [28.209, 95.927],
    images: [
      {
        src: "/images/places/anini/Anini_4.JPG",
        alt: "Cloud forest around the Coffee House halt",
      },
    ],
  },
  {
    name: "Mayodia Pass",
    state: "Arunachal Pradesh",
    km: 206,
    alt: 2655,
    note: "The cloud pass — the route's high point and its weather line.",
    protocol: "We cross before noon; afternoons belong to fog.",
    coords: [28.233, 95.948],
    images: [
      {
        src: "/images/places/anini/Anini_10.JPG",
        alt: "Cloud rolling over Mayodia Pass",
      },
      {
        src: "/images/places/anini/Anini_6.jpg",
        alt: "The road cutting through mist at Mayodia",
      },
    ],
  },
  {
    name: "65 KM",
    state: "Arunachal Pradesh",
    km: 215,
    alt: 2350,
    note: "A place named after a distance — the lunch halt above the tree line.",
    protocol: "Hot packed lunch here, not wherever hunger catches you.",
    coords: [28.241, 95.932],
    images: [
      {
        src: "/images/places/anini/Anini_9.jpg",
        alt: "Above the tree line at the 65 KM halt",
      },
    ],
  },
  {
    name: "Hunli",
    state: "Arunachal Pradesh",
    km: 240,
    alt: 1240,
    note: "First town after the pass — fuel top-up, if the pump is awake.",
    protocol: "Driver checks the vehicle here before the slide-zone corridor.",
    coords: [28.319, 95.823],
    images: [
      {
        src: "/images/places/anini/Anini_8.jpg",
        alt: "Descending toward Hunli",
      },
    ],
  },
  {
    name: "Etalin",
    state: "Arunachal Pradesh",
    km: 325,
    alt: 800,
    note: "Where the Dri meets the valley — the last junction before the plateau.",
    protocol: "Final halt before the last climb; daylight buffer held here.",
    coords: [28.575, 95.895],
    images: [
      {
        src: "/images/places/anini/Anini_3.jpg",
        alt: "River confluence near Etalin",
      },
    ],
  },
  {
    name: "Anini",
    state: "Arunachal Pradesh",
    km: 385,
    alt: 1968,
    note: "The plateau reveal — between the Dri and the Mathun, the festival ground.",
    protocol:
      "Campsite handover, stay check-in, and your valley plan for the week.",
    coords: [28.798, 95.9036],
    images: [
      {
        src: "/images/places/anini-new/anini-new-landscape-13.jpeg",
        alt: "The Anini plateau opening up",
      },
      {
        src: "/images/places/anini-new/anini-new-landscape-11.jpeg",
        alt: "Evening over the Anini plateau",
      },
    ],
  },
];

export interface AwfRouteGem {
  name: string;
  km: number;
  note: string;
}

export const awfRouteGems: AwfRouteGem[] = [
  {
    name: "Kulai ghat",
    km: 30,
    note: "The old ferry point — this crossing once took half a day.",
  },
  {
    name: "First hills",
    km: 135,
    note: "The Mishmi Hills rise out of the plains like a wall.",
  },
  {
    name: "Deopani river",
    km: 158,
    note: "The bridge that floods every monsoon — we check it before you fly.",
  },
  {
    name: "Bamboo corridor",
    km: 172,
    note: "Five kilometres of green tunnel on the lower ascent.",
  },
  {
    name: "Takin country",
    km: 203,
    note: "Mishmi takin territory — horns in the mist if you're lucky.",
  },
  {
    name: "Angolin slide zone",
    km: 262,
    note: "Where landslides own the calendar; we never cross it after rain.",
  },
  {
    name: "Kahaii Kala view",
    km: 350,
    note: "First sight of the ~5,000 m wall guarding the valley.",
  },
  {
    name: "Dri gorge",
    km: 372,
    note: "The river you follow the whole way, suddenly below you.",
  },
];

// Indicative route polyline for the map — milestone coords in order.
export const awfRoutePath: [number, number][] = awfMilestones.map(
  (m) => m.coords,
);
