import { CategoryHeader } from "@/components/products/CategoryHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { BusinessDetails } from "@/components/contact/BusinessDetails";
import { GefenBadge } from "@/components/trust/GefenBadge";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "צור קשר",
  "יצירת קשר להזמנות, ירידי בתי ספר והצעות מחיר לוועדי הורים. מאושרים בגפ\"ן."
);

export default function ContactPage() {
  return (
    <div className="container-narrow section-padding">
      <CategoryHeader
        title="צור קשר"
        description="נשמח לעזור בהזמנות פרטיות, ירידי בתי ספר והזמנות כמות לוועדי הורים."
        breadcrumb="צור קשר"
      />
      <div className="mb-8">
        <GefenBadge variant="banner" />
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <ContactForm />
        <BusinessDetails />
      </div>
    </div>
  );
}
