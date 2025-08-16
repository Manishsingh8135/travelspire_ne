// components/festivals/hero/ziro-hero-ssr.tsx
import { Calendar, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ziroFestival2025 } from "@/data/tours/festival-data";

export function ZiroHeroSSR() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden rounded-b-[4rem] shadow-2xl shadow-black/30 pt-20 pb-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-b-[4rem] overflow-hidden">
          <img 
            src={ziroFestival2025.heroImage}
            alt="Ziro Festival 2025"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 rounded-b-[4rem]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/30 via-transparent to-orange-900/30 rounded-b-[4rem]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-6">
        {/* Premium Festival Badge */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Glowing background */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/30 via-orange-500/30 to-red-500/30 rounded-[3rem] blur-xl opacity-60" />
            
            {/* Main badge */}
            <Badge className="relative px-8 py-4 text-base font-semibold bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 text-amber-200 border-2 border-amber-400/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl">
              <div className="mr-3">
                <Music className="w-5 h-5 text-amber-400 inline" />
              </div>
              <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-red-200 bg-clip-text text-transparent font-bold">
                LIVE NOW
              </span>
              <span className="mx-2 text-amber-300">•</span>
              <span className="text-amber-100">Sep 25-28, 2025</span>
              <div className="ml-3 w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full inline-block" />
            </Badge>
          </div>
          
          {/* Secondary eco badge */}
          <div className="mt-4">
            <Badge className="px-6 py-3 text-sm font-medium bg-primary-500/15 text-primary-300 border-primary-400/25 backdrop-blur-md rounded-[2rem]">
              <span className="mr-2">🌿</span>
              India's Greatest Eco-Friendly Festival
            </Badge>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
          <span className="block bg-gradient-to-r from-amber-200 via-orange-200 to-red-200 bg-clip-text text-transparent drop-shadow-2xl">
            ZIRO
          </span>
          <span className="block text-white drop-shadow-2xl">
            FESTIVAL
          </span>
          <span className="block text-3xl md:text-5xl lg:text-6xl text-amber-300 drop-shadow-xl mt-2">
            2025
          </span>
        </h1>

        <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
          Experience India's premier outdoor music festival in the UNESCO Tentative World Heritage Site of Ziro Valley
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-[2rem] blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white px-12 py-6 text-lg font-semibold rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-400/30"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Book Your Experience
            </Button>
          </div>
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-amber-400/20 rounded-[2rem] blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-12 py-6 text-lg font-semibold rounded-[2rem] backdrop-blur-md transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Music className="w-5 h-5 mr-3" />
              View Lineup
            </Button>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
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
        </div>
      </div>

      {/* Static Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
