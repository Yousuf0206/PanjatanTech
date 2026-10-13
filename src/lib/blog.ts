import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { blogCategories, type BlogCategory, type PostMeta } from "./blog-shared";

export { blogCategories, type BlogCategory, type PostMeta };

export type Post = PostMeta & { content: string };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function toCategory(value: unknown): BlogCategory {
  return blogCategories.find((c) => c === value) ?? "Articles";
}

function parseFile(file: string): Post {
  const slug = file.replace(/\.mdx$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));
  const date =
    data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date,
    category: toCategory(data.category),
    author: String(data.author ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
    readingMinutes: readingTime(content),
    content,
  };
}

/** Drafts are only visible outside production. */
function isVisible(p: Post): boolean {
  return !p.draft || process.env.NODE_ENV !== "production";
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parseFile)
    .filter(isVisible)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
