import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email().max(254),
  website: z.string().max(0).optional(), // honeypot: must be empty
});

export async function POST(req: Request) {
  const body: unknown = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  // TODO: wire newsletter provider (e.g. Resend Audiences: RESEND_API_KEY, RESEND_AUDIENCE_ID).
  // Intentionally sends/stores nothing yet.
  return NextResponse.json({ ok: true });
}
