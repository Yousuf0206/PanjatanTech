import Link from "next/link";
import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { CodeSnippet } from "@/components/code/code-snippet";
import { slugify } from "@/lib/docs";

type WithChildren = { children?: ReactNode };
type CodeProps = { className?: string; children?: ReactNode };

function textOf(node: ReactNode): string {
  return Children.toArray(node)
    .map((c) => {
      if (typeof c === "string" || typeof c === "number") return String(c);
      return isValidElement(c) ? textOf((c.props as WithChildren).children) : "";
    })
    .join("");
}

function heading(Tag: "h2" | "h3", cls: string) {
  return function Heading({ children }: WithChildren) {
    const id = slugify(textOf(children));
    return (
      <Tag id={id} className={`group scroll-mt-24 ${cls}`}>
        {children}
        <a
          href={`#${id}`}
          aria-label={`Link to section: ${textOf(children)}`}
          className="ml-2 text-fg-subtle opacity-0 hover:text-cyan focus-visible:opacity-100 group-hover:opacity-100"
        >
          #
        </a>
      </Tag>
    );
  };
}

async function Pre({ children }: WithChildren) {
  const child = Children.toArray(children)[0] as ReactElement<CodeProps> | undefined;
  const lang = /language-(\w+)/.exec(child?.props?.className ?? "")?.[1] ?? "text";
  const code = textOf(child?.props?.children).replace(/\n$/, "");
  return (
    <div className="my-6">
      <CodeSnippet snippets={[{ language: lang, label: lang, code }]} title={lang} />
    </div>
  );
}

const LABELS: Record<string, string> = { bash: "cURL", ts: "TypeScript", python: "Python", json: "JSON" };

function snippetOf(pre: ReactNode) {
  const child = isValidElement(pre)
    ? (Children.toArray((pre.props as WithChildren).children)[0] as ReactElement<CodeProps> | undefined)
    : undefined;
  const lang = /language-(\w+)/.exec(child?.props?.className ?? "")?.[1] ?? "text";
  const code = textOf(child?.props?.children).replace(/\n$/, "");
  return { language: lang, label: LABELS[lang] ?? lang, code };
}

/** Wrap consecutive fenced code blocks in <CodeGroup> to show them as language tabs. */
async function CodeGroup({ children, title }: WithChildren & { title?: string }) {
  const snippets = Children.toArray(children).filter(isValidElement).map(snippetOf);
  return (
    <div className="my-6">
      <CodeSnippet snippets={snippets} title={title} />
    </div>
  );
}

const linkCls = "text-cyan underline underline-offset-4 hover:text-cyan-dim";

export const mdxComponents = {
  h2: heading("h2", "mt-12 mb-4 text-2xl font-semibold tracking-tight text-fg"),
  h3: heading("h3", "mt-8 mb-3 text-xl font-semibold text-fg"),
  p: (p: WithChildren) => <p className="my-4 leading-7 text-fg-muted" {...p} />,
  ul: (p: WithChildren) => <ul className="my-4 list-disc space-y-2 pl-6 text-fg-muted" {...p} />,
  ol: (p: WithChildren) => <ol className="my-4 list-decimal space-y-2 pl-6 text-fg-muted" {...p} />,
  strong: (p: WithChildren) => <strong className="font-semibold text-fg" {...p} />,
  a: ({ href = "", children }: WithChildren & { href?: string }) =>
    href.startsWith("/") ? (
      <Link href={href} className={linkCls}>
        {children}
      </Link>
    ) : (
      <a href={href} className={linkCls} rel="noreferrer noopener">
        {children}
      </a>
    ),
  code: ({ className, children }: CodeProps) =>
    className ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-[0.9em] text-fg">
        {children}
      </code>
    ),
  pre: Pre,
  CodeGroup,
};
