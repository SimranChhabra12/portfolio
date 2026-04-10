import Link from "next/link";
import Nav from "@/components/Nav";
import projects from "@/data/projects";

export const metadata = {
  title: "Work — Simran Chhabra",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-dark-bg">
      <Nav dark />

      <section className="pt-40 pb-16 px-8 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-ink-subtle text-xs uppercase tracking-widest mb-6">
            Selected Work
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-dark-text leading-none tracking-tight">
            Case Studies
          </h1>
        </div>
      </section>

      <section className="px-8 lg:px-20 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="divide-y divide-white/5">
            {projects.map((project, i) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group flex flex-col lg:flex-row lg:items-center justify-between py-12 lg:py-16 hover:bg-dark-surface -mx-8 lg:-mx-20 px-8 lg:px-20 transition-colors duration-200"
              >
                <div className="flex items-start gap-8 lg:gap-12 flex-1">
                  <span className="text-ink-subtle text-sm font-mono mt-1 min-w-[1.5rem]">
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      <p className="text-ink-subtle text-xs uppercase tracking-widest">
                        {project.year}
                      </p>
                    </div>
                    <h2 className="font-serif text-3xl lg:text-5xl font-bold text-dark-text group-hover:text-white transition-colors mb-3">
                      {project.title}
                    </h2>
                    <p className="text-ink-muted text-sm lg:text-base">
                      {project.subtitle}
                    </p>
                  </div>
                </div>
                <div className="mt-6 lg:mt-0 lg:ml-12 flex flex-wrap gap-2">
                  {project.disciplines.map((d) => (
                    <span
                      key={d}
                      className="text-xs text-ink-subtle border border-white/10 rounded-full px-3 py-1"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 px-8 lg:px-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
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
          </div>
        </div>
      </footer>
    </main>
  );
}
