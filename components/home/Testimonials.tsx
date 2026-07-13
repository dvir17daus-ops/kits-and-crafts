import { TESTIMONIALS } from "@/lib/constants";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <h2 className="heading-accent text-center text-3xl font-bold text-slate">
          מה אומרים עלינו
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="card-premium relative p-6"
            >
              <Quote className="absolute left-4 top-4 h-8 w-8 text-sand" aria-hidden="true" />
              <p className="relative text-muted leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 border-t border-sand pt-4">
                <p className="font-semibold text-slate">{t.name}</p>
                <p className="text-sm text-muted">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
