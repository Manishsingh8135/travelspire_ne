"use client";

import { useState } from "react";
import { MapPin, Gem, Route, Users, Compass } from "lucide-react";
import { cn } from "@/lib/cn";
import { CompassRose } from "@/components/marketing/decor/compass-rose";

type LayerKey = "destination" | "hidden" | "road" | "scout" | "experience";
type Pin = { name: string; layer: LayerKey; x: number; y: number };

// The five intelligence layers (new.md §5). Restrained palette — layers read by
// icon + subtle tone, not SaaS rainbow. Marigold stays reserved (Passport only).
const LAYERS: { key: LayerKey; label: string; icon: typeof MapPin }[] = [
  { key: "destination", label: "Destinations", icon: MapPin },
  { key: "hidden", label: "Hidden places", icon: Gem },
  { key: "road", label: "Road conditions", icon: Route },
  { key: "scout", label: "Local scouts", icon: Users },
  { key: "experience", label: "Experiences", icon: Compass },
];

// Real Northeast places, arranged as a stylised field-journal constellation
// (an evocative preview — the real interactive map lives at /explore).
const PINS: Pin[] = [
  { name: "Tawang", layer: "destination", x: 15, y: 19 },
  { name: "Sela Pass", layer: "road", x: 26, y: 30 },
  { name: "Mechuka", layer: "destination", x: 33, y: 45 },
  { name: "Ziro", layer: "destination", x: 29, y: 65 },
  { name: "Local scout", layer: "scout", x: 47, y: 53 },
  { name: "Majuli", layer: "destination", x: 53, y: 76 },
  { name: "Dzükou", layer: "hidden", x: 39, y: 88 },
  { name: "Anini", layer: "hidden", x: 66, y: 28 },
  { name: "Dong", layer: "hidden", x: 83, y: 43 },
  { name: "Dambuk", layer: "experience", x: 73, y: 63 },
];

// Dotted "expedition" routes threaded through the pins.
const ROUTES = ["M15 19 L33 45 L29 65 L53 76", "M66 28 L83 43 L73 63"];

const SOLID: LayerKey[] = ["destination", "experience"];

function Legend({
  active,
  onToggle,
  className,
}: {
  active: LayerKey | null;
  onToggle: (key: LayerKey) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-charcoal-950/70 p-2 backdrop-blur-md",
        className,
      )}
    >
      <ul className="flex flex-wrap gap-1 sm:flex-col sm:gap-0.5">
        {LAYERS.map(({ key, label, icon: Icon }) => {
          const on = active === key;
          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => onToggle(key)}
                aria-pressed={on}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  on ? "bg-white/10 text-mist-50" : "text-mist-200/80 hover:bg-white/5",
                )}
              >
                <Icon className="size-4 shrink-0 text-pine-300" />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * The Living Map teaser canvas — dark, textured, content-dominant. Pins glow
 * slowly (CSS, reduced-motion-safe); selecting a layer in the legend brings its
 * pins forward and dims the rest, telling the "layers" story without hijacking
 * the scroll. The whole thing is a preview; the CTA opens the real map.
 */
export function MapCanvas() {
  const [active, setActive] = useState<LayerKey | null>(null);
  const toggle = (key: LayerKey) => setActive((cur) => (cur === key ? null : key));

  return (
    <div>
      <div className="relative min-h-[62vh] overflow-hidden rounded-3xl bg-charcoal-900/50 ring-1 ring-white/10 sm:min-h-[66vh] lg:min-h-[70vh]">
        {/* soft depth wash */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 38% 32%, oklch(0.3 0.045 160 / 0.55) 0%, transparent 60%), radial-gradient(70% 60% at 75% 78%, oklch(0.26 0.04 165 / 0.4) 0%, transparent 65%)",
          }}
        />

        {/* contour texture — hand-drawn elevation lines, two interleaved families
           so the canvas reads as a topographic map rather than empty black */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full text-pine-300/16"
          fill="none"
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <path
              key={`a${i}`}
              d={`M-5 ${10 + i * 12} C 22 ${2 + i * 12}, 42 ${20 + i * 12}, 62 ${12 + i * 12} S 96 ${0 + i * 12}, 106 ${14 + i * 12}`}
              stroke="currentColor"
              strokeWidth="0.25"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={`b${i}`}
              d={`M-5 ${22 + i * 18} C 30 ${30 + i * 18}, 55 ${14 + i * 18}, 78 ${24 + i * 18} S 100 ${34 + i * 18}, 106 ${26 + i * 18}`}
              stroke="currentColor"
              strokeWidth="0.2"
              strokeDasharray="1 2"
              vectorEffect="non-scaling-stroke"
              opacity="0.5"
            />
          ))}
        </svg>

        {/* field-journal compass, faint in the corner */}
        <CompassRose className="pointer-events-none absolute top-5 right-5 hidden w-20 text-pine-200/20 sm:block lg:w-24" />

        {/* expedition routes */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className={cn(
            "absolute inset-0 h-full w-full transition-colors duration-500",
            active && active !== "road" ? "text-pine-300/15" : "text-pine-200/40",
          )}
          fill="none"
        >
          {ROUTES.map((d) => (
            <path
              key={d}
              d={d}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="0.4 3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* pins */}
        {PINS.map((pin, i) => {
          const dimmed = active !== null && active !== pin.layer;
          const solid = SOLID.includes(pin.layer);
          const labelLeft = pin.x > 68;
          return (
            <div
              key={pin.name}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500",
                dimmed ? "opacity-25" : "opacity-100",
              )}
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              <div className="relative flex items-center">
                {/* glowing halo */}
                <span
                  aria-hidden
                  className="ts-pin-halo absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pine-300/50 blur-[2px]"
                  style={{ animationDelay: `${(i % 5) * 0.6}s` }}
                />
                {/* core */}
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 block size-2.5 rounded-full ring-2 ring-charcoal-950/60",
                    solid ? "bg-mist-50" : "border border-pine-200 bg-charcoal-900",
                  )}
                />
                {/* label */}
                <span
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 rounded-full bg-charcoal-950/55 px-2 py-0.5 font-mono text-[10px] tracking-wide whitespace-nowrap text-mist-100 ring-1 ring-white/10 backdrop-blur-sm sm:text-[11px]",
                    labelLeft ? "right-full mr-2.5" : "left-full ml-2.5",
                  )}
                >
                  {pin.name}
                </span>
              </div>
            </div>
          );
        })}

        {/* legend — overlay on desktop */}
        <Legend
          active={active}
          onToggle={toggle}
          className="absolute bottom-6 left-6 hidden sm:block"
        />
      </div>

      {/* legend — below the canvas on mobile (never covers the pins) */}
      <Legend active={active} onToggle={toggle} className="mt-3 sm:hidden" />
    </div>
  );
}
