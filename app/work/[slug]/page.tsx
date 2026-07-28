import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import projects, { getProject } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
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
  const project = getProject(slug);
  if (!project) notFound();

  const nextProject = getProject(project.next);

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
          </p>
          <h1 className="font-serif text-[39px] lg:text-[56px] font-bold text-white leading-[1.2] tracking-[-0.02em] mb-6">
            {project.title}
          </h1>
          <p className="t-body text-white/80 mb-8 !max-w-xl">
            {project.subtitle}
          </p>
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

      {/* Overview */}
      <section className="px-8 lg:px-16 py-16 border-b border-ink/10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="label text-mauve mb-4">Overview</p>
            <p className="t-body text-ink">{project.overview.problem}</p>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <p className="label text-mauve mb-2">My Role</p>
              <p className="t-body text-ink !max-w-none">{project.overview.role}</p>
            </div>
            <div>
              <p className="label text-mauve mb-3">Tools & Methods</p>
              <ul className="flex flex-col gap-2">
                {project.overview.tools.map((t) => (
                  <li key={t} className="t-caption text-mauve">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      {project.objectives.length > 0 && (
        <section className="px-8 lg:px-16 py-16 border-b border-ink/10 bg-surface/40">
          <div className="max-w-5xl mx-auto">
            <p className="label text-mauve mb-8">Objectives</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {project.objectives.map((o, i) => (
                <div key={i}>
                  <h3 className="font-serif text-[20px] font-bold text-ink leading-[1.5] mb-3">
                    {o.title}
                  </h3>
                  <p className="t-body text-mauve !max-w-none">{o.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Live prototype embed */}
      {project.prototypeUrl && (
        <section className="px-8 lg:px-16 py-16 border-b border-ink/10">
          <div className="max-w-5xl mx-auto">
            <p className="label text-mauve mb-6">Live Prototype</p>
            <div className="rounded-2xl overflow-hidden border border-ink/10 shadow-sm">
              <iframe
                src={project.prototypeUrl}
                title={`${project.title} live prototype`}
                className="w-full"
                style={{ height: "70vh", border: "none" }}
                loading="lazy"
              />
            </div>
            <a
              href={project.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 label text-mauve hover:text-accent transition-colors mt-4"
            >
              Open full prototype ↗
            </a>
          </div>
        </section>
      )}

      {/* Flowing sections */}
      <div className="max-w-[56rem] mx-auto px-8">
        {project.sections.map((section, i) => {
          if (section.type === "text") {
            return (
              <section key={i} className="py-16 border-b border-ink/10">
                <p className="label text-mauve mb-6">{section.heading}</p>
                <p className="t-body text-ink">{section.body}</p>
              </section>
            );
          }

          if (section.type === "highlight") {
            return (
              <section key={i} className="py-16 border-b border-ink/10">
                <div className="bg-ink rounded-2xl p-8 lg:p-12">
                  <p className="label text-white/40 mb-6">{section.heading}</p>
                  <p className="font-serif text-[20px] lg:text-[25px] leading-[1.5] text-surface italic">
                    &ldquo;{section.body}&rdquo;
                  </p>
                </div>
              </section>
            );
          }

          if (section.type === "findings") {
            return (
              <section key={i} className="py-16 border-b border-ink/10">
                <p className="label text-mauve mb-8">{section.heading}</p>
                <ul className="flex flex-col gap-6">
                  {section.items?.map((item, j) => (
                    <li key={j} className="flex gap-6 items-start">
                      <span
                        className="w-2 h-2 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: project.color }}
                      />
                      <p className="t-body text-ink !max-w-none">{item}</p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          }

          if (section.type === "metrics") {
            return (
              <section key={i} className="py-16 border-b border-ink/10">
                <p className="label text-mauve mb-8">{section.heading}</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
                  {section.metrics?.map((m, j) => (
                    <div key={j} className="bg-cream p-8 flex flex-col gap-2">
                      <span className="font-serif text-[39px] font-bold text-ink leading-[1.2]">
                        {m.value}
                      </span>
                      <span className="label text-mauve">{m.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>

      {/* Design Solutions — Insight / Recommendation pairs */}
      {project.insights.length > 0 && (
        <section className="bg-surface/40 py-24 px-8 lg:px-16 border-b border-ink/10">
          <div className="max-w-4xl mx-auto">
            <p className="label text-mauve mb-16">Design Solutions</p>
            <div className="flex flex-col gap-16">
              {project.insights.map((ins, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-8 lg:gap-12"
                >
                  <div>
                    <p
                      className="label mb-3"
                      style={{ color: project.color }}
                    >
                      Insight {i + 1}
                    </p>
                    <p className="t-body text-mauve !max-w-none">{ins.insight}</p>
                  </div>
                  <div
                    className="hidden lg:block w-px"
                    style={{ backgroundColor: `${project.color}30` }}
                  />
                  <div>
                    <p className="label text-mauve mb-3">
                      Recommendation {i + 1}
                    </p>
                    <p className="t-body text-ink font-medium !max-w-none">
                      {ins.recommendation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Outcomes */}
      {(project.outcomePositive.length > 0 || project.outcomeGrowth.length > 0) && (
        <section className="px-8 lg:px-16 py-24 border-b border-ink/10">
          <div className="max-w-4xl mx-auto">
            <p className="label text-mauve mb-16">Outcomes</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <h3 className="font-serif text-[20px] font-bold text-ink leading-[1.5] mb-6">
                  What Worked
                </h3>
                <ul className="flex flex-col gap-4">
                  {project.outcomePositive.map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: project.color }}
                      />
                      <p className="t-body text-mauve !max-w-none">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-[20px] font-bold text-ink leading-[1.5] mb-6">
                  Areas for Growth
                </h3>
                <ul className="flex flex-col gap-4">
                  {project.outcomeGrowth.map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-mauve" />
                      <p className="t-body text-mauve !max-w-none">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Learnings */}
      {project.learnings.length > 0 && (
        <section className="px-8 lg:px-16 py-24 border-b border-ink/10 bg-surface/40">
          <div className="max-w-4xl mx-auto">
            <p className="label text-mauve mb-8">Learnings</p>
            <div className="flex flex-col gap-8">
              {project.learnings.map((l, i) => (
                <div key={i}>
                  <h3 className="font-serif text-[25px] font-bold text-ink leading-[1.2] mb-3">
                    {l.title}
                  </h3>
                  <p className="t-body text-mauve">{l.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Project */}
      {nextProject && (
        <section className="bg-dark-bg py-24 px-8 lg:px-16 mt-0">
          <div className="max-w-4xl mx-auto">
            <p className="label text-mauve mb-8">Next Project</p>
            <Link
              href={`/work/${nextProject.slug}`}
              className="group flex flex-col sm:flex-row sm:items-end justify-between gap-6"
            >
              <div>
                <h2 className="font-serif text-[31px] lg:text-[39px] font-bold text-surface leading-[1.2] group-hover:text-white transition-colors">
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
          <Link
            href="/work"
            className="label text-mauve hover:text-surface transition-colors"
          >
            ← All Work
          </Link>
          <span className="font-serif text-[16px] text-mauve">Simran Chhabra</span>
        </div>
      </footer>
    </main>
  );
}
