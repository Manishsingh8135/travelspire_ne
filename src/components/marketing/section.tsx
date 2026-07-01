import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Marketing "chapter" wrapper with a fixed, art-directed palette. Switching a
 * section's background is a ONE-PROP change — `tone="paper"` ↔ `tone="forest"`
 * — independent of the app's global light/dark toggle (the editorial look is
 * pinned per section, per new.md "chapters, not sections").
 *
 * Dark tones get the forest-glow depth layer so the green-tinted charcoal reads
 * as "forest at night" rather than flat black (tuned against the inspiration's
 * ~#070d0c dark; see the charcoal ramp notes in globals.css).
 */
export type SectionTone = "paper" | "sand" | "forest";

const TONE: Record<SectionTone, string> = {
  paper: "bg-background text-foreground",
  sand: "bg-mist-200 text-foreground",
  forest: "bg-charcoal-950 text-mist-50",
};

// Soft radial that lifts a dark section's centre + base. One place to retune
// the whole app's dark-section depth.
const FOREST_GLOW =
  "radial-gradient(120% 70% at 50% -8%, oklch(0.26 0.038 158) 0%, transparent 58%), radial-gradient(90% 60% at 50% 112%, oklch(0.22 0.03 162) 0%, transparent 60%)";

type SectionProps = React.ComponentProps<"section"> & {
  tone?: SectionTone;
  /** Forest-glow depth layer. Defaults on for dark tones, off for light. */
  depth?: boolean;
  /** Set false to drop the default vertical rhythm (py-20 sm:py-28). */
  padded?: boolean;
};

export function Section({
  tone = "paper",
  depth,
  padded = true,
  className,
  children,
  ...props
}: SectionProps) {
  const showGlow = depth ?? tone === "forest";
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        padded && "py-20 sm:py-28",
        TONE[tone],
        className,
      )}
      {...props}
    >
      {showGlow ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: FOREST_GLOW }}
        />
      ) : null}
      {children}
    </section>
  );
}
