import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeSnippet } from "@/components/code/code-snippet";
import { ArchitectureDiagram } from "@/components/products/architecture-diagram";
import { getExamples } from "@/components/products/examples";
import { Badge, Button, Container, Section } from "@/components/ui";
import { getProduct, productCategories, products } from "@/content/products";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = productCategories.find((c) => c.id === product.category)?.label;

  return (
    <>
      <Section>
        <Container>
          <Badge variant="purple">{category}</Badge>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg">{product.name}</h1>
          <p className="mt-2 text-xl text-cyan">{product.tagline}</p>
          <p className="mt-4 max-w-2xl text-lg text-fg-muted">{product.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">Book a demo</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border py-12 sm:py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-fg">Features</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {product.features.map((f) => (
              <li key={f} className="flex gap-2 rounded-lg border border-border bg-surface p-4 text-fg">
                <Check className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="border-t border-border py-12 sm:py-16">
        <Container>
          <h2 className="mb-6 text-2xl font-semibold text-fg">Architecture</h2>
          <ArchitectureDiagram name={product.name} />
        </Container>
      </Section>

      <Section className="border-t border-border py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-fg">Code example</h2>
            <CodeSnippet snippets={getExamples(product.slug)} title="Illustrative example (placeholder host and SDK)" />
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-fg">Live demo</h2>
            <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border bg-surface p-6 text-center text-fg-muted">
              Interactive demo coming soon.
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
