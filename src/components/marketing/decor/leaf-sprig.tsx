/**
 * LeafSprig — a hand-drawn botanical sprig used as section marginalia (the
 * bamboo/leaf corner in the Experience opener). Decorative only; inherits
 * `currentColor`, sized via `className`. Part of the field-journal language
 * (new.md — "hand drawn map lines, compass motifs, ... woven throughout").
 */
export function LeafSprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden className={className}>
      {/* main stem */}
      <path
        d="M8 8 C 46 22, 96 40, 150 96"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* leaves alternating along the stem */}
      <g stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none">
        <path d="M40 20 C 30 6, 46 2, 58 10 C 54 24, 42 26, 40 20 Z" />
        <path d="M40 20 L 49 12" strokeWidth="0.9" />
        <path d="M64 34 C 56 18, 74 16, 84 26 C 78 40, 66 40, 64 34 Z" />
        <path d="M64 34 L 74 27" strokeWidth="0.9" />
        <path d="M92 52 C 86 34, 104 34, 112 46 C 104 60, 94 58, 92 52 Z" />
        <path d="M92 52 L 102 45" strokeWidth="0.9" />
        <path d="M116 74 C 112 56, 130 58, 136 70 C 128 84, 118 80, 116 74 Z" />
        <path d="M116 74 L 126 68" strokeWidth="0.9" />
      </g>
    </svg>
  );
}
