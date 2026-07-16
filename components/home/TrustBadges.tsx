"use client";

import { Award, BookMarked, GraduationCap, ShieldCheck } from "lucide-react";
import { GEFEN, GUIDANCE } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

const badges = [
  { icon: Award, label: GEFEN.homeLabel, highlight: true },
  { icon: GraduationCap, label: GUIDANCE.shortLabel },
  { icon: ShieldCheck, label: "חומרים בטוחים לילדים" },
  { icon: BookMarked, label: "מדריך בעברית" },
];

export function TrustBadges() {
  return (
    <section className="border-b border-sand/70 bg-white">
      <div className="container-narrow">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 sm:justify-between sm:py-6">
          {badges.map(({ icon: Icon, label, highlight }, i) => (
            <Reveal
              key={label}
              direction={i % 2 === 0 ? "up" : "scale"}
              delay={i * 80}
            >
              <li
                className={
                  highlight
                    ? "flex items-center gap-2.5 rounded-full border border-gefen/25 bg-gefen-light px-3.5 py-1.5 text-sm font-bold text-gefen"
                    : "flex items-center gap-2.5 text-sm font-semibold text-slate"
                }
              >
                <Icon
                  className={
                    highlight
                      ? "h-4 w-4 shrink-0 text-gefen"
                      : "h-4 w-4 shrink-0 text-accent"
                  }
                  aria-hidden="true"
                />
                <span>{label}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
