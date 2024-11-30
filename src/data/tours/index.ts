// data/tours/index.ts
import { Tour } from "@/types/tours/tour";
import { regularTours } from "./tour-data";
import { hornbillFestival } from "./festival-data";
import { dambukOrangeFestival, dambukBikeTour } from "./special-activity-data";

// Special tours categorization
export const specialTours = {
  festivals: [hornbillFestival],
  // Temporarily hidden:
  // activities: [dambukOrangeFestival, dambukBikeTour]
  activities: []
};

// Export specific tour arrays
export const festivalTours = specialTours.festivals;
export const activityTours = specialTours.activities;
export const adventureTours = regularTours;

// Combine all tours for upcoming section
export const upcomingTours: Tour[] = [
  ...regularTours,
  ...festivalTours,
  ...activityTours
];