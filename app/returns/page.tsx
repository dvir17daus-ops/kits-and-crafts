import { createPageMetadata } from "@/lib/metadata";
import { BUSINESS, SITE_NAME_HE } from "@/lib/constants";

export const metadata = createPageMetadata(
  "מדיניות ביטול והחזרות",
  "מדיניות ביטול עסקה, החזרות והחלפות באתר הסדנאייה, בהתאם לחוק הגנת הצרכן."
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

export default function ReturnsPage() {
  return (
    <div className="container-narrow section-padding">
    <div className="mx-auto max-w-3xl">
      <h1 className="heading-accent text-2xl font-bold text-slate sm:text-3xl md:text-4xl">
        מדיניות ביטול והחזרות
      </h1>
      <p className="mt-4 leading-relaxed text-muted">
        {SITE_NAME_HE} מכבדת את זכות הצרכן לביטול עסקה בהתאם לחוק הגנת
        הצרכן, התשמ&quot;א-1981 ותקנותיו. מדיניות זו מפרטת את התנאים
        לביטול, החזרה או החלפה של מוצרים שנרכשו באתר.
      </p>

      <Section title="1. ביטול עסקה">
        <p>
          ניתן לבטל הזמנה בתוך 14 יום ממועד קבלת המוצר, ובעסקאות עם אנשים
          עם מוגבלות, אזרח/ית ותיק/ה או עולה חדש/ה — בתוך 4 חודשים, בהתאם
          לחוק. הודעת ביטול תימסר בטלפון או בדוא&quot;ל, ותכלול את מספר
          ההזמנה ופרטי הרוכש.
        </p>
      </Section>

      <Section title="2. תנאי החזרה">
        <ul className="list-inside list-disc space-y-1.5">
          <li>המוצר יוחזר באריזתו המקורית, שלם ולא פגום, ככל שניתן.</li>
          <li>
            ערכות שנפתחו לצריכה (כגון חומרי צבע חד-פעמיים) יוחזרו רק אם
            הפגם במוצר עצמו.
          </li>
          <li>
            במקרה של ביטול שלא עקב פגם — יגבו דמי ביטול בשיעור של עד 5%
            ממחיר המוצר או 100 ₪, לפי הנמוך מביניהם, בהתאם לחוק.
          </li>
          <li>ביטול עקב פגם או אי-התאמה למפרט — ללא דמי ביטול, וכולל החזר הוצאות משלוח (אם שולמו).</li>
        </ul>
      </Section>

      <Section title="3. אופן ביצוע ההחזר">
        <p>
          ההחזר הכספי יתבצע באותו אמצעי תשלום שבו בוצעה הרכישה, בתוך 14
          יום ממועד קבלת הודעת הביטול ו/או קבלת המוצר המוחזר (המאוחר
          מביניהם).
        </p>
      </Section>

      <Section title="4. הזמנות ועדי הורים ומוסדות">
        <p>
          בהזמנות כמות לוועדי הורים, בתי ספר ומוסדות חינוך — תנאי הביטול
          וההחזרה ייקבעו בהתאם להסכם הפרטני שייחתם בין הצדדים, ולא יפחתו
          מהוראות חוק הגנת הצרכן.
        </p>
      </Section>

      <Section title="5. יצירת קשר לביטול/החזרה">
        <p>
          לבקשות ביטול, החזרה או החלפה ניתן לפנות בטלפון {BUSINESS.phone}
          {" "}או בדוא&quot;ל {BUSINESS.email}, ואנו נחזור אליכם בהקדם.
        </p>
        <p>מדיניות זו עודכנה לאחרונה בשנת 2026.</p>
      </Section>
    </div>
    </div>
  );
}
