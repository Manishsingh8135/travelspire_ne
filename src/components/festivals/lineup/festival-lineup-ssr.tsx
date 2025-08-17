// components/festivals/lineup/festival-lineup-ssr.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Music } from "lucide-react";
import { FestivalSectionHeader } from "../common/festival-section-header";

interface Artist {
  name: string;
  origin: string;
  type: string;
  genre: string;
}

interface FestivalLineupSSRProps {
  artists?: Artist[];
  year?: string;
  totalArtists?: string;
}

export function FestivalLineupSSR({ 
  artists = [], 
  year = "2025",
  totalArtists = "33+"
}: FestivalLineupSSRProps) {
  return (
    <section className="py-32 bg-gradient-to-b from-slate-950/50 to-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <FestivalSectionHeader
          title={`${year} Artist Lineup`}
          description={`${totalArtists} artists from India and around the world, featuring indie, folk, and world music`}
        />

        {/* Artists Grid - Static */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {artists.map((artist) => (
            <div
              key={artist.name}
              className="group cursor-pointer hover:scale-[1.02] hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Artist Icon Header */}
                <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Music className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-amber-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Static Music Icon */}
                  <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-[15deg] transition-transform duration-200">
                    <Music className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
                
                {/* Artist Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-sm sm:text-lg text-white mb-1 group-hover:text-amber-300 transition-colors line-clamp-1">
                    {artist.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2 line-clamp-1">{artist.origin}</p>
                  <p className="text-xs text-gray-400 mb-2 sm:mb-3 line-clamp-1">{artist.genre}</p>
                  
                  {/* Type Badge */}
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
            </div>
          ))}
        </div>

        {/* More Artists Coming Badge - Static */}
        <div className="text-center mt-16">
          <div className="relative inline-block">
            <div className="px-8 py-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-md rounded-full border border-amber-400/30 hover:scale-105 hover:rotate-1 transition-transform duration-300">
              <span className="text-amber-300 font-semibold text-lg">
                + More Artists Coming Soon
              </span>
            </div>
            
            {/* Static glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
