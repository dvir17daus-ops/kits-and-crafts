import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function SchoolFairCTA() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/kids-crafting.jpg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-teal-deep/88" aria-hidden="true" />

      <div className="container-narrow relative section-padding text-center text-white">
        <h2 className="font-logo text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          מתכננים יריד בבית הספר?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          נלווה אתכם מההזמנה ועד היום עצמו — ערכות ארוזות והנחות כמות לוועדי
          הורים.
        </p>
        <Link href="/contact?type=institution" className="mt-8 inline-block">
          <Button
            size="lg"
            className="bg-none! bg-white text-teal-deep! shadow-lg hover:bg-cream"
          >
            קבלו הצעת מחיר לוועד
          </Button>
        </Link>
      </div>
    </section>
  );
}
