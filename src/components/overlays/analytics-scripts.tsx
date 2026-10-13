"use client";

import Script from "next/script";
import { GA_ID, POSTHOG_HOST, POSTHOG_KEY } from "@/lib/analytics";

// Official PostHog web snippet (loads array.js from the assets host derived from api_host).
const POSTHOG_SNIPPET = `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags on onFeatureFlags onSessionId identify setPersonProperties group resetGroups reset get_distinct_id alias set_config startSessionRecording stopSessionRecording opt_in_capturing opt_out_capturing has_opted_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);`;

function PostHog({ nonce }: { nonce?: string }) {
  if (!POSTHOG_KEY) return null;
  const init = `${POSTHOG_SNIPPET}posthog.init(${JSON.stringify(POSTHOG_KEY)},{api_host:${JSON.stringify(POSTHOG_HOST)},person_profiles:"identified_only"});`;
  return <Script id="posthog-init" nonce={nonce} strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: init }} />;
}

function GoogleAnalytics({ nonce }: { nonce?: string }) {
  if (!GA_ID) return null;
  const id = JSON.stringify(GA_ID);
  const init = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag("js",new Date());gtag("config",${id},{anonymize_ip:true});`;
  return (
    <>
      <Script
        id="ga-src"
        nonce={nonce}
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`}
      />
      <Script id="ga-init" nonce={nonce} strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: init }} />
    </>
  );
}

/** Mounted only after analytics consent. Renders nothing when env vars are unset. */
export function AnalyticsScripts({ nonce }: { nonce?: string }) {
  return (
    <>
      <PostHog nonce={nonce} />
      <GoogleAnalytics nonce={nonce} />
    </>
  );
}
