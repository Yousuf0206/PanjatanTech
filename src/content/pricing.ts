// PLACEHOLDER pricing — pending approval. Do not present these figures as final (Constitution III).
export type TierId = "free" | "pro" | "team" | "enterprise";

export type Tier = {
  id: TierId;
  name: string;
  blurb: string;
  /** Monthly price in USD; null = contact sales. */
  monthly: number | null;
  /** Effective monthly price when billed annually; null = contact sales. */
  annualMonthly: number | null;
  cta: { label: string; href: string };
  highlights: string[];
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    id: "free",
    name: "Free",
    blurb: "Explore the platform and prototype.",
    monthly: 0,
    annualMonthly: 0,
    cta: { label: "Start free", href: "/contact" },
    highlights: ["Community support", "Sandbox usage limits", "Single project"],
  },
  {
    id: "pro",
    name: "Pro",
    blurb: "For individual developers shipping to production.",
    monthly: 29,
    annualMonthly: 24,
    cta: { label: "Get Pro", href: "/contact" },
    highlights: ["Higher usage limits", "Email support", "Multiple projects"],
    featured: true,
  },
  {
    id: "team",
    name: "Team",
    blurb: "Collaboration and controls for growing teams.",
    monthly: 99,
    annualMonthly: 82,
    cta: { label: "Get Team", href: "/contact" },
    highlights: ["Shared workspaces", "Role-based access", "Priority support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    blurb: "Custom terms, security reviews and support.",
    monthly: null,
    annualMonthly: null,
    cta: { label: "Contact sales", href: "/contact" },
    highlights: ["Custom limits", "SSO / SAML", "Dedicated support"],
  },
];

type Cell = boolean | string;
/** Values are ordered to match `tiers`. */
export type ComparisonRow = { feature: string; values: [Cell, Cell, Cell, Cell] };

export const comparison: ComparisonRow[] = [
  { feature: "Projects", values: ["1", "Multiple", "Multiple", "Custom"] },
  { feature: "Usage limits", values: ["Sandbox", "Higher", "Highest", "Custom"] },
  { feature: "Shared workspaces", values: [false, false, true, true] },
  { feature: "Role-based access", values: [false, false, true, true] },
  { feature: "SSO / SAML", values: [false, false, false, true] },
  { feature: "Support", values: ["Community", "Email", "Priority", "Dedicated"] },
];

export const annualNote = "Annual discount is a placeholder; final terms pending approval.";
