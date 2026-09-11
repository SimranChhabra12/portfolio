import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/ui/Nav";
import Reveal from "@/components/ui/Reveal";
import AboutPhotoPile from "@/components/interactive/AboutPhotoPile";

export const metadata: Metadata = {
  title: "About — Simran Chhabra",
  description:
    "Simran Chhabra, product designer in New York. Fashion school, a clothing label, 75 community events, and a lot of interviews.",
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
      "Research and prototyping on Even's healthcare redesign. People couldn't tell two insurance plans apart, so most of the work was making the comparison possible at all. Also a data-visualization report on women in India's climate workforce.",
    thumb: null,
  },
  {
    years: "2022 — 2023",
    role: "Community & Brand Associate",
    org: "WeWork India",
    blurb:
      "75 events across 2 Bengaluru locations for about 850 members, plus the invites, newsletters, and in-app content that got people to show up.",
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
const SHELF: { title: string; issuer: string; year: string; detail?: string }[] = [
  {
    title: "AI Rationale",
    issuer: "LSE-NYU Research Seed Fund",
    year: "2026",
    detail: "How technologists, policy makers and lawyers imagine artificial intelligence for migration in London and New York City. As part of the NYU team, I did the literature review, found and recruited people to interview, helped run the interviews, and coded and synthesised them. That synthesis is what was presented at the AI / Migration / Futures workshop at LSE.",
  },
  {
    title: "Infrastructuring Public-Infrastructuring Private",
    issuer: "Keynote by Professor Margaret Jack, Harvard-Yale Southeast Asian Studies Graduate Conference",
    year: "2026",
    detail: "Technology-Mediated Work and the Crisis of Space. As a research assistant at NYU Tandon, I ran and coded the interviews with immigrant food delivery workers in NYC that the talk draws on. The research is also going into an upcoming book.",
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
        <p className="t-sub text-ink !max-w-none mb-12 max-w-[28ch] text-balance">
          I&apos;m a product designer in New York. Before this I studied fashion, ran a small
          clothing label, and worked in community and events.
        </p>

        <div className="flex justify-center">
          <div className="w-full max-w-[420px]">
            <AboutPhotoPile />
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
                  DMs. We sold 400+ pieces in the first year. The part I enjoyed most was
                  seeing someone fall in love with a piece, and working out what it was about it
                  that drew them in. What were they actually looking for?
                </>
              ),
            },
            {
              mark: "WeWork India",
              body: (
                <>
                  Then a year at WeWork India, running 75 community events across 2 Bengaluru
                  locations for about 850 members. Most of it was getting to know the members,
                  listening for what they wished the space had, and planning events around that.
                  The ones that worked were usually the ones people had half-asked for already.
                </>
              ),
            },
            {
              mark: "NYU IDM",
              body: (
                <>
                  I came to NYU for the MS in Integrated Design and Media, where I specialised in
                  product design. Some of the most exciting parts of the course were the chance to
                  work across very different kinds of technology: designing and fabricating
                  wearables, building VR experiences, and learning the basics of UX and AI. Running
                  through all of it was a close look at the social impact of design decisions,
                  both digital and physical. Now I design consumer products for early-stage teams,
                  and I&apos;m still curious about the same thing I was with the clothing label:
                  what draws people to something, and what they&apos;re really looking for.
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
        <SectionHeading lead="Education" rest="and research" />

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SHELF.map((card, i) => (
              <Reveal key={card.title} delay={i * 60}>
                <article className="flex h-full flex-col justify-between rounded-[var(--radius-card)] bg-surface p-6">
                  <div>
                    <h3 className="t-sub text-ink">{card.title}</h3>
                    <p className="t-caption text-ink/75 mt-4">{card.issuer}</p>
                    {card.detail && <p className="t-caption text-ink mt-3">{card.detail}</p>}
                  </div>
                  <p className="t-caption label text-mauve mt-4">{card.year}</p>
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

        <p className="t-body text-ink mt-6">
          Outside work you&apos;ll find me hanging out with my best friend Kaiser and saying hi to
          all the doggos I see and meet! I love spending time in a park reading and discovering
          more female authors from around the world, or in the water surfing!
        </p>
      </section>
    </main>
  );
}
