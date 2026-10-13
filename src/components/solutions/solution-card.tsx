import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui";
import type { Solution } from "@/content/solutions";

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Card className="relative flex flex-col transition-colors focus-within:border-cyan hover:border-cyan/50">
      <CardTitle>
        <Link
          href={`/solutions/${solution.slug}`}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {solution.name}
        </Link>
      </CardTitle>
      <CardDescription>{solution.tagline}</CardDescription>
      <span
        aria-hidden="true"
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan"
      >
        Learn more <ArrowRight className="size-4" />
      </span>
    </Card>
  );
}
