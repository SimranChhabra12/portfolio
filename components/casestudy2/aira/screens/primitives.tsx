import { K } from "./kit";

const FONT = "var(--font-body), system-ui, -apple-system, sans-serif";

/** iOS status bar. Drawn, not screenshotted, so it matches the ground exactly. */
export function StatusBar() {
  return (
    <div
      style={{
        height: 54,
        paddingLeft: K.pagePad,
        paddingRight: K.pagePad,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingBottom: 6,
        fontFamily: FONT,
        color: K.text,
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      <span>9:41</span>
      <span aria-hidden style={{ display: "flex", gap: 5, alignItems: "flex-end", opacity: 0.9 }}>
        {[4, 6, 8, 10].map((h) => (
          <i key={h} style={{ width: 3, height: h, background: K.text, borderRadius: 1, display: "block" }} />
        ))}
        <i style={{ width: 15, height: 8, border: `1.5px solid ${K.text}`, borderRadius: 2, display: "block", marginLeft: 3 }} />
      </span>
    </div>
  );
}

/** Section label. Uppercase, tracked, muted — the only element at this size. */
export function Label({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p
      style={{
        fontFamily: FONT,
        fontSize: K.type.label.size,
        fontWeight: K.type.label.weight,
        letterSpacing: K.type.label.tracking,
        textTransform: "uppercase",
        color: K.faint,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function Body({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p
      style={{
        fontFamily: FONT,
        fontSize: K.type.body.size,
        lineHeight: 1.5,
        color: K.muted,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/**
 * One card shape for every card and every tappable row — same padding, same
 * radius, same title/body rhythm. The optional `chip` always lands in the same
 * slot, so a card with one and a card without still line up.
 */
export function Card({
  title,
  body,
  chip,
  chevron = false,
}: {
  title: string;
  body?: string;
  chip?: string;
  chevron?: boolean;
}) {
  return (
    <div
      style={{
        background: K.surface,
        borderRadius: K.radius.card,
        padding: K.space.lg,
        display: "flex",
        alignItems: body ? "flex-start" : "center",
        gap: K.space.md,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: K.type.cardTitle.size,
            fontWeight: K.type.cardTitle.weight,
            color: K.text,
            margin: 0,
            marginBottom: body ? K.space.xs : 0,
          }}
        >
          {title}
        </p>
        {body && <Body>{body}</Body>}
      </div>
      {chip && <Chip>{chip}</Chip>}
      {chevron && <Chevron />}
    </div>
  );
}

/** Coral-washed, never solid — a value marker, not a button. */
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: FONT,
        fontSize: K.type.caption.size,
        fontWeight: 600,
        color: K.coral,
        background: K.coralWash,
        borderRadius: K.radius.pill,
        padding: "4px 10px",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}

/** One chevron at one weight, used everywhere a row is tappable. */
export function Chevron({ dir = "right", color = K.faint }: { dir?: "left" | "right"; color?: string }) {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path
        d={dir === "right" ? "M1 1L7 7L1 13" : "M7 1L1 7L7 13"}
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Replaces the orphaned floating toggle with a real, labelled control. */
export function Segmented({ options, active }: { options: string[]; active: number }) {
  return (
    <div
      style={{
        display: "flex",
        background: K.surface,
        borderRadius: K.radius.pill,
        padding: 3,
        gap: 3,
      }}
    >
      {options.map((o, i) => (
        <span
          key={o}
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: K.type.caption.size,
            fontWeight: 600,
            padding: "7px 0",
            borderRadius: K.radius.pill,
            color: i === active ? K.ground : K.muted,
            background: i === active ? K.coral : "transparent",
          }}
        >
          {o}
        </span>
      ))}
    </div>
  );
}

export function TabBar({ active }: { active: "Home" | "Track" | "Learn" }) {
  const tabs = ["Home", "Track", "Learn"] as const;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 72,
        paddingTop: K.space.md,
        display: "flex",
        background: K.ground,
        borderTop: `1px solid ${K.hairline}`,
      }}
    >
      {tabs.map((t) => (
        <div key={t} style={{ flex: 1, textAlign: "center" }}>
          <div
            aria-hidden
            style={{
              width: 18,
              height: 18,
              margin: "0 auto 5px",
              borderRadius: t === "Home" ? 999 : 4,
              border: `1.75px solid ${t === active ? K.coral : K.faint}`,
            }}
          />
          <span
            style={{
              fontFamily: FONT,
              fontSize: 10,
              fontWeight: 600,
              color: t === active ? K.coral : K.faint,
            }}
          >
            {t}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Header row: back / title / forward at one shared chevron weight. */
export function ScreenHeader({ title, nav = false }: { title: string; nav?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: K.pagePad,
        paddingRight: K.pagePad,
        height: 44,
      }}
    >
      <span style={{ width: 12 }}>{nav && <Chevron dir="left" color={K.muted} />}</span>
      {/* Deliberately a <p>, not a heading: these screens are a picture of an
          interface, and real headings here hijack the page's document outline —
          the case study's own h1 stopped being the page's first h1. */}
      <p
        style={{
          fontFamily: FONT,
          fontSize: K.type.screenTitle.size,
          fontWeight: K.type.screenTitle.weight,
          color: K.text,
          margin: 0,
        }}
      >
        {title}
      </p>
      <span style={{ width: 12, display: "flex", justifyContent: "flex-end" }}>
        {nav && <Chevron color={K.muted} />}
      </span>
    </div>
  );
}

export { FONT };
