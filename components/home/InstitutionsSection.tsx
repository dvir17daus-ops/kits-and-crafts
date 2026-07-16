"use client";

import Link from "next/link";
import { FileCheck, Package, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

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
        <Reveal direction="up">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-logo text-3xl text-slate sm:text-4xl">
              לירידים, ועדים ובתי ספר
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              מלווים אתכם מההזמנה ועד היום עצמו — חשבונית מס, אריזה ליריד והנחות
              כמות.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <Reveal
              key={title}
              direction={i % 2 === 0 ? "right" : "left"}
              delay={i * 100}
            >
              <div className="text-center sm:text-right">
                <Icon
                  className="mx-auto h-6 w-6 text-accent sm:mx-0"
                  aria-hidden="true"
                />
                <h3 className="mt-3 font-bold text-slate">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="scale" delay={200} className="mt-12 text-center">
          <Link href="/contact?type=institution">
            <Button size="lg" variant="accent">
              צרו קשר להזמנת כמות
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
