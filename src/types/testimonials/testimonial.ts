// types/testimonial/testimonial.ts

export type TestimonialRating = 1 | 2 | 3 | 4 | 5;

export type TripType = 
  | 'Adventure Trek' 
  | 'Cultural Tour' 
  | 'Wildlife Safari' 
  | 'Photography Tour'
  | 'Family Trip'
  | 'Solo Travel'
  | 'Group Tour';

export type Destination = 
  | 'Arunachal Pradesh'
  | 'Assam'
  | 'Meghalaya'
  | 'Nagaland'
  | 'Manipur'
  | 'Mizoram'
  | 'Tripura'
  | 'Sikkim';

export type Season = 'Spring' | 'Summer' | 'Monsoon' | 'Autumn' | 'Winter';

export interface TravelDetails {
  tourName: string;
  destination: Destination;
  tripType: TripType;
  duration: string;
  travelDate: string;
  season: Season;
}

export interface TestimonialAuthor {
  name: string;
  age?: number;
  location: string;
  avatar?: string;
  verified?: boolean;
  travelStyle?: ('Adventure Seeker' | 'Culture Explorer' | 'Nature Lover' | 'Photography Enthusiast')[];
  previousTrips?: number;
}

export interface TestimonialMedia {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption?: string;
  location?: string;
  tags?: string[];
}

export interface TripHighlight {
  title: string;
  description: string;
  rating: TestimonialRating;
}

export interface Testimonial {
  id: string;
  content: string;
  author: TestimonialAuthor;
  travelDetails: TravelDetails;
  rating: {
    overall: TestimonialRating;
    categories?: {
      accommodation?: TestimonialRating;
      guide?: TestimonialRating;
      transportation?: TestimonialRating;
      valueForMoney?: TestimonialRating;
      foodAndCuisine?: TestimonialRating;
    };
  };
  highlights?: TripHighlight[];
  media?: TestimonialMedia[];
  featured?: boolean;
  recommendationScore?: number; // 0-10
  tips?: string[];
  activities?: string[];
  datePosted: string;
  languages?: string[];
  response?: {
    content: string;
    author: string;
    date: string;
  };
}

export interface TestimonialSection {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  testimonials: Testimonial[];
  layout: 'grid' | 'carousel' | 'masonry' | 'featured' | 'stories';
  style: 'minimal' | 'cards' | 'floating' | 'gradient' | 'immersive';
  theme: 'light' | 'dark' | 'neon' | 'glass';
  filters?: {
    destinations?: Destination[];
    tripTypes?: TripType[];
    ratings?: TestimonialRating[];
    seasons?: Season[];
  };
  viewOptions?: {
    showRatings?: boolean;
    showAuthorDetails?: boolean;
    showTravelDetails?: boolean;
    showMedia?: boolean;
    showTips?: boolean;
  };
}