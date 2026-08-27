import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import caseStudies from "@/data/caseStudies";

export default function WorkGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {caseStudies.map((project, i) => (
        <Reveal key={project.slug} delay={i * 80}>
          <Link
            href={`/work/${project.slug}`}
            className="group flex flex-col gap-4"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
              <Image
                src={project.coverImage}
                alt={`${project.title} cover`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div>
              {project.homeTags && (
                <p className="label text-mauve mb-2">{project.homeTags.join(" · ")}</p>
              )}
              <h3 className="t-section text-ink group-hover:text-accent transition-colors mb-2">
                {project.title}
              </h3>
              <p className="t-body text-mauve !max-w-none">{project.homeOneLiner}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
