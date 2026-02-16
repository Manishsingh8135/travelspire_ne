"use client";

import { useState, useEffect, useCallback } from "react";

interface ScrollOptions {
  offset?: number;
  delay?: number;
  bothDirections?: boolean;
}

type DebouncedFunction<T extends (...args: unknown[]) => void> = (
  ...args: Parameters<T>
) => void;

export function useScroll(threshold: number = 0, options: ScrollOptions = {}) {
  const { offset = 0, delay = 50, bothDirections = false } = options;

  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [prevScrollY, setPrevScrollY] = useState(0);

  const debounce = <T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
  ): DebouncedFunction<T> => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (bothDirections) {
      if (currentScrollY > prevScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection("up");
      }
      setPrevScrollY(currentScrollY);
    }

    const effectiveThreshold = Math.max(0, threshold - offset);
    setIsScrolled(currentScrollY > effectiveThreshold);
  }, [bothDirections, prevScrollY, threshold, offset]);

  const debouncedHandleScroll = useCallback(
    () => debounce(handleScroll, delay)(),
    [handleScroll, delay]
  );

  useEffect(() => {
    debouncedHandleScroll();
    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  return {
    isScrolled,
    scrollDirection,
    scrollY: typeof window !== "undefined" ? window.scrollY : 0,
    prevScrollY,
  };
}
