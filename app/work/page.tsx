import Link from "next/link";
import Nav from "@/components/ui/Nav";
import caseStudies from "@/data/caseStudies";
import { CaseStudyShell, Prose, SECTION_GAP } from "./_components/columns";

export const metadata = {
  title: "Work — Simran Chhabra",
};

const HALF_GAP = `calc(${SECTION_GAP} / 2)`;

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />

      <CaseStudyShell className="pt-40">
        <p className="label text-mauve mb-6">Selected Work</p>
        <h1 className="t-display text-ink">Case Studies</h1>
      </CaseStudyShell>

      <CaseStudyShell>
        <div
          className="divide-y divide-ink/10 border-t border-ink/10"
          style={{ marginTop: HALF_GAP, marginBottom: SECTION_GAP }}
        >
          {caseStudies.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group flex flex-col lg:flex-row lg:items-start justify-between gap-8"
              style={{ paddingTop: HALF_GAP, paddingBottom: HALF_GAP }}
            >
              <div className="flex items-start gap-8 lg:gap-12 flex-1 min-w-0">
                <span className="t-caption text-mauve mt-2 min-w-[1.5rem]">
                  0{i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      aria-hidden
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: project.color }}
                    />
                    <p className="label text-mauve">
                      {project.year}
                      {project.status && ` · ${project.status}`}
                    </p>
                  </div>
                  <h2 className="t-section text-ink transition-colors group-hover:text-accent mb-3">
                    {project.title}
                  </h2>
                  <Prose>
                    <p className="t-body text-ink !max-w-none">{project.subtitle}</p>
                  </Prose>
                </div>
              </div>
              <div className="lg:ml-12 flex flex-wrap gap-2 shrink-0">
                {project.disciplines.map((d) => (
                  <span
                    key={d}
                    className="t-caption text-mauve border border-mauve/40 rounded-full px-4 py-2"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </CaseStudyShell>

      <footer className="bg-dark-bg py-8 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-serif text-[16px] text-surface/70">Simran Chhabra</span>
          <div className="flex gap-6">
            <a
              href="mailto:skc9841@nyu.edu"
              className="label text-surface/70 hover:text-surface transition-colors"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/simranchhabra"
              target="_blank"
              rel="noopener noreferrer"
              className="label text-surface/70 hover:text-surface transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
