// components/tours/unified-tours-page.tsx
"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Filter,
  ChevronDown,
  Grid3X3, 
  List,
  TrendingUp,
  Calendar
} from "lucide-react";

import { 
  TourFilters, 
  TourCategory, 
  TourStatus,
  TourDifficulty
} from "@/types/tours/tour";
import {
  filterTours,
  sortTours,
  SortCriteria,
  getTourStatistics,
  getSearchSuggestions
} from "@/lib/tour-filters";
import { upcomingTours } from "@/data/tours";
import { TourCard } from "./tour-showcase/tour-card";
import { FestivalTourCard } from "./tour-showcase/festival-tour-card";
import { isFestivalTour } from "@/types/tours/tour";
import { FilterBadgeGroup, QuickFilters, categoryOptions, statusOptions, difficultyOptions } from "./filter-badges";

interface UnifiedToursPageProps {
  initialFilters?: Partial<TourFilters>;
  className?: string;
}

export function UnifiedToursPage({ initialFilters = {}, className }: UnifiedToursPageProps) {
  const [filters, setFilters] = useState<TourFilters>({
    category: 'all',
    status: 'all',
    difficulty: 'all',
    searchQuery: '',
    ...initialFilters
  });
  
  const [sortBy, setSortBy] = useState<SortCriteria>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Get tour statistics
  const tourStats = useMemo(() => getTourStatistics(upcomingTours), []);
  
  // Filter and sort tours
  const filteredAndSortedTours = useMemo(() => {
    const filtered = filterTours(upcomingTours, filters);
    return sortTours(filtered, sortBy);
  }, [filters, sortBy]);

  // Handle search input
  const handleSearchChange = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
    
    if (query.length >= 2) {
      const suggestions = getSearchSuggestions(query, upcomingTours);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle filter changes
  const updateFilter = (key: keyof TourFilters, value: TourFilters[keyof TourFilters]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: 'all',
      status: 'all',
      difficulty: 'all',
      searchQuery: ''
    });
  };

  return (
    <div className={cn("min-h-screen bg-gradient-to-b from-white via-primary-50/50 to-white dark:from-black dark:via-accent-900 dark:to-black", className)}>
      {/* Background pattern for entire page */}
      <div className="fixed inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(
              rgb(var(--primary-400) / 0.1) 1px, 
              transparent 1px
            )`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>
      
      {/* Hero Section - taller, image background, subtle overlay */}
      <div className="relative rounded-b-[3rem] mx-4 md:mx-8 overflow-hidden">
        <div className="relative min-h-[360px] md:min-h-[520px]">
          <Image
            src="/images/places/ziro-new/ziro-new-landscape-1.jpeg"
            alt="Explore tours across Northeast India"
            fill
            priority
            className="object-cover"
          />
          {/* Subtle dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative container mx-auto px-4 md:px-8 py-24 md:py-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                All Tours & Experiences
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover all our adventures, festivals, and special activities in Northeast India
              </p>
              
              {/* Quick Stats - Horizontally Scrollable */}
              <div className="overflow-x-auto mt-8">
                <div className="flex gap-4 justify-center md:justify-center min-w-max px-4 md:px-0">
                  <div className="flex items-center gap-2 bg-white/80 dark:bg-accent-800/80 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-200/50 whitespace-nowrap">
                    <Grid3X3 className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-medium">{tourStats.total} Tours</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 dark:bg-accent-800/80 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-200/50 whitespace-nowrap">
                    <TrendingUp className="h-4 w-4 text-secondary-600" />
                    <span className="text-sm font-medium">{tourStats.statuses.trending || 0} Trending</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 dark:bg-accent-800/80 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-200/50 whitespace-nowrap">
                    <Calendar className="h-4 w-4 text-accent-600" />
                    <span className="text-sm font-medium">{tourStats.statuses.upcoming || 0} Upcoming</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Main Content Section */}
      <div className="relative w-full">
        
        {/* Search and Filter Section */}
        <div className="relative container mx-auto px-4 py-8">
          <div className="bg-white/80 dark:bg-accent-900/80 backdrop-blur-xl rounded-[2rem] border border-primary-200/50 dark:border-white/10 p-6 shadow-glow dark:shadow-none">
            {/* Search Bar */}
          <div className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tours, destinations, activities..."
                value={filters.searchQuery || ''}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => filters.searchQuery && filters.searchQuery.length >= 2 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-accent-800 border border-primary-200/50 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>
            
            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-accent-800 border border-primary-200/50 dark:border-white/10 rounded-xl shadow-lg z-50"
                >
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setFilters(prev => ({ ...prev, searchQuery: suggestion }));
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-primary-50 dark:hover:bg-accent-700 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filter Button - Both Mobile and Desktop */}
          <div className="mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-xl border border-primary-200/50 dark:border-primary-700/50 hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", showFilters && "rotate-180")} />
            </button>
          </div>

          {/* Filter Content */}
          <div className={cn(
            "space-y-6 transition-all duration-300 overflow-hidden",
            showFilters || "md:block",
            !showFilters && "md:block max-h-0 md:max-h-none"
          )}>
            {/* Quick Filters - Horizontally Scrollable on Mobile */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Quick Filters</h3>
              <div className="overflow-x-auto">
                <div className="flex gap-2 min-w-max pb-2">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, status: 'trending' }))}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 rounded-full border border-orange-200/50 dark:border-orange-700/50 hover:from-orange-200 hover:to-red-200 dark:hover:from-orange-800/40 dark:hover:to-red-800/40 transition-all text-xs font-medium whitespace-nowrap"
                  >
                    🔥 Trending Adventures
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, status: 'featured' }))}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-700 dark:text-yellow-300 rounded-full border border-yellow-200/50 dark:border-yellow-700/50 hover:from-yellow-200 hover:to-amber-200 dark:hover:from-yellow-800/40 dark:hover:to-amber-800/40 transition-all text-xs font-medium whitespace-nowrap"
                  >
                    ⭐ Featured Tours
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, status: 'upcoming' }))}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-full border border-green-200/50 dark:border-green-700/50 hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-800/40 dark:hover:to-emerald-800/40 transition-all text-xs font-medium whitespace-nowrap"
                  >
                    🎉 Upcoming Festivals
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, category: 'Adventure' as TourCategory }))}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/50 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-800/40 dark:hover:to-cyan-800/40 transition-all text-xs font-medium whitespace-nowrap"
                  >
                    🏔️ Adventure Tours
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main Filter Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <select
                  value={filters.category || 'all'}
                  onChange={(e) => updateFilter('category', e.target.value as TourCategory | 'all')}
                  title="Select tour category"
                  className="w-full px-4 py-2.5 bg-white dark:bg-accent-800 border border-primary-200/50 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm appearance-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Nature">Nature</option>
                  <option value="Pilgrimage">Pilgrimage</option>
                  <option value="Festival">Festival</option>
                  <option value="BikeTrip">Bike Trip</option>
                  <option value="FruitFestival">Fruit Festival</option>
                  <option value="CampingTrip">Camping Trip</option>
                </select>
              </div>

              {/* Status Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <select
                  value={filters.status || 'all'}
                  onChange={(e) => updateFilter('status', e.target.value as TourStatus | 'all')}
                  title="Select tour status"
                  className="w-full px-4 py-2.5 bg-white dark:bg-accent-800 border border-primary-200/50 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="trending">Trending</option>
                  <option value="featured">Featured</option>
                </select>
              </div>

              {/* Difficulty Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Difficulty</label>
                <select
                  value={filters.difficulty || 'all'}
                  onChange={(e) => updateFilter('difficulty', e.target.value as TourDifficulty | 'all')}
                  title="Select tour difficulty"
                  className="w-full px-4 py-2.5 bg-white dark:bg-accent-800 border border-primary-200/50 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm appearance-none cursor-pointer"
                >
                  <option value="all">All Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
                </select>
              </div>
            </div>
            
            {/* Clear All Filters */}
            <div className="flex justify-center pt-2">
              <button
                onClick={clearFilters}
                className="px-6 py-2 text-sm text-muted-foreground hover:text-primary-600 transition-colors border border-primary-200/50 dark:border-white/10 rounded-full hover:bg-primary-50 dark:hover:bg-accent-800/50"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Sort and View Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-primary-200/50 dark:border-white/10">
            <div className="flex items-center gap-4">
              {/* Sort By - Improved styling */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortCriteria)}
                  aria-label="Sort tours"
                  title="Sort tours by different criteria"
                  className="px-3 py-1.5 bg-white dark:bg-accent-800 border border-primary-200/50 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="duration-asc">Duration: Short to Long</option>
                  <option value="duration-desc">Duration: Long to Short</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* View Mode Toggle - Enhanced styling */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">View:</span>
              <div className="flex items-center bg-white dark:bg-accent-800 border border-primary-200/50 dark:border-white/10 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  title="Switch to grid view"
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === 'grid' ? "bg-primary-100 dark:bg-primary-900 text-primary-600" : "text-muted-foreground hover:text-primary-600"
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  title="Switch to list view"
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === 'list' ? "bg-primary-100 dark:bg-primary-900 text-primary-600" : "text-muted-foreground hover:text-primary-600"
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Results Section */}
        <div className="relative container mx-auto px-4 pb-16">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing {filteredAndSortedTours.length} of {tourStats.total} tours
            </p>
          </div>

          {/* Tours Grid/List */}
          <AnimatePresence mode="wait">
            {filteredAndSortedTours.length > 0 ? (
              <motion.div
                key={`${viewMode}-${filteredAndSortedTours.length}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "space-y-6"
                )}
              >
                {filteredAndSortedTours.map((tour, index) => (
                  <div key={tour.id}>
                    {isFestivalTour(tour) ? (
                      <FestivalTourCard tour={tour} index={index} />
                    ) : (
                      <TourCard tour={tour} index={index} />
                    )}
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No tours found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
