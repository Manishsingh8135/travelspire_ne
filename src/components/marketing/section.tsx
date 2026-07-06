import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Marketing "chapter" wrapper with a fixed, art-directed palette. Switching a
 * section's background is a ONE-PROP change — `tone="paper"` ↔ `tone="forest"`
 * — independent of the app's global light/dark toggle (the editorial look is
 * pinned per section, per new.md "chapters, not sections").
 *
 * The tone is expressed as `data-tone`, which re-maps the semantic token roles
 * (see globals.css §SECTION TONES). Inside a forest chapter, `bg-card`,
 * `text-muted-foreground`, `border-border-subtle`, `text-secondary` and the
 * `shadow-panel/lift/deep` elevation utilities all resolve to dark-tuned
 * values — components never hand-roll white/N recipes.
 *
 * Dark tones also get the forest-glow depth layer so the green-tinted charcoal
 * reads as "forest at night" rather than flat black. The glow is tuned low so
 * it lifts the room without erasing the card-vs-background step.
 */
export type SectionTone = "paper" | "sand" | "forest";

// Soft radial that lifts a dark section's centre + base. One place to retune
// the whole app's dark-section depth.
const FOREST_GLOW =
  "radial-gradient(120% 75% at 50% -10%, oklch(0.275 0.048 156) 0%, transparent 58%), radial-gradient(90% 60% at 50% 112%, oklch(0.235 0.044 158) 0%, transparent 60%)";

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
      data-tone={tone}
      className={cn(
        "relative isolate overflow-hidden bg-background text-foreground",
        padded && "py-20 sm:py-28",
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
