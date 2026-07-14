const SHEETS_API_URL = process.env.NEXT_PUBLIC_SHEETS_API_URL;
const FETCH_TIMEOUT_MS = 4000;

// In-memory cache of the last successfully fetched product list. If the
// remote Google Sheets API later goes down mid-session, we prefer this
// "last known good" snapshot over the static seed data, since it's fresher.
let lastGoodRemoteData = null;

function withTimeout(ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return {
    signal: controller.signal,
    clear: () => clearTimeout(timer),
  };
}

async function loadLocalFallback() {
  const data = await import("@/data/products.json");
  return data.default;
}

async function fetchFromSheets() {
  const { signal, clear } = withTimeout(FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(SHEETS_API_URL, {
      signal,
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`Google Sheets API responded with ${res.status}`);
    }
    const json = await res.json();
    if (!Array.isArray(json) || json.length === 0) {
      throw new Error("Google Sheets API returned an empty or invalid payload");
    }
    return json;
  } finally {
    clear();
  }
}

/**
 * Resilient product loader.
 *
 * Order of preference:
 * 1. Live Google Sheets API (if NEXT_PUBLIC_SHEETS_API_URL is configured).
 * 2. Last successful in-memory snapshot from a previous request in this
 *    server/session, if the live call just failed.
 * 3. The bundled static `data/products.json` seed — guaranteed to exist,
 *    so the storefront never shows a broken/empty page.
 *
 * Any failure (network error, timeout, non-200 response, malformed payload)
 * is caught here — callers always get a usable array, never a thrown error.
 */
async function loadProducts() {
  if (!SHEETS_API_URL) {
    return loadLocalFallback();
  }

  try {
    const remote = await fetchFromSheets();
    lastGoodRemoteData = remote;
    return remote;
  } catch (error) {
    console.error(
      "[getProducts] Google Sheets fetch failed, falling back:",
      error instanceof Error ? error.message : error
    );
    if (lastGoodRemoteData) {
      return lastGoodRemoteData;
    }
    return loadLocalFallback();
  }
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
