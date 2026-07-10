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
        className="min-h-[60vh] flex flex-col justify-end px-8 lg:px-20 pb-16 pt-40 relative overflow-hidden"
        style={{ backgroundColor: project.color }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-4">
            {project.year} · {project.role}
          </p>
          <h1 className="font-serif text-5xl lg:text-8xl font-bold text-white leading-none tracking-tight mb-6">
            {project.title}
          </h1>
          <p className="text-white/80 text-lg lg:text-xl max-w-xl leading-relaxed mb-8">
            {project.subtitle}
          </p>
          {project.prototypeUrl && (
            <a
              href={project.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium text-white border border-white/40 rounded-full px-6 py-3 hover:bg-white hover:text-ink transition-colors"
            >
              View Live Prototype
              <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </section>

      {/* Meta strip — role, team, research methods, platform, duration */}
      <section className="px-8 lg:px-20 py-16 border-b border-ink/10 bg-ink/[0.02]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-2">Role</p>
            <p className="text-ink text-sm leading-relaxed">{project.role}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-2">Team</p>
            <p className="text-ink text-sm leading-relaxed">{project.meta.team}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-2">
              Research Methods
            </p>
            <p className="text-ink text-sm leading-relaxed">
              {project.meta.researchMethods.join(", ")}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-2">Platform</p>
            <p className="text-ink text-sm leading-relaxed">{project.meta.platform}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-2">Duration</p>
            <p className="text-ink text-sm leading-relaxed">{project.meta.duration}</p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-8 lg:px-20 py-20 border-b border-ink/10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-4">
              Overview
            </p>
            <p className="text-ink text-lg leading-relaxed">
              {project.overview.problem}
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-ink-muted mb-2">
                My Role
              </p>
              <p className="text-ink text-sm leading-relaxed">
                {project.overview.role}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-ink-muted mb-3">
                Tools & Methods
              </p>
              <ul className="flex flex-col gap-1">
                {project.overview.tools.map((t) => (
                  <li key={t} className="text-ink-muted text-sm">
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
        <section className="px-8 lg:px-20 py-20 border-b border-ink/10 bg-ink/[0.02]">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-10">
              Objectives
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {project.objectives.map((o, i) => (
                <div key={i}>
                  <h3 className="font-serif text-xl font-bold text-ink mb-3">
                    {o.title}
                  </h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{o.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Live prototype embed */}
      {project.prototypeUrl && (
        <section className="px-8 lg:px-20 py-20 border-b border-ink/10">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-6">
              Live Prototype
            </p>
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
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink-muted hover:text-ink transition-colors mt-4"
            >
              Open full prototype
              <span aria-hidden>↗</span>
            </a>
          </div>
        </section>
      )}

      {/* Flowing sections — research, stats, highlights, solution */}
      <div style={{ maxWidth: "56rem", padding: "0 2rem" }} className="mx-auto">
        {project.sections.map((section, i) => {
          if (section.type === "text") {
            return (
              <section key={i} className="py-16 border-b border-ink/10">
                <p className="text-xs uppercase tracking-widest text-ink-muted mb-6">
                  {section.heading}
                </p>
                <p className="text-ink text-lg leading-relaxed max-w-2xl">
                  {section.body}
                </p>
              </section>
            );
          }

          if (section.type === "highlight") {
            return (
              <section key={i} className="py-16 border-b border-ink/10">
                <div className="bg-ink text-cream rounded-2xl p-10 lg:p-14">
                  <p className="text-xs uppercase tracking-widest text-cream/50 mb-6">
                    {section.heading}
                  </p>
                  <p className="text-cream text-xl lg:text-2xl leading-relaxed font-serif italic">
                    &ldquo;{section.body}&rdquo;
                  </p>
                </div>
              </section>
            );
          }

          if (section.type === "findings") {
            return (
              <section key={i} className="py-16 border-b border-ink/10">
                <p className="text-xs uppercase tracking-widest text-ink-muted mb-8">
                  {section.heading}
                </p>
                <ul className="flex flex-col gap-6">
                  {section.items?.map((item, j) => (
                    <li key={j} className="flex gap-6 items-start">
                      <span
                        className="w-2 h-2 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: project.color }}
                      />
                      <p className="text-ink leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          }

          if (section.type === "metrics") {
            return (
              <section key={i} className="py-16 border-b border-ink/10">
                <p className="text-xs uppercase tracking-widest text-ink-muted mb-8">
                  {section.heading}
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
                  {section.metrics?.map((m, j) => (
                    <div key={j} className="bg-cream p-8 flex flex-col gap-2">
                      <span className="font-serif text-4xl lg:text-5xl font-bold text-ink">
                        {m.value}
                      </span>
                      <span className="text-ink-muted text-xs uppercase tracking-widest">
                        {m.label}
                      </span>
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
        <section className="bg-ink/[0.03] py-24 px-8 lg:px-20 border-b border-ink/10">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-16">
              Design Solutions
            </p>
            <div className="flex flex-col gap-16">
              {project.insights.map((ins, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 lg:grid-cols-[1fr_2px_1fr] gap-8 lg:gap-12"
                >
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest mb-3 font-medium"
                      style={{ color: project.color }}
                    >
                      Insight {i + 1}
                    </p>
                    <p className="text-ink-muted leading-relaxed">{ins.insight}</p>
                  </div>
                  <div
                    className="hidden lg:block w-px"
                    style={{ backgroundColor: `${project.color}30` }}
                  />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink-muted mb-3 font-medium">
                      Recommendation {i + 1}
                    </p>
                    <p className="text-ink leading-relaxed font-medium">
                      {ins.recommendation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Outcomes — positive + growth */}
      {(project.outcomePositive.length > 0 || project.outcomeGrowth.length > 0) && (
        <section className="px-8 lg:px-20 py-24 border-b border-ink/10">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-16">
              Outcomes
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <h3 className="font-serif text-xl font-bold text-ink mb-6">
                  What Worked
                </h3>
                <ul className="flex flex-col gap-4">
                  {project.outcomePositive.map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-ink" />
                      <p className="text-ink-muted text-sm leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-ink mb-6">
                  Areas for Growth
                </h3>
                <ul className="flex flex-col gap-4">
                  {project.outcomeGrowth.map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-ink/30" />
                      <p className="text-ink-muted text-sm leading-relaxed">{item}</p>
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
        <section className="px-8 lg:px-20 py-24 border-b border-ink/10 bg-ink/[0.02]">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-10">
              Learnings
            </p>
            <div className="flex flex-col gap-10">
              {project.learnings.map((l, i) => (
                <div key={i}>
                  <h3 className="font-serif text-2xl font-bold text-ink mb-3">
                    {l.title}
                  </h3>
                  <p className="text-ink-muted leading-relaxed max-w-2xl">{l.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Project */}
      {nextProject && (
        <section className="bg-dark-bg py-24 px-8 lg:px-20 mt-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-ink-subtle text-xs uppercase tracking-widest mb-8">
              Next Project
            </p>
            <Link
              href={`/work/${nextProject.slug}`}
              className="group flex flex-col sm:flex-row sm:items-end justify-between gap-6"
            >
              <div>
                <h2 className="font-serif text-4xl lg:text-6xl font-bold text-dark-text group-hover:text-white transition-colors leading-none">
                  {nextProject.title}
                </h2>
                <p className="text-ink-muted mt-4">{nextProject.subtitle}</p>
              </div>
              <span className="text-xs uppercase tracking-widest text-ink-subtle group-hover:text-dark-text transition-colors shrink-0">
                View case study →
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-dark-bg border-t border-white/5 py-10 px-8 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            href="/work"
            className="text-xs uppercase tracking-widest text-ink-subtle hover:text-dark-text transition-colors"
          >
            ← All Work
          </Link>
          <span className="font-serif text-sm text-ink-subtle">
            Simran Chhabra
          </span>
        </div>
      </footer>
    </main>
  );
}
