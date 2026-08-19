import type { FAQSection } from "@/types/faqs/faq";

// Roing — Lower Dibang Valley. The gateway town: last fuel, last full network,
// first checkpoint. Every Anini journey passes through; the good ones linger.

export const roingMeta = {
  name: "Roing",
  region: "Lower Dibang Valley",
  state: "Arunachal Pradesh",
  identity: "The gateway to the high valley",
  heroLine: "where every Anini journey begins",
} as const;

export const roingHeroImages = {
  desktop: { src: "/images/places/anini/Anini_2.JPG", width: 3024, height: 4032 },
  mobile: { src: "/images/places/anini-new/anini-new-portrait-6.jpg", width: 3024, height: 4032 },
  alt: "Foothill road through Lower Dibang Valley near Roing",
} as const;

export const roingHeroFacts = [
  { value: "~3.5 hrs", label: "From Dibrugarh" },
  { value: "0 km", label: "Mile zero of NH-313" },
  { value: "ILP", label: "Permit required" },
  { value: "1", label: "Day well spent" },
] as const;

export const roingExperiences = [
  {
    index: "01",
    title: "Mehao Lake",
    story:
      "A still, forest-walled lake just outside town — the valley's soft opening scene before the mountains take over. Go early, when the mist is still on the water.",
    meta: "Morning · short drive from town",
    image: "/images/places/anini/Anini_3.jpg",
    imageAlt: "Still water and forest in the foothills near Roing",
  },
  {
    index: "02",
    title: "The Last Full Stop",
    story:
      "Fuel, cash, network, supplies — Roing is where the checklist gets finished. Beyond here, NH-313 climbs for 235 km with no second chances. We treat this stop as sacred.",
    meta: "Depart by 6 AM · tank full",
    image: "/images/places/anini/Anini_4.JPG",
    imageAlt: "The foothill road out of Roing toward the mountains",
  },
  {
    index: "03",
    title: "Bhishmaknagar's Old Walls",
    story:
      "Brick ruins of a fort older than most maps of this region, wrapped in forest outside town. The valley was never empty — it just keeps its history quiet.",
    meta: "Half-day · combine with the lakes",
    image: "/images/places/anini/Anini_6.jpg",
    imageAlt: "Forest and old ground near Bhishmaknagar",
  },
  {
    index: "04",
    title: "The Foothill Light",
    story:
      "Roing's reward is the evening: the Dibang widening below, the first high ridges turning blue. Stand anywhere east of town at dusk and you'll understand the valley's scale.",
    meta: "Sunset · free",
    image: "/images/places/anini/Anini_8.jpg",
    imageAlt: "Dusk light over the foothills of Lower Dibang Valley",
  },
] as const;

export const roingSeasons = [
  { month: "Jan", tone: "best", label: "Cool, clear, quiet" },
  { month: "Feb", tone: "good", label: "Dry roads" },
  { month: "Mar", tone: "best", label: "Blossom season" },
  { month: "Apr", tone: "good", label: "Warm, green" },
  { month: "May", tone: "caution", label: "Pre-monsoon heat" },
  { month: "Jun", tone: "avoid", label: "Monsoon arrives" },
  { month: "Jul", tone: "avoid", label: "Flood season" },
  { month: "Aug", tone: "avoid", label: "Roads at risk" },
  { month: "Sep", tone: "caution", label: "Wet, river high" },
  { month: "Oct", tone: "good", label: "Post-monsoon green" },
  { month: "Nov", tone: "best", label: "Clear skies begin" },
  { month: "Dec", tone: "best", label: "Cold mornings, gold light" },
] as const;

export const roingFrames = [
  { src: "/images/places/anini/Anini_1.JPG", alt: "The foothill landscape near Roing", caption: "The Foothills" },
  { src: "/images/places/anini/Anini_3.jpg", alt: "Forest and still water near Roing", caption: "Mehao Country" },
  { src: "/images/places/anini/Anini_4.JPG", alt: "The road out of Roing toward Mayodia", caption: "Mile Zero" },
  { src: "/images/places/anini/Anini_8.jpg", alt: "Evening light over the low valley", caption: "Dusk Light" },
  { src: "/images/places/anini/Anini_9.jpg", alt: "The widening Dibang in the low valley", caption: "The River Below" },
  { src: "/images/places/anini-new/anini-new-landscape-11.jpeg", alt: "High ridgelines visible from the foothill road", caption: "The Ridges Above" },
] as const;

export const roingFaqSection: FAQSection = {
  title: "Roing — gateway questions",
  description: "The last town before the climb, answered by the team that stages here every week.",
  faqs: [
    {
      id: "roing-why",
      question: "Is Roing worth a stop, or just a drive-through?",
      answer:
        "A stop. Every Anini journey stages here anyway — fuel, cash, permits, supplies — and a night turns an errand into a chapter: Mehao Lake at dawn, Bhishmaknagar's ruins by midday, foothill light at dusk. Then you climb at 6 AM, rested and ready.",
    },
    {
      id: "roing-reach",
      question: "How do I reach Roing?",
      answer:
        "Fly or take the train to Dibrugarh, then roughly three and a half hours by road via the Dhola–Sadiya bridge. Roing is mile zero of NH-313 — from here the road climbs 235 km over Mayodia Pass to Anini.",
    },
    {
      id: "roing-permit",
      question: "Do I need a permit for Roing?",
      answer:
        "Yes — Roing is in Arunachal Pradesh, so non-residents need an Inner Line Permit. If you're continuing to Anini, make sure it mentions Dibang Valley. Apply online in minutes, or let us handle it with your booking.",
    },
    {
      id: "roing-supplies",
      question: "What should I do in Roing before heading to Anini?",
      answer:
        "Fill the tank, withdraw cash, download offline maps, charge everything, and sleep early. Roing is your last reliable fuel, ATM and full network before Anini — our drivers treat this stop as non-negotiable, and so should you.",
    },
    {
      id: "roing-combine",
      question: "Can I combine Roing with Dambuk and Anini?",
      answer:
        "That's the standard Travelspire sequence: Dambuk's orchards and riverbanks, a night in Roing, then the dawn climb over Mayodia to Anini. One permit, one driver, and every leg in daylight.",
    },
  ],
} as const;

export const roingNextPlaces = [
  {
    name: "Anini",
    blurb: "The climb pays off — the high plateau, 235 km up.",
    href: "/places/anini",
    image: "/images/places/anini-new/anini-new-portrait-4.jpg",
  },
  {
    name: "Dambuk",
    blurb: "Orange orchards and riverbanks, just downstream.",
    href: "/places/dambuk",
    image: "/images/places/dambuk/Dambuk_1.jpg",
  },
  {
    name: "Dibang Valley",
    blurb: "The whole region hub — how it all fits together.",
    href: "/places/dibang-valley",
    image: "/images/places/pomo/pomo1.JPG",
  },
] as const;
