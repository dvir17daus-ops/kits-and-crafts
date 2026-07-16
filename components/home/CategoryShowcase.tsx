import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { CATEGORY_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

const categories = [
  {
    key: "wood-building" as const,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&h=900&fit=crop",
    featured: true,
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
];

export function CategoryShowcase() {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <div className="max-w-xl">
          <h2 className="font-logo text-3xl text-slate sm:text-4xl">
            בחרו את הפעילות
          </h2>
          <p className="mt-3 text-muted leading-relaxed">
            שלוש קולקציות — לכל גיל, לכל אירוע, לכל עונה.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-5">
          {categories.map(({ key, image, featured }) => {
            const info = CATEGORY_INFO[key];
            return (
              <Link
                key={key}
                href={info.href}
                className={cn(
                  "group relative overflow-hidden rounded-2xl",
                  featured ? "md:row-span-2 min-h-[320px] md:min-h-0" : "min-h-[200px]"
                )}
              >
                <Image
                  src={image}
                  alt={info.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={
                    featured
                      ? "(max-width:768px) 100vw, 50vw"
                      : "(max-width:768px) 100vw, 25vw"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate/80 via-slate/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <h3
                    className={cn(
                      "font-bold text-white",
                      featured ? "text-2xl sm:text-3xl" : "text-xl"
                    )}
                  >
                    {info.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-white/90 transition-transform group-hover:-translate-x-1">
                    לצפייה
                    <ArrowLeft className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
