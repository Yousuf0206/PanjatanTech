import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui";
import { Team, Timeline, Values } from "@/components/about/sections";

export const metadata: Metadata = {
  title: "About",
  description: "Our mission, values, team and story.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="About"
            title="Making production AI less painful"
            description="Our mission is to give teams dependable infrastructure and developer tools for shipping AI."
            align="left"
          />
        </Container>
      </Section>
      <Values />
      <Team />
      <Timeline />
    </>
  );
}
