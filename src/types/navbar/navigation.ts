// src/types/navigation.ts
import { LucideIcon } from "lucide-react";

export interface SubMenuItem {
  name: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
  submenu?: SubMenuItem[];
}

export interface NavigationData {
  primary: NavigationItem[];
  secondary: NavigationItem[];
}
