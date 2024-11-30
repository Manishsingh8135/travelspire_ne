// components/tours/tour-detail/tour-wrapper.tsx
"use client";

import { Tour, isFestivalTour, isSpecialActivityTour } from "@/types/tours/tour";
import { TourDetail } from "./tour-detail";
import { FestivalTourDetail } from "./festival-tour-details";
import { SpecialActivityDetail } from "./special-activity-detail";

interface TourWrapperProps {
  tour: Tour;
  className?: string;
}

export function TourWrapper({ tour, className }: TourWrapperProps) {
  if (isFestivalTour(tour)) {
    return <FestivalTourDetail tour={tour} className={className} />;
  }

  if (isSpecialActivityTour(tour)) {
    return <SpecialActivityDetail tour={tour} className={className} />;
  }

  return <TourDetail tour={tour} className={className} />;
}