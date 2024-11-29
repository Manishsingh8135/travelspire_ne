// types/team/team.ts

export type Role = 
  | 'Founder'
  | 'Co-Founder' 
  | 'Lead Explorer'
  | 'Senior Guide'
  | 'Cultural Expert'
  | 'Travel Coordinator'
  | 'Photography Guide'
  | 'Local Expert';

export type Expertise = 
  | 'Adventure Treks'
  | 'Cultural Tours'
  | 'Photography Tours'
  | 'Local Cuisine'
  | 'Wildlife Tours'
  | 'Traditional Arts'
  | 'Local History'
  | 'High-Altitude Treks';

export type Region = 
  | 'Arunachal Pradesh'
  | 'Assam'
  | 'Meghalaya'
  | 'Nagaland'
  | 'Manipur'
  | 'Mizoram'
  | 'Tripura'
  | 'Sikkim';

export type Language = 
  | 'English'
  | 'Hindi'
  | 'Assamese'
  | 'Bengali'
  | 'Bodo'
  | 'Monpa'
  | 'Khasi'
  | 'Garo'
  | 'Mizo'
  | 'Manipuri';

export interface SocialMedia {
  platform: 'instagram' | 'facebook' | 'linkedin' | 'twitter';
  handle: string;
  url: string;
}

export interface Achievement {
  title: string;
  year: number;
  description?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  roles: Role[];
  image: string;
  location: {
    city: string;
    state: Region;
  };
  expertise: Expertise[];
  bio: string;
  languages: Language[];
  yearsOfExperience: number;
  certifications?: string[];
  achievements?: Achievement[];
  social?: SocialMedia[];
  featured?: boolean;
}

export interface TeamSection {
  title: string;
  subtitle?: string;
  description?: string;
  members: TeamMember[];
  layout: 'grid' | 'list' | 'featured';
  filters?: {
    regions?: Region[];
    expertise?: Expertise[];
    roles?: Role[];
  };
}