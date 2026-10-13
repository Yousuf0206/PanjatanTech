import { NextResponse } from "next/server";

/**
 * Mock backend for the API explorer. Returns static sample JSON and never calls an external host.
 * All data is illustrative.
 */
type Ctx = { params: Promise<{ path: string[] }> };

function sample(method: string, path: string): { status: number; body: unknown } {
  if (method === "GET" && path === "/v1/models") {
    return { status: 200, body: { data: [{ id: "example-model", object: "model" }] } };
  }
  if (method === "GET" && /^\/v1\/models\/[^/]+$/.test(path)) {
    return { status: 200, body: { id: path.split("/").pop(), object: "model" } };
  }
  if (method === "POST" && path === "/v1/completions") {
    return { status: 200, body: { id: "cmpl_mock", choices: [{ text: "Hello from the mock API." }] } };
  }
  if (method === "DELETE" && /^\/v1\/documents\/[^/]+$/.test(path)) {
    return { status: 200, body: { deleted: true } };
  }
  return { status: 404, body: { error: { code: "not_found", message: "Unknown mock endpoint." } } };
}

async function handle(method: string, { params }: Ctx) {
  const path = "/" + (await params).path.join("/");
  const { status, body } = sample(method, path);
  return NextResponse.json({ mock: true, ...(typeof body === "object" ? body : {}) }, { status });
}

export const GET = (_r: Request, ctx: Ctx) => handle("GET", ctx);
export const POST = (_r: Request, ctx: Ctx) => handle("POST", ctx);
export const DELETE = (_r: Request, ctx: Ctx) => handle("DELETE", ctx);
