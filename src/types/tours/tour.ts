// types/tours/tour.ts

// Base interfaces
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

// Tour status and category types
export type TourCategory = 'Adventure' | 'Cultural' | 'Nature' | 'Pilgrimage' | 'Festival' | 'BikeTrip' | 'FruitFestival' | 'CampingTrip';
export type TourStatus = 'upcoming' | 'trending' | 'featured' | 'regular';
export type TourDifficulty = 'Easy' | 'Moderate' | 'Challenging';

// Filter types for unified tour page
export interface TourFilters {
  category?: TourCategory | 'all';
  status?: TourStatus | 'all';
  priceRange?: {
    min: number;
    max: number;
  };
  duration?: {
    min: number;
    max: number;
  };
  difficulty?: TourDifficulty | 'all';
  searchQuery?: string;
}

// Base tour properties shared across all tour types
interface BaseTourProperties {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  location: string;
  heroImage: string;
  thumbnail: string;
  gallery: string[];
  highlights: string[];
  difficulty: TourDifficulty;
  
  // Status flags for filtering and display
  featured?: boolean;
  upcoming?: boolean;
  trending?: boolean;
  
  // Additional metadata
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Regular Tour Type (enhanced with new properties)
export interface RegularTour extends BaseTourProperties {
  type: 'Adventure' | 'Cultural' | 'Nature' | 'Pilgrimage';
  duration: string;
  startDate: string;
  price: number;
  
  itinerary: TourDay[];
  route: TourRoute;
  
  inclusions: string[];
  exclusions: string[];
  importantNote: string;
  thingsToCarry: string[];
  
  maxGroupSize: number;
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

// Base for Event-based tours (enhanced)
interface EventBasedTourBase extends BaseTourProperties {
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

// Helper functions for tour filtering and categorization
export function getTourCategory(tour: Tour): TourCategory {
  if (isRegularTour(tour)) {
    return tour.type;
  }
  if (isFestivalTour(tour)) {
    return 'Festival';
  }
  return tour.type;
}

export function getTourStatus(tour: Tour): TourStatus[] {
  const statuses: TourStatus[] = [];
  
  if (tour.featured) statuses.push('featured');
  if (tour.upcoming) statuses.push('upcoming');
  if (tour.trending) statuses.push('trending');
  
  if (statuses.length === 0) statuses.push('regular');
  
  return statuses;
}

export function getTourPrice(tour: Tour): { min: number; max: number } {
  if (isRegularTour(tour)) {
    return { min: tour.price, max: tour.price };
  }
  
  const prices = tour.variants.map(v => v.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

export function getTourDuration(tour: Tour): { min: number; max: number } {
  if (isRegularTour(tour)) {
    // Extract days from duration string (e.g., "5 Days / 4 Nights" -> 5)
    const match = tour.duration.match(/(\d+)\s*days?/i);
    const days = match ? parseInt(match[1]) : 1;
    return { min: days, max: days };
  }
  
  const durations = tour.variants.map(v => v.duration.days);
  return {
    min: Math.min(...durations),
    max: Math.max(...durations)
  };
}

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