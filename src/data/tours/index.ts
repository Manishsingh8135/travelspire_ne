// data/tours/index.ts
import { Tour, isFestivalTour } from "@/types/tours/tour";
import { indiaToday, isPastDate } from "@/lib/dates";
import { regularTours } from "./tour-data";
import { hornbillFestival, orangeFestival, ziroFestival2026 } from "./festival-data";
// import { dambukOrangeFestival, dambukBikeTour } from "./special-activity-data";

// Special tours categorization
export const specialTours = {
  festivals: [hornbillFestival, orangeFestival, ziroFestival2026],
  // Temporarily hidden:
  // activities: [dambukOrangeFestival, dambukBikeTour]
  activities: []
};

// Export specific tour arrays
export const festivalTours = specialTours.festivals;
export const activityTours = specialTours.activities;
export const adventureTours = regularTours;

// Every tour we have ever published. Tour pages and the sitemap use this, so a
// finished festival keeps its URL (and its search history) after it ends.
export const allTours: Tour[] = [
  ...regularTours,
  ...festivalTours,
  ...activityTours
];

/** A festival tour is over once its edition's last day has passed. */
export function isTourOver(tour: Tour, today: string = indiaToday()): boolean {
  return isFestivalTour(tour) && isPastDate(tour.eventDates.end, today);
}

/**
 * The tours we are selling today: everything except festival editions that
 * have already ended. Call it at render time — never cache the result in a
 * module constant, or finished festivals come back.
 */
export function getActiveTours(today: string = indiaToday()): Tour[] {
  return allTours.filter((tour) => !isTourOver(tour, today));
}
