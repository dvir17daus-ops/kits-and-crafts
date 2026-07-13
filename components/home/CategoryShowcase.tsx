import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { CATEGORY_INFO } from "@/lib/constants";

const categories = [
  {
    key: "wood-building" as const,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=450&fit=crop",
  },
  {
    key: "summer-craft" as const,
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=450&fit=crop",
  },
  {
    key: "string-art" as const,
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=450&fit=crop",
  },
];

export function CategoryShowcase() {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <h2 className="heading-accent text-3xl font-bold text-slate">קטגוריות</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {categories.map(({ key, image }) => {
            const info = CATEGORY_INFO[key];
            return (
              <Link
                key={key}
                href={info.href}
                className="card-premium group overflow-hidden hover:scale-[1.02]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image}
                    alt={info.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate group-hover:text-primary">
                    {info.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">
                    {info.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
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
