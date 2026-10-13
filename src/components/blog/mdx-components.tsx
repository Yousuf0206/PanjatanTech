import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (p) => <h2 className="mt-10 text-2xl font-semibold text-fg" {...p} />,
  h3: (p) => <h3 className="mt-8 text-xl font-semibold text-fg" {...p} />,
  p: (p) => <p className="mt-4 leading-relaxed text-fg-muted" {...p} />,
  ul: (p) => <ul className="mt-4 list-disc space-y-2 pl-6 text-fg-muted" {...p} />,
  ol: (p) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-fg-muted" {...p} />,
  a: (p) => <a className="text-cyan underline underline-offset-4" {...p} />,
  strong: (p) => <strong className="font-semibold text-fg" {...p} />,
  code: (p) => <code className="rounded bg-surface-raised px-1 py-0.5 text-sm text-fg" {...p} />,
  pre: (p) => (
    <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm" {...p} />
  ),
  blockquote: (p) => (
    <blockquote className="mt-4 border-l-2 border-cyan pl-4 text-fg-muted" {...p} />
  ),
};
