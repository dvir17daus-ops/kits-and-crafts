"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, Sparkles, Trash2, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartEmptyState } from "@/components/cart/CartEmptyState";
import { UpsellWidget } from "@/components/cart/UpsellWidget";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatPrice";
import { BUNDLE_DISCOUNT_PERCENT } from "@/lib/constants";
import { lockScroll, unlockScroll } from "@/utils/scrollLock";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    openCheckout,
    removeFromCart,
    updateQuantity,
    subtotal,
    bundleDiscount,
    shipping,
    freeShippingRemaining,
    total,
    itemCount,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) lockScroll();
    else unlockScroll();
    return () => unlockScroll();
  }, [isCartOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) closeCart();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isCartOpen, closeCart]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-slate/50 backdrop-blur-sm transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeCart}
        aria-hidden="true"
      />
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="עגלת קניות"
      >
        <div className="flex items-center justify-between border-b border-sand px-6 py-4">
          <h2 className="text-xl font-bold text-slate">עגלת קניות</h2>
          <button
            onClick={closeCart}
            className="rounded-lg px-3 py-1 text-sm text-muted hover:bg-cream-dark"
            aria-label="סגור עגלה"
          >
            סגור
          </button>
        </div>

        {items.length === 0 ? (
          <CartEmptyState onContinueShopping={closeCart} />
        ) : (
          <>
            {freeShippingRemaining > 0 ? (
              <div className="flex items-center gap-2 bg-accent/10 px-4 py-2.5 text-xs font-medium text-accent">
                <Truck className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  עוד {formatPrice(freeShippingRemaining)} למשלוח חינם!
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-green/10 px-4 py-2.5 text-xs font-medium text-green">
                <Truck className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>זכית במשלוח חינם 🎉</span>
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.productId}
                    className="flex gap-3 rounded-xl border border-sand/60 p-3"
                  >
                    {item.product.isAddon ? (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-yellow to-orange text-white">
                        <Sparkles className="h-6 w-6" aria-hidden="true" />
                      </div>
                    ) : (
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col">
                      <p className="text-sm font-semibold text-slate">
                        {item.product.title}
                      </p>
                      <p className="text-sm font-bold text-green">
                        {formatPrice(item.product.price)}
                      </p>
                      <div className="mt-auto flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="rounded-lg border border-sand p-1 transition-transform duration-150 hover:bg-cream-dark active:scale-90 disabled:opacity-40 disabled:active:scale-100"
                          aria-label="הפחת כמות"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="rounded-lg border border-sand p-1 transition-transform duration-150 hover:bg-cream-dark active:scale-90"
                          aria-label="הוסף כמות"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="mr-auto rounded-lg p-1 text-muted transition-transform duration-150 hover:bg-red-50 hover:text-error active:scale-90"
                          aria-label="הסר מהעגלה"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <UpsellWidget />

            <div className="border-t border-sand p-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted">
                  <span>סכום ביניים ({itemCount} פריטים)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {bundleDiscount > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>הנחת חבילה ({BUNDLE_DISCOUNT_PERCENT}%)</span>
                    <span>-{formatPrice(bundleDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted">
                  <span>משלוח</span>
                  <span>{shipping === 0 ? "חינם" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-sand pt-2 text-lg font-bold text-slate">
                  <span>סה״כ</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Button className="w-full" onClick={openCheckout}>
                  המשך לתשלום
                </Button>
                <Button variant="outline" className="w-full" onClick={closeCart}>
                  המשך בקניות
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
