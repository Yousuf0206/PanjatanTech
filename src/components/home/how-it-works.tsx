import { Container, Section, SectionHeading } from "@/components/ui";
import { FadeIn } from "@/lib/motion";

const steps = [
  { title: "Connect", body: "Create a project and API key, then install the SDK." },
  { title: "Build", body: "Serve models, index your data and compose agents with a consistent API." },
  { title: "Evaluate", body: "Run test sets against every change before it reaches users." },
  { title: "Ship", body: "Deploy with usage metering and checkpoints you control." },
];

export function HowItWorks() {
  return (
    <Section className="bg-surface/40">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From first call to production in four steps"
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title}>
              <FadeIn delay={i * 0.05}>
                <span className="font-mono text-sm text-cyan" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-fg">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
              </FadeIn>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
