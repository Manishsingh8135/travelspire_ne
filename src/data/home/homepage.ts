// Content model for the Travelspire NE brand homepage.
//
// Editorial direction (Aug 2026): a beautifully edited field guide with a
// clear commercial path. Image-led, spacious, honest about what Travelspire
// actually operates — Arunachal Pradesh first, Assam as the base, the wider
// Northeast through festivals and permit guidance.
//
// Data rule: featured journeys are derived from the canonical tour records
// in `@/data/tours` — never hand-duplicated prices here.

import { regularTours } from "@/data/tours/tour-data";
import { testimonialData } from "@/data/testimonials/testimonial-data";
import { isRegularTour, type RegularTour, type Tour } from "@/types/tours/tour";

// ─── Hero ───────────────────────────────────────────────────────────────────

export const homeHero = {
  eyebrow: "A local travel company · Dibrugarh, Assam",
  title: "Northeast India,",
  highlightedTitle: "travelled properly.",
  description:
    "Locally guided tours, remote expeditions, cultural encounters and festival journeys across Arunachal Pradesh, Assam and the wider Northeast.",
  images: {
    alt: "A journey vehicle on a mountain road through a valley in Mechuka, Arunachal Pradesh",
    desktop: {
      src: "/images/places/mechuka-new/mechuka-new-landscape-16.JPG",
      width: 3664,
      height: 2061,
    },
    mobile: {
      src: "/images/places/mechuka-new/mechuka-new-portrait-2.jpg",
      width: 3024,
      height: 4032,
    },
  },
  coordinates: "27.47°N · 95.01°E · Dibrugarh, Assam",
} as const;

// ─── Quiet trust strip ──────────────────────────────────────────────────────
// Restrained, factual, defensible. No numeric claims until verified.

export const homeTrustItems = [
  { icon: "MapPin", label: "Locally guided" },
  { icon: "FileCheck2", label: "Permit assistance" },
  { icon: "Users", label: "Group & private departures" },
  { icon: "ShieldCheck", label: "Secure online booking" },
  { icon: "Warehouse", label: "Dibrugarh-based operations" },
] as const;

// ─── Journey types ──────────────────────────────────────────────────────────

export interface HomeJourneyType {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  image: string;
  imageAlt: string;
  external?: boolean;
}

export const homeJourneyTypes: HomeJourneyType[] = [
  {
    title: "Signature expeditions",
    description: "Long-form circuits that join the far east of India properly.",
    href: "/tours/mechuka-dong-anini-tour-package",
    linkLabel: "See the grand circuit",
    image: "/images/tours/mechuka-dong-anini/mechuka-dong-anini-tour-hero.jpg",
    imageAlt: "A valley road journey through Mechuka on the grand Arunachal circuit",
  },
  {
    title: "Adventure & trekking",
    description: "Pomo Grassland, Dong sunrise, waterfall country and remote valleys.",
    href: "/all-tours?category=Adventure",
    linkLabel: "Browse adventures",
    image: "/images/places/pomo/pomo3.JPG",
    imageAlt: "Trekkers on the high Pomo Grassland above the Dri valley",
  },
  {
    title: "Culture & slow travel",
    description: "Monasteries, village stays, local markets, food and community.",
    href: "/places/dibang-valley",
    linkLabel: "Explore Dibang Valley",
    image: "/images/places/mechuka-new/mechuka-new-portrait-8.jpg",
    imageAlt: "Wooden homes and prayer flags in a Mechuka village",
  },
  {
    title: "Festivals & music",
    description: "Anini Winter Fest, Ziro, Hornbill and the Orange Festival.",
    href: "/all-tours?category=Festival",
    linkLabel: "See festival journeys",
    image: "/images/places/hornbill/Hornbill_3.PNG",
    imageAlt: "Traditional performers at the Hornbill Festival in Nagaland",
  },
  {
    title: "Custom journeys",
    description: "Private departures — route, transport, stays and permits, shaped for you.",
    href: "custom",
    linkLabel: "Start a custom plan",
    image: "/images/places/anini/Anini_10.JPG",
    imageAlt: "The mountain road from Roing towards Anini",
    external: true,
  },
];

// ─── Featured journeys (canonical data) ─────────────────────────────────────

const featuredSlugs = [
  "mechuka-dong-anini-tour-package",
  "anini-pomo-grassland-expedition",
  "pomo-trek-expedition",
  "mechuka-expedition",
  "dong-valley-expedition",
  "tawang-expedition",
] as const;

export interface HomeFeaturedJourney {
  slug: string;
  title: string;
  location: string;
  duration: string;
  difficulty: Tour["difficulty"];
  startDate: string;
  fromPrice: number;
  href: string;
  image: string;
  imageAlt: string;
}

function toFeaturedJourney(tour: RegularTour): HomeFeaturedJourney {
  return {
    slug: tour.slug,
    title: tour.title,
    location: tour.location,
    duration: tour.duration,
    difficulty: tour.difficulty,
    startDate: tour.startDate,
    fromPrice: tour.price,
    href: `/tours/${tour.slug}`,
    image: tour.heroImage,
    imageAlt: `${tour.title} — ${tour.location}`,
  };
}

export const homeFeaturedJourneys: HomeFeaturedJourney[] = featuredSlugs.map(
  (slug) => {
    const tour = regularTours.find((t) => t.slug === slug);
    if (!tour || !isRegularTour(tour)) {
      throw new Error(`Homepage featured journey missing from tour data: ${slug}`);
    }
    return toFeaturedJourney(tour);
  },
);

// ─── Destination atlas ──────────────────────────────────────────────────────

export interface HomeAtlasDestination {
  name: string;
  whyGo: string;
  href: string;
  image: string;
  imageAlt: string;
  linkLabel: string;
}

export const homeAtlas: HomeAtlasDestination[] = [
  {
    name: "Anini",
    whyGo: "High plateau, waterfalls and Idu Mishmi country.",
    href: "/places/anini",
    image: "/images/places/anini-new/anini-new-portrait-4.jpg",
    imageAlt: "Cloud-covered ridges above Anini in Dibang Valley",
    linkLabel: "Anini travel guide",
  },
  {
    name: "Dibang Valley",
    whyGo: "One river, two worlds — the whole region in one hub.",
    href: "/places/dibang-valley",
    image: "/images/places/pomo/pomo1.JPG",
    imageAlt: "The open grasslands and ridges of Dibang Valley",
    linkLabel: "Dibang Valley hub",
  },
  {
    name: "Mechuka",
    whyGo: "Monastery valley, old bridges and long-road silence.",
    href: "/tours/mechuka-expedition",
    image: "/images/places/mechuka-new/mechuka-new-portrait-3.jpg",
    imageAlt: "A quiet corner of Mechuka Valley, West Siang",
    linkLabel: "Mechuka expedition",
  },
  {
    name: "Dong & Walong",
    whyGo: "India's first light and the eastern mountain villages.",
    href: "/tours/dong-valley-expedition",
    image: "/images/places/dong-new/dong-new-portrait-3.jpg",
    imageAlt: "Dawn over the far-eastern ridges of Dong Valley",
    linkLabel: "Dong Valley expedition",
  },
  {
    name: "Dambuk",
    whyGo: "Orange orchards and Dibang river country.",
    href: "/places/dambuk",
    image: "/images/places/dambuk/Dambuk_2.jpg",
    imageAlt: "The wide riverine plains of Dambuk",
    linkLabel: "Dambuk travel guide",
  },
  {
    name: "Roing",
    whyGo: "The gateway before the high road.",
    href: "/places/roing",
    image: "/images/places/anini/Anini_10.JPG",
    imageAlt: "The road out of Roing towards Mayodia Pass",
    linkLabel: "Roing travel guide",
  },
  {
    name: "Tawang",
    whyGo: "The great monastery road of the west.",
    href: "/tours/tawang-expedition",
    image: "/images/places/tawang/Tawang_3.JPG",
    imageAlt: "High mountain scenery on the road to Tawang",
    linkLabel: "Tawang expedition",
  },
];

// The wider Northeast, honestly framed: festival reach and permit guidance,
// not fully developed product hubs.
export const homeWiderNortheast = [
  { name: "Assam", note: "our home base", href: "/guides/dibrugarh-to-anini" },
  { name: "Nagaland", note: "Hornbill Festival & ILP", href: "/permits/nagaland-ilp" },
  { name: "Mizoram", note: "ILP guidance", href: "/permits/mizoram-ilp" },
  { name: "Manipur", note: "ILP guidance", href: "/permits/manipur-ilp" },
  { name: "Sikkim", note: "PAP guidance", href: "/permits/sikkim-permit" },
] as const;

// ─── Why Travelspire ────────────────────────────────────────────────────────

export const homeWhyPoints = [
  {
    title: "Local route knowledge",
    body: "Every route is one we have driven ourselves — including the honest parts, like where not to drive after dark.",
  },
  {
    title: "Transparent package pricing",
    body: "The price on the page is the price at checkout, verified on the server before you pay.",
  },
  {
    title: "Permit & paperwork assistance",
    body: "Inner Line Permits arranged before you travel. The biggest friction of Northeast travel, removed.",
  },
  {
    title: "Ground transport coordination",
    body: "Our own fleet and drivers — Boleros to Fortuners — matched to the road, not the other way round.",
  },
  {
    title: "Carefully selected stays",
    body: "Homestays and camps we know personally — Idu Mishmi homes over anonymous hotels.",
  },
  {
    title: "Human support, throughout",
    body: "A real person on WhatsApp before, during and after the trip. Not a ticket queue.",
  },
] as const;

export const homeWhyPhotos = [
  {
    src: "/images/places/anini/Anini_10.JPG",
    alt: "The mountain road between Roing and Anini",
    label: "The roads",
  },
  {
    src: "/images/places/anini/Anini_6.jpg",
    alt: "A cottage stay in the hills around Anini",
    label: "The stays",
  },
  {
    src: "/images/team/Sandeep.JPG",
    alt: "Sandeep Sonowal, founder of Travelspire NE",
    label: "The people",
  },
] as const;

// ─── How booking works ──────────────────────────────────────────────────────

export const homeBooking = {
  models: [
    {
      title: "A ready-made package",
      steps: [
        "Choose a tour and package.",
        "Select travellers and date.",
        "Pay the server-verified amount through PayU.",
        "Receive a verified receipt by email.",
      ],
      cta: { label: "Browse all tours", href: "/all-tours" },
    },
    {
      title: "A custom or private journey",
      steps: [
        "Speak with the Travelspire team.",
        "Confirm dates, rooms, vehicle and inclusions.",
        "Receive a private payment link.",
        "Pay the confirmed amount securely.",
      ],
      cta: { label: "Talk to a trip planner", href: "whatsapp" },
    },
  ],
  assurances: [
    "Prices are verified on the server before payment",
    "This site never sees or stores your card details",
    "The payment screen is hosted by PayU",
    "A verified receipt lands in your email",
  ],
} as const;

// ─── Permits & planning ─────────────────────────────────────────────────────

export const homePermitLinks = [
  { name: "Arunachal Pradesh ILP", href: "/permits/arunachal-pradesh-ilp" },
  { name: "Nagaland ILP", href: "/permits/nagaland-ilp" },
  { name: "Mizoram ILP", href: "/permits/mizoram-ilp" },
  { name: "Manipur ILP", href: "/permits/manipur-ilp" },
  { name: "Sikkim PAP", href: "/permits/sikkim-permit" },
  { name: "Dibrugarh to Anini route guide", href: "/guides/dibrugarh-to-anini" },
] as const;

// ─── Field notes & travel guides ────────────────────────────────────────────

export const homeGuides = [
  {
    title: "The Way to Anini",
    value: "The Dibrugarh–Anini road in nine chapters — the drive is half the journey.",
    href: "/guides/dibrugarh-to-anini",
    image: "/images/places/anini-new/anini-new-landscape-11.jpeg",
    imageAlt: "Mist rolling over the mountains on the road to Anini",
  },
  {
    title: "Planning Anini",
    value: "Stays, seasons, experiences and permits for the high plateau.",
    href: "/places/anini",
    image: "/images/places/anini-new/anini-new-portrait-1.jpg",
    imageAlt: "A quiet morning in Anini, Dibang Valley",
  },
  {
    title: "Understanding Dibang Valley",
    value: "Anini, Dambuk, Roing, Mayodia and how the region fits together.",
    href: "/places/dibang-valley",
    image: "/images/places/pomo/pomo5.jpg",
    imageAlt: "The high grassland country of Dibang Valley",
  },
  {
    title: "The Arunachal ILP, plainly",
    value: "What the Inner Line Permit is, who needs it and how to get it.",
    href: "/permits/arunachal-pradesh-ilp",
    image: "/images/places/dong-new/dong-new-portrait-6.jpg",
    imageAlt: "A checkpoint road in the eastern hills of Arunachal Pradesh",
  },
] as const;

// ─── Traveller stories ──────────────────────────────────────────────────────
// Sourced from the canonical testimonial data. No ratings schema — only what
// is visibly written here.

export const homeStories = testimonialData.testimonials.map((story) => ({
  id: story.id,
  quote: story.content,
  name: story.author.name,
  origin: story.author.location,
  tourName: story.travelDetails.tourName,
  destination: story.travelDetails.destination,
  travelDate: story.travelDetails.travelDate,
  image: story.media?.[0]?.url ?? "",
  imageAlt: story.media?.[0]?.caption ?? "",
}));

// ─── Final planning CTA ─────────────────────────────────────────────────────

export const homeFinalCta = {
  image: "/images/places/dong-new/dong-new-landscape-8.jpg",
  imageAlt: "Blue hour over the eastern ridgelines of Dong Valley, Arunachal Pradesh",
} as const;
