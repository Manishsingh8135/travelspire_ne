// lib/media.ts
// Shared media primitives for photo-led editorial pages.
//
// Every frame carries its true pixel dimensions so layouts can honour the
// photograph's real shape instead of forcing everything into one crop. The
// blur placeholders are generated, not stored, so adding a photograph never
// means generating and committing a second asset.

export type FrameOrientation = "portrait" | "landscape" | "square";

/** Warm tints used while a photograph decodes. Keyed to the palette. */
export const FRAME_TONES = {
  moss: ["#243027", "#0D1512"],
  ink: ["#101A17", "#070E0D"],
  brass: ["#4A4130", "#1A1811"],
  ember: ["#4A2E1F", "#181009"],
  stone: ["#3A3B38", "#141513"],
} as const;

export type FrameTone = keyof typeof FRAME_TONES;

/**
 * Two shapes, and only two. Tall is the default everywhere a photograph sits
 * inside the grid; wide is reserved for frames that run the full width of the
 * page. Mixing more ratios than this is what makes a photo page look busy.
 *
 * Tall is 3:4 because most of the library was shot at 3024×4032 — the standard
 * crop costs those frames nothing.
 */
export const RATIO = {
  tall: 3 / 4,
  wide: 16 / 9,
} as const;

/** Matching corner radii, so media and panels agree across the page. */
export const RADIUS = {
  media: "rounded-[18px]",
  card: "rounded-[14px]",
  control: "rounded-[10px]",
} as const;

export interface Frame {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Where the photograph was actually taken. Used for captions and credits. */
  place: string;
  tone: FrameTone;
}

export function orientationOf(frame: Frame): FrameOrientation {
  if (frame.width > frame.height) return "landscape";
  if (frame.width < frame.height) return "portrait";
  return "square";
}

export function aspectOf(frame: Frame): number {
  return frame.width / frame.height;
}

/**
 * A two-stop gradient standing in for the photograph while it decodes. Cheap
 * enough to inline, warm enough that the page never flashes grey.
 */
export function blurFor(tone: FrameTone): string {
  const [from, to] = FRAME_TONES[tone];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 10" preserveAspectRatio="none"><defs><linearGradient id="a" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="8" height="10" fill="url(#a)"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
