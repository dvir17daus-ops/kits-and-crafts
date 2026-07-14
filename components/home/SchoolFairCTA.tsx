import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function SchoolFairCTA() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=600&fit=crop"
        alt=""
        fill
        className="object-cover blur-sm scale-105"
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-teal-deep/92 via-accent/88 to-teal-dark/92" />
      <div
        className="blob -right-24 -top-24 h-72 w-72 bg-orange/40"
        aria-hidden="true"
      />
      <div
        className="blob -bottom-20 -left-16 h-64 w-64 bg-pink/30"
        aria-hidden="true"
      />
      <div className="container-narrow relative section-padding text-center text-white">
        <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
          מתכננים יריד בבית הספר?
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/90">
          נלווה אתכם מההזמנה ועד היום עצמו — ערכות ארוזות, מאושרים בגפ&quot;ן,
          והנחות כמות לוועדי הורים.
        </p>
        <Link href="/contact?type=institution" className="mt-8 inline-block">
          <Button
            size="lg"
            className="bg-none! bg-white text-accent! shadow-[0_8px_24px_-6px_rgba(0,0,0,0.25)] hover:bg-cream"
          >
            קבלו הצעת מחיר לוועד
          </Button>
        </Link>
      </div>
    </section>
  );
}
