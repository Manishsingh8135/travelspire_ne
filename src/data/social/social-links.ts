// data/social/social-links.ts
import { ContactInfo, SocialLink } from "@/types/social/social-links";

export const contactInfo: ContactInfo = {
  whatsapp: "https://wa.me/c/919864141211", // For catalogue/business catalog
  whatsappChat: "https://wa.me/919864141211", // For direct chat/messaging
  email: "info@travelspirene.com",
  phone: "+91-9864141211",
  instagram: "https://instagram.com/travelspire_ne",
  facebook: "", // Add actual URL when available
  twitter: ""    // Add actual URL when available
};

export const socialLinks: SocialLink[] = [
  {
    platform: 'whatsapp',
    url: contactInfo.whatsappChat, // Using chat link for direct messaging
    label: 'Chat on WhatsApp',
  },
  {
    platform: 'instagram',
    url: contactInfo.instagram,
    label: 'Follow us on Instagram',
  },
  {
    platform: 'email',
    url: `mailto:${contactInfo.email}`,
    label: 'Email us',
  }
];
