import Link from "next/link";
import { FileCheck, Package, Users, BookOpen, Award } from "lucide-react";
import { GefenBadge } from "@/components/trust/GefenBadge";
import { Button } from "@/components/ui/Button";

const features = [
  {
    icon: FileCheck,
    title: "חשבונית מס",
    desc: "לוועד הורים, עמותות ובתי ספר",
  },
  {
    icon: Package,
    title: "ארוזים ליריד",
    desc: "כל ערכה מוכנה לשולחן — ללא הכנה מוקדמת",
  },
  {
    icon: Users,
    title: "הנחות כמות",
    desc: "20+ ערכות — הצעת מחיר מותאמת",
  },
  {
    icon: BookOpen,
    title: "מדריך + סרטון",
    desc: "הוראות בעברית לכל ערכה",
  },
];

export function InstitutionsSection() {
  return (
    <section className="section-padding bg-cream-dark">
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-gefen">
            <Award className="h-5 w-5" />
            <span className="text-sm font-semibold">מאושרים בגפ&quot;ן</span>
          </div>
          <h2 className="heading-accent text-2xl font-bold text-slate sm:text-3xl md:text-4xl">
            פתרון מושלם לירידי בתי ספר ואירועי קהילה
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            אנחנו מלווים ועדי הורים, מורים וארגונים קהילתיים — מההזמנה ועד
            היום עצמו.
          </p>
        </div>

        <div className="mt-10">
          <GefenBadge variant="banner" />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-premium p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-light to-accent text-white shadow-md shadow-accent/25">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-slate">{title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/contact?type=institution">
            <Button size="lg" variant="accent">
              צרו קשר להזמנת כמות
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
