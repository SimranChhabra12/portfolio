import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import CaseStudySectionNav from "@/components/CaseStudySectionNav";
import CaseStudyBlocks from "@/components/CaseStudyBlocks";
import caseStudies, { getCaseStudy, getNextCaseStudy } from "@/data/caseStudies";

export async function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Simran Chhabra`,
    description: project.subtitle,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();

  const nextProject = getNextCaseStudy(project.slug);
  const navItems = project.sections.map((s) => ({ id: s.id, label: s.heading }));

  return (
    <main className="min-h-screen bg-cream">
      <Nav />

      {/* Hero */}
      <section
        className="min-h-[60vh] flex flex-col justify-end px-8 lg:px-16 pb-16 pt-40 relative overflow-hidden"
        style={{ backgroundColor: project.color }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <p className="label text-white/60 mb-4">
            {project.year} · {project.role}
            {project.status && <> · {project.status}</>}
          </p>
          <h1 className="font-serif text-[39px] lg:text-[56px] text-white leading-[1.2] tracking-[-0.02em] mb-6">
            {project.title}
          </h1>
          <p className="t-body text-white/80 mb-8 !max-w-xl">{project.subtitle}</p>
          {project.prototypeUrl && (
            <a
              href={project.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 label text-white border border-white/40 rounded-full px-6 py-3 hover:bg-white hover:text-ink transition-colors"
            >
              View Live Prototype
              <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </section>

      {/* Meta strip */}
      <section className="px-8 lg:px-16 py-16 border-b border-ink/10 bg-surface/40">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          <div>
            <p className="label text-mauve mb-2">Role</p>
            <p className="t-body text-ink !max-w-none">{project.role}</p>
          </div>
          <div>
            <p className="label text-mauve mb-2">Team</p>
            <p className="t-body text-ink !max-w-none">{project.meta.team}</p>
          </div>
          <div>
            <p className="label text-mauve mb-2">Research Methods</p>
            <p className="t-body text-ink !max-w-none">
              {project.meta.researchMethods.join(", ")}
            </p>
          </div>
          <div>
            <p className="label text-mauve mb-2">Platform</p>
            <p className="t-body text-ink !max-w-none">{project.meta.platform}</p>
          </div>
          <div>
            <p className="label text-mauve mb-2">Duration</p>
            <p className="t-body text-ink !max-w-none">{project.meta.duration}</p>
          </div>
        </div>
      </section>

      {/* Sections */}
      <div className="px-8 lg:px-16 py-16">
        <div className="max-w-5xl mx-auto flex gap-16">
          <CaseStudySectionNav items={navItems} color={project.color} />

          <div className="flex-1 min-w-0 max-w-[56rem] flex flex-col">
            {project.sections.map((section, i) => (
              <Reveal key={section.id}>
                <section
                  id={section.id}
                  className={`py-16 ${
                    i < project.sections.length - 1 ? "border-b border-ink/10" : ""
                  } scroll-mt-32`}
                >
                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="t-caption text-mauve font-mono">{section.number}</span>
                    <p className="label text-mauve">{section.heading}</p>
                  </div>

                  {section.empty ? (
                    <div className="rounded-2xl border border-dashed border-ink/20 px-8 py-12 max-w-xl">
                      <p className="t-body text-mauve !max-w-none">
                        Coming soon — this section hasn&apos;t been written yet.
                      </p>
                    </div>
                  ) : (
                    <CaseStudyBlocks blocks={section.blocks ?? []} color={project.color} />
                  )}
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Next Project */}
      {nextProject && (
        <section className="bg-dark-bg py-24 px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <p className="label text-mauve mb-8">Next Project</p>
            <Link
              href={`/work/${nextProject.slug}`}
              className="group flex flex-col sm:flex-row sm:items-end justify-between gap-6"
            >
              <div>
                <h2 className="font-serif text-[31px] lg:text-[39px] text-surface leading-[1.2] group-hover:text-white transition-colors">
                  {nextProject.title}
                </h2>
                <p className="t-body text-mauve mt-4 !max-w-none">{nextProject.subtitle}</p>
              </div>
              <span className="label text-mauve group-hover:text-surface transition-colors shrink-0">
                View case study →
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-dark-bg border-t border-white/5 py-8 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link href="/work" className="label text-mauve hover:text-surface transition-colors">
            ← All Work
          </Link>
          <span className="font-serif text-[16px] text-mauve">Simran Chhabra</span>
        </div>
      </footer>
    </main>
  );
}
