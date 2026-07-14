"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { GefenBadge } from "@/components/trust/GefenBadge";
import { BUSINESS, CONTACT_TYPES, SITE_NAME_HE } from "@/lib/constants";
import {
  isValidEmail,
  isValidIsraeliPhone,
  validationMessages,
} from "@/utils/validation";
import type { ContactType } from "@/types/product";
import { cn } from "@/lib/utils";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [type, setType] = useState<ContactType>("parent");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [estimatedQuantity, setEstimatedQuantity] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeParam === "institution") {
      setType("committee");
      setMessage("שלום, אנחנו מעוניינים בהצעת מחיר ליריד / הזמנת כמות.");
    }
  }, [typeParam]);

  const isInstitution =
    type === "committee" || type === "school" || type === "organization";

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = validationMessages.required;
    if (!phone.trim()) e.phone = validationMessages.required;
    else if (!isValidIsraeliPhone(phone)) e.phone = validationMessages.phone;
    if (email && !isValidEmail(email)) e.email = validationMessages.email;
    if (!message.trim()) e.message = validationMessages.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(false);

    const typeLabel = CONTACT_TYPES.find((t) => t.id === type)?.label ?? type;

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(BUSINESS.email)}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: (() => {
            const fd = new FormData();
            fd.append("_subject", `פנייה חדשה מהאתר — ${SITE_NAME_HE}`);
            fd.append("סוג פנייה", typeLabel);
            fd.append("שם", name);
            fd.append("טלפון", phone);
            if (email) fd.append("אימייל", email);
            if (institutionName) fd.append("שם מוסד / ועד", institutionName);
            if (estimatedQuantity)
              fd.append("כמות משוערת", estimatedQuantity);
            if (eventDate) fd.append("תאריך אירוע", eventDate);
            fd.append("הודעה", message);
            return fd;
          })(),
        }
      );

      if (!res.ok) throw new Error("שליחה נכשלה");
      setSent(true);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappText = encodeURIComponent(
    isInstitution
      ? "שלום, אני מוועד/מוסד חינוך ומעוניין/ת בהצעת מחיר ליריד / הזמנת כמות"
      : "שלום, אשמח לקבל מידע על הערכות"
  );

  if (sent) {
    return (
      <div className="card-premium p-8 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-accent" />
        <h3 className="mt-4 text-xl font-bold text-slate">ההודעה נשלחה</h3>
        <p className="mt-2 text-muted">נחזור אליכם תוך יום עסקים</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-premium space-y-6 p-6 md:p-8">
      <div>
        <p className="mb-3 text-sm font-medium text-slate">סוג פנייה</p>
        <div className="flex flex-wrap gap-2">
          {CONTACT_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              className={cn(
                "rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
                type === t.id
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-sand text-muted hover:border-primary/50"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {isInstitution && <GefenBadge variant="full" />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="שם *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <Input
          label="טלפון *"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
          dir="ltr"
          className="text-right"
        />
        {isInstitution && (
          <>
            <Input
              label="שם מוסד / ועד"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
            />
            <Input
              label="כמות משוערת"
              value={estimatedQuantity}
              onChange={(e) => setEstimatedQuantity(e.target.value)}
              placeholder="לדוגמה: 50"
            />
            <div className="sm:col-span-2">
              <Input
                label="תאריך אירוע / יריד"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="sm:col-span-2">
          <Input
            label="אימייל"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            dir="ltr"
            className="text-right"
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label="הודעה *"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={errors.message}
          />
        </div>
      </div>

      {submitError && (
        <p className="text-sm text-error">
          השליחה נכשלה, נסו שוב או פנו אלינו ישירות בוואטסאפ.
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "שולח..." : "שליחה"}
        </Button>
        <a
          href={`https://wa.me/${BUSINESS.whatsapp}?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            type="button"
            className="w-full bg-none! bg-whatsapp shadow-[0_2px_0_0_rgba(255,255,255,0.25)_inset,0_8px_20px_-6px_rgba(37,211,102,0.55)] hover:bg-whatsapp/90 hover:shadow-[0_2px_0_0_rgba(255,255,255,0.3)_inset,0_12px_26px_-6px_rgba(37,211,102,0.65)] sm:w-auto"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </Button>
        </a>
      </div>
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense
      fallback={
        <div className="card-premium p-8 text-center text-muted">טוען...</div>
      }
    >
      <ContactFormInner />
    </Suspense>
  );
}
