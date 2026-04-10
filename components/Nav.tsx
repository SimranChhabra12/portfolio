import Link from "next/link";

export default function Nav({ dark = false }: { dark?: boolean }) {
  const textClass = dark
    ? "text-dark-text hover:text-white"
    : "text-ink hover:text-ink-muted";
  const borderClass = dark ? "border-white/10" : "border-ink/10";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b ${borderClass} backdrop-blur-sm ${dark ? "bg-dark-bg/80" : "bg-cream/80"}`}
    >
      <Link
        href="/"
        className={`font-serif text-lg font-bold tracking-tight transition-colors ${textClass}`}
      >
        SC
      </Link>
      <div className="flex items-center gap-8 text-sm tracking-wide">
        <Link
          href="/work"
          className={`transition-colors uppercase tracking-widest text-xs font-medium ${textClass}`}
        >
          Work
        </Link>
        <Link
          href="/about"
          className={`transition-colors uppercase tracking-widest text-xs font-medium ${textClass}`}
        >
          About
        </Link>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-colors uppercase tracking-widest text-xs font-medium ${textClass}`}
        >
          Résumé
        </a>
      </div>
    </nav>
  );
}
