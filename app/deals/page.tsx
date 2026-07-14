import { CategoryHeader } from "@/components/products/CategoryHeader";
import { ProductGridClient } from "@/components/products/ProductCard";
import { DealBanner } from "@/components/deals/DealBanner";
import { CATEGORY_INFO } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";
import { getDealProducts } from "@/utils/getProducts";

export const metadata = createPageMetadata(
  "מבצעים והנחות",
  "חבילות משתלמות לוועדי הורים, ירידים והזמנות כמות — מאושרים בגפ\"ן."
);

export default async function DealsPage() {
  const products = await getDealProducts();
  const info = CATEGORY_INFO["bundle-deal"];

  return (
    <div className="container-narrow section-padding">
      <CategoryHeader
        title={info.title}
        description={info.description}
        breadcrumb="מבצעים"
      />
      <DealBanner />
      <ProductGridClient products={products} showControls />
    </div>
  );
}
