// types.ts - TypeScript interfaces for WhatsApp Widget
export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  category: 'tours' | 'destinations' | 'planning' | 'help';
  message: string;
}

export interface QuickActionCategory {
  id: string;
  title: string;
  icon: string;
  actions: QuickAction[];
}

export interface WidgetState {
  isOpen: boolean;
  selectedActions: QuickAction[];
  customMessage: string;
  isLoading: boolean;
}

export interface WhatsAppWidgetProps {
  position?: 'bottom-right' | 'bottom-left';
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
}
