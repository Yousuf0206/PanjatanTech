/** Illustrative architecture diagram; brand colors via CSS variables. Not a statement of real topology. */
export function ArchitectureDiagram({ name }: { name: string }) {
  const boxes = [
    { x: 10, label: "Your app" },
    { x: 170, label: "API gateway" },
    { x: 330, label: name },
    { x: 490, label: "Storage" },
  ];
  return (
    <figure>
      <svg
        viewBox="0 0 620 120"
        role="img"
        aria-labelledby="arch-title arch-desc"
        className="h-auto w-full"
      >
        <title id="arch-title">{`${name} architecture overview`}</title>
        <desc id="arch-desc">
          {`Illustrative flow: your application calls an API gateway, which routes requests to ${name}, which reads and writes storage.`}
        </desc>
        {boxes.map((b, i) => (
          <g key={b.label}>
            <rect
              x={b.x}
              y={30}
              width={120}
              height={60}
              rx={8}
              fill="var(--color-navy-700)"
              stroke={i === 2 ? "var(--color-cyan)" : "var(--color-navy-600)"}
              strokeWidth={2}
            />
            <text
              x={b.x + 60}
              y={65}
              textAnchor="middle"
              fontSize={13}
              fill="var(--color-white)"
              fontFamily="sans-serif"
            >
              {b.label}
            </text>
            {i < boxes.length - 1 && (
              <path
                d={`M${b.x + 122} 60 H${b.x + 158}`}
                stroke="var(--color-purple)"
                strokeWidth={2}
                markerEnd="url(#arch-arrow)"
              />
            )}
          </g>
        ))}
        <defs>
          <marker id="arch-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="var(--color-purple)" />
          </marker>
        </defs>
      </svg>
      <figcaption className="mt-2 text-xs text-fg-subtle">
        Illustrative diagram, not final architecture.
      </figcaption>
    </figure>
  );
}
