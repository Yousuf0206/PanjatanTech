import { Badge, Card, CardDescription, CardTitle, Container, Section, SectionHeading } from "@/components/ui";

// TODO(content): replace placeholder values with approved copy.
const values = [
  { title: "Honesty first", body: "Placeholder: we say what our products do and what they do not." },
  { title: "Build for production", body: "Placeholder: reliability is a feature, not an afterthought." },
  { title: "Respect developers' time", body: "Placeholder: clear docs, predictable APIs, fewer surprises." },
];

// TODO(content): add real team members (names, roles, approved photos). None invented.
const teamSlots = ["Team member 1", "Team member 2", "Team member 3", "Team member 4"];

// TODO(content): add real company milestones.
const milestones = ["Milestone 1", "Milestone 2", "Milestone 3"];

export function Values() {
  return (
    <Section className="pt-0 sm:pt-0">
      <Container>
        <h2 className="text-2xl font-semibold text-fg">Our values</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {values.map((v) => (
            <li key={v.title} className="flex">
              <Card className="w-full">
                <CardTitle>{v.title}</CardTitle>
                <CardDescription>{v.body}</CardDescription>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function Team() {
  return (
    <Section className="pt-0 sm:pt-0">
      <Container>
        <SectionHeading title="Team" description="Team profiles are coming soon." align="left" />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamSlots.map((label) => (
            <li key={label}>
              <Card>
                <div
                  aria-hidden="true"
                  className="size-16 rounded-full border border-dashed border-border bg-surface-raised"
                />
                <p className="mt-4 font-semibold text-fg">{label}</p>
                <p className="text-sm text-fg-muted">Name and role to be announced</p>
                <Badge variant="neutral" className="mt-3">
                  Placeholder
                </Badge>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function Timeline() {
  return (
    <Section className="pt-0 sm:pt-0">
      <Container>
        <SectionHeading title="Timeline" align="left" />
        <ol className="mt-6 space-y-4 border-l border-border pl-6">
          {milestones.map((m) => (
            <li key={m}>
              <p className="font-medium text-fg">{m}</p>
              <p className="text-sm text-fg-muted">TODO: date and description to be added.</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
