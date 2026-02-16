// components/sections/upcoming-tours.tsx
"use client";

import { 
  TourShowcase,
  TourShowcaseHeader,
  TourCard,
  TourGrid 
} from "@/components/tours/tour-showcase";
import { FestivalTourCard } from "@/components/tours/tour-showcase/festival-tour-card";
import { ActivityTourCard } from "@/components/tours/tour-showcase/special-activity-card";
import { upcomingTours } from "@/data/tours";
import { isFestivalTour, isSpecialActivityTour } from "@/types/tours/tour";

export function UpcomingTours() {
  return (
    <TourShowcase>
      <TourShowcaseHeader
        title="Upcoming Adventures"
        subtitle="Explore our handcrafted journeys through the enchanting Northeast. Each tour is thoughtfully designed to provide authentic experiences and unforgettable memories."
      />
      
      <TourGrid>
        {upcomingTours.map((tour, index) => {
          if (isFestivalTour(tour)) {
            return (
              <FestivalTourCard
                key={tour.id}
                tour={tour}
                index={index}
              />
            );
          }
          
          if (isSpecialActivityTour(tour)) {
            return (
              <ActivityTourCard
                key={tour.id}
                tour={tour}
                index={index}
              />
            );
          }

          return (
            <TourCard
              key={tour.id}
              tour={tour}
              index={index}
            />
          );
        })}
      </TourGrid>
    </TourShowcase>
  );
}