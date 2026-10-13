"use client";

import { useRef, useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { contactSchema, type ContactField } from "./schema";

type Errors = Partial<Record<ContactField, string>>;
type Status = "idle" | "sending" | "done" | "error";

const fields: { name: ContactField; label: string; type?: string; auto?: string }[] = [
  { name: "name", label: "Name", auto: "name" },
  { name: "email", label: "Work email", type: "email", auto: "email" },
  { name: "company", label: "Company", auto: "organization" },
  { name: "role", label: "Role", auto: "organization-title" },
];

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as ContactField;
        next[key] ??= issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status === "done") {
    return (
      <p ref={statusRef} tabIndex={-1} role="status" className="rounded-lg border border-border bg-surface p-6 text-fg">
        Thanks, your request was received. We will be in touch.
      </p>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      {fields.map((f) => (
        <div key={f.name}>
          <Label htmlFor={f.name}>{f.label}</Label>
          <Input
            id={f.name}
            name={f.name}
            type={f.type ?? "text"}
            autoComplete={f.auto}
            required
            className="mt-2"
            aria-invalid={errors[f.name] ? true : undefined}
            aria-describedby={errors[f.name] ? `${f.name}-err` : undefined}
          />
          {errors[f.name] && (
            <p id={`${f.name}-err`} className="mt-1 text-sm text-danger">
              {errors[f.name]}
            </p>
          )}
        </div>
      ))}
      <div>
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          name="message"
          required
          className="mt-2"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-err" : undefined}
        />
        {errors.message && (
          <p id="message-err" className="mt-1 text-sm text-danger">
            {errors.message}
          </p>
        )}
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" name="website" defaultValue="" />
        </label>
      </div>
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request a demo"}
      </Button>
      {status === "error" && (
        <p ref={statusRef} tabIndex={-1} role="alert" className="text-sm text-danger">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
