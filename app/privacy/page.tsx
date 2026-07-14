import { createPageMetadata } from "@/lib/metadata";
import { BUSINESS, SITE_NAME_HE } from "@/lib/constants";

export const metadata = createPageMetadata(
  "מדיניות פרטיות",
  "כיצד הסדנאייה אוספת, משתמשת ומגנה על פרטי המשתמשים באתר."
);

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-slate">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="container-narrow section-padding">
    <div className="mx-auto max-w-3xl">
      <h1 className="heading-accent text-2xl font-bold text-slate sm:text-3xl md:text-4xl">
        מדיניות פרטיות
      </h1>
      <p className="mt-4 leading-relaxed text-muted">
        {SITE_NAME_HE} מכבדת את פרטיות המשתמשים באתר ופועלת בהתאם לחוק
        הגנת הפרטיות, התשמ&quot;א-1981. מדיניות זו מפרטת אילו מידע נאסף,
        כיצד נעשה בו שימוש וכיצד ניתן לפנות אלינו בנושא.
      </p>

      <Section title="1. איזה מידע אנו אוספים">
        <ul className="list-inside list-disc space-y-1.5">
          <li>
            פרטים שאתם מוסרים ביודעין: שם, טלפון, כתובת, דוא&quot;ל
            והערות — בעת יצירת קשר או ביצוע הזמנה.
          </li>
          <li>
            מידע טכני שנאסף אוטומטית (עוגיות/Cookies) לצורך תפקוד עגלת
            הקניות ושמירת העדפות גלישה במכשיר שלכם.
          </li>
          <li>נתוני שימוש כלליים באתר לצורכי שיפור השירות (ללא זיהוי אישי).</li>
        </ul>
      </Section>

      <Section title="2. כיצד אנו משתמשים במידע">
        <ul className="list-inside list-disc space-y-1.5">
          <li>טיפול בהזמנות, יצירת קשר ומענה לפניות.</li>
          <li>הפקת הצעות מחיר לוועדי הורים, בתי ספר ומוסדות חינוך.</li>
          <li>שיפור חוויית המשתמש והתאמת תכנים ומבצעים.</li>
          <li>עמידה בדרישות חוק, ככל שנדרש.</li>
        </ul>
        <p>
          החברה לא תמכור, תשכיר או תעביר את פרטיכם האישיים לצד שלישי
          למטרות שיווקיות, ללא הסכמתכם המפורשת.
        </p>
      </Section>

      <Section title="3. אבטחת מידע">
        <p>
          האתר פועל בתקשורת מוצפנת (HTTPS) ומיישם אמצעי אבטחה מקובלים
          להגנה על המידע הנמסר. עם זאת, אין באפשרותנו להתחייב לחסינות
          מוחלטת מפני גישה לא מורשית.
        </p>
      </Section>

      <Section title="4. עוגיות (Cookies)">
        <p>
          האתר עושה שימוש בעוגיות לצורך תפעול עגלת הקניות ולשיפור חוויית
          הגלישה. ניתן לחסום עוגיות בהגדרות הדפדפן, אך פעולה זו עשויה
          לפגוע בתפקוד חלק מהאתר.
        </p>
      </Section>

      <Section title="5. זכות עיון ותיקון מידע">
        <p>
          בהתאם לחוק הגנת הפרטיות, כל אדם רשאי לפנות ולבקש לעיין במידע
          שנאסף עליו, ולבקש את תיקונו או מחיקתו. ניתן לפנות בנושא בטלפון{" "}
          {BUSINESS.phone} או בדוא&quot;ל {BUSINESS.email}.
        </p>
        <p>מדיניות זו עודכנה לאחרונה בשנת 2026.</p>
      </Section>
    </div>
    </div>
  );
}
