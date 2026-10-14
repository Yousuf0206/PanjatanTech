import type { Metadata } from "next";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { ProductsOverview } from "@/components/home/products-overview";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — AI infrastructure and developer tools` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* Customer logos and metrics are removed until verified data exists (Speckit v2, Sprint 1). */}
      <Hero />
      <ProductsOverview />
      <HowItWorks />
      <FinalCta />
    </>
  );
}
