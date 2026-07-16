"use client";

import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "בוחרים ערכות",
    description: "לפי גיל, קטגוריה וסוג פעילות — בית ספר, יריד או בית",
  },
  {
    number: "02",
    title: "מזמינים — עם או בלי הדרכה",
    description: "דרך העגלה או וואטסאפ — אפשר להוסיף הדרכה חיה עם המוצר",
  },
  {
    number: "03",
    title: "מקבלים ארוזים",
    description: "ערכות מוכנות לשולחן היריד — ללא הכנה מוקדמת",
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding bg-cream-dark">
      <div className="container-narrow">
        <Reveal direction="up">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-logo text-3xl font-bold tracking-tight text-slate sm:text-4xl">
              איך זה עובד?
            </h2>
            <p className="mt-3 text-muted">
              שלושה שלבים פשוטים לוועד הורים או מוסד חינוך
            </p>
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <Reveal
              key={step.number}
              direction={i === 0 ? "right" : i === 2 ? "left" : "up"}
              delay={i * 140}
            >
              <li className="text-center md:text-right">
                <span className="font-logo text-4xl text-primary/80">
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-bold text-slate">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
