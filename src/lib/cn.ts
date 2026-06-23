import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind-aware conflict resolution.
 * The single class composer used across every component (see
 * docs-new/03-frontend/04-component-library.md).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
