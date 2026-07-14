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
      <div className="absolute inset-0 bg-accent/85" />
      <div className="container-narrow relative section-padding text-center text-white">
        <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
          מתכננים יריד בבית הספר?
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/90">
          נלווה אתכם מההזמנה ועד היום עצמו — ערכות ארוזות, מאושרים בגפ&quot;ן,
          והנחות כמות לוועדי הורים.
        </p>
        <Link href="/contact?type=institution" className="mt-8 inline-block">
          <Button size="lg" className="bg-white text-accent hover:bg-cream">
            קבלו הצעת מחיר לוועד
          </Button>
        </Link>
      </div>
    </section>
  );
}
