// src/components/layout/advanced-navbar.tsx
"use client"

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/theme/theme-button/toggle-button";
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isOpen]);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "backdrop-blur-xl"
      )}
    >
      {/* Top border gradient */}
      <div className="absolute inset-x-0 top-0 h-[1px] gradient-primary opacity-20" />

      {/* Main container */}
      <div className={cn(
        "mx-auto transition-all duration-300",
        !isMobile && "px-4 py-2 mt-3",
        !isMobile && (isScrolled 
          ? "max-w-[95%] rounded-2xl border border-primary-100/20 dark:border-primary-900/20 shadow-glow"
          : "max-w-7xl")
      )}>
        <motion.nav 
          className={cn(
            "mx-auto",
            !isMobile && "px-4 rounded-xl bg-background/60 backdrop-blur-xl",
            isMobile && (isScrolled ? "bg-background/80" : "bg-transparent")
          )}
          animate={{
            scale: isScrolled ? 1.01 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          {/* Navbar content */}
          <div className="h-16 flex items-center justify-between sm:px-4">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                
                className="text-2xl font-bold text-gradient-primary"
              >
                <Logo/>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <DesktopNavigation 
                active={active}
                setActive={setActive}
                isScrolled={isScrolled}
              />
            )}

            {/* Mobile Menu Button and Theme Toggle */}
            {isMobile && (
              <div className="flex items-center gap-2">
                <ModeToggle />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(!isOpen)}
                  className={cn(
                    "p-2 rounded-full",
                    "text-foreground/80 hover:text-foreground",
                    "hover:bg-primary-50 dark:hover:bg-primary-950/50",
                    "transition-all duration-200"
                  )}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.button>
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
        </motion.nav>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] gradient-primary opacity-20" />
    </motion.header>
  );
};

export default AdvancedNavbar;