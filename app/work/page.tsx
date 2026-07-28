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

      <section className="pt-40 pb-16 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <p className="label text-mauve mb-6">Selected Work</p>
          <h1 className="t-display font-bold text-surface leading-[1.2] !text-[39px] lg:!text-[56px]">
            Case Studies
          </h1>
        </div>
      </section>

      <section className="px-8 lg:px-16 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="divide-y divide-white/5">
            {projects.map((project, i) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group flex flex-col lg:flex-row lg:items-center justify-between py-12 hover:bg-dark-surface -mx-8 lg:-mx-16 px-8 lg:px-16 transition-colors duration-200"
              >
                <div className="flex items-start gap-8 lg:gap-12 flex-1">
                  <span className="t-caption text-mauve mt-1 min-w-[1.5rem] font-mono">
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: project.color }}
                      />
                      <p className="label text-mauve">{project.year}</p>
                    </div>
                    <h2 className="font-serif text-[31px] font-bold text-surface leading-[1.2] group-hover:text-white transition-colors mb-3">
                      {project.title}
                    </h2>
                    <p className="t-body text-mauve !max-w-none">{project.subtitle}</p>
                  </div>
                </div>
                <div className="mt-6 lg:mt-0 lg:ml-12 flex flex-wrap gap-2">
                  {project.disciplines.map((d) => (
                    <span
                      key={d}
                      className="t-caption text-mauve border border-white/10 rounded-full px-4 py-2"
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

      <footer className="border-t border-white/5 py-8 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
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
          </div>
        </div>
      </footer>
    </main>
  );
}
