import Link from "next/link";
import { T } from "@/components/casestudy2/tokens";
import { CaseStudyFooter } from "@/components/casestudy2/CaseStudyChrome";
import Nav from "@/components/ui/Nav";
import PrototypeShell from "@/components/casestudy2/resy/PrototypeShell";
import { COL } from "../columns";

export const metadata = {
  title: "Resy Celebrations — Interactive Prototype — Simran Chhabra",
  description:
    "A working prototype of a large-party booking flow for groups of 8+, designed inside Resy's existing app. An independent student concept, not affiliated with or endorsed by Resy.",
};

/**
 * Standalone route for the prototype — the "open it on its own" destination that
 * used to be an external Surge URL. Same component the case study embeds, so
 * there is only one prototype to keep working.
 *
 * The root layout is the only layout in the app, so this page brings its own Nav
 * and footer, the way the case-study routes do.
 */
export default function ResyPrototypePage() {
  return (
    <main style={{ backgroundColor: T.cream }} className="min-h-screen overflow-x-hidden">
      <Nav />

      <div className="px-8 lg:px-16 pt-40 pb-24">
        <div style={{ maxWidth: COL.media }} className="mx-auto">
          <Link
            href="/work/resy"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: T.type.caption,
              color: T.inkMuted,
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            ← Back to the case study
          </Link>

          <h1
            className="mt-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: T.type.section,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: T.ink,
            }}
          >
            Resy Celebrations — prototype
          </h1>

          <p
            className="mt-4"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: T.type.body,
              lineHeight: 1.6,
              color: T.inkMuted,
              maxWidth: COL.text,
            }}
          >
            Both sides of the booking, running on the same data. Set your preferences, browse the
            matches that fit your party, and send a request — then open the restaurant&apos;s
            dashboard, answer your own inquiry, and watch your tracker move.
          </p>

          <div className="mt-12 flex justify-center">
            <PrototypeShell />
          </div>

          <p
            className="mt-8"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: T.type.caption,
              color: T.inkMuted,
              textAlign: "center",
            }}
          >
            An independent student concept. Not affiliated with or endorsed by Resy, and no real
            reservation is made.
          </p>
        </div>
      </div>

      <CaseStudyFooter />
    </main>
  );
}
