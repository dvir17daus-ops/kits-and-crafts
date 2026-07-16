import Link from "next/link";
import Image from "next/image";
import { BrandMark } from "@/components/brand/BrandMark";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden sm:min-h-[85vh]">
      <Image
        src="/images/hero-crafting.jpg"
        alt="ידיים קטנות ביצירה עם צבעים ומכחולים על שולחן הסדנה"
        fill
        priority
        className="object-cover object-center scale-105 animate-[hero-drift_18s_ease-in-out_infinite_alternate]"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-l from-slate/55 via-slate/25 to-teal-deep/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-slate/50 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="container-narrow relative flex min-h-[78vh] flex-col justify-end pb-14 pt-24 sm:min-h-[85vh] sm:pb-20 sm:pt-28">
        <div className="max-w-xl animate-[hero-panel-in_0.9s_cubic-bezier(0.16,1,0.3,1)_both]">
          <BrandMark size="hero" />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/summer-kits">
              <Button size="lg">לקולקציית הקיץ</Button>
            </Link>
            <Link href="/wood-kits">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 bg-white/10 text-white hover:border-white hover:bg-white hover:text-slate"
              >
                ערכות בנייה בעץ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
