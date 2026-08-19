import type { FAQSection } from "@/types/faqs/faq";

// Content model for Anini Winter Fest 5.0 (19–20 Sep 2026)
// Travelspire NE is the Official Travel & Taxi Partner — festival passes are
// sold by the festival's booking partners (Zaatio, Baahi); Travelspire sells
// the journey: shared transfers, private fleet, stays and valley extensions.

export const awfMeta = {
  name: "Anini Winter Fest",
  edition: "5.0",
  year: "2026",
  dates: { start: "2026-09-19", end: "2026-09-20", label: "19–20 September 2026" },
  location: "Anini, Dibang Valley",
  state: "Arunachal Pradesh",
  coordinates: { lat: "28.78", lng: "95.86" },
  elevation: "1,970 m",
  instagram: "https://instagram.com/anini_winter_fest",
  organizer: "Anini Winter Fest",
  supporters: ["Arunachal Tourism", "District Administration", "District Tourism Dept"],
  awards: [
    { title: "Best Offbeat Mountain Destination", body: "Outlook Traveller Awards 2024" },
    { title: "Best Emerging Adventure Destination", body: "ATOAI 17th Annual Convention" },
  ],
} as const;

export const awfHeroImages = {
  desktop: {
    src: "/images/places/anini-new/anini-new-landscape-11.jpeg",
    width: 4000,
    height: 2250,
  },
  mobile: {
    src: "/images/places/anini-new/anini-new-portrait-7.jpg",
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
  headliner?: boolean;
  tba?: boolean;
}

export const awfArtists: AwfArtist[] = [
  { name: "Revealing Soon", day: 1, genre: "Headliner", origin: "TBA", headliner: true, tba: true },
  { name: "Anurag Dutta", day: 1, genre: "Bollywood", origin: "Assam" },
  { name: "Alo The Band", day: 1, genre: "Bollywood", origin: "Kolkata" },
  { name: "Khaali Frame", day: 1, genre: "Indie · Pop", origin: "Assam" },
  { name: "Kunal Ganjawala", day: 2, genre: "Bollywood · Playback · Pop", origin: "Maharashtra", headliner: true },
  { name: "Moko Kaza", day: 2, genre: "Rap · Hip-Hop", origin: "Nagaland" },
  { name: "Mihir Chandan", day: 2, genre: "DJ · Folktronica", origin: "Maharashtra" },
];

export const awfGenres = ["Indie", "Folk", "Electronic", "Tribal Fusion", "Rock"] as const;

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
    meta: "6–8 hrs · ~235 km",
    body: "NH-313 over the 2,655 m Mayodia Pass, past waterfalls, canyons and suspension bridges. One of India's great mountain drives — depart by 6 AM, never after dark.",
  },
] as const;

export interface AwfRouteStop {
  km: number;
  name: string;
  note: string;
  alt?: string;
}

export const awfRouteStops: AwfRouteStop[] = [
  { km: 0, name: "Roing", note: "Base town — fuel, ATM, market, network", alt: "380 m" },
  { km: 22, name: "Tiwarigaon", note: "Tea & breakfast dhabas before the climb" },
  { km: 48, name: "Mayodia Coffee House", note: "Last comfortable halt before the pass", alt: "2,200 m" },
  { km: 56, name: "Mayodia Pass", note: "Highest point — Mishmi Hills panorama", alt: "2,655 m" },
  { km: 65, name: "65 Mile", note: "Popular roadside lunch halt" },
  { km: 90, name: "Hunli", note: "First proper town after the pass" },
  { km: 140, name: "Kano · Angolin", note: "Landslide caution zone — daylight only" },
  { km: 175, name: "Etalin", note: "Designated lunch stop — ask about road ahead" },
  { km: 235, name: "Anini", note: "Festival grounds · 1,968 m", alt: "1,968 m" },
];

export const awfTravelTips = [
  "Full tank in Roing — no reliable fuel beyond it",
  "Carry cash — no ATMs past Roing",
  "Only Airtel & BSNL on NH-313 — Jio has no coverage",
  "Offline maps before you leave Roing",
  "Depart by 6:00 AM; never drive after sunset",
  "ILP must mention 'Dibang Valley' — checked at multiple posts",
];

export const awfSharedTransfer = {
  name: "Shared Group Pickup & Drop",
  price: 5499,
  unit: "per person",
  window: "Pickup 18 Sept · Drop 21 Sept 2026",
  route: "Dibrugarh → Tinsukia → Roing → Anini",
  pickups: [
    { point: "Dibrugarh", time: "07:00 AM" },
    { point: "Tinsukia", time: "07:30 AM" },
    { point: "Roing", time: "10:00 AM" },
  ],
  meals: [
    { meal: "Breakfast", where: "Roing" },
    { meal: "Lunch", where: "65 Mile" },
    { meal: "Evening snacks / dinner", where: "Angolin" },
  ],
  inclusions: ["Shared vehicle", "Fuel", "Driver", "Driver accommodation", "Vehicle standby"],
  note: "Miss the window and the convoy leaves without you — set two alarms. Timings subject to road and weather.",
} as const;

export const awfFleet = [
  { name: "Fortuner Sigma 4", pricePerDay: 14999, character: "Top of the line — glides over the rough patches" },
  { name: "Scorpio N", pricePerDay: 7999, character: "Festival favourite for groups of 5–6" },
  { name: "Innova Crysta", pricePerDay: 7499, character: "The most comfortable ride for families" },
  { name: "Scorpio Classic", pricePerDay: 6999, character: "The trusted NH-313 workhorse" },
  { name: "Bolero Neo", pricePerDay: 5999, character: "Compact, capable, easy on the pocket" },
  { name: "Bolero Classic", pricePerDay: 5599, character: "Simple and dependable" },
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
  { plan: "4N · 5D", label: "The full Dibang — festival, waterfalls, villages", recommended: true },
];

export const awfBookingSteps = [
  { step: "01", title: "Choose your pass", body: "Explorer or full Festival Pass via the official booking partners." },
  { step: "02", title: "Add adventure", body: "Rafting, jungle hikes, ATV trails — selected in the festival booking flow." },
  { step: "03", title: "Pick your stay", body: "Camps, homestays and lodges — or let us bundle it for you." },
  { step: "04", title: "Ride with us", body: "Shared transfer or private fleet — the journey is our job." },
] as const;

export const awfGallery = [
  { src: "/images/places/anini-new/anini-new-landscape-13.jpeg", alt: "Festival grounds plateau at Anini", caption: "Anini Plateau" },
  { src: "/images/places/pomo/pomo1.JPG", alt: "Pomo grassland horizon under a wide sky", caption: "Pomo Grassland" },
  { src: "/images/places/dong-new/dong-new-landscape-8.jpg", alt: "River view in Karo Valley", caption: "Karo Valley" },
  { src: "/images/places/anini-new/anini-new-portrait-2.jpg", alt: "Dri Valley mountains and river", caption: "Dri Valley" },
  { src: "/images/places/dambuk/Dambuk_1.jpg", alt: "The Dibang river plains at golden hour", caption: "Dibang River" },
  { src: "/images/places/anini-new/anini-new-portrait-6.jpg", alt: "Aeyo Valley ridgeline in mist", caption: "Aeyo Valley" },
  { src: "/images/places/pomo/pomo4.jpg", alt: "Rolling hills of Pomo grassland", caption: "Pomo Grassland" },
  { src: "/images/places/dong-new/dong-new-portrait-6.jpg", alt: "Sacred forest near Athu Popu", caption: "Athu Popu" },
] as const;

export const awfStayLonger = [
  { index: "01", title: "Trekking & Expeditions", tags: ["Dri Valley", "Emuli Grasslands", "Wilderness Camping"] },
  { index: "02", title: "Scenic Viewpoints", tags: ["Sunrise Points", "Valley Overlooks", "Photography Spots"] },
  { index: "03", title: "Waterfalls & Rivers", tags: ["Dibang River", "Natural Pools", "Gorges"] },
  { index: "04", title: "Kiwi Orchards", tags: ["Orchard Visits", "Farm Tourism", "Local Produce"] },
  { index: "05", title: "Adventure Tourism", tags: ["Camping", "ATV Trails", "Off-Road"] },
  { index: "06", title: "Idu Mishmi Heritage", tags: ["Village Walks", "Handicrafts", "Local Cuisine"] },
] as const;

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
  { edition: "1.0", title: "Where It All Began", note: "A raw, intimate community gathering rooted in Idu Mishmi culture." },
  { edition: "2.0", title: "Beyond Expectations", note: "3× attendance growth — word spread beyond Arunachal." },
  { edition: "3.0", title: "A Destination Takes Shape", note: "Adventure tourism arrived; visitors from 5+ states." },
  { edition: "4.0", title: "The Festival Finds Its Identity", note: "Sold-out passes, national artists, tourism-board partnership." },
  { edition: "5.0", title: "The Next Chapter", note: "September 2026 — the wildest edition yet.", current: true },
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
        "Cool mountain days around 15–22°C, cold nights that can dip to 8–10°C, and leftover monsoon showers — September is the late-withdrawal phase. Pack a warm layer, a rain shell and sturdy shoes. The mist rolling over the festival ground is part of the magic.",
    },
    {
      id: "awf-connectivity",
      question: "Is there mobile connectivity at the festival?",
      answer:
        "Expect very limited signal. Only Airtel and BSNL work on NH-313 and around Anini — Jio has no coverage on this route. Download offline maps before leaving Roing and tell family your itinerary in advance. Consider it a feature: two days properly offline.",
    },
    {
      id: "awf-reach",
      question: "How do I reach Anini from Dibrugarh?",
      answer:
        "Dibrugarh airport → Roing (5–6 hrs, ~180 km) → Anini via NH-313 over Mayodia Pass (6–8 hrs, 235 km). The simplest option: our festival shared transfer leaves Dibrugarh at 7:00 AM on 18 September (₹5,499 per person, return on 21 September, meals and permits sorted), or book a private SUV with a driver who knows every slide zone by name.",
    },
    {
      id: "awf-safety",
      question: "Is Anini safe for solo travellers and women?",
      answer:
        "Yes. Dibang Valley is one of India's safest, most close-knit regions, and the festival is built with the Idu Mishmi community. The real risk is the road, not the people — travel in daylight, in a proper SUV, with a driver who knows NH-313. Our convoys and drivers handle exactly that.",
    },
    {
      id: "awf-passes",
      question: "Where do I buy festival passes, and what does Travelspire sell?",
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
