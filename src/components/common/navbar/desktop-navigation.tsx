"use client";

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
}

const SubMenuItem = ({ item }: { item: NavigationItem }) => (
  <Link
    href={item.href}
    className={cn(
      "mx-2 my-1 block border-l-2 border-transparent px-4 py-3",
      "text-sm group cursor-pointer",
      "text-white/70 hover:border-[#d8c59d] hover:bg-white/[0.05] hover:text-white",
      "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8]",
    )}
  >
    <div className="flex items-start gap-3">
      {item.icon && (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04]">
          <item.icon className="h-5 w-5 text-[#d8c59d]" />
        </div>
      )}
      <div className="flex-1 min-w-0 overflow-hidden">
        <div className="truncate font-semibold text-white transition-colors">
          {item.name}
        </div>
        {item.description && (
          <div className="mt-0.5 line-clamp-2 break-words text-xs text-white/[0.45]">
            {item.description}
          </div>
        )}
      </div>
    </div>
  </Link>
);

const NavItem = ({
  item,
  isActive,
}: {
  item: NavigationItem;
  isActive: boolean;
}) => {
  const content = (
    <span className="flex items-center gap-2">
      {item.icon && <item.icon className="h-4 w-4" />}
      {item.name}
      {item.submenu && <ChevronDown className="h-4 w-4 text-white/[0.45]" />}
    </span>
  );

  const buttonClassName = cn(
    "border-b border-transparent px-3 py-2 text-sm font-medium lg:px-4",
    "transition-colors duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8]",
    "inline-flex items-center justify-center",
    "text-white/[0.72] hover:border-[#d8c59d]/75 hover:text-white",
  );

  // If there's a submenu, render as a button
  if (item.submenu) {
    return (
      <div className="relative block">
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={isActive}
          className={buttonClassName}
        >
          {content}
        </button>
      </div>
    );
  }

  // If no submenu, render as a Link
  return (
    <div className="relative block">
      <Link href={item.href} className={buttonClassName}>
        {content}
      </Link>
    </div>
  );
};

export const DesktopNavigation = ({
  active,
  setActive,
}: DesktopNavigationProps) => {
  return (
    <div className="hidden items-center gap-1 md:flex">
      {navigationData.primary.map((item) => (
        <div
          key={item.name}
          className="relative group"
          onMouseEnter={() => setActive(item.name)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => item.submenu && setActive(item.name)}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            ) {
              setActive(null);
            }
          }}
        >
          <NavItem item={item} isActive={active === item.name} />

          {/* Dropdown Menu */}
          {item.submenu && (
            <AnimatePresence>
              {active === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className={cn(
                    "absolute top-full left-0 mt-2",
                    item.name === "Permits" ? "w-80" : "w-64",
                    "rounded-[14px] bg-[#07110f]/[0.98]",
                    "border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl",
                    "overflow-hidden",
                  )}
                >
                  {/* Permit navigation header */}
                  {item.name === "Permits" && (
                    <div className="border-b border-white/10 bg-white/[0.03] px-4 py-3">
                      <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                        {item.icon && (
                          <item.icon className="h-4 w-4 text-[#d8c59d]" />
                        )}
                        State Permit Guides
                      </h3>
                      <p className="mt-0.5 text-xs text-white/[0.45]">
                        Complete information for each state
                      </p>
                    </div>
                  )}

                  <div className="py-2 max-h-[70vh] overflow-y-auto">
                    {item.submenu.map((subitem) => (
                      <div key={subitem.name}>
                        <SubMenuItem item={subitem} />
                      </div>
                    ))}
                  </div>

                  {/* Footer for Permits */}
                  {item.name === "Permits" && (
                    <div className="border-t border-white/10 bg-white/[0.03] px-4 py-3">
                      <Link
                        href="/permits"
                        className="group flex items-center gap-1 text-xs font-medium text-[#d8c59d] hover:text-white"
                      >
                        View All Permit Information
                        <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
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
      <div className="ml-4 flex items-center border-l border-white/[0.15] pl-4">
        {navigationData.secondary.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            aria-label={item.name}
            className={cn(
              "mx-0.5 grid h-9 w-9 place-items-center rounded-[10px]",
              "text-white/70 hover:bg-white/[0.08] hover:text-white",
              "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8]",
            )}
          >
            {item.icon && <item.icon className="h-5 w-5" />}
          </Link>
        ))}
      </div>
    </div>
  );
};
