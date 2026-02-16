// widget-button.tsx - Floating WhatsApp Button
"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface WidgetButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function WidgetButton({ isOpen, onClick, className }: WidgetButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "fixed bottom-4 right-4 z-50",
        "w-14 h-14 sm:w-16 sm:h-16 rounded-full",
        "bg-gradient-to-r from-green-500 to-green-600",
        "hover:from-green-600 hover:to-green-700",
        "text-white shadow-lg hover:shadow-xl",
        "flex items-center justify-center",
        "transition-all duration-300",
        "group overflow-hidden",
        // Mobile-specific positioning
        "max-md:bottom-4 max-md:right-4",
        "max-sm:bottom-3 max-sm:right-3",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Pulse effect for closed state */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 rounded-full bg-green-400"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
      
      {/* Button content */}
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-10"
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        )}
      </motion.div>

      {/* Hover tooltip for closed state - Hidden on mobile */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none hidden sm:block"
        >
          Chat with us on WhatsApp
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </motion.div>
      )}

      {/* New message indicator - only show when closed */}
      {!isOpen && (
        <motion.div
          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: "spring" }}
        >
          !
        </motion.div>
      )}
    </motion.button>
  );
}
