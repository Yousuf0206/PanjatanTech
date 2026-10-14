import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { Badge, Button, Card } from "@/components/ui";
import { comparison, tiers } from "@/content/pricing";
import { cn } from "@/lib/utils";

export function PricingView() {
  return (
    <>
      <ul className=" grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((t) => (
          <li key={t.id}>
            <Card className={cn("flex h-full flex-col", t.featured && "border-cyan/60")}>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-fg">
                {t.name}
                {t.featured && <Badge>Popular</Badge>}
              </h2>
              <p className="mt-2 text-sm text-fg-muted">{t.blurb}</p>
              <p className="mt-6 text-3xl font-semibold text-fg">{t.price}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-fg-muted">
                {t.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
              <Button asChild variant={t.featured ? "primary" : "secondary"} className="mt-6">
                <Link href={t.cta.href}>{t.cta.label}</Link>
              </Button>
            </Card>
          </li>
        ))}
      </ul>

      <div
        className="mt-16 overflow-x-auto rounded-lg border border-border"
        tabIndex={0}
        role="region"
        aria-label="Plan comparison table"
      >
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <caption className="sr-only">Feature comparison across plans</caption>
          <thead className="bg-surface">
            <tr>
              <th scope="col" className="p-3 font-semibold text-fg">
                Feature
              </th>
              {tiers.map((t) => (
                <th key={t.id} scope="col" className="p-3 font-semibold text-fg">
                  {t.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.feature} className="border-t border-border">
                <th scope="row" className="p-3 font-medium text-fg">
                  {row.feature}
                </th>
                {row.values.map((v, i) => (
                  <td key={tiers[i].id} className="p-3 text-fg-muted">
                    <Cell value={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <>
        <Check className="size-4 text-cyan" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus className="size-4" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <>{value}</>;
}
