import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui";
import { getDocsBySection } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Guides and concepts for the PanjatanTech platform.",
};

export default function DocsIndexPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">Documentation</h1>
      <p className="mt-3 text-fg-muted">Guides for getting started and for each PanjatanTech product.</p>
      {getDocsBySection().map((g, i) => (
        <section key={g.section} className="mt-10" aria-labelledby={`sec-${i}`}>
          <h2 id={`sec-${i}`} className="mb-4 text-xl font-semibold text-fg">
            {g.section}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {g.docs.map((d) => (
              <li key={d.slug}>
                <Link href={`/developers/docs/${d.slug}`} className="block h-full rounded-lg hover:ring-1 hover:ring-cyan">
                  <Card className="h-full">
                    <CardTitle>{d.title}</CardTitle>
                    <CardDescription>{d.description}</CardDescription>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
