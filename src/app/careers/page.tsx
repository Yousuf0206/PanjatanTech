import type { Metadata } from "next";
import Link from "next/link";
import { Button, Card, CardDescription, CardTitle, Container, Section, SectionHeading } from "@/components/ui";
import { applyEmail, culture, roles } from "@/content/careers";

export const metadata: Metadata = {
  title: "Careers",
  description: "Work with us. Culture and open roles at PanjatanTech.",
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
          <h2 className="text-2xl font-semibold text-fg">Open roles</h2>
          {roles.length === 0 ? (
            <p className="mt-4 text-fg-muted">
              We&apos;re hiring soon. Roles will be listed here when they open.
            </p>
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
                      {applyEmail ? (
                        <a href={`mailto:${applyEmail}?subject=${encodeURIComponent(`Application: ${r.title}`)}`}>
                          Apply by email
                        </a>
                      ) : (
                        <Link href="/contact">Apply</Link>
                      )}
                    </Button>
                  </Card>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-8 text-sm text-fg-muted">
            Want to be first to hear?{" "}
            <Link className="text-cyan underline underline-offset-4" href="/contact">
              Get in touch
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
