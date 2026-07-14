import { TESTIMONIALS } from "@/lib/constants";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <h2 className="heading-accent text-center text-2xl font-bold text-slate sm:text-3xl">
          מה אומרים עלינו
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="card-premium relative p-6 pt-14"
            >
              <span className="absolute right-6 top-0 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange to-orange-dark text-white shadow-md shadow-orange/30">
                <Quote className="h-5 w-5" fill="white" aria-hidden="true" />
              </span>
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
