// widget-panel.tsx - Expanded interface panel
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { QuickActions } from "./quick-actions";
import { MessageComposer } from "./message-composer";
import { QuickAction } from "./types";
import { quickActionCategories } from "./data";

interface WidgetPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedActions: QuickAction[];
  customMessage: string;
  onActionToggle: (action: QuickAction) => void;
  onMessageChange: (message: string) => void;
  onSend: () => void;
  isLoading?: boolean;
  className?: string;
}

export function WidgetPanel({
  isOpen,
  onClose,
  selectedActions,
  customMessage,
  onActionToggle,
  onMessageChange,
  onSend,
  isLoading = false,
  className
}: WidgetPanelProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('festivals');

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            className={cn(
              "fixed bottom-20 right-4 z-50",
              "w-[380px] h-[85vh] max-h-[600px]",
              "bg-white dark:bg-gray-900",
              "rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700",
              "overflow-hidden",
              "flex flex-col", // Critical: Flex container for 3 sections
              // Mobile responsive - Better positioning
              "sm:bottom-24 sm:right-6",
              "max-sm:fixed max-sm:inset-x-3 max-sm:bottom-16",
              "max-sm:w-auto max-sm:h-[80vh] max-sm:max-h-[500px] max-sm:rounded-xl",
              "max-md:inset-x-4 max-md:bottom-20 max-md:h-[82vh] max-md:max-h-[550px]",
              className
            )}
          >
            {/* SECTION 1: Header - Compact Fixed Height */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-sm">
                  <Image
                    src="/images/logo/Travelspire_ne_logo_new.png"
                    alt="TravelSpire NE"
                    width={24}
                    height={24}
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                    TravelSpire NE
                  </h3>
                  <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">
                    ● Online now
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </button>
            </div>

            {/* SECTION 2: Content Area - Flexible Space */}
            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
              {/* Quick Actions - Scrollable */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                <div className="text-center mb-3 sm:mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 text-sm sm:text-base">
                    How can we help you today?
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Choose options below or type your message
                  </p>
                </div>

                {/* Categories */}
                {quickActionCategories.map((category) => (
                  <div key={category.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between p-2 sm:p-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base">{category.icon}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
                          {category.title}
                        </span>
                      </div>
                      {expandedCategory === category.id ? (
                        <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      )}
                    </button>

                    {/* Category Actions */}
                    <AnimatePresence>
                      {expandedCategory === category.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-1.5 sm:p-2">
                            <QuickActions
                              actions={category.actions}
                              selectedActions={selectedActions}
                              onActionToggle={onActionToggle}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: Input Area - Fixed Guaranteed Height */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-2.5 sm:p-3 flex-shrink-0">
              <MessageComposer
                  customMessage={customMessage}
                  onMessageChange={onMessageChange}
                  onSend={onSend}
                  isLoading={isLoading}
                />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
