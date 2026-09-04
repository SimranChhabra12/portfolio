import { T } from "./tokens";

// Placeholder for a [visual: ...] marker in Notion that has no matching
// file yet. Flagged deliberately rather than guessed — see build report.
export default function AssetFlag({ label }: { label: string }) {
  return (
    <div
      className="px-6 py-8 lg:px-8"
      style={{
        border: `1px dashed ${T.inkFaint}`,
        borderRadius: T.radius.darkBlock,
        backgroundColor: T.inkFainter,
      }}
    >
      <p
        style={{
          fontSize: T.type.caption,
          color: T.inkMuted,
          fontFamily: "var(--font-body)",
          lineHeight: 1.6,
        }}
      >
        Needs asset — {label}
      </p>
    </div>
  );
}
