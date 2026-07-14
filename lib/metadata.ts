import type { Metadata } from "next";

export const siteMetadata = {
  title: "הסדנאייה | ערכות בנייה ויצירה מעץ",
  titleTemplate: "%s | הסדנאייה",
  description:
    "הסדנאייה (מבית בואו נחגוג) — ערכות DIY פרימיום מעץ אמיתי לילדים, בתי ספר וירידי קהילה. מאושרים בגפ\"ן, משלוח מהיר, הוראות בעברית.",
  locale: "he_IL",
  // TODO: switch to the custom domain (e.g. https://hasadnaya.co.il) once it's connected in Vercel.
  siteUrl: "https://kits-and-crafts.vercel.app",
  ogImage: "/images/og-image.png",
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
      images: [{ url: siteMetadata.ogImage, width: 1024, height: 585 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteMetadata.ogImage],
    },
  };
}
