import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SITE_NAME_HE, SITE_TAGLINE_HE } from "@/lib/constants";

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
        className="absolute inset-0 bg-gradient-to-l from-slate/75 via-slate/45 to-teal-deep/55"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-slate/50 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="container-narrow relative flex min-h-[78vh] flex-col justify-end pb-14 pt-24 sm:min-h-[85vh] sm:pb-20 sm:pt-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-white/80 sm:text-base">
            {SITE_TAGLINE_HE}
          </p>
          <h1 className="mt-2 font-logo text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {SITE_NAME_HE}
          </h1>
          <p className="mt-5 max-w-lg text-lg font-medium leading-relaxed text-white/90 sm:text-xl">
            ערכות יצירה ובנייה מעץ אמיתי — לילדים, למשפחה ולירידי בתי ספר.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/summer-kits">
              <Button size="lg">לקולקציית הקיץ</Button>
            </Link>
            <Link href="/wood-kits">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-white hover:border-white hover:bg-white hover:text-slate"
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
