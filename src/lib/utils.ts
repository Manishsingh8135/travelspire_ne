import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// tailwind-merge only knows Tailwind's default scale. Without this, it reads
// `text-eyebrow` as a colour and drops it next to `text-highlight`. Keep these
// lists in step with the Evergreen tokens in tailwind.config.ts.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "h1", "h2", "h3", "h4", "lead", "body-lg", "body", "small", "caption", "eyebrow"] },
      ],
      shadow: [{ shadow: ["e1", "e2", "e3"] }],
      rounded: [{ rounded: ["control", "card", "panel"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
