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

      <section className="pt-40 pb-16 px-8 lg:px-16 border-b border-ink/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="label text-mauve mb-8">About</p>
            <h1 className="font-serif text-[39px] font-bold text-ink leading-[1.2] mb-8">
              Hi, I&apos;m Simran.
            </h1>
            <div className="flex flex-col gap-6 max-w-[65ch]">
              <p className="t-body text-ink">
                I&apos;m a product designer who leads with research. I care
                about understanding people — not just their workflows, but the
                emotional and behavioral patterns that shape how they interact
                with the world.
              </p>
              <p className="t-body text-mauve">
                My work spans health tech, consumer apps, and civic tools. From
                designing a circadian rhythm system for women with PCOS to
                building gender-aware safety intelligence for urban spaces, I
                gravitate toward problems where the stakes are personal.
              </p>
              <p className="t-body text-mauve">
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
      <section className="px-8 lg:px-16 py-16 border-b border-ink/10">
        <div className="max-w-5xl mx-auto">
          <p className="label text-mauve mb-8">Skills</p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="t-caption text-ink border border-mauve rounded-full px-4 py-2 hover:border-accent hover:text-accent transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Resume + Contact */}
      <section className="px-8 lg:px-16 py-16">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-6 items-start">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 label bg-accent text-cream rounded-full px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Download Résumé
          </a>
          <a
            href="mailto:skc9841@nyu.edu"
            className="inline-flex items-center gap-3 label text-ink border border-mauve rounded-full px-8 py-4 hover:border-accent hover:text-accent transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-bg border-t border-white/5 py-8 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="font-serif text-[16px] text-mauve">Simran Chhabra</span>
          <div className="flex gap-6">
            <a href="mailto:skc9841@nyu.edu" className="label text-mauve hover:text-surface transition-colors">
              Email
            </a>
            <a
              href="https://linkedin.com/in/simranchhabra"
              target="_blank"
              rel="noopener noreferrer"
              className="label text-mauve hover:text-surface transition-colors"
            >
              LinkedIn
            </a>
            <Link href="/work" className="label text-mauve hover:text-surface transition-colors">
              Work
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
