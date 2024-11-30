// data/contact/contact-data.ts
import { 
    Phone, 
    Mail, 
    MapPin, 
    MessageSquare,
    Instagram,
    Twitter,
    Facebook,
    Linkedin
  } from "lucide-react";
  
  export const contactMethods = [
    {
      icon: Phone,
      title: "Talk to Sales",
      description: "Speak with our travel experts about your next adventure.",
      action: {
        text: "Call now",
        href: "tel:+919864141211"
      }
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us your queries and we'll get back to you.",
      action: {
        text: "Send email",
        href: "mailto:info@travelspirene.com"
      }
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come visit our office in Dibrugarh.",
      action: {
        text: "Get directions",
        href: "https://maps.google.com/?q=Dibrugarh,Assam"
      }
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our team in real-time.",
      action: {
        text: "Start chat",
        href: "#"
      }
    }
  ];
  
  export const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/travelspire_northeast",
      icon: Instagram
    },
    {
      name: "Twitter",
      href: "https://twitter.com/travelspirene",
      icon: Twitter
    },
    {
      name: "Facebook",
      href: "https://facebook.com/travelspirene",
      icon: Facebook
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/travelspire-northeast",
      icon: Linkedin
    }
  ];
  
  export const officeLocation = {
    title: "Dibrugarh Office",
    address: "HSR Layout, Dibrugarh, Assam, India",
    phone: "+91 98641 41211",
    email: "info@travelspirene.com",
    coordinates: {
      lat: 27.4728,
      lng: 95.0170
    }
  };