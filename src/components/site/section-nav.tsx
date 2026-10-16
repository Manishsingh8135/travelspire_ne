"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* Sticky in-page navigation for long pages (tours, guides, permits). Sits
   under the site header, scrolls sideways on phones, and marks the section
   currently in view. Plain anchor links, so it works before hydration. */
export type SectionNavItem = { id: string; label: string };

export function SectionNav({ items, action, className }: { items: SectionNavItem[]; action?: React.ReactNode; className?: string }) {
  const [active, setActive] = useState(items[0]?.id);

  // The current section is the last one whose top has passed under the
  // sticky bars. Measured on scroll (rAF-throttled), so it is right on load,
  // after anchor jumps and when scrolling back up.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top - 160 <= 0) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className={cn("sticky top-16 z-30 border-b border-line bg-canvas/90 backdrop-blur-md", className)}
    >
      <div className="mx-auto flex w-full max-w-page items-center gap-6 px-5 sm:px-8 lg:px-10">
        <ul className="-mx-1 flex flex-1 gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-control px-3 font-ui text-small font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                  active === item.id ? "bg-fg/[0.07] text-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {action ? <div className="hidden shrink-0 md:block">{action}</div> : null}
      </div>
    </nav>
  );
}
