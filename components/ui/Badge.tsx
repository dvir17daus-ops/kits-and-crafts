import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "gefen" | "deal";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-cream-dark text-slate": variant === "default",
          "border border-gold/30 bg-gold/10 text-gold": variant === "gold",
          "border border-gefen/30 bg-gefen-light text-gefen": variant === "gefen",
          "bg-primary/10 text-primary": variant === "deal",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
