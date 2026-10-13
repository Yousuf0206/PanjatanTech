import type { Metadata } from "next";
import Link from "next/link";
import { Newsletter } from "@/components/marketing/newsletter";
import { PricingView } from "@/components/pricing/pricing-view";
import { Button, Container, Section, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Preview of PanjatanTech plans: Free, Pro, Team and Enterprise.",
};

export default function PricingPage() {
  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Pricing"
            title="Plans for every stage"
            description="Start free and scale as you ship."
          />
          <p
            role="note"
            className="mx-auto mt-6 max-w-xl rounded-md border border-purple/30 bg-purple/10 p-3 text-center text-sm text-fg"
          >
            <strong>Pricing preview.</strong> Amounts shown are placeholders and not final.
          </p>
          <div className="mt-10">
            <PricingView />
          </div>
          <div className="mt-16 rounded-lg border border-border bg-surface p-8 text-center">
            <h2 className="text-2xl font-semibold text-fg">Need something custom?</h2>
            <p className="mt-2 text-fg-muted">Talk to us about Enterprise requirements.</p>
            <Button asChild className="mt-6">
              <Link href="/contact">Contact sales</Link>
            </Button>
          </div>
        </Container>
      </Section>
      <Section className="border-t border-border">
        <Container>
          <Newsletter />
        </Container>
      </Section>
    </>
  );
}
