/**
 * Solutions content (personas + verticals).
 * PLACEHOLDER COPY: no customer names, metrics or compliance claims (Constitution III).
 * TODO(content): replace with signed-off copy.
 */
export type SolutionKind = "persona" | "vertical";

export type Solution = {
  slug: string;
  kind: SolutionKind;
  name: string;
  tagline: string;
  problem: string;
  approach: string;
  /** Slugs from src/content/products.ts */
  products: string[];
  /** Shows the generic compliance note instead of any compliance assertion. */
  complianceNote?: boolean;
};

export const complianceCopy =
  "Regulatory and compliance requirements vary by team. Talk to us about your compliance requirements and we will tell you plainly what we can and cannot support today.";

export const solutions: Solution[] = [
  {
    slug: "developers",
    kind: "persona",
    name: "Developers",
    tagline: "Build AI features without building the platform.",
    problem:
      "Wiring together model providers, retrieval and evaluation by hand slows down every feature and leaves you maintaining glue code.",
    approach:
      "Start from a single API, add retrieval and agents when you need them, and measure quality as you go.",
    products: ["inference-api", "vector-store", "eval-studio"],
  },
  {
    slug: "startups",
    kind: "persona",
    name: "Startups",
    tagline: "Ship a first AI product quickly, then scale it.",
    problem:
      "Small teams cannot afford to staff infrastructure work before they know what customers want.",
    approach:
      "Use managed building blocks to get to a working product, and keep the option to grow into more control later.",
    products: ["inference-api", "agent-runtime"],
  },
  {
    slug: "enterprise",
    kind: "persona",
    name: "Enterprise",
    tagline: "Standardize AI delivery across many teams.",
    problem:
      "Different teams adopt different tools, making cost, quality and risk hard to see or govern.",
    approach:
      "Offer a shared platform with per-key metering and consistent evaluation so teams move quickly on common ground.",
    products: ["inference-api", "agent-runtime", "eval-studio"],
    complianceNote: true,
  },
  {
    slug: "fintech",
    kind: "vertical",
    name: "Fintech",
    tagline: "AI workflows where accuracy and auditability matter.",
    problem:
      "Financial products need predictable behavior and a clear record of what an automated step did.",
    approach:
      "Use persisted agent state and approval checkpoints, and evaluate changes before they reach customers.",
    products: ["agent-runtime", "eval-studio"],
    complianceNote: true,
  },
  {
    slug: "healthcare",
    kind: "vertical",
    name: "Healthcare",
    tagline: "Careful AI adoption for sensitive domains.",
    problem:
      "Healthcare teams need to evaluate AI behavior carefully and keep humans in the loop.",
    approach:
      "Combine retrieval over your own documents with human-in-the-loop checkpoints and systematic evaluation.",
    products: ["vector-store", "agent-runtime", "eval-studio"],
    complianceNote: true,
  },
  {
    slug: "e-commerce",
    kind: "vertical",
    name: "E-commerce",
    tagline: "Search and assistants for catalogs and support.",
    problem:
      "Large catalogs and support queues are hard to search and answer at scale with keyword matching alone.",
    approach:
      "Use hybrid search over your catalog and a managed inference endpoint to power assistants and discovery.",
    products: ["vector-store", "inference-api"],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
