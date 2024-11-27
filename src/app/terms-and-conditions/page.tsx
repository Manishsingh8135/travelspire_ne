"use client"
import React from "react";
import { motion } from "framer-motion";
import { 
  Scale, 
  ScrollText, 
  MapPin, 
  CreditCard, 
  AlertCircle, 
  FileCheck,
  Mountain,
  Camera,
  Users,
  Landmark
} from "lucide-react";
import { DotPattern, GlowEffect } from "@/components/ui/background-patterns";

const termsData = [
  {
    icon: Mountain,
    title: "Travel Services",
    items: [
      "Customized Northeast India tours",
      "Adventure treks and expeditions",
      "Cultural and photography tours",
      "Local experiences and homestays"
    ]
  },
  {
    icon: MapPin,
    title: "Service Areas",
    items: [
      "Arunachal Pradesh",
      "Assam",
      "Meghalaya",
      "Nagaland"
    ]
  },
  {
    icon: CreditCard,
    title: "Payment Terms",
    items: [
      "50% advance payment required",
      "Secure payment processing",
      "Multiple payment options",
      "Transparent pricing"
    ]
  },
  {
    icon: AlertCircle,
    title: "Cancellation Policy",
    items: [
      "90% refund: 30+ days before",
      "50% refund: 15-29 days before",
      "25% refund: 7-14 days before",
      "No refund: Less than 7 days"
    ]
  }
];

const additionalSections = [
  {
    title: "Documentation Requirements",
    content: "Valid government ID, Inner Line Permits, and travel insurance are required for all tours. Medical declarations may be necessary for high-altitude treks.",
    icon: FileCheck
  },
  {
    title: "Photography Guidelines",
    content: "Respect local photography restrictions. Commercial photography requires special permission. We retain rights to use tour photos for promotion.",
    icon: Camera
  },
  {
    title: "Group Conduct",
    content: "Participants must follow guide instructions, respect local customs, and maintain punctuality. We reserve the right to modify itineraries for safety.",
    icon: Users
  },
  {
    title: "Legal Compliance",
    content: "All tours operate under Indian tourism regulations. Disputes are subject to jurisdiction in Assam courts.",
    icon: Landmark
  }
];

export default function TermsAndConditionsPage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-b from-background via-primary-50/10 to-background dark:from-accent-950 dark:via-accent-900/50 dark:to-accent-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <DotPattern className="opacity-20" />
        <GlowEffect 
          color="primary"
          size="lg"
          opacity="low"
          className="absolute -top-40 -right-40"
        />
        <GlowEffect
          color="secondary"
          size="lg"
          opacity="low"
          className="absolute -bottom-40 -left-40"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-20">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-2xl bg-primary-100/50 dark:bg-primary-900/50">
              <Scale className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h1 className="heading-1 mb-4">Terms and Conditions</h1>
          <p className="text-lg text-muted-foreground dark:text-neutral-300">
            Please read these terms carefully before using our services
          </p>
        </motion.div>

        {/* Main Terms Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {termsData.map((section, index) => (
            <div 
              key={index}
              className="relative p-8 rounded-2xl bg-white/50 dark:bg-accent-900/50 border border-primary-100/20 dark:border-primary-900/20 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-primary-100/50 dark:bg-primary-900/50">
                  <section.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li 
                        key={itemIndex}
                        className="flex items-start gap-2 text-muted-foreground dark:text-neutral-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Additional Sections */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {additionalSections.map((section, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-white/50 dark:bg-accent-900/50 border border-primary-100/20 dark:border-primary-900/20 backdrop-blur-sm"
            >
              <div className="flex gap-4">
                <div className="p-2 rounded-xl bg-primary-100/50 dark:bg-primary-900/50 h-fit">
                  <section.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                  <p className="text-muted-foreground dark:text-neutral-300">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Contact Section */}
        {/* <motion.div 
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary-100/50 to-secondary-100/50 dark:from-primary-900/50 dark:to-secondary-900/50 border border-primary-100/20 dark:border-primary-900/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="space-y-2 text-muted-foreground dark:text-neutral-300">
            <p>Email: travelspirene82@gmail.com</p>
            <p>Phone: +91 98641 41211</p>
            <p>Address: Dibrugarh, Assam, India</p>
          </div>
        </motion.div> */}

        {/* Last Updated */}
        <motion.div 
          className="text-center mt-16 text-sm text-muted-foreground dark:text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Last Updated: November 27, 2024
        </motion.div>
      </div>
    </div>
  );
}