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
    <Link
      href={item.href}
      onClick={() => setIsOpen(false)}
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
    </Link>
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
                      className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 mt-1 rounded-lg overflow-hidden border border-primary-200/50 dark:border-primary-800/50"
                    >
                      {/* Header for Permits */}
                      {item.name === "Permits" && (
                        <div className="px-4 py-2 bg-primary-100/30 dark:bg-primary-900/30 border-b border-primary-200/30 dark:border-primary-800/30">
                          <p className="text-xs font-semibold text-primary-700 dark:text-primary-300">State Permit Guides</p>
                        </div>
                      )}
                      
                      {item.submenu.map((subitem, index) => (
                        <motion.div
                          key={subitem.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={subitem.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block px-4 py-3 mx-2 my-1 rounded-lg",
                              "text-sm text-foreground/80 hover:text-foreground",
                              "hover:bg-white/80 dark:hover:bg-accent-900/80",
                              "transition-all duration-200",
                              "border border-transparent hover:border-primary-200/50 dark:hover:border-primary-800/50"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              {subitem.icon && (
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 flex items-center justify-center flex-shrink-0">
                                  <subitem.icon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0 overflow-hidden">
                                <div className="font-semibold text-foreground truncate">{subitem.name}</div>
                                {subitem.description && (
                                  <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2 break-words">
                                    {subitem.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}

                      {/* Footer for Permits */}
                      {item.name === "Permits" && (
                        <div className="px-4 py-2 bg-primary-100/30 dark:bg-primary-900/30 border-t border-primary-200/30 dark:border-primary-800/30">
                          <Link href="/permits" onClick={() => setIsOpen(false)} className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center gap-1">
                            View All Permit Information →
                          </Link>
                        </div>
                      )}
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