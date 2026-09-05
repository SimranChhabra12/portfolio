import { T } from "@/components/casestudy2/tokens";
import { CaseStudyNav, CaseStudyFooter } from "@/components/casestudy2/CaseStudyChrome";
import Section, { P, List, DecisionBlock, Caption, H3 } from "@/components/casestudy2/Section";
import DarkBlock from "@/components/casestudy2/DarkBlock";
import QuoteCallout from "@/components/casestudy2/QuoteCallout";
import { StatRow } from "@/components/casestudy2/StatCallout";
import AssetFlag from "@/components/casestudy2/AssetFlag";
import LivePrototype from "@/components/casestudy2/LivePrototype";
import TwoSidedFlow from "./TwoSidedFlow";
import { COL } from "./columns";

export const metadata = {
  title: "Resy Celebrations — A Concept — Simran Chhabra",
  description:
    "An independent student concept for large-party booking on Resy, for groups of 8+. Not affiliated with or endorsed by Resy.",
};

const RUST = "#C4472A";

export default function ResyPage() {
  return (
    <main style={{ backgroundColor: T.cream }} className="min-h-screen overflow-x-hidden">
      <CaseStudyNav />

      {/* Hero */}
      <section className="px-8 lg:px-16 pt-40" style={{ paddingBottom: T.space.section }}>
        <div style={{ maxWidth: COL.media }}>
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
            Student concept · UX course project · Mobile feature
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: T.type.hero,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: T.ink,
              marginBottom: "1.5rem",
            }}
          >
            Resy Celebrations
            <span style={{ color: T.inkMuted }}> — a concept</span>
          </h1>
          <P large>A large-party booking flow for groups of 8+, designed inside Resy&apos;s existing app.</P>

          {/* E1 — attribution. This never shipped and Resy was never involved. */}
          <div
            className="mt-8"
            style={{
              borderLeft: `2px solid ${RUST}`,
              paddingLeft: "1.25rem",
              maxWidth: COL.text,
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

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16" style={{ maxWidth: 900 }}>
            {[
              { label: "Hats Worn", value: "UX Research, Product Design, Prototyping" },
              { label: "Team", value: "4 — me plus 3 engineers. I led direction and owned research end to end." },
              { label: "Platform", value: "Mobile feature, existing Resy app" },
              { label: "Timeline", value: "Semester 3, UX design course" },
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
      </section>

      <div className="px-8 lg:px-16 min-w-0">
        <div className="flex flex-col min-w-0" style={{ maxWidth: COL.media }}>
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
          </Section>

          {/* 02 — two-sided flow block, dark */}
          <Section id="both-sides" number="02" heading="The Workflow, From Both Sides">
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
              The email hand-off isn&apos;t a slow step in the flow. It is the flow — everything that
              matters to either side happens outside the product.
            </Caption>
          </Section>

          {/* 03 — stats treatment */}
          <Section id="research" number="03" heading="The Research">
            <P>
              I ran a survey to define who this was for, then two rounds of interviews: 15 users
              first, then 6 restaurant managers across Brooklyn and Manhattan.
            </P>
            <StatRow
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
              The survey also decided the target. Students dropped out fast — most don&apos;t use
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
          <Section id="insight" number="04" heading="The Insight">
            <P>
              We almost didn&apos;t interview restaurant managers. My professor pushed us past the
              user side to talk to the people running these rooms. That&apos;s where the problem got
              more interesting.
            </P>
            <P>
              The managers weren&apos;t refusing large bookings. They were doing work Resy had no
              infrastructure for. Event type, seating, dietary needs, minimum spend, prix fixe — none
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
                maxWidth: COL.text,
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

          {/* 05 — dark block treatment */}
          <Section id="trust" number="05" heading="What Each Side Is Risking">
            <P>
              Underneath the logistics, this is a trust problem, and it isn&apos;t symmetrical. Both
              sides are being asked to commit before the other one has.
            </P>
            <DarkBlock bg="#231A18" label="The trust gap">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="flex-1 flex flex-col gap-3 min-w-0">
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: T.type.caption,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: RUST,
                    }}
                  >
                    The guest risks
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: T.type.body,
                      lineHeight: 1.65,
                      color: "#F5F1EE",
                    }}
                  >
                    Committing a group of 12 to a place they can&apos;t picture, at a price they
                    can&apos;t see, through a channel that gives them no confirmation. The
                    frustration that came up most wasn&apos;t cost — it was not knowing whether
                    anything was actually booked.
                  </p>
                </div>
                {/* Divider only while stacked — on md+ the columns sit side by side. */}
                <div
                  className="flex-1 flex flex-col gap-3 min-w-0 border-t md:border-t-0 pt-6 md:pt-0"
                  style={{ borderTopColor: "rgba(245,241,238,0.14)" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: T.type.caption,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: RUST,
                    }}
                  >
                    The restaurant risks
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: T.type.body,
                      lineHeight: 1.65,
                      color: "#F5F1EE",
                    }}
                  >
                    Holding a room, staffing it, and prepping a set menu for a party that may not
                    arrive. The managers described this directly: minimum spends, kitchen strain,
                    staffing, no-show risk. Gating 8+ behind email isn&apos;t obstruction. It&apos;s
                    the only screening tool they have.
                  </p>
                </div>
              </div>
            </DarkBlock>
            <P>
              The restaurant side turned out to be enormous — an operational problem in its own
              right. Solving all of it was never the scope of a research course project. What the
              manager research did was let me design a grounded, hypothetical experience for their
              side, built on what they actually told us, without pretending I&apos;d solved
              restaurant operations. The user was the problem I was solving. The managers were the
              context that made the user&apos;s side designable.
            </P>
          </Section>

          {/* 06 — the named commitment section. Screens are BLOCKED on E2. */}
          <Section id="commitment" number="06" heading="Deposits and the Card Hold">
            <P>
              This is the mechanism the whole concept rests on, and it&apos;s the part I got least
              far with.
            </P>
            <P>
              A restaurant will accept a large party when the party has committed to something. That
              is the entire reason the 8+ gate exists. Everything upstream in this design — the
              preference-first flow, the structured request, the manager dashboard — only earns a
              &ldquo;yes&rdquo; if there&apos;s something at the end of it that makes the booking
              real for the restaurant, not just for the guest.
            </P>
            <P>
              What the design does carry: once a booking is confirmed, it becomes a shared space. The
              host sends an RSVP link through the app, guests confirm and split any deposit in-app,
              and the restaurant&apos;s headcount updates automatically before the cutoff. That
              solves the guest-side half — nobody is chasing 12 people on Venmo, and the restaurant
              gets a live headcount instead of a number from three weeks ago.
            </P>

            <AssetFlag label="E2, blocked on design: the guest-side deposit / card-hold step inside the request flow, the restaurant-side view of a guaranteed booking, and the cancellation and refund rule. These screens do not exist yet — this section is written around the gap rather than illustrating it." />

            <H3>The honest gap</H3>
            <P>
              What the design does <em>not</em> carry is the other half: what actually protects the
              restaurant from a no-show or a late cancellation. I understood that risk from the
              manager research and never translated it into the design. There is no screen in this
              case study where a card is held, where a deposit is taken at request time rather than
              after confirmation, or where a cancellation window is stated and enforced.
            </P>
            <P>
              That was the sharpest note this project got, and it&apos;s a fair one. A case study
              that writes about deposits without showing them is describing a mechanism it
              hasn&apos;t designed. Designing those three screens is the next thing I&apos;m doing to
              this project, and when they exist they belong right here, before the design decisions
              that assume them.
            </P>
          </Section>

          {/* 07 — decisions treatment */}
          <Section id="decisions" number="07" heading="Design Decisions">
            <P>All four came out of the research.</P>

            <DecisionBlock
              index={1}
              accent={RUST}
              title="Celebrations as its own mode, not a filter"
              body="The first call was structural. I could have bolted a party-size filter onto the existing flow. But a large-group booking isn't a bigger version of a table for 2. It carries different information, a longer timeline, and higher stakes on both sides. A dedicated Celebrations tab signals that upfront, to guests and restaurants both."
            />
            <DecisionBlock
              index={2}
              accent={RUST}
              title="Preference-first discovery"
              body="Before showing any restaurants, Celebrations asks what you're planning: event type, party size, date, budget range, vibe. Most discovery shows results first and filters after. The research said why that fails here — people were reaching out to places that couldn't hold them, then finding out 3 emails deep. Collecting preferences first means every result on screen is already a real option. Browsing happens through a scrollable list with a map toggle, the pattern Resy users already know, with minimum spend and capacity visible on each card."
            />
            <DecisionBlock
              index={3}
              accent={RUST}
              title="A structured request, and a place for the restaurant to answer it"
              body="Instead of open email, the guest sends a structured request: event type, headcount, dietary needs, timing. The restaurant receives it in a manager dashboard, pre-filled, and can accept, counter, or decline without touching their inbox. This is the two-sided piece. Every manager said the same thing — the email was never the point, there was just nowhere else for that conversation to live. The dashboard is that somewhere. Input stays light while you're inquiring, and only steps up to committing detail once the restaurant says yes."
            />
            <DecisionBlock
              index={4}
              accent={RUST}
              title="Group coordination and payment split"
              body="Once it's confirmed, the booking becomes a shared space. The host sends an RSVP link through the app, guests confirm and split any deposit in-app, and the restaurant's headcount updates automatically before the cutoff. No chasing 12 people on Venmo."
            />
          </Section>

          {/* 08 — two-sided flow block again, resolved / light */}
          <Section id="solution" number="08" heading="How The Design Resolves It">
            <P>
              Resy Celebrations is a dedicated tab inside Resy for groups of 8 or more. Not a filter,
              not a workaround. A separate mode that tells both the user and the restaurant this is a
              different kind of booking. Here is the same workflow, walked from both sides again.
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
          </Section>

          {/* 09 — live prototype treatment */}
          <Section id="prototype" number="09" heading="Give It A Try">
            <P>
              This is the working hi-fi prototype, not a video. Set your preferences, browse the
              matches, and send a request the way a guest would.
            </P>
            <LivePrototype
              src="https://resy-celebrations-portfolio.surge.sh"
              title="Resy Celebrations — interactive prototype"
            />
            <Caption>
              A concept prototype. It is not connected to Resy and no real reservation is made.
            </Caption>
          </Section>

          {/* 10 — list treatment */}
          <Section id="landed" number="10" heading="Where It Landed">
            <P>
              The scope of this project was needfinding and proposing a solution, so that&apos;s what
              the course asked for and what we delivered: end-to-end research across 15 users and 6
              managers, a survey, synthesis, personas, current and future journey maps, and a lo-fi
              prototype covering the full flow on both sides. The hi-fi prototype in this case study
              I built after the course, on my own, to take the proposed solution from a flow into
              something you can actually move through.
            </P>
            <H3>The honest gaps, named plainly</H3>
            <List
              accent={RUST}
              items={[
                "The solution didn't go far enough on how Celebrations protects restaurants from no-shows and last-minute cancellations. I understood that risk from the manager research but didn't fully translate it into the design.",
                "The original swipe-to-browse mechanic got fair pushback for working better as discovery than as a primary way to choose a high-stakes booking, which is why the current version uses Resy's list and map instead.",
                "We carried one persona too many, with two that overlapped.",
              ]}
            />
          </Section>

          {/* 11 — prose treatment */}
          <Section id="differently" number="11" heading="What I'd Do Differently">
            <P>
              I&apos;d have tried to talk to someone at Resy. We understood the problem cold from the
              user and restaurant sides, but we never pressure-tested whether this was viable for
              Resy as a business. Is the 8+ gap a technical limit, a strategic choice, a resource
              call? I don&apos;t know, and that conversation would have made the whole solution
              sharper.
            </P>
            <P>
              We also debated the scope early — sit-down dinners versus standing events, bigger
              market versus tighter problem — and chose to focus on 8-15 sit-down. I still think that
              was right, but I&apos;d defend it out loud rather than leave it implicit.
            </P>
          </Section>

          {/* 12 — closing quote treatment */}
          <Section id="taught" number="12" heading="What This Taught Me">
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
      </div>

      <CaseStudyFooter />
    </main>
  );
}
