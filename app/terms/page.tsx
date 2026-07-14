import { createPageMetadata } from "@/lib/metadata";
import { BUSINESS, LEGAL_BUSINESS_NAME, SITE_NAME_HE } from "@/lib/constants";

export const metadata = createPageMetadata(
  "תקנון האתר",
  "תנאי השימוש והרכישה באתר הסדנאייה."
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

export default function TermsPage() {
  return (
    <div className="container-narrow section-padding">
    <div className="mx-auto max-w-3xl">
      <h1 className="heading-accent text-2xl font-bold text-slate sm:text-3xl md:text-4xl">
        תקנון האתר ותנאי שימוש
      </h1>
      <p className="mt-4 leading-relaxed text-muted">
        אתר {SITE_NAME_HE} (&quot;האתר&quot;) הינו שם המסחר של{" "}
        {LEGAL_BUSINESS_NAME} (&quot;החברה&quot;/&quot;אנו&quot;). הגלישה
        באתר ו/או ביצוע הזמנה מהווה הסכמה לתנאים המפורטים בתקנון זה. אנא
        קראו אותו בעיון.
      </p>

      <Section title="1. כללי">
        <p>
          האתר משמש להצגת ולמכירת ערכות יצירה ובנייה מעץ לילדים, ובנוסף
          מיועד לאפשר לוועדי הורים, בתי ספר ומוסדות חינוך לפנות ולקבל
          הצעות מחיר להזמנות כמות. השימוש באתר מותר מגיל 18 ומעלה, או
          בפיקוח הורה/אפוטרופוס.
        </p>
      </Section>

      <Section title="2. הזמנה ותשלום">
        <p>
          הזמנה באתר מתבצעת באמצעות הוספת מוצרים לעגלת הקניות ומילוי טופס
          פרטים בתהליך הרכישה. לאחר השלמת ההזמנה תישלח אליכם התראה ליצירת
          קשר לאישור סופי ותיאום אמצעי תשלום. המחירים המוצגים באתר הם
          בשקלים חדשים (₪) וכוללים מע&quot;מ כדין, אלא אם צוין אחרת.
        </p>
        <p>
          החברה שומרת לעצמה את הזכות לעדכן מחירים, מלאי ותנאי מבצעים בכל
          עת וללא הודעה מוקדמת, ולבטל הזמנה במקרה של תיאור שגוי, טעות
          סופר במחיר, או חוסר במלאי.
        </p>
      </Section>

      <Section title="3. משלוחים">
        <p>
          זמני אספקה משוערים יימסרו בעת אישור ההזמנה. באחריות הלקוח למסור
          פרטי כתובת מדויקים. איחור באספקה כתוצאה מגורמים שאינם בשליטת
          החברה (כגון שירותי דואר/שילוח) אינו מהווה עילה לביטול העסקה,
          אלא בהתאם להוראות הדין.
        </p>
      </Section>

      <Section title="4. ביטול עסקה והחזרות">
        <p>
          מדיניות הביטולים וההחזרות המלאה מפורטת בעמוד&nbsp;
          <a href="/returns" className="font-medium text-primary hover:underline">
            מדיניות ביטול והחזרות
          </a>
          , בהתאם לחוק הגנת הצרכן, התשמ&quot;א-1981.
        </p>
      </Section>

      <Section title="5. קניין רוחני">
        <p>
          כל התכנים באתר — טקסטים, תמונות, לוגו ועיצוב — הינם רכושה
          הבלעדי של החברה ואין להעתיקם, לשכפלם או לעשות בהם שימוש מסחרי
          ללא אישור מפורש מראש ובכתב.
        </p>
      </Section>

      <Section title="6. הגבלת אחריות">
        <p>
          המוצרים הנמכרים באתר מיועדים לשימוש בהתאם לטווח הגילאים המומלץ
          המצוין בכל ערכה, ותוך פיקוח מבוגר בפעולות הכוללות כלים, צבעים
          או חלקים קטנים. החברה אינה אחראית לשימוש שאינו בהתאם להנחיות
          המצורפות לערכה.
        </p>
      </Section>

      <Section title="7. יצירת קשר">
        <p>
          {LEGAL_BUSINESS_NAME}, {BUSINESS.address}
        </p>
        <p>
          לכל שאלה או פנייה בנוגע לתקנון זה ניתן לפנות אלינו בטלפון{" "}
          {BUSINESS.phone} או בדוא&quot;ל {BUSINESS.email}.
        </p>
        <p>תקנון זה עודכן לאחרונה בשנת 2026.</p>
      </Section>
    </div>
    </div>
  );
}
