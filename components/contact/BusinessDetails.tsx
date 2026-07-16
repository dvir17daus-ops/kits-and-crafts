import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export function BusinessDetails() {
  const phoneHref = `tel:${BUSINESS.phone.replace(/-/g, "")}`;

  return (
    <div className="card-premium space-y-6 p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate">פרטי עסק</h2>
      <ul className="space-y-4">
        <li>
          <a
            href={phoneHref}
            className="inline-flex items-center gap-3 text-muted transition-colors hover:text-primary"
          >
            <Phone className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <span dir="ltr">{BUSINESS.phone}</span>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="inline-flex items-center gap-3 text-muted transition-colors hover:text-primary"
          >
            <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <span>{BUSINESS.email}</span>
          </a>
        </li>
        <li className="inline-flex items-center gap-3 text-muted">
          <Clock className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <span>{BUSINESS.hours}</span>
        </li>
        <li className="inline-flex items-center gap-3 text-muted">
          <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <span>{BUSINESS.address}</span>
        </li>
      </ul>
    </div>
  );
}
