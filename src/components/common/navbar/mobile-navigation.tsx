// src/components/layout/mobile-navigation.tsx
"use client"

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NavigationItem } from "@/types/navbar/navigation";
import { navigationData } from "@/data/navbar/navigation";

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  active: string | null;
  setActive: (value: string | null) => void;
}

const MobileNavItem = ({ 
  item, 
  active, 
  setActive,
  setIsOpen 
}: {
  item: NavigationItem;
  active: string | null;
  setActive: (value: string | null) => void;
  setIsOpen: (value: boolean) => void;
}) => {
  const isZiroFestival = item.name === "Ziro Festival";

  if (item.submenu) {
    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setActive(active === item.name ? null : item.name)}
        className={cn(
          "w-full px-4 py-3 rounded-lg",
          "flex items-center justify-between",
          "text-foreground/80 hover:text-foreground",
          "hover:bg-primary-50 dark:hover:bg-primary-950/50",
          "transition-all duration-200"
        )}
      >
        <span className="flex items-center gap-2">
          {item.icon && <item.icon className="h-5 w-5 text-primary-500" />}
          <span className="font-medium">{item.name}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            active === item.name && "rotate-180"
          )}
        />
      </motion.button>
    );
  }

  return (
    <div className={cn("relative", isZiroFestival && "mb-2")}>
      {isZiroFestival && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-xl blur-sm"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      <Link
        href={item.href}
        onClick={() => setIsOpen(false)}
        className={cn(
          "relative w-full px-4 py-3 rounded-lg",
          "flex items-center justify-between",
          "transition-all duration-300",
          isZiroFestival ? [
            "bg-gradient-to-r from-amber-500/10 to-orange-500/10",
            "border border-amber-400/20",
            "text-amber-600 dark:text-amber-400",
            "hover:from-amber-500/20 hover:to-orange-500/20",
            "hover:border-amber-400/40",
            "backdrop-blur-sm"
          ] : [
            "text-foreground/80 hover:text-foreground",
            "hover:bg-primary-50 dark:hover:bg-primary-950/50"
          ]
        )}
      >
        <span className="flex items-center gap-2">
          {item.icon && <item.icon className={cn("h-5 w-5", isZiroFestival ? "text-amber-400" : "text-primary-500")} />}
          <span className="font-medium">{item.name}</span>
        </span>
        {isZiroFestival && (
          <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full animate-pulse">
            LIVE
          </span>
        )}
      </Link>
    </div>
  );
};

const MobileNavigation = ({ isOpen, setIsOpen, active, setActive }: MobileNavigationProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "md:hidden",
          "fixed top-[64px] left-0 right-0 z-50",
          "bg-background/95",
          "border-b border-primary-100/20 dark:border-primary-900/20",
          "shadow-glow-lg",
          "max-h-[calc(100vh-64px)] overflow-y-auto"
        )}
      >
        <div className="py-4 space-y-1 px-2">
          {navigationData.primary.map((item) => (
            <div key={item.name} className="px-2">
              <MobileNavItem
                item={item}
                active={active}
                setActive={setActive}
                setIsOpen={setIsOpen}
              />

              {/* Mobile Submenu */}
              {item.submenu && (
                <AnimatePresence>
                  {active === item.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-primary-50/50 dark:bg-primary-950/50 mt-1 rounded-lg overflow-hidden"
                    >
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "block px-6 py-3",
                            "text-base text-foreground/80 hover:text-foreground",
                            "hover:bg-primary-100/50 dark:hover:bg-primary-900/50",
                            "transition-all duration-200"
                          )}
                        >
                          <span className="flex items-center gap-3">
                            {subitem.icon && (
                              <subitem.icon className="h-5 w-5 text-primary-500" />
                            )}
                            <div>
                              <div className="font-medium">{subitem.name}</div>
                              {subitem.description && (
                                <div className="text-sm text-muted-foreground">
                                  {subitem.description}
                                </div>
                              )}
                            </div>
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}

          {/* Mobile Secondary Navigation */}
          <div className="px-4 py-4 mt-4 border-t border-primary-200/20 dark:border-primary-800/20">
            <div className="grid grid-cols-3 gap-4">
              {navigationData.secondary.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex flex-col items-center",
                    "text-sm text-foreground/80 hover:text-foreground",
                    "hover:bg-primary-50 dark:hover:bg-primary-950/50",
                    "transition-all duration-200",
                    "rounded-lg p-4"
                  )}
                >
                  {item.icon && <item.icon className="h-6 w-6 mb-1" />}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MobileNavigation;