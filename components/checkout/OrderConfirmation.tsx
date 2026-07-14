"use client";

import { CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
}

export function OrderConfirmation({
  orderNumber,
  onReturnHome,
  items,
  total,
  customerName,
  customerPhone,
}: OrderConfirmationProps) {
  const itemsSummary = items
    .map((i) => `- ${i.product.title} × ${i.quantity}`)
    .join("\n");

  const message = [
    `הזמנה חדשה מהאתר — מספר ${orderNumber}`,
    `שם: ${customerName}`,
    `טלפון: ${customerPhone}`,
    "",
    "פריטים:",
    itemsSummary,
    "",
    `סה״כ לתשלום: ${formatPrice(total)}`,
  ].join("\n");

  const whatsappHref = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-cream p-4">
      <div className="max-w-md py-8 text-center">
        <CheckCircle
          className="mx-auto h-20 w-20 text-accent"
          aria-hidden="true"
        />
        <h2 className="mt-6 text-2xl font-bold text-slate sm:text-3xl">ההזמנה התקבלה!</h2>
        <p className="mt-2 text-muted">מספר הזמנה: {orderNumber}</p>
        <p className="mt-4 text-muted leading-relaxed">
          כדי שנוכל לטפל בהזמנה בהקדם, לחצו על הכפתור ושלחו לנו את פרטי
          ההזמנה בוואטסאפ — ניצור איתכם קשר לאישור ותשלום.
        </p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block"
        >
          <Button className="w-full bg-whatsapp hover:bg-whatsapp/90">
            <MessageCircle className="h-5 w-5" />
            שליחת ההזמנה בוואטסאפ
          </Button>
        </a>
        <Button variant="outline" className="mt-3 w-full" onClick={onReturnHome}>
          חזרה לדף הבית
        </Button>
      </div>
    </div>
  );
}
