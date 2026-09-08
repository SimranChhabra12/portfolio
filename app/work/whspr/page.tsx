import { T } from "@/components/casestudy2/tokens";
import { CaseStudyFooter } from "@/components/casestudy2/CaseStudyChrome";
import Nav from "@/components/ui/Nav";
import Section, { P, Caption, H2 } from "@/components/casestudy2/Section";
import ScreensRow from "@/components/casestudy2/ScreensRow";
import FeatureVisual from "@/components/casestudy2/FeatureVisual";
import QuoteCallout from "@/components/casestudy2/QuoteCallout";
import GapDiagram from "@/components/casestudy2/whspr/GapDiagram";
import DecisionCard from "@/components/casestudy2/whspr/DecisionCard";
import FindingsBoard from "@/components/casestudy2/whspr/FindingsBoard";
import KilledKept from "@/components/casestudy2/whspr/KilledKept";
import DesignSystemSlide from "@/components/casestudy2/whspr/DesignSystemSlide";
import WhereKnowledgeLives from "@/components/casestudy2/whspr/WhereKnowledgeLives";
import ProjectHeadline from "@/components/casestudy2/whspr/ProjectHeadline";
import WhatAndRole from "@/components/casestudy2/whspr/WhatAndRole";
import HeroVisual from "@/components/casestudy2/whspr/HeroVisual";
import IntroScreens from "@/components/casestudy2/whspr/IntroScreens";
import SectionIndex from "@/components/casestudy2/SectionIndex";
import DeckSlide from "@/components/casestudy2/DeckSlide";
import LivePrototype from "@/components/casestudy2/LivePrototype";
import { CaseStudyShell, Prose, Media } from "../_components/columns";

export const metadata = {
  title: "Whspr — Simran Chhabra",
  description: "Whspr: a crowdsourced urban intelligence platform for women navigating NYC",
};

const AMBER = T.whspr.amber;

// Deck slides are 960x540 natively — never render them wider than that.
const DECK_W = 960;
// Phone screens in public/whspr are 402px wide. PhoneMockup inlays the image
// inside a ~4.5% bezel, so these frame widths all stay under intrinsic size.
const PHONE_FEATURE = 420;
const PHONE_PAIR = 400;
const PHONE_ROW_3UP = 316; // 3 x 316 + 2 x 24 gap = 1000
const PHONE_ROW_2UP = 400;

// Contents index, pinned in the left margin. Keep in step with the
// <Section> ids, numbers and headings below.
const SECTIONS = [
  { id: "context", number: "01", label: "Context" },
  { id: "research", number: "02", label: "Research" },
  { id: "decisions", number: "03", label: "Design Decisions" },
  { id: "product", number: "04", label: "The Product" },
  { id: "testing", number: "05", label: "Testing It on the Street" },
  { id: "next", number: "06", label: "What I'd Do Next" },
  { id: "takeaway", number: "07", label: "What I Took Away" },
];

export default function WhsprPage() {
  return (
    <main style={{ backgroundColor: T.cream }} className="min-h-screen overflow-x-hidden">
      <Nav coverId="whspr-cover" />
      <SectionIndex items={SECTIONS} alignWithId="whspr-headline" revealWithId="whspr-headline" />

      {/* Cover band — top ~30% of the first screen */}
      <HeroVisual />

      {/* Hero */}
      <CaseStudyShell className="pt-20">
        <div style={{ paddingBottom: T.space.section }}>
          <ProjectHeadline />

          {/* The app's own onboarding, in the cover's palette — the premise stated in the
              product's words before the case study starts explaining it. */}
          <div className="mt-14">
            <IntroScreens />
          </div>

          <div className="mt-20">
            <WhatAndRole />
          </div>
        </div>
      </CaseStudyShell>

      <CaseStudyShell>
        <div className="flex flex-col min-w-0">
          <Section id="context" number="01" heading="Context" first>
            <Prose>
              <P>
                Women already share knowledge about places all the time. Before going somewhere new,
                they&apos;ll text a friend, check a neighborhood subreddit, or read reviews to get a
                sense of what a place is actually like. But that knowledge is scattered and it
                disappears fast. It lives in group chats and comment threads, and none of it is
                anywhere you can actually find when you need it.
              </P>
              <P>
                <strong>
                  There&apos;s no interface designed to support collective sensemaking around
                  women&apos;s perceived safety in public spaces.
                </strong>
              </P>
            </Prose>
          </Section>

          <Section id="research" number="02" heading="Research">
            <Media>
              <WhereKnowledgeLives />
            </Media>
            <Prose>
              <P>
                I began by researching why women still resort to the whisper network in the age of
                apps, then went out and asked them. My first build carried three conventional
                assumptions, and all three did the same thing — they tried to manage women&apos;s
                knowledge instead of making room for it. None survived to v2.
              </P>
            </Prose>
            <Media>
              <KilledKept />
            </Media>
            <Prose>
              <P>
                What that participant was describing costs more than accuracy. Reading danger off
                appearance is what keeps women out of entire neighborhoods they would otherwise
                enjoy — and a crime-statistics layer would have encoded exactly that.
              </P>
            </Prose>
            <Media>
              <GapDiagram />
            </Media>
            <Prose>
              <P>I set out to build a safety tool. The research told me I was solving the wrong problem.</P>
              <P>
                Women weren&apos;t asking for another app to warn them about danger. They already had
                that, and it wasn&apos;t working. What they wanted was the thing they were already
                giving each other in group chats: a sense of what a place actually feels like, at a
                certain time, for a certain kind of person.
              </P>
              <P>
                That reframed everything. Whspr wasn&apos;t a safety problem. It was a knowledge
                problem. Women already do the work of noticing, sharing, and warning each other.
                What&apos;s missing is anywhere for that knowledge to live.
              </P>
            </Prose>
          </Section>

          <Section id="decisions" number="03" heading="Design Decisions">
            <Prose>
              <P>Four decisions, each traceable to something a participant said or something the literature settled.</P>

            </Prose>
            <Media>
              <DecisionCard
                index={1}
                choice="No star ratings"
                insteadOf="A 1–5 score, like every other review platform"
                because="Familiarity — knowing what to expect — is what makes a place navigable. A rating flattens that into one number and strips out the context that builds it: what the crowd was like, how the staff treated you, whether it felt okay to be there alone. Instead you leave a short first-hand account, tagged with the time you were there."
                research="Dubey et al., 2025"
                voice={{
                  quote: "Avoid it becoming a social platform. The more social it becomes, the less trustworthy it will be.",
                  attribution: "Interview participant, unprompted",
                }}
              />
            </Media>
            <FeatureVisual
              kind="phone"
              phoneWidth={PHONE_FEATURE}
              images={[
                { src: "/projects/whspr/whspr/house-of-yes-contributions.png", alt: "House of Yes place profile — first-hand signals, no star rating", pixelWidth: 402, pixelHeight: 977 },
              ]}
              headline="Signals, not scores"
              caption="First-hand accounts, tagged with time and context — no star rating in sight."
            />

            <Media>
              <DecisionCard
                index={2}
                choice="A day/night toggle"
                insteadOf="One profile per place, averaged across every hour"
                because="Somewhere well-lit and full of people at 6pm can feel completely different at 1am. Whspr keeps the two apart and lets you switch between them, so what you read matches the time you'll actually be there."
                voice={{
                  quote: "Even just knowing what time of day a place is really, really busy.",
                  attribution: "Interview participant, before being shown the prototype",
                }}
              />
            </Media>
            <FeatureVisual
              kind="phone"
              pairWidth={PHONE_PAIR}
              images={[
                { src: "/projects/whspr/whspr/Place Profile/Daytime.png", alt: "Schmuck place profile, day mode", pixelWidth: 402, pixelHeight: 977, label: "Day" },
                { src: "/projects/whspr/whspr/Place Profile/NightTime.png", alt: "Schmuck place profile, night mode", pixelWidth: 402, pixelHeight: 977, label: "Night" },
              ]}
              headline="Same place, different time"
              caption="The Schmuck place profile, toggled between day and night — different signals, different tags."
            />

            <Media>
              <DecisionCard
                index={3}
                choice="Verification, without surveillance"
                insteadOf="Open posting, or an account tied to a real identity"
                because="A platform built on women's experiences only works if the people posting them are women — but verification cuts against the privacy that makes people willing to post. So the two are kept apart. Identity is confirmed at the door, posts stay anonymous, and nothing personal is collected or stored."
                voice={{
                  quote: "How are you gonna be confirming that? Does a human look through all the submissions?",
                  attribution: "Street participant, unprompted, on the women-only framing",
                }}
              />
            </Media>
            <ScreensRow
              width={PHONE_ROW_3UP}
              screens={[
                { src: "/projects/whspr/whspr/sign-in.png", alt: "Sign in", caption: "Sign in", pixelWidth: 402, pixelHeight: 874 },
                { src: "/projects/whspr/whspr/create-account.png", alt: "Create account", caption: "Create account", pixelWidth: 402, pixelHeight: 874 },
                { src: "/projects/whspr/whspr/auth-gate.png", alt: "Auth gate", caption: "Auth gate", pixelWidth: 402, pixelHeight: 874 },
                { src: "/projects/whspr/whspr/verify-identity.png", alt: "Verify identity", caption: "Verify identity", pixelWidth: 402, pixelHeight: 874 },
                { src: "/projects/whspr/whspr/verification-pending.png", alt: "Verification pending", caption: "Verification pending", pixelWidth: 402, pixelHeight: 874 },
              ]}
            />

            <Media>
              <DecisionCard
                index={4}
                choice="Friction as a feature"
                insteadOf="An open text box, or a one-tap rating"
                because="Five prompts before you can submit: whether you've been there before, when you went, whether you were alone, what the observation is about, and the observation itself. It also answers something a participant raised — that a bad experience caused by a staff member and one caused by another customer mean completely different things, and a single score can't tell them apart."
                research="Nissenbaum, on contribution quality"
                voice={{
                  quote: "How often are you gonna be like, 'let's take a picture'?",
                  attribution: "Interview participant — the objection I designed against",
                  stance: "challenges",
                }}
              />
            </Media>
            <Prose>
              <P>
                She was pointing at the real risk: a platform with no contributions is worth nothing,
                and I was proposing to make contributing <em>harder</em>. I took the bet anyway. Four
                thin, structured accounts are more useful than forty ratings, and the structure
                signals to the person posting that their input is worth something. Whether that holds
                at scale is genuinely unresolved.
              </P>
            </Prose>
            <FeatureVisual
              kind="plain"
              plainMaxWidth={DECK_W}
              images={[
                { src: "/projects/whspr/whspr-deck/friction-as-a-feature.png", alt: "The five-step contribution flow: type of user, time, company details, category of observation, observation", pixelWidth: 960, pixelHeight: 540 },
              ]}
              headline="The contribution friction model"
              caption="Five quick prompts before you can submit — deliberately more than a rating takes."
            />
            <Prose>
              <Caption>The flow also includes a voice input option, so someone can speak their experience instead of typing it.</Caption>
            </Prose>
            <ScreensRow
              width={PHONE_ROW_3UP}
              screens={[
                { src: "/projects/whspr/whspr/mic-off.png", alt: "Voice input off", caption: "Voice input off", pixelWidth: 402, pixelHeight: 1041 },
                { src: "/projects/whspr/whspr/mic-on.png", alt: "Voice input on", caption: "Voice input on", pixelWidth: 402, pixelHeight: 1041 },
                { src: "/projects/whspr/whspr/post-submission.png", alt: "Submitted", caption: "Submitted", pixelWidth: 402, pixelHeight: 874 },
              ]}
            />

            <DeckSlide
              src="/projects/whspr/whspr-deck/information-architecture.png"
              alt="Information Architecture: Search, Read, Contribute, Surface, plus the system layer rule — contributions older than 6 months fade, places with under 4 contributions show an early-data warning"
              caption="How the system holds it together — search, read, contribute, surface"
              maxWidth={DECK_W}
            />

            <Prose>
              <H2>The design system</H2>
              <P>
                Whspr runs on a dark, calm interface, built to feel like a quiet resource rather than
                an alarm. A Midnight base, a single Signal Amber accent, and DM Serif Display paired
                with DM Sans.
              </P>
            </Prose>
            <Media>
              <DesignSystemSlide />
            </Media>
          </Section>

          <Section id="product" number="04" heading="The Product">
            <Prose>
              <P>
                This is the actual working prototype, not a video. Search a place, read what other
                women said about it, or walk through the contribution flow yourself.
              </P>
            </Prose>
            <LivePrototype
              src="https://tubular-marigold-4011ba.netlify.app/"
              title="Whspr — interactive prototype"
            />
            <Prose>
              <QuoteCallout
                large
                accent={AMBER}
                text="The interface had to do two things at once: let someone post what a place was like, and let someone else read it to decide whether to go. The whole design keeps those two jobs working together without letting either one flatten the other."
              />
              <P>
                You search a place and see what other women actually experienced there, tagged with
                the time they went and the kind of visit it was. No score, no crime feed. Just
                first-hand accounts from people who were there.
              </P>
            </Prose>
            <FeatureVisual
              kind="phone"
              phoneWidth={PHONE_FEATURE}
              images={[
                { src: "/projects/whspr/whspr/area-info-expanded.png", alt: "Area Info, expanded", pixelWidth: 402, pixelHeight: 977 },
              ]}
              headline="Area Info"
              caption="What's open nearby, right now — well lit or not, busy or not."
            />
            <ScreensRow
              width={PHONE_ROW_2UP}
              screens={[
                { src: "/projects/whspr/whspr/search.png", alt: "Search results for \"bars in lower east side\"", caption: "Search", pixelWidth: 402, pixelHeight: 1088 },
                { src: "/projects/whspr/whspr/laser-wolf.png", alt: "Laser Wolf place profile with first-hand signals", caption: "Place profile", pixelWidth: 402, pixelHeight: 977 },
              ]}
            />
          </Section>

          <Section id="testing" number="05" heading="Testing It on the Street">
            <FeatureVisual
              kind="plain"
              plainMaxWidth={1000}
              images={[
                {
                  src: "/projects/whspr/wsq-guerrilla-research.jpg",
                  alt: "Simran standing beside a bench in Washington Square Park at night, mid-conversation with two women during guerrilla research",
                  pixelWidth: 2000,
                  pixelHeight: 1333,
                },
              ]}
              headline="Washington Square Park, after dark"
              caption="Testing the prototype where the decisions actually get made — ten women, seven conversations, one park bench at a time."
            />
            <Prose>
              <P>
                To pressure-test the concept I took it out around Washington Square Park and the West
                Village — ten women across seven short conversations — alongside two long-form
                interviews. Each street conversation followed the same order, suggested by Professor
                Bloom: validate the problem first, show the prototype second, ask about use last. That
                way people named the problem in their own words before they ever saw my solution.
              </P>

            </Prose>
            <Media>
              <FindingsBoard />
            </Media>
            <Prose>
              <P>
                The premise held: women already share this knowledge, so the job was building
                infrastructure for it, not inventing a behavior. What&apos;s broken isn&apos;t
                coverage — it&apos;s trust in the source.
              </P>
              <P>
                <strong>The two who said no were right about something.</strong> One named the
                differentiation problem outright. The other doesn&apos;t own a smartphone — but in
                ruling herself out, she described exactly who Whspr is for: someone without a set of
                places they already trust. Between them they scoped the product better than I had.
                Whspr isn&apos;t for everyone in New York. It&apos;s for people going somewhere they
                don&apos;t know yet.
              </P>
              <QuoteCallout
                accent={AMBER}
                large
                text="If you've never been in an environment like that, how do you trust your instinct?"
                attribution="Interview participant"
              />
            </Prose>
          </Section>

          <Section id="next" number="06" heading="What I'd Do Next">
            <Prose>
              <P><strong>From places to routes.</strong> More participants asked for this than for any product feature — for one, the journey home was her single biggest factor in deciding whether to go out at all, ahead of anything about the venue. A Whspr layer over the map itself, where women could leave and read feedback along a route, is the most-requested thing I didn&apos;t build.</P>
              <P><strong>Verification and inclusion.</strong> The verification I designed confirms identity but raises real questions I didn&apos;t resolve. Selfie and pose-based checks exclude low-vision users, and gender verification is genuinely complicated for trans women, who the platform is meant to include. Getting this right matters more than getting it fast.</P>
              <P><strong>Trust at scale.</strong> A platform built on contributions is only as trustworthy as the people contributing. Guarding against coordinated manipulation and astroturfing is something I&apos;d need to design for before this could be real.</P>
            </Prose>
          </Section>

          <Section id="takeaway" number="07" heading="What I Took Away">
            <Prose>
              <P>
                Women already hold this knowledge. The systems built around them just haven&apos;t
                treated it as real. What Whspr taught me is that the defaults we design with, the
                ones that feel neutral, quietly decide whose experience counts. The work I care about
                most was refusing them, and building something that treats what women already know as
                real.
              </P>
            </Prose>
          </Section>
        </div>
      </CaseStudyShell>

      <CaseStudyFooter />
    </main>
  );
}
