const SHEETS_API_URL = process.env.NEXT_PUBLIC_SHEETS_API_URL;
const FETCH_TIMEOUT_MS = 4000;

// In-memory cache of the last successfully fetched product list.
let lastGoodRemoteData = null;

const CATEGORY_FROM_HE = {
  "ערכות בנייה בעץ": "wood-building",
  "בנייה בעץ": "wood-building",
  "wood-building": "wood-building",
  "ערכות יצירה בקיץ": "summer-craft",
  "יצירה בקיץ": "summer-craft",
  "summer-craft": "summer-craft",
  "ערכות אומנות בחוטים": "string-art",
  "אומנות בחוטים": "string-art",
  "string-art": "string-art",
  מבצעים: "bundle-deal",
  "bundle-deal": "bundle-deal",
};

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

function pick(row, ...keys) {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== "") {
      return row[key];
    }
  }
  return undefined;
}

function toBool(value, fallback = false) {
  if (value === undefined || value === null || value === "") return fallback;
  const s = String(value).trim().toLowerCase();
  return ["כן", "yes", "true", "1", "v", "✓", "x"].includes(s);
}

function toNumber(value, fallback = null) {
  if (value === undefined || value === null || value === "") return fallback;
  const n = Number(String(value).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : fallback;
}

function toList(value) {
  if (Array.isArray(value)) return value.map(String).map((s) => s.trim()).filter(Boolean);
  if (value === undefined || value === null || value === "") return [];
  return String(value)
    .split(/[|،,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeCategory(raw) {
  if (!raw) return "wood-building";
  const key = String(raw).trim();
  return CATEGORY_FROM_HE[key] || CATEGORY_FROM_HE[key.toLowerCase()] || key;
}

/**
 * Maps a Google Sheets / opensheet row (Hebrew or English headers) into a Product.
 */
export function normalizeProductRow(row, index = 0) {
  // Already a well-formed Product object (local JSON / previous normalize)
  if (row && typeof row === "object" && row.id && row.title && row.price != null && Array.isArray(row.whatsInTheBox)) {
    return {
      ...row,
      price: Number(row.price),
      originalPrice: row.originalPrice == null || row.originalPrice === "" ? null : Number(row.originalPrice),
      category: normalizeCategory(row.category),
      videoUrl: row.videoUrl || null,
      stockCount:
        row.stockCount === undefined || row.stockCount === null || row.stockCount === ""
          ? null
          : Number(row.stockCount),
    };
  }

  const title = pick(row, "שם המוצר", "title", "שם", "Title");
  if (!title) return null;

  const id = String(pick(row, "מזהה", "id", "ID") || `kit-${String(index + 1).padStart(3, "0")}`);
  const price = toNumber(pick(row, "מחיר", "price", "Price"), 0) ?? 0;
  const originalPrice = toNumber(pick(row, "מחיר מקורי", "originalPrice", "original_price"), null);
  const discountPercent = toNumber(pick(row, "אחוז הנחה", "discountPercent", "discount"), null);

  return {
    id,
    title: String(title),
    description: String(pick(row, "תיאור", "description", "Description") || ""),
    price,
    originalPrice,
    category: normalizeCategory(pick(row, "קטגוריה", "category", "Category")),
    image: String(pick(row, "קישור לתמונה", "image", "תמונה", "Image") || ""),
    videoUrl: (() => {
      const v = pick(row, "קישור לסרטון", "videoUrl", "video", "סרטון");
      return v ? String(v) : null;
    })(),
    ageGroup: String(pick(row, "גיל", "ageGroup", "age", "Age") || ""),
    size: String(pick(row, "גודל", "size", "Size") || ""),
    whatsInTheBox: toList(pick(row, "מה בקופסה", "whatsInTheBox", "whats_in_the_box")),
    isFeatured: toBool(pick(row, "מומלץ בדף הבית", "isFeatured", "featured")),
    isDeal: toBool(pick(row, "מבצע", "isDeal", "deal")),
    discountPercent,
    tags: toList(pick(row, "תגיות", "tags", "Tags")),
    inStock: toBool(pick(row, "במלאי", "inStock", "in_stock"), true),
    schoolFriendly: toBool(pick(row, "מתאים לבית ספר", "schoolFriendly", "school_friendly")),
    fairRecommended: toBool(pick(row, "מומלץ ליריד", "fairRecommended", "fair_recommended")),
    minGroupSize: toNumber(pick(row, "כמות מינימום לקבוצה", "minGroupSize", "min_group"), 1) ?? 1,
    maxGroupSize: toNumber(pick(row, "כמות מקסימום לקבוצה", "maxGroupSize", "max_group"), 30) ?? 30,
    difficulty: String(pick(row, "רמת קושי", "difficulty", "Difficulty") || "קל"),
    duration: String(pick(row, "זמן הכנה", "duration", "זמן", "Duration") || ""),
    rating: toNumber(pick(row, "דירוג", "rating", "Rating"), undefined),
    reviewCount: toNumber(pick(row, "מספר ביקורות", "reviewCount", "reviews"), undefined),
    stockCount: toNumber(pick(row, "כמות במלאי", "stockCount", "stock"), null),
  };
}

function normalizeProducts(rows) {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row, i) => normalizeProductRow(row, i))
    .filter((p) => p && p.id && p.title && p.image);
}

/**
 * @returns {Promise<{ products: any[] | null, reason?: string }>}
 * `products` is null when the remote source is unavailable / empty
 * (caller should fall back). Never throws for empty sheets.
 */
async function fetchFromSheets() {
  const { signal, clear } = withTimeout(FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(SHEETS_API_URL, {
      signal,
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return { products: null, reason: `HTTP ${res.status}` };
    }
    const json = await res.json();
    const products = normalizeProducts(json);
    if (products.length === 0) {
      // Headers-only / empty sheet is normal until products are added.
      return { products: null, reason: "empty" };
    }
    return { products };
  } catch (error) {
    return {
      products: null,
      reason: error instanceof Error ? error.message : "fetch failed",
    };
  } finally {
    clear();
  }
}

/**
 * Resilient product loader.
 *
 * Order of preference:
 * 1. Live Google Sheets API (if NEXT_PUBLIC_SHEETS_API_URL is configured).
 * 2. Last successful in-memory snapshot from a previous request.
 * 3. Bundled static `data/products.json` seed.
 */
async function loadProducts() {
  if (!SHEETS_API_URL) {
    return loadLocalFallback();
  }

  const { products, reason } = await fetchFromSheets();
  if (products) {
    lastGoodRemoteData = products;
    return products;
  }

  // Soft fallback — do not console.error (Next.js surfaces that as a red overlay).
  if (process.env.NODE_ENV === "development" && reason && reason !== "empty") {
    console.warn(`[getProducts] Sheets unavailable (${reason}), using local products`);
  }

  if (lastGoodRemoteData) {
    return lastGoodRemoteData;
  }
  return loadLocalFallback();
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
