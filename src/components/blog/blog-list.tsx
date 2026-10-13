"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge, Card, CardDescription, CardTitle } from "@/components/ui";
import { cn } from "@/lib/utils";
import { blogCategories, type PostMeta } from "@/lib/blog-shared";

type Filter = "All" | (typeof blogCategories)[number];

export type ListPost = Omit<PostMeta, "tags"> & { dateLabel: string };

export function BlogList({ posts }: { posts: ListPost[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? posts : posts.filter((p) => p.category === filter);
  const filters: Filter[] = ["All", ...blogCategories];

  return (
    <div>
      <div role="group" aria-label="Filter posts by category" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
              filter === f
                ? "border-cyan bg-cyan/10 text-cyan"
                : "border-border text-fg-muted hover:text-fg",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {shown.length} {shown.length === 1 ? "post" : "posts"} shown
      </p>

      {shown.length === 0 ? (
        <p className="mt-8 text-fg-muted">No posts in this category yet.</p>
      ) : (
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug} className="flex">
              <Card className="relative w-full transition-colors focus-within:border-cyan hover:border-cyan/50">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{p.category}</Badge>
                  {p.draft && <Badge variant="purple">Draft</Badge>}
                </div>
                <CardTitle className="mt-3">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="after:absolute after:inset-0 focus-visible:outline-none"
                  >
                    {p.title}
                  </Link>
                </CardTitle>
                <CardDescription>{p.description}</CardDescription>
                <p className="mt-4 text-xs text-fg-subtle">
                  {p.dateLabel} &middot; {p.readingMinutes} min read
                </p>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
