import { NextResponse } from "next/server";

/**
 * Sandbox backend for the API explorer ("Try it"). Mirrors content/api/openapi.json with
 * static sample responses and never calls an external host.
 */
type Ctx = { params: Promise<{ path: string[] }> };

function sample(method: string, path: string): { status: number; body: unknown } {
  const m = (re: RegExp) => re.exec(path);
  let match: RegExpExecArray | null;

  if (method === "GET" && path === "/v1/models") {
    return { status: 200, body: { data: [{ id: "sandbox-model", object: "model" }] } };
  }
  if (method === "POST" && path === "/v1/inference") {
    return {
      status: 200,
      body: {
        id: "inf_sandbox",
        model: "sandbox-model",
        output: "The customer cannot complete checkout because payment requests return a 502 error.",
        usage: { input_tokens: 18, output_tokens: 17 },
      },
    };
  }
  if (method === "POST" && (match = m(/^\/v1\/indexes\/([^/]+)\/documents$/))) {
    return { status: 200, body: { index: match[1], upserted: 1 } };
  }
  if (method === "POST" && (match = m(/^\/v1\/indexes\/([^/]+)\/query$/))) {
    return {
      status: 200,
      body: {
        index: match[1],
        matches: [
          { id: "kb-42", score: 0.91, text: "To reset your password, open Settings → Security.", metadata: { product: "web" } },
        ],
      },
    };
  }
  if (method === "POST" && path === "/v1/agent-runs") {
    return { status: 202, body: { id: "run_8f2c", status: "queued" } };
  }
  if (method === "GET" && (match = m(/^\/v1\/agent-runs\/([^/]+)$/))) {
    return {
      status: 200,
      body: { id: match[1], status: "completed", output: "Routed to Payments on-call with priority P2." },
    };
  }
  if (method === "POST" && path === "/v1/evals") {
    return { status: 202, body: { id: "eval_31a7", status: "running" } };
  }
  if (method === "GET" && (match = m(/^\/v1\/evals\/([^/]+)$/))) {
    return {
      status: 200,
      body: { id: match[1], status: "completed", results: { total: 50, passed: 46, failed: 4 } },
    };
  }
  return { status: 404, body: { error: { type: "not_found", message: "Unknown endpoint." } } };
}

async function handle(method: string, { params }: Ctx) {
  const path = "/" + (await params).path.join("/");
  const { status, body } = sample(method, path);
  return NextResponse.json({ sandbox: true, ...(body as object) }, { status });
}

export const GET = (_r: Request, ctx: Ctx) => handle("GET", ctx);
export const POST = (_r: Request, ctx: Ctx) => handle("POST", ctx);
