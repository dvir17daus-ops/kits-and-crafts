import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { InstitutionsSection } from "@/components/home/InstitutionsSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { SchoolFairCTA } from "@/components/home/SchoolFairCTA";
import { HomeJsonLd } from "@/components/seo/HomeJsonLd";
import { getFeaturedProducts } from "@/utils/getProducts";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Kits & Crafts | ערכות בנייה ויצירה מעץ",
  "ערכות DIY פרימיום מעץ אמיתי לילדים, בתי ספר וירידי קהילה. מאושרים בגפ\"ן."
);

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      <HomeJsonLd products={featured.slice(0, 4)} />
      <Hero />
      <TrustBadges />
      <InstitutionsSection />
      <FeaturedSection products={featured} />
      <CategoryShowcase />
      <HowItWorks />
      <Testimonials />
      <SchoolFairCTA />
    </>
  );
}
