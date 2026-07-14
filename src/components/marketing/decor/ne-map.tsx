import { cn } from "@/lib/cn";

/**
 * Marginalia · cartographic — the hand-drawn map of the Northeast.
 * STYLIZED silhouettes (a field-journal sketch, not survey cartography):
 * recognizable shapes and true relative positions, softened corners.
 * Powers the Paper Atlas section, the nav Explore panel and /explore.
 *
 * Presentational: each state is a <path data-state="slug">. Interactivity
 * (hover lift, click-through) is wired by the consuming section via CSS
 * ([data-state]:hover) or by cloning with handlers. currentColor strokes.
 */

export type NEState = {
  slug: string;
  name: string;
  /** Label anchor inside the silhouette. */
  labelX: number;
  labelY: number;
};

export const NE_STATES: NEState[] = [
  { slug: "sikkim", name: "Sikkim", labelX: 47, labelY: 88 },
  { slug: "arunachal-pradesh", name: "Arunachal Pradesh", labelX: 268, labelY: 62 },
  { slug: "assam", name: "Assam", labelX: 205, labelY: 142 },
  { slug: "meghalaya", name: "Meghalaya", labelX: 143, labelY: 185 },
  { slug: "nagaland", name: "Nagaland", labelX: 356, labelY: 152 },
  { slug: "manipur", name: "Manipur", labelX: 348, labelY: 216 },
  { slug: "mizoram", name: "Mizoram", labelX: 288, labelY: 272 },
  { slug: "tripura", name: "Tripura", labelX: 223, labelY: 253 },
];

const PATHS: Record<string, string> = {
  sikkim:
    "M38 66c8-5 18-4 24 2 5 5 6 13 3 20-2 6-4 12-9 15-6 4-14 3-19-2-5-6-6-14-4-21 1-6 2-11 5-14z",
  "arunachal-pradesh":
    "M118 78c-6-10-3-22 6-29 10-8 24-11 38-12 18-2 36 2 54 1 20-1 39-6 59-6 22 0 44 5 64 13 14 6 28 13 38 24 8 9 13 21 10 32-3 10-13 16-23 20-8 3-17 4-24 9-6 5-9 13-13 20-4 8-9 16-17 19-9 3-19-1-24-9-4-7-4-16-9-22-6-7-16-8-25-9-16-1-32-1-48-3-14-2-28-4-41-9-11-4-22-9-29-18-6-7-11-14-16-21z",
  assam:
    "M64 118c8-8 20-10 31-9 14 1 27 6 41 8 17 3 34 3 51 4 15 1 30 2 45 5 12 2 24 5 34 12 6 4 11 10 10 17-1 8-9 12-16 14-10 3-21 2-31 5-6 2-12 6-18 6-7 0-13-5-20-7-9-3-19-2-28-4-8-2-15-7-23-9-10-3-20-2-30-4-11-2-22-5-31-11-8-5-16-12-17-21-1-3 0-4 2-6z M195 178c7-3 15-2 21 2 5 4 8 10 12 15 4 6 9 11 10 18 1 5-2 10-7 12-6 2-12-1-16-5-6-6-10-13-14-20-3-6-8-12-9-18 0-2 1-3 3-4z",
  meghalaya:
    "M96 168c10-6 22-7 33-7 13 0 26 1 38 4 9 2 19 4 25 11 4 5 4 12-1 16-6 6-15 6-23 7-12 1-24 2-36 0-11-2-22-4-31-10-5-4-11-9-10-15 1-3 3-5 5-6z",
  nagaland:
    "M336 118c8-4 18-4 26 0 8 5 13 13 16 22 3 8 5 17 3 25-2 7-8 12-15 14-7 2-15 1-21-3-7-5-10-13-12-21-2-9-3-18-1-26 1-5 2-9 4-11z",
  manipur:
    "M326 192c8-6 19-8 29-6 9 2 17 8 21 16 4 9 4 19 1 28-3 8-10 14-19 15-9 2-19 0-26-6-6-6-9-14-10-22-1-9 0-19 4-25z",
  mizoram:
    "M270 236c7-4 16-3 22 2 6 6 8 14 9 22 1 10 1 20-1 30-2 8-5 17-12 21-6 3-13 1-17-4-5-7-5-16-6-24-1-12-1-24 1-35 1-5 2-9 4-12z",
  tripura:
    "M206 234c7-5 17-6 25-3 7 3 12 10 13 18 1 9-2 18-8 24-5 6-13 9-20 7-7-2-12-9-14-16-2-10-2-21 4-30z",
};

export function NEMap({
  className,
  activeState,
  showLabels = false,
}: {
  className?: string;
  /** Slug of the state to render as active (thicker stroke + fill wash). */
  activeState?: string;
  showLabels?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 420 320"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    >
      {/* the Brahmaputra — the valley's spine */}
      <path
        d="M78 128c22 8 46 10 70 12 26 2 52 2 78 6 18 3 36 7 52 14"
        strokeWidth="1"
        strokeDasharray="1.5 4"
        opacity="0.6"
      />
      {NE_STATES.map((s) => (
        <path
          key={s.slug}
          d={PATHS[s.slug]}
          data-state={s.slug}
          strokeWidth={activeState === s.slug ? 2.2 : 1.3}
          fill={activeState === s.slug ? "currentColor" : "none"}
          fillOpacity={activeState === s.slug ? 0.08 : 0}
          className="transition-all duration-200"
        >
          <title>{s.name}</title>
        </path>
      ))}
      {showLabels
        ? NE_STATES.map((s) => (
            <text
              key={`label-${s.slug}`}
              x={s.labelX}
              y={s.labelY}
              textAnchor="middle"
              fill="currentColor"
              stroke="none"
              className="font-mono"
              style={{ fontSize: 8.5, letterSpacing: "0.14em", opacity: 0.8 }}
            >
              {s.name.toUpperCase()}
            </text>
          ))
        : null}
      {/* compass tick */}
      <path d="M394 24v-12M394 12l-4 6M394 12l4 6" strokeWidth="1.2" />
      <text
        x="394"
        y="34"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        className="font-mono"
        style={{ fontSize: 8, letterSpacing: "0.1em" }}
      >
        N
      </text>
    </svg>
  );
}
