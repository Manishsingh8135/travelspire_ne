import { aniniRouteProfile } from "@/data/places/anini";

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

export function WayProfile() {
  const pts = aniniRouteProfile.map((stop) => ({ ...stop, px: x(stop.km), py: y(stop.elev) }));
  const ridge = smoothPath(pts);
  const areaPath = `${ridge} L ${x(MAX_KM)} ${VIEW_H - PAD_B} L ${PAD_L} ${VIEW_H - PAD_B} Z`;
  const elevationGrid = [0, 1000, 2000];

  return (
    <section aria-labelledby="way-profile-title" className="bg-[#07100d] py-20 text-white sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
            The climb, in one line
          </p>
          <h2
            id="way-profile-title"
            className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#f7f4ec]"
          >
            Two thousand metres{" "}
            <span className="font-serif font-normal italic text-[#dfcfab]">in fifty-six kilometres</span>
          </h2>
          <p className="mt-6 max-w-[34rem] text-base leading-7 text-white/[0.6] sm:text-lg sm:leading-8">
            This is the mountain leg — the 235 km from Roing over Mayodia Pass to the
            Anini plateau. Read it like a heartbeat: the steep spike is the pass, the
            long valley after it is where the road earns its reputation.
          </p>
        </div>

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
        </div>
      </div>
    </section>
  );
}
