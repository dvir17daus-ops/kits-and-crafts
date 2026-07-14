import { CategoryHeader } from "@/components/products/CategoryHeader";
import { ProductGridClient } from "@/components/products/ProductCard";
import { CATEGORY_INFO } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";
import { getProductsByCategory } from "@/utils/getProducts";

export const metadata = createPageMetadata(
  "ערכות בנייה בעץ",
  "ערכות נגרות ובנייה מעץ אמיתי — מאושרים בגפ\"ן, מתאים לבתי ספר."
);

export default async function WoodKitsPage() {
  const products = await getProductsByCategory("wood-building");
  const info = CATEGORY_INFO["wood-building"];

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
