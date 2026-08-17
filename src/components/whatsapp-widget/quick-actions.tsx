// quick-actions.tsx - Pre-built message options
"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuickAction } from "./types";

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
  className,
}: QuickActionsProps) {
  const isSelected = (action: QuickAction) =>
    selectedActions.some((selected) => selected.id === action.id);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="grid grid-cols-1 gap-2">
        {actions.map((action) => (
          <button
            type="button"
            key={action.id}
            onClick={() => onActionToggle(action)}
            className={cn(
              "flex items-center gap-2 rounded-[10px] border p-2 text-left",
              "transition-colors duration-200",
              isSelected(action)
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600",
              "group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
            )}
          >
            {/* Icon */}
            <span className="text-base sm:text-lg flex-shrink-0">
              {action.icon}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "font-medium text-xs leading-tight",
                  isSelected(action)
                    ? "text-green-700 dark:text-green-300"
                    : "text-gray-900 dark:text-gray-100",
                )}
              >
                {action.label}
              </p>
            </div>

            {/* Selection indicator - Smaller */}
            <div
              className={cn(
                "w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                isSelected(action)
                  ? "border-green-500 bg-green-500"
                  : "border-gray-300 dark:border-gray-600",
              )}
            >
              {isSelected(action) && (
                <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
