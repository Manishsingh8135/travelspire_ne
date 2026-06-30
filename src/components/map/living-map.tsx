"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import "mapbox-gl/dist/mapbox-gl.css";
import type { MapPlace } from "@/server/atlas";

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c,
  );
}

export function LivingMap({ places, token }: { places: MapPlace[]; token?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!token || !container) return;

    let map: import("mapbox-gl").Map | undefined;
    let cancelled = false;

    void (async () => {
      const mapboxgl = (await import("mapbox-gl")).default;
      if (cancelled || !container) return;

      mapboxgl.accessToken = token;
      map = new mapboxgl.Map({
        container,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [93.6, 27.9],
        zoom: 5.8,
        attributionControl: true,
      });
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

      const bounds = new mapboxgl.LngLatBounds();
      for (const place of places) {
        const el = document.createElement("div");
        el.className = "ts-marker";
        const meta = place.elevation_m
          ? `${escapeHtml(place.kind)} · ${place.elevation_m.toLocaleString()} m`
          : escapeHtml(place.kind);
        const popup = new mapboxgl.Popup({ offset: 14, closeButton: false }).setHTML(
          `<a class="ts-popup" href="/${place.regionSlug}/${place.slug}">` +
            `<div class="ts-popup-kind">${meta}</div>` +
            `<div class="ts-popup-name">${escapeHtml(place.name)}</div>` +
            `</a>`,
        );
        new mapboxgl.Marker(el).setLngLat([place.lng, place.lat]).setPopup(popup).addTo(map);
        bounds.extend([place.lng, place.lat]);
      }
      if (places.length) {
        map.fitBounds(bounds, { padding: 96, maxZoom: 8.5, duration: 0 });
      }
      map.on("load", () => setReady(true));
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [places, token]);

  if (!token) return <NoTokenFallback places={places} />;

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      {!ready ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-background">
          <span className="font-mono text-xs text-muted-foreground">Loading map…</span>
        </div>
      ) : null}
    </div>
  );
}

function NoTokenFallback({ places }: { places: MapPlace[] }) {
  return (
    <div className="grid h-full place-items-center bg-background p-6">
      <div className="w-full max-w-md text-center">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Living Map
        </p>
        <h2 className="mt-3 font-display text-2xl font-medium">
          Add a Mapbox token to light up the map
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Set <code className="font-mono">NEXT_PUBLIC_MAPBOX_TOKEN</code> in{" "}
          <code className="font-mono">.env.local</code> (free at mapbox.com). Until then, the
          mapped places:
        </p>
        <ul className="mt-5 flex flex-col gap-2 text-left">
          {places.map((place) => (
            <li key={`${place.regionSlug}/${place.slug}`}>
              <Link
                href={`/${place.regionSlug}/${place.slug}` as Route}
                className="flex items-center justify-between rounded-md border border-border-subtle bg-card px-4 py-2.5 text-sm transition-colors hover:bg-muted"
              >
                <span className="font-medium">{place.name}</span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {place.lat.toFixed(2)}, {place.lng.toFixed(2)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
