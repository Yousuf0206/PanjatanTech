/** Solutions content (personas + verticals). No customer names, metrics or compliance claims (Constitution III). */
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
  useCases: { title: string; body: string }[];
  /** Ordered steps showing how the products fit together for this audience. */
  steps: string[];
  /** Slug of the most relevant guide in content/docs. */
  guide: string;
  /** Shows the generic compliance note instead of any compliance assertion. */
  complianceNote?: boolean;
};

export const complianceCopy =
  "Regulatory and compliance requirements vary by team. Talk to us about your compliance requirements and we will tell you plainly what we can and cannot support today.";

export const solutions: Solution[] = [
  {
    slug: "developers",
    useCases: [
      { title: "Summaries and classification", body: "Turn tickets, emails or logs into summaries and labels with one inference call per item." },
      { title: "Answers grounded in your docs", body: "Index your documentation in the Vector Store and pass the best matches to the model as context." },
      { title: "Regression checks in CI", body: "Run an evaluation on every prompt or model change and fail the build if quality drops." },
    ],
    steps: [
      "Create an API key and install @panjatantech/sdk.",
      "Call the Inference API for your first feature.",
      "Add retrieval with the Vector Store when answers need your own data.",
      "Add an Eval Studio test set to CI before you ship changes.",
    ],
    guide: "quickstart",
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
    useCases: [
      { title: "A first AI feature in days", body: "Use managed inference so the team ships product, not infrastructure." },
      { title: "Support triage", body: "Run an agent that reads incoming issues and routes them to the right owner with a priority." },
      { title: "Iterate with confidence", body: "Compare prompt and model versions on the same test set before switching." },
    ],
    steps: [
      "Prototype on the Free plan with the Inference API.",
      "Move multi-step workflows into Agent Runtime when they outgrow a single call.",
      "Track usage per key as traffic grows.",
      "Talk to sales when you need higher limits.",
    ],
    guide: "agents",
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
    useCases: [
      { title: "A shared platform for many teams", body: "Give each team its own API keys on one platform, with usage metered per key." },
      { title: "Consistent quality gates", body: "Use the same evaluation process across teams before AI changes reach users." },
      { title: "Durable, reviewable workflows", body: "Run long business processes as agent runs with persisted state and approval checkpoints." },
    ],
    steps: [
      "Issue separate keys per team and environment.",
      "Standardise on the Inference API for model access.",
      "Require an Eval Studio run before production changes.",
      "Use Agent Runtime approval checkpoints where a human must sign off.",
    ],
    guide: "authentication",
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
    useCases: [
      { title: "Document review assistance", body: "Extract and summarise key terms from agreements for a human reviewer to confirm." },
      { title: "Case routing", body: "Route disputes or support cases to the right queue with an agent run that records each step." },
      { title: "Change control for prompts", body: "Evaluate every prompt or model change against a fixed test set and keep the results." },
    ],
    steps: [
      "Define the workflow as an agent with approval checkpoints at sensitive steps.",
      "Build a test set from reviewed historical cases.",
      "Run evaluations before each change and keep the results with your change records.",
    ],
    guide: "agents",
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
    useCases: [
      { title: "Search over internal guidance", body: "Index policies and operating procedures so staff find the right document faster." },
      { title: "Drafting with human review", body: "Generate first drafts of routine documents that a qualified person reviews before use." },
      { title: "Careful rollout", body: "Measure behaviour on a representative test set before widening access." },
    ],
    steps: [
      "Index your internal documents in the Vector Store.",
      "Ground model responses in retrieved documents only.",
      "Keep a human approval step in every agent workflow that affects patients or records.",
      "Evaluate on a reviewed test set before each rollout.",
    ],
    guide: "vector-store",
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
    useCases: [
      { title: "Natural-language product search", body: "Match shopper questions to products using semantic search with metadata filters such as category or stock." },
      { title: "Support assistant", body: "Answer order and policy questions from your help-centre content." },
      { title: "Catalog enrichment", body: "Generate consistent product summaries and attributes from supplier data for review." },
    ],
    steps: [
      "Index product and help-centre content with metadata for filtering.",
      "Query the index for each shopper question.",
      "Pass the top matches to the Inference API to compose an answer.",
    ],
    guide: "vector-store",
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
