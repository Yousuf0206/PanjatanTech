import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/docs/mdx-components";
import { getAllDocs, getDoc, getPrevNext } from "@/lib/docs";

type Params = { slug: string[] };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllDocs().map((d) => ({ slug: [d.slug] }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const doc = getDoc((await params).slug.join("/"));
  return doc ? { title: doc.title, description: doc.description } : {};
}

export default async function DocPage({ params }: { params: Promise<Params> }) {
  const slug = (await params).slug.join("/");
  const doc = getDoc(slug);
  if (!doc) notFound();
  const { prev, next } = getPrevNext(slug);
  const card = "rounded-lg border border-border p-4 hover:border-cyan";
  return (
    <div>
      <article className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan">{doc.section}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{doc.title}</h1>
        <p className="mt-3 text-lg text-fg-muted">{doc.description}</p>
        <MDXRemote source={doc.content} components={mdxComponents} />
      </article>
      <nav aria-label="Pagination" className="mt-16 grid max-w-3xl gap-4 border-t border-border pt-6 sm:grid-cols-2">
        {prev ? (
          <Link href={`/developers/docs/${prev.slug}`} className={card}>
            <span className="block text-xs text-fg-subtle">Previous</span>
            <span className="text-fg">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/developers/docs/${next.slug}`} className={`${card} text-right`}>
            <span className="block text-xs text-fg-subtle">Next</span>
            <span className="text-fg">{next.title}</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
