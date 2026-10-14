"use client";

import * as React from "react";

export interface FadeInProps {
  children: React.ReactNode;
  /** Delay in seconds. */
  delay?: number;
  /** Vertical offset in px to travel from. */
  y?: number;
  className?: string;
}

/**
 * Scroll-triggered fade/slide-in using CSS transitions (see [data-fade] in globals.css) and an
 * IntersectionObserver — no animation library. The CSS only hides content when scripting is
 * enabled and the user has not asked for reduced motion. Never wrap the LCP element in this.
 */
export function FadeIn({ children, delay = 0, y = 16, className }: FadeInProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.dataset.shown = "";
        io.disconnect();
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = { "--fade-delay": `${delay}s`, "--fade-y": `${y}px` } as React.CSSProperties;
  return React.createElement("div", { ref, className, style, "data-fade": "" }, children);
}
