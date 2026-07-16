import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BUSINESS, GEFEN } from "@/lib/constants";

export function BusinessDetails() {
  const phoneHref = `tel:${BUSINESS.phone.replace(/-/g, "")}`;

  return (
    <div className="card-premium space-y-6 p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate">פרטי עסק</h2>
      <ul className="space-y-4">
        <li>
          <a
            href={phoneHref}
            className="flex items-start gap-3 text-muted transition-colors hover:text-primary"
            dir="ltr"
          >
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span>{BUSINESS.phone}</span>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="flex items-start gap-3 text-muted transition-colors hover:text-primary"
          >
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span>{BUSINESS.email}</span>
          </a>
        </li>
        <li className="flex items-start gap-3 text-muted">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span>{BUSINESS.hours}</span>
        </li>
        <li className="flex items-start gap-3 text-muted">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span>{BUSINESS.address}</span>
        </li>
      </ul>
      <div className="rounded-xl border border-gefen/20 bg-gefen-light p-4">
        <p className="font-semibold text-gefen">{GEFEN.title}</p>
        <p className="mt-1 text-sm text-muted">{GEFEN.description}</p>
      </div>
    </div>
  );
}
