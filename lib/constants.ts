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
  number: "37513",
  subtitle: "ספק מאושר מטעם משרד החינוך · תוכנית מספר 37513",
  /** Short line for homepage trust strip */
  homeLabel: "פעילות מאושרת בגפ\"ן · מספר 37513",
  description:
    "פעילות מאושרת במערכת גפ\"ן מספר 37513 מטעם משרד החינוך.",
  badgeLabel: "גפ\"ן",
  features: [] as string[],
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

/** אפשרות להזמין הדרכה חיה יחד עם הערכה */
export const GUIDANCE = {
  title: "אפשר להזמין הדרכה",
  shortLabel: "הדרכה זמינה עם המוצר",
  description:
    "רוצים מדריך שמגיע עם הערכה? אפשר להזמין הדרכה לפעילות — לגנים, בתי ספר, ירידים ומשפחות.",
  cta: "להזמנת הדרכה בוואטסאפ",
  whatsappText: (productTitle?: string) =>
    productTitle
      ? `שלום! אשמח לקבל פרטים על הזמנת הדרכה יחד עם הערכה: ${productTitle}`
      : "שלום! אשמח לקבל פרטים על הזמנת הדרכה עם הערכות שלכם",
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

/** Prefix for cart guidance add-ons created from a product's `guidancePrice`. */
export const GUIDANCE_ADDON_ID_PREFIX = "guidance-";

// כמות מלאי נמוכה שממנה מוצג דגש דחיפות ("נותרו X בלבד במלאי") בכרטיס/במודל המוצר.
export const LOW_STOCK_THRESHOLD = 6;

// קודי קופון פעילים. ניתן להוסיף/להסיר קודים כאן — ההנחה מחושבת באחוזים מסכום העגלה (לפני משלוח).
export const COUPON_CODES: Record<string, { percent: number; label: string }> = {
  WELCOME10: { percent: 10, label: "10% הנחה על ההזמנה הראשונה" },
  SUMMER15: { percent: 15, label: "15% הנחת קיץ" },
};

export const CONTACT_TYPES = [
  { id: "parent" as const, label: "לקוח פרטי" },
  { id: "school" as const, label: "יריד בית ספר" },
  { id: "organization" as const, label: "הזמנת כמות" },
];
