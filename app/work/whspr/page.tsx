import { T } from "@/components/casestudy2/tokens";
import { CaseStudyFooter } from "@/components/casestudy2/CaseStudyChrome";
import Nav from "@/components/ui/Nav";
import Section, { P, H2 } from "@/components/casestudy2/Section";
import ScreensRow from "@/components/casestudy2/ScreensRow";
import FeatureVisual from "@/components/casestudy2/FeatureVisual";
import QuoteCallout from "@/components/casestudy2/QuoteCallout";
import DecisionCard from "@/components/casestudy2/whspr/DecisionCard";
import FindingsBoard from "@/components/casestudy2/whspr/FindingsBoard";
import FeatureAsks from "@/components/casestudy2/whspr/FeatureAsks";
import ThreeWomen from "@/components/casestudy2/whspr/ThreeWomen";
import FrictionModel from "@/components/casestudy2/whspr/FrictionModel";
import SystemLoop from "@/components/casestudy2/whspr/SystemLoop";
import DesignSystemSlide from "@/components/casestudy2/whspr/DesignSystemSlide";
import WhereKnowledgeLives from "@/components/casestudy2/whspr/WhereKnowledgeLives";
import CaseStudyHeadline from "@/components/casestudy2/CaseStudyHeadline";
import ContextAndRole from "@/components/casestudy2/ContextAndRole";
import HeroVisual from "@/components/casestudy2/whspr/HeroVisual";
import IntroScreens from "@/components/casestudy2/whspr/IntroScreens";
import SectionIndex from "@/components/casestudy2/SectionIndex";
import LivePrototype from "@/components/casestudy2/LivePrototype";
import { CaseStudyShell, Prose, Media } from "../_components/columns";

export const metadata = {
  title: "Whspr | Simran Chhabra",
  description: "Whspr: a crowdsourced urban intelligence platform for women navigating NYC",
};

const AMBER = T.whspr.amber;

// Phone screens in public/whspr are 402px wide. PhoneMockup inlays the image
// inside a ~4.5% bezel, so these frame widths all stay under intrinsic size.
const PHONE_FEATURE = 294; // 30% under the original 420
const PHONE_PAIR = 280; // 30% under 400
const PHONE_ROW_2UP = 280; // 30% under 400

// Contents index, pinned in the left margin. Keep in step with the
// <Section> ids, numbers and headings below.
const SECTIONS = [
  { id: "context", number: "01", label: "Context" },
  { id: "research", number: "02", label: "Research" },
  { id: "insight", number: "03", label: "The Insight" },
  { id: "decisions", number: "04", label: "Design Decisions" },
  { id: "product", number: "05", label: "The Product" },
  { id: "landed", number: "06", label: "Where It Landed" },
  { id: "next", number: "07", label: "What I'd Do Next" },
  { id: "takeaway", number: "08", label: "What I Took Away" },
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
          <CaseStudyHeadline
            id="whspr-headline"
            headline="Whspr: Crowdsourced urban intelligence platform for women"
            meta={[
              { label: "Role", value: "UX Researcher • Product Strategist • Prototyping • Visual & Interaction Designer" },
              { label: "Platform", value: "Mobile Application" },
              { label: "Timeline", value: "4 months | Jan to May 2026" },
            ]}
          />

          <div className="mt-16">
            <ContextAndRole
              columns={[
                {
                  heading: "What is Whspr?",
                  body:
                    "Whspr is a mobile app that makes what women already know about places in the city findable, collecting short first-hand accounts instead of star ratings, and tagging each one with the time of the visit so you can tell what a place is actually like before you go.",
                },
                {
                  heading: "My Role",
                  body:
                    "I led this end to end: the interview study, the information architecture, the contribution flow, the trust and verification system, visual design system and a prototype using AI.",
                },
              ]}
            />
          </div>

          <a
            href="https://whsprforwomen.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-10 px-5 py-3 rounded-full"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              color: T.cream,
              backgroundColor: T.ink,
            }}
          >
            Try the live prototype ↗
          </a>
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
                apps, then went out and asked them. Three patterns kept coming back.
              </P>
            </Prose>
            <Media>
              <ThreeWomen />
            </Media>
          </Section>

          <Section id="insight" number="03" heading="The Insight">
            <Prose>
              <P>I set out to build a safety tool. The research told me I was solving the wrong problem.</P>
              <P>
                Women weren&apos;t asking for another app to warn them about danger. They already had
                that, and it wasn&apos;t working. What they wanted was the thing they were already
                giving each other in group chats: a sense of what a place actually feels like, at a
                certain time, for a certain kind of person.
              </P>
              <P>
                So I stopped designing a safety app. Women already notice things, tell each other,
                and warn each other. What they don&apos;t have is somewhere for all of that to live
                after the group chat moves on.
              </P>
            </Prose>
          </Section>

          <Section id="decisions" number="04" heading="Design Decisions">
            <Prose>
              <P>Four decisions, each one traced back to the research.</P>

            </Prose>
            <Media>
              <DecisionCard
                project="whsprLight"
                variant="notes"
                index={1}
                choice="No star ratings"
                insteadOf="A 1 to 5 score, like every other review platform"
                because="Knowing what to expect is what makes a new place feel okay, and a rating can't tell you that. It squashes everything into one number and loses the stuff you actually want to know: what the crowd was like, how the staff treated you, whether you'd go alone. So you leave a short first-hand account instead, tagged with the time you were there."              />
            </Media>
            <FeatureVisual
              kind="phone"
              phoneWidth={PHONE_FEATURE}
              images={[
                { src: "/projects/whspr/whspr/house-of-yes-contributions.png", alt: "House of Yes place profile with first-hand accounts and no star rating", pixelWidth: 402, pixelHeight: 977 },
              ]}
              headline="No stars anywhere"
              caption="House of Yes, read through what women said about it, each account tagged with when they went."
            />

            <Media>
              <DecisionCard
                project="whsprLight"
                variant="notes"
                index={2}
                choice="A day/night toggle"
                insteadOf="One profile per place, averaged across every hour"
                because="Somewhere well-lit and full of people at 6pm can feel completely different at 1am. Whspr keeps the two apart and lets you switch between them, so what you read matches the time you'll actually be there."              />
            </Media>
            <FeatureVisual
              kind="phone"
              pairWidth={PHONE_PAIR}
              images={[
                { src: "/projects/whspr/whspr/Place Profile/Daytime.png", alt: "Schmuck place profile, day mode", pixelWidth: 402, pixelHeight: 977, label: "Day" },
                { src: "/projects/whspr/whspr/Place Profile/NightTime.png", alt: "Schmuck place profile, night mode", pixelWidth: 402, pixelHeight: 977, label: "Night" },
              ]}
              headline="Same place, different time"
              caption="Schmuck at 6pm and at 1am. Same bar, different accounts."
            />

            <Media>
              <DecisionCard
                project="whsprLight"
                variant="notes"
                index={3}
                choice="Verification, without surveillance"
                insteadOf="Open posting, or an account tied to a real identity"
                because="This only works if the people posting are actually women. But the moment you ask for ID, people get nervous about posting at all. So I kept the two apart. You're verified once, when you sign up. After that your posts are anonymous, and nothing personal gets stored."              />
            </Media>
            <ScreensRow
              width={PHONE_ROW_2UP}
              screens={[
                { src: "/projects/whspr/whspr/verify-identity.png", alt: "Verify identity", caption: "Verify identity", pixelWidth: 402, pixelHeight: 874 },
                { src: "/projects/whspr/whspr/verification-pending.png", alt: "Verification pending", caption: "Verification pending", pixelWidth: 402, pixelHeight: 874 },
              ]}
            />

            <Media>
              <DecisionCard
                project="whsprLight"
                variant="notes"
                index={4}
                choice="Friction as a feature"
                insteadOf="An open text box, or a one-tap rating"
                because="You answer 5 prompts before you can post: have you been before, when you went, were you alone, what it's about, and then what happened. A few extra seconds from the person posting saves the next woman from guessing."              />
            </Media>
            <Prose>
              <P>
                When I asked one woman whether other people&apos;s experiences change where she goes, she
                said, &ldquo;It depends what the experience was, if it was a staff member that made the
                experience bad, or if it was just someone who was there.&rdquo; That difference is exactly
                what a star rating throws away, and it&apos;s what the prompts are there to capture. The
                cost is that posting takes longer, so whether people keep doing it at scale is the first
                thing I&apos;d test next.
              </P>
            </Prose>
            <Media>
              <FrictionModel />
            </Media>

            <Media>
              <SystemLoop />
            </Media>

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

          <Section id="product" number="05" heading="The Product">
            {/* The app's own onboarding first — the premise in the product's words,
                before the prototype asks anyone to use it. */}
            <IntroScreens />
            <Prose>
              <P>
                This is the working prototype, so go ahead and use it. Search a place, read what other
                women said about it, or post something yourself.
              </P>
            </Prose>
            <LivePrototype
              src="https://whsprforwomen.netlify.app/"
              title="Whspr interactive prototype"
            />
            <Prose>
              <QuoteCallout
                large
                italic={false}
                accent={AMBER}
                text="The interface had to do two things at once: let someone post what a place was like, and let someone else read it to decide whether to go. The whole design keeps those two jobs working together without letting either one flatten the other."
              />
              <P>
                You search a place and see what other women experienced there, tagged with when they
                went and what kind of visit it was. There&apos;s no score and no crime feed, only
                people who were actually there.
              </P>
            </Prose>
          </Section>

          <Section id="landed" number="06" heading="Where It Landed">
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
              caption="Testing the prototype in the kind of place these decisions actually get made. 10 women, 7 conversations, mostly on park benches."
            />
            <Prose>
              <P>
                To test the concept I took it out around Washington Square Park and the West Village.
                I talked to 10 women across 7 short conversations, plus 2 long-form interviews. Each street conversation followed the same order, suggested by Professor
                Bloom: validate the problem first, show the prototype second, ask about use last. That
                way people named the problem in their own words before they ever saw my solution.
              </P>

            </Prose>
            <Media>
              <FindingsBoard />
            </Media>
            <Prose>
              <P>
                The premise held up. Women already share this stuff, so I didn&apos;t need to invent
                a new behavior, just give it somewhere to go. And the problem was never a lack of
                information. People just didn&apos;t trust where it came from.
              </P>
              <P>
                <strong>The two who said no were right about something.</strong>{" "}One asked straight
                out why she&apos;d use this over reviews. The other doesn&apos;t own a smartphone, but
                while ruling herself out she described exactly who Whspr is for: someone new to the
                city, without a list of places she already trusts. Between them they scoped the
                product better than I had. Whspr is for people going somewhere they don&apos;t know
                yet.
              </P>
              <QuoteCallout
                accent={AMBER}
                large
                italic={false}
                text="If you've never been in an environment like that, how do you trust your instinct?"
                attribution="Interview participant"
              />
            </Prose>
          </Section>

          <Section id="next" number="07" heading="What I'd Do Next">
            <Prose>
              <P><strong>From places to routes.</strong> Nobody was asked what else Whspr should do. Getting home came up anyway, from more people than any feature I actually designed. For one woman, the trip home mattered more than anything about the venue. A Whspr layer over the map, where women could leave and read feedback along a route, is the most-requested thing I didn&apos;t build.</P>
            </Prose>
            <Media>
              <FeatureAsks />
            </Media>
            <Prose>
              <P><strong>Verification and inclusion.</strong> The verification I designed confirms identity but raises real questions I didn&apos;t resolve. Selfie and pose-based checks shut out low-vision users, and gender verification gets complicated fast for trans women, who Whspr is meant to include. I&apos;d want to talk to both groups before building any of it.</P>
              <P><strong>Trust at scale.</strong> A platform built on contributions is only as trustworthy as the people contributing. Guarding against coordinated manipulation and astroturfing is something I&apos;d need to design for before this could be real.</P>
            </Prose>
          </Section>

          <Section id="takeaway" number="08" heading="What I Took Away">
            <Prose>
              <P>
                Women already know this stuff. The apps around them just don&apos;t treat it as real.
                Whspr made me notice how much the default choices, like a star rating or a crime map,
                decide whose experience counts. Saying no to those defaults was the part of this
                project I cared about most.
              </P>
            </Prose>
          </Section>
        </div>
      </CaseStudyShell>

      <CaseStudyFooter />
    </main>
  );
}
