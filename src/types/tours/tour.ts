// types/tours/index.ts

// Your existing base interfaces remain the same
export interface TourStop {
  name: string;
  location: [number, number];
  description: string;
}

export interface TourRoute {
  points: [number, number][];
  stops: TourStop[];
}

export interface TourDay {
  title: string;
  description: string;
  activities: string[];
}

// Base Tour Type (keep existing)
export interface RegularTour {
  id: string;
  slug: string;
  type: 'Adventure' | 'Cultural' | 'Nature' | 'Pilgrimage';
  title: string;
  subtitle: string;
  overview: string;
  duration: string;
  location: string;
  startDate: string;
  price: number;
  featured?: boolean;
  
  heroImage: string;
  thumbnail: string;
  gallery: string[];
  
  highlights: string[];
  itinerary: TourDay[];
  route: TourRoute;
  
  inclusions: string[];
  exclusions: string[];
  importantNote: string;
  thingsToCarry: string[];
  
  maxGroupSize: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  altitude?: number;
  bestTimeToVisit: string[];
}

// New types for special tours
export interface TourPackageVariant {
  id: string;
  name: string;
  duration: {
    days: number;
    nights: number;
  };
  price: number;
  description?: string;
  inclusions: string[];
  additionalActivities?: string[];
  maxGroupSize?: number;
}

// Base for Event-based tours
interface EventBasedTourBase {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  location: string;
  featured?: boolean;

  heroImage: string;
  thumbnail: string;
  gallery: string[];
  
  highlights: string[];
  baseInclusions: string[];
  baseExclusions: string[];
  thingsToCarry: string[];
  importantNote: string;

  eventDates: {
    start: string;
    end: string;
    year: number;
  };
  
  variants: TourPackageVariant[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
}

// Festival Tour Type
export interface FestivalTour extends EventBasedTourBase {
  type: 'Festival';
  festivalName: string;
  culturalHighlights?: string[];
  specialActivities?: string[];
}

// Special Activity Tour Type (like Bike Tours, Orange Festival)
export interface SpecialActivityTour extends EventBasedTourBase {
  type: 'BikeTrip' | 'FruitFestival' | 'CampingTrip';
  activityType: string;
  specialEquipment?: string[];
  activityHighlights?: string[];
}

// Combined Tour type
export type Tour = RegularTour | FestivalTour | SpecialActivityTour;

// Type guards for checking tour types
export const isRegularTour = (tour: Tour): tour is RegularTour => {
  return ['Adventure', 'Cultural', 'Nature', 'Pilgrimage'].includes(tour.type);
};

export const isFestivalTour = (tour: Tour): tour is FestivalTour => {
  return tour.type === 'Festival';
};

export const isSpecialActivityTour = (tour: Tour): tour is SpecialActivityTour => {
  return ['BikeTrip', 'FruitFestival', 'CampingTrip'].includes(tour.type);
};