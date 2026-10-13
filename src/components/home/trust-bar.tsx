import { Container } from "@/components/ui";
import { FadeIn } from "@/lib/motion";

// TODO(content): replace with approved customer logos (Constitution III: no invented customers).
const slots = [1, 2, 3, 4, 5];

export function TrustBar() {
  return (
    <section aria-labelledby="trust-title" className="border-y border-border bg-surface/40 py-10">
      <Container>
        <h2 id="trust-title" className="text-center text-sm font-medium text-fg-muted">
          Built for teams shipping production AI
        </h2>
        <FadeIn>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {slots.map((n) => (
              <li
                key={n}
                className="flex h-14 items-center justify-center rounded-md border border-dashed border-border px-2 text-center text-xs text-fg-subtle"
              >
                Customer logo — pending approval
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}
