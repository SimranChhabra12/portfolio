import Link from "next/link";

// Not sticky (DESIGN_DOC §6). A fixed bar over a page whose whole point is generous
// whitespace eats a strip of every viewport and forces every page to carry top padding
// that compensates for it.
export default function Nav({ dark = false }: { dark?: boolean }) {
  return (
    <nav
      className={`relative z-50 flex items-center justify-between gap-6 px-[var(--page-gutter,32px)] py-5 ${
        dark ? "bg-dark-bg" : "bg-cream"
      }`}
    >
      <Link
        href="/"
        className={`font-serif text-[20px] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
          dark
            ? "text-surface [@media(hover:hover)]:hover:text-mauve focus-visible:outline-mauve"
            : "text-ink [@media(hover:hover)]:hover:text-accent focus-visible:outline-accent"
        }`}
      >
        Simran Chhabra
      </Link>
      <div className="flex items-center gap-6 sm:gap-8">
        {[
          { href: "/#work", label: "Work" },
          { href: "/#play", label: "Play" },
          { href: "/#about", label: "About" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`t-caption uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
              dark
                ? "text-mauve [@media(hover:hover)]:hover:text-surface focus-visible:outline-mauve"
                : "text-mauve [@media(hover:hover)]:hover:text-accent focus-visible:outline-accent"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
