import { cn } from "@/lib/cn";

/**
 * RidgeMotif — a quiet hand-drawn mountain-ridge line-art, the field-journal
 * marginalia the design language calls for ("hand drawn map lines… woven
 * throughout"). Pure stroke, `currentColor`, decorative-only. Keep it faint:
 * set opacity/size on the consumer. Reused as section marginalia (Problem
 * stats band, later atlas/footer accents).
 */
export function RidgeMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 96"
      fill="none"
      aria-hidden
      className={cn("text-current", className)}
    >
      {/* far ridge */}
      <path
        d="M2 70 C 26 52, 40 58, 58 44 C 74 32, 86 40, 104 30 C 120 21, 132 33, 150 26 C 170 18, 186 30, 206 24 C 222 19, 230 26, 238 22"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* near ridge */}
      <path
        d="M2 88 C 30 72, 48 82, 70 66 C 88 53, 100 64, 120 54 C 138 45, 150 58, 172 50 C 192 43, 206 56, 238 46"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      {/* lone pine on the near ridge */}
      <path
        d="M150 58 L150 47 M150 50 l-5 4 M150 50 l5 4 M150 53 l-4 3 M150 53 l4 3"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* two distant birds */}
      <path
        d="M196 16 q4 -4 8 0 q4 -4 8 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M214 24 q3 -3 6 0 q3 -3 6 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
