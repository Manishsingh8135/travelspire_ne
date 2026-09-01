// src/components/layout/advanced-navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Menu, X } from "lucide-react";
import { DesktopNavigation } from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";
import { Logo } from "../logo/logo";

export const AdvancedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Always the dark nav: white type, brass accent, ink panels. At the top of
  // the page the bar itself is empty so full-bleed heroes show through; once
  // the page has moved — or the mobile drawer is open — it fills with the
  // ink scrolled colour. Tone is published as a data attribute so children
  // read CSS variables and never branch on markup.
  const isSolid = isScrolled || isOpen;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, isOpen]);

  // Close the drawer on navigation, and match the bar to the new page's
  // scroll position (Next.js usually resets to top, but not always).
  useEffect(() => {
    setIsOpen(false);
    setActive(null);
    setIsScrolled(window.scrollY > 20);
  }, [pathname]);

  return (
    <header
      data-nav-tone="dark"
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        isSolid
          ? "border-[color:var(--nav-border)] bg-[color:var(--nav-scrolled-bg)] shadow-[var(--nav-scrolled-shadow)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <nav aria-label="Primary navigation">
          {/* Navbar content */}
          <div className="flex h-[72px] items-center justify-between md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <DesktopNavigation active={active} setActive={setActive} />
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={
                    isOpen ? "Close navigation menu" : "Open navigation menu"
                  }
                  aria-expanded={isOpen}
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-[10px] border border-[color:var(--nav-border-strong)]",
                    "text-[color:var(--nav-fg)] hover:border-[color:var(--nav-fg-strong)] hover:text-[color:var(--nav-fg-strong)]",
                    "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--nav-ring)]",
                  )}
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          {isMobile && (
            <MobileNavigation
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              active={active}
              setActive={setActive}
            />
          )}
        </nav>
      </div>
    </header>
  );
};

export default AdvancedNavbar;
