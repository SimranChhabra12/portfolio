import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/ui/Nav";
import Reveal from "@/components/ui/Reveal";
import CaseStudySectionNav from "@/components/layout/CaseStudySectionNav";
import CaseStudyBlocks from "@/components/interactive/CaseStudyBlocks";
import caseStudies, { getCaseStudy, getNextCaseStudy } from "@/data/caseStudies";
import { COL_MEDIA, COL_TEXT, PAGE_GUTTER, SECTION_GAP } from "../_components/columns";

// Whspr and AIRA have hand-built routes (app/work/whspr, app/work/aira-pcos)
// that take precedence over this dynamic one. Skip them here so the build
// doesn't prerender a second, unreachable copy of each.
const BESPOKE_ROUTES = new Set(["whspr", "aira-pcos", "resy"]);

export async function generateStaticParams() {
  return caseStudies
    .filter((p) => !BESPOKE_ROUTES.has(p.slug))
    .map((p) => ({ slug: p.slug }));
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

const PAGE_MAX = "var(--page-max, 1280px)";
const HALF_GAP = `calc(${SECTION_GAP} / 2)`;

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

      {/* One rail for the whole page: sticky section nav on the left, the media
          column on the right. Everything — hero, meta, sections — shares the
          media column's left edge. (DESIGN_DOC §4) */}
      <div style={{ paddingLeft: PAGE_GUTTER, paddingRight: PAGE_GUTTER }}>
        <div
          className="mx-auto flex gap-16 justify-center"
          style={{ maxWidth: PAGE_MAX }}
        >
          <CaseStudySectionNav items={navItems} color={project.color} />

          <div className="flex-1 min-w-0" style={{ maxWidth: COL_MEDIA }}>
            {/* Hero */}
            <header className="pt-40" style={{ paddingBottom: HALF_GAP }}>
              <p className="label text-mauve mb-6">
                {project.year} · {project.role}
                {project.status && <> · {project.status}</>}
              </p>
              <h1 className="t-display text-ink mb-6">{project.title}</h1>
              <p className="t-sub text-ink" style={{ maxWidth: COL_TEXT }}>
                {project.subtitle}
              </p>
              {project.prototypeUrl && (
                <a
                  href={project.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 label text-accent border-b border-accent/40 pb-1 mt-8 hover:border-accent transition-colors"
                >
                  View the live prototype
                  <span aria-hidden>↗</span>
                </a>
              )}
            </header>

            {/* Meta strip */}
            <section
              className="border-y border-ink/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8"
              style={{ paddingTop: HALF_GAP, paddingBottom: HALF_GAP }}
            >
              <div>
                <p className="label text-mauve mb-2">Role</p>
                <p className="t-body text-ink !max-w-none">{project.role}</p>
              </div>
              <div>
                <p className="label text-mauve mb-2">Team</p>
                <p className="t-body text-ink !max-w-none">{project.meta.team}</p>
              </div>
              <div>
                <p className="label text-mauve mb-2">Research methods</p>
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
            </section>

            {/* Sections */}
            {project.sections.map((section, i) => (
              <Reveal key={section.id}>
                <section
                  id={section.id}
                  className={`scroll-mt-32 ${
                    i < project.sections.length - 1 ? "border-b border-ink/10" : ""
                  }`}
                  style={{ paddingTop: HALF_GAP, paddingBottom: HALF_GAP }}
                >
                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="t-caption text-mauve">{section.number}</span>
                    <p className="label text-mauve">{section.heading}</p>
                  </div>

                  {section.empty ? (
                    <div
                      className="border border-dashed border-ink/20 px-8 py-12"
                      style={{ maxWidth: COL_TEXT, borderRadius: "var(--radius-card, 4px)" }}
                    >
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

            {/* Next project */}
            {nextProject && (
              <section style={{ paddingTop: SECTION_GAP, paddingBottom: SECTION_GAP }}>
                <p className="label text-mauve mb-8">Next project</p>
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-end justify-between gap-6"
                >
                  <div>
                    <h2 className="t-section text-ink transition-colors group-hover:text-accent">
                      {nextProject.title}
                    </h2>
                    <p className="t-body text-ink mt-4" style={{ maxWidth: COL_TEXT }}>
                      {nextProject.subtitle}
                    </p>
                  </div>
                  <span className="label text-accent shrink-0">
                    View case study{" "}
                    <span
                      aria-hidden
                      className="inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </span>
                </Link>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark-bg py-8" style={{ paddingLeft: PAGE_GUTTER, paddingRight: PAGE_GUTTER }}>
        <div
          className="mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          style={{ maxWidth: PAGE_MAX }}
        >
          <Link href="/work" className="label text-surface/70 hover:text-surface transition-colors">
            ← All work
          </Link>
          <span className="font-serif text-[16px] text-surface/70">Simran Chhabra</span>
        </div>
      </footer>
    </main>
  );
}
