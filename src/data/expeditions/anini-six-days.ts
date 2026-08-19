import type { FAQSection } from "@/types/faqs/faq";

// "Six Days in the Dibang" — the signature Anini + Pomo Grassland expedition.
// 5 nights / 6 days, Dibrugarh → Mayodia → Anini → Pomo → Gipulin → Dibrugarh.
//
// Editorial rule for this page: every number is either sourced from our own
// route ledger (see data/guides/way-to-anini.ts and data/places/anini.ts) or it
// is not stated at all. Where we only know a time and not a distance, we give
// the time. Pomo's summit elevation has never been surveyed to a figure we are
// willing to print, so it is described, never numbered.

export const sixMeta = {
  slug: "anini-pomo-grassland-expedition",
  url: "https://travelspirene.com/tours/anini-pomo-grassland-expedition",
  title: "Six Days in the Dibang",
  serif: "in the Dibang",
  display: "Six Days",
  route: "Dibrugarh · Mayodia · Anini · Pomo · Gipulin",
  duration: "5 Nights / 6 Days",
  edition: "Field Edition",
  season: "October – April",
  updated: "2026-08-19",
  fromPrice: 18999,
  operator: "Travelspire Northeast",
} as const;

export const sixHeroImages = {
  desktop: {
    src: "/images/places/pomo/pomo3.JPG",
    width: 4032,
    height: 3024,
  },
  mobile: {
    src: "/images/places/anini-new/anini-new-portrait-4.jpg",
    width: 3024,
    height: 4032,
  },
  alt: "The rolling high grassland horizon at Pomo, above Anini in Dibang Valley",
} as const;

// The vitals strip under the hero. Mono figures, no adjectives.
export const sixVitals = [
  { value: "6", unit: "days", label: "5 nights" },
  { value: "385", unit: "km", label: "Dibrugarh to Anini" },
  { value: "2,655", unit: "m", label: "Mayodia high point" },
  { value: "03:00", unit: "start", label: "Pomo summit day" },
  { value: "4–6", unit: "pax", label: "Group size" },
] as const;

// ── Overture ────────────────────────────────────────────────────────────────

export const sixOverture = {
  kicker: "The premise",
  lead: "Most people who reach Anini spend one night there and turn around. They see the pass, they photograph the plateau, and they drive back down having never met the country above the town.",
  body: [
    "This is the trip that goes above it. Six days built around a single hard morning — a 3 AM start onto Pomo grassland, twelve hours on foot, back before the light goes — with the rest of the week arranged around it like a properly planned expedition: two easing days before, two recovery days after, and every long drive taken in daylight.",
    "You sleep five nights in Dibang Valley. One of them is in a camp on the river flats with no signal and no walls between you and the water. The other four are in Anini, in a homestay where dinner is whatever the kitchen is cooking and the last night ends at a bonfire.",
  ],
  // Honesty panel — the thing nobody else publishes.
  truths: [
    {
      label: "This is",
      items: [
        "A real trek day — 12 hours, unsupported terrain, one shot at it",
        "Five nights inside the valley, not two nights and a lot of driving",
        "Small groups only: four to six people, one vehicle, one guide",
        "Camp on the Dri flats, homestay in Anini, bonfire on the last night",
      ],
    },
    {
      label: "This is not",
      items: [
        "A soft sightseeing loop — Day 3 will ask something of you",
        "A hotel trip; Anini has homestays and camps, and that is the point",
        "Weather-proof — Mayodia decides, and sometimes it decides against us",
        "Bookable in monsoon. June to August we say no, and mean it",
      ],
    },
  ],
} as const;

// ── Day One elevation profile ───────────────────────────────────────────────
// Sourced from the Travelspire route ledger. Elevations in metres, km measured
// from Dibrugarh. This is the only place on the page where we draw a terrain
// curve, because it is the only leg where we can stand behind every point.

export const sixProfile = {
  title: "The climb",
  subtitle: "Day one, in metres",
  note: "385 km from tea flats to plateau. The first 150 are flat and fast; everything after Roing is mountain.",
  maxElev: 2655,
  nodes: [
    { km: 0, name: "Dibrugarh", elev: 108, note: "Pickup 05:00–06:30. Dark start, deliberately." },
    { km: 40, name: "Bhupen Hazarika Setu", elev: 110, note: "9.15 km of bridge over the Lohit. India's longest." },
    { km: 150, name: "Roing", elev: 390, note: "Mile zero of NH-313. Fuel, ATM, last reliable network." },
    { km: 172, name: "Tiwarigaon", elev: 700, note: "Tea before the road stands up." },
    { km: 198, name: "Coffee House", elev: 2200, note: "Last comfortable halt below the pass." },
    { km: 206, name: "Mayodia Pass", elev: 2655, note: "The weather line. We cross before noon — afternoons belong to fog." },
    { km: 240, name: "Hunli", elev: 1240, note: "First town on the far side." },
    { km: 290, name: "Angolin", elev: 1050, note: "Slide-zone corridor. Driver's country, not passenger's." },
    { km: 325, name: "Etalin", elev: 800, note: "The designated lunch stop." },
    { km: 385, name: "Anini", elev: 1968, note: "The plateau reveal, usually at dusk." },
  ],
} as const;

// ── The six days ────────────────────────────────────────────────────────────

export const sixDays = [
  {
    n: "01",
    day: 1,
    title: "Into the high valley",
    serif: "the long day",
    departs: "05:00 – 06:30",
    from: "Dibrugarh / Tinsukia",
    sleeps: "Anini",
    tone: "ink",
    lede: "The one genuinely long day of the trip, taken deliberately at the front so everything after it is unhurried.",
    story:
      "We leave in the dark because the arithmetic demands it: 385 kilometres, of which 235 are mountain, and a pass that closes itself in cloud most afternoons. Breakfast happens at a dhaba somewhere past the Bhupen Hazarika Setu. By late morning the road has stopped pretending to be flat, and by the time you reach Mayodia at 2,655 metres the temperature has dropped roughly twenty degrees from where you started.",
    closing:
      "Then it all falls away — Hunli, the slide corridor, Etalin for lunch — and the last hour opens onto the Anini plateau. Most guests go quiet here. We let them.",
    waypoints: [
      { name: "Dr. Bhupen Hazarika Setu", note: "9.15 km over the Lohit — India's longest bridge" },
      { name: "Roing", note: "Fuel, permits checked, last dependable signal" },
      { name: "Mayodia Pass", note: "2,655 m · the route's high point and its weather line" },
      { name: "Etalin", note: "Lunch halt on the far side" },
    ],
    image: "/images/places/anini/Anini_10.JPG",
    imageAlt: "Cloud rolling across the ridgelines at Mayodia Pass on the road to Anini",
  },
  {
    n: "02",
    day: 2,
    title: "Waterfall country",
    serif: "the valley floor",
    departs: "08:00 – 09:00",
    from: "Anini",
    sleeps: "Chigu Camp",
    tone: "paper",
    lede: "A full day spent on the valley floor, finishing at a camp on the river with nothing around it.",
    story:
      "Dibang's water does the work today. The valley below Anini is stitched with falls — some roadside, some a short walk in — and the Dri runs through the middle of it in that particular glacial grey-green that photographs badly and looks extraordinary in person. We move slowly. This is the day that makes the trek day possible, because it puts a full day of altitude and walking in your legs without asking for anything hard.",
    closing:
      "You sleep at Chigu, on the flats, in a camp. No walls, no signal, and the river all night. Tomorrow starts at three.",
    waypoints: [
      { name: "Dree Afra", note: "First stop out of Anini" },
      { name: "Mawuando", note: "Viewpoint over the valley" },
      { name: "The Dri", note: "The river that names the country" },
      { name: "Deccan · Ahi · Bruni", note: "Three falls, three moods" },
      { name: "Chigu Camp", note: "Overnight on the river flats" },
    ],
    image: "/images/places/anini-new/anini-new-portrait-8.jpg",
    imageAlt: "Waterfall country in the valley below Anini, Dibang Valley",
  },
  {
    n: "03",
    day: 3,
    title: "Pomo Grassland",
    serif: "twelve hours",
    departs: "03:00",
    from: "Chigu Camp",
    sleeps: "Anini",
    tone: "summit",
    lede: "The reason the other five days exist. Headlamps at three, grassland by late morning, down before the light goes.",
    story:
      "There is no way to make this day comfortable, so we make it early instead. You walk out of camp in the dark with a headlamp and a guide who has done this since he was a boy, and you climb through forest for the first several hours while the sky slowly stops being black. The tree line gives way to open slope, the slope gives way to grass, and then the horizon simply keeps going — rolling meadow in every direction with the Mishmi ridges stacked behind it.",
    closing:
      "You get a couple of hours up there. Then you turn around, because coming down takes as long as going up and nobody descends this in the dark. Back in Anini by evening, and dinner tastes better than it has any right to.",
    waypoints: [
      { name: "03:00 · Headlamps", note: "Out of Chigu on foot" },
      { name: "Forest section", note: "The long dark climb" },
      { name: "Tree line", note: "Where the sky opens" },
      { name: "Pomo Grassland", note: "Horizon country" },
      { name: "15:00 · Down", note: "Trek closes, transfer to Anini" },
    ],
    image: "/images/places/pomo/pomo1.JPG",
    imageAlt: "Wide open alpine grassland at Pomo above Anini in Dibang Valley",
  },
  {
    n: "04",
    day: 4,
    title: "Gipulin & the glass bridge",
    serif: "the easy day",
    departs: "Late start",
    from: "Anini",
    sleeps: "Anini",
    tone: "ink",
    lede: "Deliberately gentle. Legs are wrecked, so today happens mostly from a vehicle and on short walks.",
    story:
      "Gipulin sits in a side valley that most itineraries never mention, and after yesterday it is exactly the right dose: a valley road, a waterfall at Matu you can walk to in minutes, and a glass-floored bridge slung over the gorge that is either the highlight of the day or the thing you refuse to step onto. Both reactions are common.",
    closing:
      "We keep the schedule loose. If the group wants to sit by the Matu for two hours instead of driving on, we sit by the Matu for two hours.",
    waypoints: [
      { name: "Matu Valley", note: "The side valley most trips skip" },
      { name: "Matu Waterfall", note: "Short walk in from the road" },
      { name: "The Glass Bridge", note: "Glass floor over the gorge" },
      { name: "Valley viewpoints", note: "Unhurried, weather permitting" },
    ],
    image: "/images/places/anini-new/anini-new-portrait-1.jpg",
    imageAlt: "Montane forest and valley road in the Gipulin side valley near Anini",
  },
  {
    n: "05",
    day: 5,
    title: "Emuli, Karu & the last fire",
    serif: "the high meadows",
    departs: "09:00",
    from: "Anini",
    sleeps: "Anini",
    tone: "paper",
    lede: "Grassland again, but the kind you can drive to — and then a market walk and a bonfire to close the week.",
    story:
      "Emuli and Karu are the meadows above Anini you can reach without a twelve-hour day. Wide, quiet, and best in the first hour of light or the last. We spend the morning and early afternoon up there, then drop back into town while the market is still open — which is the only honest way to meet Anini as a town rather than a viewpoint.",
    closing:
      "The last night is a bonfire at the homestay. Nobody has ever asked to go to bed early on this one.",
    waypoints: [
      { name: "Emuli Grassland", note: "Morning light on the meadows" },
      { name: "Karu Viewpoint", note: "The long look down the valley" },
      { name: "Karu Grassland", note: "Open country, gentle walking" },
      { name: "Anini Market", note: "Evening walk through town" },
      { name: "Bonfire", note: "Last night at the homestay" },
    ],
    image: "/images/places/pomo/pomo5.jpg",
    imageAlt: "High meadow light on the grasslands above Anini",
  },
  {
    n: "06",
    day: 6,
    title: "Down the mountain",
    serif: "the way back",
    departs: "06:00 – 07:00",
    from: "Anini",
    sleeps: "—",
    tone: "ink",
    lede: "Out early via Hunli and Mayodia, over the long bridge, into Dibrugarh by evening.",
    story:
      "The return runs the same road in reverse and it is a different road entirely — you know what the corners do now, and the pass that was a wall on day one is just weather on day six. We stop where you want to stop, because there is no arrival deadline other than getting off the mountain in daylight.",
    closing:
      "Drop-off in Dibrugarh between 17:00 and 18:00. Book onward flights and trains for the next morning, never the same evening.",
    waypoints: [
      { name: "Hunli", note: "First stop off the plateau" },
      { name: "Mayodia Pass", note: "The last crossing" },
      { name: "Dr. Bhupen Hazarika Setu", note: "Back over the Lohit" },
      { name: "Dibrugarh", note: "Drop-off 17:00 – 18:00" },
    ],
    image: "/images/places/anini-new/anini-new-portrait-6.jpg",
    imageAlt: "Mist moving through the mountains on the road down from Anini",
  },
] as const;

// ── The summit day dial ─────────────────────────────────────────────────────
// Twelve hours, drawn as an arc. Only the two anchor times (03:00 start, 15:00
// close) come from the itinerary; the interior beats are described by what
// happens, not by clock times we would be inventing.

export const sixSummit = {
  kicker: "Day three",
  title: "Twelve hours on Pomo",
  standfirst:
    "The only fixed points are the start and the finish. Everything between them belongs to the mountain and the weather, which is exactly why it is worth doing.",
  start: "03:00",
  end: "15:00",
  hours: 12,
  segments: [
    {
      at: "03:00",
      title: "Headlamps",
      body: "Out of Chigu on foot in full dark. Cold, quiet, and the only sound is the river behind you getting further away.",
    },
    {
      at: "Pre-dawn",
      title: "The forest",
      body: "Hours of climbing under canopy. This is the honest part of the day — steady, unglamorous, and where the trek is actually earned.",
    },
    {
      at: "First light",
      title: "The sky returns",
      body: "Grey, then blue. You start being able to see how much you have already climbed, which is either encouraging or not.",
    },
    {
      at: "Late morning",
      title: "Tree line",
      body: "Canopy thins to scrub, scrub thins to open slope. The temperature drops and the wind finds you.",
    },
    {
      at: "The top",
      title: "Pomo Grassland",
      body: "Rolling meadow to every horizon with the Mishmi ridges stacked behind. A couple of hours here, and no photograph has ever done it.",
    },
    {
      at: "15:00",
      title: "Down and off",
      body: "Trek closes by mid-afternoon. Descent takes what the ascent took. Transfer back to Anini, hot food, early night.",
    },
  ],
  brief: [
    { label: "Grade", value: "Hard" },
    { label: "On foot", value: "~12 hrs" },
    { label: "Start", value: "03:00" },
    { label: "Support", value: "Trek guide + transport" },
  ],
  warning:
    "One shot. There is no second attempt built into the itinerary — if the weather closes Pomo on day three, we substitute the Dri valley and the meadows, and nobody pretends that is the same thing.",
} as const;

// ── Day two water index ─────────────────────────────────────────────────────

export const sixWater = {
  kicker: "Day two",
  title: "The water index",
  standfirst:
    "Seven stops on the valley floor between Anini and Chigu. Falls, a river, and two camps — in the order we actually drive them.",
  entries: [
    {
      n: "01",
      name: "Dree Afra",
      kind: "Halt",
      note: "The first stop out of Anini and the one that sets the tone for the day.",
      image: "/images/places/anini-new/anini-new-portrait-5.jpg",
      alt: "Orchard and forest slopes near Dree Afra below Anini",
    },
    {
      n: "02",
      name: "Chigu Camp",
      kind: "Camp",
      note: "Tonight's bed, scouted in daylight before we come back to it in the evening.",
      image: "/images/places/anini-new/anini-new-portrait-2.jpg",
      alt: "The river flats near Chigu camp in Dibang Valley",
    },
    {
      n: "03",
      name: "Mawuando",
      kind: "Viewpoint",
      note: "Where the valley finally shows you its full width.",
      image: "/images/places/anini-new/anini-new-landscape-11.jpeg",
      alt: "Wide valley view from Mawuando near Anini",
    },
    {
      n: "04",
      name: "Dri River",
      kind: "River",
      note: "Glacial grey-green, loud, and the reason everything here is called Dibang.",
      image: "/images/places/anini-new/anini-new-portrait-4.jpg",
      alt: "The Dri river running through the valley near Anini",
    },
    {
      n: "05",
      name: "Deccan Falls",
      kind: "Falls",
      note: "The big one. Roadside, no walking required, hard to leave.",
      image: "/images/places/anini-new/anini-new-portrait-8.jpg",
      alt: "Deccan Falls in the valley below Anini",
    },
    {
      n: "06",
      name: "Ahi Falls",
      kind: "Falls",
      note: "Narrower, taller, and usually the quietest stop of the day.",
      image: "/images/places/anini/Anini_6.jpg",
      alt: "Ahi Falls among forest in Dibang Valley",
    },
    {
      n: "07",
      name: "Bruni Falls",
      kind: "Falls",
      note: "Last of the three before we turn back for camp.",
      image: "/images/places/anini/Anini_3.jpg",
      alt: "Bruni Falls and forest near Anini in Dibang Valley",
    },
  ],
} as const;

// ── Pricing ledger ──────────────────────────────────────────────────────────

export const sixPricing = {
  kicker: "The ledger",
  title: "What it costs",
  standfirst:
    "One vehicle, one guide, one set of permits — so the price per person falls as the group fills. These are the real numbers, per person, all-in for what is listed below.",
  currency: "₹",
  tiers: [
    {
      id: "six",
      size: 6,
      label: "Group of 6",
      shortLabel: "6 pax",
      price: 18999,
      per: "per person",
      badge: "Best value",
      note: "The vehicle is full and the fixed costs split six ways. This is the number most groups end up at.",
      vehicle: "One SUV, six seats",
    },
    {
      id: "five",
      size: 5,
      label: "Group of 5",
      shortLabel: "5 pax",
      price: 21699,
      per: "per person",
      badge: null,
      note: "Same vehicle, same guide, one fewer person to divide the fixed costs between.",
      vehicle: "One SUV, room to spare",
    },
    {
      id: "four",
      size: 4,
      label: "Group of 4",
      shortLabel: "4 pax",
      price: 26699,
      per: "per person",
      badge: null,
      note: "The smallest group we run as a shared departure. Noticeably more space on the long days.",
      vehicle: "One SUV, four seats used",
    },
    {
      id: "private",
      size: 2,
      label: "Private · couple or twin",
      shortLabel: "Private",
      price: 51999,
      per: "per person",
      badge: "Private",
      note: "The whole expedition run for two — your own vehicle, your own guide, and the schedule bends to you rather than to a group.",
      vehicle: "Dedicated vehicle & guide",
    },
  ],
  fineprint: [
    "Prices are per person for the full 5N/6D expedition, ex-Dibrugarh.",
    "50% confirms the booking; the balance is due before departure.",
    "Inner Line Permit and forest pass are arranged by us and included.",
    "October to April only. We do not run this route in monsoon.",
  ],
} as const;

// ── Carried / not carried ───────────────────────────────────────────────────

export const sixIncluded = [
  { name: "Accommodation", note: "Five nights — Anini homestay ×4, Chigu camp ×1" },
  { name: "Private transportation", note: "Dedicated vehicle and driver for the full six days" },
  { name: "Expedition guide", note: "With you from Dibrugarh to Dibrugarh" },
  { name: "Pomo grassland trek", note: "Dedicated trek guide for the summit day" },
  { name: "Pomo trek transport", note: "The vehicle leg to and from the trailhead" },
  { name: "Breakfast & dinner", note: "Every day of the expedition" },
  { name: "Inner Line Permit", note: "Applied for and carried on your behalf" },
  { name: "Forest pass", note: "Required beyond Anini — handled by us" },
] as const;

export const sixExcluded = [
  { name: "Lunch", note: "Dhaba and roadside stops, paid as you go" },
  { name: "Flights & trains", note: "To and from Dibrugarh" },
  { name: "Personal expenses", note: "Shopping, laundry, extra beverages" },
  { name: "Anything not listed", note: "If it is not written above, assume it is not included" },
] as const;

export const sixCarry = [
  "Two pairs of shoes — one dedicated trekking pair for day three",
  "Layers, and one genuinely warm jacket. Mayodia is 2,655 m",
  "Rain shell and a small pack for the summit day",
  "Stretchable or breathable trousers — jeans will not help you on Pomo",
  "Headlamp with fresh batteries for the 03:00 start",
  "Power bank. Charging is limited and the camp night has none",
  "Government photo ID for the Inner Line Permit",
  "Any personal medication, plus basics for blisters",
] as const;

// ── Season ──────────────────────────────────────────────────────────────────

export const sixSeason = {
  kicker: "When",
  title: "The window",
  standfirst:
    "This route runs October to April. The rest of the year the mountain makes the decision for us.",
  months: [
    { month: "Oct", tone: "best", note: "Post-monsoon clarity, road at its most reliable" },
    { month: "Nov", tone: "best", note: "Golden light, harvest season, the sweet spot" },
    { month: "Dec", tone: "good", note: "Cold and very quiet; snow possible on Mayodia" },
    { month: "Jan", tone: "good", note: "Hardest cold, emptiest valley, clearest skies" },
    { month: "Feb", tone: "good", note: "Cold easing, visibility still excellent" },
    { month: "Mar", tone: "best", note: "Peak visibility and comfortable trekking" },
    { month: "Apr", tone: "good", note: "Warming fast; last dependable month" },
    { month: "May", tone: "closed", note: "Pre-monsoon instability begins" },
    { month: "Jun", tone: "closed", note: "Monsoon. Slides on the corridor" },
    { month: "Jul", tone: "closed", note: "Monsoon. We do not run this route" },
    { month: "Aug", tone: "closed", note: "Monsoon. We do not run this route" },
    { month: "Sep", tone: "closed", note: "Late monsoon; road unreliable for a trek schedule" },
  ],
} as const;

// ── FAQ ─────────────────────────────────────────────────────────────────────

export const sixFaqSection: FAQSection = {
  title: "Six days in the Dibang — your questions",
  description:
    "The things people actually ask before committing to a twelve-hour trek day at the far end of a 385 km mountain road.",
  faqs: [
    {
      id: "fitness",
      question: "How fit do I need to be for the Pomo grassland trek?",
      answer:
        "Fit enough to walk for twelve hours on uneven ground with a long climb in the first half. You do not need technical skill or previous high-altitude experience, but you do need working knees and some recent walking in your legs. If you can comfortably do a six-hour hill walk at home, you will be fine on Pomo. If you have not walked further than a car park in a year, please tell us and take a different Anini itinerary — we run 3-day and 4-day versions without the summit day.",
    },
    {
      id: "why-3am",
      question: "Why does the trek start at 3 AM?",
      answer:
        "Because the descent takes as long as the ascent, and nobody comes down Pomo in the dark. A 03:00 start puts you on the grassland in good light with a couple of hours to spend up there, and gets the whole group off the mountain by mid-afternoon. It is not for the sunrise photograph — it is the only way the day closes safely.",
    },
    {
      id: "altitude",
      question: "How high does this trip go?",
      answer:
        "The road crosses Mayodia Pass at 2,655 m on the way in and out, and Anini itself sits at 1,968 m. The Pomo grassland trek climbs above Anini into alpine meadow — high enough to feel it in the cold and the wind, but not high enough for altitude sickness to be a standard concern. We deliberately schedule the trek on day three so you have had two full days at valley altitude first.",
    },
    {
      id: "where-sleep",
      question: "Where do we sleep for the five nights?",
      answer:
        "Four nights in an Anini homestay and one night at Chigu camp on the river flats. The homestay is simple, warm and family-run — hot food, hot water, and heavy blankets. The camp night has no walls, no signal and no electricity, which is why it is on the itinerary. Anini has no hotels in the sense you are imagining, and we would not send you to one if it did.",
    },
    {
      id: "weather-fail",
      question: "What happens if the weather closes Pomo on day three?",
      answer:
        "We substitute the Dri valley and the lower meadows and we tell you plainly that it is not the same thing. There is no spare summit day built into a 6-day itinerary, and any operator who promises you a guaranteed trek at this altitude in this valley is guessing. October, November and March give you the best odds by a wide margin.",
    },
    {
      id: "permits",
      question: "Do I need permits, and do you arrange them?",
      answer:
        "Yes and yes. Every non-resident Indian traveller needs an Inner Line Permit for Arunachal Pradesh, and travel beyond Anini additionally needs a forest pass. Both are included and arranged by us — we just need clear government photo ID from each traveller well before departure. Foreign nationals require a Protected Area Permit instead, which has a longer lead time; talk to us early.",
    },
    {
      id: "how-reach",
      question: "How do I get to the start point?",
      answer:
        "Fly or take the train to Dibrugarh, Assam. We pick up between 05:00 and 06:30 on day one from Dibrugarh or Tinsukia. Arrive the night before — a same-morning flight into Dibrugarh cannot make our departure window. On day six we drop back into Dibrugarh between 17:00 and 18:00, so book onward travel for the following morning rather than that evening.",
    },
    {
      id: "group-size",
      question: "Why does the price change with group size?",
      answer:
        "Because the vehicle, the driver, the guide and the permits cost the same whether four people or six people share them. At six the fixed costs split furthest, which is why ₹18,999 is the best number on the page. Below four we run it as a private expedition with a dedicated vehicle and guide, which is a genuinely different product at ₹51,999 per person.",
    },
    {
      id: "food",
      question: "What is the food like, and are meals included?",
      answer:
        "Breakfast and dinner are included every day; lunch is on you at dhabas and roadside stops, which keeps the driving days flexible. Expect simple, hot, generous home cooking — rice, dal, local vegetables, meat if you eat it. Vegetarian and vegan travellers are easy to accommodate in Anini as long as you tell us at booking rather than at the table.",
    },
    {
      id: "connectivity",
      question: "Will I have phone signal?",
      answer:
        "Intermittently in Anini and effectively nowhere else. Roing is the last dependable network on the way up. The Chigu camp night has none at all, and the Pomo trek day has none. Tell people at home you will be out of contact for stretches of several days — it saves everybody a lot of worry.",
    },
  ],
};

// ── Gallery ─────────────────────────────────────────────────────────────────
// Media ledger rule: only photographs whose location we can stand behind.
// pomo = Pomo Grassland · anini-new = Anini plateau & surroundings.

export const sixGallery = [
  { src: "/images/places/pomo/pomo1.JPG", alt: "The open horizon of Pomo grassland above Anini", caption: "Pomo Grassland" },
  { src: "/images/places/anini-new/anini-new-landscape-13.jpeg", alt: "The high plateau at Anini in Dibang Valley", caption: "Anini Plateau" },
  { src: "/images/places/pomo/pomo4.jpg", alt: "Rolling hills of the Pomo grassland", caption: "Horizon Country" },
  { src: "/images/places/anini-new/anini-new-portrait-7.jpg", alt: "Village hills around Anini", caption: "Above the Town" },
  { src: "/images/places/pomo/pomo6.jpg", alt: "Alpine meadow light at Pomo", caption: "The Meadows" },
  { src: "/images/places/anini-new/anini-new-portrait-3.jpg", alt: "Cloud and ridgeline in Dibang Valley", caption: "Mishmi Ridges" },
] as const;

// ── Cross-links ─────────────────────────────────────────────────────────────

export const sixRelated = [
  {
    name: "The Way to Anini",
    kind: "Road guide",
    blurb: "Every kilometre of the day-one drive, told in nine chapters.",
    href: "/guides/dibrugarh-to-anini",
    image: "/images/places/anini/Anini_10.JPG",
  },
  {
    name: "Anini",
    kind: "Destination",
    blurb: "The quietest district headquarters in India, at 1,968 m.",
    href: "/places/anini",
    image: "/images/places/anini-new/anini-new-landscape-13.jpeg",
  },
  {
    name: "Dibang Valley",
    kind: "Region hub",
    blurb: "India's largest district, and fewer than one person per square kilometre.",
    href: "/places/dibang-valley",
    image: "/images/places/pomo/pomo1.JPG",
  },
  {
    name: "Arunachal ILP",
    kind: "Permits",
    blurb: "What the Inner Line Permit is and how we arrange yours.",
    href: "/permits/arunachal-pradesh-ilp",
    image: "/images/places/anini-new/anini-new-portrait-9.jpg",
  },
] as const;
