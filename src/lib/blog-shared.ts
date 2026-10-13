/** Blog constants and types safe to import from client components (no Node APIs). */
export const blogCategories = ["Articles", "Case studies", "Release notes"] as const;
export type BlogCategory = (typeof blogCategories)[number];

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  author: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
};
