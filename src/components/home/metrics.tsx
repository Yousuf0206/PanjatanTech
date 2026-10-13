import { Card, Container, Section, SectionHeading } from "@/components/ui";
import { FadeIn } from "@/lib/motion";

// TODO(content): replace with verified, sourced metrics (Constitution III: no invented numbers).
const slots = ["Metric one", "Metric two", "Metric three"];

export function Metrics() {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Results" title="Numbers we can stand behind" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {slots.map((s, i) => (
            <li key={s}>
              <FadeIn delay={i * 0.05} className="h-full">
                <Card className="h-full border-dashed bg-transparent text-center">
                  <p className="text-3xl font-semibold text-fg-subtle" aria-hidden="true">
                    —
                  </p>
                  <p className="mt-2 text-sm text-fg-subtle">{s} — pending verified data</p>
                </Card>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
