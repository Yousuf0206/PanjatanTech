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

export function buildSnippets(op: Operation, host: string, path: string, body: string): CodeTabItem[] {
  const url = `${host}${path}`;
  const hasBody = op.method === "POST" && body.trim() !== "";
  const curl = [
    `curl -X ${op.method} "${url}"`,
    `  -H "Authorization: Bearer $PANJATAN_API_KEY"`,
    ...(hasBody ? [`  -H "Content-Type: application/json"`, `  -d '${body.replace(/\s*\n\s*/g, " ")}'`] : []),
  ].join(" \\\n");
  const ts = [
    `const res = await fetch("${url}", {`,
    `  method: "${op.method}",`,
    `  headers: {`,
    `    Authorization: \`Bearer \${process.env.PANJATAN_API_KEY}\`,`,
    ...(hasBody ? [`    "Content-Type": "application/json",`] : []),
    `  },`,
    ...(hasBody ? [`  body: JSON.stringify(${body.replace(/\s*\n\s*/g, " ")}),`] : []),
    `});`,
    `console.log(await res.json());`,
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
