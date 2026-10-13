"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { DocSearchEntry } from "@/lib/docs";

/**
 * Docs search. Local fallback: client-side filter over an index generated at build time.
 *
 * TODO(devrel): Algolia DocSearch swap. When NEXT_PUBLIC_ALGOLIA_APP_ID,
 * NEXT_PUBLIC_ALGOLIA_SEARCH_KEY and NEXT_PUBLIC_ALGOLIA_INDEX are set and
 * `@docsearch/react` is installed, render <DocSearch appId apiKey indexName /> here
 * (import "@docsearch/css") and skip the local index. The package is not installed yet,
 * so the local fallback is always used and `algoliaConfigured` is informational only.
 */
export const algoliaConfigured = Boolean(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID &&
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY &&
    process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
);

function score(e: DocSearchEntry, terms: string[]): number {
  const t = e.title.toLowerCase();
  const d = e.description.toLowerCase();
  const h = e.headings.join(" ").toLowerCase();
  let s = 0;
  for (const term of terms) {
    const hit = (t.includes(term) ? 3 : 0) + (h.includes(term) ? 2 : 0) + (d.includes(term) ? 1 : 0);
    if (!hit) return 0;
    s += hit;
  }
  return s;
}

export function DocsSearch({ index }: { index: DocSearchEntry[] }) {
  const [q, setQ] = useState("");
  const id = useId();
  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index
      .map((e) => ({ e, s: score(e, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 6);
  }, [q, index]);

  return (
    <div role="search" className="mb-4">
      <label htmlFor={id} className="sr-only">
        Search documentation
      </label>
      <input
        id={id}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search docs"
        className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-fg-subtle"
      />
      <p role="status" className="sr-only">
        {q ? `${results.length} results` : ""}
      </p>
      {q && (
        <ul className="mt-2 space-y-1 rounded-md border border-border bg-surface p-1">
          {results.length === 0 && <li className="px-3 py-2 text-sm text-fg-muted">No results.</li>}
          {results.map(({ e }) => (
            <li key={e.slug}>
              <Link
                href={`/developers/docs/${e.slug}`}
                className="block min-h-11 rounded px-3 py-2 hover:bg-surface-raised"
              >
                <span className="block text-sm text-fg">{e.title}</span>
                <span className="block text-xs text-fg-subtle">{e.section}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
