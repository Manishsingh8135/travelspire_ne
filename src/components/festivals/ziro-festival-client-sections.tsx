// components/festivals/ziro-festival-client-sections.tsx
"use client";

import { motion } from "framer-motion";
import { FestivalPackages } from "./packages";
import { ziroFestival2025 } from "@/data/tours/festival-data";
import { TourGallery } from "@/components/tours/tour-details/tour-gallery";
import { ContactMethods } from "@/components/contact/contact-methods";
import { FestivalAccommodation } from "./accommodation/festival-accommodation";
import { ziroFestivalFAQData } from "@/data/faqs/ziro-festival-faq-data";

// Artist lineup data
const lineup2025 = [
  { 
    name: "Shilpa Rao", 
    origin: "Mumbai", 
    type: "Bollywood/Mainstream",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
    genre: "Bollywood, Playback"
  },
  { 
    name: "Anna Erhard", 
    origin: "Switzerland", 
    type: "International",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    genre: "Folk, Indie"
  },
  { 
    name: "Soumik Datta", 
    origin: "UK", 
    type: "International",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    genre: "World Music, Sarod"
  },
  { 
    name: "Susheela Raman", 
    origin: "UK", 
    type: "International",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    genre: "World Music, Tamil"
  },
  { 
    name: "Buried Treasures", 
    origin: "France/Delhi", 
    type: "International",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    genre: "Electronic, Indie"
  },
  { 
    name: "Guitar Prasanna", 
    origin: "USA", 
    type: "International",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    genre: "Jazz Fusion, Guitar"
  },
  { 
    name: "Swarathma", 
    origin: "Bengaluru", 
    type: "Indian Indie",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    genre: "Folk Rock, Indie"
  },
  { 
    name: "Parvaaz", 
    origin: "Bengaluru", 
    type: "Indian Indie",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    genre: "Progressive Rock"
  },
  { 
    name: "Chorun Mugli", 
    origin: "Arunachal Pradesh", 
    type: "Northeast",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face",
    genre: "Traditional, Folk"
  },
  { 
    name: "Da Minot", 
    origin: "Meghalaya", 
    type: "Northeast",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
    genre: "Blues, Rock"
  },
  { 
    name: "Pink Eye", 
    origin: "Nagaland", 
    type: "Northeast",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
    genre: "Punk, Alternative"
  },
  { 
    name: "Remi Remi", 
    origin: "Arunachal Pradesh", 
    type: "Northeast",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&h=400&fit=crop&crop=face",
    genre: "Folk, Traditional"
  }
];

// Real accommodation data from Ziro Festival 2025
const accommodationOptions = [
  {
    name: "Dome Tent (Standard)",
    price: "₹1,999",
    duration: "1 Night",
    features: ["Standard dome tent accommodation", "1 breakfast included", "Campsite amenities access", "Shared facilities"],
    type: "Standard Camping",
    gradient: "from-amber-500/20 to-yellow-500/20",
    icon: "🏕️"
  },
  {
    name: "Dome Tent with Platform",
    price: "₹2,499",
    duration: "1 Night",
    features: ["Premium dome tent with platform", "1 breakfast included", "Elevated comfort", "Enhanced privacy"],
    type: "Premium Camping",
    gradient: "from-orange-500/20 to-amber-500/20",
    icon: "⛺"
  },
  {
    name: "2N Alpine Tent",
    price: "₹5,999",
    duration: "2 Nights",
    features: ["Spacious alpine tent", "2 breakfasts included", "Premium camping experience", "Enhanced comfort"],
    type: "Luxury Camping",
    gradient: "from-red-500/20 to-orange-500/20",
    icon: "🏔️"
  },
  {
    name: "3N Alpine Tent",
    price: "₹8,999",
    duration: "3 Nights",
    features: ["Extended alpine tent stay", "3 breakfasts included", "Full festival access", "Premium amenities"],
    type: "Extended Stay",
    gradient: "from-orange-600/20 to-red-500/20",
    icon: "⛰️"
  },
  {
    name: "All Inclusive - Dome",
    price: "₹15,699",
    duration: "4 Nights",
    features: ["Round-trip train tickets", "Pickup/drop transport", "4 nights dome tent", "Safari & village tour", "Inner Line Permit"],
    type: "Complete Package",
    gradient: "from-amber-600/20 to-orange-600/20",
    icon: "🎪",
    featured: true
  },
  {
    name: "All Inclusive - Alpine",
    price: "₹17,699",
    duration: "4 Nights",
    features: ["Round-trip train tickets", "Pickup/drop transport", "4 nights alpine tent", "Safari & village tour", "Inner Line Permit"],
    type: "Premium Package",
    gradient: "from-orange-500/20 to-red-500/20",
    icon: "🎯",
    featured: true
  }
];

export function ZiroFestivalClientSections() {
  return (
    <>
      {/* Accommodation Options */}
      <FestivalAccommodation 
        accommodationOptions={accommodationOptions}
        isLoading={false}
      />

      {/* Festival Packages */}
      <FestivalPackages />

      {/* Gallery */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ziro Valley <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Gallery</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the breathtaking beauty of UNESCO Tentative World Heritage Site
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TourGallery images={ziroFestival2025.gallery} />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactMethods />
    </>
  );
}
