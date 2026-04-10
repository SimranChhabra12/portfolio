import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import projects from "@/data/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />

      {/* Hero */}
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Left — text */}
        <div className="flex-1 flex flex-col justify-end pb-16 px-8 lg:px-20 pt-32 lg:pt-0">
          <div className="max-w-lg">
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-6 font-medium">
              Product Designer
            </p>
            <h1 className="font-serif text-6xl lg:text-8xl font-bold leading-none tracking-tight text-ink mb-8">
              Simran
              <br />
              Chhabra
            </h1>
            <p className="text-ink-muted text-lg leading-relaxed mb-12 max-w-sm">
              I design products rooted in research — turning complex human
              problems into clear, considered experiences.
            </p>
            <Link
              href="/work"
              className="inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium text-ink border-b border-ink pb-1 hover:text-ink-muted hover:border-ink-muted transition-colors"
            >
              View work
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Right — hero photo */}
        <div className="w-full lg:w-[45%] min-h-[50vh] lg:min-h-screen relative overflow-hidden">
          <Image
            src="/hero.png"
            alt="Simran Chhabra"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </section>

      {/* Selected Work preview */}
      <section className="bg-dark-bg py-24 px-8 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-ink-subtle text-xs uppercase tracking-widest mb-16">
            Selected Work
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group relative bg-dark-bg p-10 lg:p-14 hover:bg-dark-surface transition-colors duration-300"
              >
                <div
                  className="w-2 h-2 rounded-full mb-8"
                  style={{ backgroundColor: project.color }}
                />
                <p className="text-ink-subtle text-xs uppercase tracking-widest mb-3">
                  {project.year} · {project.disciplines[0]}
                </p>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-dark-text mb-4 group-hover:text-white transition-colors">
                  {project.title}
                </h2>
                <p className="text-ink-subtle leading-relaxed text-sm mb-8">
                  {project.tagline}
                </p>
                <span className="text-xs uppercase tracking-widest text-ink-subtle group-hover:text-dark-text transition-colors">
                  View case study →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-bg border-t border-white/5 py-10 px-8 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="font-serif text-sm text-ink-subtle">
            Simran Chhabra
          </span>
          <div className="flex gap-6 text-xs uppercase tracking-widest text-ink-subtle">
            <a
              href="mailto:simranchhabra@example.com"
              className="hover:text-dark-text transition-colors"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/simranchhabra"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-dark-text transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-dark-text transition-colors"
            >
              Résumé
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
