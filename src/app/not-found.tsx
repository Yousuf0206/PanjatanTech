import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, Section } from "@/components/ui";
import { mainNav } from "@/lib/site";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan">404</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-fg">Page not found</h1>
        <p className="mt-4 text-fg-muted">
          The page you are looking for does not exist or has moved. Try one of these instead.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {mainNav.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="inline-block py-2 text-cyan underline-offset-4 hover:underline"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button asChild className="mt-8">
          <Link href="/">Back to home</Link>
        </Button>
      </Container>
    </Section>
  );
}
