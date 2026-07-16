"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DecorativeCorner } from "@/components/home/DecorativeCorner";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1541692641319-981cc79ee10a?w=1600&h=700&fit=crop",
    alt: "בונים מגדל מקוביות עץ צבעוניות",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1600&h=700&fit=crop",
    alt: "ילדים יוצרים יחד בחוץ",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1600&h=700&fit=crop",
    alt: "ילד בונה ערכת עץ",
  },
  {
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&h=700&fit=crop",
    alt: "יצירת אומנות בחוטים",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative overflow-hidden bg-cream-dark">
      <DecorativeCorner className="pointer-events-none absolute -right-6 -top-6 z-10 hidden h-40 w-40 sm:block" />
      <DecorativeCorner
        flip
        className="pointer-events-none absolute -bottom-8 -left-8 z-10 hidden h-40 w-40 sm:block"
      />

      <div className="relative mx-auto max-w-6xl px-3 pt-4 sm:px-6 sm:pt-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-[0_16px_48px_-12px_rgba(18,98,111,0.4)] ring-1 ring-white/40 sm:aspect-[16/7] sm:rounded-3xl">
          {SLIDES.map((slide, i) => (
            <Image
              key={slide.image}
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              className={cn(
                "object-cover transition-opacity duration-700",
                i === index ? "opacity-100" : "opacity-0"
              )}
              sizes="100vw"
            />
          ))}
          <div className="absolute inset-0 bg-slate/10" />

          <button
            onClick={prev}
            aria-label="שקופית קודמת"
            className="absolute right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate shadow-md transition-transform hover:scale-105 sm:flex sm:right-3"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="שקופית הבאה"
            className="absolute left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate shadow-md transition-transform hover:scale-105 sm:flex sm:left-3"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.image}
                onClick={() => setIndex(i)}
                aria-label={`עבור לשקופית ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-6 bg-orange" : "w-2 bg-white/80"
                )}
              />
            ))}
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center px-3 sm:px-4">
            <div className="max-w-lg rounded-2xl border border-white/60 bg-white/95 px-4 py-4 text-center shadow-[0_20px_50px_-12px_rgba(28,43,58,0.35)] backdrop-blur-sm sm:rounded-3xl sm:px-10 sm:py-8">
              <h1 className="bg-gradient-to-l from-orange to-orange-dark bg-clip-text text-xl font-extrabold text-transparent sm:text-3xl md:text-4xl">
                בונים בקיץ הזה!
              </h1>
              <p className="mt-2 text-xs font-medium text-slate sm:text-base">
                ערכות יצירה חוויתיות לילדים — עץ אמיתי, הוראות בעברית ואישור
                גפ&quot;ן להזמנות בתי ספר וירידים.
              </p>
              <div className="mt-3 sm:mt-5">
                <Link href="/summer-kits">
                  <span className="block sm:hidden">
                    <Button size="sm">לקולקציית הקיץ</Button>
                  </span>
                  <span className="hidden sm:block">
                    <Button size="md">לקולקציית הקיץ</Button>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
