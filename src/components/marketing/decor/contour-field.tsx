import { cn } from "@/lib/cn";

/**
 * Marginalia · cartographic — a topographic contour field. Oversized, placed
 * behind section content at 4–7% opacity (08-blueprint/14 D5). currentColor.
 */
export function ContourField({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    >
      <path d="M120 300c-52-14-84-52-78-96 6-42 44-70 92-74 50-4 96 18 112 56 17 40-2 82-40 100-30 15-58 21-86 14z" />
      <path d="M128 272c-38-11-62-39-57-72 5-31 33-52 69-55 37-3 71 13 83 42 12 29-2 60-30 74-22 11-44 16-65 11z" />
      <path d="M137 243c-25-8-41-26-38-48 4-21 22-35 46-37 25-2 48 9 56 28 8 20-1 40-20 50-14 8-30 11-44 7z" />
      <path d="M146 215c-13-4-21-14-19-25 2-11 11-18 24-19 13-1 25 5 29 15 4 10-1 21-10 26-8 4-16 6-24 3z" />
      <path d="M320 120c30-26 72-32 104-16 30 16 42 48 30 78-12 32-48 50-88 46-38-4-66-28-70-58-3-20 8-36 24-50z" />
      <path d="M334 136c22-19 52-23 75-12 22 12 31 35 22 57-9 23-35 36-64 33-28-3-48-20-51-42-2-14 6-26 18-36z" />
      <path d="M349 153c14-12 33-15 47-8 14 7 19 22 14 36-6 15-22 23-40 21-18-2-31-13-33-27-1-9 4-16 12-22z" />
      <path d="M20 80c40 6 68 26 76 54M460 240c-36-2-62-16-76-40" strokeDasharray="3 5" />
    </svg>
  );
}
