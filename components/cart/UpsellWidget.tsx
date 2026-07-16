"use client";

import { Plus, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { UPSELL_ADDONS } from "@/lib/constants";
import { formatPrice } from "@/utils/formatPrice";

export function UpsellWidget() {
  const { items, addToCart } = useCart();
  const { showToast } = useToast();

  const suggestions = UPSELL_ADDONS.filter(
    (addon) => !items.some((item) => item.productId === addon.id)
  );

  if (suggestions.length === 0) return null;

  return (
    <div className="border-t border-dashed border-sand bg-cream-dark/60 p-4">
      <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-slate">
        <Sparkles className="h-4 w-4 text-orange" aria-hidden="true" />
        רוצים להשלים את הערכה?
      </p>
      <div className="space-y-2">
        {suggestions.map((addon) => (
          <div
            key={addon.id}
            className="flex items-center gap-3 rounded-xl border border-sand/60 bg-white p-2.5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-yellow to-orange text-white shadow-sm">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate">
                {addon.title}
              </p>
              <p className="text-xs font-bold text-green">
                {formatPrice(addon.price)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                addToCart(addon);
                showToast(`${addon.title} נוסף לעגלה`);
              }}
              aria-label={`הוספת ${addon.title} לעגלה`}
              className="flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              הוספה
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
