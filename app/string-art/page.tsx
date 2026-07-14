import { CategoryHeader } from "@/components/products/CategoryHeader";
import { ProductGridClient } from "@/components/products/ProductCard";
import { CATEGORY_INFO } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";
import { getProductsByCategory } from "@/utils/getProducts";

export const metadata = createPageMetadata(
  "ערכות אומנות בחוטים",
  "String Art — יצירות מחוטים על לוח עץ, מתאים לכל הגילאים."
);

export default async function StringArtPage() {
  const products = await getProductsByCategory("string-art");
  const info = CATEGORY_INFO["string-art"];

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
