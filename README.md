# הסדנאייה — מבית בואו נחגוג

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

## חיבור Google Sheets

הגיליון של האתר: [הסדנאייה — Google Sheets](https://docs.google.com/spreadsheets/d/18i5pGMyeGW_-M8Nm7UE4oPgYu9ZDuC0bHsnFehTp_GQ/edit)

1. ייבאו את הקובץ [`data/products-sheet-template.csv`](data/products-sheet-template.csv) לגיליון  
   (קובץ → ייבוא → העלאה → החלף את הגיליון / הוסף לראשון).
2. ודאו ששיתוף הגיליון הוא **"כל מי שיש לו את הקישור יכול לצפות"**.
3. ב-`.env.local` (וכן ב-Vercel → Environment Variables):

```
NEXT_PUBLIC_SHEETS_API_URL=https://opensheet.elk.sh/18i5pGMyeGW_-M8Nm7UE4oPgYu9ZDuC0bHsnFehTp_GQ/1
```

4. אחרי ייבוא — האתר קורא מוצרים מהגיליון (עם גיבוי ל-`data/products.json` אם הגיליון ריק/לא זמין).

### כותרות העמודות (שורה 1)

הדביקו בשורה 1 (מופרד בטאבים או העתיקו כשורה אחת לגיליון):

```
מזהה	שם המוצר	תיאור	מחיר	מחיר מקורי	קטגוריה	קישור לתמונה	קישור לסרטון	גיל	גודל	מה בקופסה	מומלץ בדף הבית	מבצע	אחוז הנחה	תגיות	במלאי	מתאים לבית ספר	מומלץ ליריד	כמות מינימום לקבוצה	כמות מקסימום לקבוצה	רמת קושי	זמן הכנה	דירוג	מספר ביקורות	כמות במלאי	מחיר הדרכה
```

- **מחיר הדרכה** (עמודה חדשה): מספר בשקלים. אם כתוב מחיר — בעגלה תופיע אפשרות «הוספת הדרכה» במחיר הזה. **אם אין הדרכה למוצר — השאירו את התא ריק**.
- **קטגוריה**: `ערכות בנייה בעץ` / `ערכות יצירה בקיץ` / `ערכות אומנות בחוטים` / `ערכות חגי ישראל` / `מבצעים`
- **כן/לא**: מומלץ, מבצע, במלאי, מתאים לבית ספר, מומלץ ליריד
- **מה בקופסה / תגיות**: אפשר לכתוב בכמה דרכים:
  1. **ירידת שורה בתוך התא** (מומלץ) — ב־Excel: `Alt + Enter` (Windows) או `Option + Enter` / `Ctrl + Option + Enter` (Mac). ב־Google Sheets: `Ctrl + Enter` (Windows) או `⌘ + Enter` (Mac). כל שורה = פריט נפרד באתר.
  2. בשורה אחת עם `|` ביניהם, למשל: `חלקי עץ | דבק | מדריך`
  3. שורות נוספות מתחת למוצר שבהן ממלאים רק את עמודת «מה בקופסה» (בלי שם מוצר) — יתווספו לאותה ערכה.
- **קישור לתמונה**: אפשר כמה תמונות לאותו מוצר:
  1. כמה קישורים באותו תא, כל קישור בשורה נפרדת (`Alt + Enter` / `Option + Enter`)
  2. או מופרדים ב- `|`
  3. או עמודה נוספת **תמונות נוספות** / **תמונה 2** / **תמונה 3**…
  התמונה הראשונה היא תמונת השער; באתר יש חצים, החלפה אוטומטית כל כמה שניות, והגדלה.
- **קישור לסרטון**: YouTube / Vimeo / קובץ mp4 (אופציונלי)

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
