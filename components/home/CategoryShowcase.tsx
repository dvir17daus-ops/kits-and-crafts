"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { CATEGORY_INFO } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

const categories = [
  {
    key: "wood-building" as const,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&h=900&fit=crop",
  },
  {
    key: "summer-craft" as const,
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
  },
  {
    key: "string-art" as const,
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop",
  },
  {
    key: "holiday-craft" as const,
    image:
      "https://images.unsplash.com/photo-1482514194978-3ed8cc9d7e80?w=800&h=600&fit=crop",
  },
];

export function CategoryShowcase() {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <Reveal direction="right">
          <div className="max-w-xl">
            <h2 className="font-logo text-3xl text-slate sm:text-4xl">
              בחרו את הפעילות
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              ארבע קולקציות — לכל גיל, לכל חג, לכל עונה.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ key, image }, i) => {
            const info = CATEGORY_INFO[key];
            return (
              <Reveal
                key={key}
                direction={i % 2 === 0 ? "up" : "scale"}
                delay={i * 90}
              >
                <Link
                  href={info.href}
                  className="group relative block min-h-[220px] overflow-hidden rounded-2xl sm:min-h-[240px]"
                >
                  <Image
                    src={image}
                    alt={info.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate/80 via-slate/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="text-xl font-bold text-white">{info.title}</h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-white/90 transition-transform group-hover:-translate-x-1">
                      לצפייה
                      <ArrowLeft className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
