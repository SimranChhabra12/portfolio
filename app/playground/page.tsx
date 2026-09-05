import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/ui/Nav";
import Playground from "@/components/interactive/Playground";

export const metadata: Metadata = {
  title: "Playground — Simran Chhabra",
  description:
    "Styling, art direction, photography and events — the work Simran Chhabra makes outside product design.",
};

export default function PlaygroundIndexPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />

      {/*
        No py-* utility on the grid section: the section rhythm in globals.css (§4) owns
        vertical spacing. pt-40 is here only to clear the fixed nav.
      */}
      <section className="px-[var(--page-gutter,32px)] pt-40 pb-24">
        <div className="max-w-[var(--page-max,1280px)] mx-auto">
          <Link
            href="/"
            className="t-caption text-mauve hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            ← Home
          </Link>

          <h1 className="t-heading text-ink !max-w-none mt-6">Playground</h1>

          <div className="mt-16">
            <Playground preloadCount={3} />
          </div>
        </div>
      </section>

      <footer className="bg-dark-bg border-t border-white/5 py-8 px-[var(--page-gutter,32px)]">
        <div className="max-w-[var(--page-max,1280px)] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            href="/"
            className="t-caption text-mauve hover:text-surface transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            ← Home
          </Link>
          <span className="font-serif text-[16px] text-mauve">Simran Chhabra</span>
        </div>
      </footer>
    </main>
  );
}
