import { headers } from "next/headers";
import { organizationJsonLd } from "@/lib/seo";

interface JsonLdProps {
  /** Any schema.org object; defaults to the Organization. */
  data?: Record<string, unknown>;
}

/** Server component: renders JSON-LD with the per-request CSP nonce. Makes the page dynamic. */
export async function JsonLd({ data = organizationJsonLd() }: JsonLdProps) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  // Escape "<" so content can never close the script tag.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: json }} />;
}
