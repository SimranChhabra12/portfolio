import Nav from "@/components/Nav";
import HeroPhoto from "@/components/HeroPhoto";
import SectionTransition from "@/components/SectionTransition";
import WorkChapters from "@/components/WorkChapters";
import Playground from "@/components/Playground";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />

      {/* Hero */}
      <section className="pt-28 pb-16 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            <HeroPhoto />
          </div>
          <p className="t-display text-ink text-left mt-10 lg:mt-14 max-w-3xl !max-w-none">
            Product Designer / Creative Wildflower / Endlessly Curious
          </p>
        </div>
      </section>

      <SectionTransition className="bg-gradient-to-b from-cream to-dark-bg" />

      {/* Work */}
      <section id="work" className="bg-dark-bg px-8 lg:px-16 py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="t-heading text-surface mb-14">I&apos;ve worked on</h2>
          <WorkChapters />
        </div>
      </section>

      <SectionTransition className="bg-gradient-to-b from-dark-bg to-surface" />

      {/* Play */}
      <section id="play" className="px-8 lg:px-16 py-16 bg-surface scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="t-heading text-ink mb-14">Playground</h2>
          <Playground />
        </div>
      </section>

      <SectionTransition className="bg-gradient-to-b from-surface to-dark-bg" />

      {/* Footer / About */}
      <footer id="about" className="bg-dark-bg py-24 px-8 lg:px-16 scroll-mt-24">
        <div className="max-w-5xl mx-auto text-left">
          <h2 className="t-display text-surface mb-8 !max-w-none">
            Welcome to the wild side
          </h2>

          <div className="flex flex-col gap-8">
            <p className="t-body text-cream/70 !max-w-none">
              Reach out to me:{" "}
              <a
                href="mailto:simranchhabra92@gmail.com"
                className="text-surface hover:text-mauve transition-colors"
              >
                simranchhabra92@gmail.com
              </a>
            </p>

            <p className="t-body text-cream/70 !max-w-none">
              Find me on:{" "}
              <a
                href="https://linkedin.com/in/simranchhabra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-surface hover:text-mauve transition-colors"
              >
                LinkedIn
              </a>
              {" · "}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-surface hover:text-mauve transition-colors"
              >
                Resume
              </a>
              {" · "}
              <span className="text-cream/40">Instagram</span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
