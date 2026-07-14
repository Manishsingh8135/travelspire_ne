import { cn } from "@/lib/cn";

/**
 * Marginalia · cartographic — a circular field stamp (the postal/permit mark
 * language). Crisp edge marginalia, NOT a background motif. currentColor;
 * rotate with a wrapper class (e.g. -rotate-3). (08-blueprint/14 D5)
 */
export function WaxStamp({
  label,
  sub,
  className,
}: {
  /** Uppercase mono ring/center text, e.g. "DREAM". */
  label: string;
  /** Small line under the label, e.g. "STAGE 01". */
  sub?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    >
      <circle cx="48" cy="48" r="45" strokeWidth="1.6" strokeDasharray="2.4 3.2" />
      <circle cx="48" cy="48" r="37" strokeWidth="1.2" />
      <path d="M20 48h8M68 48h8" strokeWidth="1.2" />
      <text
        x="48"
        y={sub ? 47 : 52}
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        className="font-mono"
        style={{ fontSize: 13, letterSpacing: "0.12em" }}
      >
        {label.toUpperCase()}
      </text>
      {sub ? (
        <text
          x="48"
          y="62"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          className="font-mono"
          style={{ fontSize: 7.5, letterSpacing: "0.18em", opacity: 0.75 }}
        >
          {sub.toUpperCase()}
        </text>
      ) : null}
    </svg>
  );
}
