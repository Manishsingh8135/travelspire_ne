import type { Frame } from "@/lib/media";
import {
  anini2026Size,
  anini2026Src,
  getPlaceImageAlt,
} from "@/data/seo/image-seo-data";

// The media atlas for "Six Days in the Dibang".
//
// Rules that keep this file honest:
//   1. Every frame records the file's true pixel dimensions, measured off disk.
//      Layouts read the shape from here — nothing is cropped by guesswork.
//   2. `place` names where the shutter actually fell. Captions are built from
//      it, so the page can never claim a photograph is somewhere it is not.
//   3. Nothing here invents an operational detail. Where we only know the
//      qualitative truth ("no signal"), we state it qualitatively.

export const FRAMES = {
  // ── Pomo Grassland ──────────────────────────────────────────────────────
  pomoWide: {
    src: "/images/places/pomo/pomo1.JPG",
    alt: "Wide open alpine grassland rolling to the horizon at Pomo, above Anini",
    width: 4032,
    height: 3024,
    place: "Pomo Grassland",
    tone: "brass",
  },
  pomoOpen: {
    src: "/images/places/pomo/pomo2.JPG",
    alt: "Open meadow country on the Pomo grassland in Dibang Valley",
    width: 4032,
    height: 3024,
    place: "Pomo Grassland",
    tone: "brass",
  },
  pomoHorizon: {
    src: "/images/places/pomo/pomo3.JPG",
    alt: "The rolling high grassland horizon at Pomo with the Mishmi ridges behind",
    width: 4284,
    height: 5712,
    place: "Pomo Grassland",
    tone: "brass",
  },
  pomoHills: {
    src: "/images/places/pomo/pomo4.jpg",
    alt: "Rolling hills of the Pomo grassland under high cloud",
    width: 3024,
    height: 4032,
    place: "Pomo Grassland",
    tone: "moss",
  },
  pomoMeadow: {
    src: "/images/places/pomo/pomo5.jpg",
    alt: "High meadow light on the grasslands above Anini",
    width: 4284,
    height: 5712,
    place: "Pomo Grassland",
    tone: "brass",
  },
  pomoLight: {
    src: "/images/places/pomo/pomo6.jpg",
    alt: "Alpine meadow and ridgeline light at Pomo, Dibang Valley",
    width: 5712,
    height: 4284,
    place: "Pomo Grassland",
    tone: "brass",
  },

  // ── The road up ─────────────────────────────────────────────────────────
  mayodiaCloud: {
    src: "/images/places/anini/Anini_10.JPG",
    alt: "Cloud rolling across the ridgelines at Mayodia Pass on the road to Anini",
    width: 3024,
    height: 4032,
    place: "Mayodia Pass",
    tone: "ink",
  },
  roadRidge: {
    src: "/images/places/anini/Anini_8.jpg",
    alt: "Mountain road cut into forested ridges on NH-313 below Anini",
    width: 3024,
    height: 4032,
    place: "NH-313",
    tone: "moss",
  },
  roadValley: {
    src: "/images/places/anini/Anini_4.JPG",
    alt: "Deep forested valley seen from the Anini road",
    width: 3000,
    height: 3157,
    place: "NH-313",
    tone: "moss",
  },
  mistDescent: {
    src: "/images/places/anini-new/anini-new-portrait-6.jpg",
    alt: "Mist moving through the mountains on the road down from Anini",
    width: 3024,
    height: 4032,
    place: "Hunli road",
    tone: "stone",
  },

  // ── The plateau ─────────────────────────────────────────────────────────
  plateau: {
    src: "/images/places/anini-new/anini-new-landscape-13.jpeg",
    alt: "The high plateau at Anini between the Dri and Mathun rivers",
    width: 4000,
    height: 2250,
    place: "Anini Plateau",
    tone: "moss",
  },
  mawuando: {
    src: "/images/places/anini-new/anini-new-landscape-11.jpeg",
    alt: "Wide valley view from Mawuando near Anini",
    width: 4000,
    height: 2250,
    place: "Mawuando",
    tone: "moss",
  },
  cottage: {
    src: "/images/places/anini/Anini_9.jpg",
    alt: "A cottage on the hillside at Anini in Dibang Valley",
    width: 4096,
    height: 2304,
    place: "Anini",
    tone: "moss",
  },
  villageHills: {
    src: "/images/places/anini-new/anini-new-portrait-7.jpg",
    alt: "Village hills and terraced slopes around Anini",
    width: 3024,
    height: 4032,
    place: "Above Anini",
    tone: "moss",
  },
  ridgeCloud: {
    src: "/images/places/anini-new/anini-new-portrait-3.jpg",
    alt: "Cloud and ridgeline layered above Dibang Valley",
    width: 960,
    height: 1280,
    place: "Dibang Valley",
    tone: "stone",
  },

  // ── Water country ───────────────────────────────────────────────────────
  driRiver: {
    src: "/images/places/anini-new/anini-new-portrait-4.jpg",
    alt: "The glacial grey-green Dri river running through the valley near Anini",
    width: 3024,
    height: 4032,
    place: "Dri River",
    tone: "stone",
  },
  deccanFalls: {
    src: "/images/places/anini-new/anini-new-portrait-8.jpg",
    alt: "Waterfall dropping through forest in the valley below Anini",
    width: 3024,
    height: 4032,
    place: "Deccan Falls",
    tone: "moss",
  },
  ahiFalls: {
    src: "/images/places/anini/Anini_6.jpg",
    alt: "Ahi Falls among dense forest in Dibang Valley",
    width: 1340,
    height: 1600,
    place: "Ahi Falls",
    tone: "moss",
  },
  bruniFalls: {
    src: "/images/places/anini/Anini_3.jpg",
    alt: "Bruni Falls and forest near Anini in Dibang Valley",
    width: 3024,
    height: 4032,
    place: "Bruni Falls",
    tone: "moss",
  },
  chiguFlats: {
    src: "/images/places/anini-new/anini-new-portrait-2.jpg",
    alt: "The river flats at Chigu where the camp stands, Dibang Valley",
    width: 1200,
    height: 1600,
    place: "Chigu",
    tone: "stone",
  },
  dreeAfra: {
    src: "/images/places/anini-new/anini-new-portrait-5.jpg",
    alt: "Orchard and forest slopes near Dree Afra below Anini",
    width: 1200,
    height: 1600,
    place: "Dree Afra",
    tone: "moss",
  },

  // ── Forest & side valleys ───────────────────────────────────────────────
  gipulinForest: {
    src: "/images/places/anini-new/anini-new-portrait-1.jpg",
    alt: "Montane forest and valley road in the Gipulin side valley near Anini",
    width: 3024,
    height: 4032,
    place: "Gipulin",
    tone: "moss",
  },
  forestFloor: {
    src: "/images/places/anini-new/anini-new-portrait-9.jpg",
    alt: "Dense forest cover on the slopes of Dibang Valley",
    width: 1340,
    height: 1600,
    place: "Dibang Valley",
    tone: "moss",
  },

  // ── 2026 field photographs ──────────────────────────────────────────────
  pomoRidgeTrail: {
    src: anini2026Src.pomoRidgeTrail,
    alt: getPlaceImageAlt(anini2026Src.pomoRidgeTrail),
    ...anini2026Size[anini2026Src.pomoRidgeTrail],
    place: "Pomo ridge trail",
    tone: "moss",
  },
  emuliSign: {
    src: anini2026Src.emuliSign,
    alt: getPlaceImageAlt(anini2026Src.emuliSign),
    ...anini2026Size[anini2026Src.emuliSign],
    place: "Emuli Grassland",
    tone: "brass",
  },
  cascadeFalls: {
    src: anini2026Src.cascadeFalls,
    alt: getPlaceImageAlt(anini2026Src.cascadeFalls),
    ...anini2026Size[anini2026Src.cascadeFalls],
    place: "Anini waterfall circuit",
    tone: "moss",
  },
  mistyFalls: {
    src: anini2026Src.mistyFalls,
    alt: getPlaceImageAlt(anini2026Src.mistyFalls),
    ...anini2026Size[anini2026Src.mistyFalls],
    place: "Anini waterfall country",
    tone: "ink",
  },
  riverbankFalls: {
    src: anini2026Src.riverbankFalls,
    alt: getPlaceImageAlt(anini2026Src.riverbankFalls),
    ...anini2026Size[anini2026Src.riverbankFalls],
    place: "Anini river falls",
    tone: "stone",
  },
  aFrameCabins: {
    src: anini2026Src.aFrameCabins,
    alt: getPlaceImageAlt(anini2026Src.aFrameCabins),
    ...anini2026Size[anini2026Src.aFrameCabins],
    place: "Anini",
    tone: "moss",
  },
  rainbowGlamping: {
    src: anini2026Src.rainbowGlamping,
    alt: getPlaceImageAlt(anini2026Src.rainbowGlamping),
    ...anini2026Size[anini2026Src.rainbowGlamping],
    place: "Anini plateau",
    tone: "brass",
  },
  meadowRest: {
    src: anini2026Src.meadowRest,
    alt: getPlaceImageAlt(anini2026Src.meadowRest),
    ...anini2026Size[anini2026Src.meadowRest],
    place: "Anini meadow",
    tone: "brass",
  },
} as const satisfies Record<string, Frame>;

export type FrameKey = keyof typeof FRAMES;

// ── Derived money ───────────────────────────────────────────────────────────
// The only arithmetic on this page. Both figures are derived from the published
// per-person rate, never entered by hand, so they cannot drift out of sync.

export function perPersonPerDay(price: number, days = 6): number {
  return Math.round(price / days);
}

export function partyTotal(price: number, size: number): number {
  return price * size;
}

// ── The desk: what each party size actually changes ──────────────────────────

export interface TierDetail {
  id: "six" | "five" | "four" | "private";
  size: number;
  /** Guest seats occupied in the vehicle. Private runs its own vehicle. */
  seatsFilled: number;
  seatsTotal: number;
  vehicle: string;
  schedule: string;
  room: string;
  space: string;
  bestFor: string;
  headline: string;
  frame: Frame;
}

export const sixTierDetail: TierDetail[] = [
  {
    id: "six",
    size: 6,
    seatsFilled: 6,
    seatsTotal: 6,
    vehicle: "One SUV, six seats",
    schedule: "Fixed group departure",
    room: "Homestay rooms on twin share",
    space: "Full vehicle — every seat taken",
    bestFor: "Friends filling their own departure",
    headline: "The number most groups land on",
    frame: FRAMES.pomoHorizon,
  },
  {
    id: "five",
    size: 5,
    seatsFilled: 5,
    seatsTotal: 6,
    vehicle: "One SUV, room to spare",
    schedule: "Fixed group departure",
    room: "Homestay rooms on twin share",
    space: "A spare seat for bags and legs",
    bestFor: "A group that would rather not fill the last seat",
    headline: "One fewer person to split the fixed costs",
    frame: FRAMES.pomoMeadow,
  },
  {
    id: "four",
    size: 4,
    seatsFilled: 4,
    seatsTotal: 6,
    vehicle: "One SUV, four seats used",
    schedule: "Fixed group departure",
    room: "Homestay rooms on twin share",
    space: "Noticeably more room on the long days",
    bestFor: "Two couples, or a family of four",
    headline: "The smallest shared departure we run",
    frame: FRAMES.pomoHills,
  },
  {
    id: "private",
    size: 2,
    seatsFilled: 2,
    seatsTotal: 6,
    vehicle: "Dedicated vehicle & guide",
    schedule: "The week bends to you, not to a group",
    room: "Your own room, twin or double",
    space: "The whole vehicle, for two",
    bestFor: "A couple, or two people who want the week to themselves",
    headline: "A genuinely different product, not an upgrade",
    frame: FRAMES.driRiver,
  },
];

// ── Where the five nights are actually spent ────────────────────────────────

export interface NightStay {
  id: string;
  nights: number;
  label: string;
  title: string;
  serif: string;
  body: string;
  frame: Frame;
  support: Frame;
  facts: { label: string; value: string }[];
}

export const sixNights: NightStay[] = [
  {
    id: "homestay",
    nights: 4,
    label: "Nights 01 · 04 · 05 · 06",
    title: "The homestay",
    serif: "four nights in Anini",
    body:
      "Anini has no hotels in the sense you are imagining, and we would not send you to one if it did. You sleep in a family-run house on the plateau — simple, warm, and the kitchen decides the menu. The last night ends at a bonfire in the yard, which is the only correct way to close this week.",
    frame: FRAMES.cottage,
    support: FRAMES.villageHills,
    facts: [
      { label: "Bed", value: "Heavy blankets, hot water" },
      { label: "Food", value: "Breakfast and dinner, cooked in the house" },
      { label: "Power", value: "Mains, with cuts" },
      { label: "Signal", value: "Intermittent" },
      { label: "Last night", value: "Bonfire in the yard" },
    ],
  },
  {
    id: "chigu",
    nights: 1,
    label: "Night 02",
    title: "Chigu camp",
    serif: "one night on the river",
    body:
      "The night that makes the trek possible. Camp sits on the flats where the Dri runs wide, with nothing built around it — no walls between you and the water, no bars on the phone, and no switch to flick. You are in the tent early because the alarm goes at three, and the river runs all night whether you sleep or not.",
    frame: FRAMES.chiguFlats,
    support: FRAMES.driRiver,
    facts: [
      { label: "Bed", value: "Tents on the river flats" },
      { label: "Food", value: "Cooked at camp" },
      { label: "Power", value: "None" },
      { label: "Signal", value: "None at all" },
      { label: "Wake-up", value: "03:00, for Pomo" },
    ],
  },
];

// ── What the number carries ─────────────────────────────────────────────────
// Each included line, given a photograph of the country it applies to. The
// caption always names the place, never the service — we do not have staged
// photographs of a guide or a dinner, so we do not pretend to.

export interface CarryItem {
  n: string;
  name: string;
  note: string;
  frame: Frame;
}

export const sixCarries: CarryItem[] = [
  {
    n: "01",
    name: "Five nights' accommodation",
    note: "Four in an Anini homestay, one at Chigu camp on the river flats.",
    frame: FRAMES.cottage,
  },
  {
    n: "02",
    name: "Private transportation",
    note: "A dedicated vehicle and driver for all six days, Dibrugarh to Dibrugarh.",
    frame: FRAMES.roadRidge,
  },
  {
    n: "03",
    name: "Expedition guide",
    note: "With you from pickup to drop-off — not handed over at the district line.",
    frame: FRAMES.mayodiaCloud,
  },
  {
    n: "04",
    name: "Pomo grassland trek",
    note: "A dedicated trek guide for the summit day, and the transport to the trailhead.",
    frame: FRAMES.pomoWide,
  },
  {
    n: "05",
    name: "Breakfast & dinner",
    note: "Every day of the expedition. Lunch stays on you, which keeps the driving days flexible.",
    frame: FRAMES.dreeAfra,
  },
  {
    n: "06",
    name: "Inner Line Permit",
    note: "Applied for and carried on your behalf. We need clear photo ID well before departure.",
    frame: FRAMES.forestFloor,
  },
  {
    n: "07",
    name: "Forest pass",
    note: "Required beyond Anini for the valley and the trek. Handled by us.",
    frame: FRAMES.gipulinForest,
  },
];

// ── Day two's seven water stops, in driving order ───────────────────────────
// Index-aligned with sixWater.entries in anini-six-days.ts.

export const sixWaterFrames: Frame[] = [
  FRAMES.dreeAfra,
  FRAMES.chiguFlats,
  FRAMES.mawuando,
  FRAMES.driRiver,
  FRAMES.deccanFalls,
  FRAMES.ahiFalls,
  FRAMES.bruniFalls,
];

// ── The summit day, as a photo sequence ─────────────────────────────────────
// Paired one-to-one with the six beats in sixSummit.segments.

export const sixSequenceFrames: Frame[] = [
  FRAMES.pomoHills,
  FRAMES.gipulinForest,
  FRAMES.pomoRidgeTrail,
  FRAMES.pomoLight,
  FRAMES.pomoWide,
  FRAMES.pomoMeadow,
];

// ── Frames for each day chapter ─────────────────────────────────────────────
// Keyed by day number: one lead plate, then the strip beneath it.

export const sixDayLead: Record<number, Frame> = {
  1: FRAMES.mayodiaCloud,
  2: FRAMES.cascadeFalls,
  3: FRAMES.pomoWide,
  4: FRAMES.gipulinForest,
  5: FRAMES.emuliSign,
  6: FRAMES.mistDescent,
};

export const sixDayStrips: Record<number, Frame[]> = {
  1: [FRAMES.roadRidge, FRAMES.roadValley, FRAMES.plateau],
  2: [FRAMES.mistyFalls, FRAMES.riverbankFalls, FRAMES.driRiver, FRAMES.cascadeFalls],
  3: [FRAMES.pomoRidgeTrail, FRAMES.pomoHorizon, FRAMES.pomoLight],
  4: [FRAMES.ridgeCloud, FRAMES.cottage, FRAMES.forestFloor],
  5: [FRAMES.emuliSign, FRAMES.meadowRest, FRAMES.rainbowGlamping],
  6: [FRAMES.mistDescent, FRAMES.roadValley, FRAMES.mawuando],
};

// ── The archive ─────────────────────────────────────────────────────────────
// Everything we can stand behind, in one place, shaped by its real geometry.

export const sixArchive: Frame[] = [
  FRAMES.rainbowGlamping,
  FRAMES.pomoRidgeTrail,
  FRAMES.emuliSign,
  FRAMES.cascadeFalls,
  FRAMES.pomoHorizon,
  FRAMES.mistyFalls,
  FRAMES.plateau,
  FRAMES.pomoWide,
  FRAMES.riverbankFalls,
  FRAMES.aFrameCabins,
  FRAMES.pomoMeadow,
  FRAMES.meadowRest,
];
