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
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-logo text-3xl text-slate sm:text-4xl">
            איך זה עובד?
          </h2>
          <p className="mt-3 text-muted">
            שלושה שלבים פשוטים לוועד הורים או מוסד חינוך
          </p>
        </div>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <li key={step.number} className="text-center md:text-right">
              <span className="font-logo text-4xl text-primary/80">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
