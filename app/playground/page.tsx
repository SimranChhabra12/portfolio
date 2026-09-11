import type { Metadata } from "next";
import Wordmark from "@/components/ui/Wordmark";
import Link from "next/link";
import Nav from "@/components/ui/Nav";
import Playground from "@/components/interactive/Playground";
import FlowerTile from "@/components/interactive/FlowerTile";

export const metadata: Metadata = {
  title: "Playground — Simran Chhabra",
  description:
    "Styling, art direction, photography and events — the work Simran Chhabra makes outside product design.",
};

export default function PlaygroundIndexPage() {
  return (
    <main className="min-h-screen bg-cream pt-[66px]">
      <Nav />

      {/*
        No py-* utility on the grid section: the section rhythm in globals.css (§4) owns
        vertical spacing. pt-40 is here only to clear the fixed nav.
      */}
      <section className="pt-40 pb-24">
        <div className="max-w-[var(--page-max,1280px)] mx-auto px-[var(--page-gutter,32px)]">
          <Link
            href="/"
            className="t-caption text-mauve hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            ← Home
          </Link>

          <h1 className="t-heading text-ink !max-w-none mt-6">Playground</h1>
          <p className="t-body text-ink !max-w-[var(--col-text,640px)] mt-6">
            Most of what&apos;s on this page started with me saying yes. I&apos;m curious about
            people, I go to things I know nothing about, and I talk to strangers who somehow
            become friends. Wherever I end up, I end up building a community around it. A slam
            poetry movement, music festivals, a fashion label, a roadtrip across my home state.
            None of it was planned. Someone asked, and I said yes.
          </p>

          {/* The flower tile opens the page: something to play with before the grid. */}
          <div className="mt-12 max-w-[var(--col-media,1000px)]">
            <FlowerTile />
          </div>

          <div className="mt-16">
            <Playground preloadCount={3} />
          </div>
        </div>
      </section>

      <footer className="bg-dark-bg border-t border-white/5 py-8">
        <div className="max-w-[var(--page-max,1280px)] mx-auto px-[var(--page-gutter,32px)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            href="/"
            className="t-caption text-mauve hover:text-surface transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            ← Home
          </Link>
          <Wordmark size="16px" className="text-mauve" />
        </div>
      </footer>
    </main>
  );
}
