import { cn } from "@/lib/utils";
import { type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  const inputId = id || label;
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          "w-full resize-none rounded-xl border border-sand bg-white px-4 py-3 text-slate transition-colors placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          error && "border-error",
          className
        )}
        rows={4}
        {...props}
      />
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
}
