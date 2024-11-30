// Base interface for all product types
export interface BaseProduct {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  overview?: string;  
  description?: string;
  price: number;
  location: string;
  startDate: string;
  duration: string;
  featured?: boolean;  
  
  // Images
  heroImage: string;
  thumbnail?: string;  
  gallery: string[];
  
  // Common fields
  highlights?: string[];  
  inclusions: string[];
  exclusions?: string[];
  importantNote?: string;  
  thingsToCarry?: string[];  
  maxGroupSize: number;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging';
  
  // Contact
  contactInfo: {
    phone: string;
    email: string;
    address?: string;
  };
}

// Common types used across different products
export type ProductCategory = 'Tour' | 'Festival' | 'Bike' | 'Circuit' | 'OFAM';

// Make TourProduct compatible with existing Tour type
export interface TourProduct extends BaseProduct {
  type: 'Adventure' | 'Cultural' | 'Nature' | 'Pilgrimage';  
  itinerary: {
    title: string;
    description: string;
    activities: string[];
  }[];
  route: {
    points: [number, number][];
    stops: {
      name: string;
      location: [number, number];
      description: string;
    }[];
  };
}

export interface BikeProduct extends BaseProduct {
  type: 'Bike';
  bikeType?: string;
  rideCaptain: string;
  route: {
    startPoint: string;
    endPoint: string;
    keyStops: string[];
    totalDistance: number;
  };
  requirements: {
    license: boolean;
    experience: string;
    gear: string[];
  };
}

export interface FestivalProduct extends BaseProduct {
  type: 'Festival';
  festivalName: string;
  culturalHighlights: string[];
  schedule: {
    time: string;
    event: string;
    description: string;
  }[];
  traditionalActivities: string[];
}

export interface OFAMProduct extends BaseProduct {
  type: 'OFAM';
  destinations: string[];
  accommodation: {
    type: 'Homestay' | 'Camping' | 'Hotel' | 'Mixed';
    details: string[];
  };
  activities: string[];
  permits?: string[];
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    specialDiets?: string[];
  };
}

export interface CircuitProduct extends BaseProduct {
  type: 'Circuit';
  destinations: {
    name: string;
    description: string;
    stayDuration: number;
  }[];
  transportation: {
    type: string;
    details: string;
  };
  accommodation: {
    type: string;
    details: string;
  }[];
  highlights: string[];
}

// Type for any product
export type Product = 
  | TourProduct 
  | BikeProduct 
  | FestivalProduct 
  | OFAMProduct 
  | CircuitProduct;

// For backward compatibility
export type Tour = TourProduct;
