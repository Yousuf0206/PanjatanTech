"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import type { ConsentState } from "@/lib/consent";

type Props = { initial: boolean; onChoose: (state: ConsentState) => void };

/** Non-modal consent region. Reject and Accept have equal prominence. */
export function ConsentBanner({ initial, onChoose }: Props) {
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(initial);

  return (
    <section
      aria-labelledby="consent-title"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl rounded-lg border border-border bg-surface p-5 shadow-xl"
    >
      <h2 id="consent-title" className="text-base font-semibold text-fg">
        Your privacy choices
      </h2>
      <p className="mt-2 text-sm text-fg-muted">
        We use essential cookies to run the site. With your permission we also use analytics cookies to understand
        how it is used. You can change this at any time.
      </p>
      {showPrefs && (
        <label className="mt-3 flex items-start gap-3 text-sm text-fg">
          <input
            type="checkbox"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
            className="mt-1 size-4 accent-[var(--color-cyan)]"
          />
          <span>
            Analytics cookies
            <span className="block text-fg-muted">Product analytics and aggregate traffic measurement.</span>
          </span>
        </label>
      )}
      <div className="mt-4 flex flex-wrap gap-3">
        {showPrefs ? (
          <Button variant="secondary" onClick={() => onChoose({ analytics })}>
            Save preferences
          </Button>
        ) : (
          <Button variant="ghost" onClick={() => setShowPrefs(true)} aria-expanded={showPrefs}>
            Preferences
          </Button>
        )}
        <Button variant="secondary" onClick={() => onChoose({ analytics: false })}>
          Reject all
        </Button>
        <Button variant="secondary" onClick={() => onChoose({ analytics: true })}>
          Accept all
        </Button>
      </div>
    </section>
  );
}
