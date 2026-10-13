import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { solutions } from "@/content/solutions";
import { getAllPosts } from "@/lib/blog";
import { getAllDocs } from "@/lib/docs";
import { footerNav, mainNav, site } from "@/lib/site";

// Routes not in site.ts nav.
const EXTRA_ROUTES = ["/contact", "/careers", "/developers/docs", "/developers/api"];

function staticRoutes(): string[] {
  const nav = [...mainNav, ...footerNav.flatMap((g) => g.links)].map((l) => l.href);
  return Array.from(new Set(["/", ...nav, ...EXTRA_ROUTES]));
}

function priority(path: string): number {
  if (path === "/") return 1;
  return path.split("/").length > 2 ? 0.6 : 0.8;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    ...staticRoutes(),
    ...products.map((p) => `/products/${p.slug}`),
    ...solutions.map((s) => `/solutions/${s.slug}`),
    ...getAllDocs().map((d) => `/developers/docs/${d.slug}`),
    // getAllPosts() already hides drafts in production.
    ...getAllPosts().map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: now,
    changeFrequency: "weekly",
    priority: priority(path),
  }));
}
