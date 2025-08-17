// types/social/social-links.ts

export type SocialPlatform = 'whatsapp' | 'instagram' | 'facebook' | 'twitter' | 'email';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
  icon?: string;
}

export interface ContactInfo {
  whatsapp: string;
  whatsappChat: string;
  email: string;
  phone: string;
  instagram: string;
  facebook?: string;
  twitter?: string;
}
