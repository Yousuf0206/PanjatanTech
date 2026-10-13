import { hasAnalyticsConsent } from "@/lib/consent";

export type EventProps = Record<string, string | number | boolean | null>;

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

interface AnalyticsGlobals {
  posthog?: { capture: (event: string, props?: EventProps) => void };
  gtag?: (...args: unknown[]) => void;
}

/** Send a product event. No-op without analytics consent or when no provider has loaded. */
export function track(event: string, props?: EventProps): void {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
  const w = window as unknown as AnalyticsGlobals;
  w.posthog?.capture(event, props);
  w.gtag?.("event", event, props);
}
