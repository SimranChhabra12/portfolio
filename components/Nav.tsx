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
        className={`font-serif text-[20px] font-bold tracking-tight transition-colors ${
          dark ? "text-surface hover:text-white" : "text-ink hover:text-accent"
        }`}
      >
        SC
      </Link>
      <div className="flex items-center gap-8">
        {[
          { href: "/work", label: "Work" },
          { href: "/about", label: "About" },
          { href: "/resume.pdf", label: "Résumé", external: true },
        ].map(({ href, label, external }) => (
          <Link
            key={href}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
