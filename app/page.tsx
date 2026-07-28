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
        <div className="flex-1 flex flex-col justify-end pb-16 px-8 lg:px-16 pt-32 lg:pt-0">
          <div className="max-w-lg">
            <p className="label text-mauve mb-6">Product Designer</p>
            <h1 className="t-display font-bold text-ink mb-8 !text-[39px] lg:!text-[56px]">
              Simran
              <br />
              Chhabra
            </h1>
            <p className="t-body text-mauve mb-12 max-w-[65ch]">
              I design products rooted in research — turning complex human
              problems into clear, considered experiences.
            </p>
            <Link
              href="/work"
              className="inline-flex items-center gap-3 label text-ink border-b border-ink pb-1 hover:text-accent hover:border-accent transition-colors"
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

      {/* Selected Work */}
      <section className="bg-dark-bg py-24 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <p className="label text-mauve mb-16">Selected Work</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group relative bg-dark-bg p-8 lg:p-12 hover:bg-dark-surface transition-colors duration-300"
              >
                <div
                  className="w-2 h-2 rounded-full mb-8"
                  style={{ backgroundColor: project.color }}
                />
                <p className="label text-mauve mb-3">
                  {project.year} · {project.disciplines[0]}
                </p>
                <h2 className="font-serif text-[25px] lg:text-[31px] font-bold text-surface leading-[1.2] mb-4 group-hover:text-white transition-colors">
                  {project.title}
                </h2>
                <p className="t-body text-mauve mb-8 !max-w-none">{project.tagline}</p>
                <span className="label text-mauve group-hover:text-surface transition-colors">
                  View case study →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-bg border-t border-white/5 py-8 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="font-serif text-[16px] text-mauve">Simran Chhabra</span>
          <div className="flex gap-6">
            <a href="mailto:skc9841@nyu.edu" className="label text-mauve hover:text-surface transition-colors">
              Email
            </a>
            <a
              href="https://linkedin.com/in/simranchhabra"
              target="_blank"
              rel="noopener noreferrer"
              className="label text-mauve hover:text-surface transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="label text-mauve hover:text-surface transition-colors"
            >
              Résumé
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
