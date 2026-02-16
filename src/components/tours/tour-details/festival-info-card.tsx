// components/tours/tour-detail/festival-info-card.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check, X, AlertCircle } from "lucide-react";
import { FestivalTour } from "@/types/tours/tour";

interface FestivalInfoCardProps {
  tour: FestivalTour;
}

export function FestivalInfoCard({ tour }: FestivalInfoCardProps) {
  return (
    <div className={cn(
      "rounded-[2.5rem] overflow-hidden",
      "bg-gradient-to-tr from-primary-50 via-white to-secondary-50/30",
      "dark:from-accent-900/90 dark:via-accent-900/90 dark:to-accent-900/90",
      "border border-primary-100/20 dark:border-white/10",
      "shadow-glow dark:shadow-none",
      "backdrop-blur-xl",
      "p-6"
    )}>
      <div className="space-y-8">
        {/* Base Inclusions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            Inclusions
          </h3>
          <div className="space-y-2">
            {tour.baseInclusions.map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-muted-foreground">
                <div className="mt-1 w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary-500" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Base Exclusions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            Exclusions
          </h3>
          <div className="space-y-2">
            {tour.baseExclusions.map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-muted-foreground">
                <div className="mt-1 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <X className="w-3 h-3 text-red-500" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Things to Carry */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            Things to Carry
          </h3>
          <div className="space-y-2">
            {tour.thingsToCarry.map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-muted-foreground">
                <div className="mt-1 w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary-500" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Important Note */}
        <div className={cn(
          "p-4 rounded-xl",
          "bg-gradient-to-br from-yellow-500/10 to-yellow-500/5",
          "border border-yellow-500/20",
          "backdrop-blur-sm"
        )}>
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-yellow-500">Important Note</h4>
              <p className="text-sm text-muted-foreground">
                {tour.importantNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}