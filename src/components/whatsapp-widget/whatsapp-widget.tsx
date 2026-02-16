// whatsapp-widget.tsx - Main widget component
"use client";

import { useState, useCallback } from "react";
import { WidgetButton } from "./widget-button";
import { WidgetPanel } from "./widget-panel";
import { WhatsAppWidgetProps, QuickAction } from "./types";
import { createWhatsAppURL } from "@/lib/whatsapp";

export function WhatsAppWidget({ 
  className 
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedActions, setSelectedActions] = useState<QuickAction[]>([]);
  const [customMessage, setCustomMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleWidget = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleActionToggle = useCallback((action: QuickAction) => {
    setSelectedActions(prev => {
      const exists = prev.find(a => a.id === action.id);
      if (exists) {
        return prev.filter(a => a.id !== action.id);
      } else {
        return [...prev, action];
      }
    });
  }, []);

  const handleMessageChange = useCallback((message: string) => {
    setCustomMessage(message);
  }, []);

  const buildWhatsAppMessage = useCallback(() => {
    let message = "Hi TravelSpire NE! 👋\n\n";

    // Add selected quick actions
    if (selectedActions.length > 0) {
      message += "I'm interested in:\n";
      selectedActions.forEach(action => {
        message += `• ${action.label}\n`;
      });
      message += "\n";

      // Add specific messages from selected actions
      const specificMessages = selectedActions
        .map(action => action.message)
        .filter(Boolean);
      
      if (specificMessages.length > 0) {
        message += "Here are my specific interests:\n";
        specificMessages.forEach((msg, index) => {
          message += `${index + 1}. ${msg}\n`;
        });
        message += "\n";
      }
    }

    // Add custom message
    if (customMessage.trim()) {
      message += `Additional details:\n${customMessage.trim()}\n\n`;
    }

    // Add closing
    if (selectedActions.length === 0 && !customMessage.trim()) {
      message += "I'm interested in exploring Northeast India. Could you help me plan my trip?\n\n";
    }
    
    message += "Looking forward to hearing from you! 🏔️✨";

    return message;
  }, [selectedActions, customMessage]);

  const handleSend = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const message = buildWhatsAppMessage();
      const whatsappUrl = createWhatsAppURL({ 
        customMessage: message 
      });
      
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Reset form
      setSelectedActions([]);
      setCustomMessage("");
      setIsOpen(false);
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [buildWhatsAppMessage]);

  return (
    <>
      <WidgetButton
        isOpen={isOpen}
        onClick={toggleWidget}
        className={className}
      />
      
      <WidgetPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedActions={selectedActions}
        customMessage={customMessage}
        onActionToggle={handleActionToggle}
        onMessageChange={handleMessageChange}
        onSend={handleSend}
        isLoading={isLoading}
      />
    </>
  );
}
