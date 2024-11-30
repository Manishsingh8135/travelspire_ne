"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FestivalProduct } from "@/types/products/base-product";
import { ProductGrid } from "@/components/ui/product/product-grid";
import { Badge } from "@/components/ui/badge";

interface FestivalShowcaseProps {
  title?: string;
  subtitle?: string;
  festivals: FestivalProduct[];
  className?: string;
}

export function FestivalShowcase({
  title = "Upcoming Festivals",
  subtitle = "Experience the vibrant culture of Northeast India through its colorful festivals",
  festivals,
  className
}: FestivalShowcaseProps) {
  return (
    <section className={cn("space-y-8 py-16", className)}>
      {/* Header */}
      <div className="space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-2"
        >
          <Badge variant="outline" className="bg-white/5 backdrop-blur-sm">
            Cultural Experiences
          </Badge>
          <h2 className="font-display text-3xl font-medium text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-400">
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* Festival Grid */}
      <ProductGrid
        products={festivals}
        variant={festivals.length > 2 ? "default" : "featured"}
      />
    </section>
  );
}
