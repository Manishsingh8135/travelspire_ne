// hooks/use-scroll.ts
"use client";

import { useState, useEffect, useCallback } from 'react';

interface ScrollOptions {
  offset?: number;
  delay?: number;
  bothDirections?: boolean;
}

export function useScroll(threshold: number = 0, options: ScrollOptions = {}) {
  const { offset = 0, delay = 50, bothDirections = false } = options;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [prevScrollY, setPrevScrollY] = useState(0);

  // Debounce the scroll handler for better performance
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleScroll = useCallback(
    debounce(() => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (bothDirections) {
        if (currentScrollY > prevScrollY) {
          setScrollDirection('down');
        } else if (currentScrollY < prevScrollY) {
          setScrollDirection('up');
        }
        setPrevScrollY(currentScrollY);
      }

      // Apply offset to threshold
      const effectiveThreshold = Math.max(0, threshold - offset);
      
      // Update scroll state
      setIsScrolled(currentScrollY > effectiveThreshold);
    }, delay),
    [threshold, offset, prevScrollY, bothDirections, delay]
  );

  useEffect(() => {
    // Check initial scroll position
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    isScrolled,
    scrollDirection,
    scrollY: typeof window !== 'undefined' ? window.scrollY : 0,
    prevScrollY
  };
}

// Example usage:
/*
const { isScrolled, scrollDirection } = useScroll(20, {
  offset: 50,         // Additional offset to apply to threshold
  delay: 50,          // Debounce delay in milliseconds
  bothDirections: true // Track both up and down scroll
});
*/