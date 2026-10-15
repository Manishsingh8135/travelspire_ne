// components/tours/tour-detail/tour-wrapper.tsx
"use client";

import type { Tour } from "@/types/tours/tour";
import { TourDetail } from "./tour-detail";

interface TourWrapperProps {
  tour: Tour;
  /** The festival edition behind this tour has ended. */
  isOver: boolean;
  /** Tours on sale today, for the related-tours rail. */
  relatedPool: Tour[];
  className?: string;
}

export function TourWrapper({
  tour,
  isOver,
  relatedPool,
  className,
}: TourWrapperProps) {
  return (
    <TourDetail
      tour={tour}
      isOver={isOver}
      relatedPool={relatedPool}
      className={className}
    />
  );
}
