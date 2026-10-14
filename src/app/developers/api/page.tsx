import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { ApiExplorer } from "@/components/api-explorer/explorer";
import { toOperations, type RawSpec } from "@/components/api-explorer/spec";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "API reference",
  description: "Explore every PanjatanTech API endpoint and try requests against a sandbox.",
};

export default function ApiPage() {
  const spec = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "content", "api", "openapi.json"), "utf8"),
  ) as RawSpec;
  return (
    <div>
      <Container className="py-12 sm:py-16">
        <SectionHeading
          as="h1"
          align="left"
          eyebrow="API reference"
          title="API explorer"
          description="Pick an endpoint, fill in the parameters and press Try it. Requests from this page go to a sandbox that returns sample responses, so you don’t need an API key."
        />
        <div className="mt-10">
          <ApiExplorer operations={toOperations(spec)} host={spec.servers[0]?.url ?? "https://api.panjatantech.com"} />
        </div>
      </Container>
    </div>
  );
}
