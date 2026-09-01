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

  // The homepage hero runs full-bleed underneath the navbar, so the bar has
  // to stay light-on-dark while it sits over the photograph and only flip to
  // cream once the page has scrolled onto paper. Every other route is dark
  // throughout. The tone is published as a data attribute and the nav
  // internals read it through CSS variables, so no child branches on markup.
  const isHome = pathname === "/";
  const tone = isHome && isScrolled ? "light" : "dark";

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

  // A route change while the drawer is open would otherwise leave the body
  // scroll-locked.
  useEffect(() => {
    setIsOpen(false);
    setActive(null);
  }, [pathname]);

  return (
    <header
      data-nav-tone={tone}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        isScrolled
          ? "border-[color:var(--nav-border)] bg-[color:var(--nav-scrolled-bg)] shadow-[var(--nav-scrolled-shadow)] backdrop-blur-xl"
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
