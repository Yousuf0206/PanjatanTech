"use client";

import { motion, useReducedMotion } from "framer-motion";
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
 * Scroll-triggered fade/slide-in. Renders static content when the user prefers
 * reduced motion. Never wrap the LCP element (hero h1) in this.
 */
export function FadeIn({ children, delay = 0, y = 16, className }: FadeInProps) {
  const reduce = useReducedMotion();
  if (reduce) return React.createElement("div", { className }, children);
  return React.createElement(
    motion.div,
    {
      className,
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.5, delay, ease: "easeOut" },
    },
    children,
  );
}
