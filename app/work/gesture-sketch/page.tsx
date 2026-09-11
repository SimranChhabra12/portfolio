import { T } from "@/components/casestudy2/tokens";
import { CaseStudyFooter } from "@/components/casestudy2/CaseStudyChrome";
import Nav from "@/components/ui/Nav";
import Section, { P, H3, DecisionBlock } from "@/components/casestudy2/Section";
import SectionIndex from "@/components/casestudy2/SectionIndex";
import QuoteCallout from "@/components/casestudy2/QuoteCallout";
import FeatureVisual from "@/components/casestudy2/FeatureVisual";
import HeroVisual from "@/components/casestudy2/gesture/HeroVisual";
import MethodStrip from "@/components/casestudy2/gesture/MethodStrip";
import AIMap from "@/components/casestudy2/gesture/AIMap";
import ThreeIdeas from "@/components/casestudy2/gesture/ThreeIdeas";
import LayoutStudy from "@/components/casestudy2/gesture/LayoutStudy";
import GestureLegend from "@/components/casestudy2/gesture/GestureLegend";
import { CaseStudyShell, Prose, Media } from "../_components/columns";

export const metadata = {
  title: "GestureSketch — Simran Chhabra",
  description:
    "An AI art therapist concept: research, a framework for where AI belongs, and one working prototype.",
};

const GREEN = T.gesture.green;
// The revised build, served as static files from public/prototypes/gesturesketch-v2.
const LIVE = "/prototypes/gesturesketch-v2/index.html";

// Keep in step with the <Section> ids, numbers and headings below.
const SECTIONS = [
  { id: "start", number: "01", label: "Where this started" },
  { id: "insight", number: "02", label: "Where AI belongs" },
  { id: "ideas", number: "03", label: "Three ideas, one built" },
  { id: "layouts", number: "04", label: "Five layouts, six people" },
  { id: "product", number: "05", label: "GestureSketch" },
  { id: "v2", number: "06", label: "From v1 to v2" },
  { id: "decisions", number: "07", label: "Design Decisions" },
  { id: "outcomes", number: "08", label: "What it does and doesn't" },
  { id: "next", number: "09", label: "What I'd do next" },
  { id: "takeaway", number: "10", label: "What I took away" },
];

const FIELDS = [
  { label: "Role", value: "Research, framework, interaction design, build" },
  { label: "Course", value: "NYU · UX & AI" },
  { label: "Scope", value: "Research, concept framework, working prototype" },
  { label: "Built with", value: "p5.js · MediaPipe HandPose" },
];

const DECISIONS = [
  {
    title: "Nothing you do is permanent",
    body: "The whole tool is built around this. Undo is a gesture, and clear is one tap. Every stroke keeps its own colour and size, so nothing you draw later can overwrite what's already there. People in the research kept saying they were afraid of ruining what they'd made, so the tool is built so that can't happen.",
  },
  {
    title: "A dead-zone on every gesture",
    body: "Small buffers around each pinch, so a shaky hand doesn't jitter into a mark you didn't mean. Hand tracking is noisy by default, and without a buffer, that noise looks like your own mistake.",
  },
  {
    title: "Undo and clear exist as real buttons too",
    body: "Not only as gestures. A visible way out makes it easier to experiment, and a gesture you can't see is one more thing to remember.",
  },
  {
    title: "A welcome screen with exactly one job",
    body: "Concept testing turned up the same freeze at the very start: people weren't sure which gesture actually draws. So the opening screen shows the three gestures and nothing else. No settings, no options, nothing to read past what you need to make your first mark. That way the camera doesn't come on before you know what to do.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-body)",
        fontSize: T.type.caption,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: T.inkMuted,
      }}
    >
      {children}
    </p>
  );
}

export default function GestureSketchPage() {
  return (
    <main style={{ backgroundColor: T.cream }} className="min-h-screen overflow-x-hidden">
      {/* The cover is cream, not a dark full-bleed band, so Nav keeps its default
          ink-on-cream treatment — no `coverId`. */}
      <Nav />
      <SectionIndex items={SECTIONS} alignWithId="gesture-headline" revealWithId="gesture-headline" />

      <HeroVisual />

      <CaseStudyShell className="pt-20">
        <div style={{ paddingBottom: T.space.section }}>
          <Eyebrow>2025 · AI art therapist · Concept, one piece built</Eyebrow>
          <h1
            id="gesture-headline"
            className="t-display"
            style={{ color: T.ink, margin: "1.5rem 0" }}
          >
            GestureSketch: making it easier to start drawing
          </h1>
          <Prose>
            <P large>
              A lot of people find it hard to start drawing, often because on paper one wrong line feels permanent. I wanted to see if AI could help with the mechanics of drawing without taking over the meaning. I mapped where AI should help and where it shouldn&apos;t, came up with three ideas, and built one.
            </P>
          </Prose>

          <a
            href={LIVE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 pb-1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: T.type.caption,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: GREEN,
              borderBottom: `1px solid ${GREEN}66`,
            }}
          >
            Try the live prototype <span aria-hidden>↗</span>
          </a>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16">
            {FIELDS.map((f) => (
              <div key={f.label}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: T.type.caption,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: T.inkMuted,
                    marginBottom: "0.5rem",
                  }}
                >
                  {f.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    color: T.ink,
                    lineHeight: 1.5,
                  }}
                >
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CaseStudyShell>

      <CaseStudyShell>
        <div className="flex flex-col min-w-0">
          <Section id="start" number="01" heading="Where this started" first>
            <Prose>
              <P>
                I kept coming back to one thing about art therapy: everyone I talked to believed it
                could help them, and almost no one actually did it.
              </P>
              <P>
                So I ran 7 interviews and a short survey to find out where the gap was. Most people said the same thing: they didn&apos;t know how to start. They&apos;d sit down to do
                something creative and feel stuck before they&apos;d made a single mark. A lot of them
                were anxious about being bad at it, worried the thing they made would be judged, or
                would just prove they couldn&apos;t draw. And the younger people I spoke to
                didn&apos;t really want a person in the room for this. They wanted something private,
                on their own time, no one watching.
              </P>
            </Prose>
            <Media>
              <MethodStrip />
            </Media>
          </Section>

          <Section id="insight" number="02" heading="Where AI belongs">
            <Prose>
              <P>
                People wanted support, but the moment AI did too much, the drawing stopped being
                theirs. If the AI smooths every line and fixes every shape, the drawing stops really being yours, and the point of art therapy is that what you make comes from you.
              </P>
              <P>
                So I mapped it before designing anything. One axis: how much a moment should lean on
                AI. The other: whether it&apos;s mechanical or personal. Getting started, loosening up and the tools were things AI could help with. The choices, the reflection and what the piece is about needed to stay with the person. A few things sit in between, where
                AI helps but you stay in control.
              </P>
            </Prose>
            <Media>
              <AIMap />
            </Media>
            <Prose>
              <QuoteCallout
                text="Build the parts that make starting easier, and leave the meaning alone."
                accent={GREEN}
                large
              />
            </Prose>
          </Section>

          <Section id="ideas" number="03" heading="Three ideas, one built">
            <Prose>
              <P>The map pointed to three ideas, each for a different moment in a session.</P>
            </Prose>
            <Media>
              <ThreeIdeas />
            </Media>
            <Prose>
              <P>
                I built the first one. Starting was the problem almost everyone named, so that&apos;s where I thought a working prototype would be most useful.
              </P>
              <P>
                I did try the prompt assistant, then cut it. The therapists kept saying people need to
                draw without being interrupted, and the AI prompts fought the quiet the drawing was
                there to create.
              </P>
            </Prose>
          </Section>

          <Section id="layouts" number="04" heading="Five layouts, six people">
            <Prose>
              <P>
                With the concept decided, I sketched five layouts, each
                with the tools and the AI in a different place, and showed them to 6 people one at a
                time.
              </P>
            </Prose>
            <Media>
              <LayoutStudy />
            </Media>
            <Prose>
              <P>
                I was looking for where they agreed, and they agreed on a lot. Colour and stroke size
                belong together, not on opposite sides of the screen. Save and clear belong together
                too, and away from everything else, so you don&apos;t hit one when you meant the
                other. The prompt had to stay on the same screen, because people said they&apos;d forget it
                if it opened another page. The camera window should be the biggest thing. And undo
                came up a lot, and some people wanted it as a gesture rather than a button to hunt for.
              </P>
              <P>
                Most people preferred Layout 5, so I built from it and added the fixes they named.
              </P>
            </Prose>
          </Section>

          <Section id="product" number="05" heading="GestureSketch">
            <Prose>
              <P>
                A webcam turns your hand into a brush. Pinch thumb and index to draw, tap thumb and
                ring to change colour, tap thumb and pinky to undo. There&apos;s no stylus and no menus to learn.
              </P>
            </Prose>
            <Media>
              <FeatureVisual
                kind="plain"
                plainMaxWidth={1000}
                images={[
                  {
                    src: "/images/gesture-sketch/canvas.jpg",
                    alt: "The GestureSketch canvas mid-drawing, with a green hand-drawn line and one red mark, with brush size, undo, clear and save above it",
                    pixelWidth: 2000,
                    pixelHeight: 1200,
                  },
                ]}
                headline="The canvas, mid-drawing"
                caption="Every stroke keeps the colour and size it was drawn with, so nothing you make later can overwrite it."
              />
            </Media>
            <Prose>
              <P>
                It opens on a welcome screen that shows you the three gestures before you start, so
                the camera never turns on cold.
              </P>
            </Prose>
            <Media>
              <GestureLegend />
            </Media>
          </Section>

          <Section id="v2" number="06" heading="From v1 to v2">
            <Prose>
              <P>
                When I handed in the first version it was still a work in progress. It had
                latency issues, and the drawing didn&apos;t always keep up with your hand. I knew
                that going in. It was a bug I had in mind the whole time, so after the class ended I
                went back to fix it.
              </P>
              <P>
                In v1 the same pinch distance started and stopped a line, so if your fingers
                drifted a little mid-stroke the line could drop out. Now a pinch has to be tight to
                start a line but only loosely closed to keep going. Your hand can relax once
                you&apos;re drawing. I also stopped recording points that sit almost on top of each
                other, which was making curves overshoot.
              </P>
              <P>
                The second thing was that you couldn&apos;t tell what the camera thought you were
                doing. v1 gave you nothing until a line appeared, or didn&apos;t. Now there&apos;s a
                small badge at the top that says drawing, colour or undo as it happens, so when
                something goes wrong you know whether it was your hand or the tracking.
              </P>
              <P>
                The tools moved too. Colour, brush size, undo, clear and save sit in one bar along
                the bottom, and the colours are swatches you can see instead of one dot you had to
                cycle through blind.
              </P>
              <P>
                And I added flowers, just for fun. Make a fist and they burst up from your hand.
                Wave and they rain down the canvas. They don&apos;t do anything useful. I&apos;d
                wanted them since the start of the project, and I like adding a bit of fun to
                everything I make.
              </P>
              <P>
                The welcome screen stayed, it just shows all five gestures now.
              </P>
            </Prose>
          </Section>

          <Section id="decisions" number="07" heading="Design Decisions">
            <Prose>
              <P>
                Four decisions, each traceable to something the research or the concept tests turned
                up.
              </P>
            </Prose>
            {DECISIONS.map((d, i) => (
              <Prose key={d.title}>
                <DecisionBlock index={i + 1} title={d.title} body={d.body} accent={GREEN} />
              </Prose>
            ))}
          </Section>

          <Section id="outcomes" number="08" heading="What it does and doesn't">
            <Prose>
              <P>
                GestureSketch is a working prototype, not a finished product, and it&apos;s the one
                piece of the larger concept I actually built. It&apos;s meant to make starting feel less intimidating. But it&apos;s early, and I haven&apos;t tested it in a real therapy session with a client yet.
              </P>
              <P>
                The closest I got was showing it to Tanak Bajaj, an art therapist in London, who saw
                the thing I was hoping for:
              </P>
              <QuoteCallout
                text="Clients simply move their hands to express what they're feeling, and I can watch their creations unfold in real time. It really bridges the gap that screens often put between therapist and client."
                attribution="Tanak Bajaj, art therapist"
                accent={GREEN}
              />
              <P>
                That&apos;s one therapist&apos;s reaction, not a study, so whether it holds up in actual therapy is still an open question.
              </P>
            </Prose>
          </Section>

          <Section id="next" number="09" heading="What I'd do next">
            <Prose>
              <P>
                I&apos;d try prompts again, but built the opposite way from the ones I cut. The
                version I removed interrupted you mid-drawing. A better one would wait until you asked for it, next to the canvas, so it&apos;s there when you&apos;re stuck and out of the way when you&apos;re not.
              </P>
              <P>
                I&apos;d add gesture-triggered shapes, so a pinch could pull in a simple circle or
                wave to build from when a blank canvas still feels like too much. And the real next
                step is proper testing with therapists and their clients, to find out whether any of
                this actually helps where it counts.
              </P>
            </Prose>
          </Section>

          <Section id="takeaway" number="10" heading="What I took away">
            <Prose>
              <H3>What cutting the prompts taught me</H3>
              <P>
                The thing I keep coming back to is the feature I removed. I built an AI prompt
                assistant that pushed suggestions on you while you were drawing, and it fought the
                quiet the drawing was supposed to create, so I took it out. It showed me that AI can have a place here, as long as the person decides when it speaks.
              </P>
            </Prose>
          </Section>
        </div>
      </CaseStudyShell>

      <CaseStudyFooter />
    </main>
  );
}
