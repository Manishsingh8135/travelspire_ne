"use client";

import { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { awfMilestones, awfRoutePath } from "@/data/festivals/anini-winter-fest";

function FitRoute() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(awfRoutePath, { padding: [36, 36] });
  }, [map]);
  return null;
}

export default function AwfRouteMapInner() {
  return (
    <MapContainer
      center={[28.2, 95.5]}
      zoom={8}
      scrollWheelZoom={false}
      className="h-full w-full bg-[#07100d]"
      style={{ minHeight: "inherit" }}
      attributionControl
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />
      <FitRoute />
      <Polyline
        positions={awfRoutePath}
        pathOptions={{ color: "#d8c59d", weight: 2, opacity: 0.85, dashArray: "2 7", lineCap: "round" }}
      />
      {awfMilestones.map((m) => (
        <CircleMarker
          key={m.name}
          center={m.coords}
          radius={m.name === "Anini" || m.name === "Dibrugarh" ? 7 : 5}
          pathOptions={{
            color: "#e8dcc0",
            weight: 1.5,
            fillColor: "#d8c59d",
            fillOpacity: 0.9,
          }}
        >
          <Popup>
            <div className="awf-popup">
              <strong>{m.name}</strong>
              <span>
                {m.km === 0 ? "Start" : `km ${m.km}`} · {m.alt.toLocaleString("en-IN")} m
              </span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${m.coords[0]},${m.coords[1]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </a>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
