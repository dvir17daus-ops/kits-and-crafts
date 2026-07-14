"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFlyToCart } from "@/context/FlyToCartContext";
import { cn } from "@/lib/utils";

export function CartIcon() {
  const { itemCount, openCart } = useCart();
  const { registerTarget } = useFlyToCart();
  const [bounce, setBounce] = useState(false);
  const prevCount = useRef(itemCount);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    registerTarget(btnRef.current);
  }, [registerTarget]);

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
      ref={btnRef}
      onClick={openCart}
      className={cn(
        "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15",
        bounce && "animate-bounce-once"
      )}
      aria-label={`עגלת קניות${itemCount > 0 ? `, ${itemCount} פריטים` : ""}`}
    >
      <ShoppingCart className="h-4 w-4" aria-hidden="true" />
      <span>העגלה שלי ({itemCount})</span>
    </button>
  );
}
