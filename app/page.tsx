import Link from "next/link";
import Nav from "@/components/ui/Nav";
import HeroPhoto from "@/components/interactive/HeroPhoto";
import WorkChapters from "@/components/layout/WorkChapters";
import PlaygroundMosaic from "@/components/layout/PlaygroundMosaic";
import Reveal from "@/components/ui/Reveal";

// Vertical rhythm is NOT set here. `globals.css` carries
// `section { padding: calc(var(--section-gap) / 2) 0 }` in `@layer base` (DESIGN_DOC §4),
// so neighbouring sections share one gap. A `py-*` utility on a <section> would outrank
// that base rule and silently restore the old uniform padding — so these sections stay
// bare vertically, and only carry the horizontal shell.
const SHELL = "max-w-[var(--page-max,1280px)] mx-auto px-[var(--page-gutter,32px)]";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream pt-[66px]">
      <Nav />

      {/* Hero — the title and the photo are ONE unit, not a stack. `items-center` is what
          does that: the display line centres against the frame, so the pair reads as a
          single block rather than two things that happen to sit near each other.
          Text left, photo right matches /about, so both pages open the same way.
          The photo runs `fluid` here — at its fixed 628px there is too little room left for
          `.t-display` and "Product Designer" breaks mid-word. 52% lands the frame within a
          few pixels of the reference 628px at a 1280 viewport, so desktop is unchanged in
          practice while the pair now scales together.
          Below md it stacks to text-then-photo, opening on the words. */}
      <section className={SHELL}>
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16">
          {/* Takes `.t-display` straight — 84px at 1440, per DESIGN_DOC §2. There used to be
              a local `!text-[...]` override holding this at 59px (70% of the token), added
              because 84px was thought to break "designer" mid-word beside the photo column.
              Measured at 59 / 72 / 84 in this exact layout: all three wrap to two lines, none
              splits a word, and the photo column is unaffected — `text-wrap: balance` was
              already doing that job. At 59px the headline read timid next to the frame, which
              is the opposite of §1's "confident, not timid", so the override is gone.
              Width is 59% and NOT `flex-1`, which is what positions the photo: filling the
              row pinned the frame to the right edge; at 59% + a 64px gap its centre sits
              near 75% with ~180px trailing. */}
          <div className="md:w-[62%] md:shrink-0 md:min-w-0 relative z-10">
            {/* Local size override on `.t-display`, deliberately reinstated. An earlier one
                (84px → 59px) was removed because at five words the headline read timid, and
                that reasoning still holds for a five-word headline. This copy is 13 words in
                the h1 alone: taken straight, `.t-display` runs it to five lines and the block
                towers over the photo column, which is the pairing §1 asks for. Scaled to a
                60px ceiling it lands in three lines against a frame of near-equal height.
                The token itself is untouched — /work, /work/[slug] and /playground/[slug]
                all take `.t-display` straight for short titles and still want 84px. */}
            <h1
              className="t-display [text-wrap:balance] text-ink text-left !max-w-none"
              // Inline, not a Tailwind arbitrary value: `.t-display` and a utility class are
              // both single-class specificity, and the layered token wins the cascade tie.
              style={{ fontSize: "clamp(2rem, 1.35rem + 2.667vw, 3.75rem)" }}
            >
              Hi, I&apos;m Simran Chhabra, a product designer in New York by way of fashion.
            </h1>
            {/* Raised off the 20px `.t-sub` token, and inline for the same specificity reason
                as the h1 above. The complaint was that this line read as a caption rather than
                the second half of the introduction, and the cause is the ratio: 60/20 is a 3:1
                drop. Scaling the whole hero up was the other option and it overpowers the
                photo column. Lifting only this line to 26px puts the pair at ~2.3:1, which
                reads as two weights of one sentence. Colour lifted 70% → 78% for the same
                reason: at 20px the lighter ink was doing part of the shrinking. */}
            <p
              className="t-sub text-ink/[0.78] mt-7 max-w-[46ch]"
              style={{ fontSize: "clamp(1.125rem, 0.93rem + 0.8vw, 1.625rem)", lineHeight: 1.45 }}
            >
              Endlessly curious about people, and drawn to the messy middle of things. I&apos;ll
              always stop to say hi to dogs and cats!
            </p>
          </div>
          {/* Portrait frame, matching the cropped source (880x1517) exactly, so the photo
              is never re-cropped by the slot. The aspect is fixed by `aspect`, so every
              width below is the same crop at a different scale — nothing re-frames.
              The width was last set as a 70% reduction matched to a 70% title override that
              is now gone (see the h1 above). Checked against the restored 84px title at 1440:
              the pairing still reads — the headline fills its column and the frame holds its
              corner — so the widths stand. Scaling the photo alone was tried at 11% and left
              an 84px headline beside a thumbnail, which is what these percentages avoid.
              `min-w` because a percentage alone inverts at the narrow end of the md band:
              23% of a 768 shell is 162px, and without a floor a further-narrowed column
              would drop below the 210px the same photo gets once it stacks on a phone. */}
          <div className="w-full max-w-[236px] md:max-w-none md:w-[26%] md:min-w-[168px] lg:w-[26%] md:shrink-0">
            <HeroPhoto single fluid aspect="3 / 4" />
          </div>
        </div>
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

      {/* Play — the whole playground, tiled. Was a three-tile teaser row; the section
          now carries every entry, because the volume IS the point (see PlaygroundMosaic). */}
      <section id="play" className={`${SHELL} scroll-mt-8`}>
        <Reveal>
          {/* `.t-section` (36px), not `.t-heading` (50px). The work section deliberately
              carries no heading of its own (task B2), which left this as the only h2 above
              the footer — so the secondary content was the loudest thing on the homepage and
              the eye landed here first. Demoting it restores the proportion without
              reinstating a Work heading nobody wanted.
              Note the tension with DESIGN_DOC §2's ratio rule, which wants a section heading
              at ≥1.35x its project titles — 50:36 would satisfy it exactly. That rule governs
              a heading and the titles *inside its own section*; Playground's items are 13px
              captions, so it holds there either way. Compared both on the page: at 50px
              Playground is still the largest thing below the hero and keeps pulling the eye
              past the work, which is the failure this was fixing. 36px it is. */}
          <h2 className="t-section text-ink !max-w-none">Playground</h2>

          <p className="t-body text-ink/75 mt-3 max-w-[var(--col-text,640px)]">
            The creative work I do beyond product design, from styling and art direction to
            photography and the events I helped put on.
          </p>

          {/* Every entry, tiled. See PlaygroundMosaic for why this is columns, not grid. */}
          <PlaygroundMosaic />

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
                href="mailto:simran.chhabra012@gmail.com"
                className="text-surface underline underline-offset-4 decoration-cream/30 transition-colors [@media(hover:hover)]:hover:text-mauve focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mauve"
              >
                simran.chhabra012@gmail.com
              </a>
            </p>

            <p className="t-body text-cream/70 !max-w-none">
              Find me on:{" "}
              <a
                href="https://www.linkedin.com/in/simranchhabra12/"
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
              <a
                href="https://www.instagram.com/simranchhabra/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-surface underline underline-offset-4 decoration-cream/30 transition-colors [@media(hover:hover)]:hover:text-mauve focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mauve"
              >
                Instagram
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
