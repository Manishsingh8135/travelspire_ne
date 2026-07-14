"use client";

import * as React from "react";

/**
 * TEMPORARY dev-only A/B switch for the dark-theme verdict
 * (08-blueprint/14 D1, third iteration): INK NIGHT vs TRUE BASALT.
 * Renders nothing in production. Delete this component (and the
 * html[data-night="basalt"] block in globals.css) once the founder picks.
 */
export function NightAB() {
  const [candidate, setCandidate] = React.useState<"ink" | "basalt">("ink");

  React.useEffect(() => {
    if (candidate === "basalt") document.documentElement.dataset.night = "basalt";
    else delete document.documentElement.dataset.night;
  }, [candidate]);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 left-4 z-[100] flex items-center gap-1 rounded-full border border-border-subtle bg-background/95 p-1 font-mono text-[11px] tracking-wider uppercase shadow-lg backdrop-blur">
      {(
        [
          ["ink", "Ink night"],
          ["basalt", "True basalt"],
        ] as const
      ).map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => setCandidate(value)}
          aria-pressed={candidate === value}
          className={
            candidate === value
              ? "rounded-full bg-foreground px-3 py-1.5 text-background"
              : "rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground"
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}
