import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Badge,
  Card,
  CardDescription,
  CardTitle,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";
import { productCategories, products } from "@/content/products";
import { FadeIn } from "@/lib/motion";

export function ProductsOverview() {
  const label = (id: string) => productCategories.find((c) => c.id === id)?.label ?? id;
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Platform"
          title="Everything between prototype and production"
          description="Four building blocks that work on their own or together."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <li key={p.slug}>
              <FadeIn delay={i * 0.05} className="h-full">
                <Card className="group relative flex h-full flex-col transition-colors focus-within:border-cyan/40 hover:border-cyan/40">
                  <Badge variant="neutral" className="w-fit">
                    {label(p.category)}
                  </Badge>
                  <CardTitle className="mt-4">
                    <Link
                      href={`/products/${p.slug}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {p.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>{p.tagline}</CardDescription>
                  <span className="mt-auto flex items-center gap-1 pt-6 text-sm font-medium text-cyan">
                    Learn more
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Card>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
