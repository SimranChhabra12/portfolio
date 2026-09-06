import { T } from "@/components/casestudy2/tokens";
import { CaseStudyNav, CaseStudyFooter } from "@/components/casestudy2/CaseStudyChrome";
import Section, { P, List, DecisionBlock, Caption, H2 } from "@/components/casestudy2/Section";
import ScreensRow from "@/components/casestudy2/ScreensRow";
import FeatureVisual from "@/components/casestudy2/FeatureVisual";
import QuoteCallout from "@/components/casestudy2/QuoteCallout";
import GapDiagram from "@/components/casestudy2/whspr/GapDiagram";
import DesignSystemSlide from "@/components/casestudy2/whspr/DesignSystemSlide";
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

export default function WhsprPage() {
  return (
    <main style={{ backgroundColor: T.cream }} className="min-h-screen overflow-x-hidden">
      <CaseStudyNav />

      {/* Hero */}
      <CaseStudyShell className="pt-40">
        <div style={{ paddingBottom: T.space.section }}>
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: T.type.caption,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: T.inkMuted,
            }}
          >
            4 months (Jan 2026 – May 2026) · Mobile Application
          </p>
          <h1 className="t-display" style={{ color: T.ink, marginBottom: "1.5rem" }}>
            Whspr
          </h1>
          <Prose>
            <P large>
              A crowdsourced urban intelligence platform for women navigating NYC.
            </P>
            <P>
              I led this end to end — the interview study, the information architecture, the
              contribution flow, the trust and verification system, and the visual design system.
              I also designed and built the working prototype myself, solo, in Claude Code, so the
              product decisions and the technical ones were the same set of decisions. Building it
              meant I couldn&apos;t hand-wave the hard parts: the schema, the trust scoring, and the
              API integrations all had to actually work.
            </P>
          </Prose>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-16">
            {[
              { label: "Hats Worn", value: "Product Design, UX Research, Product Strategy, Prototyping, UI Design" },
              { label: "Platform", value: "Mobile Application" },
              { label: "Timeline", value: "4 months" },
            ].map((f) => (
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
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: T.ink, lineHeight: 1.5 }}>
                  {f.value}
                </p>
              </div>
            ))}
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

          <Section id="reframe" number="02" heading="The Reframe">
            <Prose>
              <P>
                I began by researching why women still resort to the whisper network in the age of
                apps, then went out and asked them. My first build carried some conventional
                assumptions:
              </P>
              <List
                accent={AMBER}
                items={[
                  "Crime statistics and population density layered onto search",
                  "AI pose detection for verification",
                  "An LLM to summarize contributions",
                ]}
              />
              <P>
                All three did the same thing: they tried to manage women&apos;s knowledge instead of
                just making room for it. The research made the case against them better than I could.
                One participant drew the line precisely — what actually signals danger is behavior
                directed at you, not who happens to be nearby.
              </P>
              <QuoteCallout
                accent={AMBER}
                text="Not just being present in a space, but start outwardly doing things towards me."
              />
              <P>
                She went further, on how women learn to read danger off appearance rather than
                action, and what that costs: fear that keeps women out of entire neighborhoods they
                would otherwise enjoy. A crime-statistics layer would have encoded exactly that. None
                of the three features made it to v2.
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

              <DecisionBlock
                index={1}
                accent={AMBER}
                title="No star ratings"
                body="Familiarity — knowing what to expect from a place — is what actually makes women feel safe in it (Dubey et al., 2025). A star rating gives you none of that. It flattens a place into a single number and strips out the context that builds familiarity: what the crowd was like, how the staff treated you, whether it felt okay to be there alone. So I cut ratings entirely. Instead, you leave a short, first-hand account, tagged with the time you were there."
              />
              <QuoteCallout
                accent={AMBER}
                text="Avoid it becoming a social platform. The more social it becomes, the less trustworthy it will be."
                attribution="Interview participant, unprompted"
              />
            </Prose>
            <FeatureVisual
              kind="phone"
              phoneWidth={PHONE_FEATURE}
              images={[
                { src: "/projects/whspr/whspr/house-of-yes-contributions.png", alt: "House of Yes place profile — first-hand signals, no star rating", pixelWidth: 402, pixelHeight: 977 },
              ]}
              headline="Signals, not scores"
              caption="First-hand accounts, tagged with time and context — no star rating in sight."
            />

            <Prose>
              <DecisionBlock
                index={2}
                accent={AMBER}
                title="A day/night toggle"
                body="Familiarity means knowing what to expect at the time you'll actually be there. But a place doesn't stay the same. Somewhere well-lit and full of people at 6pm can feel completely different at 1am. So Whspr keeps the two apart and lets you toggle between them. I didn't have to argue for this one — a participant asked for it before she'd seen anything I built."
              />
              <QuoteCallout
                accent={AMBER}
                text="Even just knowing what time of day a place is really, really busy."
                attribution="Interview participant, before being shown the prototype"
              />
            </Prose>
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

            <Prose>
              <DecisionBlock
                index={3}
                accent={AMBER}
                title="Verification, without surveillance"
                body="A platform built on women's experiences only works if the people posting them actually are women. So posting requires ID verification, while browsing stays open to everyone. But verification cuts against the other thing that makes people contribute: privacy. So the two are kept apart. Verification confirms identity at the door, posts stay anonymous, and nothing personal is collected or stored along the way. This wasn't only my concern — the first thing one participant asked, before anything else, was how it would work."
              />
              <QuoteCallout
                accent={AMBER}
                text="How are you gonna be confirming that? Does a human look through all the submissions?"
                attribution="Street participant, on the women-only framing"
              />
            </Prose>
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

            <Prose>
              <DecisionBlock
                index={4}
                accent={AMBER}
                title="Friction as a feature"
                body="Verification decides who can post. The contribution flow decides what a post is worth. Research on contribution quality shows low-barrier input produces volume rather than value, while more structure produces something usable (Nissenbaum). So instead of an open text box, the flow walks you through five prompts: whether you've been there before, when you went, whether you were alone or in a group, what your observation is about, and the observation itself. That structure also answers something a participant flagged — that a bad experience caused by a staff member and one caused by another customer mean completely different things, and a single score can't tell them apart."
              />
              <P>
                <strong>The obvious objection came from the research too.</strong> One participant
                doubted anyone would contribute at all:
              </P>
              <QuoteCallout
                accent={AMBER}
                text="How often are you gonna be like, 'let's take a picture'?"
                attribution="Interview participant, on contributing in the moment"
              />
              <P>
                She was pointing at the real risk: a platform with no contributions is worth nothing,
                and I was proposing to make contributing <em>harder</em>. I took the bet anyway. A
                place with four thin, structured accounts is more useful than one with forty ratings,
                and the structure signals to the person posting that their input is worth something.
                Whether that holds at scale is genuinely unresolved.
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

              <P><strong>Word of mouth decided it, in six of seven conversations.</strong></P>
              <QuoteCallout accent={AMBER} text="If someone I know has an opinion about it, that's the number one thing that affects my decision." />
              <P>
                That validated the premise: women already share this knowledge, so the job was to
                build infrastructure for it, not invent a behavior.
              </P>

              <P>
                <strong>What&apos;s broken isn&apos;t coverage — it&apos;s trust in the source.</strong>{" "}
                Across both studies, people described information as plentiful and unreliable:
                influencers taken with a grain of salt, Reddit users of unknown motive, one subreddit
                described as actively hostile.
              </P>
              <QuoteCallout accent={AMBER} text="People on r/NYC are like, this question's been asked so many times, I don't even wanna answer it." />

              <P>
                <strong>The women-only framing was never contested</strong> — not once, in any of the
                seven conversations. That was the finding I&apos;d most expected to go the other way.
              </P>

              <P>
                <strong>Two of the ten said they wouldn&apos;t use it, and both were right about
                something.</strong> One named the differentiation problem outright.
              </P>
              <QuoteCallout accent={AMBER} text="I feel like it's more just kind of like yell for something that already has reviews. Why would I use this particular?" />
              <P>
                The other doesn&apos;t own a smartphone — but in ruling herself out, she described
                exactly who Whspr is for: someone without a set of places they already trust. Between
                the two of them they scoped the product better than I had. Whspr isn&apos;t for
                everyone in New York. It&apos;s for people going somewhere they don&apos;t know yet.
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
