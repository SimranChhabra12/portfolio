import { T } from "@/components/casestudy2/tokens";
import { CaseStudyNav, CaseStudyFooter } from "@/components/casestudy2/CaseStudyChrome";
import Section, { P, List, DecisionBlock, Caption, H2 } from "@/components/casestudy2/Section";
import ScreensRow from "@/components/casestudy2/ScreensRow";
import FeatureVisual from "@/components/casestudy2/FeatureVisual";
import QuoteCallout from "@/components/casestudy2/QuoteCallout";
import AssetFlag from "@/components/casestudy2/AssetFlag";
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
const PHONE_ROW_4UP = 232; // 4 x 232 + 3 x 24 gap = 1000

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
          </Prose>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16">
            {[
              { label: "Hats Worn", value: "Product Design, UX Research, Product Strategy, Prototyping, UI Design" },
              { label: "Mentor", value: "Prof. Margaret Jack" },
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
          <Section id="role" number="01" heading="My Role" first>
            <Prose>
              <P>
                I led this end to end, as researcher, product lead, and designer. That meant the
                interview study, the information architecture, the contribution flow, the trust and
                verification system, and the visual design system (dark UI, Signal Amber accent, DM
                Serif Display / DM Sans).
              </P>
              <P>
                I also designed and built the working prototype myself, solo, in Claude Code, so the
                product decisions and the technical ones were the same set of decisions. Building it
                meant I couldn&apos;t hand-wave the hard parts: the schema, the trust scoring, the API
                integrations all had to actually work.
              </P>
            </Prose>
          </Section>

          <Section id="context" number="02" heading="Context">
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

          <Section id="began" number="03" heading="Where I Began">
            <Prose>
              <P>
                I began by researching why women still resort to the whisper network in the age of
                apps. I started where the best unsolved stories tend to begin: in academia.
              </P>
            </Prose>
            <DeckSlide
              src="/whspr-deck/three-key-frameworks.png"
              alt="Slide — Three Key Frameworks: Perceived Safety is Real Data, Dismissal of Women's Experience, Friction as Quality"
              caption="Secondary research — three key frameworks"
              maxWidth={DECK_W}
            />
            <Prose>
              <P>
                The frameworks explained the problem, but they couldn&apos;t tell me how to design
                for it. For that, I needed to hear how women actually move through the city, and what
                they wished existed.
              </P>
            </Prose>
            <DeckSlide
              src="/whspr-deck/what-women-said.png"
              alt="Slide — What Women Actually Said: five themes that rewrote the brief"
              caption="User research — what women actually said"
              maxWidth={DECK_W}
            />
          </Section>

          <Section id="first-pass" number="04" heading="The First Pass">
            <Prose>
              <P>
                My research pointed me toward a few observations that I started building on. That
                first build still carried some conventional assumptions:
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
                just making room for it. That went against the whole point of Whspr, so none of them
                made it to v2.
              </P>
            </Prose>
            <Media>
              <GapDiagram />
            </Media>
          </Section>

          <Section id="insight" number="05" heading="The Insight">
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

          <Section id="decisions" number="06" heading="Design Decisions">
            <Prose>
              <P>All of these decisions came out of my secondary and primary research.</P>
            </Prose>
            <DeckSlide
              src="/whspr-deck/three-principles.png"
              alt="Slide — Three Principles: Auth (verified identity enables trust), Search (find a place by context, not rating), Contribute (add experience with friction)"
              caption="The three principles behind the information flow"
              maxWidth={DECK_W}
            />

            <Prose>
              <DecisionBlock
                index={1}
                accent={AMBER}
                title="No star ratings"
                body="The research was clear that familiarity, knowing what to expect from a place, is what actually makes women feel safe in it (Dubey et al., 2025). A star rating gives you none of that. It flattens a place into a single number and strips out the context that builds familiarity in the first place: what the crowd was like, how the staff treated you, whether it felt okay to be there alone. So I cut ratings entirely. Instead, you leave a short, first-hand account of what a place was actually like, tagged with the time you were there."
              />
            </Prose>
            <FeatureVisual
              kind="phone"
              phoneWidth={PHONE_FEATURE}
              images={[
                { src: "/whspr/house-of-yes-contributions.png", alt: "House of Yes place profile — first-hand signals, no star rating", pixelWidth: 402, pixelHeight: 977 },
              ]}
              headline="Signals, not scores"
              caption="First-hand accounts, tagged with time and context — no star rating in sight."
            />

            <Prose>
              <DecisionBlock
                index={2}
                accent={AMBER}
                title="A day/night toggle"
                body="Familiarity means knowing what to expect from a place at the time you'll actually be there. But a place doesn't stay the same. Somewhere well-lit and full of people at 6pm can feel completely different at 1am. So Whspr keeps the two apart and lets you toggle between them."
              />
            </Prose>
            <FeatureVisual
              kind="phone"
              pairWidth={PHONE_PAIR}
              images={[
                { src: "/whspr/Place Profile/Daytime.png", alt: "Schmuck place profile, day mode", pixelWidth: 402, pixelHeight: 977, label: "Day" },
                { src: "/whspr/Place Profile/NightTime.png", alt: "Schmuck place profile, night mode", pixelWidth: 402, pixelHeight: 977, label: "Night" },
              ]}
              headline="Same place, different time"
              caption="The Schmuck place profile, toggled between day and night — different signals, different tags."
            />

            <Prose>
              <DecisionBlock
                index={3}
                accent={AMBER}
                title="Verification, without surveillance"
                body="A platform built on women's experiences only works if the people posting them actually are women. So posting requires ID verification to confirm the contributor identifies as female, while browsing stays open to everyone. But verification cuts against the other thing that makes people contribute: privacy. So the two are kept apart. Verification confirms identity at the door, posts stay anonymous, and nothing personal is collected or stored along the way. It keeps the platform trustworthy, and over time, helps surface patterns across posts worth trusting."
              />
            </Prose>
            <ScreensRow
              width={PHONE_ROW_3UP}
              screens={[
                { src: "/whspr/sign-in.png", alt: "Sign in", caption: "Sign in", pixelWidth: 402, pixelHeight: 874 },
                { src: "/whspr/create-account.png", alt: "Create account", caption: "Create account", pixelWidth: 402, pixelHeight: 874 },
                { src: "/whspr/auth-gate.png", alt: "Auth gate", caption: "Auth gate", pixelWidth: 402, pixelHeight: 874 },
                { src: "/whspr/verify-identity.png", alt: "Verify identity", caption: "Verify identity", pixelWidth: 402, pixelHeight: 874 },
                { src: "/whspr/verification-pending.png", alt: "Verification pending", caption: "Verification pending", pixelWidth: 402, pixelHeight: 874 },
              ]}
            />

            <Prose>
              <DecisionBlock
                index={4}
                accent={AMBER}
                title="Friction as a feature"
                body="Verification decides who can post. The contribution flow decides what a post is worth. Research on contribution quality shows that low-barrier input produces volume rather than value, while a bit more structure produces something usable (Nissenbaum). So instead of an open text box, the flow walks you through five quick prompts before you can submit: whether you've been there before, when you went, whether you were alone or in a group, what your observation is about, and finally the observation itself. The structure does two things at once. It filters for quality over volume, and it signals to the person contributing that their input actually matters."
              />
            </Prose>
            <FeatureVisual
              kind="plain"
              plainMaxWidth={DECK_W}
              images={[
                { src: "/whspr-deck/friction-as-a-feature.png", alt: "Slide — Friction as a Feature: the five-step contribution flow (type of user, time, company details, category of observation, observation), shown in a device mockup", pixelWidth: 960, pixelHeight: 540 },
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
                { src: "/whspr/mic-off.png", alt: "Voice input off", caption: "Voice input off", pixelWidth: 402, pixelHeight: 1041 },
                { src: "/whspr/mic-on.png", alt: "Voice input on", caption: "Voice input on", pixelWidth: 402, pixelHeight: 1041 },
                { src: "/whspr/post-submission.png", alt: "Submitted", caption: "Submitted", pixelWidth: 402, pixelHeight: 874 },
              ]}
            />

            <DeckSlide
              src="/whspr-deck/information-architecture.png"
              alt="Slide — Information Architecture: Search, Read, Contribute, Surface, plus the system layer rule — contributions older than 6 months fade, places with under 4 contributions show an early-data warning"
              caption="How the system holds it together — search, read, contribute, surface"
              maxWidth={DECK_W}
            />
          </Section>

          <Section id="solution" number="07" heading="The Solution">
            <Prose>
              <P>
                Whspr came together as a mobile app built to hold the knowledge women were already
                sharing, and make it findable.
              </P>
              <H2>Give it a try</H2>
              <P>
                This is the actual working prototype, not a video. Search a place, read what other
                women said about it, or walk through the contribution flow yourself.
              </P>
            </Prose>
            <LivePrototype
              src="https://tubular-marigold-4011ba.netlify.app/"
              title="Whspr — interactive prototype"
            />

            <DeckSlide
              src="/whspr-deck/three-key-flows.png"
              alt="Slide — Interactive Prototype, Three Key Flows: Search Flow, Place Profile, Contribution"
              caption="The interactive prototype — three key flows"
              maxWidth={DECK_W}
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
                { src: "/whspr/area-info-expanded.png", alt: "Area Info, expanded", pixelWidth: 402, pixelHeight: 977 },
              ]}
              headline="Area Info"
              caption="What's open nearby, right now — well lit or not, busy or not."
            />
            <ScreensRow
              width={PHONE_ROW_2UP}
              screens={[
                { src: "/whspr/search.png", alt: "Search results for \"bars in lower east side\"", caption: "Search", pixelWidth: 402, pixelHeight: 1088 },
                { src: "/whspr/laser-wolf.png", alt: "Laser Wolf place profile with first-hand signals", caption: "Place profile", pixelWidth: 402, pixelHeight: 977 },
              ]}
            />
            <DeckSlide
              src="/whspr-deck/three-principles-screens.png"
              alt="Slide — Three Principles shown in device mockups: Authentication (Verify Your Identity), Search, Contribution (Add Your Thoughts)"
              caption="From the deck — authentication, search, and contribution"
              maxWidth={DECK_W}
            />

            <div className="flex flex-col gap-4 w-full mt-4">
              <p style={{ fontFamily: "var(--font-body)", fontSize: T.type.caption, textTransform: "uppercase", letterSpacing: "0.08em", color: T.inkMuted }}>
                More of the product
              </p>
              <ScreensRow
                width={PHONE_ROW_4UP}
                screens={[
                  { src: "/whspr/intro-1.png", alt: "Onboarding 1", caption: "Onboarding", pixelWidth: 402, pixelHeight: 874 },
                  { src: "/whspr/intro-2.png", alt: "Onboarding 2", caption: "Onboarding", pixelWidth: 402, pixelHeight: 874 },
                  { src: "/whspr/intro-3.png", alt: "Onboarding 3", caption: "Onboarding", pixelWidth: 402, pixelHeight: 874 },
                  { src: "/whspr/splash.png", alt: "Splash", caption: "Splash", pixelWidth: 402, pixelHeight: 874 },
                  { src: "/whspr/filters.png", alt: "Filters", caption: "Filters", pixelWidth: 402, pixelHeight: 874 },
                  { src: "/whspr/filters-selected.png", alt: "Filters selected", caption: "Filters selected", pixelWidth: 402, pixelHeight: 874 },
                  { src: "/whspr/house-of-yes.png", alt: "Area profile — Bar Revival", caption: "Area profile — Bar Revival", pixelWidth: 402, pixelHeight: 977 },
                  { src: "/whspr/parcelle.png", alt: "Area profile — Parcelle", caption: "Area profile — Parcelle", pixelWidth: 402, pixelHeight: 977 },
                  { src: "/whspr/area-info-collapsed.png", alt: "Area Info, collapsed", caption: "Area Info, collapsed", pixelWidth: 402, pixelHeight: 977 },
                  { src: "/whspr/see-more.png", alt: "See more", caption: "See more", pixelWidth: 402, pixelHeight: 977 },
                  { src: "/whspr/saved.png", alt: "Saved", caption: "Saved", pixelWidth: 402, pixelHeight: 874 },
                  { src: "/whspr/profile.png", alt: "Profile", caption: "Profile", pixelWidth: 402, pixelHeight: 874 },
                ]}
              />
            </div>
          </Section>

          <Section id="design-system" number="08" heading="The Design System">
            <Prose>
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

          <Section id="testing" number="09" heading="Testing It on the Street">
            <Prose>
              <AssetFlag label="The WSQ Park guerrilla research photo — not found in public/whspr" />
              <P>
                To pressure-test the concept, I took it out for guerrilla research around Washington
                Square Park and the West Village, about eleven women across six short conversations.
                Each one followed the same order, suggested by Professor Bloom: validate the problem
                first, show the prototype second, ask about use last. That way people named the
                problem in their own words before they ever saw my solution.
              </P>
              <P>A few things came back clearly.</P>

              <P><strong>Word of mouth was the number one factor for everyone.</strong></P>
              <QuoteCallout accent={AMBER} text="If someone I know has an opinion about it, that's the number one thing that affects my decision." />
              <P>
                That validated the whole premise: women already share this knowledge, so the job was
                to build infrastructure for it, not invent a behavior.
              </P>

              <P><strong>Safety came up on its own, unprompted.</strong></P>
              <P>She wasn&apos;t asking for alerts. She was asking for context.</P>

              <P><strong>Reddit kept getting named as the current option, and described as broken.</strong></P>
              <QuoteCallout accent={AMBER} text="People on r/NYC are like, this question's been asked so many times, I don't even wanna answer it." />

              <P>
                And the women-only framing, which I&apos;d worried might be contested, landed
                positively in every single conversation.
              </P>
              <QuoteCallout accent={AMBER} text="Just less blind." attribution="One participant, on what Whspr would change" />
            </Prose>
          </Section>

          <Section id="next" number="10" heading="What I'd Do Next">
            <Prose>
              <P><strong>Verification and inclusion.</strong> The verification I designed confirms identity but raises real questions I didn&apos;t fully resolve. Selfie and pose-based checks exclude low-vision users, and gender verification is genuinely complicated for trans women, who the platform is meant to include. Getting this right matters more than getting it fast.</P>
              <P><strong>Trust at scale.</strong> A platform built on contributions is only as trustworthy as the people contributing. Guarding against coordinated manipulation and astroturfing is something I&apos;d need to design for before this could be real.</P>
              <P><strong>More of what women actually asked for.</strong> The research surfaced dimensions the current version doesn&apos;t capture yet: cost and cover charges, event info, and queer-friendliness, which every existing place-review platform underserves. A basic filtering layer already exists on the read side, and I&apos;d build it out to be more personal, so someone can shape what they see around the context they care about most.</P>
              <P><strong>From places to routes.</strong> The most ambitious direction is a Whspr layer over the map itself, so women could leave and read feedback along a route, not just at a place. The way you get somewhere carries its own texture, and no platform treats a route as something worth knowing about.</P>
              <P><strong>An idea for adoption.</strong> Bars and restaurants have their own reason to want women to feel safe in their space, so a QR code in venues, where women can leave a note on the spot, could be a way to get Whspr off the ground.</P>
            </Prose>
          </Section>

          <Section id="takeaway" number="11" heading="What I Took Away">
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
