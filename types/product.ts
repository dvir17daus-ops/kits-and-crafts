export type Category =
  | "summer-craft"
  | "wood-building"
  | "string-art"
  | "holiday-craft"
  | "bundle-deal";

export type Difficulty = "קל" | "בינוני" | "מתקדם";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number | null;
  category: Category;
  image: string;
  ageGroup: string;
  size: string;
  whatsInTheBox: string[];
  isFeatured: boolean;
  isDeal: boolean;
  discountPercent: number | null;
  tags: string[];
  inStock: boolean;
  schoolFriendly: boolean;
  fairRecommended: boolean;
  minGroupSize: number;
  maxGroupSize: number;
  difficulty: Difficulty;
  duration: string;
  /** Optional product tutorial / demo video URL (YouTube, Vimeo, or direct mp4). */
  videoUrl?: string | null;
  /** Small cart add-on (e.g. glue & brush set) rather than a full catalog item. */
  isAddon?: boolean;
  /** Average customer rating out of 5, e.g. 4.8. */
  rating?: number;
  /** Number of customer reviews behind the rating. */
  reviewCount?: number;
  /** Units left in stock. When low (see LOW_STOCK_THRESHOLD), shows an urgency message. Leave undefined/null when stock isn't tracked closely. */
  stockCount?: number | null;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export type ContactType = "parent" | "school" | "organization";

export interface ContactFormData {
  type: ContactType;
  name: string;
  phone: string;
  email: string;
  message: string;
  institutionName?: string;
  estimatedQuantity?: string;
  eventDate?: string;
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
  email: string;
  notes?: string;
}
