import Link from "next/link";
import { Button, Card, CardDescription, CardTitle, Container, Section } from "@/components/ui";

// Drawn from the project Constitution (.specify/memory/constitution.md).
const values = [
  {
    title: "Say only what is true",
    body: "Pricing, uptime and capability claims on our site are ones we can verify. If something isn't ready, we say so.",
  },
  {
    title: "Engineer for production",
    body: "Performance, security and reliability are features we design for from the start, not polish added at the end.",
  },
  {
    title: "Respect developers' time",
    body: "Clear documentation, predictable APIs and fast tooling, so you spend your time on your product rather than ours.",
  },
  {
    title: "Build for everyone",
    body: "Accessible, keyboard-friendly interfaces and privacy-respecting defaults are part of the baseline.",
  },
];

export function Values() {
  return (
    <Section className="pt-0 sm:pt-0">
      <Container>
        <h2 className="text-2xl font-semibold text-fg">What we value</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <li key={v.title} className="flex">
              <Card className="w-full">
                <CardTitle>{v.title}</CardTitle>
                <CardDescription>{v.body}</CardDescription>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

// Team profiles are added once names, roles and photos are approved.
export function Team() {
  return (
    <Section className="pt-0 sm:pt-0">
      <Container>
        <div className="rounded-lg border border-border bg-surface p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-fg">The team</h2>
          <p className="mt-3 max-w-2xl text-fg-muted">
            Team profiles are coming soon. In the meantime, we&apos;re happy to talk about what
            you&apos;re building.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">Get in touch</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/careers">Careers</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
