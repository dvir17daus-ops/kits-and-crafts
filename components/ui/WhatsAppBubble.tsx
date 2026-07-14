"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { BUSINESS } from "@/lib/constants";

export function WhatsAppBubble() {
  const { isCartOpen, isCheckoutOpen } = useCart();
  const [dismissed, setDismissed] = useState(false);

  if (isCartOpen || isCheckoutOpen || dismissed) return null;

  const text = encodeURIComponent("שלום! אשמח לקבל מידע על הערכות שלכם 🙂");
  const href = `https://wa.me/${BUSINESS.whatsapp}?text=${text}`;

  return (
    <div className="fixed bottom-5 left-5 z-30 flex flex-col items-start gap-2">
      <button
        onClick={() => setDismissed(true)}
        aria-label="סגור הודעת וואטסאפ"
        className="flex h-6 w-6 items-center justify-center self-end rounded-full bg-white text-muted shadow-md transition-colors hover:text-slate"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="דברו איתנו בוואטסאפ"
        className="group flex items-center gap-3 rounded-full bg-whatsapp py-3 pl-4 pr-3 text-white shadow-lg transition-transform hover:scale-105"
      >
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
          <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
          <MessageCircle className="relative h-5 w-5" fill="white" />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-xs sm:max-w-xs">
          דברו איתנו בוואטסאפ
        </span>
      </a>
    </div>
  );
}
