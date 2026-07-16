import { CategoryHeader } from "@/components/products/CategoryHeader";
import { ProductGridClient } from "@/components/products/ProductCard";
import { CATEGORY_INFO } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";
import { getProductsByCategory } from "@/utils/getProducts";

export const metadata = createPageMetadata(
  "יצירות חגי ישראל",
  "ערכות יצירה לחגי ישראל — ראש השנה, סוכות, חנוכה, פורים ועוד. מתאים לגנים, בתי ספר ומשפחות."
);

export default async function HolidayCraftsPage() {
  const products = await getProductsByCategory("holiday-craft");
  const info = CATEGORY_INFO["holiday-craft"];

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
