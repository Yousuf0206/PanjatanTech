import Link from "next/link";
import { Button, Container, Section } from "@/components/ui";
import { FadeIn } from "@/lib/motion";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <div className="rounded-lg border border-border bg-surface-raised px-6 py-12 text-center sm:px-12">
            <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Ready to put AI into production?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-fg-muted">
              Start building today, or talk to us about your workload.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={site.primaryCta.href}>{site.primaryCta.label}</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href={site.secondaryCta.href}>{site.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
