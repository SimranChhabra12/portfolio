import { T } from "@/components/casestudy2/tokens";
import { CaseStudyFooter } from "@/components/casestudy2/CaseStudyChrome";
import Nav from "@/components/ui/Nav";
import Section, { P, List, Caption, H3 } from "@/components/casestudy2/Section";
import QuoteCallout from "@/components/casestudy2/QuoteCallout";
import ResearchStats from "./ResearchStats";
import DecisionCard from "@/components/casestudy2/DecisionCard";
import PrototypeShell from "@/components/casestudy2/resy/PrototypeShell";
import HeroCover from "@/components/casestudy2/resy/HeroCover";
import CaseStudyHeadline from "@/components/casestudy2/CaseStudyHeadline";
import ContextAndRole from "@/components/casestudy2/ContextAndRole";
import SectionIndex from "@/components/casestudy2/SectionIndex";
import TwoSidedFlow from "./TwoSidedFlow";
import CommitmentLadder from "./CommitmentLadder";
import { CaseStudyShell } from "../_components/columns";

export const metadata = {
  title: "Resy Celebrations, a Concept | Simran Chhabra",
  description:
    "An independent student concept for large-party booking on Resy, for groups of 8+. Not affiliated with or endorsed by Resy.",
};

const RUST = "#C4472A";

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

export default function ResyPage() {
  return (
    <main style={{ backgroundColor: T.cream }} className="min-h-screen overflow-x-hidden">
      <Nav coverId="resy-cover" />
      <SectionIndex items={SECTIONS} alignWithId="resy-headline" revealWithId="resy-headline" />

      {/* Cover band */}
      <HeroCover />

      {/* Hero */}
      <CaseStudyShell className="pt-20">
        <div style={{ paddingBottom: T.space.section }}>
          <CaseStudyHeadline
            id="resy-headline"
            headline="Resy Celebrations: Making in‑app large party reservations simpler"
            meta={[
              { label: "Role", value: "UX Researcher • Product Designer • Prototyping" },
              { label: "Platform", value: "Mobile feature, inside the existing Resy app" },
              { label: "Timeline", value: "Semester 3 course project | Team of 4, I led direction and owned research" },
            ]}
          />

          <div className="mt-20">
            <ContextAndRole
              columns={[
                {
                  heading: "What is Resy Celebrations?",
                  body:
                    "A large-party booking flow for groups of eight and up, designed inside Resy's existing app. Parties that size don't fit the normal reservation grid, so today they fall out of the app into phone calls and email threads. Celebrations turns that into an inquiry both sides can see: the guest states what the occasion needs, the restaurant answers or counters, and the group splits the deposit in-app.",
                },
                {
                  heading: "My Role",
                  body:
                    "I owned the research end to end and led the product direction. That meant the interviews on both sides of the table, the decision to treat this as an inquiry rather than a booking, the preference-first discovery flow, the deposit and card-hold model, and the hi-fi prototype you can use further down this page.",
                },
              ]}
            />
          </div>

          {/* Same placement and treatment as the Whspr prototype link: straight under
              My Role, so the working prototype is one click from the top. */}
          <a
            href="/work/resy/prototype"
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

          {/* E1 — attribution. This never shipped and Resy was never involved. */}
          <div
            className="mt-16"
            style={{
              borderLeft: `2px solid ${RUST}`,
              paddingLeft: "1.25rem",
              maxWidth: "var(--col-text, 640px)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: T.type.caption,
                color: T.inkMuted,
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: T.ink }}>This is an independent concept.</strong> It was made
              for a university UX course and is not affiliated with, commissioned by, or endorsed by
              Resy. Nothing here shipped. The Resy name is used only to describe the product the
              concept was designed against.
            </p>
          </div>
        </div>
      </CaseStudyShell>

      <CaseStudyShell>
        <div className="flex flex-col min-w-0">
          {/* 01 — quote treatment */}
          <Section id="context" number="01" heading="Context" first>
            <P>
              Booking a table for 2 on Resy takes seconds. Booking for 15 sends you to your email.
            </P>
            <QuoteCallout
              large
              accent={RUST}
              text="There's no infrastructure inside Resy for the one kind of booking that needs it most."
            />
            <P>
              For groups of 8 or more, most restaurants can&apos;t confirm through the app. Resy caps
              the party size and tells you to email the restaurant directly. So the thing Resy is
              good at, fast and clear booking, quietly stops right at the point where a group dinner
              gets hard to coordinate.
            </P>
            <P>
              The problem found me before the project did. My birthday was coming up and I was
              trying to book a group dinner in New York. Once I set the party size past 6 on Resy and
              OpenTable, both apps told me to email the restaurant. So I did. Most took 2-3 days to
              reply, some never did, and a lot of them didn&apos;t list a phone number at all. When
              they did write back, it was usually a hefty per-person quote I had no way to see
              coming. My partner and I gave up and went to the Lower East Side and East Village in
              person, walking into bars to ask about minimum spends and availability. We got more in
              an afternoon on foot than in a week of emails.
            </P>
            <P>
              The fastest way to see the gap is to lay the two sides next to each other. Both are
              trying to reach the same outcome. Neither has anywhere to do it.
            </P>
            <TwoSidedFlow
              tone="problem"
              label="Booking a large party today"
              middle="Email. The only place this conversation can happen."
              guest={[
                { step: "Sets party size past 6", note: "Resy hands off to email" },
                { step: "Emails several restaurants", note: "Often with no phone number listed" },
                { step: "Waits 2-3 days for a reply", note: "Some never respond" },
                { step: "Finds out the minimum spend", note: "Three emails deep, if at all" },
                { step: "Books whoever answered first", note: "Or gives up" },
              ]}
              restaurant={[
                { step: "Receives an unstructured email", note: "No event type, no headcount" },
                { step: "Asks follow-up questions", note: "Menu, space, dietary needs, timing" },
                { step: "Quotes the minimum spend", note: "Most guests disappear here" },
                { step: "Holds the space on trust", note: "No commitment from the guest" },
                { step: "Tracks it all in an inbox", note: "Nowhere else for it to live" },
              ]}
            />
            <Caption>
              Email isn&apos;t just one slow step here. Almost everything that matters to either side happens there, outside the product.
            </Caption>
          </Section>

          {/* 02 — stats treatment */}
          <Section id="research" number="02" heading="Research">
            <P>
              I ran a survey to define who this was for, then two rounds of interviews: 15 users
              first, then 6 restaurant managers across Brooklyn and Manhattan.
            </P>
            <ResearchStats
              stats={[
                { value: "93%", label: "Still call or email restaurants directly for group bookings, even when they normally use an app" },
                { value: "67%", label: "Didn't learn a restaurant's minimum spend or event policy until after they'd already reached out" },
                { value: "87%", label: "Named limited availability and hidden costs as their biggest frustration" },
              ]}
            />
            <P>
              The thing that would decide whether a place was even an option, the minimum spend and
              the policy, was the one thing you couldn&apos;t see until you&apos;d already spent the
              effort to ask.
            </P>
            <P>
              The survey also decided the target. Students dropped out fast. Most don&apos;t use
              Resy because it wants a card on file, and a sit-down dinner for 15 isn&apos;t in the
              budget. That left working professionals, roughly 29-33. The user interviews confirmed
              the pattern: everyone had tried Resy for a big group at some point, almost nobody had
              booked through it. The words that kept coming up were &ldquo;waiting,&rdquo;
              &ldquo;hidden costs,&rdquo; and &ldquo;I didn&apos;t even know if it was
              confirmed.&rdquo;
            </P>
            <QuoteCallout
              accent={RUST}
              text="If guests saw sample menus, pricing, and policies before emailing us, that would filter out groups who aren't serious."
              attribution="Manager, Convivium Osteria"
            />
          </Section>

          {/* 04 — prose + HMW treatment */}
          <Section id="insight" number="03" heading="The Insight">
            <P>
              We almost didn&apos;t interview restaurant managers. My professor pushed us past the
              user side to talk to the people running these rooms. That&apos;s where the problem got
              more interesting.
            </P>
            <P>
              The managers were open to large bookings, but they were doing a lot of work Resy had no infrastructure for. Event type, seating, dietary needs, minimum spend, prix fixe. None
              of it fits a standard reservation. So they took the conversation to email, because
              email was the only place it could happen.
            </P>
            <P>
              The back-and-forth email wasn&apos;t really the problem. Resy just didn&apos;t have
              anywhere for restaurants and guests to exchange the specifics at all. Once I saw that,
              I understood I couldn&apos;t fix the user&apos;s side by speeding up email. The fix had
              to give both sides a place to have the conversation Resy had been pushing off the
              platform.
            </P>
            <div
              className="w-full"
              style={{
                borderTop: `1px solid ${T.inkFaint}`,
                borderBottom: `1px solid ${T.inkFaint}`,
                padding: "2rem 0",
                maxWidth: "var(--col-text, 640px)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: T.type.caption,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: RUST,
                  marginBottom: "0.75rem",
                }}
              >
                How might we
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: T.type.sub,
                  lineHeight: 1.35,
                  color: T.ink,
                }}
              >
                Help users book and manage a large-party reservation inside Resy, instead of routing
                them back to email?
              </p>
            </div>
          </Section>

          {/* 04 — the decisions, opening on the trust asymmetry they all answer to */}
          <Section id="decisions" number="04" heading="Design Decisions">
            <P>
              Every decision below answers the same thing. Underneath the logistics, this is a trust
              problem, and it isn&apos;t symmetrical. Both sides are being asked to commit before the
              other one has.
            </P>
            <figure className="w-full m-0">
              <p
                className="mb-4"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: T.type.caption,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: T.inkMuted,
                }}
              >
                The trust gap
              </p>
              <div
                className="grid grid-cols-1 md:grid-cols-2"
                style={{ borderTop: `1px solid ${T.ink}` }}
              >
                {[
                  {
                    who: "The guest risks",
                    text: "Committing a group of 12 to a place they can't picture, at a price they can't see, through a channel that gives them no confirmation. The frustration that came up most was less about cost and more about not knowing whether anything was actually booked.",
                  },
                  {
                    who: "The restaurant risks",
                    text: "Holding a room, staffing it, and prepping a set menu for a party that may not arrive. The managers described this directly: minimum spends, kitchen strain, staffing, no-show risk. Keeping bookings of 8+ on email is one of the few ways they have to screen them.",
                  },
                ].map((side, i) => (
                  <div
                    key={side.who}
                    className={`flex flex-col gap-3 pt-6 pb-2 ${i === 0 ? "md:pr-10" : "md:pl-10 md:border-l border-t md:border-t-0 mt-6 md:mt-0"}`}
                    style={{ borderColor: T.inkFaint }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: "1.25rem",
                        color: RUST,
                        lineHeight: 1.3,
                      }}
                    >
                      {side.who}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "1rem",
                        lineHeight: 1.65,
                        color: T.ink,
                      }}
                    >
                      {side.text}
                    </p>
                  </div>
                ))}
              </div>
            </figure>
            <P>
              The restaurant side turned out to be enormous, an operational problem in its own
              right. Solving all of it was never the scope of a research course project. What the
              manager research did was let me design a grounded, hypothetical experience for their
              side, built on what they actually told us, without pretending I&apos;d solved
              restaurant operations. The user was the problem I was solving. The managers were the
              context that made the user&apos;s side designable.
            </P>
            <H3>Deposits and the card hold</H3>
            <P>
              A restaurant will accept a large party when the party has committed to something. That
              is the entire reason the 8+ gate exists. Everything upstream in this design (the
              preference-first flow, the structured request, the manager dashboard) only earns a
              &ldquo;yes&rdquo; if there&apos;s something at the end of it that makes the booking
              real for the restaurant, not just for the guest.
            </P>
            <P>
              What the design does carry: once a booking is confirmed, it becomes a shared space. The
              host sends an RSVP link through the app, guests confirm and split any deposit in-app,
              and the restaurant&apos;s headcount updates automatically before the cutoff. That
              solves the guest-side half. Nobody is chasing 12 people on Venmo, and the restaurant
              gets a live headcount instead of a number from three weeks ago.
            </P>

            <CommitmentLadder />
            <P>
              The prototype now has the hold. Once the restaurant says yes, the guest holds a card
              against the minimum. Nothing is charged, and it&apos;s only taken if the group cancels
              late or doesn&apos;t show. That&apos;s the moment the booking becomes real for the
              restaurant, and their dashboard marks it guaranteed instead of just accepted. Until
              the guest holds a card, the tracker stops one step short of confirmed. That was the
              sharpest note this project got, and it&apos;s a fair one, so it was the first thing I
              built after the course.
            </P>

            <H3>The four decisions this made possible</H3>

            <DecisionCard
              project="resy"
              variant="notes"
              index={1}
              choice="Celebrations as its own mode, not a filter"
              insteadOf="A party-size filter bolted onto the existing reservation flow"
              because="A large-group booking isn't a bigger version of a table for two. It carries different information, a longer timeline, and higher stakes on both sides. A dedicated tab says that upfront, to guests and restaurants both."
              research="6 manager interviews. Every one described 8+ as a different job, not a bigger one"
            />
            <DecisionCard
              project="resy"
              variant="notes"
              index={2}
              choice="Ask what you're planning before showing a single restaurant"
              insteadOf="Results first, filters after, the way most discovery flows work"
              because="People were reaching out to places that could never have held them, and only finding out three emails deep. Collecting event type, size, date, budget and vibe first means every result on screen is already a real option, with minimum spend and capacity on the card."
              research="67% didn't learn the minimum spend or policy until after they'd already reached out"
              voice={{
                quote: "If guests saw sample menus, pricing, and policies before emailing us, that would filter out groups who aren't serious.",
                attribution: "Manager, Convivium Osteria",
              }}
            />
            <DecisionCard
              project="resy"
              variant="notes"
              index={3}
              choice="A structured request, and a dashboard for the restaurant to answer it"
              insteadOf="Speeding up the email thread, or auto-confirming large parties"
              because="The email was never the point. There was just nowhere else for that conversation to live. The guest sends event type, headcount, dietary needs and timing as fields, and the restaurant accepts, counters, or declines without touching their inbox. Input stays light while you're inquiring and only steps up once the restaurant says yes."
              research="All 6 managers described the same inbox workaround, independently"
            />
            <DecisionCard
              project="resy"
              variant="notes"
              index={4}
              choice="The confirmed booking becomes a shared space, not a receipt"
              insteadOf="One host on the hook for the deposit, chasing twelve people on Venmo"
              because="The host sends an RSVP link through the app, guests confirm and split the deposit in-app, and the restaurant's headcount updates automatically before the cutoff. The restaurant stops planning against a number that's three weeks old."
              research="Managers named no-shows and stale headcounts as the two costs of saying yes"
            />
          </Section>

          {/* 05 — the resolved flow, then the thing itself */}
          <Section id="product" number="05" heading="The Product">
            <P>
              Resy Celebrations is a dedicated tab inside Resy for groups of 8 or more. It&apos;s its
              own mode, so both the guest and the restaurant know this is a different kind of
              booking. Here&apos;s the same workflow again, from both sides.
            </P>
            <TwoSidedFlow
              tone="resolved"
              label="Booking a large party through Celebrations"
              middle="One structured request, answered in the product."
              guest={[
                { step: "Says what they're planning", note: "Event type, size, date, budget, vibe" },
                { step: "Browses only real options", note: "Minimum spend and capacity on every card" },
                { step: "Sends one structured request", note: "Not an email into the void" },
                { step: "Watches the status move", note: "A tracker, not a refreshed inbox" },
                { step: "Shares an RSVP link", note: "Guests confirm and split the deposit in-app" },
              ]}
              restaurant={[
                { step: "Receives a pre-filled request", note: "Every field they'd have had to ask for" },
                { step: "Accepts, counters, or declines", note: "Without touching their inbox" },
                { step: "Publishes policies upfront", note: "Filters out groups who aren't serious" },
                { step: "Sees a live headcount", note: "Updated automatically before the cutoff" },
                { step: "Works from a dashboard", note: "Somewhere for the conversation to live" },
              ]}
            />
            <QuoteCallout
              large
              accent={RUST}
              text="The whole feature does one thing the old flow couldn't: it keeps the guest and the restaurant in the same place long enough to actually agree on a plan."
            />
            <H3>Give it a try</H3>
            <P>
              This is the working hi-fi prototype, so you can actually use it. Set your
              preferences, browse the matches that fit your party, and send a request.
              Then open the restaurant&apos;s dashboard, accept or counter your own inquiry,
              and watch your tracker move. Both sides read the same data.
            </P>
            <PrototypeShell />
            <Caption>
              A concept prototype. It is not connected to Resy, and no real reservation is made.
            </Caption>
          </Section>

          {/* 10 — list treatment */}
          <Section id="landed" number="06" heading="Where It Landed">
            <P>
              The scope of this project was needfinding and proposing a solution, so that&apos;s what
              the course asked for and what we delivered: research across 15 users and 6
              managers, a survey, synthesis, personas, current and future journey maps, and a lo-fi
              prototype covering the full flow on both sides. The hi-fi prototype in this case study
              I built after the course, on my own, to take the proposed solution from a flow into
              something you can actually move through.
            </P>
            <H3>What didn&apos;t work</H3>
            <List
              accent={RUST}
              items={[
                "The course version didn't go far enough on protecting restaurants from no-shows and last-minute cancellations. I understood that risk from the manager research but didn't design for it until the hi-fi prototype, which added the card hold.",
                "The original swipe-to-browse mechanic got fair pushback for working better as discovery than as a primary way to choose a high-stakes booking, which is why the current version uses Resy's list and map instead.",
                "We carried one persona too many, with two that overlapped.",
              ]}
            />
          </Section>

          {/* 11 — prose treatment */}
          <Section id="next" number="07" heading="What I'd Do Next">
            <P>
              <strong>Put it in front of people.</strong>{" "}Everything in this prototype is built on
              interviews, but nobody has used it yet. I&apos;d run short sessions with 3-5 people
              who&apos;ve organized a group dinner recently, give them a real occasion to plan, and
              watch where they stop. The hold is the part I&apos;m least sure of.
            </P>
            <P>
              <strong>Talk to someone at Resy.</strong>{" "}We understood the problem cold from the guest
              and restaurant sides and never pressure-tested whether it was viable for Resy as a
              business. Is the 8+ gap a technical limit, a strategic choice, or a resource call? I
              don&apos;t know, and not knowing is the biggest hole in the argument.
            </P>
            <P>
              <strong>Defend the scope out loud.</strong> We debated sit-down dinners versus standing
              events early on and chose 8-15 sit-down. I still think that was right, but the case
              study currently assumes it rather than making the case.
            </P>
          </Section>

          {/* 12 — closing quote treatment */}
          <Section id="takeaway" number="08" heading="What I Took Away">
            <QuoteCallout
              large
              accent={RUST}
              text="You can't design one side of a transaction well without understanding what the other side actually needs."
            />
            <P>
              This was my first two-sided problem, and I didn&apos;t really understand what that
              meant until I was inside it. The moment the restaurant side came in, almost every
              decision I&apos;d made for the user had to be reconsidered.
            </P>
          </Section>
        </div>
      </CaseStudyShell>

      <CaseStudyFooter />
    </main>
  );
}
