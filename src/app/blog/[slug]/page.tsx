import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/blog/mdx-components";
import { Badge, Container, Section } from "@/components/ui";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      section: post.category,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <Section>
      <Container className="max-w-3xl">
        <Link href="/blog" className="text-sm text-cyan hover:underline">
          &larr; All posts
        </Link>
        <article className="mt-6">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{post.category}</Badge>
              {post.draft && <Badge variant="purple">Draft</Badge>}
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-sm text-fg-subtle">
              {post.author && <>{post.author} &middot; </>}
              <time dateTime={post.date}>{formatDate(post.date)}</time> &middot;{" "}
              {post.readingMinutes} min read
            </p>
          </header>
          <div className="mt-8">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>
      </Container>
    </Section>
  );
}
