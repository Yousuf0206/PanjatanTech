import { headers } from "next/headers";
import { ChatLauncher } from "@/components/chat/chat-launcher";
import { ConsentManager } from "@/components/overlays/consent-manager";

/**
 * Consent banner, analytics loaders and live chat launcher. Owned by Phase 5/6.
 * Server component so it can read the per-request CSP nonce set in middleware.
 */
export async function SiteServices() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <>
      <ConsentManager nonce={nonce} />
      <ChatLauncher />
    </>
  );
}
