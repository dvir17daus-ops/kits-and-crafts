import {
  SITE_NAME_HE,
  SITE_NAME_ORANGE,
  SITE_NAME_TEAL,
  SITE_SLOGAN_HE,
} from "@/lib/constants";
import { fredoka } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  size?: "sm" | "md" | "lg" | "hero";
  /** On dark backgrounds (teal header / footer) */
  light?: boolean;
  showSlogan?: boolean;
  className?: string;
}

/**
 * Text-only brand wordmark: thick rounded Fredoka + brand colors.
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
          fredoka.className,
          "brand-display m-0 leading-[0.92]",
          {
            "text-lg": size === "sm",
            "text-xl sm:text-2xl": size === "md",
            "text-3xl": size === "lg",
            "text-[3.1rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]":
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
            fredoka.className,
            "brand-slogan m-0 leading-snug",
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
