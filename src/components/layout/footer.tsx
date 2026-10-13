import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { footerNav, site } from "@/lib/site";
import { CookieSettingsButton } from "./cookie-settings-button";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-semibold text-fg">
            <Image src="/brand/logo.svg" alt="" width={28} height={28} />
            {site.name}
          </Link>
          <p className="mt-3 max-w-xs text-sm text-fg-muted">{site.description}</p>
        </div>
        {footerNav.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <h2 className="text-sm font-semibold text-fg">{group.heading}</h2>
            <ul className="mt-3 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-fg-muted hover:text-fg">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-sm text-fg-subtle">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <CookieSettingsButton />
      </Container>
    </footer>
  );
}
