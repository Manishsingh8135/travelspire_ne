"use client";

import { motion } from "framer-motion";
import { Music, Leaf, Award, Users, Mountain, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
    size: "large"
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Zero-waste sustainable practices with bamboo infrastructure",
    highlight: "Sustainable festival",
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
    badgeColor: "bg-orange-500/20 text-orange-200 border-orange-400/40",
    size: "medium"
  },
  {
    icon: Award,
    title: "UNESCO Heritage",
    description: "Tentative World Heritage Site setting",
    highlight: "Ziro Valley",
    gradient: "from-red-500/20 to-amber-500/20",
    iconColor: "text-red-400",
    badgeColor: "bg-red-500/20 text-red-200 border-red-400/40",
    size: "small"
  },
  {
    icon: Users,
    title: "Apatani Culture",
    description: "Indigenous tribe hosts with 1000+ years heritage",
    highlight: "Authentic experience",
    gradient: "from-amber-600/20 to-orange-600/20",
    iconColor: "text-amber-500",
    badgeColor: "bg-amber-600/20 text-amber-200 border-amber-500/40",
    size: "wide"
  },
  {
    icon: Mountain,
    title: "Valley Views",
    description: "Breathtaking mountain landscapes and pristine nature",
    highlight: "Scenic beauty",
    gradient: "from-orange-600/20 to-red-600/20",
    iconColor: "text-orange-500",
    badgeColor: "bg-orange-600/20 text-orange-200 border-orange-500/40",
    size: "medium"
  },
  {
    icon: Heart,
    title: "Community Impact",
    description: "Supporting local artisans and sustainable tourism",
    highlight: "Local support",
    gradient: "from-red-600/20 to-amber-600/20",
    iconColor: "text-red-500",
    badgeColor: "bg-red-600/20 text-red-200 border-red-500/40",
    size: "small"
  }
];

export function FestivalFeatures() {
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

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-fr">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            // Define grid spans based on feature size
            const getGridSpan = (size: string) => {
              switch (size) {
                case "large": return "md:col-span-6 md:row-span-2";
                case "wide": return "md:col-span-8";
                case "medium": return "md:col-span-4";
                case "small": return "md:col-span-4";
                default: return "md:col-span-4";
              }
            };

            const getHeight = (size: string) => {
              switch (size) {
                case "large": return "min-h-[400px]";
                case "wide": return "min-h-[200px]";
                default: return "min-h-[250px]";
              }
            };

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.03
                }}
                viewport={{ once: true }}
                className={`${getGridSpan(feature.size)} group relative`}
              >
                {/* Glow Effect */}
                <motion.div
                  className={`absolute -inset-2 bg-gradient-to-r ${feature.gradient} rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ 
                    y: -4, 
                    scale: 1.01
                  }}
                  transition={{ 
                    duration: 0.2
                  }}
                  className={`
                    relative h-full ${getHeight(feature.size)} 
                    bg-gradient-to-br from-slate-800/80 via-slate-900/60 to-slate-950/80 
                    backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 
                    rounded-[2.5rem] overflow-hidden group-hover:border-white/20 border border-slate-700/50
                    cursor-pointer
                  `}
                >
                  {/* Background Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-50`} />
                  
                  {/* Content */}
                  <div className={`relative h-full p-8 flex flex-col ${feature.size === "large" ? "justify-end" : "justify-center"} text-white`}>
                    {/* Icon */}
                    <motion.div
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 5 
                      }}
                      transition={{ duration: 0.2 }}
                      className={`${feature.iconColor} mb-6 ${feature.size === "large" ? "w-16 h-16" : "w-12 h-12"}`}
                    >
                      <Icon className="w-full h-full" />
                    </motion.div>

                    {/* Title */}
                    <h3 className={`font-bold mb-4 group-hover:text-amber-300 transition-colors duration-300 ${
                      feature.size === "large" ? "text-4xl" : 
                      feature.size === "wide" ? "text-3xl" : "text-2xl"
                    }`}>
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className={`opacity-90 mb-6 leading-relaxed ${
                      feature.size === "large" ? "text-xl" : 
                      feature.size === "wide" ? "text-lg" : "text-base"
                    }`}>
                      {feature.description}
                    </p>

                    {/* Badge */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="w-fit"
                    >
                      <Badge className={`${feature.badgeColor} backdrop-blur-xl px-4 py-2 text-sm font-semibold`}>
                        {feature.highlight}
                      </Badge>
                    </motion.div>

                    {/* Floating Elements for Large Card */}
                    {feature.size === "large" && (
                      <>
                        <motion.div
                          className="absolute top-8 right-8 text-amber-400 text-2xl"
                          animate={{ 
                            y: [0, -10, 0],
                            rotate: [0, 10, 0],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: 0.5
                          }}
                        >
                          🎵
                        </motion.div>
                        <motion.div
                          className="absolute top-16 right-16 text-orange-400 text-lg"
                          animate={{ 
                            y: [0, 8, 0],
                            rotate: [0, -10, 0],
                            opacity: [0.4, 0.8, 0.4]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: 1.5
                          }}
                        >
                          ✨
                        </motion.div>
                      </>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-600/30 rounded-[2rem]">
            <span className="text-2xl">🎪</span>
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">Join us</span> for an unforgettable celebration of music, culture, and nature
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
