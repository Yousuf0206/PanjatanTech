import { NextResponse } from "next/server";
import { contactSchema } from "@/components/contact/schema";
import { sendEmail } from "@/lib/resend";

export async function POST(req: Request) {
  const body: unknown = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fields = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ ok: false, error: "Validation failed.", fields }, { status: 400 });
  }
  const d = parsed.data;
  // Honeypot filled in: likely a bot. Report success without sending.
  if (d.website) return NextResponse.json({ ok: true });

  const subject = `Demo request: ${d.company} (${d.name})`.replace(/[\r\n]+/g, " ");
  const text = [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Company: ${d.company}`,
    `Role: ${d.role}`,
    "",
    d.message,
  ].join("\n");

  const result = await sendEmail({ subject, text, replyTo: d.email });
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message right now. Please try again later." },
      { status: result.reason === "not_configured" ? 503 : 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
