"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import { formatPrice } from "@/utils/formatPrice";
import {
  isValidEmail,
  isValidHebrewText,
  isValidIsraeliPhone,
  validationMessages,
} from "@/utils/validation";
import { lockScroll, unlockScroll } from "@/utils/scrollLock";
import { BUSINESS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CheckoutOverlay() {
  const {
    isCheckoutOpen,
    closeCheckout,
    items,
    subtotal,
    bundleDiscount,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    shipping,
    total,
    confirmOrder,
    isOrderConfirmed,
    orderNumber,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (isCheckoutOpen) lockScroll();
    else unlockScroll();
    return () => unlockScroll();
  }, [isCheckoutOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCheckoutOpen && !isOrderConfirmed) {
        closeCheckout();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isCheckoutOpen, isOrderConfirmed, closeCheckout]);

  if (!isCheckoutOpen) return null;

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    setCouponFeedback({
      type: result.success ? "success" : "error",
      message: result.message,
    });
    if (result.success) setCouponInput("");
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = validationMessages.required;
    else if (!isValidHebrewText(name)) e.name = validationMessages.hebrew;
    if (!phone.trim()) e.phone = validationMessages.required;
    else if (!isValidIsraeliPhone(phone)) e.phone = validationMessages.phone;
    if (!address.trim()) e.address = validationMessages.required;
    else if (!isValidHebrewText(address)) e.address = validationMessages.hebrew;
    if (!email.trim()) e.email = validationMessages.required;
    else if (!isValidEmail(email)) e.email = validationMessages.email;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmitOrder = () => {
    if (!validate()) return;
    confirmOrder();
  };

  if (isOrderConfirmed) {
    return (
      <OrderConfirmation
        orderNumber={orderNumber}
        items={items}
        total={total}
        customerName={name}
        customerPhone={phone}
        customerEmail={email}
        customerAddress={address}
        notes={notes}
        onReturnHome={() => {
          clearCart();
          closeCheckout();
        }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-cream"
      role="dialog"
      aria-modal="true"
      aria-label="השלמת הזמנה"
    >
      <div className="container-narrow py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate">השלמת הזמנה</h1>
          <button
            onClick={closeCheckout}
            className="text-sm text-muted hover:text-slate"
          >
            חזרה לעגלה
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-accent/20 bg-accent/5 px-5 py-4 text-sm leading-relaxed text-slate">
          <p className="font-semibold text-accent">איך זה עובד?</p>
          <p className="mt-1 text-muted">
            ממלאים את הפרטים → שולחים את ההזמנה בוואטסאפ → אנחנו מאשרים ומסדרים
            תשלום ומשלוח. בלי סיבוכים.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="card-premium p-6">
              <h2 className="mb-4 text-lg font-semibold">פרטי הזמנה</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="שם מלא *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                />
                <Input
                  label="טלפון *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={errors.phone}
                  placeholder="050-1234567"
                  dir="ltr"
                  className="text-right"
                />
                <div className="sm:col-span-2">
                  <Input
                    label="כתובת מלאה *"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    error={errors.address}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Input
                    label="אימייל *"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    dir="ltr"
                    className="text-right"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Textarea
                    label="הערות להזמנה"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card-premium sticky top-24 p-6">
              <h2 className="mb-4 font-semibold">סיכום הזמנה</h2>
              <ul className="space-y-2 text-sm">
                {items.map((item) => (
                  <li key={item.productId} className="flex justify-between gap-2">
                    <span className="text-muted">
                      {item.product.title} × {item.quantity}
                    </span>
                    <span className="shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t border-sand pt-4">
                {couponCode ? (
                  <div className="flex items-center justify-between rounded-lg bg-green/10 px-3 py-2 text-sm text-green">
                    <span className="font-semibold">קופון {couponCode} הופעל</span>
                    <button
                      type="button"
                      onClick={() => {
                        removeCoupon();
                        setCouponFeedback(null);
                      }}
                      className="text-xs text-green underline hover:text-error"
                    >
                      הסר
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate">
                      קוד קופון
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleApplyCoupon();
                          }
                        }}
                        placeholder="הקלידו קוד קופון"
                        className="flex-1 rounded-lg border border-sand bg-white px-3 py-2 text-sm text-slate outline-none transition-colors focus:border-primary"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleApplyCoupon}
                      >
                        החל
                      </Button>
                    </div>
                    {couponFeedback && (
                      <p
                        className={cn(
                          "mt-1.5 text-xs",
                          couponFeedback.type === "success"
                            ? "text-green"
                            : "text-error"
                        )}
                      >
                        {couponFeedback.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-1 border-t border-sand pt-4 text-sm">
                <div className="flex justify-between">
                  <span>ביניים</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {bundleDiscount > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>הנחת חבילה</span>
                    <span>-{formatPrice(bundleDiscount)}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green">
                    <span>הנחת קופון</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>משלוח</span>
                  <span>{shipping === 0 ? "חינם" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>סה״כ</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button className="mt-6 w-full" onClick={handleSubmitOrder}>
                <MessageCircle className="h-5 w-5" />
                שליחת הזמנה בוואטסאפ
              </Button>

              <div className="mt-4 space-y-2 text-center text-xs text-muted">
                <p className="flex items-center justify-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  נחזור אליכם לאישור ותיאום תשלום
                </p>
                <p>
                  ביטול תוך 14 יום ·{" "}
                  <Link href="/returns" className="underline hover:text-slate">
                    מדיניות החזרות
                  </Link>
                </p>
                <p>
                  שאלות?{" "}
                  <a
                    href={`tel:${BUSINESS.phone.replace(/-/g, "")}`}
                    className="underline hover:text-slate"
                    dir="ltr"
                  >
                    {BUSINESS.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
