import type { Metadata } from "next";
import { Button, Card, CardDescription, CardTitle, Container, Section, SectionHeading } from "@/components/ui";
import { applyEmail, benefits, culture, roles } from "@/content/careers";

export const metadata: Metadata = {
  title: "Careers",
  description: "Work with us. Culture, benefits and open roles at PanjatanTech.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Careers"
            title="Build the future of production AI with us"
            align="left"
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {culture.map((c) => (
              <li key={c.title} className="flex">
                <Card className="w-full">
                  <CardTitle>{c.title}</CardTitle>
                  <CardDescription>{c.body}</CardDescription>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <h2 className="text-2xl font-semibold text-fg">Benefits</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-fg-muted">
            {benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <h2 className="text-2xl font-semibold text-fg">Open roles</h2>
          {roles.length === 0 ? (
            <p className="mt-4 text-fg-muted">No open roles right now. Check back soon.</p>
          ) : (
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {roles.map((r) => (
                <li key={r.slug} className="flex">
                  <Card className="w-full">
                    <CardTitle>{r.title}</CardTitle>
                    <CardDescription>
                      {r.team} &middot; {r.location}
                    </CardDescription>
                    <p className="mt-2 text-sm text-fg-muted">{r.summary}</p>
                    <Button asChild size="sm" className="mt-4">
                      <a href={`mailto:${applyEmail}?subject=${encodeURIComponent(`Application: ${r.title}`)}`}>
                        Apply by email
                      </a>
                    </Button>
                  </Card>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-8 text-sm text-fg-muted">
            Do not see a fit? Write to{" "}
            <a className="text-cyan underline underline-offset-4" href={`mailto:${applyEmail}`}>
              {applyEmail}
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
