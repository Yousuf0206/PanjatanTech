import type { Snippet } from "@/components/code/code-snippet";

/** Illustrative only: `@example/sdk` and api.example.com are placeholders, not real packages or hosts. */
const calls: Record<string, { path: string; body: string }> = {
  "inference-api": { path: "/v1/completions", body: '{ "model": "your-model", "input": "Hello" }' },
  "vector-store": { path: "/v1/query", body: '{ "namespace": "docs", "query": "pricing", "top_k": 5 }' },
  "agent-runtime": { path: "/v1/runs", body: '{ "agent": "support-bot", "input": "Summarize ticket" }' },
  "eval-studio": { path: "/v1/evals", body: '{ "testSet": "baseline", "target": "your-model" }' },
};

export function getExamples(slug: string): Snippet[] {
  const c = calls[slug] ?? calls["inference-api"];
  return [
    {
      language: "bash",
      label: "cURL",
      code: `curl https://api.example.com${c.path} \\\n  -H "Authorization: Bearer $EXAMPLE_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '${c.body}'`,
    },
    {
      language: "ts",
      label: "TypeScript",
      code: `// Placeholder SDK for illustration\nimport { Client } from "@example/sdk";\n\nconst client = new Client({ apiKey: process.env.EXAMPLE_API_KEY });\nconst res = await client.post("${c.path}", ${c.body});\nconsole.log(res);`,
    },
  ];
}
