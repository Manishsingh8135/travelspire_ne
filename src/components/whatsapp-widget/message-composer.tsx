// message-composer.tsx - Input and send logic
"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageComposerProps {
  customMessage: string;
  onMessageChange: (message: string) => void;
  onSend: () => void;
  isLoading?: boolean;
  className?: string;
}

export function MessageComposer({ 
  customMessage, 
  onMessageChange, 
  onSend, 
  isLoading = false,
  className 
}: MessageComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 80)}px`; // Fixed max 80px
    }
  }, [customMessage]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const characterCount = customMessage.length;
  const maxCharacters = 500;

  return (
    <div className={cn("space-y-2", className)}>
      {/* Custom message input - Compact for mobile */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={customMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add your message here... (optional)"
          className={cn(
            "w-full p-2 sm:p-2.5 border-2 rounded-xl resize-none",
            "border-gray-200 dark:border-gray-700",
            "focus:border-green-500 focus:outline-none",
            "bg-white dark:bg-gray-800",
            "text-gray-900 dark:text-gray-100",
            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
            "transition-all duration-200",
            "min-h-[40px] max-h-[80px]", // Guaranteed small height
            "text-sm"
          )}
          maxLength={maxCharacters}
        />
        
        {/* Character counter */}
        {characterCount > 0 && (
          <div className={cn(
            "absolute bottom-2 right-2 text-xs",
            characterCount > maxCharacters * 0.8 
              ? "text-orange-500" 
              : "text-gray-400"
          )}>
            {characterCount}/{maxCharacters}
          </div>
        )}
      </div>

      {/* Send button - Compact */}
      <motion.button
        onClick={onSend}
        disabled={isLoading}
        className={cn(
          "w-full py-2.5 px-4 rounded-xl font-semibold text-sm",
          "bg-gradient-to-r from-green-500 to-green-600",
          "hover:from-green-600 hover:to-green-700",
          "text-white shadow-lg hover:shadow-xl",
          "transition-all duration-300",
          "flex items-center justify-center gap-2",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Opening WhatsApp...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send via WhatsApp
          </>
        )}
      </motion.button>

      {/* Helper text - Compact */}
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight">
        {customMessage.trim() === "" 
          ? "Send even without typing!"
          : "Press Enter to send"
        }
      </p>
    </div>
  );
}
