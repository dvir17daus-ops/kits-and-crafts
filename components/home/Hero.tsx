import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/brand/BrandMark";
import { SITE_TAGLINE_HE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden sm:min-h-[85vh]">
      <Image
        src="https://images.unsplash.com/photo-1541692641319-981cc79ee10a?w=2000&h=1200&fit=crop"
        alt="ילדים בונים יחד עם קוביות עץ צבעוניות"
        fill
        priority
        className="object-cover object-center scale-105 animate-[hero-drift_18s_ease-in-out_infinite_alternate]"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-l from-slate/70 via-slate/40 to-teal-deep/50"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-slate/55 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="container-narrow relative flex min-h-[78vh] flex-col justify-end pb-14 pt-24 sm:min-h-[85vh] sm:pb-20 sm:pt-28">
        <div className="max-w-xl rounded-3xl bg-cream/95 px-6 py-7 shadow-[0_24px_60px_-20px_rgba(28,43,58,0.45)] animate-[hero-panel-in_0.9s_cubic-bezier(0.16,1,0.3,1)_both] sm:px-10 sm:py-9">
          <p className="font-brand text-sm font-medium text-brand-brown/80">
            {SITE_TAGLINE_HE}
          </p>
          <BrandMark size="hero" className="mt-2" />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/summer-kits">
              <Button size="lg">לקולקציית הקיץ</Button>
            </Link>
            <Link href="/wood-kits">
              <Button size="lg" variant="outline">
                ערכות בנייה בעץ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
