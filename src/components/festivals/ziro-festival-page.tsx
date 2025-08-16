// components/festivals/ziro-festival-page.tsx
"use client";

import { motion } from "framer-motion";
import { Calendar, Music, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FestivalFeatures } from "./features";
import { FestivalPackages } from "./packages";
import { ziroFestival2025 } from "@/data/tours/festival-data";
import { TourBookingCard } from "@/components/tours/tour-details/tour-booking-card";
import { TourGallery } from "@/components/tours/tour-details/tour-gallery";
import { ContactMethods } from "@/components/contact/contact-methods";
import { FestivalAccommodation } from "./accommodation/festival-accommodation";
import { FestivalLineup } from "./lineup/festival-lineup";
import { FestivalFAQ } from "./faqs/festival-faq";
import { ziroFestivalFAQData } from "@/data/faqs/ziro-festival-faq-data";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

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

export function ZiroFestivalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden rounded-b-[4rem] shadow-2xl shadow-black/30 pt-20 pb-8">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-b-[4rem] overflow-hidden">
            <img 
              src={ziroFestival2025.heroImage}
              alt="Ziro Festival 2025"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 rounded-b-[4rem]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/30 via-transparent to-orange-900/30 rounded-b-[4rem]" />
        </motion.div>


        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center max-w-7xl mx-auto px-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Premium Festival Badge */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="relative inline-block">
              {/* Glowing background */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-amber-400/30 via-orange-500/30 to-red-500/30 rounded-[3rem] blur-xl"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main badge */}
              <Badge className="relative px-8 py-4 text-base font-semibold bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 text-amber-200 border-2 border-amber-400/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="mr-3"
                >
                  <Music className="w-5 h-5 text-amber-400" />
                </motion.div>
                <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-red-200 bg-clip-text text-transparent font-bold">
                  LIVE NOW
                </span>
                <span className="mx-2 text-amber-300">•</span>
                <span className="text-amber-100">Sep 25-28, 2025</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="ml-3 w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                />
              </Badge>
            </div>
            
            {/* Secondary eco badge */}
            <motion.div
              variants={fadeInUp}
              className="mt-4"
            >
              <Badge className="px-6 py-3 text-sm font-medium bg-primary-500/15 text-primary-300 border-primary-400/25 backdrop-blur-md rounded-[2rem]">
                <span className="mr-2">🌿</span>
                India's Greatest Eco-Friendly Festival
              </Badge>
            </motion.div>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
          >
            <span className="block bg-gradient-to-r from-amber-200 via-orange-200 to-red-200 bg-clip-text text-transparent drop-shadow-2xl">
              ZIRO
            </span>
            <span className="block text-white drop-shadow-2xl">
              FESTIVAL
            </span>
            <span className="block text-3xl md:text-5xl lg:text-6xl text-amber-300 drop-shadow-xl mt-2">
              2025
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience India's premier outdoor music festival in the UNESCO Tentative World Heritage Site of Ziro Valley
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative group"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-[2rem] blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"
              />
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white px-12 py-6 text-lg font-semibold rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-400/30"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Book Your Experience
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative group"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-white/20 to-amber-400/20 rounded-[2rem] blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"
              />
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-12 py-6 text-lg font-semibold rounded-[2rem] backdrop-blur-md transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Music className="w-5 h-5 mr-3" />
                View Lineup
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="mt-16 flex flex-wrap justify-center gap-8 text-center"
          >
            <div className="text-white">
              <div className="text-3xl font-bold text-amber-300">Sep 25-28</div>
              <div className="text-sm text-gray-300">2025</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold text-orange-300">33+</div>
              <div className="text-sm text-gray-300">Artists</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold text-amber-300">4</div>
              <div className="text-sm text-gray-300">Days</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Festival Features Section */}
      <FestivalFeatures />

      {/* Artist Lineup */}
      <FestivalLineup 
        artists={lineup2025}
        isLoading={false}
        year="2025"
        totalArtists="33+"
      />

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

      {/* FAQ Section */}
      <FestivalFAQ section={ziroFestivalFAQData} />

      {/* Contact Section */}
      <ContactMethods />
    </div>
  );
}
