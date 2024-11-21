// components/tours/tour-map.tsx
"use client";

import React from 'react';
import { MapPin } from 'lucide-react';

interface TourMapProps {
  route: {
    points: [number, number][];
    stops: {
      name: string;
      location: [number, number];
      description: string;
    }[];
  };
}

export default function TourMap({ route }: TourMapProps) {
  return (
    <div className="h-full w-full relative rounded-[2.5rem] overflow-hidden bg-neutral-900/50 backdrop-blur-sm border border-white/10">
      <div className="absolute inset-0 bg-dot-white/[0.1]" />
      
      {/* Placeholder Content */}
      <div className="relative h-full w-full flex flex-col items-center justify-center gap-4 p-8">
        <MapPin className="w-12 h-12 text-primary-500" />
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2">Route Information</h3>
          <div className="space-y-2">
            {route.stops.map((stop, index) => (
              <div 
                key={stop.name}
                className="flex items-center gap-2 text-neutral-300"
              >
                <span className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <span>{stop.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

