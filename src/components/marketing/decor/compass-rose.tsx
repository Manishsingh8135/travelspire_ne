/**
 * CompassRose — a hand-drawn compass motif from the brand's field-journal
 * language (new.md). Decorative only; inherits `currentColor`, sized via
 * `className`. Reused wherever the "expedition" note recurs (Experience band,
 * later the journey loop / membership).
 */
export function CompassRose({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden className={className}>
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="50" cy="50" r="37" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      {/* cardinal tick marks */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.6">
        <path d="M50 6 L50 14" />
        <path d="M50 86 L50 94" />
        <path d="M6 50 L14 50" />
        <path d="M86 50 L94 50" />
      </g>
      {/* four-point star needle */}
      <path
        d="M50 16 L57 50 L50 84 L43 50 Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M16 50 L50 43 L84 50 L50 57 Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.85" />
    </svg>
  );
}
