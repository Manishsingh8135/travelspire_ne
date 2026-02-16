"use client"

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NavigationItem } from "@/types/navbar/navigation";
import { navigationData } from "@/data/navbar/navigation";

interface DesktopNavigationProps {
  active: string | null;
  setActive: (name: string | null) => void;
  isScrolled: boolean;
}

const SubMenuItem = ({ item }: { item: NavigationItem }) => (
  <Link href={item.href}>
    <motion.div
      whileHover={{ x: 4, scale: 1.02 }}
      className={cn(
        "block px-4 py-3 rounded-lg mx-2 my-1",
        "text-sm group cursor-pointer",
        "text-foreground/80 hover:text-foreground",
        "hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50",
        "dark:hover:from-primary-950/50 dark:hover:to-secondary-950/50",
        "transition-all duration-300",
        "border border-transparent hover:border-primary-200/50 dark:hover:border-primary-800/50"
      )}
    >
      <div className="flex items-start gap-3">
        {item.icon && (
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <item.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
        )}
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="font-semibold text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
            {item.name}
          </div>
          {item.description && (
            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2 break-words">
              {item.description}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  </Link>
);

const NavItem = ({ item }: {
  item: NavigationItem;
}) => {
  const content = (
    <span className="flex items-center gap-2">
      {item.icon && <item.icon className="h-4 w-4" />}
      {item.name}
      {item.submenu && (
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      )}
    </span>
  );

  const buttonClassName = cn(
    "px-5 py-2.5 rounded-full text-sm font-medium min-w-[100px]",
    "transition-all duration-300",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
    "inline-flex items-center justify-center",
    "mx-1",
    "text-foreground/80 hover:text-foreground",
    "hover:bg-primary-50 dark:hover:bg-primary-950/50"
  );

  // If there's a submenu, render as a button
  if (item.submenu) {
    return (
      <div className="relative block">
        <motion.button className={buttonClassName}>
          {content}
        </motion.button>
      </div>
    );
  }

  // If no submenu, render as a Link
  return (
    <div className="relative block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative"
      >
        <Link href={item.href} className={buttonClassName}>
          {content}
        </Link>
      </motion.div>
    </div>
  );
};

export const DesktopNavigation = ({ active, setActive }: DesktopNavigationProps) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {navigationData.primary.map((item) => (
        <div 
          key={item.name} 
          className="relative group"
          onMouseEnter={() => setActive(item.name)}
          onMouseLeave={() => setActive(null)}
        >
          <NavItem item={item} />

          {/* Dropdown Menu */}
          {item.submenu && (
            <AnimatePresence>
              {active === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    bounce: 0.2,
                    duration: 0.4 
                  }}
                  className={cn(
                    "absolute top-full left-0 mt-2",
                    item.name === "Permits" ? "w-80" : "w-64",
                    "rounded-2xl bg-background",
                    "backdrop-blur-xl shadow-2xl",
                    "ring-1 ring-primary-200/50 dark:ring-primary-800/50",
                    "border border-primary-200/50 dark:border-primary-800/50",
                    "overflow-hidden"
                  )}
                  style={{
                    boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  {/* Gradient header for Permits */}
                  {item.name === "Permits" && (
                    <div className="px-4 py-3 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10 border-b border-primary-100/20 dark:border-primary-900/20">
                      <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                        {item.icon && <item.icon className="h-4 w-4 text-primary-600 dark:text-primary-400" />}
                        State Permit Guides
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Complete information for each state</p>
                    </div>
                  )}
                  
                  <div className="py-2 max-h-[70vh] overflow-y-auto">
                    {item.submenu.map((subitem, index) => (
                      <motion.div
                        key={subitem.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <SubMenuItem item={subitem} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer for Permits */}
                  {item.name === "Permits" && (
                    <div className="px-4 py-3 bg-gradient-to-r from-primary-50/50 to-secondary-50/50 dark:from-primary-950/30 dark:to-secondary-950/30 border-t border-primary-100/20 dark:border-primary-900/20">
                      <Link href="/permits" className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center gap-1 group">
                        View All Permit Information
                        <ChevronDown className="h-3 w-3 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      ))}

      {/* Secondary Navigation */}
      <div className="flex items-center pl-6 ml-6 border-l border-primary-200/20 dark:border-primary-800/20">
        {navigationData.secondary.map((item) => (
          <Link
            key={item.name}
            href={item.href}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "p-2 rounded-full",
                "text-foreground/80 hover:text-foreground",
                "hover:bg-primary-50 dark:hover:bg-primary-950/50",
                "transition-all duration-200",
                "mx-1"
              )}
            >
              {item.icon && <item.icon className="h-5 w-5" />}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};