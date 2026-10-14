"use client";

import { useEffect, useState } from "react";
import { AnalyticsScripts } from "@/components/overlays/analytics-scripts";
import { ConsentBanner } from "@/components/overlays/consent-banner";
import {
  CONSENT_OPEN_EVENT,
  readConsent,
  writeConsent,
  type ConsentState,
} from "@/lib/consent";

type Props = { nonce?: string };

// Essential cookies need no consent, so the banner only appears when an analytics vendor is configured.
const analyticsConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_KEY || process.env.NEXT_PUBLIC_GA_ID,
);

function optOutPostHog() {
  (window as unknown as { posthog?: { opt_out_capturing?: () => void } }).posthog?.opt_out_capturing?.();
}

/** Owns consent state; loads analytics only after an explicit analytics opt-in. */
export function ConsentManager({ nonce }: Props) {
  const [ready, setReady] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setAnalytics(stored?.analytics === true);
    setBannerOpen(analyticsConfigured && stored === null);
    setReady(true);
    const reopen = () => setBannerOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  const choose = (state: ConsentState) => {
    writeConsent(state);
    setAnalytics(state.analytics);
    setBannerOpen(false);
    // Revoking after load: the vendor scripts stay in memory until reload.
    if (!state.analytics) optOutPostHog();
  };

  if (!ready || !analyticsConfigured) return null;
  return (
    <>
      {analytics && <AnalyticsScripts nonce={nonce} />}
      {bannerOpen && <ConsentBanner initial={analytics} onChoose={choose} />}
    </>
  );
}
