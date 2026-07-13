import type { Metadata } from "next";

export const siteMetadata = {
  title: "הסדנאייה | ערכות בנייה ויצירה מעץ",
  titleTemplate: "%s | הסדנאייה",
  description:
    "הסדנאייה (מבית בואו נחגוג) — ערכות DIY פרימיום מעץ אמיתי לילדים, בתי ספר וירידי קהילה. מאושרים בגפ\"ן, משלוח מהיר, הוראות בעברית.",
  locale: "he_IL",
  siteUrl: "https://hasadnaya.co.il",
} as const;

export function createPageMetadata(
  title: string,
  description: string
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: siteMetadata.locale,
      type: "website",
    },
  };
}
