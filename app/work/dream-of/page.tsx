import { T } from "@/components/casestudy2/tokens";
import { CaseStudyFooter } from "@/components/casestudy2/CaseStudyChrome";
import Nav from "@/components/ui/Nav";
import SectionIndex from "@/components/casestudy2/SectionIndex";
import CaseStudyHeadline from "@/components/casestudy2/CaseStudyHeadline";
import ContextAndRole from "@/components/casestudy2/ContextAndRole";
import HeroCover from "@/components/casestudy2/dreamof/HeroCover";
import CaseStudyBlocks from "@/components/interactive/CaseStudyBlocks";
import { getCaseStudy } from "@/data/caseStudies";
import { CaseStudyShell, COL_TEXT } from "../_components/columns";

export const metadata = {
  title: "Dream Of — Simran Chhabra",
  description:
    "Research and the first e-commerce experience for Dream Of, a haircare brand.",
};

// Promoted out of the data-driven [slug] template so it can carry the same format
// as the other case studies — pinned index, full-bleed cover, claim headline, and
// the What/My Role pair. The chapter *content* still comes from data/caseStudies.ts
// and renders through the same CaseStudyBlocks, so the writing has one home and
// this route didn't fork a second copy of it.
const project = getCaseStudy("dream-of")!;

const SECTIONS = project.sections.map((s) => ({
  id: s.id,
  number: s.number,
  label: s.heading,
}));

export default function DreamOfPage() {
  return (
    <main style={{ backgroundColor: T.cream }} className="min-h-screen overflow-x-hidden">
      <Nav coverId="dream-of-cover" />
      <SectionIndex items={SECTIONS} alignWithId="dream-of-headline" revealWithId="dream-of-headline" />

      {/* Cover band */}
      <HeroCover />

      {/* Hero */}
      <CaseStudyShell className="pt-20">
        <div style={{ paddingBottom: T.space.section }}>
          <CaseStudyHeadline
            id="dream-of-headline"
            headline="Dream Of: A haircare shop organised around your hair, not their product categories"
            meta={[
              { label: "Role", value: "Product Design Intern — UX Research • Information Architecture • E-commerce" },
              { label: "Platform", value: "Web — direct-to-consumer storefront" },
              { label: "Timeline", value: "3 months | Jun – Aug 2025" },
            ]}
          />

          <div className="mt-20">
            <ContextAndRole
              columns={[
                {
                  heading: "What is Dream Of?",
                  body:
                    "Dream Of is a haircare brand, and this was its first e-commerce experience. Almost nobody we surveyed described what they wanted in product categories — they described it in hair. So the shop is built around hair type and concern rather than shampoo/mask/serum, and the whole page is structured as proof, because a dry shampoo is a product people don't believe works until they're shown.",
                },
                {
                  heading: "My Role",
                  body:
                    "I ran the research — surveys, interviews and usability testing — and turned it into the information architecture and the storefront itself: how the range is organised, how the claims are evidenced, and how a first-time visitor gets from their own hair to the right jar.",
                },
              ]}
            />
          </div>
        </div>
      </CaseStudyShell>

      <CaseStudyShell>
        <div className="flex flex-col min-w-0">
          {project.sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className={`scroll-mt-32 ${i < project.sections.length - 1 ? "border-b border-ink/10" : ""}`}
              style={{ paddingTop: T.space.section, paddingBottom: T.space.section }}
            >
              <div className="flex items-baseline gap-4 mb-8">
                <span className="t-caption text-mauve">{section.number}</span>
                <p className="label text-mauve">{section.heading}</p>
              </div>

              {section.empty ? (
                <div
                  className="border border-dashed border-ink/20 px-8 py-12"
                  style={{ maxWidth: COL_TEXT, borderRadius: "var(--radius-card, 4px)" }}
                >
                  <p className="t-body text-mauve !max-w-none">
                    Coming soon — this section hasn&apos;t been written yet.
                  </p>
                </div>
              ) : (
                <CaseStudyBlocks blocks={section.blocks ?? []} color={project.color} />
              )}
            </section>
          ))}
        </div>
      </CaseStudyShell>

      <CaseStudyFooter />
    </main>
  );
}
