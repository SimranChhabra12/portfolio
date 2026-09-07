import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/ui/Nav";
import Reveal from "@/components/ui/Reveal";
import HeroPhoto from "@/components/interactive/HeroPhoto";

export const metadata: Metadata = {
  title: "About — Simran Chhabra",
  description:
    "Simran Chhabra is a product designer working on research-driven experiences for people existing systems overlook.",
};

// Vertical rhythm is NOT set here — `globals.css` carries
// `section { padding: calc(var(--section-gap) / 2) 0 }` in `@layer base` (DESIGN_DOC §4),
// so sections stay bare vertically and carry only the horizontal shell. Matches app/page.tsx.
const SHELL = "max-w-[var(--page-max,1280px)] mx-auto px-[var(--page-gutter,32px)]";

// The page's one structural device, borrowed from the reference layout Simran picked:
// every section heading is an italic first word against a roman remainder. Playfair has a
// real italic, so this costs nothing and gives the three headings a shared shape.
function SectionHeading({ lead, rest }: { lead: string; rest: string }) {
  return (
    <h2 className="t-heading text-ink !max-w-none">
      <em className="font-normal italic">{lead}</em> {rest}
    </h2>
  );
}

// ── Where I've been ────────────────────────────────────────────────────────────
// Reverse-chronological, and deliberately NOT filtered down to "design" roles: the
// clothing label and the WeWork community year are the reason the design work reads
// the way it does.
//
// There is no thumbnail column. `thumb` is still recorded per role, but only 2 of the 6
// have an honest image — and a 120px plate that is empty on four rows out of six reads as
// broken assets rather than as deliberate restraint, which is the opposite of what the
// null was protecting. Rendering the plate only where an image exists is worse again: the
// text column then starts at two different x positions down the list. Kept as data so the
// column can come back in one edit once all six exist (`/images/covers/styling.jpg` also
// needs a full-resolution re-export — the current file is 12KB).
const TIMELINE: {
  years: string;
  role: string;
  org: string;
  blurb: string;
  thumb: string | null;
  href?: string;
}[] = [
  {
    years: "2026 — Present",
    role: "UX Design Consultant",
    org: "Avenyu",
    blurb:
      "Booking and entry for a pre-launch marketplace for indie live events. Split Pass gives every person in a shared booking their own QR code, so the group doesn't have to arrive together.",
    thumb: null,
  },
  {
    years: "2025",
    role: "Product Design Intern",
    org: "Dream Of",
    blurb:
      "Talked to women 25-40 across Tier 1 and Tier 2 cities about haircare, then designed the shop, product, and checkout flows around what they actually said they were looking for.",
    thumb: "/images/covers/dream-of.jpg",
  },
  {
    years: "2025 — 2026",
    role: "Research Assistant",
    org: "NYU Tandon",
    blurb:
      "Ran and coded interviews with immigrant food delivery workers in NYC. The research went to the 2026 Harvard-Yale Southeast Asian Studies conference and into an upcoming book.",
    thumb: null,
  },
  {
    years: "2023 — 2024",
    role: "Product Design Intern",
    org: "Upload Digital",
    blurb:
      "Research and prototyping on Even's healthcare redesign, turning insurance plans people couldn't compare into flows they could. Also a data-visualization report on women in India's climate workforce.",
    thumb: null,
  },
  {
    years: "2022 — 2023",
    role: "Community & Brand Associate",
    org: "WeWork India",
    blurb:
      "75+ events across two Bengaluru locations for about 850 members, plus the invites, newsletters, and in-app content that got people to show up.",
    thumb: null,
  },
  {
    years: "2021 — 2023",
    role: "Founder & Designer",
    org: "Si.Ch Clothing",
    blurb:
      "A sustainable label I ran end to end. Product, brand, store, photos, customer DMs. 400+ pieces sold in the first year.",
    thumb: "/images/covers/styling.jpg",
    href: "/#work",
  },
];

// ── Recognition ───────────────────────────────────────────────────────────────
// The reference puts award art on a shelf. There is no award art here yet and none is
// invented: these are the four things that are true, rendered as flat cards on the same
// shelf line. Add `art` to a card when Simran supplies an image.
const SHELF: { title: string; issuer: string; year: string }[] = [
  {
    title: "AI / Migration / Futures",
    issuer: "Workshop at LSE — research contributed",
    year: "2026",
  },
  {
    title: "Southeast Asian Studies Graduate Conference",
    issuer: "Harvard-Yale — research presented",
    year: "2026",
  },
  {
    title: "MS, Integrated Design and Media",
    issuer: "NYU Tandon School of Engineering",
    year: "2026",
  },
  {
    title: "B.Des, Fashion Design",
    issuer: "National Institute of Fashion Technology, Gandhinagar",
    year: "2020",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream pt-[66px]">
      <Nav />

      {/* Opening. The reference leads with a stack of photos and no headline, and that was
          the original call here — the sentence lands harder after you have seen her face.
          Overruled deliberately: with the photo alone up top, the first words on the page
          were the "How I got here" heading, well below the fold, so the strongest thing
          about this page (the voice) sat second to a graduation photo. Two lines now run
          above the stack; the photo still carries the section.
          The stack is two offset plates behind the existing hero frame — the frame's own
          flip is the site's one signature motion (DESIGN_DOC §7), nothing new added. */}
      <section className={SHELL}>
        <p className="t-sub text-ink !max-w-none mb-12 max-w-[24ch] text-balance">
          I design for people existing systems overlook — and I got here through a clothing
          label, 75 events, and a lot of interviews.
        </p>

        <div className="flex justify-center">
          <div className="relative w-full max-w-[420px]">
            <div
              aria-hidden
              className="absolute inset-0 rotate-[-4deg] rounded-[var(--radius-card)] bg-surface"
            />
            <div
              aria-hidden
              className="absolute inset-0 rotate-[3deg] rounded-[var(--radius-card)] bg-blush/40"
            />
            <div className="relative">
              <HeroPhoto fluid aspect="3 / 4" />
            </div>
          </div>
        </div>
      </section>

      {/* How I got here — the narrative. Marginalia in the left gutter names the chapter
          each paragraph belongs to, which is what the reference's flanking logo stickers
          were doing. Swap a marginalia label for a logo image once assets exist. */}
      <section className={SHELL}>
        <SectionHeading lead="How" rest="I got here" />

        <div className="mt-10 flex flex-col gap-10">
          {[
            {
              mark: "NIFT · Si.Ch",
              body: (
                <>
                  I didn&apos;t start in tech. I studied fashion design at NIFT in Gandhinagar,
                  and for two years after that I ran Si.Ch, a small sustainable clothing label.
                  I did all of it: the product, the brand, the store, the photos, the customer
                  DMs. We sold 400+ pieces in the first year. The part I liked most was never
                  the clothes. It was watching someone decide.
                </>
              ),
            },
            {
              mark: "WeWork India",
              body: (
                <>
                  Then a year at WeWork India, running 75+ community events across two Bengaluru
                  locations for about 850 members. Designing an invite is easy. Getting 50 people
                  to show up on a Wednesday is not. That was the first time I understood that the
                  thing you make is only half of the work.
                </>
              ),
            },
            {
              mark: "NYU IDM",
              body: (
                <>
                  I came to NYU for the MS in Integrated Design and Media and the work got
                  sharper. I interviewed immigrant food delivery workers in NYC for a research
                  project at Tandon. At Upload Digital I worked on insurance flows until people
                  could actually tell two plans apart. Now I design consumer products for
                  early-stage teams, and I&apos;m still asking the question I had with the
                  clothing label. How does a person decide, and what is in their way?
                </>
              ),
            },
          ].map((para, i) => (
            <Reveal key={para.mark} delay={i * 80}>
              <div className="md:flex md:gap-10">
                <p className="t-caption text-mauve md:w-[160px] md:shrink-0 md:pt-1">
                  {para.mark}
                </p>
                <p className="t-body text-ink mt-3 md:mt-0">{para.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Where I've been. Year in the gutter, then the line. One row per role, separated by
          a whisper rule rather than a card border (DESIGN_DOC §3). */}
      <section className={SHELL}>
        <SectionHeading lead="Where" rest="I've been" />

        <ol className="mt-10 flex flex-col">
          {TIMELINE.map((item, i) => (
            <Reveal key={`${item.org}-${item.years}`} delay={i * 60}>
              <li className="flex flex-col gap-4 border-t border-mauve/30 py-8 sm:flex-row sm:gap-8">
                <p className="t-caption label text-mauve sm:w-[140px] sm:shrink-0 sm:pt-1">
                  {item.years}
                </p>

                <div className="min-w-0 sm:flex-1">
                  <h3 className="t-sub text-ink">
                    {item.role} <span className="text-mauve">·</span> {item.org}
                  </h3>
                  <p className="t-body text-ink/75 mt-2">{item.blurb}</p>
                </div>

                {item.href ? (
                  <Link
                    href={item.href}
                    className="t-caption text-accent self-start underline underline-offset-4 sm:self-center"
                  >
                    See the work
                  </Link>
                ) : null}
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Recognition — the reference's shelf, rendered as flat cards sitting on one rule. */}
      <section className={SHELL}>
        <SectionHeading lead="What" rest="it's added up to" />

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SHELF.map((card, i) => (
              <Reveal key={card.title} delay={i * 60}>
                <article className="flex h-full flex-col justify-between rounded-[var(--radius-card)] bg-surface p-6">
                  <h3 className="t-sub text-ink">{card.title}</h3>
                  <p className="t-caption text-ink/75 mt-4">{card.issuer}</p>
                  <p className="t-caption label text-mauve mt-2">{card.year}</p>
                </article>
              </Reveal>
            ))}
          </div>
          {/* The shelf itself. One line under the cards, the way the reference stages them. */}
          <div aria-hidden className="mt-0 h-px w-full bg-mauve/40" />
        </div>
      </section>

      {/* What I enjoy — the closer. A second line and a three-photo row were marked here as
          [TBD] slots. The marker convention is right for a draft, but this page is reachable,
          and bracketed placeholder text on a live portfolio costs more than the missing
          content does. The slots are recorded in TASKS.md instead; drop the photos into
          /public/images/about/ and the row can come back. */}
      <section className={SHELL}>
        <SectionHeading lead="What" rest="I enjoy" />

        <p className="t-body text-ink mt-8">
          Most of what I do outside work is other people&apos;s problems, which I know is a
          strange way to relax. I started Eka, a nonprofit that teaches a gender-stereotype
          curriculum to middle schoolers. I&apos;ve handed out menstrual cups in Gujarat with
          Boondh and fundraised for an animal shelter in Auroville. Before that there was a slam
          poetry night and a few music festivals.
        </p>
      </section>
    </main>
  );
}
