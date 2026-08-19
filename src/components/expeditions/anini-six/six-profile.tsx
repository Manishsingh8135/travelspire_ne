"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { sixProfile } from "@/data/expeditions/anini-six-days";
import { areaPath, plotPoints, smoothPath } from "./elevation-path";

const W = 1000;
const H = 330;
const PAD_TOP = 44;
const PAD_BOTTOM = 54;

const GRID = [
  { elev: 2655, label: "2,655 m" },
  { elev: 2000, label: "2,000 m" },
  { elev: 1000, label: "1,000 m" },
  { elev: 0, label: "Sea level" },
];

export function SixProfile() {
  const gradientId = useId();
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(5); // Mayodia Pass

  const nodes = sixProfile.nodes;
  const points = plotPoints(nodes, {
    width: W,
    height: H,
    padTop: PAD_TOP,
    padBottom: PAD_BOTTOM,
  });

  const line = smoothPath(points);
  const area = areaPath(points, H - PAD_BOTTOM);
  const active = nodes[activeIndex];
  const activePoint = points[activeIndex];

  const gridY = (elev: number) =>
    PAD_TOP + (H - PAD_TOP - PAD_BOTTOM) * (1 - elev / sixProfile.maxElev);

  return (
    <section
      aria-labelledby="six-profile-title"
      className="relative overflow-hidden bg-[#070E0D] py-20 text-[#F3EEE2] sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9683A]">
              {sixProfile.subtitle}
            </p>
            <h2
              id="six-profile-title"
              className="mt-4 text-[clamp(2.4rem,6vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.05em]"
            >
              The{" "}
              <span className="font-serif font-normal italic text-[#D8BE8B]">
                climb
              </span>
            </h2>
          </div>
          <p className="max-w-[30rem] text-sm leading-6 text-[#F3EEE2]/[0.6] sm:text-base sm:leading-7">
            {sixProfile.note}
          </p>
        </div>

        {/* Chart */}
        <div className="mt-10 sm:mt-14">
          <div className="-mx-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              role="img"
              aria-label={`Elevation profile from Dibrugarh at 108 metres to Anini at 1,968 metres, crossing Mayodia Pass at 2,655 metres over 385 kilometres.`}
              className="h-[240px] w-[760px] sm:h-[300px] sm:w-full lg:h-[340px]"
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D8BE8B" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="#D8BE8B" stopOpacity={0} />
                </linearGradient>
              </defs>

              {GRID.map((g) => (
                <g key={g.elev}>
                  <line
                    x1={0}
                    x2={W}
                    y1={gridY(g.elev)}
                    y2={gridY(g.elev)}
                    stroke="#F3EEE2"
                    strokeOpacity={g.elev === 0 ? 0.16 : 0.07}
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                  <text
                    x={6}
                    y={gridY(g.elev) - 7}
                    className="fill-[#F3EEE2]/35 font-mono text-[11px] uppercase tracking-[0.12em]"
                  >
                    {g.label}
                  </text>
                </g>
              ))}

              <path d={area} fill={`url(#${gradientId})`} />

              <motion.path
                d={line}
                fill="none"
                stroke="#D8BE8B"
                strokeWidth={2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={reduceMotion ? undefined : { pathLength: 0 }}
                whileInView={reduceMotion ? undefined : { pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Active marker */}
              <line
                x1={activePoint.x}
                x2={activePoint.x}
                y1={activePoint.y}
                y2={H - PAD_BOTTOM}
                stroke="#C9683A"
                strokeWidth={1}
                strokeDasharray="3 4"
                vectorEffect="non-scaling-stroke"
              />

              {points.map((p, i) => (
                <circle
                  key={nodes[i].name}
                  cx={p.x}
                  cy={p.y}
                  r={i === activeIndex ? 6 : 3.5}
                  fill={i === activeIndex ? "#C9683A" : "#070E0D"}
                  stroke={i === activeIndex ? "#F3EEE2" : "#D8BE8B"}
                  strokeWidth={1.5}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </div>

          {/* Waypoint rail — the control surface for the chart above. */}
          <div
            role="group"
            aria-label="Route waypoints"
            className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-6 sm:flex-wrap sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {nodes.map((node, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={node.name}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-pressed={isActive}
                  className={`flex min-h-11 flex-none items-center gap-2.5 rounded-[9px] border px-3.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8BE8B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070E0D] ${
                    isActive
                      ? "border-[#C9683A] bg-[#C9683A]/15 text-[#F3EEE2]"
                      : "border-[#F3EEE2]/12 text-[#F3EEE2]/55 hover:border-[#F3EEE2]/35 hover:text-[#F3EEE2]/85"
                  }`}
                >
                  <span className={isActive ? "text-[#D8BE8B]" : "text-[#F3EEE2]/35"}>
                    {node.km}
                  </span>
                  {node.name}
                </button>
              );
            })}
          </div>

          {/* Readout */}
          <div className="mt-6 grid gap-6 border-t border-[#F3EEE2]/[0.12] pt-6 sm:mt-8 sm:grid-cols-12 sm:gap-8 sm:pt-8">
            <dl className="flex gap-8 sm:col-span-4 sm:flex-col sm:gap-5">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#F3EEE2]/45">
                  Elevation
                </dt>
                <dd className="mt-1 font-mono text-2xl tracking-[-0.02em] text-[#D8BE8B] sm:text-3xl">
                  {active.elev.toLocaleString("en-IN")}
                  <span className="ml-1 text-sm text-[#F3EEE2]/50">m</span>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#F3EEE2]/45">
                  From Dibrugarh
                </dt>
                <dd className="mt-1 font-mono text-2xl tracking-[-0.02em] text-[#F3EEE2] sm:text-3xl">
                  {active.km}
                  <span className="ml-1 text-sm text-[#F3EEE2]/50">km</span>
                </dd>
              </div>
            </dl>

            <div className="sm:col-span-8">
              <h3 className="text-xl font-medium tracking-[-0.03em] text-[#F7F3E9] sm:text-2xl">
                {active.name}
              </h3>
              <p className="mt-2.5 max-w-[44rem] text-[0.95rem] leading-6 text-[#F3EEE2]/[0.68] sm:text-base sm:leading-7">
                {active.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
