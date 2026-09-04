import { T } from "./tokens";

export default function Section({
  id,
  number,
  heading,
  children,
  first = false,
}: {
  id: string;
  number: string;
  heading: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-32"
      style={{
        paddingTop: first ? 0 : T.space.section,
        paddingBottom: T.space.section,
        borderBottom: `1px solid ${T.inkFaint}`,
      }}
    >
      <div className="flex items-baseline gap-4 mb-8">
        <span
          style={{
            fontSize: T.type.caption,
            color: T.inkMuted,
            fontFamily: "var(--font-body)",
          }}
        >
          {number}
        </span>
        <p
          style={{
            fontSize: T.type.caption,
            color: T.inkMuted,
            fontFamily: "var(--font-body)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {heading}
        </p>
      </div>
      <div className="flex flex-col gap-8 items-start text-left min-w-0 w-full">{children}</div>
    </section>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: T.type.section,
        lineHeight: 1.2,
        color: T.ink,
        maxWidth: "20ch",
      }}
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: T.type.sub,
        lineHeight: 1.3,
        color: T.ink,
        maxWidth: "26ch",
      }}
    >
      {children}
    </h3>
  );
}

export function P({
  children,
  large = false,
}: {
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <p
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 400,
        fontSize: large ? T.type.bodyLarge : T.type.body,
        lineHeight: 1.65,
        color: T.ink,
        maxWidth: T.measure,
      }}
    >
      {children}
    </p>
  );
}

export function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-body)",
        fontSize: T.type.caption,
        lineHeight: 1.5,
        color: T.inkMuted,
        maxWidth: T.measure,
      }}
    >
      {children}
    </p>
  );
}

export function List({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4 items-start">
          <span
            className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0"
            style={{ backgroundColor: accent }}
          />
          <P>{item}</P>
        </li>
      ))}
    </ul>
  );
}

export function DecisionBlock({
  index,
  title,
  body,
  accent,
}: {
  index: number;
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p
        style={{
          fontSize: T.type.caption,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: accent,
          fontFamily: "var(--font-body)",
        }}
      >
        Decision {index}
      </p>
      <H3>{title}</H3>
      <P>{body}</P>
    </div>
  );
}
