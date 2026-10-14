/**
 * Minimal Resend REST client (server-only, no SDK dependency).
 * Returns { ok: false, reason: "not_configured" } when env vars are missing so routes can
 * answer honestly instead of pretending a message was sent.
 */
const API = "https://api.resend.com";

type Result = { ok: true } | { ok: false; reason: "not_configured" | "provider_error" };

async function call(path: string, body: unknown): Promise<Result> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, reason: "not_configured" };
  try {
    const res = await fetch(`${API}${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`Resend ${path} failed: ${res.status}`);
      return { ok: false, reason: "provider_error" };
    }
    return { ok: true };
  } catch (err) {
    console.error(`Resend ${path} failed:`, err);
    return { ok: false, reason: "provider_error" };
  }
}

/** Sends a plain-text email (no HTML, so user input can't inject markup). */
export function sendEmail(opts: { subject: string; text: string; replyTo?: string }): Promise<Result> {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!to || !from) return Promise.resolve({ ok: false, reason: "not_configured" });
  return call("/emails", {
    from,
    to: [to],
    subject: opts.subject,
    text: opts.text,
    ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
  });
}

/** Adds a contact to the newsletter audience. */
export function addToAudience(email: string): Promise<Result> {
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (!audience) return Promise.resolve({ ok: false, reason: "not_configured" });
  return call(`/audiences/${encodeURIComponent(audience)}/contacts`, { email, unsubscribed: false });
}
