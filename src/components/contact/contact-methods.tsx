// components/contact/contact-methods.tsx
"use client";

import { motion } from "framer-motion";
import { contactMethods } from "@/data/contact/contact-data";
import Link from "next/link";

export function ContactMethods() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(251,191,36,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(249,115,22,0.1),transparent_50%)]" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent" />
        <div className="absolute inset-0 bg-[length:60px_60px] bg-[image:radial-gradient(circle_at_center,rgba(251,191,36,0.1)_1px,transparent_1px)]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-full text-amber-200 text-sm font-medium mb-6"
          >
            🎪 Ready for Ziro Festival?
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-amber-100 to-orange-200 bg-clip-text text-transparent">
            Get Expert Festival Guidance
          </h2>
          
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Get in touch with our travel experts for personalized festival packages and permits
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02, 
                y: -8 
              }}
              className="group relative p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-2xl shadow-2xl overflow-hidden hover:border-amber-400/40 transition-all duration-300"
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 blur-xl rounded-2xl transition-opacity duration-300"
              />
              
              <div className="relative space-y-4">
                {/* Icon */}
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-amber-500/25 transition-shadow duration-300"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <method.icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-200 transition-colors duration-300">
                    {method.title}
                  </h3>
                  <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                    {method.description}
                  </p>
                </div>

                {/* Action Button */}
                <Link
                  href={method.action.href}
                  className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-400/30 hover:border-amber-400/50 rounded-xl text-sm font-medium text-amber-200 hover:text-white transition-all duration-300 group-hover:shadow-lg"
                >
                  {method.action.text}
                </Link>
              </div>
              
              {/* Floating sparkle animation */}
              <motion.div
                className="absolute top-3 right-3 text-amber-400/60 text-xs"
                animate={{ 
                  y: [0, -3, 0],
                  rotate: [0, 15, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              >
                ✨
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}