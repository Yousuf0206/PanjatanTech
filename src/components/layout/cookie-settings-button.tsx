"use client";

import { openConsentPreferences } from "@/lib/consent";

/** Lets visitors reopen the consent preferences after their first choice. */
export function CookieSettingsButton() {
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
