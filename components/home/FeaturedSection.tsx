import type { Product } from "@/types/product";
import { ProductGridClient } from "@/components/products/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface FeaturedSectionProps {
  products: Product[];
}

export function FeaturedSection({ products }: FeaturedSectionProps) {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-logo text-3xl text-slate sm:text-4xl">
              ערכות מומלצות
            </h2>
            <p className="mt-2 text-muted">הבחירות שלנו — ליריד ולמשפחה</p>
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
