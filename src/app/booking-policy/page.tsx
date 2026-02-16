"use client"
import React from "react";
import { motion } from "framer-motion";
import { 
  CalendarCheck, 
  CreditCard,
  ClipboardCheck,
  PackageCheck,
  Users,
  Utensils,
  Tent,
  Cloud,
  Backpack,
  MessageSquare,
  FileCheck
} from "lucide-react";
import { DotPattern, GlowEffect } from "@/components/ui/background-patterns";

const bookingSteps = [
  {
    icon: CalendarCheck,
    title: "Select Your Tour",
    description: "Browse our curated tours and choose your preferred dates."
  },
  {
    icon: CreditCard,
    title: "Pay 50% Advance",
    description: "Secure your booking with an advance payment."
  },
  {
    icon: ClipboardCheck,
    title: "Submit Documents",
    description: "Provide necessary documents for permits and verification."
  },
  {
    icon: PackageCheck,
    title: "Confirmation",
    description: "Receive your booking confirmation and tour details."
  }
];

const policyCards = [
  {
    title: "Tour Inclusions",
    icon: PackageCheck,
    items: [
      "Professional guide services",
      "Accommodations as per itinerary",
      "Transportation during tour",
      "Meals as specified",
      "Inner Line Permit processing",
      "Basic first aid support"
    ]
  },
  {
    title: "Group Bookings",
    icon: Users,
    items: [
      "Special rates for 6+ participants",
      "Group leader benefits",
      "Customization options",
      "Exclusive vehicle arrangements",
      "Coordinated logistics",
      "Group-specific amenities"
    ]
  },
  {
    title: "Special Requirements",
    icon: Utensils,
    items: [
      "Dietary preferences",
      "Medical considerations",
      "Accessibility needs",
      "Special equipment requests",
      "Language preferences",
      "Cultural accommodations"
    ]
  }
];

const additionalInfo = [
  {
    title: "Camping & Equipment",
    content: "We provide essential camping gear for adventure tours. Personal items and specialized equipment requirements will be communicated in advance.",
    icon: Tent
  },
  {
    title: "Weather Considerations",
    content: "Tours may be modified based on weather conditions. Safety is our priority, and alternative arrangements will be made when necessary.",
    icon: Cloud
  },
  {
    title: "Required Gear",
    content: "A detailed packing list will be provided. Some items may be available for rent, subject to availability.",
    icon: Backpack
  },
  {
    title: "Communication",
    content: "Stay updated with pre-tour briefings and daily updates during the tour. Emergency contacts are provided upon booking.",
    icon: MessageSquare
  }
];

export default function BookingPolicyPage() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-background via-primary-50/10 to-background dark:from-accent-950 dark:via-accent-900/50 dark:to-accent-950 overflow-x-hidden">
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
              <FileCheck className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h1 className="heading-1 mb-4">Booking Policy</h1>
          <p className="text-lg text-muted-foreground dark:text-neutral-300">
            Everything you need to know about booking your Northeast adventure
          </p>
        </motion.div>

        {/* Booking Steps */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {bookingSteps.map((step, index) => (
            <div 
              key={index}
              className="relative p-6 rounded-2xl bg-white/50 dark:bg-accent-900/50 border border-primary-100/20 dark:border-primary-900/20 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-2 rounded-xl bg-primary-100/50 dark:bg-primary-900/50 mb-4">
                  <step.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-neutral-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Policy Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {policyCards.map((card, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-white/50 dark:bg-accent-900/50 border border-primary-100/20 dark:border-primary-900/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-primary-100/50 dark:bg-primary-900/50">
                  <card.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
              </div>
              <ul className="space-y-2">
                {card.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex}
                    className="flex items-start gap-2 text-sm text-muted-foreground dark:text-neutral-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Additional Information */}
        <motion.div 
          className="space-y-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {additionalInfo.map((info, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-white/50 dark:bg-accent-900/50 border border-primary-100/20 dark:border-primary-900/20 backdrop-blur-sm"
            >
              <div className="flex gap-4">
                <div className="p-2 rounded-xl bg-primary-100/50 dark:bg-primary-900/50 h-fit">
                  <info.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                  <p className="text-muted-foreground dark:text-neutral-300">
                    {info.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Contact Section */}
        {/* <motion.div 
          className="p-8 rounded-2xl bg-gradient-to-br from-primary-100/50 to-secondary-100/50 dark:from-primary-900/50 dark:to-secondary-900/50 border border-primary-100/20 dark:border-primary-900/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 rounded-xl bg-primary-100/50 dark:bg-primary-900/50">
              <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
          </div>
          <div className="space-y-2 text-muted-foreground dark:text-neutral-300">
            <p>Email: travelspirene82@gmail.com</p>
            <p>Phone: +91-9864141211</p>
            <p>Address: Dibrugarh, Assam, India</p>
          </div>
        </motion.div> */}

        {/* Last Updated */}
        <motion.div 
          className="text-center mt-16 text-sm text-muted-foreground dark:text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Last Updated: November 27, 2024
        </motion.div>
      </div>
    </div>
  );
}