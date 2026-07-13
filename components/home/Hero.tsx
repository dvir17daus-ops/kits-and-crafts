import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { GefenBadge } from "@/components/trust/GefenBadge";
import { Award, Building2, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[560px] overflow-hidden grain-bg">
      <Image
        src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1600&h=900&fit=crop"
        alt="ילדים יוצרים יחד מעץ"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-cream via-cream/95 to-cream/70" />

      <div className="container-narrow relative section-padding">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <GefenBadge variant="compact" />
          </div>
          <h1 className="text-4xl font-bold leading-tight text-slate md:text-5xl lg:text-6xl">
            יוצרים זיכרונות: ערכות בנייה ויצירה מעץ אמיתי לכל המשפחה
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">
            איכות פרימיום לירידי בתי ספר, פעילויות כיתתיות ויצירה משפחתית —
            עץ אמיתי, הוראות בעברית, חוויה ששווה לשמור.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/wood-kits">
              <Button size="lg">לכל הערכות</Button>
            </Link>
            <Link href="/contact?type=institution">
              <Button size="lg" variant="accent">
                הזמנה לוועד / יריד
              </Button>
            </Link>
          </div>

          <div className="mt-10 border-t border-sand/60 pt-8">
            <p className="text-sm font-medium text-muted">
              נבחרו על ידי ועדי הורים ומוסדות חינוך
            </p>
            <div className="mt-4 flex items-center justify-center gap-6 opacity-60">
              <div className="flex items-center gap-2 text-sm text-slate">
                <Users className="h-5 w-5" />
                <span>ועדי הורים</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate">
                <Building2 className="h-5 w-5" />
                <span>בתי ספר</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gefen">
                <Award className="h-5 w-5" />
                <span>גפ&quot;ן</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
