import Link from "next/link";
import { Award } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { NAV_LINKS, BUSINESS, GEFEN, SITE_NAME_HE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-slate text-cream-dark">
      <div className="container-narrow section-padding">
        <div className="mb-10 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center md:flex-row md:text-right">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gefen">
            <Award className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-white">{GEFEN.title}</p>
            <p className="mt-1 text-sm text-cream-dark/80">{GEFEN.subtitle}</p>
            <p className="mt-2 text-sm text-cream-dark/60">{GEFEN.description}</p>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-cream-dark/70">
              {SITE_NAME_HE} — ערכות יצירה ובנייה מעץ אמיתי לבתי ספר, קהילות
              ומשפחות. {GEFEN.title}, איכות פרימיום.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">קישורים מהירים</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-dark/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">צור קשר</h3>
            <ul className="space-y-2 text-sm text-cream-dark/70">
              <li>{BUSINESS.phone}</li>
              <li>{BUSINESS.email}</li>
              <li>{BUSINESS.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-cream-dark/50">
          <p>מספקים לוועדי הורים וירידי קהילה ברחבי הארץ · {GEFEN.title}</p>
          <p className="mt-2">© 2026 Kits & Crafts — כל הזכויות שמורות</p>
        </div>
      </div>
    </footer>
  );
}
