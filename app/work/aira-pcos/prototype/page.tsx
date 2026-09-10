import Link from "next/link";
import { T } from "@/components/casestudy2/tokens";
import { CaseStudyFooter } from "@/components/casestudy2/CaseStudyChrome";
import Nav from "@/components/ui/Nav";
import AiraPrototype from "@/components/casestudy2/aira/prototype/AiraPrototype";

export const metadata = {
  title: "AIRA Prototype | Simran Chhabra",
  description:
    "An end-to-end clickable prototype of AIRA, a cycle-aware health companion for people living with PMOS: onboarding, the Today dashboard, cycle, meals, activity, sleep and the energy check-in.",
};

/**
 * Standalone route for the AIRA prototype, mirroring /work/resy/prototype.
 * The root layout is the only layout in the app, so this page brings its own
 * Nav and footer, the way the case-study routes do.
 */
export default function AiraPrototypePage() {
  return (
    <main style={{ backgroundColor: T.cream }} className="min-h-screen overflow-x-hidden">
      <Nav />

      <div className="px-6 lg:px-16 pt-36 pb-24">
        <div style={{ maxWidth: 1000 }} className="mx-auto">
          <Link
            href="/work/aira-pcos"
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
            AIRA prototype
          </h1>

          <p
            className="mt-4 mb-12"
            style={{ fontFamily: "var(--font-body)", fontSize: T.type.body, lineHeight: 1.6, color: T.inkMuted, maxWidth: "60ch" }}
          >
            Tap through it like the real app: set up an account, land on Today, log a period, add a
            meal, or check in on a low-energy day and let it walk you into a breathing session. Use
            the list to jump straight to a flow.
          </p>

          <AiraPrototype />
        </div>
      </div>

      <CaseStudyFooter />
    </main>
  );
}
