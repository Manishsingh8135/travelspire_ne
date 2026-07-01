"use client";

import type { ComponentProps, ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { fade, fadeUp } from "@/lib/motion/variants";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to delay this reveal (e.g. to lead an adjacent element). */
  delay?: number;
  /** Fraction of the element that must be in view before it reveals. */
  amount?: number;
} & Omit<ComponentProps<typeof m.div>, "variants" | "initial" | "whileInView" | "viewport">;

/**
 * The single scroll-reveal primitive. Fades + rises into view once.
 * Honors `prefers-reduced-motion` by swapping to an opacity-only fade
 * (motion doc §7 — keep the fade, drop the spatial transform).
 * Must live inside <MotionProvider>. NEVER wrap the LCP hero image/H1 in this.
 */
export function Reveal({ children, className, delay = 0, amount = 0.3, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      variants={reduce ? fade : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={delay ? { delay } : undefined}
      {...props}
    >
      {children}
    </m.div>
  );
}
