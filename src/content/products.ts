/**
 * Product catalog — shared by Home (Phase 1), Products (Phase 2) and Developers (Phase 3).
 *
 * PLACEHOLDER CONTENT: names, descriptions and categories below are drafts pending
 * Phase 0 content sign-off (Senior Manager / Product). Do not add metrics, customer
 * names or capability claims here until they are verified (Constitution III).
 */
export type ProductCategory = "inference" | "data" | "agents" | "quality";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  features: string[];
};

export const productCategories: { id: ProductCategory; label: string }[] = [
  { id: "inference", label: "Inference" },
  { id: "data", label: "Data & retrieval" },
  { id: "agents", label: "Agents" },
  { id: "quality", label: "Evaluation" },
];

export const products: Product[] = [
  {
    slug: "inference-api",
    name: "Inference API",
    tagline: "One API for production model serving.",
    description:
      "Serve hosted and open-weight models behind a single, versioned endpoint with streaming, retries and usage metering built in.",
    category: "inference",
    features: ["Streaming responses", "Automatic retries", "Per-key usage metering"],
  },
  {
    slug: "vector-store",
    name: "Vector Store",
    tagline: "Managed retrieval for RAG workloads.",
    description:
      "Store, index and query embeddings with metadata filters and hybrid search, without running your own cluster.",
    category: "data",
    features: ["Hybrid search", "Metadata filtering", "Namespaced indexes"],
  },
  {
    slug: "agent-runtime",
    name: "Agent Runtime",
    tagline: "Durable execution for tool-using agents.",
    description:
      "Run multi-step agents with persisted state, tool calling and human-in-the-loop checkpoints.",
    category: "agents",
    features: ["Persisted state", "Tool calling", "Approval checkpoints"],
  },
  {
    slug: "eval-studio",
    name: "Eval Studio",
    tagline: "Measure quality before you ship.",
    description:
      "Build test sets, run model and prompt evaluations, and compare results across versions.",
    category: "quality",
    features: ["Versioned test sets", "Side-by-side comparison", "CI integration"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
