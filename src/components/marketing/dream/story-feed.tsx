"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StoryCard, type Story } from "./story-card";
import { cn } from "@/lib/cn";

const SEGMENTS = 4;

/**
 * The horizontal Dream feed — scroll-snap rail of story cards with carousel
 * arrows and a segmented progress indicator that tracks scroll position.
 * Native scroll = touch/trackpad/keyboard all work; arrows are an enhancement.
 */
export function StoryFeed({ stories }: { stories: Story[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector("a");
    const amount = card ? card.clientWidth + 16 : el.clientWidth * 0.8;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * amount, behavior: reduce ? "auto" : "smooth" });
  };

  const activeSeg = Math.min(SEGMENTS - 1, Math.round(progress * (SEGMENTS - 1)));

  return (
    <div>
      <div
        ref={railRef}
        onScroll={update}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pt-1 pb-3 [scrollbar-width:none] md:scroll-px-10 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {stories.map((s, i) => (
          <StoryCard key={s.headline} story={s} index={i} />
        ))}
      </div>

      <div className="mx-auto mt-7 flex max-w-7xl items-center justify-between px-5 md:px-10">
        <div className="flex items-center gap-1.5" aria-hidden>
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1 rounded-full transition-all duration-300 ease-out",
                i === activeSeg ? "w-8 bg-secondary" : "w-4 bg-mist-50/20",
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={atStart}
            aria-label="Previous stories"
            className="flex size-11 items-center justify-center rounded-full border border-mist-50/30 text-mist-50 transition-colors duration-200 ease-out hover:bg-mist-50/10 disabled:pointer-events-none disabled:opacity-25"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={atEnd}
            aria-label="Next stories"
            className="flex size-11 items-center justify-center rounded-full border border-mist-50/30 text-mist-50 transition-colors duration-200 ease-out hover:bg-mist-50/10 disabled:pointer-events-none disabled:opacity-25"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
