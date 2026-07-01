import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * StampBadge — a circular "seal" with curved text top & bottom and a center
 * mark, the passport-stamp / field-journal motif from the design language.
 * Reused as section marginalia (Dream "REAL STORIES · REAL NORTHEAST",
 * Experiences, Membership). Inherits `currentColor`; size via `className`.
 */
type StampBadgeProps = {
  topText: string;
  bottomText: string;
  /** Center glyph; defaults to a small twin-peak mountain mark. */
  icon?: React.ReactNode;
  className?: string;
};

function StampBadge({ topText, bottomText, icon, className }: StampBadgeProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={cn("text-current", className)}>
      <defs>
        {/* top arc: left→right over the top (text upright) */}
        <path id="stamp-top" d="M 22 60 A 38 38 0 0 1 98 60" />
        {/* bottom arc: left→right under the bottom (text upright, reads L→R) */}
        <path id="stamp-bottom" d="M 24 62 A 36 36 0 0 0 96 62" />
      </defs>

      <circle cx="60" cy="60" r="57" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />

      {/* side dots separating the two text arcs */}
      <circle cx="17" cy="60" r="1.4" fill="currentColor" opacity="0.7" />
      <circle cx="103" cy="60" r="1.4" fill="currentColor" opacity="0.7" />

      <text className="fill-current font-mono" fontSize="8.5" letterSpacing="2.2">
        <textPath href="#stamp-top" startOffset="50%" textAnchor="middle">
          {topText}
        </textPath>
      </text>
      <text className="fill-current font-mono" fontSize="8.5" letterSpacing="2.2">
        <textPath href="#stamp-bottom" startOffset="50%" textAnchor="middle">
          {bottomText}
        </textPath>
      </text>

      <g transform="translate(60 60)" className="text-current">
        {icon ?? (
          <path
            d="M -13 7 L -4 -5 L 1 1 L 7 -8 L 15 7 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="none"
          />
        )}
      </g>
    </svg>
  );
}

export { StampBadge };
