import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BUNDLE_DISCOUNT_PERCENT } from "@/lib/constants";

export function DealBanner() {
  return (
    <div className="mb-10 rounded-2xl border border-primary/20 bg-gradient-to-l from-primary/5 to-cream-dark p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-2xl font-bold text-slate">
            קנה 2 ערכות וקבל {BUNDLE_DISCOUNT_PERCENT}% הנחה
          </p>
          <p className="mt-2 text-muted">
            הנחה אוטומטית בעגלה · מתאים לקנייה משפחתית
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/wood-kits">
            <Button variant="outline">לקנייה משפחתית</Button>
          </Link>
          <Link href="/contact?type=institution">
            <Button variant="accent">הזמינו 20+ ליריד</Button>
          </Link>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-gefen">
        מאושרים בגפ&quot;ן — ניתן להזמין דרך מערכת גפ&quot;ן של משרד החינוך
      </p>
    </div>
  );
}
