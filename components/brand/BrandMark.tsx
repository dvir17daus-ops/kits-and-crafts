import {
  SITE_NAME_HE,
  SITE_NAME_ORANGE,
  SITE_NAME_TEAL,
  SITE_SLOGAN_HE,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  size?: "sm" | "md" | "lg" | "hero";
  /** On dark backgrounds (teal header / footer) */
  light?: boolean;
  showSlogan?: boolean;
  className?: string;
}

/**
 * Text-only brand wordmark: name + optional slogan.
 * Rounded Fredoka display — soft, playful, brand-colored.
 */
export function BrandMark({
  size = "md",
  light = false,
  showSlogan = true,
  className,
}: BrandMarkProps) {
  const onHero = size === "hero";

  return (
    <div
      className={cn(
        "flex flex-col",
        onHero && "drop-shadow-[0_8px_28px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      <p
        className={cn(
          "m-0 font-brand font-bold leading-[0.92] tracking-[-0.02em]",
          {
            "text-lg": size === "sm",
            "text-xl sm:text-2xl": size === "md",
            "text-3xl tracking-[-0.025em]": size === "lg",
            "text-[2.9rem] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[5.25rem]":
              size === "hero",
          }
        )}
        aria-label={SITE_NAME_HE}
      >
        <span className="text-brand-orange">{SITE_NAME_ORANGE}</span>
        <span className={light ? "text-white" : "text-brand-teal"}>
          {SITE_NAME_TEAL}
        </span>
      </p>

      {showSlogan ? (
        <p
          className={cn(
            "m-0 font-brand font-medium leading-snug tracking-[0.01em]",
            {
              "mt-1 text-[10px]": size === "sm",
              "mt-1.5 text-xs": size === "md",
              "mt-2 text-sm": size === "lg",
              "mt-4 max-w-md text-base sm:text-lg md:text-xl md:leading-relaxed":
                size === "hero",
            },
            light || onHero ? "text-white/95" : "text-brand-brown"
          )}
        >
          {SITE_SLOGAN_HE}
        </p>
      ) : null}
    </div>
  );
}
