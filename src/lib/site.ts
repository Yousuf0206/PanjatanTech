/**
 * Site-wide configuration: navigation, footer links and CTAs.
 * Each route listed here is owned by one delivery phase (see specs/001-website/tasks.md).
 */
export const site = {
  name: "PanjatanTech",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://panjatantech.com",
  description: "AI infrastructure and developer tools for teams that ship production AI.",
  primaryCta: { label: "Start free", href: "/pricing" },
  secondaryCta: { label: "Book a demo", href: "/contact" },
};

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const footerNav: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Products", href: "/products" },
      { label: "Pricing", href: "/pricing" },
      { label: "Solutions", href: "/solutions" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Documentation", href: "/developers/docs" },
      { label: "API reference", href: "/developers/api" },
      { label: "SDKs", href: "/developers/sdks" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
