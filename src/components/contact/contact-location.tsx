// components/contact/office-locations.tsx
"use client";

import { motion } from "framer-motion";
import { officeLocation, socialLinks } from "@/data/contact/contact-data";
import { cn } from "@/lib/utils";
import { MapPin, Phone, Mail } from "lucide-react";

export function OfficeLocations() {
  return (
    <section className="relative py-16 md:py-24 bg-primary-50/50 dark:bg-accent-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Office Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div>
              <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-4">
                Visit our office
              </h2>
              <p className="text-lg text-muted-foreground dark:text-neutral-300">
                Drop by our office to plan your next adventure in person.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex flex-col lg:flex-row items-center lg:items-start gap-4"
              >
                <div className={cn(
                  "relative p-4 rounded-xl group overflow-hidden",
                  "bg-gradient-to-br from-primary-50/80 to-primary-100/80",
                  "dark:from-accent-800/80 dark:to-accent-900/80",
                  "shadow-lg shadow-primary-500/10 dark:shadow-black/20",
                  "transition-all duration-300"
                )}>
                  {/* Gradient glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-400/20 blur-xl" />
                  </div>
                  {/* Icon */}
                  <div className="relative z-10">
                    <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground dark:text-white">
                    {officeLocation.title}
                  </h3>
                  <p className="text-muted-foreground dark:text-neutral-400">
                    {officeLocation.address}
                  </p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex flex-col lg:flex-row items-center lg:items-start gap-4"
              >
                <div className={cn(
                  "relative p-4 rounded-xl group overflow-hidden",
                  "bg-gradient-to-br from-primary-50/80 to-primary-100/80",
                  "dark:from-accent-800/80 dark:to-accent-900/80",
                  "shadow-lg shadow-primary-500/10 dark:shadow-black/20",
                  "transition-all duration-300"
                )}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-400/20 blur-xl" />
                  </div>
                  <div className="relative z-10">
                    <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground dark:text-white">
                    Phone
                  </h3>
                  <a 
                    href={`tel:${officeLocation.phone}`} 
                    className="text-muted-foreground hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors"
                  >
                    {officeLocation.phone}
                  </a>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex flex-col lg:flex-row items-center lg:items-start gap-4"
              >
                <div className={cn(
                  "relative p-4 rounded-xl group overflow-hidden",
                  "bg-gradient-to-br from-primary-50/80 to-primary-100/80",
                  "dark:from-accent-800/80 dark:to-accent-900/80",
                  "shadow-lg shadow-primary-500/10 dark:shadow-black/20",
                  "transition-all duration-300"
                )}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-400/20 blur-xl" />
                  </div>
                  <div className="relative z-10">
                    <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground dark:text-white">
                    Email
                  </h3>
                  <a 
                    href={`mailto:${officeLocation.email}`}
                    className="text-muted-foreground hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors"
                  >
                    {officeLocation.email}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h3 className="text-lg font-medium text-foreground dark:text-white mb-4">
                Follow us
              </h3>
              <div className="flex justify-center lg:justify-start gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative p-4 rounded-xl group overflow-hidden",
                      "bg-gradient-to-br from-primary-50/80 to-primary-100/80",
                      "dark:from-accent-800/80 dark:to-accent-900/80",
                      "hover:from-primary-500 hover:to-secondary-500",
                      "text-primary-600 hover:text-white dark:text-white",
                      "shadow-lg shadow-primary-500/10 dark:shadow-black/20",
                      "transition-all duration-300"
                    )}
                  >
                    {/* Gradient glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-400/20 blur-xl" />
                    </div>

                    {/* Icon */}
                    <div className="relative z-10">
                      <social.icon className="w-6 h-6" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={cn(
              "relative w-full h-[400px] rounded-[2.5rem] overflow-hidden",
              "bg-white dark:bg-accent-900",
              "border border-primary-100/20 dark:border-primary-900/20",
              "shadow-xl"
            )}
          >
            {/* Map component */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}