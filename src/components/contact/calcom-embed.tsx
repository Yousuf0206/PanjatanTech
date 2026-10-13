/** Renders the Cal.com iframe only when NEXT_PUBLIC_CALCOM_URL is configured. */
export function CalcomEmbed() {
  const url = process.env.NEXT_PUBLIC_CALCOM_URL;
  if (!url) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-surface p-6 text-sm text-fg-muted">
        Scheduling is not configured yet. Submit the form and we will reach out to find a time.
      </div>
    );
  }
  return (
    <iframe
      src={url}
      title="Book a call"
      loading="lazy"
      className="h-[40rem] w-full rounded-lg border border-border bg-surface"
    />
  );
}
