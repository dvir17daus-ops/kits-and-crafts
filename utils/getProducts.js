const SHEETS_API_URL = process.env.NEXT_PUBLIC_SHEETS_API_URL;

async function loadProducts() {
  if (SHEETS_API_URL) {
    const res = await fetch(SHEETS_API_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch products from Google Sheets");
    return res.json();
  }
  const data = await import("@/data/products.json");
  return data.default;
}

export async function getProducts() {
  return loadProducts();
}

export async function getProductsByCategory(category) {
  const products = await loadProducts();
  return products.filter((p) => p.category === category);
}

export async function getFeaturedProducts() {
  const products = await loadProducts();
  return products.filter((p) => p.isFeatured);
}

export async function getDealProducts() {
  const products = await loadProducts();
  return products.filter((p) => p.isDeal);
}

export async function getProductById(id) {
  const products = await loadProducts();
  return products.find((p) => p.id === id) ?? null;
}
