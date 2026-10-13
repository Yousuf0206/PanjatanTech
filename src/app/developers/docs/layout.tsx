import { DocsNav } from "@/components/docs/docs-nav";
import { DocsSearch } from "@/components/docs/search";
import { getDocsBySection, getSearchIndex } from "@/lib/docs";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:px-8 lg:py-12">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <DocsSearch index={getSearchIndex()} />
        <DocsNav groups={getDocsBySection()} />
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
