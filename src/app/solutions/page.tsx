import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui";
import { SolutionCard } from "@/components/solutions/solution-card";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description: "How teams of different sizes and industries can use PanjatanTech.",
  alternates: { canonical: "/solutions" },
};

function Group({ title, kind }: { title: string; kind: "persona" | "vertical" }) {
  const items = solutions.filter((s) => s.kind === kind);
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-fg">{title}</h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <li key={s.slug} className="flex">
            <SolutionCard solution={s} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SolutionsPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Solutions"
          title="Built around how you work"
          description="Explore how PanjatanTech fits your team and your industry."
          align="left"
        />
        <Group title="By team" kind="persona" />
        <Group title="By industry" kind="vertical" />
      </Container>
    </Section>
  );
}
