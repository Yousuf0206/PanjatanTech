"use client";

import { useMemo, useState } from "react";
import { CodeTabs } from "@/components/code/code-tabs";
import { buildPath, buildSnippets, type Operation } from "./spec";

type Result = { status: number; body: string } | { error: string };

const methodColor: Record<string, string> = {
  GET: "text-cyan",
  POST: "text-purple",
  DELETE: "text-danger",
};

const field =
  "h-11 w-full rounded-md border border-border bg-navy px-3 text-sm text-fg placeholder:text-fg-subtle";

export function ApiExplorer({ operations, host }: { operations: Operation[]; host: string }) {
  const [opId, setOpId] = useState(operations[0]?.id ?? "");
  const op = operations.find((o) => o.id === opId) ?? operations[0];
  const [values, setValues] = useState<Record<string, string>>({});
  const [body, setBody] = useState<string>(() => JSON.stringify(op?.body?.example ?? {}, null, 2));
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const merged = useMemo(() => {
    const m: Record<string, string> = {};
    for (const p of op?.parameters ?? []) m[p.name] = values[p.name] ?? p.example ?? "";
    return m;
  }, [op, values]);

  if (!op) return null;
  const path = buildPath(op, merged);
  const snippets = buildSnippets(op, host, path, op.method === "POST" ? body : "");

  function select(o: Operation) {
    setOpId(o.id);
    setValues({});
    setBody(JSON.stringify(o.body?.example ?? {}, null, 2));
    setResult(null);
  }

  async function send() {
    setLoading(true);
    setResult(null);
    try {
      let init: RequestInit = { method: op.method };
      if (op.method === "POST") {
        init = { ...init, headers: { "Content-Type": "application/json" }, body: JSON.stringify(JSON.parse(body)) };
      }
      // Only ever the local mock route - never the placeholder host.
      const res = await fetch(`/api/mock${path}`, init);
      setResult({ status: res.status, body: JSON.stringify(await res.json(), null, 2) });
    } catch (e) {
      setResult({ error: e instanceof SyntaxError ? "Request body is not valid JSON." : "Request failed." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <nav aria-label="Endpoints">
        <ul className="space-y-1">
          {operations.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => select(o)}
                aria-current={o.id === op.id ? "true" : undefined}
                className={`flex min-h-11 w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm ${
                  o.id === op.id ? "bg-surface-raised text-fg" : "text-fg-muted hover:bg-surface hover:text-fg"
                }`}
              >
                <span className={`w-14 shrink-0 font-mono text-xs font-semibold ${methodColor[o.method]}`}>
                  {o.method}
                </span>
                <span className="min-w-0 break-words">{o.summary}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="min-w-0 space-y-6">
        <header>
          <h2 className="text-xl font-semibold text-fg">{op.summary}</h2>
          <p className="mt-1 break-all font-mono text-sm text-fg-muted">
            {op.method} {op.path}
          </p>
          {op.description && <p className="mt-2 text-fg-muted">{op.description}</p>}
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
          className="space-y-4"
        >
          {op.parameters.map((p) => (
            <div key={p.name}>
              <label htmlFor={`p-${p.name}`} className="mb-1 block text-sm font-medium text-fg">
                {p.name} <span className="font-normal text-fg-subtle">({p.in}{p.required ? ", required" : ""})</span>
              </label>
              <input
                id={`p-${p.name}`}
                className={field}
                value={merged[p.name]}
                required={p.required}
                onChange={(e) => setValues({ ...values, [p.name]: e.target.value })}
                aria-describedby={p.description ? `d-${p.name}` : undefined}
              />
              {p.description && (
                <p id={`d-${p.name}`} className="mt-1 text-xs text-fg-subtle">
                  {p.description}
                </p>
              )}
            </div>
          ))}
          {op.method === "POST" && (
            <div>
              <label htmlFor="req-body" className="mb-1 block text-sm font-medium text-fg">
                Request body (JSON)
              </label>
              <textarea
                id="req-body"
                rows={6}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                spellCheck={false}
                className="w-full rounded-md border border-border bg-navy p-3 font-mono text-sm text-fg"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 items-center rounded-md bg-cyan px-5 text-sm font-medium text-navy hover:bg-cyan-dim disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send (mock)"}
          </button>
          <p className="text-xs text-fg-subtle">
            Requests go to a local mock route and return sample data only.
          </p>
        </form>

        <CodeTabs key={op.id} items={snippets} title="Request" />

        <section aria-labelledby="resp-h" aria-live="polite">
          <h3 id="resp-h" className="mb-2 text-sm font-semibold text-fg">
            Response
          </h3>
          {result && "error" in result && <p role="alert" className="text-sm text-danger">{result.error}</p>}
          {result && "body" in result && (
            <div className="rounded-lg border border-border bg-surface">
              <p className="border-b border-border px-4 py-2 font-mono text-xs text-fg-muted">
                Status {result.status}
              </p>
              <pre className="overflow-x-auto p-4 font-mono text-sm text-fg">
                <code>{result.body}</code>
              </pre>
            </div>
          )}
          {!result && <p className="text-sm text-fg-subtle">Press Send to see a sample response.</p>}
        </section>
      </div>
    </div>
  );
}
