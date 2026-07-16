"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus, GraduationCap, Trash2, Truck } from "lucide-react";
import type { CartItem } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { CartEmptyState } from "@/components/cart/CartEmptyState";
import { UpsellWidget } from "@/components/cart/UpsellWidget";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatPrice";
import { BUNDLE_DISCOUNT_PERCENT } from "@/lib/constants";
import { lockScroll, unlockScroll } from "@/utils/scrollLock";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CartLineItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

function CartLineItem({ item, onUpdateQuantity, onRemove }: CartLineItemProps) {
  const [quantityText, setQuantityText] = useState(String(item.quantity));

  useEffect(() => {
    setQuantityText(String(item.quantity));
  }, [item.quantity]);

  const commitQuantity = (raw: string) => {
    const digitsOnly = raw.replace(/[^0-9]/g, "");
    const parsed = digitsOnly === "" ? 1 : Math.max(1, parseInt(digitsOnly, 10));
    onUpdateQuantity(item.productId, parsed);
  };

  return (
    <li className="flex gap-3 py-3">
      {item.product.isAddon ? (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-teal-dark text-white">
          <GraduationCap className="h-6 w-6" aria-hidden="true" />
        </div>
      ) : (
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
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
        <p className="text-sm font-semibold text-slate">{item.product.title}</p>
        <p className="text-sm font-bold text-slate">
          {formatPrice(item.product.price)}
        </p>
        <div className="mt-auto flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="rounded-lg border border-sand p-1 transition-transform duration-150 hover:bg-cream-dark active:scale-90 disabled:opacity-40 disabled:active:scale-100"
            aria-label="הפחת כמות"
          >
            <Minus className="h-3 w-3" />
          </button>
          <input
            type="text"
            inputMode="numeric"
            value={quantityText}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
              setQuantityText(digitsOnly);
              if (digitsOnly !== "") {
                onUpdateQuantity(item.productId, parseInt(digitsOnly, 10));
              }
            }}
            onBlur={(e) => commitQuantity(e.target.value)}
            aria-label="כמות"
            className="w-9 bg-transparent text-center text-sm font-medium tabular-nums outline-none"
          />
          <button
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            className="rounded-lg border border-sand p-1 transition-transform duration-150 hover:bg-cream-dark active:scale-90"
            aria-label="הוסף כמות"
          >
            <Plus className="h-3 w-3" />
          </button>
          <button
            onClick={() => onRemove(item.productId)}
            className="mr-auto rounded-lg p-1 text-muted transition-transform duration-150 hover:bg-red-50 hover:text-error active:scale-90"
            aria-label="הסר מהעגלה"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
}

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
    couponCode,
    couponDiscount,
    removeCoupon,
    shipping,
    freeShippingRemaining,
    freeShippingProgress,
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
            <div
              className={cn(
                "px-4 py-2.5",
                freeShippingRemaining > 0 ? "bg-accent/10" : "bg-green/10"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-2 text-xs font-medium",
                  freeShippingRemaining > 0 ? "text-accent" : "text-green"
                )}
              >
                <Truck className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {freeShippingRemaining > 0
                    ? `עוד ${formatPrice(freeShippingRemaining)} למשלוח חינם!`
                    : "זכיתם במשלוח חינם"}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/70">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500 ease-out",
                    freeShippingRemaining > 0 ? "bg-accent" : "bg-green"
                  )}
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="divide-y divide-sand/70">
                {items.map((item) => (
                  <CartLineItem
                    key={item.productId}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
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
                {couponCode && couponDiscount > 0 && (
                  <div className="flex justify-between text-green">
                    <span className="flex items-center gap-1.5">
                      קופון {couponCode}
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs text-muted underline hover:text-error"
                      >
                        הסר
                      </button>
                    </span>
                    <span>-{formatPrice(couponDiscount)}</span>
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
                  המשך להזמנה
                </Button>
                <Button variant="outline" className="w-full" onClick={closeCart}>
                  המשך בקניות
                </Button>
                <p className="text-center text-xs text-muted">
                  ביטול תוך 14 יום ·{" "}
                  <Link href="/returns" className="underline hover:text-slate">
                    מדיניות החזרות
                  </Link>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
