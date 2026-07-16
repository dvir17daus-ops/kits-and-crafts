import type { Product } from "@/types/product";

export const SITE_NAME = "הסדנאייה";
export const SITE_NAME_HE = "הסדנאייה";
/** שתי האותיות הראשונות (מימין) — כתום כמו בלוגו */
export const SITE_NAME_ORANGE = "הס";
/** שאר האותיות — טורקיז כמו בלוגו */
export const SITE_NAME_TEAL = "דנאייה";
export const SITE_TAGLINE_HE = "מבית בואו נחגוג";
/** הסלוגן מתחת לשם — כמו בלוגו */
export const SITE_SLOGAN_HE = "ערכות יצירה ובנייה מעץ לילדים";
// שם העסק הרשום (הישות המשפטית המפעילה את "הסדנאייה")
export const LEGAL_BUSINESS_NAME = 'א.נ.ד.ר קידום והפקות';

export const GEFEN = {
  title: "מאושרים בגפ\"ן",
  number: "37512",
  subtitle: "ספק מאושר משרד החינוך · מספר 37512",
  /** Short line for homepage trust strip */
  homeLabel: "פעילויות מאושרות בגפ\"ן · מספר 37512",
  description:
    "הסדנאייה מאושרים במערכת גפ\"ן (גני ילדים, פנימיות ונוער) של משרד החינוך — מספר ספק 37512. ניתן להזמין ישירות דרך מערכת גפ\"ן לפעילויות כיתתיות, ירידים וחוגים.",
  badgeLabel: "גפ\"ן",
  features: [
    "הזמנה ישירה דרך מערכת גפ\"ן",
    "מספר ספק 37512",
    "מאושרים לפעילויות בבתי ספר",
    "מתאים לוועדי הורים ומוסדות חינוך",
  ],
} as const;

export const NAV_LINKS = [
  { href: "/", label: "דף הבית" },
  { href: "/summer-kits", label: "ערכות יצירה בקיץ" },
  { href: "/wood-kits", label: "ערכות בנייה בעץ" },
  { href: "/string-art", label: "ערכות אומנות בחוטים" },
  { href: "/holiday-crafts", label: "יצירות חגי ישראל" },
  { href: "/deals", label: "מבצעים" },
  { href: "/contact", label: "צור קשר" },
] as const;

export const CATEGORY_INFO: Record<
  string,
  { title: string; description: string; href: string }
> = {
  "summer-craft": {
    title: "ערכות יצירה בקיץ",
    description:
      "פעילויות יצירה וחוץ לקיץ — מושלם לקייטנות, ימי כיף וירידי קיץ בבית הספר.",
    href: "/summer-kits",
  },
  "wood-building": {
    title: "ערכות בנייה בעץ",
    description:
      "ערכות נגרות ובנייה מעץ אמיתי — חוויה מלאה עם כלים בטוחים והוראות בעברית.",
    href: "/wood-kits",
  },
  "string-art": {
    title: "ערכות אומנות בחוטים",
    description:
      "יצירות String Art מרהיבות — פעילות יצירתית שמתאימה לכל הגילאים.",
    href: "/string-art",
  },
  "holiday-craft": {
    title: "יצירות חגי ישראל",
    description:
      "ערכות יצירה לחגי ישראל — ראש השנה, סוכות, חנוכה, פורים ועוד. מתאים לגנים, בתי ספר ומשפחות.",
    href: "/holiday-crafts",
  },
  "bundle-deal": {
    title: "מבצעים והנחות",
    description: "חבילות משתלמות לוועדי הורים, ירידים והזמנות כמות.",
    href: "/deals",
  },
};

export const BUNDLE_DISCOUNT_PERCENT = 15;
export const BUNDLE_MIN_ITEMS = 2;

// הערה: מחירי המשלוח הם ערכי דוגמה — יש לאשר/לעדכן בהתאם למדיניות המשלוחים בפועל.
export const SHIPPING_COST = 25;
export const FREE_SHIPPING_THRESHOLD = 250;

export const BUSINESS = {
  phone: "058-7387300",
  email: "Anderkidum@gmail.com",
  whatsapp: "972587387300",
  hours: "א'-ה', 9:00–18:00",
  address: "הנביאים 1, ראש העין",
} as const;

export const TESTIMONIALS = [
  {
    quote:
      "הילדים היו גאים להציג את מה שבנו — האיכות הרגישה מקצועית, והעובדה שמאושרים בגפ\"ן הקלה עלינו בהזמנה.",
    name: "רונית כ.",
    role: "יו\"ר ועד הורים, תל אביב",
  },
  {
    quote:
      "המדריך בעברית ברור, לא היינו צריכים להסביר כלום. ערכה מושלמת לשיעור יצירה.",
    name: "מיכל ש.",
    role: "מורה, כיתה ג'",
  },
  {
    quote:
      "הזמנו 80 ערכות ליריד — הכל הגיע ארוז ומסודר, בדיוק בזמן.",
    name: "דוד ל.",
    role: "יריד קהילתי, חיפה",
  },
] as const;

// תוספות קטנות שמוצעות בסל הקניות (upsell) — אין להן תמונת מוצר, מוצגות עם אייקון.
export const UPSELL_ADDONS: Product[] = [
  {
    id: "addon-glue-brush",
    title: "סט דבק ומברשות איכותי",
    description: "דבק חוזק לעץ + 3 מברשות יצירה בגדלים שונים — משלים כל ערכה.",
    price: 10,
    originalPrice: null,
    category: "bundle-deal",
    image: "",
    ageGroup: "לכל הגילאים",
    size: "מארז קטן",
    whatsInTheBox: ["דבק חוזק לעץ 50 מ״ל", "3 מברשות יצירה בגדלים שונים"],
    isFeatured: false,
    isDeal: false,
    discountPercent: null,
    tags: ["addon"],
    inStock: true,
    schoolFriendly: true,
    fairRecommended: false,
    minGroupSize: 1,
    maxGroupSize: 1,
    difficulty: "קל",
    duration: "",
    isAddon: true,
    rating: 4.7,
    reviewCount: 19,
    stockCount: null,
  },
  {
    id: "addon-gift-wrap",
    title: "עטיפת מתנה מהודרת",
    description: "עטיפה בנייר איכותי + כרטיס ברכה — מוכן לחגוג.",
    price: 15,
    originalPrice: null,
    category: "bundle-deal",
    image: "",
    ageGroup: "לכל הגילאים",
    size: "",
    whatsInTheBox: ["נייר עטיפה", "כרטיס ברכה", "סרט קישוט"],
    isFeatured: false,
    isDeal: false,
    discountPercent: null,
    tags: ["addon"],
    inStock: true,
    schoolFriendly: false,
    fairRecommended: false,
    minGroupSize: 1,
    maxGroupSize: 1,
    difficulty: "קל",
    duration: "",
    isAddon: true,
    rating: 4.6,
    reviewCount: 11,
    stockCount: null,
  },
];

// כמות מלאי נמוכה שממנה מוצג דגש דחיפות ("נותרו X בלבד במלאי") בכרטיס/במודל המוצר.
export const LOW_STOCK_THRESHOLD = 6;

// קודי קופון פעילים. ניתן להוסיף/להסיר קודים כאן — ההנחה מחושבת באחוזים מסכום העגלה (לפני משלוח).
export const COUPON_CODES: Record<string, { percent: number; label: string }> = {
  WELCOME10: { percent: 10, label: "10% הנחה על ההזמנה הראשונה" },
  SUMMER15: { percent: 15, label: "15% הנחת קיץ" },
};

export const CONTACT_TYPES = [
  { id: "parent" as const, label: "הורה פרטי" },
  { id: "committee" as const, label: "ועד הורים" },
  { id: "school" as const, label: "בית ספר" },
  { id: "organization" as const, label: "עמותה / קהילה" },
];
