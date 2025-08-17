// index.ts - Main exports for WhatsApp Widget
export { WhatsAppWidget } from "./whatsapp-widget";
export { WidgetButton } from "./widget-button";
export { WidgetPanel } from "./widget-panel";
export { QuickActions } from "./quick-actions";
export { MessageComposer } from "./message-composer";
export type { 
  WhatsAppWidgetProps, 
  QuickAction, 
  QuickActionCategory, 
  WidgetState 
} from "./types";
export { quickActionCategories } from "./data";
