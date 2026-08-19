import type { FAQSection } from "@/types/faqs/faq";

// Dibang Valley regional hub — the umbrella page that ties the whole cluster together.
// Covers the Dibang region broadly: Dibang Valley district (Anini side) + Lower Dibang (Roing/Dambuk side).

export const valleyMeta = {
  name: "Dibang Valley",
  region: "Eastern Arunachal Pradesh",
  identity: "India's emptiest frontier",
  heroLine: "one river, two worlds",
} as const;

export const valleyHeroImages = {
  desktop: { src: "/images/places/pomo/pomo1.JPG", width: 3024, height: 4032 },
  mobile: { src: "/images/places/anini-new/anini-new-portrait-4.jpg", width: 3024, height: 4032 },
  alt: "Vast grasslands and ridgelines of the Dibang region, Arunachal Pradesh",
} as const;

export const valleyHeroFacts = [
  { value: "9,129", label: "km² — India's largest district" },
  { value: "< 1", label: "person per km²" },
  { value: "2,655 m", label: "Mayodia Pass" },
  { value: "Oct–Apr", label: "Best window" },
] as const;

// The valley's chapters — the places grid, but rendered as big story tiles, not small cards.
export const valleyChapters = [
  {
    index: "01",
    name: "Anini",
    tag: "The high plateau",
    story:
      "The quietest district headquarters in India, at 1,970 m. Clouds below, ridges above, and a night sky with no competition.",
    meta: "235 km from Roing · via Mayodia Pass",
    href: "/places/anini",
    image: "/images/places/anini-new/anini-new-landscape-13.jpeg",
    imageAlt: "The high plateau at Anini",
  },
  {
    index: "02",
    name: "Dambuk",
    tag: "Orange country",
    story:
      "Riverside orchards on the Dibang's banks. Harvest season turns the whole town into a citrus market under golden light.",
    meta: "Lower Dibang · Nov–Jan harvest",
    href: "/places/dambuk",
    image: "/images/places/dambuk/Dambuk_1.jpg",
    imageAlt: "The Dibang riverbanks at Dambuk",
  },
  {
    index: "03",
    name: "Roing",
    tag: "The gateway",
    story:
      "Last fuel, last full network, first checkpoint. Every Dibang journey starts here — and the best ones linger a day.",
    meta: "NH-313 begins · lake, falls, forest",
    href: "/places/roing",
    image: "/images/places/anini/Anini_2.JPG",
    imageAlt: "The road through the hills of the Dibang foothills",
  },
  {
    index: "04",
    name: "Mayodia",
    tag: "The cloud pass",
    story:
      "2,655 m of ridge between the low valley and the high one. Snow in winter, cloud in monsoon, prayer flags all year.",
    meta: "56 km above Roing · the hinge of NH-313",
    href: "/places/anini#route",
    image: "/images/places/anini/Anini_10.JPG",
    imageAlt: "Cloud-wrapped ridgelines on the way to Mayodia Pass",
  },
  {
    index: "05",
    name: "Dri & Pomo",
    tag: "The upper valleys",
    story:
      "Beyond Anini the road thins to a line. Dri Valley's river flats and Pomo's high grasslands are the far edge of the map.",
    meta: "Permit territory · guided only",
    href: "/places/anini",
    image: "/images/places/pomo/pomo1.JPG",
    imageAlt: "Pomo grasslands beyond Anini",
  },
  {
    index: "06",
    name: "Idu Mishmi Country",
    tag: "The people",
    story:
      "One of Arunachal's major tribes, keepers of the valley's forests and its strict conservation code. Villages here run on their own time.",
    meta: "Homestays · woven textiles · tiger taboo",
    href: "/places/anini",
    image: "/images/places/anini-new/anini-new-landscape-11.jpeg",
    imageAlt: "Idu Mishmi country in Dibang Valley",
  },
] as const;

export const valleyRiver = {
  title: "The river that draws the map",
  body: [
    "The Dibang begins in snow near the China border and falls two and a half vertical kilometres through the valley that carries its name. Everything here — every road, orchard, village and bridge — is arranged around where the river allows.",
    "It is one of the last great undammed rivers in India. In Dambuk it is wide, pale and slow. Above Roing it narrows to white water. At Anini it is a mountain stream you can hear from the ridge. Follow it upstream and you have understood the whole region.",
  ],
  image: "/images/places/dambuk/Dambuk_3.jpg",
  imageAlt: "The Dibang river flowing through the valley",
} as const;

export const valleySeasons = [
  {
    month: "Jan",
    tone: "best",
    label: "Oranges low, snow high",
    low: { temp: "10–22 °C", state: "Harvest peak — orchards heavy, river beaches dry and golden" },
    high: { temp: "-4–8 °C", state: "Snow on Mayodia; Anini crisp and clear between spells" },
    weSay: "Do both in one trip — oranges in Dambuk on the way up, snow at the pass on the way to Anini.",
  },
  {
    month: "Feb",
    tone: "good",
    label: "Clear passes",
    low: { temp: "12–24 °C", state: "Cool, dry, perfect riverbank days" },
    high: { temp: "-2–10 °C", state: "Snow receding, roads reopening, skies scrubbed clean" },
    weSay: "Reh festival season in Idu country — the valley at its most hospitable.",
  },
  {
    month: "Mar",
    tone: "best",
    label: "Blossom to ridge",
    low: { temp: "16–28 °C", state: "Wildflower bloom along the river flats" },
    high: { temp: "2–14 °C", state: "Rhododendrons fire on the climb — the prettiest ascent of the year" },
    weSay: "Photographers: this is your month. Blossom low, bloom high.",
  },
  {
    month: "Apr",
    tone: "good",
    label: "Warm, green",
    low: { temp: "19–30 °C", state: "Lush and warm; afternoons build toward showers" },
    high: { temp: "5–16 °C", state: "Green returning to the plateau, waterfalls swelling" },
    weSay: "Go early in the month, and keep plans flexible after noon.",
  },
  {
    month: "May",
    tone: "caution",
    label: "Pre-monsoon haze",
    low: { temp: "22–31 °C", state: "Humid, hazy, river rising" },
    high: { temp: "7–15 °C", state: "Views come and go behind cloud; trails turn slick" },
    weSay: "Possible with buffers — we add a flex day and watch the IMD bulletins.",
  },
  {
    month: "Jun",
    tone: "avoid",
    label: "Monsoon begins",
    low: { temp: "24–32 °C", state: "First big rains; ferries on alert" },
    high: { temp: "8–15 °C", state: "Slides begin on the corridor; Mayodia wraps in cloud" },
    weSay: "We don't run the high valley now. Neither should anyone.",
  },
  {
    month: "Jul",
    tone: "avoid",
    label: "Floods, landslides",
    low: { temp: "25–32 °C", state: "Peak rain — Dambuk's flood months arrive" },
    high: { temp: "9–15 °C", state: "NH-313 cut repeatedly; the corridor belongs to the river" },
    weSay: "The valley rests. So should your plans.",
  },
  {
    month: "Aug",
    tone: "avoid",
    label: "Roads at risk",
    low: { temp: "25–32 °C", state: "Rain continues, rivers bank-full" },
    high: { temp: "9–14 °C", state: "Unstable slopes; clearance crews working, not cruising" },
    weSay: "Late August is the earliest we even start watching the road again.",
  },
  {
    month: "Sep",
    tone: "caution",
    label: "Fest season, wet roads",
    low: { temp: "23–31 °C", state: "Rain easing, land draining, skies opening" },
    high: { temp: "6–13 °C", state: "Roads reopen — festival month on the plateau" },
    weSay: "Festival season. Go with a crew that knows which stretches still weep.",
  },
  {
    month: "Oct",
    tone: "best",
    label: "Post-monsoon clarity",
    low: { temp: "18–28 °C", state: "Washed clean — the year’s clearest river days" },
    high: { temp: "2–12 °C", state: "Razor-sharp ridgelines, waterfalls at full voice" },
    weSay: "Every view at maximum. Book early — the whole valley knows.",
  },
  {
    month: "Nov",
    tone: "best",
    label: "Best overall month",
    low: { temp: "14–25 °C", state: "First oranges on the trees, perfect light" },
    high: { temp: "-1–10 °C", state: "Dry, cold, empty roads and huge horizons" },
    weSay: "If you can only come once, come now. This is the month we plan around.",
  },
  {
    month: "Dec",
    tone: "best",
    label: "Cold, empty, golden",
    low: { temp: "11–23 °C", state: "Harvest begins; bonfire weather on the beaches" },
    high: { temp: "-3–9 °C", state: "First snow flirts with the pass; silence on the plateau" },
    weSay: "Golden light, zero crowds. Pack layers and thank us later.",
  },
] as const;

export const valleyFaqSection: FAQSection = {
  title: "Dibang Valley — the big questions",
  description: "What the whole region is, how it fits together, and how to do it right.",
  faqs: [
    {
      id: "valley-what",
      question: "What exactly is Dibang Valley?",
      answer:
        "Two districts sharing one river: Lower Dibang Valley (Roing, Dambuk) in the foothills, and Dibang Valley district (Anini and beyond) in the high mountains. Dibang Valley district is India's largest by area and emptiest by population — fewer than one person per square kilometre. Together they make one of the last genuinely wild corners of the country.",
    },
    {
      id: "valley-days",
      question: "How many days do I need for Dibang Valley?",
      answer:
        "Five days is the honest minimum: two for the road up and down, three for Anini and the upper valleys. A week lets you add Dambuk's orchards and Roing's lake without rushing. Ten days is the full expedition — Athu Popu, Dri, Pomo, and weather buffers included.",
    },
    {
      id: "valley-permit",
      question: "What permits do I need?",
      answer:
        "An Inner Line Permit mentioning Dibang Valley, checked at multiple posts. Apply online in 15–30 minutes, or let us handle it with your booking. Areas beyond Anini toward the border may need additional clearance — we arrange that too.",
    },
    {
      id: "valley-when",
      question: "When is the best time to visit Dibang Valley?",
      answer:
        "October to April. November is the sweet spot — post-monsoon clarity, harvest season in Dambuk, and passes still open. December–January bring snow to Mayodia and bitter cold to Anini. June–August is monsoon: floods below, landslides above, and we will tell you not to come.",
    },
    {
      id: "valley-safe",
      question: "Is Dibang Valley safe to travel?",
      answer:
        "Yes, with respect for the road. The people are warm, the towns are quiet, and the real risks are mountain-road ones: weather, landslides and daylight. That's why every Travelspire route departs by 6 AM, carries a buffer day, and never drives after sunset.",
    },
    {
      id: "valley-fest",
      question: "Can I combine the valley with Anini Winter Fest?",
      answer:
        "That's the best way to do it. The festival (September) sits right at the edge of the good season — arrive a few days early for Dambuk and Roing, or stay after for the upper valleys as October's clarity comes in.",
    },
  ],
} as const;

export const valleyNextPlaces = [
  {
    name: "Anini",
    blurb: "The flagship guide — everything about the high plateau.",
    href: "/places/anini",
    image: "/images/places/anini-new/anini-new-portrait-4.jpg",
  },
  {
    name: "Dambuk",
    blurb: "Orange orchards and riverbank light in the low valley.",
    href: "/places/dambuk",
    image: "/images/places/dambuk/Dambuk_1.jpg",
  },
  {
    name: "Anini Winter Fest",
    blurb: "Two days of music at 1,970 m — we're the official travel partner.",
    href: "/anini-winter-fest-2026",
    image: "/images/places/anini-new/anini-new-landscape-13.jpeg",
  },
] as const;
