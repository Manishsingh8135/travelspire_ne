// types/hero.ts
export interface HeroData {
    title: string;
    highlightedTitle: string;
    description: string;
    cta: {
      text: string;
      href: string;
    };
    stats: Array<{
      value: string;
      label: string;
    }>;
  }
  
  export interface MediaItem {
    src: string;
    alt?: string;
    className?: string;
    sizes?: 'small' | 'medium' | 'large';
    priority?: boolean;
  }
  