// components/festivals/lineup/festival-lineup-compact.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Music, MapPin, Headphones } from "lucide-react";
import { FestivalSectionHeader } from "../common/festival-section-header";

interface Artist {
  name: string;
  origin: string;
  type: string;
  genre: string;
}

interface FestivalLineupCompactProps {
  artists?: Artist[];
  year?: string;
  totalArtists?: string;
}

export function FestivalLineupCompact({ 
  artists = [], 
  year = "2025",
  totalArtists = "33+"
}: FestivalLineupCompactProps) {
  return (
    <section className="py-32 bg-gradient-to-b from-slate-950/50 to-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <FestivalSectionHeader
          title={`${year} Artist Lineup`}
          description={`${totalArtists} artists from India and around the world, featuring indie, folk, and world music`}
        />

        {/* Artists Grid - Compact Without Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {artists.map((artist) => (
            <div
              key={artist.name}
              className="group cursor-pointer hover:scale-[1.02] hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 p-4">
                
                {/* Icon Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Music className="w-5 h-5 text-amber-300" />
                  </div>
                  
                  {/* Type Badge */}
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
                
                {/* Artist Info */}
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {artist.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-3 h-3" />
                    <p className="text-sm line-clamp-1">{artist.origin}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-400">
                    <Headphones className="w-3 h-3" />
                    <p className="text-xs line-clamp-1">{artist.genre}</p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* More Artists Coming Badge */}
        <div className="text-center mt-16">
          <div className="relative inline-block">
            <div className="px-8 py-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-md rounded-full border border-amber-400/30 hover:scale-105 hover:rotate-1 transition-transform duration-300">
              <span className="text-amber-300 font-semibold text-lg">
                + More Artists Coming Soon
              </span>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
