"use client";

import { useId, useState } from "react";
import { z } from "zod";
import { Button, Input, Label } from "@/components/ui";

const emailSchema = z.string().trim().email("Enter a valid email address.");
type Status = "idle" | "sending" | "done" | "error";

export function Newsletter() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid email.");
      return;
    }
    setError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.data, website: honeypot }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-xl text-center">
      <h2 className="text-2xl font-semibold text-fg">Product updates, occasionally</h2>
      <p className="mt-2 text-fg-muted">Get release notes and engineering posts by email.</p>
      {status === "done" ? (
        <p role="status" className="mt-6 text-success">
          Thanks, you are on the list.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-6 text-left">
          <Label htmlFor={`${id}-email`}>Email address</Label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Input
              id={`${id}-email`}
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-err` : undefined}
              required
            />
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label>
                Website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </label>
            </div>
            <Button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Subscribing…" : "Subscribe"}
            </Button>
          </div>
          {error && (
            <p id={`${id}-err`} className="mt-2 text-sm text-danger">
              {error}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="mt-2 text-sm text-danger">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
