import Link from "next/link";
import { FileCheck, Package, Users, BookOpen } from "lucide-react";
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
    title: "מדריך בעברית",
    desc: "הוראות ברורות לכל ערכה",
  },
];

export function InstitutionsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-logo text-3xl text-slate sm:text-4xl">
            לירידים, ועדים ובתי ספר
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            מלווים אתכם מההזמנה ועד היום עצמו — חשבונית מס, אריזה ליריד והנחות
            כמות.
          </p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center sm:text-right">
              <Icon
                className="mx-auto h-6 w-6 text-accent sm:mx-0"
                aria-hidden="true"
              />
              <h3 className="mt-3 font-bold text-slate">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
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
