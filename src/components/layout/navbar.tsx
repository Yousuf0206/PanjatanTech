"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Container } from "@/components/ui";
import { mainNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-navy/80 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-cyan focus:px-3 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-fg">
          <Image src="/brand/logo.svg" alt="" width={28} height={28} priority />
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors hover:text-fg",
                    isActive(item.href) ? "text-fg" : "text-fg-muted",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href={site.secondaryCta.href}>{site.secondaryCta.label}</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={site.primaryCta.href}>{site.primaryCta.label}</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-border bg-navy lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-6">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="rounded-md px-3 py-3 text-base text-fg hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 grid gap-3">
              <Button asChild variant="secondary" size="lg">
                <Link href={site.secondaryCta.href}>{site.secondaryCta.label}</Link>
              </Button>
              <Button asChild size="lg">
                <Link href={site.primaryCta.href}>{site.primaryCta.label}</Link>
              </Button>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
