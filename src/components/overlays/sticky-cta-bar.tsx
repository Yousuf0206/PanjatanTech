"use client";

import { X } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui";
import { site } from "@/lib/site";

const STORAGE_KEY = "pt:cta-bar-dismissed";
const SHOW_AFTER_PX = 600;

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/** Persistent, dismissible bottom CTA bar shown after scrolling past the hero. */
export function StickyCtaBar() {
  const [dismissed, setDismissed] = React.useState(true);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    setDismissed(readDismissed());
    const onScroll = () => setScrolled(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = scrolled && !dismissed;

  // Reserve space so the bar never hides the footer / last content.
  React.useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.paddingBottom;
    document.body.style.paddingBottom = "4.5rem";
    return () => {
      document.body.style.paddingBottom = prev;
    };
  }, [visible]);

  function dismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage unavailable; dismissal lasts for this page view only */
    }
  }

  if (!visible) return null;

  return (
    <aside
      aria-label="Get started"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2 sm:gap-4 sm:px-6 lg:px-8">
        <p className="min-w-0 flex-1 truncate text-sm font-medium text-fg">
          <span className="hidden sm:inline">Ship production AI faster. </span>
          <span className="text-fg-muted">Try {site.name} today.</span>
        </p>
        <Button asChild size="sm">
          <Link href={site.primaryCta.href}>{site.primaryCta.label}</Link>
        </Button>
        <Button asChild size="sm" variant="secondary" className="hidden sm:inline-flex">
          <Link href={site.secondaryCta.href}>{site.secondaryCta.label}</Link>
        </Button>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss call-to-action bar"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
