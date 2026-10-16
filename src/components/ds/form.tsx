import * as React from "react";
import { cn } from "@/lib/utils";

/* One input style for every form on the site: contact, booking, permits. */
const control = [
  "block w-full rounded-control border border-line-strong bg-surface px-3.5 font-ui text-body text-fg shadow-none",
  "placeholder:text-fg-subtle transition-[border-color,box-shadow] duration-150",
  "focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-focus/25",
  "disabled:cursor-not-allowed disabled:opacity-60",
  "aria-[invalid=true]:border-critical aria-[invalid=true]:focus:ring-critical/20",
].join(" ");

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(control, "h-11", className)} {...props} />,
);
Input.displayName = "Input";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => <select ref={ref} className={cn(control, "h-11 pr-10", className)} {...props} />,
);
Select.displayName = "Select";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => <textarea ref={ref} className={cn(control, "min-h-28 py-3", className)} {...props} />,
);
Textarea.displayName = "Textarea";

type FieldProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function Field({ label, htmlFor, hint, error, optional, children, className }: FieldProps) {
  return (
    <div className={cn("space-y-1.5 font-ui", className)}>
      <label htmlFor={htmlFor} className="flex items-baseline justify-between text-small font-medium text-fg">
        {label}
        {optional ? <span className="text-caption font-normal text-fg-subtle">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-caption text-critical">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-caption text-fg-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
