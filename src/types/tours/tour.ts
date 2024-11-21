// types/tour.ts

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
  
  export interface Tour {
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
    
    // Images
    heroImage: string;
    thumbnail: string;
    gallery: string[];
    
    // Details
    highlights: string[];
    itinerary: TourDay[];
    route: TourRoute;
    
    // Booking Info
    inclusions: string[];
    exclusions: string[];
    importantNote: string;
    thingsToCarry: string[];
    
    // Additional Info
    maxGroupSize: number;
    difficulty: 'Easy' | 'Moderate' | 'Challenging';
    altitude?: number;
    bestTimeToVisit: string[];
  }