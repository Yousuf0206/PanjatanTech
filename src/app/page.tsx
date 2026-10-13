import type { Metadata } from "next";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Metrics } from "@/components/home/metrics";
import { ProductsOverview } from "@/components/home/products-overview";
import { TrustBar } from "@/components/home/trust-bar";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — AI infrastructure and developer tools` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProductsOverview />
      <HowItWorks />
      <Metrics />
      <FinalCta />
    </>
  );
}
