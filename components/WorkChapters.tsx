import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import caseStudies from "@/data/caseStudies";

// Homepage display order: Whspr + AIRA, then Resy, then GestureSketch.
// (Independent of the canonical caseStudies order, which drives "next project" on the case study pages.)
// Slugs that aren't in caseStudies — a hidden project, say — simply drop out below.
const HOMEPAGE_ORDER = ["whspr", "aira-pcos", "resy", "gesture-sketch"];
const orderedForHomepage = HOMEPAGE_ORDER.map((slug) =>
  caseStudies.find((p) => p.slug === slug)
).filter((p): p is (typeof caseStudies)[number] => Boolean(p));

// The row visual is a 5:3 landscape slot, so it takes the composed cover scene from
// `/covers/*` — never `project.realCover`, which is a raw portrait phone screenshot.
// A portrait asset in a landscape slot letterboxes (DESIGN_DOC §5); `object-cover` on
// a composed 5:3 source is the only honest fit here.
export default function WorkChapters() {
  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      {orderedForHomepage.map((project, i) => (
        <Reveal key={project.slug} delay={i * 60}>
          <Link
            href={`/work/${project.slug}`}
            className="group block text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {/* 1 — composed scene, 5:3, media column */}
            <div className="relative w-full max-w-[var(--col-media,1000px)] aspect-[5/3] overflow-hidden rounded-[var(--radius-card)] bg-surface">
              <Image
                src={project.coverImage}
                alt={`Composed product screens from ${project.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1000px"
              />
            </div>

            <div className="max-w-[var(--col-text,640px)]">
              {/* 2 — role eyebrow */}
              {project.homeTags && (
                <p className="t-caption uppercase tracking-[0.08em] text-mauve mt-6">
                  {project.homeTags.join(" · ")}
                </p>
              )}

              {/* 3 — title. `.t-section`, not `.t-heading`: the section heading above these
                  rows keeps `.t-heading`, and the gap between the two is the hierarchy. */}
              <h3 className="t-section text-ink !max-w-none mt-2 transition-colors [@media(hover:hover)]:group-hover:text-accent">
                {project.title}
              </h3>

              {/* 4 — one-line takeaway */}
              <p className="t-sub text-ink/75 !max-w-none mt-3">
                {project.homeOneLiner}
              </p>

              {/* 5 — link affordance */}
              <span className="t-body text-accent inline-flex items-center gap-2 mt-4">
                View case study
                <span
                  aria-hidden
                  className="transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-[2px] [@media(hover:hover)]:group-hover:-translate-y-[2px]"
                >
                  ↗
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
