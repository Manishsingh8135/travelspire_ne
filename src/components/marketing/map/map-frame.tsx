"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Route } from "next";
import {
  ArrowRight,
  Route as RouteIcon,
  CloudSun,
  Home,
  Compass,
  Mountain,
  ShieldCheck,
} from "lucide-react";
import type { MapPlace } from "@/server/atlas";
import { CompassRose } from "@/components/marketing/decor/compass-rose";
import { cn } from "@/lib/cn";

// Real map is heavy + client-only — load it lazily, and only once in view.
const LivingMap = dynamic(
  () => import("@/components/map/living-map").then((m) => m.LivingMap),
  { ssr: false },
);

// The intelligence layers this map blends. Informative legend (not fake toggles).
const LAYERS = [
  { label: "Road Conditions", icon: RouteIcon },
  { label: "Weather", icon: CloudSun },
  { label: "Stays", icon: Home },
  { label: "Experiences", icon: Compass },
  { label: "Trails", icon: Mountain },
  { label: "Permit Zones", icon: ShieldCheck },
];

// Static field-journal constellation used as the fallback backdrop when no
// Mapbox token is set (looks intentional locally; the real relief map renders
// wherever NEXT_PUBLIC_MAPBOX_TOKEN is configured).
const PINS: { name: string; x: number; y: number; solid?: boolean }[] = [
  { name: "Tawang", x: 15, y: 20, solid: true },
  { name: "Sela Pass", x: 26, y: 31 },
  { name: "Mechuka", x: 34, y: 46, solid: true },
  { name: "Ziro", x: 30, y: 66, solid: true },
  { name: "Majuli", x: 53, y: 76, solid: true },
  { name: "Dzükou", x: 40, y: 88 },
  { name: "Anini", x: 66, y: 28 },
  { name: "Dong", x: 83, y: 44 },
  { name: "Dambuk", x: 73, y: 63, solid: true },
];
const ROUTES = ["M15 20 L34 46 L30 66 L53 76", "M66 28 L83 44 L73 63"];

function Backdrop() {
  return (
    <div className="absolute inset-0">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 38% 32%, oklch(0.3 0.045 160 / 0.55) 0%, transparent 60%), radial-gradient(70% 60% at 75% 78%, oklch(0.26 0.04 165 / 0.4) 0%, transparent 65%)",
        }}
      />
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
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-pine-200/35"
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
      {PINS.map((pin, i) => {
        const labelLeft = pin.x > 68;
        return (
          <div
            key={pin.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <div className="relative flex items-center">
              <span
                aria-hidden
                className="ts-pin-halo absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pine-300/50 blur-[2px]"
                style={{ animationDelay: `${(i % 5) * 0.6}s` }}
              />
              <span
                aria-hidden
                className={cn(
                  "relative z-10 block size-2.5 rounded-full ring-2 ring-charcoal-950/60",
                  pin.solid ? "bg-mist-50" : "border border-pine-200 bg-charcoal-900",
                )}
              />
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
      <CompassRose className="pointer-events-none absolute top-5 right-5 hidden w-20 text-pine-200/20 sm:block lg:w-24" />
    </div>
  );
}

/**
 * The map frame — renders the real interactive Mapbox map when a token is set
 * (lazily, once scrolled near view so it never touches page-load performance),
 * and a stylised field-journal backdrop otherwise. Overlays the "Map Layers"
 * legend and the "Explore Full Map" CTA either way.
 */
export function MapFrame({ places, token }: { places: MapPlace[]; token?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showRealMap = Boolean(token) && inView;

  return (
    <div
      ref={ref}
      className="relative min-h-[58vh] overflow-hidden rounded-3xl bg-charcoal-900/50 ring-1 ring-white/10 sm:min-h-[62vh] lg:min-h-[72vh]"
    >
      {/* stylised backdrop always sits behind — it's the graceful fallback while
         the real map loads, or wherever Mapbox/WebGL can't render */}
      <Backdrop />
      {showRealMap ? (
        <div className="absolute inset-0">
          <LivingMap
            places={places}
            token={token}
            style="mapbox://styles/mapbox/dark-v11"
            showLoadingOverlay={false}
          />
        </div>
      ) : null}

      {/* Map Layers legend — informative, bottom-left (clears the map's nav control) */}
      <div className="pointer-events-none absolute bottom-4 left-4 hidden sm:block">
        <div className="rounded-2xl border border-white/10 bg-charcoal-950/70 p-3 backdrop-blur-md">
          <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-mist-300 uppercase">
            Map Layers
          </p>
          <ul className="flex flex-col gap-1.5">
            {LAYERS.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm text-mist-100">
                <Icon className="size-4 shrink-0 text-pine-300" />
                {label}
                <span aria-hidden className="ml-auto size-1.5 rounded-full bg-pine-300/90" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Explore Full Map CTA */}
      <Link
        href={"/explore" as Route}
        className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-mist-50 px-5 py-2.5 text-sm font-medium text-charcoal-950 shadow-lg transition-colors duration-200 hover:bg-mist-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        Explore Full Map
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
