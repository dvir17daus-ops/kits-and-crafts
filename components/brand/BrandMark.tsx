import {
  SITE_NAME_HE,
  SITE_NAME_ORANGE,
  SITE_NAME_TEAL,
  SITE_SLOGAN_HE,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  size?: "sm" | "md" | "lg" | "hero";
  /** On dark backgrounds (hero / teal header) */
  light?: boolean;
  showSlogan?: boolean;
  className?: string;
}

export function BrandMark({
  size = "md",
  light = false,
  showSlogan = true,
  className,
}: BrandMarkProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="relative inline-flex w-fit">
        <span
          className={cn(
            "font-brand font-bold leading-none tracking-tight",
            {
              "text-lg": size === "sm",
              "text-xl sm:text-2xl": size === "md",
              "text-3xl": size === "lg",
              "text-5xl sm:text-6xl md:text-7xl lg:text-8xl": size === "hero",
            }
          )}
          aria-label={SITE_NAME_HE}
        >
          <span className="text-brand-orange">{SITE_NAME_ORANGE}</span>
          <span className="text-brand-teal">{SITE_NAME_TEAL}</span>
        </span>
        {(size === "hero" || size === "lg") && (
          <span
            className="pointer-events-none absolute -left-1 -top-2 flex flex-col gap-0.5 text-brand-teal sm:-left-2 sm:-top-3"
            aria-hidden="true"
          >
            <span className="block h-0.5 w-2.5 -rotate-12 rounded-full bg-current sm:w-3.5" />
            <span className="mr-1 block h-0.5 w-2 -rotate-12 rounded-full bg-current sm:w-2.5" />
            <span className="mr-2 block h-0.5 w-1.5 -rotate-12 rounded-full bg-current sm:w-2" />
          </span>
        )}
      </div>

      {showSlogan && (
        <>
          <div
            className={cn(
              "mt-2 flex items-center gap-2",
              size === "hero" ? "mt-4 gap-3" : "mt-1.5"
            )}
            aria-hidden="true"
          >
            <span
              className={cn(
                "h-px flex-1 border-t border-dashed",
                light ? "border-white/50" : "border-brand-teal/70"
              )}
            />
            <span
              className={cn(
                size === "hero" ? "text-sm" : "text-[10px]",
                "text-brand-orange"
              )}
            >
              ♥
            </span>
            <span
              className={cn(
                "h-px flex-1 border-t border-dashed",
                light ? "border-white/50" : "border-brand-teal/70"
              )}
            />
          </div>
          <p
            className={cn(
              "font-brand font-medium leading-snug",
              {
                "mt-1 text-[10px]": size === "sm",
                "mt-1.5 text-xs": size === "md",
                "mt-2 text-sm": size === "lg",
                "mt-3 text-base sm:text-lg md:text-xl": size === "hero",
              },
              light ? "text-white/90" : "text-brand-brown"
            )}
          >
            {SITE_SLOGAN_HE}
          </p>
        </>
      )}
    </div>
  );
}
