import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { aniniPractical, aniniRouteProfile } from "@/data/places/anini";
import { createTripPlanningURL } from "@/lib/whatsapp";

const VIEW_W = 1000;
const VIEW_H = 340;
const PAD_L = 44;
const PAD_R = 28;
const PAD_T = 64;
const PAD_B = 52;
const MAX_ELEV = 2800;
const MAX_KM = 235;

function x(km: number) {
  return PAD_L + (km / MAX_KM) * (VIEW_W - PAD_L - PAD_R);
}
function y(elev: number) {
  return VIEW_H - PAD_B - (elev / MAX_ELEV) * (VIEW_H - PAD_T - PAD_B);
}

// Catmull-Rom → cubic bezier for a ridge line that reads like terrain
function smoothPath(points: { px: number; py: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].px} ${points[0].py}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1x = p1.px + (p2.px - p0.px) / 6;
    const c1y = p1.py + (p2.py - p0.py) / 6;
    const c2x = p2.px - (p3.px - p1.px) / 6;
    const c2y = p2.py - (p3.py - p1.py) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.px} ${p2.py}`;
  }
  return d;
}

export function AniniRoute() {
  const pts = aniniRouteProfile.map((stop) => ({ ...stop, px: x(stop.km), py: y(stop.elev) }));
  const ridge = smoothPath(pts);
  const areaPath = `${ridge} L ${x(MAX_KM)} ${VIEW_H - PAD_B} L ${PAD_L} ${VIEW_H - PAD_B} Z`;
  const elevationGrid = [0, 1000, 2000];

  return (
    <section
      aria-labelledby="anini-route-title"
      className="bg-[#07100d] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
            The way there
          </p>
          <h2
            id="anini-route-title"
            className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#f7f4ec]"
          >
            One road. One pass.{" "}
            <span className="font-serif font-normal italic text-[#dfcfab]">
              Zero shortcuts.
            </span>
          </h2>
          <p className="mt-6 max-w-[34rem] text-base leading-7 text-white/[0.6] sm:text-lg sm:leading-8">
            NH-313 from Roing: 235 km, one 2,655 m cloud pass, and a final climb
            onto the plateau. Six to seven hours in dry conditions — eight to ten
            when the monsoon is leaving. This is the road we drive every week.
          </p>
        </div>

        {/* Elevation profile — data as art */}
        <div className="mt-12 overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#0b1512] lg:mt-14">
          <div className="flex flex-wrap items-baseline justify-between gap-2 px-6 pt-6 sm:px-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/[0.5]">
              Roing → Anini · elevation profile
            </p>
            <p className="text-[9px] uppercase tracking-[0.16em] text-white/[0.32]">
              Indicative profile · altitudes at named points are published figures
            </p>
          </div>

          <div className="overflow-x-auto pb-2">
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              role="img"
              aria-label="Elevation profile of the Roing to Anini road, climbing over the 2,655 metre Mayodia Pass"
              className="mt-2 h-auto w-full min-w-[760px]"
            >
              {elevationGrid.map((elev) => (
                <g key={elev}>
                  <line
                    x1={PAD_L}
                    x2={VIEW_W - PAD_R}
                    y1={y(elev)}
                    y2={y(elev)}
                    stroke="rgba(247,244,236,0.07)"
                    strokeDasharray="2 6"
                  />
                  <text
                    x={PAD_L - 8}
                    y={y(elev) + 3}
                    textAnchor="end"
                    fill="rgba(247,244,236,0.35)"
                    fontSize="10"
                    fontFamily="ui-monospace, monospace"
                  >
                    {elev.toLocaleString()}m
                  </text>
                </g>
              ))}

              <path d={areaPath} fill="rgba(216,197,157,0.07)" />
              <path
                d={ridge}
                fill="none"
                stroke="#d8c59d"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {pts.map((stop, index) => {
                const isPass = stop.name === "Mayodia Pass";
                const isAnini = stop.name === "Anini";
                const labelAbove = index % 2 === 0 || isPass;
                return (
                  <g key={stop.name}>
                    <circle
                      cx={stop.px}
                      cy={stop.py}
                      r={isPass || isAnini ? 5 : 3.5}
                      fill={isPass || isAnini ? "#d8c59d" : "#0b1512"}
                      stroke="#d8c59d"
                      strokeWidth="1.5"
                    />
                    <text
                      x={stop.px}
                      y={labelAbove ? stop.py - 24 : stop.py + 30}
                      textAnchor="middle"
                      fill="#f7f4ec"
                      fontSize="12"
                      fontWeight={600}
                      letterSpacing="0.04em"
                    >
                      {stop.name}
                    </text>
                    <text
                      x={stop.px}
                      y={labelAbove ? stop.py - 11 : stop.py + 43}
                      textAnchor="middle"
                      fill="rgba(216,197,157,0.75)"
                      fontSize="9.5"
                      fontFamily="ui-monospace, monospace"
                    >
                      {stop.km === 0 ? "KM 0" : `${stop.km}k`} · {stop.elev.toLocaleString()}m
                    </text>
                    <text
                      x={stop.px}
                      y={labelAbove ? stop.py + 18 : stop.py - 12}
                      textAnchor="middle"
                      fill="rgba(247,244,236,0.4)"
                      fontSize="9"
                      fontStyle="italic"
                    >
                      {stop.note}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/[0.08] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="max-w-[52ch] text-xs leading-5 text-white/[0.5]">
              Depart Roing by 6:00 AM, daylight only, SUV/4WD with a driver who knows
              the slide zones. Small hatchbacks and sedans are strongly discouraged.
            </p>
            <div className="flex flex-none flex-wrap items-center gap-3">
              <Link
                href="/permits/arunachal-pradesh-ilp"
                className="inline-flex min-h-10 items-center gap-2 rounded-[9px] border border-[#d8c59d]/40 px-4 text-[10px] font-bold uppercase tracking-[0.13em] text-[#e7d9b8] transition-colors duration-200 hover:bg-[#d8c59d]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6d8b8]"
              >
                ILP guide
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
              <a
                href={createTripPlanningURL({ destination: "Anini, Dibang Valley" })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-[9px] bg-[#f2ead8] px-4 text-[10px] font-bold uppercase tracking-[0.13em] text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8]"
              >
                <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
                Ride with us
              </a>
            </div>
          </div>
        </div>

        {/* Practical trust block — facts are chips, places never are */}
        <ul className="mt-10 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {aniniPractical.map((item) => (
            <li
              key={item.label}
              className="rounded-[10px] border border-white/[0.08] bg-white/[0.03] px-4 py-3.5"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#d8c59d]">
                {item.label}
              </p>
              <p className="mt-1.5 text-[12.5px] leading-5 text-white/[0.62]">{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
