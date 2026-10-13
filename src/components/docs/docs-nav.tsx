"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { DocMeta } from "@/lib/docs";

type Group = { section: string; docs: DocMeta[] };

function NavList({ groups, label }: { groups: Group[]; label: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label={label}>
      {groups.map((g) => (
        <div key={g.section} className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            {g.section}
          </h2>
          <ul className="space-y-1">
            {g.docs.map((d) => {
              const href = `/developers/docs/${d.slug}`;
              const current = pathname === href;
              return (
                <li key={d.slug}>
                  <Link
                    href={href}
                    aria-current={current ? "page" : undefined}
                    className={`block min-h-11 rounded-md px-3 py-2.5 text-sm ${
                      current
                        ? "bg-surface-raised text-cyan"
                        : "text-fg-muted hover:bg-surface hover:text-fg"
                    }`}
                  >
                    {d.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsNav({ groups }: { groups: Group[] }) {
  const pathname = usePathname();
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    details.current?.removeAttribute("open");
  }, [pathname]);
  return (
    <>
      <details ref={details} className="rounded-lg border border-border bg-surface lg:hidden">
        <summary className="min-h-11 cursor-pointer list-none px-4 py-3 text-sm font-medium text-fg">
          Documentation menu
        </summary>
        <div className="border-t border-border p-4">
          <NavList groups={groups} label="Documentation (mobile)" />
        </div>
      </details>
      <div className="hidden lg:block">
        <NavList groups={groups} label="Documentation" />
      </div>
    </>
  );
}
