import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Card, CardDescription, CardTitle, Container, Section } from "@/components/ui";
import { complianceCopy, getSolution, solutions } from "@/content/solutions";
import { getProduct } from "@/content/products";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const solution = getSolution((await params).slug);
  if (!solution) return {};
  return {
    title: solution.name,
    description: solution.tagline,
    alternates: { canonical: `/solutions/${solution.slug}` },
  };
}

export default async function SolutionPage({ params }: { params: Promise<Params> }) {
  const solution = getSolution((await params).slug);
  if (!solution) notFound();
  const related = solution.products.flatMap((slug) => getProduct(slug) ?? []);

  return (
    <>
      <Section>
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan">
            <Link href="/solutions" className="hover:underline">
              Solutions
            </Link>
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            {solution.name}
          </h1>
          <p className="mt-4 text-lg text-fg-muted">{solution.tagline}</p>

          <h2 className="mt-12 text-2xl font-semibold text-fg">The problem</h2>
          <p className="mt-3 text-fg-muted">{solution.problem}</p>

          <h2 className="mt-10 text-2xl font-semibold text-fg">Our approach</h2>
          <p className="mt-3 text-fg-muted">{solution.approach}</p>

          {solution.complianceNote && (
            <p className="mt-10 rounded-lg border border-border bg-surface p-4 text-sm text-fg-muted">
              {complianceCopy}
            </p>
          )}
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-fg">Relevant products</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug} className="flex">
                <Card className="relative w-full transition-colors focus-within:border-cyan hover:border-cyan/50">
                  <CardTitle>
                    <Link
                      href={`/products/${p.slug}`}
                      className="after:absolute after:inset-0 focus-visible:outline-none"
                    >
                      {p.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>{p.tagline}</CardDescription>
                </Card>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Talk to us</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/solutions">All solutions</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
