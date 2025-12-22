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
  <Link
    href={item.href}
    className={cn(
      "block w-full px-4 py-3",
      "text-sm",
      "text-foreground/80 hover:text-foreground",
      "hover:bg-primary-50 dark:hover:bg-primary-950/50",
      "transition-all duration-200"
    )}
  >
    <span className="flex items-center gap-3">
      {item.icon && <item.icon className="h-5 w-5 text-primary-500" />}
      <div>
        <div className="font-medium">{item.name}</div>
        {item.description && (
          <div className="text-sm text-muted-foreground">{item.description}</div>
        )}
      </div>
    </span>
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ 
                    type: "spring", 
                    bounce: 0.3,
                    duration: 0.3 
                  }}
                  className={cn(
                    "absolute top-full left-0 mt-2 w-64",
                    "rounded-xl bg-background/95",
                    "backdrop-blur-xl shadow-glow-lg",
                    "ring-1 ring-primary-100/20 dark:ring-primary-900/20",
                    "border border-primary-100/20 dark:border-primary-900/20",
                    "overflow-hidden"
                  )}
                >
                  <div className="py-2">
                    {item.submenu.map((subitem) => (
                      <SubMenuItem key={subitem.name} item={subitem} />
                    ))}
                  </div>
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