import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge, Button, Container } from "@/components/ui";
import { products } from "@/content/products";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgb(0_229_255/0.12),transparent_70%)]"
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Badge variant="purple">AI infrastructure</Badge>
          <h1
            id="hero-title"
            className="mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-6xl"
          >
            Infrastructure for AI that ships to production.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fg-muted">
            {site.description} Serve models, retrieve context, run agents and measure quality from
            one platform.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={site.primaryCta.href}>
                {site.primaryCta.label}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={site.secondaryCta.href}>{site.secondaryCta.label}</Link>
            </Button>
          </div>
        </div>
        <div className="min-w-0 rounded-lg border border-border bg-surface p-2 shadow-2xl shadow-black/30">
          <p className="px-4 pt-3 pb-2 font-mono text-xs text-fg-subtle">One platform</p>
          <ul className="grid gap-2">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="flex items-start gap-3 rounded-md px-4 py-3 transition-colors hover:bg-surface-raised"
                >
                  <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-cyan" />
                  <span>
                    <span className="block font-medium text-fg">{p.name}</span>
                    <span className="block text-sm text-fg-muted">{p.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
