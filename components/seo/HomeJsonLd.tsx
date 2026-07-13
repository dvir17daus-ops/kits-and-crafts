import type { Product } from "@/types/product";

interface JsonLdProps {
  products: Product[];
}

export function HomeJsonLd({ products }: JsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ערכות מומלצות — הסדנאייה",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: product.image,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "ILS",
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
