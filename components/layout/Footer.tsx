import Link from "next/link";
import { Award, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { NAV_LINKS, BUSINESS, GEFEN, SITE_NAME_HE, SITE_TAGLINE_HE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-teal-deep to-teal-dark text-white">
      <div className="container-narrow py-14">
        <div className="mb-10 flex flex-col items-center gap-4 rounded-2xl bg-white/10 p-6 text-center md:flex-row md:text-right">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-teal-deep">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold text-white">{GEFEN.title}</p>
            <p className="mt-1 text-sm text-white/80">{GEFEN.subtitle}</p>
            <p className="mt-2 text-sm text-white/60">{GEFEN.description}</p>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {SITE_NAME_HE} ({SITE_TAGLINE_HE}) — ערכות יצירה ובנייה מעץ
              אמיתי לבתי ספר, קהילות ומשפחות.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-white">קישורים מהירים</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-white">צור קשר</h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" /> {BUSINESS.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" /> {BUSINESS.email}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" /> {BUSINESS.address}
              </li>
              <li>{BUSINESS.hours}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-white">עקבו אחרינו</h3>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="פייסבוק"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-orange"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="אינסטגרם"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-orange"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm text-white/70">משלוחים לכל הארץ</p>
              <div className="flex gap-2">
                {["VISA", "Mastercard", "PayBox"].map((provider) => (
                  <span
                    key={provider}
                    className="rounded-md bg-white px-2.5 py-1 text-xs font-bold text-slate"
                  >
                    {provider}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-center text-sm text-white/60">
          <p>מספקים לוועדי הורים וירידי קהילה ברחבי הארץ · {GEFEN.title}</p>
          <p className="mt-2">© 2026 {SITE_NAME_HE} — כל הזכויות שמורות</p>
        </div>
      </div>
    </footer>
  );
}
