import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/ui/Nav";
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />

      {/* Intro — text left, one photo right. Stacks to text-then-photo at 390 rather than
          leading with the image, so the page opens on the sentence, not the face. */}
      <section className={SHELL}>
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
          <div className="md:flex-1 md:min-w-0">
            <h1 className="t-display text-ink text-left !max-w-none">
              Made for people, designed with intention
            </h1>
            {/* DESIGN_DOC §8 / DESIGN_RULES §6: real voice or an obvious marker — never
                invented bio copy. Simran to supply the second line. */}
            <p className="t-sub text-mauve mt-6 max-w-[var(--col-text)]">
              [INTRO LINE — TBD: one line on what she designs and who for]
            </p>
          </div>

          {/* Square, cropped from the portrait original — NOT the landscape hero frame.
              The source is 2000×2667, so a square keeps 75% of its height; the vertical
              object-position is what decides which 75%, chosen against the real crop. */}
          <div className="md:w-[38%] md:shrink-0 md:max-w-[380px]">
            <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-card)] bg-surface">
              <Image
                src="/images/hero/hero-2.jpg"
                alt="Simran Chhabra at One World Observatory, Manhattan skyline behind her"
                fill
                className="object-cover"
                style={{ objectPosition: "50% 42%" }}
                sizes="(max-width: 768px) 100vw, 380px"
                preload
              />
            </div>
          </div>
        </div>
      </section>

      {/* The photo-cluster treatment that used to sit on the homepage. The homepage hero
          keeps exactly one photo; the carousel format belongs here, where the page is
          actually about her. */}
      <section className={SHELL}>
        <h2 className="t-heading text-ink !max-w-none">Outside the work</h2>
        <div className="mt-8 flex justify-center md:justify-start">
          <HeroPhoto />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          C4 — BLOCKED. The research Simran did with her professor goes here.
          Waiting on her to supply the content; do not invent it (DESIGN_DOC §8).
          ──────────────────────────────────────────────────────────────────── */}
      <section className={SHELL}>
        <h2 className="t-heading text-ink !max-w-none">Research</h2>
        <p className="t-body text-mauve mt-6 max-w-[var(--col-text)]">
          [RESEARCH — TBD: the work with her professor. Content pending from Simran.]
        </p>
      </section>
    </main>
  );
}
