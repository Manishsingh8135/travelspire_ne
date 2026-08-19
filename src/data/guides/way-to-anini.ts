import type { FAQSection } from "@/types/faqs/faq";

// "The Way to Anini" — the signature road guide.
// Dibrugarh → Anini via the Bhupen Hazarika Setu, Roing and Mayodia Pass.
// Every chapter pairs one visual beat with one operational truth.

export const wayMeta = {
  title: "The Way to Anini",
  route: "Dibrugarh → Anini",
  distanceKm: "~340",
  climbKm: "235",
  chapters: 9,
  highPoint: "2,655 m",
  window: "8–10 hrs",
} as const;

export const wayHeroImages = {
  desktop: { src: "/images/places/anini/Anini_10.JPG", width: 3024, height: 4032 },
  mobile: { src: "/images/places/anini-new/anini-new-portrait-8.jpg", width: 3024, height: 4032 },
  alt: "Cloud-wrapped ridgelines on the road to Anini, Dibang Valley",
} as const;

export const wayHeroFacts = [
  { value: "235 km", label: "Roing to Anini climb" },
  { value: "9", label: "Chapters" },
  { value: "2,655 m", label: "Mayodia high point" },
  { value: "6:00 AM", label: "Departure, always" },
] as const;

export interface WayChapter {
  index: string;
  title: string;
  where: string;
  story: string;
  protocol: string;
  protocolLabel: string;
  image: string;
  imageAlt: string;
}

export const wayChapters: WayChapter[] = [
  {
    index: "01",
    title: "Tea Country",
    where: "Dibrugarh & Tinsukia · Assam plains",
    story:
      "The journey starts green and flat — tea gardens, morning traffic, a river breeze off the Brahmaputra. It feels like an ordinary drive. It isn't. Every kilometre from here is a step toward one of the emptiest corners of India.",
    protocol:
      "Airport and railway pickups with exact pins, a named coordinator, and feeder vehicles timed to your arrival — not a shared bus schedule.",
    protocolLabel: "What we do here",
    image: "/images/places/dambuk/Dambuk_2.jpg",
    imageAlt: "Open plains and river light at the start of the journey",
  },
  {
    index: "02",
    title: "The Crossing",
    where: "Bhupen Hazarika Setu · 9.15 km over the Lohit",
    story:
      "India's longest bridge, and the moment the trip visibly becomes an expedition. Nine kilometres of water and sky, the far bank hazy with hills. Everyone in the vehicle goes quiet. They always do.",
    protocol:
      "A timed photo stop when conditions allow, the bridge story told properly, and the first stamp in your road passport.",
    protocolLabel: "What we do here",
    image: "/images/places/dambuk/Dambuk_6.JPG",
    imageAlt: "The long bridge crossing into Arunachal's foothill country",
  },
  {
    index: "03",
    title: "The Threshold",
    where: "Shantipur Gate · the ILP checkpoint",
    story:
      "Where paperwork becomes real. Permits out, IDs checked, names read off a manifest. Five minutes if you're prepared, an hour of negotiation if you're not. This is the door to Arunachal — walk through it properly.",
    protocol:
      "Our document ritual runs before departure: ILP verified against the passenger list, offline copies on every phone, one folder per vehicle. The gate becomes a formality.",
    protocolLabel: "What we do here",
    image: "/images/places/anini/Anini_1.JPG",
    imageAlt: "The checkpoint road at the Arunachal border",
  },
  {
    index: "04",
    title: "The Reset",
    where: "Roing · kilometre zero",
    story:
      "The last full-amenity town on the route. Fuel needle to full, wallets filled with cash, one proper meal, every device charged. Beyond Roing there are 235 kilometres of mountain road and no second chances.",
    protocol:
      "Refuel, cash, supplies, and a live road-condition confirmation from our network up-route. If the mountain says wait, we have a buffer-day plan ready — Mehao Lake beats a landslide queue.",
    protocolLabel: "What we do here",
    image: "/images/places/anini/Anini_2.JPG",
    imageAlt: "Roing, the foothill staging town at the base of the climb",
  },
  {
    index: "05",
    title: "The Ascent",
    where: "Baro Golai bends → Tiwarigaon → Coffee House",
    story:
      "The landscape transforms in an hour: paddy gives way to forest, forest gives way to mist, and the road starts folding back on itself. The air cools. The driver downshifts. You're in the mountains now.",
    protocol:
      "Paced climbing, a warm-drink checkpoint, a washroom stop that actually exists. Nobody is rushed on the bends — the schedule is built around the road, not against it.",
    protocolLabel: "What we do here",
    image: "/images/places/anini/Anini_4.JPG",
    imageAlt: "The climbing forest road toward Mayodia",
  },
  {
    index: "06",
    title: "The Cloud Pass",
    where: "Mayodia · 2,655 m",
    story:
      "The route's high point and its weather line. In winter, snow. In September, cloud and cold rain — anyone who promises you a clear view in monsoon is guessing. Either way, the pass is a threshold: cross it and you're in the high valley's world.",
    protocol:
      "A controlled photo stop only when visibility and parking allow. Warm layers ready in the cabin. No lingering on a wet ridgeline.",
    protocolLabel: "What we do here",
    image: "/images/places/anini/Anini_10.JPG",
    imageAlt: "Mayodia Pass wrapped in cloud",
  },
  {
    index: "07",
    title: "The Valley Road",
    where: "65 KM → Hunli",
    story:
      "Down the far side into forest that doesn't end. There are dhabas and false 'quick stops' along here — and Kupunli Cave, which looks like a roadside attraction and is actually a two-hour trek. We frame it honestly: an extension, not a stop.",
    protocol:
      "A pinned meal halt with a named vendor — and a named backup. If you want Kupunli, we build the extra hours into the plan instead of stealing them from the drive.",
    protocolLabel: "What we do here",
    image: "/images/places/anini/Anini_9.jpg",
    imageAlt: "The forest valley road beyond Mayodia",
  },
  {
    index: "08",
    title: "The Contingency Corridor",
    where: "Kano · Ranli · Angolin · Etalin",
    story:
      "The honest stretch. NH-313 is still under construction through here — slide zones, fresh tarmac beside raw cutting, weather that can close the day. This is where road intelligence matters more than horsepower.",
    protocol:
      "Status checks 72 and 24 hours out, meal and toilet backups mapped, a recovery protocol if the road closes: wait points, contacts, and a plan B you hear about before you need it.",
    protocolLabel: "What we do here",
    image: "/images/places/anini/Anini_8.jpg",
    imageAlt: "The construction corridor between Hunli and Etalin",
  },
  {
    index: "09",
    title: "The Reveal",
    where: "Anini plateau · between the Dri and Mathun rivers",
    story:
      "The road climbs one last ridge and the world opens — a high plateau of grass and cloud, a town smaller than your neighbourhood, mountains stacked to the horizon. You have arrived at the quietest district headquarters in India.",
    protocol:
      "Stay allocation confirmed before arrival, dinner waiting, reporting time set, and the next morning's plan already agreed. The arrival is an ending and a beginning.",
    protocolLabel: "What we do here",
    image: "/images/places/anini-new/anini-new-landscape-13.jpeg",
    imageAlt: "The Anini plateau at arrival",
  },
];

export const wayTiming = [
  {
    label: "October – April",
    window: "6–8 hours",
    note: "Dry roads, clear passes. The climb at its most predictable.",
    tone: "good",
  },
  {
    label: "May & September",
    window: "8–10 hours",
    note: "Wet road, cloud on the pass, real delays possible. Plan the window, not the best case.",
    tone: "caution",
  },
  {
    label: "June – August",
    window: "Don't",
    note: "Peak monsoon. Floods below, slides above. We don't run it, and we'll tell you not to.",
    tone: "avoid",
  },
] as const;

export const wayRules = [
  "Depart by 6:00 AM — every itinerary, every season. Arrive before dark.",
  "Tank full in Roing. Don't rely on fuel between Roing and Anini, or on stock at destination.",
  "Cash before the climb. Anini has banks, but cash, power and connectivity can fail.",
  "ILP must mention Dibang Valley — checked at multiple posts.",
  "Expect long zero-signal stretches. Download everything offline before Roing.",
  "Warm layer and rain shell within reach, not in the boot — the pass is cold in every season.",
] as const;

export const wayFaqSection: FAQSection = {
  title: "The road, answered honestly",
  description: "Everything people actually ask about the drive to Anini.",
  faqs: [
    {
      id: "way-time",
      question: "How long does it really take from Dibrugarh to Anini?",
      answer:
        "Plan a full day, split into two legs: about three and a half hours from Dibrugarh to Roing, then the 235 km climb from Roing to Anini — six to eight hours in the dry season, eight to ten when the road is wet. We stage the night in Roing so the climb happens in one clean daylight run.",
    },
    {
      id: "way-car",
      question: "What vehicle do I need for the Anini road?",
      answer:
        "A high-clearance SUV with a driver who knows the road. NH-313 is paved in stretches and raw in others — slide zones, fresh cutting, stream crossings after rain. A sedan will suffer; an inexperienced driver will suffer more. Our fleet runs Innovas and Scorpios with drivers who do this route weekly.",
    },
    {
      id: "way-day",
      question: "Can I do Dibrugarh to Anini in one day?",
      answer:
        "Physically possible, practically unwise. It means 11–13 hours on the road with the hardest section late in the day — exactly when you shouldn't be on it. One night in Roing converts a survival exercise into one of the great drives of India. That's how we plan it.",
    },
    {
      id: "way-scary",
      question: "Is the road dangerous?",
      answer:
        "It demands respect, not fear. The risks are real — monsoon slides, fog on the pass, no network for long stretches — and they are managed by boring disciplines: a 6 AM departure, checked weather windows, buffer days, and never driving after sunset. Thousands of travellers do this road safely every season. The ones who get into trouble broke one of those rules.",
    },
    {
      id: "way-stop",
      question: "What are the best stops on the way?",
      answer:
        "The Bhupen Hazarika Setu crossing, the Coffee House above Tiwarigaon, Mayodia Pass when the cloud allows, the lunch halt at 65 KM, and the first view of the Anini plateau. Kupunli Cave is worth it only as a planned extension — it's a two-hour trek, not a roadside stop.",
    },
    {
      id: "way-self",
      question: "Can I self-drive to Anini?",
      answer:
        "You can, and confident mountain drivers do — but understand what you're signing up for: no recovery services for long stretches, no network to call them on, and weather that can rewrite the road overnight. Most self-drivers who message us afterwards say the same thing: stunning, and more tiring than expected. Our job is to absorb that part so you get the stunning.",
    },
  ],
} as const;
