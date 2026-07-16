import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { NAV_LINKS, BUSINESS, GEFEN, SITE_NAME_HE, SITE_TAGLINE_HE } from "@/lib/constants";

export function Footer() {
  const phoneHref = `tel:${BUSINESS.phone.replace(/-/g, "")}`;
  const whatsappHref = `https://wa.me/${BUSINESS.whatsapp}`;

  return (
    <footer className="bg-teal-deep text-white">
      <div className="container-narrow py-14">
        <div className="mb-10 border-b border-white/10 pb-8">
          <p className="text-sm font-bold text-white/90">{GEFEN.title}</p>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/65">
            {GEFEN.description}
          </p>
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
              <li>
                <a
                  href={phoneHref}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                  dir="ltr"
                >
                  <Phone className="h-4 w-4 shrink-0" /> {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" /> {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" /> {BUSINESS.address}
              </li>
              <li>{BUSINESS.hours}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-white">דברו איתנו</h3>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              וואטסאפ
            </a>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              משלוחים לכל הארץ · ביטול תוך 14 יום · מאושרים בגפ&quot;ן
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/15 pt-6 text-center text-sm text-white/60">
          <nav
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
            aria-label="קישורים משפטיים"
          >
            <Link href="/accessibility" className="hover:text-white">
              הצהרת נגישות
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="hover:text-white">
              תקנון האתר
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/privacy" className="hover:text-white">
              מדיניות פרטיות
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/returns" className="hover:text-white">
              ביטול והחזרות
            </Link>
          </nav>
          <p>
            © 2026 <span className="font-logo">{SITE_NAME_HE}</span> — כל
            הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  );
}
