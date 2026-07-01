import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * StatBlock — icon (optional) + big display number + tracked mono label.
 * The field-journal "8 States / 200+ Tribes" unit, reused in the hero,
 * the problem section, the Living Map and Mei. Color is inherited so it
 * works on both dark and paper surfaces; override via *ClassName props.
 */
type StatBlockProps = {
  value: React.ReactNode;
  label: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
};

function StatBlock({ value, label, icon, className, valueClassName, labelClassName }: StatBlockProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {icon ? (
        <span aria-hidden className="mb-1 inline-flex opacity-80 [&_svg]:size-5">
          {icon}
        </span>
      ) : null}
      <span
        className={cn(
          "font-display text-3xl leading-none font-medium tabular-nums",
          valueClassName,
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "font-mono text-xs tracking-wider uppercase opacity-70",
          labelClassName,
        )}
      >
        {label}
      </span>
    </div>
  );
}

export { StatBlock };
