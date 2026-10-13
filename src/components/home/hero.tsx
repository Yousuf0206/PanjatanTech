import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge, Button, Container } from "@/components/ui";
import { site } from "@/lib/site";

const code = `import { panjatan } from "@panjatan/sdk";

const res = await panjatan.inference.create({
  model: "your-model",
  input: "Summarise this ticket.",
  stream: true,
});`;

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
        <figure
          aria-label="Example SDK usage"
          className="min-w-0 overflow-hidden rounded-lg border border-border bg-surface shadow-2xl shadow-black/30"
        >
          <div
            className="flex items-center gap-2 border-b border-border px-4 py-3"
            aria-hidden="true"
          >
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="ml-2 font-mono text-xs text-fg-subtle">inference.ts</span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-fg-muted sm:text-sm">
            <code>{code}</code>
          </pre>
          <figcaption className="border-t border-border px-4 py-2 text-xs text-fg-subtle">
            Illustrative snippet — final SDK API pending.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
