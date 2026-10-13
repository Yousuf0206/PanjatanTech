import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductList } from "@/components/products/product-list";
import { Container, Section, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Products",
  description: "Inference, retrieval, agents and evaluation tools from PanjatanTech.",
};

export default function ProductsPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          as="h1"
          align="left"
          eyebrow="Products"
          title="Build production AI on one platform"
          description="Pick a product or browse by category."
        />
        <div className="mt-10">
          <Suspense fallback={null}>
            <ProductList />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}
