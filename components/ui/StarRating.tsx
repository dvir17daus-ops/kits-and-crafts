import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  className,
}: StarRatingProps) {
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="img"
      aria-label={`דירוג ${rating.toFixed(1)} מתוך 5${
        typeof reviewCount === "number" ? `, ${reviewCount} ביקורות` : ""
      }`}
    >
      <div className="flex items-center" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              className={cn(
                starSize,
                filled ? "fill-gold text-gold" : "fill-sand text-sand"
              )}
            />
          );
        })}
      </div>
      <span className="text-xs font-bold text-slate">{rating.toFixed(1)}</span>
      {typeof reviewCount === "number" && (
        <span className="text-xs text-muted">({reviewCount})</span>
      )}
    </div>
  );
}
