"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui";

type Props = { onClose: () => void; intercomAppId?: string };

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

/**
 * Non-modal chat panel. No automated replies are generated here.
 * TODO(intercom): when `intercomAppId` is set, boot the Intercom messenger here
 * (load widget script with the CSP nonce, add Intercom hosts to the CSP in
 * src/middleware.ts, and gate on analytics/functional consent) instead of the fallback below.
 */
export function ChatPanel({ onClose, intercomAppId }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={ref}
      id="chat-panel"
      role="dialog"
      aria-label="Contact PanjatanTech"
      tabIndex={-1}
      data-intercom={intercomAppId ? "pending" : undefined}
      className="fixed bottom-20 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-lg border border-border bg-surface p-5 shadow-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-semibold text-fg">Talk to our team</h2>
        <Button variant="ghost" size="sm" aria-label="Close chat" onClick={onClose}>
          <X aria-hidden="true" />
        </Button>
      </div>
      <p className="mt-2 text-sm text-fg-muted">
        Live chat is not available right now. Send us a message and a person will reply.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <Button asChild>
          <Link href="/contact" onClick={onClose}>
            Open contact form
          </Link>
        </Button>
        {SUPPORT_EMAIL && (
          <Button asChild variant="secondary">
            <a href={`mailto:${SUPPORT_EMAIL}`}>Email {SUPPORT_EMAIL}</a>
          </Button>
        )}
      </div>
    </div>
  );
}
