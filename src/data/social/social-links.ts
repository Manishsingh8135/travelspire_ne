// data/social/social-links.ts
import { ContactInfo, SocialLink } from "@/types/social/social-links";

export const contactInfo: ContactInfo = {
  whatsapp: "https://wa.me/message/LG2T3K7ZSLWKA1",
  email: "info@travelspirene.com",
  phone: "+91 98641 41211",
  instagram: "https://instagram.com/travelspire_ne",
  facebook: "", // Add actual URL when available
  twitter: ""    // Add actual URL when available
};

export const socialLinks: SocialLink[] = [
  {
    platform: 'whatsapp',
    url: contactInfo.whatsapp,
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
