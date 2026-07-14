"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CartIcon } from "@/components/cart/CartIcon";
import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-l from-teal to-teal-dark shadow-sm">
      <div className="container-narrow flex min-h-16 items-center justify-between gap-4 py-2">
        <Logo light />

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

        <div className="flex items-center gap-1">
          <div className="hidden lg:block">
            <CartIcon />
          </div>
          <button
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
