/**
 * Careers content. PLACEHOLDER: no real roles, benefits or contact details yet.
 * TODO(content): confirm benefits with People/HR; replace the mailto address.
 */
export type Role = {
  slug: string;
  title: string;
  team: string;
  location: string;
  summary: string;
};

// TODO(content): add real roles. An empty array renders the empty state.
export const roles: Role[] = [];

export const applyEmail = "careers@example.com"; // TODO(content): real address

export const culture = [
  { title: "Ship with care", body: "Placeholder: we value reliable software and honest communication." },
  { title: "Learn in the open", body: "Placeholder: we write things down and share what we learn." },
  { title: "Respect for focus", body: "Placeholder: we protect time for deep work." },
];

// TODO(content): benefits are placeholders until confirmed.
export const benefits = [
  "Placeholder benefit: health coverage (to be confirmed)",
  "Placeholder benefit: flexible working (to be confirmed)",
  "Placeholder benefit: learning budget (to be confirmed)",
  "Placeholder benefit: paid time off (to be confirmed)",
];
