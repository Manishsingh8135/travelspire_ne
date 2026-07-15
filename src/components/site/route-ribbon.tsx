"use client";

import { m, useReducedMotion } from "motion/react";
import type { RibbonNode } from "@/lib/tours/read";
import { cn } from "@/lib/cn";

/**
 * RouteRibbon v2 (08-blueprint/05 §3.2) — the journey as a dashed line across
 * paper, no enclosing box. Nodes are where you actually SLEEP (derived from
 * tour_days overnights via overnightNodes()), the gateway ringed, night counts
 * under each halt. The line draws itself on first view — a clip-path reveal so
 * the dashes stay crisp (animating pathLength would eat the dash pattern);
 * reduced-motion renders it already drawn. Mobile: a static vertical timeline.
 */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};
const containerReduced = { hidden: {}, show: {} };
const nodeIn = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};
const lineDraw = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};
/* Reduced-motion keeps the fade, drops the spatial transform (motion doc §7).
   NEVER swap variants to undefined under reduce: SSR already inlined the
   "hidden" style, and with no animation lifecycle it would stay invisible. */
const fadeOnly = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

function nightsLabel(node: RibbonNode): string {
  if (node.nights === 0) return "START";
  return node.nights === 1 ? "1 NIGHT" : `${node.nights} NIGHTS`;
}

function Dot({ gateway }: { gateway: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "size-2.5 shrink-0 rounded-full",
        gateway ? "border-[1.5px] border-secondary bg-transparent" : "bg-secondary",
      )}
    />
  );
}

export function RouteRibbon({ nodes, className }: { nodes: RibbonNode[]; className?: string }) {
  const reduce = useReducedMotion();
  if (nodes.length < 2) return null;

  return (
    <div className={className}>
      {/* Desktop — the horizontal ribbon (scrolls when the route is long) */}
      <div className="hidden overflow-x-auto sm:block">
        <m.ol
          className="flex min-w-max items-start px-1 pb-2"
          variants={reduce ? containerReduced : container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {nodes.map((node, i) => (
            <li key={`${node.name}-${i}`} className="flex items-start">
              <m.div
                variants={reduce ? fadeOnly : nodeIn}
                className="flex w-max min-w-20 flex-col items-center text-center"
              >
                <Dot gateway={node.nights === 0} />
                <span className="mt-2.5 max-w-36 font-mono text-[11px] leading-tight font-medium tracking-[0.14em] uppercase">
                  {node.name}
                </span>
                <span className="mt-1 font-mono text-[10px] tracking-[0.14em] text-muted-foreground tabular-nums uppercase">
                  {nightsLabel(node)}
                </span>
              </m.div>
              {i < nodes.length - 1 ? (
                <m.span
                  aria-hidden
                  variants={reduce ? fadeOnly : lineDraw}
                  className="mx-3 mt-[4px] block h-px w-14 border-t border-dashed border-border-strong lg:w-24"
                />
              ) : null}
            </li>
          ))}
        </m.ol>
      </div>

      {/* Mobile — vertical timeline, static (calm by default) */}
      <ol className="flex flex-col sm:hidden">
        {nodes.map((node, i) => (
          <li key={`${node.name}-${i}`} className="flex gap-4">
            <div className="flex flex-col items-center pt-[5px]">
              <Dot gateway={node.nights === 0} />
              {i < nodes.length - 1 ? (
                <span
                  aria-hidden
                  className="my-1 w-px flex-1 border-l border-dashed border-border-strong"
                />
              ) : null}
            </div>
            <div className={cn("flex items-baseline gap-3", i < nodes.length - 1 && "pb-6")}>
              <p className="font-mono text-xs font-medium tracking-[0.14em] uppercase">
                {node.name}
              </p>
              <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground tabular-nums uppercase">
                {nightsLabel(node)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
