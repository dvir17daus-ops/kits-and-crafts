import { ProductGridSkeleton } from "@/components/products/ProductSkeleton";

export default function Loading() {
  return (
    <div className="container-narrow section-padding">
      <div className="mb-10 space-y-3">
        <div className="skeleton h-10 w-64 rounded-lg" />
        <div className="skeleton h-5 w-96 max-w-full rounded-lg" />
      </div>
      <ProductGridSkeleton count={8} />
    </div>
  );
}
