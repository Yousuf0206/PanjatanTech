"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge, Card, CardDescription, CardTitle } from "@/components/ui";
import { productCategories, products, type ProductCategory } from "@/content/products";
import { cn } from "@/lib/utils";

const ids = productCategories.map((c) => c.id);

export function ProductList() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const raw = params.get("category");
  const active = ids.includes(raw as ProductCategory) ? (raw as ProductCategory) : null;

  function select(next: ProductCategory | null) {
    router.replace(next ? `${pathname}?category=${next}` : pathname, { scroll: false });
  }

  const shown = active ? products.filter((p) => p.category === active) : products;
  const filters = [{ id: null, label: "All" }, ...productCategories] as {
    id: ProductCategory | null;
    label: string;
  }[];

  return (
    <>
      <div role="group" aria-label="Filter products by category" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const pressed = f.id === active;
          return (
            <button
              key={f.label}
              type="button"
              aria-pressed={pressed}
              onClick={() => select(f.id)}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
                pressed
                  ? "border-cyan bg-cyan/10 text-cyan"
                  : "border-border bg-surface text-fg-muted hover:text-fg",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <p className="sr-only" role="status">
        Showing {shown.length} of {products.length} products
      </p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {shown.map((p) => (
          <li key={p.slug}>
            <Card className="h-full">
              <Badge variant="purple">
                {productCategories.find((c) => c.id === p.category)?.label}
              </Badge>
              <CardTitle className="mt-3">
                <Link href={`/products/${p.slug}`} className="hover:text-cyan">
                  {p.name}
                </Link>
              </CardTitle>
              <CardDescription>{p.tagline}</CardDescription>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
