"use client";

import { cn } from "@/lib/utils";

interface PatternProps {
  className?: string;
}

export function DotPattern({ className }: PatternProps) {
  return (
    <div className={cn(
      "absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
      className
    )}>
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `radial-gradient(rgb(var(--primary-400) / 0.15) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
}

export function GridPattern({ className }: PatternProps) {
  return (
    <div className={cn(
      "absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
      className
    )}>
      <div className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(var(--primary-400) / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(var(--primary-400) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
}

export function HexagonPattern({ className }: PatternProps) {
  return (
    <div className={cn(
      "absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
      className
    )}>
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
            <path 
              d="M25 0l25 43.3h-50z m0 86.6l25-43.3h-50z"
              fill="none"
              stroke="rgb(var(--primary-400) / 0.15)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
}

export function CircuitPattern({ className }: PatternProps) {
  return (
    <div className={cn(
      "absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
      className
    )}>
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="circuit" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
            <path 
              d="M0 0h50v50H0z m25 25h-15v-15h15z m15 15h-15v-15h15z"
              fill="none"
              stroke="rgb(var(--primary-400) / 0.15)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
}

// Gradient Overlays
export function GradientOverlay({ className }: PatternProps) {
  return (
    <div className={cn(
      "absolute inset-0 bg-gradient-to-b pointer-events-none",
      "from-transparent via-background/50 to-background",
      className
    )} />
  );
}

// Glow Effects
interface GlowProps extends PatternProps {
  color?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  opacity?: "low" | "medium" | "high";
}

export function GlowEffect({ 
  className, 
  color = "primary",
  size = "md",
  opacity = "medium" 
}: GlowProps) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96"
  };

  const opacityValues = {
    low: "0.1",
    medium: "0.2",
    high: "0.3"
  };

  return (
    <div 
      className={cn(
        "absolute rounded-full blur-[100px] animate-pulse",
        sizeClasses[size],
        className
      )}
      style={{
        background: `rgb(var(--${color}-500) / ${opacityValues[opacity]})`
      }}
    />
  );
}

// Combined Background Effect
interface BackgroundEffectProps {
  pattern?: "dots" | "grid" | "hexagons" | "circuit";
  className?: string;
  children?: React.ReactNode;
}

export function BackgroundEffect({ 
  pattern = "dots",
  className,
  children 
}: BackgroundEffectProps) {
  const Pattern = {
    dots: DotPattern,
    grid: GridPattern,
    hexagons: HexagonPattern,
    circuit: CircuitPattern
  }[pattern];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Pattern />
      {children}
    </div>
  );
}