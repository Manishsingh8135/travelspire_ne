"use client";

import type { ReactNode } from "react";
import { LazyMotion, domAnimation } from "motion/react";

/**
 * Mount once around any subtree that uses the lightweight `m` component.
 * `domAnimation` (~15kb) roughly halves the full Motion bundle — a Core Web
 * Vitals lever (motion doc §3.8). `strict` forbids the heavy `motion.*` import,
 * keeping every leaf on `m`. Server children pass straight through (donut pattern),
 * so this client boundary does not drag the page into the client bundle.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
