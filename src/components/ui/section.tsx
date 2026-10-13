import * as React from "react";
import { cn } from "@/lib/utils";

/** Horizontal page gutter + max width. Mobile-first: 16px gutter at 320–375px. */
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />
  );
}

export function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-16 sm:py-24", className)} {...props} />;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan">{eyebrow}</p>
      )}
      <Heading className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {title}
      </Heading>
      {description && <p className="mt-4 text-lg text-fg-muted">{description}</p>}
    </div>
  );
}
