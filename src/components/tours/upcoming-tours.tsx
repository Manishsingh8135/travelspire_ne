// components/sections/upcoming-tours.tsx
"use client";

import { 
  TourShowcase,
  TourShowcaseHeader,
  TourCard,
  TourGrid 
} from "@/components/tours/tour-showcase";
import { upcomingTours } from "@/data/tours/tour-data"; // Updated import path

export function UpcomingTours() {
  return (
    <TourShowcase>
      <TourShowcaseHeader
        title="Upcoming Adventures"
        subtitle="Explore our handcrafted journeys through the enchanting Northeast. Each tour is thoughtfully designed to provide authentic experiences and unforgettable memories."
      />
      
      <TourGrid>
        {upcomingTours.map((tour, index) => (
          <TourCard
            key={tour.id}
            tour={tour}
            index={index}
          />
        ))}
      </TourGrid>
    </TourShowcase>
  );
}