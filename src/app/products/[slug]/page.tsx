import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/products/architecture-diagram";
import { Badge, Button, Container, Section } from "@/components/ui";
import { getProduct, productCategories, products } from "@/content/products";

const docSlug: Record<string, string> = {
  "inference-api": "inference-api",
  "vector-store": "vector-store",
  "agent-runtime": "agents",
  "eval-studio": "evaluation",
};

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
        <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-fg">Start building</h2>
            <p className="mt-2 text-fg-muted">
              Read the {product.name} guide, or try its endpoints in the sandbox.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/developers/docs/${docSlug[product.slug] ?? "quickstart"}`}>Read the guide</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/developers/api">Try it</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
