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
          <p className="text-white/80 text-lg lg:text-xl max-w-xl leading-relaxed">
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="px-8 lg:px-20 py-20 border-b border-ink/10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-4">
              The Problem
            </p>
            <p className="text-ink text-lg leading-relaxed">
              {project.overview.problem}
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-ink-muted mb-2">
                Role
              </p>
              <p className="text-ink text-sm leading-relaxed">
                {project.overview.role}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-ink-muted mb-2">
                Timeline
              </p>
              <p className="text-ink text-sm">{project.overview.timeline}</p>
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

      {/* Sections */}
      <div className="max-w-4xl mx-auto px-8 lg:px-0 lg:mx-auto" style={{ maxWidth: "56rem", padding: "0 2rem" }}>
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
              <section
                key={i}
                className="py-16 border-b border-ink/10"
              >
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
                    <div
                      key={j}
                      className="bg-cream p-8 flex flex-col gap-2"
                    >
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
