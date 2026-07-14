import { ArrowLeft } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "בוחרים ערכות",
    description: "לפי גיל, קטגוריה וסוג פעילות — בית ספר, יריד או בית",
  },
  {
    number: "02",
    title: "מזמינים כמות",
    description: "דרך העגלה או טופס צור קשר — חשבונית מס לוועדים",
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
        <h2 className="heading-accent text-center text-2xl font-bold text-slate sm:text-3xl">
          איך זה עובד?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted">
          3 שלבים פשוטים לוועד הורים או מוסד חינוך
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {index < steps.length - 1 && (
                <div
                  className="absolute left-0 top-8 hidden h-0.5 w-full -translate-x-1/2 bg-sand md:block"
                  aria-hidden="true"
                />
              )}
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-sand bg-white text-2xl font-bold text-primary/40">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-slate">{step.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <ArrowLeft
                  className="mx-auto mt-4 h-5 w-5 text-sand md:hidden"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
