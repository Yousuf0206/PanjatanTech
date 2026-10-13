import type { Metadata } from "next";
import { BlogList } from "@/components/blog/blog-list";
import { Container, Section, SectionHeading } from "@/components/ui";
import { formatDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles, case studies and release notes from PanjatanTech.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function BlogPage() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    category: p.category,
    author: p.author,
    draft: p.draft,
    readingMinutes: p.readingMinutes,
    dateLabel: formatDate(p.date),
  }));

  return (
    <Section>
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Blog"
          title="Articles, case studies and release notes"
          align="left"
        />
        <div className="mt-10">
          <BlogList posts={posts} />
        </div>
      </Container>
    </Section>
  );
}
