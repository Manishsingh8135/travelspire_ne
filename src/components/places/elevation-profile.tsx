import { cn } from "@/lib/utils";

/* Elevation profile of NH-313, Roing → Anini. The SVG draws the shape of the
   climb in theme colours; the stops are a real list underneath, so every
   name, altitude and note stays readable at phone width (SVG labels shrink
   with the chart, so they only appear from md up). */

export type ProfileStop = { km: number; name: string; elev: number; note: string };

const W = 1000;
const H = 320;
const PAD = { l: 52, r: 24, t: 40, b: 36 };
const MAX_ELEV = 2800;

function smoothPath(points: { x: number; y: number }[]) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    d += ` C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6}, ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export function ElevationProfile({ stops, className }: { stops: readonly ProfileStop[]; className?: string }) {
  const maxKm = stops[stops.length - 1].km;
  const x = (km: number) => PAD.l + (km / maxKm) * (W - PAD.l - PAD.r);
  const y = (elev: number) => H - PAD.b - (elev / MAX_ELEV) * (H - PAD.t - PAD.b);
  const pts = stops.map((s) => ({ ...s, x: x(s.km), y: y(s.elev) }));
  const ridge = smoothPath(pts);
  const area = `${ridge} L ${x(maxKm)} ${H - PAD.b} L ${PAD.l} ${H - PAD.b} Z`;
  const high = stops.reduce((a, b) => (b.elev > a.elev ? b : a));

  // Name only the stops that have room: ends and high point first, then any
  // stop at least 110 units from an already-named one. The full list sits
  // under the chart, so nothing is lost.
  const named = new Set<string>([stops[0].name, stops[stops.length - 1].name, high.name]);
  for (const p of pts) {
    if (named.has(p.name)) continue;
    const clear = pts.filter((q) => named.has(q.name)).every((q) => Math.abs(q.x - p.x) > 110);
    if (clear) named.add(p.name);
  }

  return (
    <figure className={cn("font-ui", className)}>
      <div className="rounded-panel border border-line bg-surface p-4 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-small font-semibold text-fg">Roing → Anini · elevation profile</p>
          <p className="text-caption text-fg-subtle">Indicative — altitudes at named points are published figures</p>
        </div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Elevation profile of the ${maxKm} km Roing to Anini road, climbing to ${high.elev.toLocaleString("en-IN")} m at ${high.name}`}
          className="mt-4 h-auto w-full"
        >
          {[0, 1000, 2000].map((e) => (
            <g key={e}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y(e)} y2={y(e)} className="stroke-line" strokeWidth={1} strokeDasharray={e ? "4 6" : undefined} />
              <text x={PAD.l - 10} y={y(e) + 5} textAnchor="end" className="hidden fill-fg-subtle md:block" fontSize={15}>
                {e === 0 ? "0" : `${e / 1000}k m`}
              </text>
            </g>
          ))}
          <path d={area} className="fill-brand/10" />
          <path d={ridge} className="stroke-brand" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          {pts.map((p, i) => (
            <g key={p.name}>
              <circle cx={p.x} cy={p.y} r={p.name === high.name ? 6 : 4.5} className="fill-canvas stroke-brand" strokeWidth={2.5} />
              {named.has(p.name) ? (
                <text
                  x={p.x}
                  y={p.y - 14}
                  textAnchor={i === 0 ? "start" : i === pts.length - 1 ? "end" : "middle"}
                  className={cn("hidden md:block", p.name === high.name ? "fill-fg font-semibold" : "fill-fg-muted")}
                  fontSize={15}
                >
                  {p.name === high.name ? `${p.name} · ${p.elev.toLocaleString("en-IN")} m` : p.name}
                </text>
              ) : null}
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="sr-only">Stops on the road with distance from Roing and altitude, listed below.</figcaption>
      <ol className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {stops.map((s) => (
          <li key={s.name} className="grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-3 border-b border-line py-3">
            <span className="text-small text-fg-subtle tabular-nums">{s.km} km</span>
            <span>
              <span className="block text-body font-semibold text-fg">{s.name}</span>
              <span className="block text-small text-fg-muted">{s.note}</span>
            </span>
            <span className="text-small font-medium text-fg tabular-nums">{s.elev.toLocaleString("en-IN")} m</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
