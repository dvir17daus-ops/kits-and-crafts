"use client";

import { CreditCard } from "lucide-react";
import type { PaymentGateway } from "@/types/product";
import { cn } from "@/lib/utils";

const gateways: { id: PaymentGateway; name: string; desc: string }[] = [
  { id: "grow", name: "Grow", desc: "תשלום מאובטח בכרטיס אשראי" },
  { id: "meshulam", name: "Meshulam (משולם)", desc: "סליקה ישראלית מובילה" },
  { id: "cardcom", name: "Cardcom", desc: "מערכת סליקה לעסקים" },
];

interface PaymentGatewaysProps {
  selected: PaymentGateway | null;
  onSelect: (gateway: PaymentGateway) => void;
  message?: string;
}

export function PaymentGateways({
  selected,
  onSelect,
  message,
}: PaymentGatewaysProps) {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {gateways.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => onSelect(g.id)}
            className={cn(
              "rounded-xl border p-4 text-right transition-all",
              selected === g.id
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-sand hover:border-primary/50"
            )}
            aria-pressed={selected === g.id}
          >
            <CreditCard className="mb-2 h-6 w-6 text-primary" aria-hidden="true" />
            <p className="font-semibold text-slate">{g.name}</p>
            <p className="mt-1 text-xs text-muted">{g.desc}</p>
          </button>
        ))}
      </div>
      {message && <p className="mt-3 text-sm text-muted">{message}</p>}
    </div>
  );
}
