import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BUSINESS, GEFEN } from "@/lib/constants";

export function BusinessDetails() {
  return (
    <div className="card-premium space-y-6 p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate">פרטי עסק</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-3 text-muted">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span dir="ltr">{BUSINESS.phone}</span>
        </li>
        <li className="flex items-start gap-3 text-muted">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span>{BUSINESS.email}</span>
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
