"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import type { ConsentState } from "@/lib/consent";

type Props = { initial: boolean; onChoose: (state: ConsentState) => void };

/**
 * Compact, non-modal consent card. Reject and Accept have equal prominence.
 * Mobile: slim full-width bar. Desktop: small card in the bottom-left corner,
 * clear of the chat launcher (bottom-right).
 */
export function ConsentBanner({ initial, onChoose }: Props) {
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(initial);

  return (
    <section
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-surface/95 p-3 backdrop-blur-md sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-sm sm:rounded-lg sm:border sm:p-4 sm:shadow-xl"
    >
      <h2 id="consent-title" className="sr-only">
        Cookie preferences
      </h2>
      <p className="text-xs text-fg-muted sm:text-sm">
        We use analytics cookies only if you allow them.{" "}
        {!showPrefs && (
          <button
            type="button"
            onClick={() => setShowPrefs(true)}
            aria-expanded={showPrefs}
            className="text-cyan underline-offset-4 hover:underline"
          >
            Preferences
          </button>
        )}
      </p>
      {showPrefs && (
        <label className="mt-2 flex items-start gap-2 text-sm text-fg">
          <input
            type="checkbox"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
            className="mt-1 size-4 accent-[var(--color-cyan)]"
          />
          <span>
            Analytics cookies
            <span className="block text-xs text-fg-muted">Aggregate traffic and product usage.</span>
          </span>
        </label>
      )}
      <div className="mt-2 flex gap-2 sm:mt-3">
        {showPrefs ? (
          <Button size="sm" variant="secondary" className="flex-1" onClick={() => onChoose({ analytics })}>
            Save
          </Button>
        ) : (
          <>
            <Button size="sm" variant="secondary" className="flex-1" onClick={() => onChoose({ analytics: false })}>
              Reject
            </Button>
            <Button size="sm" variant="secondary" className="flex-1" onClick={() => onChoose({ analytics: true })}>
              Accept
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
