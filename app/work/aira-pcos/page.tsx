import { T } from "@/components/casestudy2/tokens";
import { CaseStudyNav, CaseStudyFooter } from "@/components/casestudy2/CaseStudyChrome";
import Section, { H3, P, List, Caption } from "@/components/casestudy2/Section";
import ScreensRow from "@/components/casestudy2/ScreensRow";
import PhoneMockup from "@/components/casestudy2/PhoneMockup";
import QuoteCallout from "@/components/casestudy2/QuoteCallout";
import { StatRow } from "@/components/casestudy2/StatCallout";
import SeasonsDiagram from "@/components/casestudy2/aira/SeasonsDiagram";
import FeatureVisual from "@/components/casestudy2/FeatureVisual";
import { CaseStudyShell, Prose, Media } from "../_components/columns";

export const metadata = {
  title: "AIRA — Simran Chhabra",
  description: "A cycle-tracking experience for PCOS (PMOS), built around how each phase actually feels.",
};

const CORAL = T.aira.coral;

// AIRA screens in public/AIRAScreens are 440px wide. PhoneMockup inlays the
// image inside a ~4.5% bezel, so these frame widths stay under intrinsic size.
const PHONE_FEATURE = 440;
const PHONE_PAIR = 420;
const PHONE_ROW_3UP = 316; // 3 x 316 + 2 x 24 gap = 1000

export default function AiraPage() {
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
            12 weeks · Mobile App
          </p>
          <h1 className="t-display" style={{ color: T.ink, marginBottom: "1.5rem" }}>
            AIRA
          </h1>
          <Prose>
            <P large>
              AIRA began as a project for a UX class on habit change — built around seven connected
              health pillars and a single daily readiness score, instead of a pile of separate charts
              to make sense of alone.
            </P>
          </Prose>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16">
            {[
              { label: "Role", value: "Product Designer & Researcher" },
              { label: "Team", value: "4-person team (shared build)" },
              { label: "Platform", value: "Mobile App" },
              { label: "Duration", value: "12 weeks" },
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
          <Section id="pmos" number="01" heading="What is PMOS?" first>
            <Prose>
              <P>
                PMOS (polyendocrine metabolic ovarian syndrome, renamed from PCOS in 2026) is a
                hormonal and metabolic condition. It shows up differently for everyone: irregular
                cycles, insulin resistance, fatigue, weight changes, acne, mood swings. There&apos;s
                no cure. It&apos;s managed, day to day, through habits.
              </P>
              <StatRow
                stats={[
                  { value: "1 in 8", label: "Women affected — 170M+ worldwide (Endocrine Society, 2026)" },
                  { value: "70%", label: "Of cases go undiagnosed (WHO)" },
                ]}
              />
            </Prose>
          </Section>

          <Section id="problem" number="02" heading="The Problem">
            <Prose>
              <P>
                PMOS is hard to manage because it&apos;s hard to even understand. It presents
                differently in everyone, so figuring out how it shows up in one person is its own
                ongoing task. And managing it means changing several habits at once, food, sleep,
                movement, stress, cycle, all of which affect each other.
              </P>
              <P>
                The tools don&apos;t help much. Each habit lives in a separate app, and none of them
                connect. Even wearables only capture a slice, like steps and sleep, not the fuller
                picture of cycle, nutrition, and symptoms that PMOS involves, and they remain out of
                reach for a lot of people. So people track constantly and still can&apos;t see how it
                all fits together, and most eventually fall off.
              </P>
              <P>
                That full picture is the point. With no cure, managing PMOS comes down to spotting
                patterns, what sets off symptoms, what actually helps. Connected data could reveal
                those patterns. Scattered across apps, it stays noise.
              </P>
            </Prose>
            <FeatureVisual
              kind="plain"
              plainMaxWidth={640}
              images={[
                {
                  src: "/projects/aira-pcos/AIRAScreens/Overwhelmed Woman Illustration.png",
                  alt: "Illustration of an overwhelmed woman surrounded by the many things she manages: sleep, schedule, weight, periods, movement, mood, nutrition, supplements",
                  pixelWidth: 1182,
                  pixelHeight: 1274,
                },
              ]}
              caption="Sleep, schedule, weight, periods, movement, mood, nutrition, supplements — managed separately, felt all at once."
            />
          </Section>

          <Section id="team" number="03" heading="My Role & The Team">
            <Prose>
              <P>
                AIRA began as a project for a UX class on habit change. We chose PMOS because it
                lives almost entirely in daily habit work, and because the people living with it are
                badly served by what already exists. It was also personal. I have it, and one of my
                teammates is diabetic, so we knew a lot of this firsthand.
              </P>
              <P>
                The team built AIRA around seven connected health pillars and a single daily
                readiness score, instead of a pile of separate charts to make sense of alone. My
                teammates did onboarding, sleep, mood, and the help section. I owned cycle tracking,
                nutrition, activity, and the dashboard.
              </P>
            </Prose>
          </Section>

          <Section id="research" number="04" heading="Research">
            <Prose>
              <P>
                We ran a short survey (25 responses, 13 from women with PMOS) and three interviews,
                alongside secondary research grounded in behavior-change models like Fogg and COM-B.
                A few patterns came through clearly.
              </P>
              <List
                accent={CORAL}
                items={[
                  "Nearly everyone said their symptoms “vary too much to tell” — PMOS doesn't run on a predictable schedule",
                  "“I start strong but can't stay consistent” was the most common reason habits fell apart",
                  "Most-requested support: gentle nudges during low-energy moments, and cycle-phase guidance",
                ]}
              />
              <P>
                The interviews filled in the why. People weren&apos;t dropping habits because they
                didn&apos;t care. They dropped them on the days they had no energy, which for PMOS is
                a lot of days. And they were tired of apps that just sent reminders without any
                warmth.
              </P>
              <QuoteCallout accent={CORAL} text="Don't cheer you on." attribution="On existing trackers like Flo and Clue" />
              <P>One of those interviews changed how I approached the cycle-tracking work.</P>
            </Prose>
          </Section>

          <Section id="insight" number="05" heading="The Insight">
            <Prose>
              <QuoteCallout
                large
                accent={CORAL}
                text="Most things feel like tasks. I'm trying to think of my cycle like seasons, four different weeks. Maybe the app could say, you're going into this week, how was your past week?"
                attribution="Maitreyi, interview participant"
              />
              <P>
                This stuck with me. She wasn&apos;t asking for a better tracker. She was describing a
                different way to relate to her cycle: four phases, each with its own feeling and its
                own needs, moving through the month like seasons.
              </P>
              <P>
                It also solved something I&apos;d been stuck on. Most period trackers assume a
                predictable cycle. Irregular cycles are one of the most commonly reported PMOS
                symptoms, so when someone&apos;s cycle doesn&apos;t fit the 28-day model the app is
                built on, the app quietly stops being useful, and it can leave the user feeling like
                the problem is them. The seasons framing sidesteps that. Instead of counting down to a
                date, it centers how each phase actually feels, which holds up whether your cycle is
                regular or not.
              </P>
              <H3>On the seasons framing</H3>
              <P>
                The four phases of the menstrual cycle are often described as inner seasons, a
                framing rooted in the body&apos;s infradian rhythm, the roughly monthly hormonal cycle
                that shapes energy, mood, and metabolism. Adjusting habits to each phase, known as
                cycle syncing, was popularized by Alisa Vitti, who developed it while managing her own
                PMOS.
              </P>
            </Prose>
            <Media>
              <SeasonsDiagram />
            </Media>
          </Section>

          <Section id="designed" number="06" heading="What I Designed">
            <Prose>
              <P>
                I owned the cycle-tracking experience, plus the activity and nutrition pieces and the
                education layer. The cycle work is where the seasons insight became a real interface.
              </P>
              <P>
                The core screen shows where you are in your cycle as a filling ring, colored by phase,
                with a short read on what that phase asks for that day: rest and recovery in winter,
                high energy and clarity in summer. The data is simple and the guidance sits right next
                to it, so it never becomes logging for its own sake.
              </P>

              <H3>Design decision: seasons or phases</H3>
              <P>
                Not everyone relates to the cycle the same way. In interviews, some people naturally
                used metaphors like seasons; others thought in clinical terms (luteal, follicular) and
                wanted the facts. The CHI research on menstrual data backs this up: one of its core
                findings is that people want to view the signals in the way that&apos;s relevant to
                them, not a single default framing.
              </P>
              <P>
                So the phase screen has a toggle. The same cycle data renders two ways: a Seasons view
                (Winter, Spring, Summer, Autumn, with the associated energy and needs) and a Phases
                view (menstrual, follicular, ovulatory, luteal, with the clinical labels). The
                underlying data is identical; only the framing changes.
              </P>
              <P>
                This also covers the range of users. The Phases view is legible to anyone familiar
                with cycle basics. The Seasons view is the more intuitive entry point for people who
                don&apos;t track clinically. Neither is forced on the user.
              </P>
            </Prose>
            <FeatureVisual
              kind="phone"
              pairWidth={PHONE_PAIR}
              images={[
                { src: "/projects/aira-pcos/AIRAScreens/Winter (M).png", alt: "Winter — Seasons view", pixelWidth: 440, pixelHeight: 956, label: "Seasons view" },
                { src: "/projects/aira-pcos/AIRAScreens/Menstrual Phase.png", alt: "Menstrual — Phases view", pixelWidth: 440, pixelHeight: 956, label: "Phases view" },
              ]}
              headline="Same data, your framing"
              caption="One toggle, two ways to read the same cycle — seasons, or clinical phases."
            />
            <ScreensRow
              width={PHONE_ROW_3UP}
              screens={[
                { src: "/projects/aira-pcos/AIRAScreens/Spring (F).png", alt: "Spring — Seasons view", caption: "Spring — Seasons view", pixelWidth: 440, pixelHeight: 956 },
                { src: "/projects/aira-pcos/AIRAScreens/Follicular Phase.png", alt: "Follicular — Phases view", caption: "Follicular — Phases view", pixelWidth: 440, pixelHeight: 956 },
                { src: "/projects/aira-pcos/AIRAScreens/Summer (O).png", alt: "Summer — Seasons view", caption: "Summer — Seasons view", pixelWidth: 440, pixelHeight: 956 },
                { src: "/projects/aira-pcos/AIRAScreens/Ovulation.png", alt: "Ovulation — Phases view", caption: "Ovulation — Phases view", pixelWidth: 440, pixelHeight: 956 },
                { src: "/projects/aira-pcos/AIRAScreens/Luteal.png", alt: "Autumn — Seasons view", caption: "Autumn — Seasons view", pixelWidth: 440, pixelHeight: 956 },
                { src: "/projects/aira-pcos/AIRAScreens/Luteal-1.png", alt: "Luteal — Phases view", caption: "Luteal — Phases view", pixelWidth: 440, pixelHeight: 956 },
              ]}
            />

            <Prose>
              <H3>The Learn tab</H3>
              <P>
                The seasons framing only works if people understand it, so the app has a dedicated
                space for that. The Learn tab (the Daily Pulse) holds short, phase-tagged content:
                cycle science, PMOS basics, a daily fact, a quick tip. It keeps the education out of
                the tracking screens and gives curious users somewhere to go deeper.
              </P>
            </Prose>
            <PhoneMockup
              src="/projects/aira-pcos/AIRAScreens/Learn tab - Global NAV.png"
              alt="Learn tab — Daily Pulse"
              caption="Learn tab — Daily Pulse"
              width={PHONE_FEATURE}
              pixelWidth={440}
              pixelHeight={956}
            />

            <Prose>
              <H3>Nutrition</H3>
              <P>
                The nutrition screen handles food logging, with macro tracking and a gentle nudge when
                something&apos;s off (&ldquo;low on protein today, try a Greek yogurt snack&rdquo;)
                rather than a guilt-trip. Logging is low-effort: you can type or just speak your meal.
                It&apos;s the most conventional piece of the app, and the one I&apos;d push furthest
                next, toward guidance that adapts to your current phase.
              </P>
            </Prose>
            <PhoneMockup
              src="/projects/aira-pcos/AIRAScreens/Meal Tracking.png"
              alt="Meal tracking"
              caption="Meal tracking"
              width={PHONE_FEATURE}
              pixelWidth={440}
              pixelHeight={956}
            />

            <Prose>
              <H3>Activity</H3>
              <P>
                Logging movement ends on an encouraging note rather than a number, because the
                research was clear that people with PMOS fall off when tracking feels like judgment.
                The activity screen confirms the log and ties it back to why it matters, gently.
              </P>
            </Prose>
            <PhoneMockup
              src="/projects/aira-pcos/AIRAScreens/Workout - Cycle Insight.png"
              alt="Activity insight"
              caption="Activity insight"
              width={PHONE_FEATURE}
              pixelWidth={440}
              pixelHeight={956}
            />
            <Prose>
              <Caption>
                Closest available match for the &ldquo;Activity Insights&rdquo; screen named in
                Notion — flagging for confirmation, since the file is named &ldquo;Workout - Cycle
                Insight.png&rdquo; rather than an exact match.
              </Caption>
            </Prose>
          </Section>

          <Section id="nudges" number="07" heading="Designing the Nudges">
            <Prose>
              <P>
                One thing came through in every interview: existing apps either nag or stay silent,
                and neither helps. As one participant put it, trackers like Flo and Clue &ldquo;don&apos;t
                cheer you on.&rdquo;
              </P>
              <P>
                So I looked at how to make notifications feel supportive instead of clinical. Grounded
                in behavior-change research (Fogg, COM-B), the nudges are built to arrive at
                low-energy moments and tie to behavior rather than fixed times, and to sound like
                encouragement, not instruction. The survey backed this: people overwhelmingly wanted
                gentle, well-timed prompts over rigid reminders.
              </P>
            </Prose>
            <FeatureVisual
              kind="phone"
              pairWidth={PHONE_PAIR}
              images={[
                { src: "/projects/aira-pcos/AIRAScreens/Notification.png", alt: "Lock-screen nudge", pixelWidth: 872, pixelHeight: 1776, label: "Lock-screen nudge" },
                { src: "/projects/aira-pcos/AIRAScreens/Widget.png", alt: "Home-screen widget", pixelWidth: 872, pixelHeight: 1776, label: "Home-screen widget" },
              ]}
              headline="Warm, not clinical"
              caption="Nudges timed to low-energy moments, worded like encouragement."
            />
          </Section>

          <Section id="next" number="08" heading="What I'd Do Next">
            <Prose>
              <P>
                <strong>A dashboard that pulls it together.</strong> The piece I&apos;d build next is
                a home screen that surfaces patterns across cycle, food, and activity in one place, so
                the connections become visible instead of living in separate tabs.
              </P>
              <P>
                <strong>Cycle-to-cycle comparison.</strong> The CHI research on menstrual data found
                that comparing cycles side by side is one of the things users most want, and it
                matters even more for irregular cycles, where a single averaged view doesn&apos;t
                reflect reality. It&apos;s the clearest next step for the tracking work.
              </P>
              <P>
                <strong>Refining the nutrition screen</strong> into something more personalized to
                each phase and each person.
              </P>
            </Prose>
          </Section>

          <Section id="takeaway" number="09" heading="What I Took Away">
            <Prose>
              <P>
                AIRA started from something a user said almost in passing, that she&apos;d started
                thinking of her cycle as seasons. The work was recognizing that offhand comment as the
                whole design, and building an interface that treats an irregular, personal experience
                as something worth designing around, instead of a problem to correct.
              </P>
            </Prose>
          </Section>
        </div>
      </CaseStudyShell>

      <CaseStudyFooter />
    </main>
  );
}
