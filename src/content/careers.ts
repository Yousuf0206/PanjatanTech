/**
 * Careers content. Benefits and an applications address are added once confirmed;
 * until then the page points candidates to the contact form.
 */
export type Role = {
  slug: string;
  title: string;
  team: string;
  location: string;
  summary: string;
};

// An empty array renders the "hiring soon" state.
export const roles: Role[] = [];

/** Set to a real address to enable "Apply by email"; null routes candidates to /contact. */
export const applyEmail: string | null = null;

export const culture = [
  { title: "Ship with care", body: "We value reliable software and honest communication." },
  { title: "Learn in the open", body: "We write things down and share what we learn." },
  { title: "Respect for focus", body: "We protect time for deep work." },
];
