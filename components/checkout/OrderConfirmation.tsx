"use client";

import { useEffect, useState } from "react";
import { CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Confetti } from "@/components/ui/Confetti";
import { BUSINESS } from "@/lib/constants";
import { formatPrice } from "@/utils/formatPrice";
import type { CartItem } from "@/types/product";

interface OrderConfirmationProps {
  orderNumber: string | null;
  onReturnHome: () => void;
  items: CartItem[];
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  notes?: string;
}

export function OrderConfirmation({
  orderNumber,
  onReturnHome,
  items,
  total,
  customerName,
  customerPhone,
  customerEmail,
  customerAddress,
  notes,
}: OrderConfirmationProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(t);
  }, []);

  const itemsSummary = items
    .map((i) => `- ${i.product.title} × ${i.quantity}`)
    .join("\n");

  const message = [
    `הזמנה חדשה מהאתר — מספר ${orderNumber}`,
    `שם: ${customerName}`,
    `טלפון: ${customerPhone}`,
    `אימייל: ${customerEmail}`,
    `כתובת: ${customerAddress}`,
    notes?.trim() ? `הערות: ${notes.trim()}` : null,
    "",
    "פריטים:",
    itemsSummary,
    "",
    `סה״כ לתשלום: ${formatPrice(total)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappHref = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-cream p-4">
      {showConfetti && <Confetti />}
      <div className="max-w-md py-8 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-accent/10 shadow-inner">
          <CheckCircle
            className="h-16 w-16 animate-success-pop text-accent"
            aria-hidden="true"
          />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-slate sm:text-3xl">
          ההזמנה מוכנה לשליחה
        </h2>
        <p className="mt-2 text-muted">מספר הזמנה: {orderNumber}</p>
        <p className="mt-4 text-muted leading-relaxed">
          לחצו על הכפתור כדי לשלוח לנו את פרטי ההזמנה בוואטסאפ. נחזור אליכם
          בהקדם לאישור, תשלום ומשלוח.
        </p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block"
          onClick={() => setSent(true)}
        >
          <Button className="w-full bg-none! bg-whatsapp shadow-[0_2px_0_0_rgba(255,255,255,0.25)_inset,0_8px_20px_-6px_rgba(37,211,102,0.55)] hover:bg-whatsapp/90 hover:shadow-[0_2px_0_0_rgba(255,255,255,0.3)_inset,0_12px_26px_-6px_rgba(37,211,102,0.65)]">
            <MessageCircle className="h-5 w-5" />
            {sent ? "נפתח וואטסאפ — שלחו את ההודעה" : "שליחת ההזמנה בוואטסאפ"}
          </Button>
        </a>
        <Button variant="outline" className="mt-3 w-full" onClick={onReturnHome}>
          חזרה לדף הבית
        </Button>
      </div>
    </div>
  );
}
