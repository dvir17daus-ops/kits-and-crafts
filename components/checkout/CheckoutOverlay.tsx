"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { PaymentGateways } from "@/components/checkout/PaymentGateways";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import { formatPrice } from "@/utils/formatPrice";
import {
  isValidEmail,
  isValidHebrewText,
  isValidIsraeliPhone,
  validationMessages,
} from "@/utils/validation";
import type { PaymentGateway } from "@/types/product";
import { lockScroll, unlockScroll } from "@/utils/scrollLock";

export function CheckoutOverlay() {
  const {
    isCheckoutOpen,
    closeCheckout,
    items,
    subtotal,
    bundleDiscount,
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
  const [gateway, setGateway] = useState<PaymentGateway | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [gatewayMsg, setGatewayMsg] = useState("");

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

  const handlePay = () => {
    if (!validate()) return;
    if (!gateway) {
      setGatewayMsg("נא לבחור אמצעי תשלום");
      return;
    }
    setGatewayMsg("אינטגרציית API תתווסף בשלב הבא — מדמה אישור הזמנה");
    setTimeout(() => confirmOrder(), 800);
  };

  if (isOrderConfirmed) {
    return (
      <OrderConfirmation
        orderNumber={orderNumber}
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

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="card-premium p-6">
              <h2 className="mb-4 text-lg font-semibold">פרטי חיוב</h2>
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

            <div className="card-premium p-6">
              <h2 className="mb-4 text-lg font-semibold">תשלום</h2>
              <PaymentGateways
                selected={gateway}
                onSelect={(g) => {
                  setGateway(g);
                  setGatewayMsg("");
                }}
                message={gatewayMsg}
              />
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
              <div className="mt-4 space-y-1 border-t border-sand pt-4 text-sm">
                <div className="flex justify-between">
                  <span>ביניים</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {bundleDiscount > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>הנחה</span>
                    <span>-{formatPrice(bundleDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <span>סה״כ</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Button className="mt-6 w-full" onClick={handlePay}>
                שלם עכשיו
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
