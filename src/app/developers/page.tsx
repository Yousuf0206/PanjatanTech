import type { Metadata } from "next";
import Link from "next/link";
import { CodeSnippet } from "@/components/code/code-snippet";
import { Button, Card, CardDescription, CardTitle, Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Developers",
  description: "Quickstart, documentation, API reference and SDKs for PanjatanTech.",
};

const links = [
  { href: "/developers/docs", title: "Documentation", text: "Guides, concepts and authentication." },
  { href: "/developers/api", title: "API reference", text: "Explore endpoints with an interactive mock." },
  { href: "/developers/sdks", title: "SDKs", text: "TypeScript, Python and Go libraries." },
];

// TODO(devrel): verify - placeholder host, key and response shape.
const quickstart = [
  {
    language: "bash",
    label: "curl",
    code: 'curl https://api.example.com/v1/models \\\n  -H "Authorization: Bearer $PANJATAN_API_KEY"',
  },
  {
    language: "ts",
    label: "TypeScript",
    code: 'const res = await fetch("https://api.example.com/v1/models", {\n  headers: { Authorization: `Bearer ${process.env.PANJATAN_API_KEY}` },\n});\nconsole.log(await res.json());',
  },
  {
    language: "python",
    label: "Python",
    code: 'import os, requests\n\nres = requests.get(\n    "https://api.example.com/v1/models",\n    headers={"Authorization": f"Bearer {os.environ[\'PANJATAN_API_KEY\']}"},\n)\nprint(res.json())',
  },
];

export default function DevelopersPage() {
  return (
    <div>
      <Container className="py-12 sm:py-20">
        <SectionHeading
          as="h1"
          align="left"
          eyebrow="Developers"
          title="Build with PanjatanTech"
          description="Make your first request in minutes. Examples use placeholder endpoints."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/developers/docs/quickstart">Read the quickstart</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/developers/api">Try the API explorer</Link>
          </Button>
        </div>
        <div className="mt-10 max-w-3xl">
          <CodeSnippet snippets={quickstart} title="Quickstart" />
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="block h-full rounded-lg hover:ring-1 hover:ring-cyan">
                <Card className="h-full">
                  <CardTitle>{l.title}</CardTitle>
                  <CardDescription>{l.text}</CardDescription>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
