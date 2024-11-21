"use client";

import { 
  SplitHero, 
  HeroContent, 
  HeroStats,
  HeroDecorator 
} from "@/components/hero/split-hero";
import { HeroMediaGrid } from "@/components/hero/hero-media-grid";
import { heroData, mediaData } from "@/data/hero/split-hero-data";

export function SplitHeroHome() {
  return (
    <SplitHero>
      {/* Left Side - Content */}
      <div className="relative">
        <HeroContent
          title={heroData.title}
          highlightedTitle={heroData.highlightedTitle}
          description={heroData.description}
          cta={heroData.cta}
        />
        <HeroStats stats={heroData.stats} />
      </div>

      {/* Center Decorator */}
      <HeroDecorator className="hidden lg:block left-1/2 -translate-x-1/2" />

      {/* Right Side - Media Grid */}
      <div className="relative lg:pl-16">
        <HeroMediaGrid items={mediaData} />
      </div>
    </SplitHero>
  );
}