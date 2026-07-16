import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section className="section-padding bg-cream-dark">
      <div className="container-narrow">
        <h2 className="text-center font-logo text-3xl text-slate sm:text-4xl">
          מה אומרים עלינו
        </h2>

        <blockquote className="mx-auto mt-10 max-w-3xl text-center">
          <p className="font-logo text-2xl leading-relaxed text-slate sm:text-3xl md:text-[2.15rem]">
            &ldquo;{featured.quote}&rdquo;
          </p>
          <footer className="mt-6">
            <p className="font-bold text-slate">{featured.name}</p>
            <p className="mt-1 text-sm text-muted">{featured.role}</p>
          </footer>
        </blockquote>

        {rest.length > 0 && (
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 border-t border-sand pt-10 sm:grid-cols-2">
            {rest.map((t) => (
              <blockquote key={t.name}>
                <p className="text-muted leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4">
                  <p className="text-sm font-bold text-slate">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
