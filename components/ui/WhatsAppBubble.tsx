"use client";

import { MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BUSINESS } from "@/lib/constants";

export function WhatsAppBubble() {
  const { isCartOpen, isCheckoutOpen } = useCart();

  if (isCartOpen || isCheckoutOpen) return null;

  const text = encodeURIComponent("שלום! אשמח לקבל מידע על הערכות שלכם 🙂");
  const href = `https://wa.me/${BUSINESS.whatsapp}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="דברו איתנו בוואטסאפ"
      className="fixed bottom-5 left-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_-4px_rgba(37,211,102,0.55)] transition-transform duration-300 hover:scale-110 active:scale-95"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp/60 animate-[ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite] motion-reduce:hidden" />
      <MessageCircle
        className="relative h-7 w-7 drop-shadow-sm"
        fill="white"
        aria-hidden="true"
      />
    </a>
  );
}
