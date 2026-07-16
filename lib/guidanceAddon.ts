import type { Product } from "@/types/product";
import { GUIDANCE_ADDON_ID_PREFIX } from "@/lib/constants";

export function guidanceAddonIdFor(productId: string) {
  return `${GUIDANCE_ADDON_ID_PREFIX}${productId}`;
}

export function hasGuidancePrice(
  product: Product
): product is Product & { guidancePrice: number } {
  return (
    typeof product.guidancePrice === "number" &&
    Number.isFinite(product.guidancePrice) &&
    product.guidancePrice > 0
  );
}

/** Build a cart-only guidance add-on from a catalog product that has `מחיר הדרכה`. */
export function createGuidanceAddon(product: Product): Product | null {
  if (!hasGuidancePrice(product)) return null;

  return {
    id: guidanceAddonIdFor(product.id),
    title: `הדרכה — ${product.title}`,
    description: `הדרכה חיה לפעילות עם הערכה "${product.title}".`,
    price: product.guidancePrice,
    originalPrice: null,
    category: product.category,
    image: "",
    ageGroup: product.ageGroup,
    size: "",
    whatsInTheBox: ["הדרכה חיה לפעילות"],
    isFeatured: false,
    isDeal: false,
    discountPercent: null,
    tags: ["addon", "guidance"],
    inStock: true,
    schoolFriendly: product.schoolFriendly,
    fairRecommended: product.fairRecommended,
    minGroupSize: 1,
    maxGroupSize: 1,
    difficulty: "קל",
    duration: product.duration || "",
    isAddon: true,
    stockCount: null,
  };
}
