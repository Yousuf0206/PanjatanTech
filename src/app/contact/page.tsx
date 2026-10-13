import type { Metadata } from "next";
import { CalcomEmbed } from "@/components/contact/calcom-embed";
import { ContactForm } from "@/components/contact/contact-form";
import { Container, Section, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a PanjatanTech demo or talk to our team.",
};

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Request a demo"
          description="Tell us about your project and we will follow up."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="sr-only">Demo request form</h2>
            <ContactForm />
          </div>
          <section aria-labelledby="schedule-heading">
            <h2 id="schedule-heading" className="mb-4 text-xl font-semibold text-fg">
              Or book a time
            </h2>
            <CalcomEmbed />
          </section>
        </div>
      </Container>
    </Section>
  );
}
