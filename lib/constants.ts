export const SITE_NAME = "הסדנאייה";
export const SITE_NAME_HE = "הסדנאייה";
export const SITE_TAGLINE_HE = "מבית בואו נחגוג";

export const GEFEN = {
  title: "מאושרים בגפ\"ן",
  subtitle: "ספק מאושר משרד החינוך",
  description:
    "הסדנאייה מאושרים במערכת גפ\"ן (גני ילדים, פנימיות ונוער) של משרד החינוך — ניתן להזמין ישירות דרך מערכת גפ\"ן לפעילויות כיתתיות, ירידים וחוגים.",
  badgeLabel: "גפ\"ן",
  features: [
    "הזמנה ישירה דרך מערכת גפ\"ן",
    "מאושרים לפעילויות בבתי ספר",
    "מתאים לוועדי הורים ומוסדות חינוך",
  ],
} as const;

export const NAV_LINKS = [
  { href: "/", label: "דף הבית" },
  { href: "/summer-kits", label: "ערכות יצירה בקיץ" },
  { href: "/wood-kits", label: "ערכות בנייה בעץ" },
  { href: "/string-art", label: "ערכות אומנות בחוטים" },
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
  "bundle-deal": {
    title: "מבצעים והנחות",
    description: "חבילות משתלמות לוועדי הורים, ירידים והזמנות כמות.",
    href: "/deals",
  },
};

export const BUNDLE_DISCOUNT_PERCENT = 15;
export const BUNDLE_MIN_ITEMS = 2;
export const MAX_QUANTITY_PER_ITEM = 10;

export const BUSINESS = {
  phone: "050-1234567",
  email: "hello@hasadnaya.co.il",
  whatsapp: "972501234567",
  hours: "א'-ה', 9:00–18:00",
  address: "ישראל",
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

export const CONTACT_TYPES = [
  { id: "parent" as const, label: "הורה פרטי" },
  { id: "committee" as const, label: "ועד הורים" },
  { id: "school" as const, label: "בית ספר" },
  { id: "organization" as const, label: "עמותה / קהילה" },
];
