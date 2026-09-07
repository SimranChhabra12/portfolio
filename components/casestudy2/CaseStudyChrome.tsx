import Link from "next/link";
import Wordmark, { WORDMARK_ROMAN } from "@/components/ui/Wordmark";
import { T } from "./tokens";

// The same three items the sitewide Nav carries. The header itself is now that shared
// Nav on every page; this list is what the case-study footer repeats at the end of a long
// read. A case study is reached from /work, so Work is always the active one here.
export const CHROME_LINKS = [
  { href: "/work", label: "Work", active: true },
  { href: "/playground", label: "Play", active: false },
  { href: "/about", label: "About", active: false },
] as const;

export function CaseStudyFooter() {
  return (
    <footer
      className="px-8 lg:px-16 py-10"
      style={{ borderTop: `1px solid ${T.inkFaint}` }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* The footer repeats the nav rather than offering a lone "← All Work": at the end
            of a long case study the three destinations are more use than one back link. */}
        <div className="flex items-center gap-6 sm:gap-8">
          {CHROME_LINKS.map(({ href, label, active }) => (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`underline-offset-[6px] decoration-1 ${active ? "underline" : "no-underline"}`}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: T.type.caption,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: active ? T.ink : T.inkMuted,
              }}
            >
              {label}
            </Link>
          ))}
        </div>
        <Wordmark size="1rem" style={{ fontWeight: 500, color: T.inkMuted }} />
      </div>
    </footer>
  );
}
