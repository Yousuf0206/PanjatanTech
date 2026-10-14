import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui";
import { Team, Values } from "@/components/about/sections";

export const metadata: Metadata = {
  title: "About",
  description: "Our mission and the values behind how we build.",
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
    </>
  );
}
