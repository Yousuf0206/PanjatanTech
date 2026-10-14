import type { Metadata } from "next";
import Link from "next/link";
import { CodeSnippet } from "@/components/code/code-snippet";
import { Badge, Card, CardDescription, CardTitle, Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "SDKs",
  description: "Install the PanjatanTech TypeScript SDK, or call the REST API from any language.",
};

// Python and Go package names are not decided yet; they show "Coming soon" without an install command.
const sdks = [
  {
    name: "TypeScript",
    available: true,
    text: "For Node.js 18+ and server-side TypeScript or JavaScript.",
    install: "npm install @panjatantech/sdk",
    usage: `import { Panjatan } from "@panjatantech/sdk";\n\nconst client = new Panjatan({ apiKey: process.env.PANJATAN_API_KEY });`,
  },
  { name: "Python", available: false, text: "In development. Use the REST API with requests or httpx today." },
  { name: "Go", available: false, text: "In development. Use the REST API with net/http today." },
];

export default function SdksPage() {
  return (
    <div>
      <Container className="py-12 sm:py-16">
        <SectionHeading
          as="h1"
          align="left"
          eyebrow="SDKs"
          title="Client libraries"
          description="Use the official TypeScript SDK, or call the REST API at https://api.panjatantech.com from any language."
        />
        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {sdks.map((s) => (
            <li key={s.name} className="flex">
              <Card className="flex w-full min-w-0 flex-col">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{s.name}</CardTitle>
                  <Badge variant={s.available ? "cyan" : "neutral"}>
                    {s.available ? "Available" : "Coming soon"}
                  </Badge>
                </div>
                <CardDescription>{s.text}</CardDescription>
                {s.install && s.usage && (
                  <div className="mt-4 grid gap-3">
                    <CodeSnippet snippets={[{ language: "bash", label: "Install", code: s.install }]} />
                    <CodeSnippet snippets={[{ language: "ts", label: "Usage", code: s.usage }]} />
                  </div>
                )}
                {!s.available && (
                  <p className="mt-4 text-sm text-fg-muted">
                    Every guide includes a Python example using plain HTTP.{" "}
                    <Link href="/developers/docs/quickstart" className="text-cyan underline underline-offset-4">
                      See the quickstart
                    </Link>
                    .
                  </p>
                )}
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
