/**
 * Spring tokens — the ONLY place spring physics numbers live.
 * Mirrors docs-new/03-frontend/05-motion-and-animation.md §2.
 * Chrome uses damping ≥ 26 (no visible bounce); reserve the slight overshoot
 * of `expressive` for the mode-slider snap and shared-element hero only.
 */
export const spring = {
  // chrome: sheets, dropdowns, layout — settles fast, NO visible bounce
  snappy: { type: "spring", stiffness: 400, damping: 40, mass: 1 },
  // default UI spring — barely-there overshoot
  standard: { type: "spring", stiffness: 300, damping: 30, mass: 1 },
  // gestures: drag/throw sheets & mode-slider — responsive, interruptible
  gentle: { type: "spring", stiffness: 200, damping: 26 },
  // hero / shared-element / mode-slider snap — small confident overshoot
  expressive: { type: "spring", stiffness: 260, damping: 20 },
} as const;

export type SpringName = keyof typeof spring;
