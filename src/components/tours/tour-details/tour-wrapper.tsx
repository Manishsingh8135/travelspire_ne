// components/tours/tour-detail/tour-wrapper.tsx
"use client";

import type { Tour } from "@/types/tours/tour";
import { TourDetail } from "./tour-detail";

interface TourWrapperProps {
  tour: Tour;
  className?: string;
}

export function TourWrapper({ tour, className }: TourWrapperProps) {
  return <TourDetail tour={tour} className={className} />;
}
