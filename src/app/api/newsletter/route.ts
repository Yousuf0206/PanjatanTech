import { NextResponse } from "next/server";
import { z } from "zod";
import { addToAudience } from "@/lib/resend";

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
  const result = await addToAudience(parsed.data.email);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "We couldn't subscribe you right now. Please try again later." },
      { status: result.reason === "not_configured" ? 503 : 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
