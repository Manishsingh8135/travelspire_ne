import type { FAQSection } from "@/types/faqs/faq";

// Dambuk — Lower Dibang Valley. Orange country on the banks of the Dibang.
// Commercially tied to the existing OFAM tour products.

export const dambukMeta = {
  name: "Dambuk",
  region: "Lower Dibang Valley",
  state: "Arunachal Pradesh",
  identity: "The orange bowl of Arunachal",
  heroLine: "where the river grows oranges",
} as const;

export const dambukHeroImages = {
  desktop: { src: "/images/places/dambuk/Dambuk_1.jpg", width: 3024, height: 4032 },
  mobile: { src: "/images/places/dambuk/Dambuk_4.JPG", width: 3024, height: 4032 },
  alt: "Golden light over the Dibang riverbanks at Dambuk, Lower Dibang Valley",
} as const;

export const dambukHeroFacts = [
  { value: "Nov–Jan", label: "Orange harvest" },
  { value: "~4 hrs", label: "From Dibrugarh" },
  { value: "ILP", label: "Permit required" },
  { value: "1–2", label: "Days needed" },
] as const;

export const dambukExperiences = [
  {
    index: "01",
    title: "The Orange Orchards",
    story:
      "Dambuk's orchards are the reason most people first hear its name. Walk the rows in harvest season, pick your own, and eat citrus that never saw a cold store.",
    meta: "Nov–Jan · orchard visits with local growers",
    image: "/images/places/dambuk/Dambuk_5.jpg",
    imageAlt: "Orange orchard rows at Dambuk",
  },
  {
    index: "02",
    title: "The Dibang Riverbanks",
    story:
      "Miles of pale shingle and driftwood along one of India's last undammed big rivers. Golden hour here is the photograph everyone takes home.",
    meta: "Sunrise & sunset · all season",
    image: "/images/places/dambuk/Dambuk_3.jpg",
    imageAlt: "The Dibang river flowing past Dambuk's banks",
  },
  {
    index: "03",
    title: "The Bridge That Ended the Ferry Era",
    story:
      "For decades Dambuk was cut off by the river — crossed by boat, when the boat ran. The bridge changed the valley's clock. Drive it at dusk.",
    meta: "On the Roing road · free",
    image: "/images/places/dambuk/Dambuk_6.JPG",
    imageAlt: "The Dibang bridge near Dambuk",
  },
  {
    index: "04",
    title: "Flood Country, Rebuilt",
    story:
      "Dambuk lives with a river that redraws its own map. The story of how this town keeps rebuilding is told best by the people doing it — over orange juice.",
    meta: "Talk to locals · stay a night",
    image: "/images/places/dambuk/Dambuk_7.jpg",
    imageAlt: "Dambuk town and fields under big skies",
  },
] as const;

export const dambukSeasons = [
  { month: "Jan", tone: "best", label: "Oranges, cool air" },
  { month: "Feb", tone: "good", label: "Clear, dry" },
  { month: "Mar", tone: "best", label: "Blossom and light" },
  { month: "Apr", tone: "good", label: "Warm, green" },
  { month: "May", tone: "caution", label: "Hot, pre-monsoon" },
  { month: "Jun", tone: "avoid", label: "Monsoon, river rises" },
  { month: "Jul", tone: "avoid", label: "Flood season" },
  { month: "Aug", tone: "avoid", label: "Flood season" },
  { month: "Sep", tone: "caution", label: "River high, roads wet" },
  { month: "Oct", tone: "good", label: "Green, river settles" },
  { month: "Nov", tone: "best", label: "Harvest begins" },
  { month: "Dec", tone: "best", label: "Peak oranges" },
] as const;

export const dambukFrames = [
  { src: "/images/places/dambuk/Dambuk_1.jpg", alt: "Dibang riverbanks at golden hour", caption: "The Banks" },
  { src: "/images/places/dambuk/Dambuk_2.jpg", alt: "Open river plain at Dambuk", caption: "River Plain" },
  { src: "/images/places/dambuk/Dambuk_4.JPG", alt: "Dambuk skies over the valley floor", caption: "Valley Floor" },
  { src: "/images/places/dambuk/Dambuk_5.jpg", alt: "Orchard rows in Dambuk", caption: "Orchard Rows" },
  { src: "/images/places/dambuk/Dambuk_6.JPG", alt: "The Dibang bridge approach", caption: "The Bridge" },
  { src: "/images/places/dambuk/Dambuk_7.jpg", alt: "Fields and settlement at Dambuk", caption: "Dambuk Town" },
] as const;

export const dambukFaqSection: FAQSection = {
  title: "Dambuk — practical questions",
  description: "Orange country logistics, answered by the team that runs this road.",
  faqs: [
    {
      id: "dambuk-oranges",
      question: "When is orange season in Dambuk?",
      answer:
        "Harvest runs roughly November to January, with December the peak. Orchard visits in season usually include picking your own fruit and buying at farm-gate prices. Outside harvest, the riverbanks, bridge and valley light are still worth the trip — but oranges are the headline.",
    },
    {
      id: "dambuk-reach",
      question: "How do I reach Dambuk?",
      answer:
        "Fly or take the train to Dibrugarh, then roughly four hours by road into Lower Dibang Valley, crossing the Dibang by bridge. Dambuk pairs naturally with Roing and Anini on the same journey — most of our travellers do it as the first or last chapter of a longer Dibang trip.",
    },
    {
      id: "dambuk-permit",
      question: "Do I need a permit for Dambuk?",
      answer:
        "Yes — Dambuk is in Arunachal Pradesh, so non-residents need an Inner Line Permit. Apply online in 15–30 minutes, or let us handle it as part of your booking.",
    },
    {
      id: "dambuk-days",
      question: "Is a day trip enough for Dambuk?",
      answer:
        "A day covers the orchards and the riverbanks at a relaxed pace. Stay a night if you can — the river at dawn and the unhurried version of the town are the real thing. Dambuk also works as the soft landing before or after the harder Anini road.",
    },
    {
      id: "dambuk-combine",
      question: "Can I combine Dambuk with Anini and Dong Valley?",
      answer:
        "That's exactly how our routes are built: Dambuk and Roing first, then up over Mayodia to Anini — or east to Dong Valley for India's first sunrise. One permit covers the circuit; we sequence the driving so every leg is in daylight.",
    },
  ],
} as const;

export const dambukNextPlaces = [
  {
    name: "Anini",
    blurb: "Up over the cloud pass to the quietest headquarters in India.",
    href: "/places/anini",
    image: "/images/places/anini-new/anini-new-portrait-4.jpg",
  },
  {
    name: "Dong Valley",
    blurb: "India's first sunrise, at the far eastern frontier.",
    href: "/tours/dong-valley-expedition",
    image: "/images/places/dong-new/dong-new-landscape-8.jpg",
  },
  {
    name: "Dibang Valley",
    blurb: "The whole region, one hub — rivers, passes and plateaus.",
    href: "/places/dibang-valley",
    image: "/images/places/pomo/pomo1.JPG",
  },
] as const;
