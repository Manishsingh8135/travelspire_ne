import type { Variants } from "motion/react";

/**
 * Shared motion variant vocabulary — import these, do not hand-roll per component.
 * Mirrors docs-new/03-frontend/05-motion-and-animation.md §3.
 * `--ease-out` = cubic-bezier(0.22, 1, 0.36, 1); durations mirror the CSS motion tokens.
 */
const easeOut = [0.22, 1, 0.36, 1] as const;

/** Opacity-only — the reduced-motion fallback for every spatial reveal. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: easeOut } },
};

/** Default scroll reveal: fade + small rise. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

/** Subtle scale-in for media / cards. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: easeOut } },
};

/**
 * Parent orchestrator — children inherit `hidden`/`show` and stagger in.
 * Keep stagger 30–100ms; only the first viewport should stagger.
 */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};
