"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, Award } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CartIcon } from "@/components/cart/CartIcon";
import { GEFEN, NAV_LINKS } from "@/lib/constants";
import { useFlyToCart } from "@/context/FlyToCartContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { registerTarget } = useFlyToCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    registerTarget(menuBtnRef.current);
  }, [registerTarget]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-gradient-to-l from-teal to-teal-dark shadow-[0_4px_24px_-4px_rgba(18,98,111,0.35)] transition-all duration-300",
        scrolled ? "shadow-[0_8px_28px_-4px_rgba(18,98,111,0.45)]" : ""
      )}
    >
      <div
        className={cn(
          "container-narrow flex items-center justify-between gap-4 transition-all duration-300",
          scrolled ? "min-h-12 py-1" : "min-h-16 py-2"
        )}
      >
        <Logo light small={scrolled} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="ניווט ראשי">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                pathname === link.href
                  ? "bg-teal-deep text-white"
                  : "text-white/90 hover:bg-white/15"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact?type=institution"
            className="hidden items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/20 xl:inline-flex"
            title={GEFEN.description}
          >
            <Award className="h-3.5 w-3.5" aria-hidden="true" />
            {GEFEN.badgeLabel}
          </Link>
          <div className="hidden lg:block">
            <CartIcon />
          </div>
          <button
            ref={menuBtnRef}
            className="rounded-full p-2.5 text-white transition-colors hover:bg-white/15 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="פתח תפריט"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
