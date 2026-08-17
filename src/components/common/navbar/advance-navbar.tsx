// src/components/layout/advanced-navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        isScrolled
          ? "border-white/10 bg-[#06100e]/95 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          : "border-transparent bg-gradient-to-b from-black/[0.65] via-black/25 to-transparent",
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
                    "grid h-10 w-10 place-items-center rounded-[10px] border border-white/20",
                    "text-white/[0.85] hover:border-white/[0.45] hover:text-white",
                    "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8]",
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
