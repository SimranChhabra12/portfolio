import Link from "next/link";

export default function Nav({ dark = false }: { dark?: boolean }) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b backdrop-blur-sm ${
        dark
          ? "border-white/10 bg-dark-bg/80"
          : "border-ink/10 bg-cream/80"
      }`}
    >
      <Link
        href="/"
        className={`font-serif text-[20px] tracking-tight transition-colors ${
          dark ? "text-surface hover:text-mauve" : "text-ink hover:text-accent"
        }`}
      >
        Simran Chhabra
      </Link>
      <div className="flex items-center gap-8">
        {[
          { href: "/#work", label: "Work" },
          { href: "/#play", label: "Play" },
          { href: "/#about", label: "About" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`label transition-colors ${
              dark
                ? "text-mauve hover:text-surface"
                : "text-mauve hover:text-accent"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
