"use client";

import { openConsentPreferences } from "@/lib/consent";

/** Lets visitors reopen the consent preferences after their first choice. */
export function CookieSettingsButton() {
  // Nothing to configure when no analytics vendor is set up.
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY && !process.env.NEXT_PUBLIC_GA_ID) return null;
  return (
    <button
      type="button"
      onClick={openConsentPreferences}
      className="text-sm text-fg-subtle underline-offset-4 hover:text-fg hover:underline"
    >
      Cookie settings
    </button>
  );
}
