import { codeToHtml } from "shiki";

const THEME = "github-dark";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Server-side syntax highlighting. Falls back to escaped plain text for unknown languages. */
export async function highlight(code: string, language: string): Promise<string> {
  try {
    return await codeToHtml(code, { lang: language, theme: THEME });
  } catch {
    return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`;
  }
}
