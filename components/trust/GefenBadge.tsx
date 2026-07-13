import { Award } from "lucide-react";
import { GEFEN } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface GefenBadgeProps {
  variant?: "compact" | "full" | "banner";
  className?: string;
}

export function GefenBadge({ variant = "compact", className }: GefenBadgeProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-gefen/30 bg-gefen-light px-3 py-1.5",
          className
        )}
        title={GEFEN.description}
      >
        <Award className="h-4 w-4 text-gefen" aria-hidden="true" />
        <span className="text-sm font-semibold text-gefen">{GEFEN.title}</span>
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div
        className={cn(
          "flex items-start gap-4 rounded-2xl border border-gefen/20 bg-gefen-light p-5",
          className
        )}
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gefen text-white">
          <Award className="h-7 w-7" aria-hidden="true" />
        </div>
        <div>
          <p className="text-lg font-bold text-gefen">{GEFEN.title}</p>
          <p className="mt-1 text-sm font-medium text-gefen/80">
            {GEFEN.subtitle}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {GEFEN.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-gefen/20 bg-gradient-to-l from-gefen-light to-white p-6 md:p-8",
        className
      )}
    >
      <div className="relative z-10 flex flex-col items-center gap-4 text-center md:flex-row md:text-right">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gefen text-white shadow-md">
          <Award className="h-8 w-8" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gefen md:text-2xl">
            {GEFEN.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-gefen/80">
            {GEFEN.subtitle}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {GEFEN.description}
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
            {GEFEN.features.map((feature) => (
              <li
                key={feature}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gefen shadow-sm"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
