import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

export type DocMeta = {
  slug: string;
  title: string;
  description: string;
  order: number;
  section: string;
};

export type Doc = DocMeta & { content: string };

export type DocSearchEntry = DocMeta & { headings: string[] };

function parse(file: string): Doc {
  const slug = file.replace(/\.mdx$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(DOCS_DIR, file), "utf8"));
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    order: Number(data.order ?? 999),
    section: String(data.section ?? "General"),
    content,
  };
}

/** All docs, sorted by section (first appearance by order) then order. */
export function getAllDocs(): Doc[] {
  const docs = fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parse);
  const sectionRank = new Map<string, number>();
  for (const d of docs) {
    sectionRank.set(d.section, Math.min(sectionRank.get(d.section) ?? Infinity, d.order));
  }
  return docs.sort(
    (a, b) =>
      (sectionRank.get(a.section) ?? 0) - (sectionRank.get(b.section) ?? 0) ||
      a.section.localeCompare(b.section) ||
      a.order - b.order,
  );
}

function toMeta(d: Doc): DocMeta {
  return { slug: d.slug, title: d.title, description: d.description, order: d.order, section: d.section };
}

export function getDoc(slug: string): Doc | undefined {
  return getAllDocs().find((d) => d.slug === slug);
}

export function getDocsBySection(): { section: string; docs: DocMeta[] }[] {
  const groups: { section: string; docs: DocMeta[] }[] = [];
  for (const meta of getAllDocs().map(toMeta)) {
    const g = groups.find((x) => x.section === meta.section);
    if (g) g.docs.push(meta);
    else groups.push({ section: meta.section, docs: [meta] });
  }
  return groups;
}

export function getPrevNext(slug: string): { prev?: DocMeta; next?: DocMeta } {
  const docs = getAllDocs();
  const i = docs.findIndex((d) => d.slug === slug);
  return {
    prev: i > 0 ? toMeta(docs[i - 1]) : undefined,
    next: i >= 0 && i < docs.length - 1 ? toMeta(docs[i + 1]) : undefined,
  };
}

/** Search index generated at build time from frontmatter + headings. */
export function getSearchIndex(): DocSearchEntry[] {
  return getAllDocs().map((d) => ({
    ...toMeta(d),
    headings: [...d.content.matchAll(/^#{2,3}\s+(.+)$/gm)].map((m) => m[1].trim()),
  }));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
