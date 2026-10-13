"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button, Container, Section } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Container className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-fg">Something went wrong</h1>
        <p className="mt-4 text-fg-muted" role="alert">
          An unexpected error occurred. You can try again, or return to the home page.
        </p>
        {error.digest && <p className="mt-2 text-xs text-fg-subtle">Reference: {error.digest}</p>}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="secondary">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
