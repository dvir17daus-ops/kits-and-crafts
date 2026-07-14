import { CategoryHeader } from "@/components/products/CategoryHeader";
import { ProductGridClient } from "@/components/products/ProductCard";
import { CATEGORY_INFO } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";
import { getProductsByCategory } from "@/utils/getProducts";

export const metadata = createPageMetadata(
  "ערכות יצירה בקיץ",
  "ערכות יצירה ופעילויות קיץ — מושלם לקייטנות, ימי כיף וירידי קיץ בבית הספר."
);

export default async function SummerKitsPage() {
  const products = await getProductsByCategory("summer-craft");
  const info = CATEGORY_INFO["summer-craft"];

  return (
    <div className="container-narrow section-padding">
      <CategoryHeader
        title={info.title}
        description={info.description}
        breadcrumb={info.title}
      />
      <ProductGridClient products={products} showControls />
    </div>
  );
}
