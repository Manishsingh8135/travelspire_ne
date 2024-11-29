"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';
import { DotPattern, GlowEffect } from '@/components/ui/background-patterns';

export default function PrivacyPolicyPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  };

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
          {...fadeInUp}
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-2xl bg-primary-100/50 dark:bg-primary-900/50">
              <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h1 className="heading-1 mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground dark:text-neutral-300">
            Your privacy is our priority. Learn how we protect and manage your information.
          </p>
        </motion.div>

        {/* Key Points Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            {
              icon: Lock,
              title: "Data Security",
              description: "Your data is encrypted and securely stored"
            },
            {
              icon: Eye,
              title: "Transparency",
              description: "Clear information about data usage"
            },
            {
              icon: FileCheck,
              title: "Control",
              description: "Manage your privacy preferences"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="relative p-6 rounded-2xl bg-white/50 dark:bg-accent-900/50 border border-primary-100/20 dark:border-primary-900/20 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-2 rounded-xl bg-primary-100/50 dark:bg-primary-900/50 mb-4">
                  <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-neutral-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Policy Content */}
        <motion.div 
          className="prose prose-lg dark:prose-invert max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="space-y-8">
            {[
              {
                title: "Information We Collect",
                content: [
                  "Name, email address, and phone number",
                  "Government-issued ID details for permits",
                  "Travel preferences and requirements",
                  "Emergency contact information"
                ]
              },
              {
                title: "How We Use Your Information",
                content: [
                  "Process tour bookings and payments",
                  "Obtain necessary travel permits (ILP/PAP)",
                  "Communicate tour details and updates",
                  "Handle emergencies during tours"
                ]
              },
              {
                title: "Information Sharing",
                content: [
                  "Local tour operators and guides",
                  "Accommodation providers",
                  "Government authorities for permits",
                  "Emergency services when needed"
                ]
              },
              {
                title: "Your Rights",
                content: [
                  "Access your personal data",
                  "Correct inaccurate information",
                  "Request data deletion",
                  "Opt-out of marketing communications"
                ]
              }
            ].map((section, index) => (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-white/50 dark:bg-accent-900/50 border border-primary-100/20 dark:border-primary-900/20 backdrop-blur-sm"
              >
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="flex items-start gap-2 text-muted-foreground dark:text-neutral-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Section */}
            {/* <div className="p-8 rounded-2xl bg-gradient-to-br from-primary-100/50 to-secondary-100/50 dark:from-primary-900/50 dark:to-secondary-900/50 border border-primary-100/20 dark:border-primary-900/20 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <div className="space-y-2 text-muted-foreground dark:text-neutral-300">
                <p>Email: travelspirene82@gmail.com</p>
                <p>Phone: +91 98641 41211</p>
                <p>Address: Dibrugarh, Assam, India</p>
              </div>
            </div> */}
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div 
          className="text-center mt-16 text-sm text-muted-foreground dark:text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Last Updated: November 27, 2024
        </motion.div>
      </div>
    </div>
  );
}