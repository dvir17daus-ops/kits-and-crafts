import { createPageMetadata } from "@/lib/metadata";
import { BUSINESS, SITE_NAME_HE } from "@/lib/constants";

export const metadata = createPageMetadata(
  "הצהרת נגישות",
  "הצהרת הנגישות של הסדנאייה — עמידה בתקנות נגישות השירות ותקן ישראלי 5568."
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

export default function AccessibilityPage() {
  return (
    <div className="container-narrow section-padding">
    <div className="mx-auto max-w-3xl">
      <h1 className="heading-accent text-2xl font-bold text-slate sm:text-3xl md:text-4xl">
        הצהרת נגישות
      </h1>
      <p className="mt-4 leading-relaxed text-muted">
        {SITE_NAME_HE} רואה חשיבות רבה בהנגשת האתר לכלל הציבור, כולל אנשים עם
        מוגבלות, ופועלת להנגיש את השירותים הדיגיטליים שלה בהתאם לתקנות שוויון
        זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג-2013, ובהתאם
        לתקן הישראלי (ת״י) 5568 להנגשת תכנים באינטרנט ברמת AA.
      </p>

      <Section title="פעולות שביצענו להנגשת האתר">
        <ul className="list-inside list-disc space-y-1.5">
          <li>מבנה סמנטי וברור של כותרות, תפריטים וטפסים.</li>
          <li>אפשרות ניווט מלאה במקלדת בין רכיבי האתר, כולל תפריטים וחלונות קופצים (מודאלים).</li>
          <li>טקסט חלופי (alt) לתמונות ולסמלים המרכזיים באתר.</li>
          <li>ניגודיות צבעים נאותה בין טקסט לרקע בהתאם להנחיות התקן.</li>
          <li>תמיכה בהקטנת אנימציות עבור משתמשים עם רגישות לתנועה (prefers-reduced-motion).</li>
          <li>התאמת האתר לתצוגה בכל גודל מסך, כולל טלפון נייד וטאבלט.</li>
        </ul>
      </Section>

      <Section title="הגבלות ידועות בנגישות">
        <p>
          אנו ממשיכים לפעול לשיפור הנגישות באתר על בסיס שוטף. יתכן שחלקים
          מסוימים באתר, כגון תוכן חדש שנוסף לאחרונה או שירותי צד שלישי
          (כגון מערכת סליקת התשלומים), עדיין אינם נגישים במלואם. אנו פועלים
          לתקן ליקויים אלו בהקדם.
        </p>
      </Section>

      <Section title="פנייה בנושא נגישות">
        <p>
          נתקלתם בקושי בגלישה או במידע שאינו נגיש? נשמח לעזור ולטפל בפנייתכם
          בהקדם. ניתן לפנות אלינו:
        </p>
        <ul className="list-inside list-disc space-y-1.5">
          <li>טלפון: {BUSINESS.phone}</li>
          <li>דוא&quot;ל: {BUSINESS.email}</li>
        </ul>
        <p>הצהרה זו עודכנה לאחרונה בשנת 2026.</p>
      </Section>
    </div>
    </div>
  );
}
