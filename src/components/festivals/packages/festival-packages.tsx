"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Shield } from "lucide-react";
import { TourBookingCard } from "@/components/tours/tour-details/tour-booking-card";
import { ziroFestival2025 } from "@/data/tours/festival-data";

export function FestivalPackages() {
  return (
    <section className="min-h-screen py-16 md:py-24 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,191,36,0.1),transparent_70%),radial-gradient(circle_at_70%_60%,rgba(249,115,22,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left: Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl border border-amber-400/30 rounded-2xl mb-6">
              <span className="text-amber-400">🎪</span>
              <span className="text-sm font-medium text-amber-200">Festival Packages</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
              Book Your Ziro Experience
            </h2>
            
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Complete packages with accommodation, permits, and festival access
            </p>

            {/* Quick highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Calendar, text: "4-Day Access" },
                { icon: MapPin, text: "UNESCO Valley" },
                { icon: Users, text: "Local Guides" },
                { icon: Shield, text: "All Permits" }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3 bg-slate-800/50 backdrop-blur-sm border border-amber-400/20 rounded-xl"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-200">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Festival-themed booking card wrapper */}
            <div className="bg-slate-800/60 backdrop-blur-xl border border-amber-400/30 rounded-2xl p-4 shadow-2xl [&_.bg-gradient-primary]:!bg-gradient-to-r [&_.bg-gradient-primary]:!from-amber-500 [&_.bg-gradient-primary]:!to-orange-600 [&_.focus\\:ring-primary-500]:!focus:ring-amber-500 [&_.border-primary-100\\/20]:!border-amber-400/20 [&_.text-primary-500]:!text-amber-500">
              <TourBookingCard tour={ziroFestival2025} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
