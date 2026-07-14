import type { Product } from "@/types/product";
import { ProductGridClient } from "@/components/products/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface FeaturedSectionProps {
  products: Product[];
}

export function FeaturedSection({ products }: FeaturedSectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="heading-accent text-2xl font-bold text-slate sm:text-3xl">
              ערכות מומלצות
            </h2>
            <p className="mt-2 text-muted">הבחירות שלנו — מושלמות ליריד ולמשפחה</p>
          </div>
          <Link href="/deals">
            <Button variant="outline">לכל המבצעים</Button>
          </Link>
        </div>
        <div className="mt-10">
          <ProductGridClient products={products.slice(0, 4)} />
        </div>
      </div>
    </section>
  );
}
