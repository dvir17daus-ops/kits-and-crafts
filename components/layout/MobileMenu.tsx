"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { CartIcon } from "@/components/cart/CartIcon";
import { GefenBadge } from "@/components/trust/GefenBadge";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-slate/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="תפריט ניווט"
      >
        <div className="flex items-center justify-between bg-gradient-to-l from-teal to-teal-dark p-4">
          <Logo light />
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white hover:bg-white/15"
            aria-label="סגור תפריט"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="border-b border-sand p-4">
          <div className="inline-flex rounded-full bg-orange px-1">
            <CartIcon />
          </div>
        </div>
        <nav className="flex flex-col p-4" aria-label="ניווט נייד">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-cream-dark",
                pathname === link.href ? "text-orange" : "text-slate"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-sand p-4">
          <GefenBadge variant="compact" />
        </div>
      </div>
    </div>
  );
}
