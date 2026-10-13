import { CodeTabs } from "./code-tabs";
import { highlight } from "./highlight";

/**
 * Multi-language code snippet with a language switcher and copy-to-clipboard.
 * Owned by Phase 3 — the props below are a fixed contract other phases import against.
 * Async server component: highlights with shiki on the server, tabs/copy run on the client.
 */
export type Snippet = {
  /** Language id for highlighting, e.g. "ts", "python", "bash". */
  language: string;
  /** Tab label, e.g. "TypeScript". */
  label: string;
  code: string;
};

export type CodeSnippetProps = {
  snippets: Snippet[];
  /** Optional filename or caption shown in the header. */
  title?: string;
};

export async function CodeSnippet({ snippets, title }: CodeSnippetProps) {
  const items = await Promise.all(
    snippets.map(async (s) => ({ ...s, html: await highlight(s.code, s.language) })),
  );
  return <CodeTabs items={items} title={title} />;
}
