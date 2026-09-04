import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import caseStudies from "@/data/caseStudies";

// Homepage display order: Whspr + AIRA, then Resy.
// (Independent of the canonical caseStudies order, which drives "next project" on the case study pages.)
// Slugs that aren't in caseStudies — a hidden project, say — simply drop out below.
const HOMEPAGE_ORDER = ["whspr", "aira-pcos", "resy"];
const orderedForHomepage = HOMEPAGE_ORDER.map((slug) =>
  caseStudies.find((p) => p.slug === slug)
).filter((p): p is (typeof caseStudies)[number] => Boolean(p));

function ArrowLink() {
  return (
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-cream/40 text-cream shrink-0 transition-colors group-hover:border-mauve group-hover:text-mauve">
      <span aria-hidden className="text-[16px]">
        ↗
      </span>
    </span>
  );
}

export default function WorkChapters() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 lg:gap-x-32 gap-y-14 lg:gap-y-20">
      {orderedForHomepage.map((project, i) => (
        <Reveal key={project.slug} delay={i * 60}>
          <Link href={`/work/${project.slug}`} className="group block text-left">
            <div className="relative aspect-[5/3] overflow-hidden rounded-[var(--radius-card)] bg-dark-surface mb-10">
              {project.realCover ? (
                <Image
                  src={project.realCover}
                  alt={`${project.title} app screen`}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              ) : (
                <CoverPlaceholder
                  src={project.coverImage}
                  alt={`${project.title} cover`}
                  initial={project.title[0]}
                  label={project.disciplines[0]}
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              )}
            </div>

            <div className="flex items-start justify-between gap-4 mb-7">
              {project.homeTags && (
                <p className="label text-mauve">{project.homeTags.join(" • ")}</p>
              )}
              <ArrowLink />
            </div>

            <h3 className="t-heading text-surface !max-w-none underline decoration-cream/30 underline-offset-4 group-hover:decoration-mauve group-hover:text-mauve transition-colors">
              {project.title}
              <span className="italic">
                {": "}
                {project.homeOneLiner}
              </span>
            </h3>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
