import type { Metadata } from "next";
import { CodeSnippet } from "@/components/code/code-snippet";
import { Badge, Card, CardDescription, CardTitle, Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "SDKs",
  description: "Official client libraries for TypeScript, Python and Go.",
};

// TODO(devrel): verify package names, availability and install commands.
const sdks = [
  { name: "TypeScript", lang: "bash", install: "npm install @example/panjatan", available: true },
  { name: "Python", lang: "bash", install: "pip install example-panjatan", available: true },
  { name: "Go", lang: "bash", install: "go get example.com/panjatan", available: false },
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
          description="Package names are placeholders pending DevRel confirmation."
        />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {sdks.map((s) => (
            <li key={s.name}>
              <Card className="h-full">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{s.name}</CardTitle>
                  {!s.available && <Badge>Coming soon</Badge>}
                </div>
                <CardDescription>
                  {s.available ? "Install the library:" : "Not available yet. The command below is a preview."}
                </CardDescription>
                <div className="mt-4">
                  <CodeSnippet snippets={[{ language: s.lang, label: "Install", code: s.install }]} title={`${s.name} install`} />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
