import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0 disabled:active:scale-100",
        {
          "bg-gradient-to-b from-primary to-primary-dark text-white shadow-[0_2px_0_0_rgba(255,255,255,0.25)_inset,0_8px_20px_-6px_rgba(224,124,10,0.55)] hover:shadow-[0_2px_0_0_rgba(255,255,255,0.3)_inset,0_12px_26px_-6px_rgba(224,124,10,0.65)]":
            variant === "primary",
          "bg-gradient-to-b from-accent-light to-accent text-white shadow-[0_2px_0_0_rgba(255,255,255,0.25)_inset,0_8px_20px_-6px_rgba(18,98,111,0.55)] hover:shadow-[0_2px_0_0_rgba(255,255,255,0.3)_inset,0_12px_26px_-6px_rgba(18,98,111,0.65)]":
            variant === "accent",
          "border border-sand bg-white text-slate shadow-sm hover:border-primary hover:text-primary hover:shadow-md":
            variant === "outline",
          "text-slate hover:bg-cream-dark": variant === "ghost",
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "md",
          "px-8 py-4 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
