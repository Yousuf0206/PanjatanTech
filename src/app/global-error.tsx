"use client";

import { useEffect } from "react";

/** Replaces the root layout on fatal errors, so it renders its own html/body with inline styles. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "1rem",
          background: "#0b1020",
          color: "#f1f5f9",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <main style={{ maxWidth: "32rem" }}>
          <h1>Something went wrong</h1>
          <p role="alert">A critical error occurred. Please try again.</p>
          <button
            type="button"
            onClick={reset}
            style={{
              minHeight: 44,
              padding: "0 1.25rem",
              borderRadius: 6,
              border: 0,
              background: "#22d3ee",
              color: "#0b1020",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
