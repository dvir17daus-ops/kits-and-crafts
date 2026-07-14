import {
  Truck,
  Leaf,
  ShieldCheck,
  BookMarked,
  Boxes,
  Award,
  Baby,
} from "lucide-react";
import { GEFEN } from "@/lib/constants";

const badges = [
  { icon: Award, title: GEFEN.title, desc: GEFEN.subtitle, highlight: true },
  { icon: ShieldCheck, title: "בטיחות", desc: "חומרים בטוחים, ללא רעלים" },
  { icon: Baby, title: "תג גיל", desc: "גיל מומלץ ברור בכל ערכה" },
  { icon: BookMarked, title: "מדריך בעברית", desc: "הוראות מפורטות" },
  { icon: Boxes, title: "הזמנות כמות", desc: "לוועדים וירידים" },
  { icon: Leaf, title: "עץ אקולוגי", desc: "ממקורות מוסמכים" },
  { icon: Truck, title: "משלוח מהיר", desc: "עד 5 ימי עסקים" },
];

export function TrustBadges() {
  return (
    <section className="border-y border-sand/60 bg-white py-12">
      <div className="container-narrow">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {badges.map(({ icon: Icon, title, desc, highlight }) => (
            <div
              key={title}
              className={`flex items-start gap-4 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 ${
                highlight
                  ? "border-gefen/20 bg-gefen-light hover:shadow-[0_16px_32px_-12px_rgba(30,77,140,0.3)]"
                  : "border-sand/40 bg-cream/50 hover:border-transparent hover:bg-white hover:shadow-[0_16px_32px_-12px_rgba(31,138,154,0.25)]"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-md ${
                  highlight
                    ? "bg-gradient-to-br from-gefen to-[#123a68] text-white shadow-gefen/30"
                    : "bg-gradient-to-br from-accent-light to-accent text-white shadow-accent/30"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p
                  className={`font-semibold ${highlight ? "text-gefen" : "text-slate"}`}
                >
                  {title}
                </p>
                <p className="mt-0.5 text-sm text-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
