import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata = {
  title: "About — Simran Chhabra",
};

const skills = [
  "UX Research",
  "Product Strategy",
  "Interaction Design",
  "Prototyping",
  "Information Architecture",
  "Usability Testing",
  "Data Analysis",
  "Service Design",
  "Design Systems",
  "Behavioral Science",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />

      <section className="pt-40 pb-20 px-8 lg:px-20 border-b border-ink/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-8">
              About
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-ink leading-tight mb-10">
              Hi, I&apos;m Simran.
            </h1>
            <div className="flex flex-col gap-5 text-ink-muted leading-relaxed">
              <p>
                I&apos;m a product designer who leads with research. I care
                about understanding people — not just their workflows, but the
                emotional and behavioral patterns that shape how they interact
                with the world.
              </p>
              <p>
                My work spans health tech, consumer apps, and civic tools. From
                designing a circadian rhythm system for women with PCOS to
                building gender-aware safety intelligence for urban spaces, I
                gravitate toward problems where the stakes are personal.
              </p>
              <p>
                I&apos;m comfortable moving between research, product strategy,
                and implementation — which means I can close the gap between
                insight and shipped product.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <div className="aspect-[3/4] relative rounded-2xl overflow-hidden">
              <Image
                src="/hero.png"
                alt="Simran Chhabra"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-8 lg:px-20 py-20 border-b border-ink/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-ink-muted mb-10">
            Skills
          </p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-sm text-ink border border-ink/20 rounded-full px-4 py-2 hover:border-ink/60 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Resume + Contact */}
      <section className="px-8 lg:px-20 py-20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-8 items-start">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium text-ink border border-ink rounded-full px-8 py-4 hover:bg-ink hover:text-cream transition-colors"
          >
            Download Résumé
          </a>
          <a
            href="mailto:simranchhabra@example.com"
            className="inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium text-ink border border-ink/20 rounded-full px-8 py-4 hover:border-ink transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-bg border-t border-white/5 py-10 px-8 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="font-serif text-sm text-ink-subtle">
            Simran Chhabra
          </span>
          <div className="flex gap-6 text-xs uppercase tracking-widest text-ink-subtle">
            <a
              href="mailto:simranchhabra@example.com"
              className="hover:text-dark-text transition-colors"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/simranchhabra"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-dark-text transition-colors"
            >
              LinkedIn
            </a>
            <Link
              href="/work"
              className="hover:text-dark-text transition-colors"
            >
              Work
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
