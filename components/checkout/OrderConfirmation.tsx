"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface OrderConfirmationProps {
  orderNumber: string | null;
  onReturnHome: () => void;
}

export function OrderConfirmation({
  orderNumber,
  onReturnHome,
}: OrderConfirmationProps) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-cream p-4">
      <div className="max-w-md text-center">
        <CheckCircle
          className="mx-auto h-20 w-20 text-accent"
          aria-hidden="true"
        />
        <h2 className="mt-6 text-3xl font-bold text-slate">ההזמנה התקבלה!</h2>
        <p className="mt-2 text-muted">מספר הזמנה: {orderNumber}</p>
        <p className="mt-4 text-muted leading-relaxed">
          ניצור איתכם קשר בקרוב לאישור ותשלום.
        </p>
        <Button className="mt-8" onClick={onReturnHome}>
          חזרה לדף הבית
        </Button>
      </div>
    </div>
  );
}
