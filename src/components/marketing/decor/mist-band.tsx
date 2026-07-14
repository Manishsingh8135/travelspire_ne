import { cn } from "@/lib/cn";

/**
 * Marginalia · nature — drifting mist wisps. Horizontal atmosphere for
 * section edges; place at low opacity in currentColor (08-blueprint/14 D5).
 */
export function MistBand({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    >
      <path d="M8 18c40-10 84-10 120 2s78 10 116-2 82-12 124 0" />
      <path d="M40 36c36-8 70-8 100 2s66 9 98-1 68-10 104 0" strokeDasharray="24 14" />
      <path d="M84 52c30-7 58-6 82 2s54 8 80-1" opacity="0.7" />
    </svg>
  );
}
