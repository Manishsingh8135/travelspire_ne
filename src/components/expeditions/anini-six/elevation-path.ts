// Shared geometry for the day-one elevation profile. The hero draws it as a
// hairline signature; the profile section draws it full size with nodes.

export interface ElevationPoint {
  readonly km: number;
  readonly elev: number;
}

export interface PlottedPoint {
  x: number;
  y: number;
}

interface PlotOptions {
  width: number;
  height: number;
  /** Head-room above the highest point, in user units. */
  padTop?: number;
  /** Baseline offset below the lowest point, in user units. */
  padBottom?: number;
}

export function plotPoints(
  nodes: readonly ElevationPoint[],
  { width, height, padTop = 0, padBottom = 0 }: PlotOptions,
): PlottedPoint[] {
  const maxKm = Math.max(...nodes.map((n) => n.km));
  const maxElev = Math.max(...nodes.map((n) => n.elev));
  const usable = height - padTop - padBottom;

  return nodes.map((n) => ({
    x: (n.km / maxKm) * width,
    y: padTop + usable * (1 - n.elev / maxElev),
  }));
}

/**
 * Catmull-Rom through the points, converted to cubic beziers. Tension is kept
 * low so the pass reads as a peak rather than a rounded hill.
 */
export function smoothPath(points: PlottedPoint[], tension = 0.28): string {
  if (points.length < 2) return "";

  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const c1x = p1.x + ((p2.x - p0.x) / 6) * (tension * 6) * 0.5;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * (tension * 6) * 0.5;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * (tension * 6) * 0.5;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * (tension * 6) * 0.5;

    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }

  return d;
}

export function areaPath(points: PlottedPoint[], height: number, tension?: number): string {
  const line = smoothPath(points, tension);
  if (!line) return "";
  const last = points[points.length - 1];
  const first = points[0];
  return `${line} L ${last.x.toFixed(2)} ${height} L ${first.x.toFixed(2)} ${height} Z`;
}
