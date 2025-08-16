"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FestivalAccommodation } from "./accommodation/festival-accommodation";
import { FestivalLineup } from "./lineup/festival-lineup";

// Test component to toggle loading states
export function TestLoadingStates() {
  const [accommodationLoading, setAccommodationLoading] = useState(false);
  const [lineupLoading, setLineupLoading] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Loading States Test</h1>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => setAccommodationLoading(!accommodationLoading)}
              variant={accommodationLoading ? "destructive" : "default"}
            >
              {accommodationLoading ? "Stop" : "Test"} Accommodation Loading
            </Button>
            <Button 
              onClick={() => setLineupLoading(!lineupLoading)}
              variant={lineupLoading ? "destructive" : "default"}
            >
              {lineupLoading ? "Stop" : "Test"} Lineup Loading
            </Button>
          </div>
        </div>

        {/* Test Accommodation Loading */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Accommodation Component</h2>
          <FestivalAccommodation 
            accommodationOptions={[]}
            isLoading={accommodationLoading}
          />
        </div>

        {/* Test Lineup Loading */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Lineup Component</h2>
          <FestivalLineup 
            artists={[]}
            isLoading={lineupLoading}
            year="2025"
            totalArtists="33+"
          />
        </div>
      </div>
    </div>
  );
}
