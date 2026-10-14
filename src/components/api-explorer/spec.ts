import type { CodeTabItem } from "@/components/code/code-tabs";

export type Param = {
  name: string;
  in: "query" | "path" | "header";
  required?: boolean;
  description?: string;
  example?: string;
};

export type Operation = {
  id: string;
  method: "GET" | "POST" | "DELETE";
  path: string;
  summary: string;
  description?: string;
  parameters: Param[];
  body?: { description?: string; example?: unknown };
};

export type RawSpec = {
  servers: { url: string }[];
  paths: Record<string, Record<string, Omit<Operation, "id" | "method" | "path"> & { operationId: string }>>;
};

export function toOperations(spec: RawSpec): Operation[] {
  return Object.entries(spec.paths).flatMap(([path, methods]) =>
    Object.entries(methods).map(([m, op]) => ({
      id: op.operationId,
      method: m.toUpperCase() as Operation["method"],
      path,
      summary: op.summary,
      description: op.description,
      parameters: op.parameters ?? [],
      body: (op as unknown as { requestBody?: Operation["body"] }).requestBody,
    })),
  );
}

export function buildPath(op: Operation, values: Record<string, string>): string {
  let p = op.path;
  for (const prm of op.parameters.filter((x) => x.in === "path")) {
    p = p.replace(`{${prm.name}}`, encodeURIComponent(values[prm.name] ?? `{${prm.name}}`));
  }
  const qs = new URLSearchParams();
  for (const prm of op.parameters.filter((x) => x.in === "query")) {
    if (values[prm.name]) qs.set(prm.name, values[prm.name]);
  }
  const s = qs.toString();
  return s ? `${p}?${s}` : p;
}

/** @panjatantech/sdk call for each operation. Keep in sync with content/api/openapi.json. */
function sdkCall(op: Operation, v: Record<string, string>, body: string): string {
  const b = body.trim() ? body.replace(/\s*\n\s*/g, " ") : "{}";
  const q = (k: string) => JSON.stringify(v[k] ?? "");
  switch (op.id) {
    case "listModels":
      return v.limit ? `client.models.list({ limit: ${Number(v.limit)} })` : "client.models.list()";
    case "createInference":
      return `client.inference.create(${b})`;
    case "upsertDocuments":
      return `client.indexes.upsert(${q("index")}, ${b})`;
    case "queryIndex":
      return `client.indexes.query(${q("index")}, ${b})`;
    case "createAgentRun":
      return `client.agentRuns.create(${b})`;
    case "getAgentRun":
      return `client.agentRuns.get(${q("run_id")})`;
    case "createEval":
      return `client.evals.create(${b})`;
    case "getEval":
      return `client.evals.get(${q("eval_id")})`;
    default:
      return "";
  }
}

export function buildSnippets(
  op: Operation,
  host: string,
  path: string,
  body: string,
  values: Record<string, string> = {},
): CodeTabItem[] {
  const url = `${host}${path}`;
  const hasBody = op.method === "POST" && body.trim() !== "";
  const curl = [
    `curl -X ${op.method} "${url}"`,
    `  -H "Authorization: Bearer $PANJATAN_API_KEY"`,
    ...(hasBody ? [`  -H "Content-Type: application/json"`, `  -d '${body.replace(/\s*\n\s*/g, " ")}'`] : []),
  ].join(" \\\n");
  const ts = [
    `import { Panjatan } from "@panjatantech/sdk";`,
    ``,
    `const client = new Panjatan({ apiKey: process.env.PANJATAN_API_KEY });`,
    `const res = await ${sdkCall(op, values, hasBody ? body : "")};`,
    `console.log(res);`,
  ].join("\n");
  const py = [
    `import os, requests`,
    ``,
    `res = requests.request(`,
    `    "${op.method}",`,
    `    "${url}",`,
    `    headers={"Authorization": f"Bearer {os.environ['PANJATAN_API_KEY']}"},`,
    ...(hasBody ? [`    json=${body.replace(/\s*\n\s*/g, " ")},`] : []),
    `)`,
    `print(res.json())`,
  ].join("\n");
  return [
    { language: "bash", label: "curl", code: curl },
    { language: "ts", label: "TypeScript", code: ts },
    { language: "python", label: "Python", code: py },
  ];
}
