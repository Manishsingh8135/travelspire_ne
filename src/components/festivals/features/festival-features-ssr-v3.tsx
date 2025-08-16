// components/festivals/features/festival-features-ssr-v3.tsx
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Music, Leaf, Award, Users, Mountain } from "lucide-react";
import { FestivalSectionHeader } from "../common/festival-section-header";

const features = [
  {
    icon: Music,
    title: "33+ Artists",
    description: "International & Indian indie artists performing across 4 magical days",
    highlight: "4-day celebration",
    gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
    iconColor: "text-amber-400",
    badgeColor: "bg-amber-500/20 text-amber-200 border-amber-400/40",
    image: "/images/places/ziro-new/ziro-new-landscape-1.jpeg"
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Zero-waste sustainable practices with bamboo infrastructure",
    highlight: "Sustainable festival",
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
    badgeColor: "bg-orange-500/20 text-orange-200 border-orange-400/40",
    image: "/images/places/ziro-new/ziro-new-landscape-3.JPG"
  },
  {
    icon: Award,
    title: "UNESCO Heritage",
    description: "Tentative World Heritage Site setting in pristine Ziro Valley",
    highlight: "Ziro Valley",
    gradient: "from-red-500/20 to-amber-500/20",
    iconColor: "text-red-400",
    badgeColor: "bg-red-500/20 text-red-200 border-red-400/40",
    image: "/images/places/ziro-new/ziro-new-portrait-10.jpg"
  },
  {
    icon: Users,
    title: "Apatani Culture",
    description: "Indigenous tribe hosts with 1000+ years heritage and authentic traditions",
    highlight: "Authentic experience",
    gradient: "from-amber-600/20 to-orange-600/20",
    iconColor: "text-amber-500",
    badgeColor: "bg-amber-600/20 text-amber-200 border-amber-500/40",
    image: "/images/places/ziro-new/ziro-new-portrait-15.jpg"
  },
  {
    icon: Mountain,
    title: "Valley Views",
    description: "Breathtaking mountain landscapes and pristine nature surrounding the festival",
    highlight: "Scenic beauty",
    gradient: "from-orange-600/20 to-red-600/20",
    iconColor: "text-orange-500",
    badgeColor: "bg-orange-600/20 text-orange-200 border-orange-500/40",
    image: "/images/places/ziro-new/ziro-new-landscape-4.JPG"
  }
];

export function FestivalFeaturesSSRV3() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(251,191,36,0.05),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.05),transparent_50%),radial-gradient(circle_at_40%_80%,rgba(239,68,68,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <FestivalSectionHeader
          badge={{
            emoji: "✨",
            text: "FESTIVAL HIGHLIGHTS"
          }}
          title="Experience the Magic"
          description="Discover what makes Ziro Festival of Music India's most beloved outdoor music celebration"
        />

        {/* Simple Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            
            return (
              <div
                key={feature.title}
                className="group relative"
              >
                {/* Static Glow Effect */}
                <div className={`absolute -inset-2 bg-gradient-to-r ${feature.gradient} rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                {/* Card Container */}
                <div className="relative h-[300px] bg-gradient-to-br from-slate-800/80 via-slate-900/60 to-slate-950/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-[2.5rem] overflow-hidden group-hover:border-white/20 border border-slate-700/50 cursor-pointer hover:-translate-y-1 hover:scale-[1.02]">
                  
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image 
                      src={feature.image} 
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Dark Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-950/90" />
                  
                  {/* Accent Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-30`} />
                  
                  {/* Content */}
                  <div className="relative h-full p-6 md:p-8 flex flex-col justify-center text-white">
                    
                    {/* Icon */}
                    <div className={`${feature.iconColor} mb-6 w-12 h-12 group-hover:scale-110 group-hover:rotate-[5deg] transition-transform duration-200`}>
                      <Icon className="w-full h-full" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-300 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base opacity-90 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Badge */}
                    <div className="w-fit group-hover:scale-[1.02] transition-transform duration-200">
                      <Badge className={`${feature.badgeColor} backdrop-blur-xl px-4 py-2 text-sm font-semibold`}>
                        {feature.highlight}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-20">
          <div className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-600/30 rounded-[2rem]">
            <span className="text-xl md:text-2xl">🎪</span>
            <p className="text-xs md:text-sm text-slate-300">
              <span className="font-semibold text-white">Join us</span> for an unforgettable celebration of music, culture, and nature
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
