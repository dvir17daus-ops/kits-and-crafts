"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export function CartIcon() {
  const { itemCount, openCart } = useCart();
  const [bounce, setBounce] = useState(false);
  const prevCount = useRef(itemCount);

  useEffect(() => {
    if (itemCount > prevCount.current) {
      setBounce(true);
      const t = setTimeout(() => setBounce(false), 400);
      prevCount.current = itemCount;
      return () => clearTimeout(t);
    }
    prevCount.current = itemCount;
  }, [itemCount]);

  return (
    <button
      onClick={openCart}
      className="relative rounded-xl p-2.5 text-slate transition-colors hover:bg-cream-dark"
      aria-label={`עגלת קניות${itemCount > 0 ? `, ${itemCount} פריטים` : ""}`}
    >
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 && (
        <span
          className={cn(
            "absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white",
            bounce && "animate-bounce-once"
          )}
        >
          {itemCount}
        </span>
      )}
    </button>
  );
}
