/** First-party cookie based consent. Client-side helpers only. */
export type ConsentState = { analytics: boolean };
export type ConsentChoice = ConsentState | null;

export const CONSENT_COOKIE = "pt_consent";
export const CONSENT_EVENT = "pt:consent-change";
const MAX_AGE = 60 * 60 * 24 * 180;

export function readConsent(): ConsentChoice {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  const value = match?.slice(CONSENT_COOKIE.length + 1);
  if (value === "all") return { analytics: true };
  if (value === "essential") return { analytics: false };
  return null;
}

export function writeConsent(state: ConsentState): void {
  const value = state.analytics ? "all" : "essential";
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}

export const CONSENT_OPEN_EVENT = "pt:consent-open";

/** Re-open the consent banner (e.g. from a footer "Cookie settings" button). */
export function openConsentPreferences(): void {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
