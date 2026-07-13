# Kits & Crafts — ערכות ויצירה

אתר E-commerce פרימיום בעברית (RTL) לערכות בנייה ויצירה מעץ אמיתי — לבתי ספר, ועדי הורים, ירידי קהילה ומשפחות.

## התקנה והרצה

```bash
npm install
npm run dev
```

פתחו [http://localhost:3000](http://localhost:3000)

## בנייה לפרודקשן

```bash
npm run build
npm start
```

## מבנה תיקיות

```
app/              # דפים (App Router)
components/       # רכיבי UI
context/          # Cart + Toast
data/             # products.json
lib/              # constants, metadata
utils/            # getProducts.js, validation, formatPrice
types/            # TypeScript types
public/           # תמונות סטטיות
```

## הוספת מוצר

ערכו את [`data/products.json`](data/products.json):

```json
{
  "id": "kit-019",
  "title": "שם המוצר",
  "description": "תיאור",
  "price": 99,
  "category": "wood-building",
  "image": "https://images.unsplash.com/...",
  "ageGroup": "גילאי 6+",
  "size": "20×15 ס״מ",
  "whatsInTheBox": ["פריט 1", "פריט 2"],
  "isFeatured": false,
  "isDeal": false,
  "schoolFriendly": true,
  "fairRecommended": true,
  "difficulty": "קל",
  "duration": "45 דקות"
}
```

## חיבור Google Sheets (עתידי)

1. העתיקו `.env.local.example` ל-`.env.local`
2. הגדירו `NEXT_PUBLIC_SHEETS_API_URL` לכתובת API
3. [`utils/getProducts.js`](utils/getProducts.js) יטען אוטומטית מה-API

## פלטת צבעים

| שם | ערך |
|----|-----|
| cream | `#faf8f5` |
| primary | `#b85233` |
| accent | `#2d4a3e` |
| gefen | `#1e4d8c` |
| gold | `#c9a96e` |

## גופן

Assistant (Google Fonts) — תומך עברית מלאה.

## מאושרים בגפ"ן

האתר מציג באופן בולט את אישור גפ"ן (מערכת משרד החינוך) — ניתן לעדכן טקסטים ב-[`lib/constants.ts`](lib/constants.ts).
