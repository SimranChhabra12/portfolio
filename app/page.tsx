import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/ui/Nav";
import HeroPhoto from "@/components/interactive/HeroPhoto";
import WorkChapters from "@/components/layout/WorkChapters";
import Reveal from "@/components/ui/Reveal";
import playgroundEntries from "@/data/playgroundEntries";

// Vertical rhythm is NOT set here. `globals.css` carries
// `section { padding: calc(var(--section-gap) / 2) 0 }` in `@layer base` (DESIGN_DOC §4),
// so neighbouring sections share one gap. A `py-*` utility on a <section> would outrank
// that base rule and silently restore the old uniform padding — so these sections stay
// bare vertically, and only carry the horizontal shell.
const SHELL = "max-w-[var(--page-max,1280px)] mx-auto px-[var(--page-gutter,32px)]";

// Playground on the homepage is a teaser, not the collection — the full set lives at
// /playground. Tiles are picked for covers that actually render: the Road Trip cover
// (`/playground/RTX Photos + Videos/IMG_20200117_171155.jpg`, a 4608×3456 camera
// original) makes the image optimizer return "not a valid image", so it's kept off the
// homepage until WP3 re-encodes the playground originals.
const TEASER_SLUGS = ["si-ch", "spoken-word", "big-squat-festival"];
const teaserEntries = TEASER_SLUGS.map((slug) =>
  playgroundEntries.find((e) => e.slug === slug)
).filter((e): e is (typeof playgroundEntries)[number] => Boolean(e?.cover));

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />

      {/* Hero */}
      <section className={SHELL}>
        <div className="flex justify-center">
          <HeroPhoto single />
        </div>
        <h1 className="t-display text-ink text-left !max-w-none mt-10 lg:mt-14">
          Product Designer
        </h1>
      </section>

      {/* Work — a `--surface` band. Full-bleed on the <section> so the colour runs edge to
          edge, with the shell moved inside so the cards keep their column. A dark block sat
          here once and competed with the product colour inside the visuals (DESIGN_DOC
          §1/§3); surface is the quiet version of the same idea, and the cream→surface edge
          is a hard cut, matching the footer — a gradient here read as a rendering artefact.
          No heading: the cards are the only thing a portfolio's work section can be showing,
          so "I've worked on" named nothing and just delayed them. */}
      <section id="work" className="bg-surface scroll-mt-8">
        <div className={SHELL}>
          <WorkChapters />
        </div>
      </section>

      {/* Play — teaser only */}
      <section id="play" className={`${SHELL} scroll-mt-8`}>
        <Reveal>
          <h2 className="t-heading text-ink !max-w-none">Playground</h2>

          {/* Playground tiles keep their NATIVE aspect (DESIGN_DOC §5) — no forced slot,
              so nothing is cropped or letterboxed. A justified row does that and still
              lines the tiles up: give each tile flex-basis AND flex-grow proportional to
              its own aspect ratio, and every tile in a line resolves to the same height. */}
          <ul className="flex flex-wrap items-start gap-4 lg:gap-6 mt-8 max-w-[var(--col-media,1000px)]">
            {teaserEntries.map((entry) => {
              const cover = entry.cover!;
              // basis only decides where the row wraps (two-up at 390); grow does the
              // justifying. Both scale with the aspect, which is what equalises heights.
              const aspect = cover.width / cover.height;
              return (
                <li
                  key={entry.slug}
                  style={{ flexGrow: aspect, flexBasis: `${aspect * 90}px` }}
                  className="min-w-0"
                >
                  <Link
                    href="/playground"
                    className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <div
                      className="relative overflow-hidden rounded-[var(--radius-card)] bg-surface"
                      style={{ aspectRatio: `${cover.width} / ${cover.height}` }}
                    >
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 360px"
                      />
                    </div>
                    <p className="t-caption uppercase tracking-[0.08em] text-mauve mt-3 transition-colors [@media(hover:hover)]:group-hover:text-accent">
                      {entry.title}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/playground"
            className="group t-body text-accent inline-flex items-center gap-2 mt-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            See the whole playground
            <span
              aria-hidden
              className="transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-[2px] [@media(hover:hover)]:group-hover:-translate-y-[2px]"
            >
              ↗
            </span>
          </Link>
        </Reveal>
      </section>

      {/* Footer — contact only. The About identity that used to double up here moved to
          the real /about route; this block does one job (DESIGN_DOC §6 Footer).
          Still the only dark ground on the page, and the cream/dark edge is a hard cut,
          matching /work and the case studies; a gradient band here read as a rendering
          artefact rather than a transition. */}
      <footer className="bg-dark-bg py-24">
        <div className={SHELL}>
          <h2 className="t-section text-surface !max-w-none mb-8">Get in touch</h2>

          <div className="flex flex-col gap-8">
            <p className="t-body text-cream/70 !max-w-none">
              Reach out to me:{" "}
              <a
                href="mailto:simranchhabra92@gmail.com"
                className="text-surface underline underline-offset-4 decoration-cream/30 transition-colors [@media(hover:hover)]:hover:text-mauve focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mauve"
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
                className="text-surface underline underline-offset-4 decoration-cream/30 transition-colors [@media(hover:hover)]:hover:text-mauve focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mauve"
              >
                LinkedIn
              </a>
              {" · "}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-surface underline underline-offset-4 decoration-cream/30 transition-colors [@media(hover:hover)]:hover:text-mauve focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mauve"
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
