"use client";

import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FestivalSectionHeader } from "../common/festival-section-header";

// Shimmer loading component for artist cards
const ArtistShimmer = () => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-xl">
    {/* Image placeholder */}
    <div className="relative h-32 sm:h-40 md:h-48 bg-slate-700/50 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-slate-600/50 rounded-full animate-pulse" />
    </div>
    
    {/* Content placeholder */}
    <div className="p-3 sm:p-4 space-y-2">
      <div className="w-24 h-4 bg-slate-700/50 rounded animate-pulse" />
      <div className="w-16 h-3 bg-slate-700/50 rounded animate-pulse" />
      <div className="w-20 h-3 bg-slate-700/50 rounded animate-pulse" />
      <div className="w-16 h-5 bg-slate-700/50 rounded-full animate-pulse mt-2" />
    </div>
  </div>
);

interface Artist {
  name: string;
  origin: string;
  type: string;
  image: string;
  genre: string;
}

interface FestivalLineupProps {
  artists?: Artist[];
  isLoading?: boolean;
  year?: string;
  totalArtists?: string;
}

export function FestivalLineup({ 
  artists = [], 
  isLoading = false,
  year = "2025",
  totalArtists = "33+"
}: FestivalLineupProps) {
  return (
    <section className="py-32 bg-gradient-to-b from-slate-950/50 to-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <FestivalSectionHeader
          title={`${year} Artist Lineup`}
          description={`${totalArtists} artists from India and around the world, featuring indie, folk, and world music`}
        />

        {/* Artists Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {isLoading ? (
            // Show shimmer loading cards
            Array.from({ length: 12 }).map((_, index) => (
              <motion.div
                key={`shimmer-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
              >
                <ArtistShimmer />
              </motion.div>
            ))
          ) : (
            // Show actual artist cards
            artists.map((artist, index) => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  {/* Artist Image */}
                  <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                    <img 
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Floating Music Icon */}
                    <motion.div
                      className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    >
                      <Music className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Artist Info */}
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-sm sm:text-lg text-white mb-1 group-hover:text-amber-300 transition-colors line-clamp-1">
                      {artist.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2 line-clamp-1">{artist.origin}</p>
                    <p className="text-xs text-gray-400 mb-2 sm:mb-3 line-clamp-1">{artist.genre}</p>
                    
                    {/* Elegant Type Badge */}
                    <div className="flex justify-start">
                      <Badge 
                        className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${
                          artist.type === 'International' 
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 backdrop-blur-sm' :
                          artist.type === 'Northeast' 
                            ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 backdrop-blur-sm' :
                          artist.type === 'Indian Indie'
                            ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 backdrop-blur-sm'
                            : 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 backdrop-blur-sm'
                        }`}
                      >
                        {artist.type === 'Bollywood/Mainstream' ? 'Bollywood' : artist.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* More Artists Coming Badge */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="px-8 py-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-md rounded-full border border-amber-400/30"
              >
                <span className="text-amber-300 font-semibold text-lg">
                  + More Artists Coming Soon
                </span>
              </motion.div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-xl -z-10"></div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
