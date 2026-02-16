// components/tours/filter-badges.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";
import { TourCategory, TourStatus, TourDifficulty } from "@/types/tours/tour";

interface FilterBadgeProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  variant?: 'category' | 'status' | 'difficulty';
  className?: string;
}

function FilterBadge({ label, isSelected, onClick, variant = 'category', className }: FilterBadgeProps) {
  const variantStyles = {
    category: {
      base: "from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 text-primary-700 dark:text-primary-300 border-primary-300/50 dark:border-primary-600/50",
      selected: "from-primary-500 to-primary-600 text-white border-primary-500 shadow-lg shadow-primary-500/25"
    },
    status: {
      base: "from-secondary-100 to-secondary-200 dark:from-secondary-900/50 dark:to-secondary-800/50 text-secondary-700 dark:text-secondary-300 border-secondary-300/50 dark:border-secondary-600/50",
      selected: "from-secondary-500 to-secondary-600 text-white border-secondary-500 shadow-lg shadow-secondary-500/25"
    },
    difficulty: {
      base: "from-accent-100 to-accent-200 dark:from-accent-800/50 dark:to-accent-700/50 text-accent-700 dark:text-accent-300 border-accent-300/50 dark:border-accent-600/50",
      selected: "from-accent-600 to-accent-700 text-white border-accent-600 shadow-lg shadow-accent-600/25"
    }
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative inline-flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-gradient-to-r border backdrop-blur-sm",
        "text-sm font-medium transition-all duration-300",
        "hover:shadow-md",
        isSelected ? variantStyles[variant].selected : variantStyles[variant].base,
        className
      )}
    >
      {isSelected && <Check className="w-3 h-3" />}
      <span>{label}</span>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-accent-800 rounded-full flex items-center justify-center border-2 border-current"
        >
          <X className="w-2.5 h-2.5" />
        </motion.div>
      )}
    </motion.button>
  );
}

interface FilterBadgeGroupProps {
  title: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
  variant?: 'category' | 'status' | 'difficulty';
  className?: string;
}

export function FilterBadgeGroup({ 
  title, 
  options, 
  selectedValue, 
  onSelect, 
  variant = 'category',
  className 
}: FilterBadgeGroupProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-sm font-semibold text-muted-foreground">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <FilterBadge
            key={option.value}
            label={option.label}
            isSelected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}

// Predefined filter options
export const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Cultural', label: 'Cultural' },
  { value: 'Nature', label: 'Nature' },
  { value: 'Pilgrimage', label: 'Pilgrimage' },
  { value: 'Festival', label: 'Festival' },
  { value: 'BikeTrip', label: 'Bike Trip' },
  { value: 'FruitFestival', label: 'Fruit Festival' },
  { value: 'CampingTrip', label: 'Camping' },
];

export const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'featured', label: 'Featured' },
  { value: 'trending', label: 'Trending' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'regular', label: 'Regular' },
];

export const difficultyOptions = [
  { value: 'all', label: 'All Difficulties' },
  { value: 'Easy', label: 'Easy' },
  { value: 'Moderate', label: 'Moderate' },
  { value: 'Challenging', label: 'Challenging' },
];

// Quick filter badges for common combinations
interface QuickFilterProps {
  onApplyFilter: (filters: { category?: string; status?: string; difficulty?: string }) => void;
  className?: string;
}

export function QuickFilters({ onApplyFilter, className }: QuickFilterProps) {
  const quickFilters = [
    { 
      label: "🔥 Trending Adventures", 
      filters: { category: 'Adventure', status: 'trending' },
      gradient: "from-orange-500 to-red-500"
    },
    { 
      label: "⭐ Featured Tours", 
      filters: { status: 'featured' },
      gradient: "from-yellow-500 to-orange-500"
    },
    { 
      label: "🎉 Upcoming Festivals", 
      filters: { category: 'Festival', status: 'upcoming' },
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      label: "🚴 Bike Adventures", 
      filters: { category: 'BikeTrip' },
      gradient: "from-green-500 to-blue-500"
    },
    { 
      label: "🏔️ Easy Nature Tours", 
      filters: { category: 'Nature', difficulty: 'Easy' },
      gradient: "from-green-400 to-emerald-500"
    },
  ];

  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-sm font-semibold text-muted-foreground">Quick Filters</h4>
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter, index) => (
          <motion.button
            key={index}
            onClick={() => onApplyFilter(filter.filters)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium text-white",
              "bg-gradient-to-r shadow-lg backdrop-blur-sm",
              "hover:shadow-xl transition-all duration-300",
              filter.gradient
            )}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
