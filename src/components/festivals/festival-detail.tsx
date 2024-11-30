"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  Camera,
  Users,
  Tag,
  Info
} from "lucide-react";
import { FestivalProduct } from "@/types/products/base-product";
import { ProductGallery } from "@/components/ui/product/product-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FestivalDetailProps {
  festival: FestivalProduct;
  className?: string;
}

export function FestivalDetail({ festival, className }: FestivalDetailProps) {
  return (
    <article className={cn("space-y-8 py-8", className)}>
      {/* Header */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Badge variant="outline" className="bg-white/5 backdrop-blur-sm">
            {festival.type}
          </Badge>
          <h1 className="font-display text-4xl font-medium text-white sm:text-5xl">
            {festival.title}
          </h1>
          <p className="text-xl text-zinc-400">{festival.subtitle}</p>
        </motion.div>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{festival.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{festival.startDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{festival.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Tag className="h-4 w-4" />
            <span>₹{festival.price.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <ProductGallery product={festival} variant="grid" />

      {/* Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Overview */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-medium text-white">
              About the Festival
            </h2>
            <p className="text-zinc-400">{festival.overview}</p>
            <p className="text-zinc-400">{festival.description}</p>
          </section>

          {/* Cultural Highlights */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-medium text-white">
              Cultural Highlights
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {festival.culturalHighlights.map((highlight, index) => (
                <motion.li
                  key={highlight}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-zinc-400"
                >
                  <Music className="h-5 w-5 text-orange-500" />
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </section>

          {/* Schedule */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-medium text-white">
              Festival Schedule
            </h2>
            <div className="space-y-4">
              {festival.schedule.map((item, index) => (
                <motion.div
                  key={item.time}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl bg-white/5 p-4"
                >
                  <h3 className="font-display text-lg font-medium text-white">
                    {item.time}
                  </h3>
                  <p className="mt-1 text-orange-500">{item.event}</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Traditional Activities */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-medium text-white">
              Traditional Activities
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {festival.traditionalActivities.map((activity, index) => (
                <motion.li
                  key={activity}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-zinc-400"
                >
                  <Camera className="h-5 w-5 text-orange-500" />
                  <span>{activity}</span>
                </motion.li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Card */}
          <div className="sticky top-8 space-y-6 rounded-3xl bg-white/5 p-6 backdrop-blur-sm">
            <div className="space-y-2">
              <h3 className="font-display text-xl font-medium text-white">
                Book Your Experience
              </h3>
              <p className="text-sm text-zinc-400">
                Secure your spot at this amazing cultural festival
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Price per person</span>
                <span className="font-medium text-white">
                  ₹{festival.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Max group size</span>
                <span className="font-medium text-white">
                  {festival.maxGroupSize} people
                </span>
              </div>
            </div>

            <Button className="w-full">Book Now</Button>

            {/* Important Note */}
            {festival.importantNote && (
              <div className="flex gap-2 rounded-2xl bg-orange-500/10 p-3 text-sm text-orange-500">
                <Info className="h-5 w-5 flex-shrink-0" />
                <p>{festival.importantNote}</p>
              </div>
            )}

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <p className="font-medium text-white">Need help?</p>
              <p className="text-zinc-400">
                Call us at{" "}
                <a
                  href={`tel:${festival.contactInfo.phone}`}
                  className="text-orange-500 hover:underline"
                >
                  {festival.contactInfo.phone}
                </a>
              </p>
              <p className="text-zinc-400">
                Email us at{" "}
                <a
                  href={`mailto:${festival.contactInfo.email}`}
                  className="text-orange-500 hover:underline"
                >
                  {festival.contactInfo.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
