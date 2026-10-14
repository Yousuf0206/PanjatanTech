// Prices are not public yet: paid tiers route to sales until amounts are approved (Speckit v2).
export type TierId = "free" | "pro" | "team" | "enterprise";

export type Tier = {
  id: TierId;
  name: string;
  blurb: string;
  /** Display price. Only "Free" is a published amount. */
  price: string;
  cta: { label: string; href: string };
  highlights: string[];
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    id: "free",
    name: "Free",
    blurb: "Explore the platform and prototype.",
    price: "Free",
    cta: { label: "Start free", href: "/contact" },
    highlights: ["Community support", "Sandbox usage limits", "Single project"],
  },
  {
    id: "pro",
    name: "Pro",
    blurb: "For individual developers shipping to production.",
    price: "Contact sales",
    cta: { label: "Talk to sales", href: "/contact" },
    highlights: ["Higher usage limits", "Email support", "Multiple projects"],
    featured: true,
  },
  {
    id: "team",
    name: "Team",
    blurb: "Collaboration and controls for growing teams.",
    price: "Contact sales",
    cta: { label: "Talk to sales", href: "/contact" },
    highlights: ["Shared workspaces", "Role-based access", "Priority support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    blurb: "Custom terms, security reviews and support.",
    price: "Contact sales",
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
