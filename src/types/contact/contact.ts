// types/contact/contact.ts
export interface ContactMethod {
    icon: string;
    title: string;
    description: string;
    action: {
      text: string;
      href: string;
    };
  }
  
  export interface SocialLink {
    name: string;
    href: string;
    icon: string;
  }
  
  export interface OfficeLocation {
    title: string;
    address: string;
    phone: string;
    email: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }