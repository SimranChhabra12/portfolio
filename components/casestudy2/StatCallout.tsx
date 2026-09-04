import { T } from "./tokens";

export function StatRow({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div
      className="grid gap-px overflow-hidden"
      style={{
        gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, minmax(0, 1fr))`,
        backgroundColor: T.inkFaint,
        borderRadius: T.radius.darkBlock,
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex flex-col gap-2"
          style={{
            backgroundColor: T.cream,
            padding: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: T.type.section,
              color: T.ink,
              lineHeight: 1.15,
            }}
          >
            {s.value}
          </span>
          <span
            style={{
              fontSize: T.type.caption,
              color: T.inkMuted,
              fontFamily: "var(--font-body)",
              lineHeight: 1.5,
            }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
