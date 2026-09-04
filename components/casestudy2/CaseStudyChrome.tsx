import Link from "next/link";
import { T } from "./tokens";

export function CaseStudyNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5 backdrop-blur-sm"
      style={{
        backgroundColor: "rgba(250, 248, 245, 0.85)",
        borderBottom: `1px solid ${T.inkFaint}`,
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "1.125rem",
          color: T.ink,
        }}
      >
        Simran Chhabra
      </Link>
      <Link
        href="/work"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: T.type.caption,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: T.ink,
        }}
      >
        ← All Work
      </Link>
    </nav>
  );
}

export function CaseStudyFooter() {
  return (
    <footer
      className="px-8 lg:px-16 py-10"
      style={{ borderTop: `1px solid ${T.inkFaint}` }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link
          href="/work"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: T.type.caption,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: T.inkMuted,
          }}
        >
          ← All Work
        </Link>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "1rem",
            color: T.inkMuted,
          }}
        >
          Simran Chhabra
        </span>
      </div>
    </footer>
  );
}
