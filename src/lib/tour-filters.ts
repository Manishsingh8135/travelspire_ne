// lib/tour-filters.ts
import { 
  Tour, 
  TourFilters, 
  TourCategory, 
  TourStatus,
  getTourCategory,
  getTourStatus,
  getTourPrice,
  getTourDuration,
  isRegularTour,
  isFestivalTour,
  isSpecialActivityTour
} from "@/types/tours/tour";
import { upcomingTours } from "@/data/tours";

// Filter tours based on provided criteria
export function filterTours(tours: Tour[], filters: TourFilters): Tour[] {
  return tours.filter(tour => {
    // Category filter
    if (filters.category && filters.category !== 'all') {
      const tourCategory = getTourCategory(tour);
      if (tourCategory !== filters.category) return false;
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      const tourStatuses = getTourStatus(tour);
      if (!tourStatuses.includes(filters.status)) return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const tourPrice = getTourPrice(tour);
      if (tourPrice.min > filters.priceRange.max || tourPrice.max < filters.priceRange.min) {
        return false;
      }
    }

    // Duration filter
    if (filters.duration) {
      const tourDuration = getTourDuration(tour);
      if (tourDuration.min > filters.duration.max || tourDuration.max < filters.duration.min) {
        return false;
      }
    }

    // Difficulty filter
    if (filters.difficulty && filters.difficulty !== 'all') {
      if (tour.difficulty !== filters.difficulty) return false;
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = [
        tour.title,
        tour.subtitle,
        tour.overview,
        tour.location,
        ...tour.highlights,
        ...(tour.tags || [])
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) return false;
    }

    return true;
  });
}

// Get all unique categories from tours
export function getTourCategories(tours: Tour[]): TourCategory[] {
  const categories = new Set<TourCategory>();
  tours.forEach(tour => {
    categories.add(getTourCategory(tour));
  });
  return Array.from(categories).sort();
}

// Get all unique statuses from tours
export function getTourStatuses(tours: Tour[]): TourStatus[] {
  const statuses = new Set<TourStatus>();
  tours.forEach(tour => {
    getTourStatus(tour).forEach(status => statuses.add(status));
  });
  return Array.from(statuses).sort();
}

// Get price range from all tours
export function getPriceRange(tours: Tour[]): { min: number; max: number } {
  if (tours.length === 0) return { min: 0, max: 100000 };
  
  let min = Infinity;
  let max = 0;
  
  tours.forEach(tour => {
    const price = getTourPrice(tour);
    min = Math.min(min, price.min);
    max = Math.max(max, price.max);
  });
  
  return { min, max };
}

// Get duration range from all tours
export function getDurationRange(tours: Tour[]): { min: number; max: number } {
  if (tours.length === 0) return { min: 1, max: 10 };
  
  let min = Infinity;
  let max = 0;
  
  tours.forEach(tour => {
    const duration = getTourDuration(tour);
    min = Math.min(min, duration.min);
    max = Math.max(max, duration.max);
  });
  
  return { min, max };
}

// Sort tours by different criteria
export type SortCriteria = 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc' | 'popularity' | 'newest';

export function sortTours(tours: Tour[], criteria: SortCriteria): Tour[] {
  return [...tours].sort((a, b) => {
    switch (criteria) {
      case 'price-asc':
        return getTourPrice(a).min - getTourPrice(b).min;
      case 'price-desc':
        return getTourPrice(b).min - getTourPrice(a).min;
      case 'duration-asc':
        return getTourDuration(a).min - getTourDuration(b).min;
      case 'duration-desc':
        return getTourDuration(b).min - getTourDuration(a).min;
      case 'popularity':
        // Sort by featured, trending, then upcoming
        const aScore = (a.featured ? 4 : 0) + (a.trending ? 2 : 0) + (a.upcoming ? 1 : 0);
        const bScore = (b.featured ? 4 : 0) + (b.trending ? 2 : 0) + (b.upcoming ? 1 : 0);
        return bScore - aScore;
      case 'newest':
        // Sort by creation date if available, otherwise by featured status
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });
}

// Get tours by specific criteria (convenience functions)
export function getFeaturedTours(tours: Tour[] = upcomingTours): Tour[] {
  return tours.filter(tour => tour.featured);
}

export function getUpcomingTours(tours: Tour[] = upcomingTours): Tour[] {
  return tours.filter(tour => tour.upcoming);
}

export function getTrendingTours(tours: Tour[] = upcomingTours): Tour[] {
  return tours.filter(tour => tour.trending);
}

export function getToursByCategory(category: TourCategory, tours: Tour[] = upcomingTours): Tour[] {
  return tours.filter(tour => getTourCategory(tour) === category);
}

// Get tour statistics for dashboard/admin purposes
export function getTourStatistics(tours: Tour[] = upcomingTours) {
  const categories = getTourCategories(tours);
  const statuses = getTourStatuses(tours);
  const priceRange = getPriceRange(tours);
  const durationRange = getDurationRange(tours);
  
  const categoryStats = categories.reduce((acc, category) => {
    acc[category] = getToursByCategory(category, tours).length;
    return acc;
  }, {} as Record<TourCategory, number>);
  
  const statusStats = statuses.reduce((acc, status) => {
    acc[status] = tours.filter(tour => getTourStatus(tour).includes(status)).length;
    return acc;
  }, {} as Record<TourStatus, number>);
  
  return {
    total: tours.length,
    categories: categoryStats,
    statuses: statusStats,
    priceRange,
    durationRange,
    regularTours: tours.filter(isRegularTour).length,
    festivalTours: tours.filter(isFestivalTour).length,
    specialActivityTours: tours.filter(isSpecialActivityTour).length
  };
}

// Search suggestions based on tour data
export function getSearchSuggestions(query: string, tours: Tour[] = upcomingTours): string[] {
  if (!query || query.length < 2) return [];
  
  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();
  
  tours.forEach(tour => {
    // Add matching titles
    if (tour.title.toLowerCase().includes(queryLower)) {
      suggestions.add(tour.title);
    }
    
    // Add matching locations
    if (tour.location.toLowerCase().includes(queryLower)) {
      suggestions.add(tour.location);
    }
    
    // Add matching tags
    tour.tags?.forEach(tag => {
      if (tag.toLowerCase().includes(queryLower)) {
        suggestions.add(tag.replace('-', ' '));
      }
    });
    
    // Add matching highlights
    tour.highlights.forEach(highlight => {
      if (highlight.toLowerCase().includes(queryLower)) {
        suggestions.add(highlight);
      }
    });
  });
  
  return Array.from(suggestions).slice(0, 5); // Limit to 5 suggestions
}
