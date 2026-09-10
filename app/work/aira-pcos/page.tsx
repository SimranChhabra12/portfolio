import { T } from "@/components/casestudy2/tokens";
import { CaseStudyFooter } from "@/components/casestudy2/CaseStudyChrome";
import Nav from "@/components/ui/Nav";
import Section, { H3, P, List, Caption } from "@/components/casestudy2/Section";
import ScreensRow from "@/components/casestudy2/ScreensRow";
import PhoneMockup from "@/components/casestudy2/PhoneMockup";
import QuoteCallout from "@/components/casestudy2/QuoteCallout";
import { StatRow } from "@/components/casestudy2/StatCallout";
import SeasonsDiagram from "@/components/casestudy2/aira/SeasonsDiagram";
import ScatteredStrands from "@/components/casestudy2/aira/ScatteredStrands";
import FeatureVisual from "@/components/casestudy2/FeatureVisual";
import HeroCover from "@/components/casestudy2/aira/HeroCover";
import SeasonWheelBlock from "@/components/casestudy2/aira/SeasonWheelBlock";
import CaseStudyHeadline from "@/components/casestudy2/CaseStudyHeadline";
import ContextAndRole from "@/components/casestudy2/ContextAndRole";
import DecisionCard from "@/components/casestudy2/DecisionCard";
import SectionIndex from "@/components/casestudy2/SectionIndex";
import { CaseStudyShell, Prose, Media } from "../_components/columns";

export const metadata = {
  title: "AIRA | Simran Chhabra",
  description: "A cycle-tracking experience for PCOS (PMOS), built around how each phase actually feels.",
};

const CORAL = T.aira.coral;

// AIRA screens come from public/projects/aira-pcos/aira/aira 3x (1320x2868).
// The 1x exports in AIRAScreens are 440px wide and blur on retina at these frame
// widths. PhoneMockup inlays the image inside a ~4.5% bezel.
const PHONE_FEATURE = 308; // 30% under the original 440, matching Whspr
const PHONE_PAIR = 294; // 30% under 420
const PHONE_ROW_3UP = 221; // 30% under 316

// Contents index, pinned in the left margin. Keep in step with the
// <Section> ids, numbers and headings below.
const SECTIONS = [
  { id: "context", number: "01", label: "Context" },
  { id: "research", number: "02", label: "Research" },
  { id: "insight", number: "03", label: "The Insight" },
  { id: "decisions", number: "04", label: "Design Decisions" },
  { id: "product", number: "05", label: "The Product" },
  { id: "next", number: "06", label: "What I'd Do Next" },
  { id: "takeaway", number: "07", label: "What I Took Away" },
];

export default function AiraPage() {
  return (
    <main style={{ backgroundColor: T.cream }} className="min-h-screen overflow-x-hidden">
      <Nav coverId="aira-cover" />
      <SectionIndex items={SECTIONS} alignWithId="aira-headline" revealWithId="aira-headline" />

      {/* Cover band */}
      <HeroCover />

      {/* Hero */}
      <CaseStudyShell className="pt-20">
        <div style={{ paddingBottom: T.space.section }}>
          <CaseStudyHeadline
            id="aira-headline"
            headline="AIRA: A cycle-aware health companion for living with PMOS"
            meta={[
              { label: "Role", value: "Product Designer • UX Researcher • Visual & Interaction Design" },
              { label: "Platform", value: "Mobile Application" },
              { label: "Timeline", value: "12 weeks | 4-person team, shared build" },
            ]}
          />

          <div className="mt-20">
            <ContextAndRole
              columns={[
                {
                  heading: "What is AIRA?",
                  body:
                    "AIRA is a mobile app for people managing PMOS, built around seven connected health pillars and one daily readiness score instead of a pile of separate charts to reconcile alone. It reads the day against where you are in your cycle, so the same number of hours of sleep doesn't mean the same thing in every week of the month.",
                },
                {
                  heading: "My Role",
                  body:
                    "I owned the research and the product direction: the interviews, the seven-pillar model, the seasons framing the whole product rests on, the readiness score, the nudge system and the visual language. Within the four-person build I owned cycle tracking, nutrition, activity and the dashboard, and my teammates took onboarding, sleep, mood and help.",
                },
              ]}
            />
          </div>

          {/* Same placement and treatment as the Resy and Whspr prototype links:
              straight under My Role, so the working prototype is one click from the top. */}
          <a
            href="/work/aira-pcos/prototype"
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
                PMOS (polyendocrine metabolic ovarian syndrome, renamed from PCOS in 2026) is a
                hormonal and metabolic condition. It shows up differently for everyone: irregular
                cycles, insulin resistance, fatigue, weight changes, acne, mood swings. There&apos;s
                no cure. It&apos;s managed, day to day, through habits.
              </P>
              <StatRow
                stats={[
                  { value: "1 in 8", label: "Women affected, 170M+ worldwide (Endocrine Society, 2026)" },
                  { value: "70%", label: "Of cases go undiagnosed (WHO)" },
                ]}
              />
            </Prose>
            <Prose>
              <P>
                AIRA began as a project for a UX class on habit change. We chose PMOS because it
                lives almost entirely in daily habit work, and because the people living with it are
                badly served by what already exists. It was also personal. I have PMOS, and one of my
                teammates is diabetic, so we knew a lot of this firsthand.
              </P>
              <P>
                PMOS is hard to manage because it&apos;s hard to even understand. It presents
                differently in everyone, so figuring out how it shows up in one person is its own
                ongoing task. Managing it also means changing several habits at once (food, sleep,
                movement, stress, cycle), and they all affect each other.
              </P>
              <P>
                The tools don&apos;t help much. Each habit lives in a separate app, and none of them
                connect. Even wearables only capture a slice, like steps and sleep, not the fuller
                picture of cycle, nutrition, and symptoms that PMOS involves, and they remain out of
                reach for a lot of people. So people track constantly and still can&apos;t see how it
                all fits together, and most eventually fall off.
              </P>
              <P>
                Since there&apos;s no cure, managing PMOS comes down to spotting patterns: what sets
                off symptoms and what actually helps. Connected data could show those patterns, but
                when it&apos;s spread across five apps, nobody can see them.
              </P>
            </Prose>
            <Media>
              <ScatteredStrands />
              <Caption>
                Sleep, schedule, weight, periods, movement, mood, nutrition and supplements, all
                tracked in different places.
              </Caption>
            </Media>
          </Section>

          <Section id="research" number="02" heading="Research">
            <Prose>
              <P>
                We ran a short survey (25 responses, 13 from women with PMOS) and three interviews,
                alongside secondary research grounded in behavior-change models like Fogg and COM-B.
                A few patterns kept coming up.
              </P>
              <List
                accent={CORAL}
                items={[
                  "Nearly everyone said their symptoms “vary too much to tell.” PMOS doesn't run on a predictable schedule",
                  "“I start strong but can't stay consistent” was the most common reason habits fell apart",
                  "Most-requested support: gentle nudges during low-energy moments, and cycle-phase guidance",
                ]}
              />
              <P>
                The interviews explained why. People dropped habits on the days they had no energy,
                which with PMOS is a lot of days. They were also tired of apps that sent cold,
                generic reminders.
              </P>
              <QuoteCallout
                accent={CORAL}
                italic={false}
                text="Most period apps don't really cheer you on."
                attribution="On existing trackers like Flo and Clue"
              />
              <P>One of those interviews changed how I approached the cycle-tracking work.</P>
            </Prose>
          </Section>

          <Section id="insight" number="03" heading="The Insight">
            <Prose>
              <QuoteCallout
                large
                accent={CORAL}
                text="Most things feel like tasks. I'm trying to think of my cycle like seasons, four different weeks."
                attribution="Maitreyi, interview participant"
              />
              <P>
                I kept thinking about this. She was describing a different way to think about her
                cycle: four phases, each with its own energy and needs, moving through the month
                like seasons.
              </P>
              <P>
                It also helped with a problem I&apos;d been stuck on. Most period trackers assume a
                predictable cycle, but irregular cycles are one of the most common PMOS symptoms.
                When your cycle doesn&apos;t fit the 28-day model, the app stops being useful, and it
                can make you feel like you&apos;re the problem. Seasons get around that. Instead of
                counting down to a date, the app focuses on how each phase feels, which works whether
                your cycle is regular or not.
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
            {/* The wheel sits here, next to the framing it illustrates, rather than
                at the top of the page where it read as decoration above the title.
                Full-bleed out of the media column so it reads as the product's own
                surface, the way the cover band does. */}
            <Media>
              <SeasonWheelBlock />
            </Media>
            <Prose>
              <Caption>
                Drag the wheel to move through the cycle. The season, the reading and the
                light all change together.
              </Caption>
            </Prose>
          </Section>

          <Section id="decisions" number="04" heading="Design Decisions">
            <Prose>
              <P>
                Three decisions shaped the product. All of them came from the same finding: people
                with PMOS usually quit tracking on the days the app makes them feel like they&apos;re
                doing something wrong.
              </P>
            </Prose>
            <Media>
              <DecisionCard
                project="aira"
                index={1}
                choice="One toggle between Seasons and Phases, on the same data"
                insteadOf="Picking one framing and making everyone use it"
                because="Some people naturally described their cycle with metaphors like seasons, weeks or weather. Others wanted the clinical terms, luteal and follicular. The cycle data is the same either way, only the words change. Phases makes sense to anyone who already tracks. Seasons is easier for people who don't."
                research="CHI research on menstrual data: people want the signals framed the way that's relevant to them, not a single default"
              />
            </Media>
            <Media>
              <DecisionCard
                project="aira"
                index={2}
                choice="Build the interface around how a phase feels instead of a countdown"
                insteadOf="The 28-day predicted-date model most trackers use"
                because="Irregular cycles are one of the most common PMOS symptoms. When someone's cycle doesn't fit the model, a countdown app stops working, and it can make her feel like her body is the problem. Going by how the phase feels works whether the cycle is regular or not."
                research="Survey: nearly everyone said their symptoms “vary too much to tell”"
              />
            </Media>
            <Media>
              <DecisionCard
                project="aira"
                index={3}
                choice="Nudges timed to low-energy moments and written to encourage"
                insteadOf="Reminders on a fixed schedule, or streaks and missed-day counters"
                because="People dropped habits on the days they had no energy, and with PMOS that's a lot of days. A 9am reminder that shows up no matter what feels like judgment on those days. That's also why logging ends with an encouraging message instead of a number."
                research="Fogg and COM-B. Survey respondents chose gentle, well-timed prompts over rigid reminders"
              />
            </Media>
          </Section>

          <Section id="product" number="05" heading="The Product">
            <Prose>
              <P>
                I designed the cycle tracking, activity, nutrition and the Learn tab. Cycle tracking is
                where the seasons idea turned into actual screens.
              </P>
              <P>
                The main screen shows where you are in your cycle as a ring that fills up, colored by
                phase, with a short note on what that phase needs: rest in winter, more energy and
                focus in summer. The guidance sits right next to the data so you always know why
                you&apos;re logging.
              </P>

              <P>
                The toggle is on the phase screen. The same cycle data shows up as Seasons (Winter
                through Autumn, with energy and needs for each) or as Phases (menstrual, follicular,
                ovulatory, luteal). The data behind it stays the same.
              </P>
            </Prose>
            <FeatureVisual
              kind="phone"
              ownHomeIndicator
              pairWidth={PHONE_PAIR}
              images={[
                { src: "/projects/aira-pcos/aira/aira 3x/Winter (M).png", alt: "Winter, Seasons view", pixelWidth: 1320, pixelHeight: 2868, label: "Seasons view" },
                { src: "/projects/aira-pcos/aira/aira 3x/Menstrual Phase.png", alt: "Menstrual, Phases view", pixelWidth: 1320, pixelHeight: 2868, label: "Phases view" },
              ]}
              headline="Seasons or Phases"
              caption="One toggle switches the same cycle between seasons and clinical phases."
            />
            <ScreensRow
              ownHomeIndicator
              width={PHONE_ROW_3UP}
              screens={[
                { src: "/projects/aira-pcos/aira/aira 3x/Spring (F).png", alt: "Spring, Seasons view", caption: "Spring, Seasons view", pixelWidth: 1320, pixelHeight: 2868 },
                { src: "/projects/aira-pcos/aira/aira 3x/Follicular Phase.png", alt: "Follicular, Phases view", caption: "Follicular, Phases view", pixelWidth: 1320, pixelHeight: 2868 },
                { src: "/projects/aira-pcos/aira/aira 3x/Summer (O).png", alt: "Summer, Seasons view", caption: "Summer, Seasons view", pixelWidth: 1320, pixelHeight: 2868 },
                { src: "/projects/aira-pcos/aira/aira 3x/Ovulation.png", alt: "Ovulation, Phases view", caption: "Ovulation, Phases view", pixelWidth: 1320, pixelHeight: 2868 },
                { src: "/projects/aira-pcos/aira/aira 3x/Luteal.png", alt: "Autumn, Seasons view", caption: "Autumn, Seasons view", pixelWidth: 1320, pixelHeight: 2868 },
                { src: "/projects/aira-pcos/aira/aira 3x/Luteal-1.png", alt: "Luteal, Phases view", caption: "Luteal, Phases view", pixelWidth: 1320, pixelHeight: 2868 },
              ]}
            />

            <Prose>
              <H3>The Learn tab</H3>
              <P>
                The seasons idea only works if people understand it, so the app has a tab for that.
                The Learn tab (the Daily Pulse) has short reads tagged by phase: cycle science, PMOS
                basics, a daily fact and a quick tip. This keeps the tracking screens clean and gives
                people a place to learn more if they want to.
              </P>
            </Prose>
            <PhoneMockup
              src="/projects/aira-pcos/aira/aira 3x/Learn tab - Global NAV.png"
              alt="Learn tab, Daily Pulse"
              caption="Learn tab: Daily Pulse"
              width={PHONE_FEATURE}
              pixelWidth={1320}
              pixelHeight={2868}
            />

            <Prose>
              <H3>Nutrition</H3>
              <P>
                The nutrition screen is for logging food. It tracks macros and gives a friendly nudge
                when something&apos;s off, like &ldquo;low on protein today, try a Greek yogurt
                snack.&rdquo; You can type your meal or just say it out loud. This is the most
                standard part of the app, and it&apos;s the one I&apos;d want to change most, so the
                suggestions adjust to your current phase.
              </P>
            </Prose>
            <PhoneMockup
              src="/projects/aira-pcos/aira/aira 3x/meal tracking.png"
              alt="Meal tracking"
              caption="Meal tracking"
              width={PHONE_FEATURE}
              pixelWidth={1320}
              pixelHeight={2868}
            />

            <Prose>
              <H3>Activity</H3>
              <P>
                When you log a workout, the app ends with an encouraging message instead of a number.
                Our research showed people with PMOS stop tracking when it feels like they&apos;re
                being judged. The activity screen confirms the log and explains how that movement
                helps during your current phase.
              </P>
            </Prose>
            <PhoneMockup
              src="/projects/aira-pcos/aira/aira 3x/Workout - Cycle Insight.png"
              alt="Activity insight"
              caption="Activity insight"
              ownHomeIndicator
              width={PHONE_FEATURE}
              pixelWidth={1320}
              pixelHeight={2868}
            />
            <Prose>
              <H3>Nudges</H3>
              <P>
                Nudges also show up outside the app, as a lock-screen notification and a home-screen
                widget. Both are timed for when your energy is usually low, not a fixed hour.
              </P>
            </Prose>
            <FeatureVisual
              kind="device"
              pairWidth={PHONE_PAIR}
              images={[
                { src: "/projects/aira-pcos/aira/aira 3x/Notification.png", alt: "Lock-screen nudge", pixelWidth: 1308, pixelHeight: 2664, label: "Lock-screen nudge" },
                { src: "/projects/aira-pcos/aira/aira 3x/Widget.png", alt: "Home-screen widget", pixelWidth: 1308, pixelHeight: 2664, label: "Home-screen widget" },
              ]}
              headline="Nudges"
              caption="Nudges show up during low-energy moments and are written to encourage."
            />
          </Section>

          <Section id="next" number="06" heading="What I'd Do Next">
            <Prose>
              <P>
                <strong>Test it with the women we interviewed.</strong> We designed AIRA from research
                but never tested it with users. One interview pointed me toward the seasons framing,
                and I built the app around it, so I&apos;d want to know if it works for other people
                too.
              </P>
              <P>
                <strong>A dashboard that brings it together.</strong>{" "}Next I&apos;d build a home
                screen that shows patterns across cycle, food and activity in one place, so you can see
                how they connect without switching tabs.
              </P>
              <P>
                <strong>Comparing cycles.</strong>{" "}The CHI research on menstrual data found that
                people really want to compare cycles side by side. This matters even more for
                irregular cycles, where one averaged view isn&apos;t accurate.
              </P>
              <P>
                <strong>Improving the nutrition screen</strong> so it&apos;s more personal to each
                phase and each person.
              </P>
            </Prose>
          </Section>

          <Section id="takeaway" number="07" heading="What I Took Away">
            <Prose>
              <P>
                One participant mentioned in passing that she&apos;d started thinking of her cycle as
                seasons. Her comment pointed me toward a framing I then built out across the app. The
                biggest thing I learned was to design around irregular cycles instead of treating
                them as something to fix.
              </P>
            </Prose>
          </Section>
        </div>
      </CaseStudyShell>

      <CaseStudyFooter />
    </main>
  );
}
