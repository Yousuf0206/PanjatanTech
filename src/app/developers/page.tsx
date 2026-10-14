import type { Metadata } from "next";
import Link from "next/link";
import { CodeSnippet } from "@/components/code/code-snippet";
import { Button, Card, CardDescription, CardTitle, Container, SectionHeading } from "@/components/ui";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Developers",
  description: "Quickstart, documentation, API explorer and SDKs for the PanjatanTech platform.",
};

const links = [
  { href: "/developers/docs", title: "Documentation", text: "Quickstart, authentication and a guide for each product." },
  { href: "/developers/api", title: "API explorer", text: "Try every endpoint against a sandbox. No API key needed." },
  { href: "/developers/sdks", title: "SDKs", text: "Install the TypeScript SDK. Python and Go are coming soon." },
];

const docFor: Record<string, string> = {
  "inference-api": "inference-api",
  "vector-store": "vector-store",
  "agent-runtime": "agents",
  "eval-studio": "evaluation",
};

const quickstart = [
  {
    language: "ts",
    label: "TypeScript",
    code: 'import { Panjatan } from "@panjatantech/sdk";\n\nconst client = new Panjatan({ apiKey: process.env.PANJATAN_API_KEY });\n\nconst res = await client.inference.create({\n  model: "MODEL_ID",\n  input: "Summarise this support ticket in one sentence.",\n});\nconsole.log(res.output);',
  },
  {
    language: "bash",
    label: "cURL",
    code: 'curl https://api.panjatantech.com/v1/inference \\\n  -H "Authorization: Bearer $PANJATAN_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{ "model": "MODEL_ID", "input": "Summarise this support ticket in one sentence." }\'',
  },
  {
    language: "python",
    label: "Python",
    code: 'import os, requests\n\nres = requests.post(\n    "https://api.panjatantech.com/v1/inference",\n    headers={"Authorization": f"Bearer {os.environ[\'PANJATAN_API_KEY\']}"},\n    json={"model": "MODEL_ID", "input": "Summarise this support ticket in one sentence."},\n)\nprint(res.json()["output"])',
  },
];

export default function DevelopersPage() {
  return (
    <div>
      <Container className="py-12 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              as="h1"
              align="left"
              eyebrow="Developers"
              title="Build with PanjatanTech"
              description="One API key and one SDK for inference, retrieval, agents and evaluation. Make your first request in a few minutes."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/developers/docs/quickstart">Read the quickstart</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/developers/api">Try it in the sandbox</Link>
              </Button>
            </div>
          </div>
          <div className="min-w-0">
            <CodeSnippet snippets={quickstart} title="Your first request" />
          </div>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
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

        <h2 className="mt-16 text-2xl font-semibold text-fg">Guides by product</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/developers/docs/${docFor[p.slug] ?? "quickstart"}`}
                className="block h-full rounded-lg hover:ring-1 hover:ring-cyan"
              >
                <Card className="h-full">
                  <CardTitle>{p.name}</CardTitle>
                  <CardDescription>{p.tagline}</CardDescription>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
