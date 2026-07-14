import { cn } from "@/lib/cn";

/**
 * Marginalia · textile — abstracted weave bands used as section dividers and
 * card edgings (08-blueprint/14 D5). Two variants, both ABSTRACTIONS of NE
 * textile geometry (diamond bands / fine line groups), deliberately generic —
 * never a claim to a specific community's protected pattern. currentColor.
 */
export function WeaveBand({
  variant = "diamond",
  className,
}: {
  variant?: "diamond" | "lines";
  className?: string;
}) {
  if (variant === "lines") {
    return (
      <svg
        viewBox="0 0 480 20"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        aria-hidden
        className={cn("pointer-events-none select-none", className)}
      >
        <path d="M0 3h480" strokeWidth="1.6" />
        <path d="M0 7.5h480" strokeWidth="0.8" />
        <path d="M0 12.5h480" strokeWidth="0.8" />
        <path d="M0 17h480" strokeWidth="1.6" />
        <path d="M0 10h480" strokeWidth="2.6" strokeDasharray="14 10" />
      </svg>
    );
  }
  const diamonds = Array.from({ length: 16 }, (_, i) => {
    const x = 15 + i * 30;
    return `M${x} 4l6 6-6 6-6-6z`;
  }).join(" ");
  return (
    <svg
      viewBox="0 0 480 20"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    >
      <path d="M0 1.5h480M0 18.5h480" strokeWidth="1.4" />
      <path d={diamonds} strokeWidth="1.2" />
      {Array.from({ length: 16 }, (_, i) => (
        <circle key={i} cx={15 + i * 30} cy="10" r="1" fill="currentColor" stroke="none" />
      ))}
    </svg>
  );
}
