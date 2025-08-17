// quick-actions.tsx - Pre-built message options
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuickAction } from './types';

interface QuickActionsProps {
  actions: QuickAction[];
  selectedActions: QuickAction[];
  onActionToggle: (action: QuickAction) => void;
  className?: string;
}

export function QuickActions({ 
  actions, 
  selectedActions, 
  onActionToggle, 
  className 
}: QuickActionsProps) {
  const isSelected = (action: QuickAction) => 
    selectedActions.some(selected => selected.id === action.id);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="grid grid-cols-1 gap-2">
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            onClick={() => onActionToggle(action)}
            className={cn(
              "flex items-center gap-2 p-1.5 sm:p-2 rounded-lg text-left",
              "border-2 transition-all duration-200",
              "hover:shadow-md",
              isSelected(action)
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600",
              "group"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Icon */}
            <span className="text-base sm:text-lg flex-shrink-0">
              {action.icon}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={cn(
                "font-medium text-xs leading-tight",
                isSelected(action) 
                  ? "text-green-700 dark:text-green-300" 
                  : "text-gray-900 dark:text-gray-100"
              )}>
                {action.label}
              </p>
            </div>

            {/* Selection indicator - Smaller */}
            <motion.div
              className={cn(
                "w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                isSelected(action)
                  ? "border-green-500 bg-green-500"
                  : "border-gray-300 dark:border-gray-600"
              )}
              animate={{
                scale: isSelected(action) ? 1 : 0.8,
                backgroundColor: isSelected(action) ? "#10b981" : "transparent"
              }}
            >
              {isSelected(action) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                </motion.div>
              )}
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
