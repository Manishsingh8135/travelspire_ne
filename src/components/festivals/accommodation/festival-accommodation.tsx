"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Star, MapPin, Users, Wifi, Car, Coffee, Mountain, MessageCircle } from "lucide-react";
import { createFestivalBookingURL } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FestivalSectionHeader } from "../common/festival-section-header";

// Shimmer loading component
const AccommodationShimmer = () => (
  <div className="relative h-full">
    <Card className="h-full bg-gradient-to-br from-slate-800/80 via-slate-900/60 to-slate-950/80 backdrop-blur-xl shadow-2xl rounded-[2.5rem] overflow-hidden border border-slate-700/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 bg-slate-700/50 rounded-lg animate-pulse" />
          <div className="w-20 h-6 bg-slate-700/50 rounded-full animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="w-32 h-6 bg-slate-700/50 rounded animate-pulse" />
          <div className="w-24 h-4 bg-slate-700/50 rounded animate-pulse" />
        </div>
        <div className="mt-4">
          <div className="w-28 h-8 bg-slate-700/50 rounded animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start">
              <div className="w-5 h-5 bg-slate-700/50 rounded-full mr-3 mt-0.5 animate-pulse" />
              <div className="w-full h-4 bg-slate-700/50 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="pt-4">
          <div className="w-full h-12 bg-slate-700/50 rounded-[1.5rem] animate-pulse" />
        </div>
      </CardContent>
    </Card>
  </div>
);

interface AccommodationOption {
  name: string;
  type: string;
  duration: string;
  price: string;
  features: string[];
  gradient: string;
  icon: string;
  featured?: boolean;
}

interface FestivalAccommodationProps {
  accommodationOptions?: AccommodationOption[];
  isLoading?: boolean;
}

export function FestivalAccommodation({ 
  accommodationOptions = [], 
  isLoading = false 
}: FestivalAccommodationProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-950/50 via-slate-900/30 to-slate-950/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(251,191,36,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.1),transparent_50%),radial-gradient(circle_at_40%_80%,rgba(239,68,68,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative">
        <FestivalSectionHeader
          badge={{
            emoji: "🏕️",
            text: "OFFICIAL FESTIVAL ACCOMMODATION"
          }}
          title="Festival Camping"
          description="Experience the magic of Ziro with our premium camping options, from standard tents to luxury alpine accommodations"
          titleGradient="from-white via-amber-200 to-orange-200"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            // Show shimmer loading cards
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={`shimmer-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05
                }}
                className={`relative ${index === 1 ? 'lg:col-span-2 lg:row-span-1' : ''}`}
              >
                <AccommodationShimmer />
              </motion.div>
            ))
          ) : (
            // Show actual accommodation cards
            accommodationOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05
                }}
                viewport={{ once: true }}
                className={`relative group ${option.featured ? 'lg:col-span-2 lg:row-span-1' : ''}`}
              >
                {/* Glow Effect */}
                <motion.div
                  className={`absolute -inset-2 bg-gradient-to-r ${option.gradient} rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}
                  animate={{
                    opacity: option.featured ? [0.3, 0.6, 0.3] : 0,
                    scale: option.featured ? [0.95, 1.05, 0.95] : 1,
                  }}
                  transition={{
                    duration: option.featured ? 4 : 0,
                    repeat: option.featured ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ 
                    scale: 1.01,
                    y: -2
                  }}
                  transition={{ 
                    duration: 0.2
                  }}
                  className="relative h-full"
                >
                  <Card className={`
                    h-full bg-gradient-to-br from-slate-800/80 via-slate-900/60 to-slate-950/80 
                    backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 
                    rounded-[2.5rem] overflow-hidden group-hover:border-white/20 border border-slate-700/50
                    ${option.featured ? 'ring-2 ring-amber-400/30' : ''}
                  `}>
                    {/* Featured Badge */}
                    {option.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-1 text-xs font-bold">
                            ⭐ MOST POPULAR
                          </Badge>
                        </motion.div>
                      </div>
                    )}

                    <CardHeader className="pb-4">
                      {/* Icon and Type */}
                      <div className="flex items-center justify-between mb-6">
                        <motion.div
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 10 
                          }}
                          transition={{ duration: 0.3 }}
                          className="text-4xl"
                        >
                          {option.icon}
                        </motion.div>
                        <Badge 
                          variant="outline" 
                          className={`
                            bg-gradient-to-r ${option.gradient} backdrop-blur-xl 
                            border-white/20 text-white/90 px-3 py-1 text-xs font-semibold
                          `}
                        >
                          {option.type}
                        </Badge>
                      </div>

                      {/* Title and Duration */}
                      <div className="space-y-2">
                        <CardTitle className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
                          {option.name}
                        </CardTitle>
                        <p className="text-sm text-slate-400 font-medium">
                          {option.duration}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="mt-4">
                        <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                          {option.price}
                        </span>
                        <span className="text-sm text-slate-400 ml-2">per person</span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Features */}
                      <ul className="space-y-3">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-300">
                            <CheckCircle className="h-4 w-4 text-amber-400 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Book Now Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="pt-4"
                      >
                        <button
                          onClick={() => window.open(createFestivalBookingURL("Ziro Festival 2025 - " + option.name), '_blank')}
                          className="
                            block w-full py-4 px-6 bg-gradient-to-r from-green-600 via-green-700 to-green-800 
                            hover:from-green-500 hover:via-green-600 hover:to-green-700 
                            text-white font-bold text-center rounded-[1.5rem] 
                            transition-all duration-300 transform hover:shadow-xl hover:shadow-green-500/25
                            border border-green-400/30 hover:border-green-300/50
                            group-hover:scale-105
                          "
                        >
                          <span className="flex items-center justify-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            Book via WhatsApp
                            <motion.span
                              animate={{ x: [0, 4, 0] }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                              }}
                            >
                              →
                            </motion.span>
                          </span>
                        </button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))
          )}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-600/30 rounded-[2rem]">
            <span className="text-2xl">ℹ️</span>
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">Note:</span> Festival passes not included. All accommodations are on first-come, first-served basis.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
