"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";

const KEY = "exit-intent-shown";

function alreadyShown() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* storage unavailable: fall back to in-memory single show via component state */
  }
}

/** Exit-intent modal: desktop pointer only, once per session, never on /contact. */
export function ExitIntentModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const disabled = pathname.startsWith("/contact");

  useEffect(() => {
    if (disabled) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches || alreadyShown()) return;
    let fired = false;
    const onLeave = (e: MouseEvent) => {
      if (fired || e.clientY > 0 || e.relatedTarget) return;
      fired = true;
      markShown();
      setOpen(true);
    };
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => document.documentElement.removeEventListener("mouseleave", onLeave);
  }, [disabled]);

  return (
    <Dialog.Root open={open && !disabled} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface p-6">
          <Dialog.Title className="text-xl font-semibold text-fg">Before you go</Dialog.Title>
          <Dialog.Description className="mt-2 text-fg-muted">
            Explore the Free plan and compare options. See the pricing page
            for current plan details.
          </Dialog.Description>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild onClick={() => setOpen(false)}>
              <Link href="/pricing">See pricing</Link>
            </Button>
            <Dialog.Close asChild>
              <Button variant="ghost">No thanks</Button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Close"
              className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-md text-fg-muted hover:text-fg"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
