import { NextResponse } from "next/server";
import { contactSchema } from "@/components/contact/schema";

export async function POST(req: Request) {
  const body: unknown = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fields = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ ok: false, error: "Validation failed.", fields }, { status: 400 });
  }
  // TODO: wire Resend/Formspree. Env vars: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
  // (or FORMSPREE_FORM_ID). Intentionally sends nothing yet.
  return NextResponse.json({ ok: true });
}
