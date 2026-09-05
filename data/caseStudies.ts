// Case study content, pulled from Notion (Case Study Hub + per-project pages).
// Sections follow the Notion "Case Study Framework": Hook, My Role, Research,
// The Insight That Changed Everything, Design Decisions, The Solution,
// Outcomes, What I'd Do Differently, What This Taught Me.
//
// Sections marked [YOUR VOICE] / [PLACEHOLDER] / [PROTOTYPE] in Notion are
// left `empty: true` here — no copy invented, filled in later.

export type Block =
  | { type: "p"; text: string }
  | { type: "fields"; items: { label: string; value: string }[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "list"; items: string[] }
  | { type: "decisions"; items: { title: string; body: string }[] }
  | { type: "hmw"; text: string }
  | { type: "note"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "asset"; label: string }
  | { type: "screens"; images: { src: string; caption?: string }[] }
  | { type: "prototype"; url: string; label?: string };

export interface Section {
  id: string;
  number: string;
  heading: string;
  empty?: boolean;
  blocks?: Block[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  cardDescription: string; // verbatim excerpt from the Notion Hook, used on the case study page
  homeOneLiner: string; // one-liner for the homepage work grid, as dictated by Simran
  homeTags?: string[]; // optional tag row for the homepage work grid card
  coverImage: string; // homepage work grid card image — gradient placeholder fallback
  realCover?: string; // real screenshot to use instead of the placeholder, when available
  subtitle: string;
  role: string;
  year: string;
  status?: string; // e.g. "Research stage — prototype in progress"
  disciplines: string[];
  color: string;
  prototypeUrl?: string;
  // Keeps a project written but off the site: no card, no page, skipped by "next project".
  // Delete the flag to bring it back.
  hidden?: boolean;
  meta: {
    team: string;
    researchMethods: string[];
    platform: string;
    duration: string;
  };
  sections: Section[];
}

const allCaseStudies: CaseStudy[] = [
  // ── Whspr ────────────────────────────────────────────────────────────────
  {
    slug: "whspr",
    title: "Whspr",
    cardDescription:
      "That knowledge lives in DMs and disappears the second the conversation ends.",
    homeOneLiner: "Giving women's place knowledge somewhere to live",
    homeTags: ["Research", "Interaction Design"],
    coverImage: "/covers/whspr.jpg",
    realCover: "/whspr/area-info-expanded.png",
    subtitle:
      "A crowdsourced urban intelligence platform for women navigating city spaces",
    role: "Product Lead & Designer",
    year: "2026",
    disciplines: ["Product Design", "Full-Stack", "AI Integration"],
    color: "#1B1B2F",
    meta: {
      team: "Solo — product lead & designer",
      researchMethods: ["User Interviews", "Secondary Research", "Competitive Analysis"],
      platform: "Mobile Web App",
      duration: "6 sprints",
    },
    sections: [
      {
        id: "hook",
        number: "01",
        heading: "Hook",
        blocks: [
          {
            type: "p",
            text: "It started with something I kept doing without noticing. Every time I went somewhere new at night, I'd text three friends before leaving. “Is this bar okay to go to alone?” “What's the vibe there at night?” Yelp doesn't answer that. Neither does Google Maps. That knowledge lives in DMs and disappears the second the conversation ends.",
          },
          {
            type: "p",
            text: "81% of women have experienced harassment in a public space. 70% text or call someone to share their whereabouts when going out alone. That's not an edge case, that's baseline behavior for most women I know, myself included. So the question became simple: why doesn't anything capture the knowledge women already share with each other?",
          },
          {
            type: "p",
            text: "Safety apps exist. Citizen, for one. But research on apps like it (Chordia et al.) found they use deceptive design patterns that raise the salience of threat, alerting users to incidents that aren't even nearby. Users describe them as stressful and alarmist. That's not the same problem as mine. I didn't want to build something that makes the city feel scarier. I wanted to build something that makes the knowledge women already have findable.",
          },
          { type: "p", text: "That's Whspr." },
        ],
      },
      {
        id: "role",
        number: "02",
        heading: "My Role",
        blocks: [
          {
            type: "p",
            text: "I led the research, the product decisions, and the interaction design end to end: the interview study, the information architecture, the contribution flow, the trust and verification system, and the visual design system (dark UI, Signal Amber accent, DM Serif Display / DM Sans). I built the Claude Code prototype solo.",
          },
        ],
      },
      {
        id: "research",
        number: "03",
        heading: "Research",
        blocks: [
          {
            type: "stats",
            items: [
              { value: "81%", label: "Have experienced harassment in a public space" },
              { value: "70%", label: "Share whereabouts when out alone" },
            ],
          },
          {
            type: "p",
            text: "Secondary research pointed to three things: perceived safety, not crime data, drives how women move through a city, and familiarity is the strongest predictor of it (Dubey, Ait Bihi Ouali, Ceccato). Fricker's epistemic injustice framework explains why that knowledge gets dismissed as anecdotal instead of trusted. And friction, done right, improves contribution quality instead of hurting it (Alter, Nissenbaum).",
          },
          {
            type: "p",
            text: "Interviews with women in NYC confirmed the behavior was already happening informally: warnings in group chats, not public reviews, because that felt exposing. Trust and anonymity were conditions for contributing, not nice-to-haves.",
          },
        ],
      },
      {
        id: "insight",
        number: "04",
        heading: "The Insight That Changed Everything",
        blocks: [
          {
            type: "p",
            text: "I went in thinking this was a safety problem. It's not, not only. It's a knowledge problem.",
          },
          {
            type: "p",
            text: "Women already do this work. They already track and share and warn each other. What's missing is infrastructure, somewhere for that knowledge to live that doesn't flatten it into a star rating or amplify it into fear.",
          },
          {
            type: "p",
            text: "That reframe changed the whole design direction. The question stopped being “how do I keep women safe” and became “how do I make sure this knowledge doesn't get lost, gatekept, or dismissed.”",
          },
          { type: "asset", label: "The gap diagram — existing safety apps vs. Whspr" },
          {
            type: "hmw",
            text: "How might we give women's place-based knowledge somewhere to live, without flattening it into a rating or a fear alert?",
          },
        ],
      },
      {
        id: "decisions",
        number: "05",
        heading: "Design Decisions",
        blocks: [
          {
            type: "decisions",
            items: [
              {
                title: "No star ratings",
                body: "Short, observational signals tagged with context instead. Five quick prompts before you can post, deliberately more than a rating takes. Contribution reads closer to testimony than a transaction.",
              },
              {
                title: "Gender lives on the account, not the signal",
                body: "Self-declared once at sign-up, shown automatically after. No mid-flow decisions, no settings-menu digging.",
              },
              {
                title: "Trust is verified, not assumed",
                body: "Browsing is open. Posting requires ID verification. Trust score factors in contributor history, corroboration across signals, behavior, not a blunt block.",
              },
              {
                title: "Real data, not synthetic",
                body: "Getting There & Back and Area Info pull from Mapbox. Real transit stops, real walk distances, not placeholders.",
              },
              {
                title: "Day/Night toggle, not one blended score",
                body: "A block that's well lit at 6pm and “grab a Lyft” at 1am is two pieces of information, not one average.",
              },
            ],
          },
          {
            type: "p",
            text: "Signals older than six months fade out. Places with under four contributions show an “early data” flag instead of false confidence.",
          },
          { type: "asset", label: "Trust scoring diagram — account age, verification, location match" },
          { type: "asset", label: "Day/Night mode side-by-side" },
        ],
      },
      {
        id: "solution",
        number: "06",
        heading: "The Solution",
        blocks: [
          {
            type: "p",
            text: "Whspr: a crowdsourced urban intelligence platform for women navigating city spaces.",
          },
          {
            type: "list",
            items: [
              "Search a place, see signals — short, observational, tagged with time and context",
              "Getting There & Back — real walk to transit, well lit or not, busy or not",
              "Area Info — what's open nearby right now",
              "No scores. Just what someone who's actually been there noticed.",
            ],
          },
          {
            type: "screens",
            images: [
              { src: "/whspr/splash.png", caption: "Onboarding" },
              { src: "/whspr/search.png", caption: "Search" },
              { src: "/whspr/search-results.png", caption: "Signals" },
              { src: "/whspr/area-info.png", caption: "Area Info" },
              { src: "/whspr/post-submission.png", caption: "Submit a signal" },
            ],
          },
        ],
      },
      {
        id: "outcomes",
        number: "07",
        heading: "Outcomes",
        blocks: [
          {
            type: "fields",
            items: [
              {
                label: "Validated",
                value:
                  "The underlying behavior is real, every interview confirmed it, not one person questioned why this needed to exist. The verification-for-trust model landed well across conversations, one participant asked about it unprompted, meaning users understand authentication as part of what makes a signal worth reading.",
              },
              {
                label: "Not yet done",
                value:
                  "Formal usability testing on the interface itself. The interviews validated the need, not the flow. That's the honest gap, and per Alison's note on Resy, the clear next step for a stronger outcomes section.",
              },
              {
                label: "Still building",
                value:
                  "The moderation and corroboration layer is designed, not live. Trust scoring exists in the data model, not yet as active weighting logic.",
              },
            ],
          },
        ],
      },
      {
        id: "retro",
        number: "08",
        heading: "What I'd Do Differently",
        blocks: [
          {
            type: "p",
            text: "Build the moderation layer for real. Corroboration between contributors should be the actual trust mechanism, right now it's designed, not live.",
          },
        ],
      },
      {
        id: "learnings",
        number: "09",
        heading: "What This Taught Me",
        blocks: [
          {
            type: "p",
            text: "The knowledge people need already exists. Most of the time it's just sitting in the wrong place, unsearchable, undervalued, or split across a hundred private conversations. Good design doesn't invent that knowledge. It gives it somewhere to live.",
          },
        ],
      },
    ],
  },

  // ── Resy ─────────────────────────────────────────────────────────────────
  {
    slug: "resy",
    title: "Resy Celebrations — A Concept",
    cardDescription:
      "I was planning my own birthday dinner and somehow ended up doing venue scouting on foot.",
    homeOneLiner: "A concept for Resy: making large-group booking work for both sides",
    coverImage: "/covers/resy.jpg",
    homeTags: ["Concept", "Research", "Design"],
    subtitle:
      "An independent concept for large-party booking on Resy, for groups of 8+. Not affiliated with Resy.",
    role: "UX Researcher & Product Designer",
    year: "2024",
    status: "Independent student concept — not affiliated with Resy",
    disciplines: ["UX Research", "Feature Design", "Service Design"],
    color: "#C4472A",
    prototypeUrl: "https://resy-celebrations-portfolio.surge.sh",
    meta: {
      team: "4 — me plus 3 engineers",
      researchMethods: [
        "Survey",
        "User Interviews (15)",
        "Restaurant Manager Interviews (6)",
        "Affinity Mapping",
        "Journey Mapping",
      ],
      platform: "Mobile feature, existing Resy app",
      duration: "Semester 3, UX design course",
    },
    // Rendered by the bespoke route at app/work/resy/page.tsx. These sections
    // mirror that narrative — two-sided workflow, the trust problem each side
    // faces, then how the design resolves it — and are kept in sync so the data
    // never contradicts the page.
    sections: [
      {
        id: "context",
        number: "01",
        heading: "Context",
        blocks: [
          {
            type: "note",
            text: "An independent concept made for a university UX course. Not affiliated with, commissioned by, or endorsed by Resy. Nothing here shipped.",
          },
          {
            type: "p",
            text: "Booking a table for 2 on Resy takes seconds. Booking for 15 sends you to your email. For groups of 8 or more, most restaurants can't confirm through the app. Resy caps the party size and tells you to email the restaurant directly.",
          },
          {
            type: "quote",
            text: "There's no infrastructure inside Resy for the one kind of booking that needs it most.",
          },
          {
            type: "p",
            text: "The problem found me before the project did. My birthday was coming up and I was trying to book a group dinner in New York. Once I set the party size past 6 on Resy and OpenTable, both apps told me to email the restaurant. Most took 2-3 days to reply, some never did. My partner and I gave up and went to the Lower East Side and East Village in person, walking into bars to ask about minimum spends. We got more in an afternoon on foot than in a week of emails.",
          },
        ],
      },
      {
        id: "both-sides",
        number: "02",
        heading: "The Workflow, From Both Sides",
        blocks: [
          {
            type: "p",
            text: "The fastest way to see the gap is to lay the two sides next to each other. The guest sets a party size past 6, gets handed to email, waits days, and finds out the minimum spend three emails deep. The restaurant receives an unstructured email, asks the follow-up questions Resy never collected, quotes a minimum, and holds the space on trust. Both are trying to reach the same outcome. Neither has anywhere in the product to do it.",
          },
          {
            type: "p",
            text: "The email hand-off isn't a slow step in the flow. It is the flow — everything that matters to either side happens outside the product.",
          },
        ],
      },
      {
        id: "research",
        number: "03",
        heading: "The Research",
        blocks: [
          {
            type: "fields",
            items: [
              {
                label: "Methods",
                value:
                  "A survey to define the target user, then two rounds of interviews — 15 users first, then 6 restaurant managers across Brooklyn and Manhattan.",
              },
              {
                label: "Who we spoke to",
                value:
                  "Working professionals in NYC, roughly 29-33, plus restaurant managers including Convivium Osteria.",
              },
            ],
          },
          {
            type: "stats",
            items: [
              { value: "93%", label: "Still call or email restaurants directly for group bookings" },
              { value: "67%", label: "Didn't learn the minimum spend or policy until after reaching out" },
              { value: "87%", label: "Named limited availability and hidden costs as their biggest frustration" },
            ],
          },
          {
            type: "p",
            text: "The thing that would decide whether a place was even an option, the minimum spend and the policy, was the one thing you couldn't see until you'd already spent the effort to ask.",
          },
          {
            type: "p",
            text: "The survey decided the target. Students dropped out fast — most don't use Resy because it wants a card on file, and a sit-down dinner for 15 isn't in the budget. The user interviews confirmed the pattern: everyone had tried Resy for a big group, almost nobody had booked through it. The words that kept coming up were \u201cwaiting,\u201d \u201chidden costs,\u201d and \u201cI didn't even know if it was confirmed.\u201d",
          },
          {
            type: "quote",
            text: "If guests saw sample menus, pricing, and policies before emailing us, that would filter out groups who aren't serious.",
            attribution: "Manager, Convivium Osteria",
          },
        ],
      },
      {
        id: "insight",
        number: "04",
        heading: "The Insight",
        blocks: [
          {
            type: "p",
            text: "We almost didn't interview restaurant managers. My professor pushed us past the user side to talk to the people running these rooms. That's where the problem got more interesting.",
          },
          {
            type: "p",
            text: "The managers weren't refusing large bookings. They were doing work Resy had no infrastructure for. Event type, seating, dietary needs, minimum spend, prix fixe — none of it fits a standard reservation. So they took the conversation to email, because email was the only place it could happen.",
          },
          {
            type: "p",
            text: "The back-and-forth email wasn't really the problem. Resy just didn't have anywhere for restaurants and guests to exchange the specifics at all. I couldn't fix the user's side by speeding up email. The fix had to give both sides a place to have the conversation Resy had been pushing off the platform.",
          },
          {
            type: "hmw",
            text: "How might we help users book and manage a large-party reservation inside Resy, instead of routing them back to email?",
          },
        ],
      },
      {
        id: "trust",
        number: "05",
        heading: "What Each Side Is Risking",
        blocks: [
          {
            type: "p",
            text: "Underneath the logistics, this is a trust problem, and it isn't symmetrical. Both sides are being asked to commit before the other one has.",
          },
          {
            type: "p",
            text: "The guest risks committing a group of 12 to a place they can't picture, at a price they can't see, through a channel that gives them no confirmation. The frustration that came up most wasn't cost — it was not knowing whether anything was actually booked.",
          },
          {
            type: "p",
            text: "The restaurant risks holding a room, staffing it, and prepping a set menu for a party that may not arrive. The managers described this directly: minimum spends, kitchen strain, staffing, no-show risk. Gating 8+ behind email isn't obstruction. It's the only screening tool they have.",
          },
          {
            type: "p",
            text: "The restaurant side turned out to be enormous — an operational problem in its own right, and never the scope of a research course project. What the manager research did was let me design a grounded, hypothetical experience for their side, built on what they actually told us, without pretending I'd solved restaurant operations.",
          },
        ],
      },
      {
        id: "commitment",
        number: "06",
        heading: "Deposits and the Card Hold",
        blocks: [
          {
            type: "p",
            text: "This is the mechanism the whole concept rests on, and it's the part I got least far with. A restaurant will accept a large party when the party has committed to something. That is the entire reason the 8+ gate exists.",
          },
          {
            type: "p",
            text: "What the design does carry: once a booking is confirmed, it becomes a shared space. The host sends an RSVP link through the app, guests confirm and split any deposit in-app, and the restaurant's headcount updates automatically before the cutoff. That solves the guest-side half.",
          },
          {
            type: "asset",
            label:
              "BLOCKED (E2): guest-side deposit / card-hold step in the request flow, restaurant-side view of a guaranteed booking, and the cancellation and refund rule. Not yet designed.",
          },
          {
            type: "p",
            text: "What the design does not carry is the other half: what actually protects the restaurant from a no-show or a late cancellation. I understood that risk from the manager research and never translated it into the design. There is no screen where a card is held, where a deposit is taken at request time rather than after confirmation, or where a cancellation window is stated and enforced.",
          },
          {
            type: "p",
            text: "That was the sharpest note this project got, and it's a fair one. A case study that writes about deposits without showing them is describing a mechanism it hasn't designed. Designing those three screens is the next thing I'm doing to this project.",
          },
        ],
      },
      {
        id: "decisions",
        number: "07",
        heading: "Design Decisions",
        blocks: [
          {
            type: "decisions",
            items: [
              {
                title: "Celebrations as its own mode, not a filter",
                body: "The first call was structural. I could have bolted a party-size filter onto the existing flow. But a large-group booking isn't a bigger version of a table for 2. It carries different information, a longer timeline, and higher stakes on both sides. A dedicated Celebrations tab signals that upfront, to guests and restaurants both.",
              },
              {
                title: "Preference-first discovery",
                body: "Before showing any restaurants, Celebrations asks what you're planning: event type, party size, date, budget range, vibe. Most discovery shows results first and filters after. The research said why that fails here — people were reaching out to places that couldn't hold them, then finding out 3 emails deep. Collecting preferences first means every result on screen is already a real option. Browsing happens through a scrollable list with a map toggle, the pattern Resy users already know.",
              },
              {
                title: "A structured request, and a place for the restaurant to answer it",
                body: "Instead of open email, the guest sends a structured request: event type, headcount, dietary needs, timing. The restaurant receives it in a manager dashboard, pre-filled, and can accept, counter, or decline without touching their inbox. Every manager said the same thing — the email was never the point, there was just nowhere else for that conversation to live.",
              },
              {
                title: "Group coordination and payment split",
                body: "Once it's confirmed, the booking becomes a shared space. The host sends an RSVP link through the app, guests confirm and split any deposit in-app, and the restaurant's headcount updates automatically before the cutoff. No chasing 12 people on Venmo.",
              },
            ],
          },
        ],
      },
      {
        id: "solution",
        number: "08",
        heading: "How The Design Resolves It",
        blocks: [
          {
            type: "p",
            text: "Resy Celebrations is a dedicated tab inside Resy for groups of 8 or more. Not a filter, not a workaround. A separate mode that tells both the user and the restaurant this is a different kind of booking.",
          },
          {
            type: "p",
            text: "The guest says what they're planning, browses only options that can actually hold the group with minimum spend and capacity visible upfront, sends one structured request, and watches the status move in a tracker instead of refreshing an inbox. The restaurant receives a pre-filled request, accepts or counters or declines from a dashboard, publishes its policies upfront, and sees a live headcount before the cutoff.",
          },
          {
            type: "quote",
            text: "The whole feature does one thing the old flow couldn't: it keeps the guest and the restaurant in the same place long enough to actually agree on a plan.",
          },
          { type: "prototype", url: "https://resy-celebrations-portfolio.surge.sh" },
        ],
      },
      {
        id: "landed",
        number: "09",
        heading: "Where It Landed",
        blocks: [
          {
            type: "p",
            text: "The scope of this project was needfinding and proposing a solution, and that's what we delivered: end-to-end research across 15 users and 6 managers, a survey, synthesis, personas, current and future journey maps, and a lo-fi prototype covering the full flow on both sides. The hi-fi prototype in this case study I built after the course, on my own.",
          },
          {
            type: "list",
            items: [
              "The solution didn't go far enough on how Celebrations protects restaurants from no-shows and last-minute cancellations. I understood that risk from the manager research but didn't fully translate it into the design.",
              "The original swipe-to-browse mechanic got fair pushback for working better as discovery than as a primary way to choose a high-stakes booking, which is why the current version uses Resy's list and map instead.",
              "We carried one persona too many, with two that overlapped.",
            ],
          },
        ],
      },
      {
        id: "differently",
        number: "10",
        heading: "What I'd Do Differently",
        blocks: [
          {
            type: "p",
            text: "I'd have tried to talk to someone at Resy. We understood the problem cold from the user and restaurant sides, but we never pressure-tested whether this was viable for Resy as a business. Is the 8+ gap a technical limit, a strategic choice, a resource call? I don't know, and that conversation would have made the whole solution sharper.",
          },
          {
            type: "p",
            text: "We also debated the scope early — sit-down dinners versus standing events, bigger market versus tighter problem — and chose to focus on 8-15 sit-down. I still think that was right, but I'd defend it out loud rather than leave it implicit.",
          },
        ],
      },
      {
        id: "taught",
        number: "11",
        heading: "What This Taught Me",
        blocks: [
          {
            type: "p",
            text: "This was my first two-sided problem, and I didn't really understand what that meant until I was inside it. The moment the restaurant side came in, almost every decision I'd made for the user had to be reconsidered. You can't design one side of a transaction well without understanding what the other side actually needs.",
          },
        ],
      },
    ],
  },

  // ── AIRA ─────────────────────────────────────────────────────────────────
  {
    slug: "aira-pcos",
    title: "AIRA",
    cardDescription:
      "I know what it's like to open four different apps just to understand why today feels harder than yesterday.",
    homeOneLiner: "Turning PCOS tracking from guilt into permission",
    homeTags: ["Research", "Product Design"],
    coverImage: "/covers/aira.jpg",
    realCover: "/AIRAScreens/Energy PAge 4.png",
    subtitle: "A circadian rhythm app for PCOS management",
    role: "Product Designer & Researcher",
    year: "2024",
    disciplines: ["UX Research", "Product Design", "Interaction Design"],
    color: "#2D2D2D",
    meta: {
      team: "4-person team (shared build)",
      researchMethods: [
        "User Interviews",
        "Survey",
        "Behavioral Science Review",
        "Expert Consultation",
      ],
      platform: "Mobile App",
      duration: "12 weeks",
    },
    sections: [
      {
        id: "hook",
        number: "01",
        heading: "Hook",
        blocks: [
          {
            type: "p",
            text: "PCOS doesn't have one fix. It has forty, sleep, food, stress, cycle, mood, all feeding into each other, and almost every tool out there asks you to manage one of them like it's the whole problem. I have PCOS. I know what it's like to open four different apps just to understand why today feels harder than yesterday, and still not have anything track the one thing, mood, that actually explains it.",
          },
        ],
      },
      {
        id: "role",
        number: "02",
        heading: "My Role",
        blocks: [
          {
            type: "fields",
            items: [
              { label: "Team size", value: "4" },
              {
                label: "What I led",
                value:
                  "Concept ideation, problem identification, secondary research on mental models and what existing PCOS/tracking tools miss, and design of the period tracking and food tracking screens.",
              },
              {
                label: "What was shared",
                value: "Sleep tracking (teammate), mood tracking (teammate), sign-up/onboarding (teammate).",
              },
            ],
          },
        ],
      },
      {
        id: "research",
        number: "03",
        heading: "Research",
        blocks: [
          {
            type: "fields",
            items: [
              {
                label: "Methods",
                value: "5 interviews, 20+ survey respondents, one endocrinologist consultation.",
              },
              {
                label: "Key findings",
                value:
                  "PCOS is psychologically loaded, and because symptoms present so differently person to person, there's no one-size-fits-all fix. Women with irregular periods were put off by phase-based period trackers (luteal, follicular, etc.) because irregularity didn't fit the categories, and that mismatch read as shame about a symptom they couldn't control. And tool abandonment wasn't a motivation problem: people stopped logging when the effort outweighed the visible benefit, or when the tone felt judgmental instead of supportive.",
              },
              {
                label: "One thing that stuck with me",
                value:
                  "A participant described managing PCOS across separate sleep, food, and period apps as feeling like a full-time job, and pointed out that nobody was tracking mood, even though mood is one of the clearest ways to spot what's actually triggering a bad symptom day.",
              },
            ],
          },
        ],
      },
      {
        id: "insight",
        number: "04",
        heading: "The Insight That Changed Everything",
        blocks: [
          {
            type: "p",
            text: "An app built to help women with PCOS was making some of them feel ashamed of a symptom they had no control over. That's what the phase-tracker interviews surfaced, women with irregular cycles avoiding the very tool meant to support them, because it kept sorting them into phases their body didn't follow.",
          },
          {
            type: "p",
            text: "That reframed the whole project. It stopped being about tracking habits and became about tracking capacity, and giving people permission to rest instead of a reminder that they'd failed to log something.",
          },
          { type: "asset", label: "The guilt cycle diagram — log a bad day, feel judged, stop using the app" },
          {
            type: "hmw",
            text: "How might we help women track their reality without the app quietly telling them they're doing it wrong?",
          },
        ],
      },
      {
        id: "decisions",
        number: "05",
        heading: "Design Decisions",
        blocks: [
          {
            type: "decisions",
            items: [
              {
                title: "Phase/season toggle on period tracking",
                body: "A switch between clinical phase names (luteal, menstrual) and a season metaphor (spring, winter) for the same cycle data. Built directly for the women who found phase-based tracking shame-inducing when their cycle was irregular, same information, a kinder frame.",
              },
              {
                title: "Readiness Score over streak counter",
                body: "Streaks punish inconsistency, exactly what someone managing fluctuating PCOS symptoms can't promise. A Readiness Score reflects current capacity instead, which fits the “permission to rest” reframe.",
              },
              {
                title: "Non-judgmental logging (photos, no calorie counts)",
                body: "Directly answers the tool-abandonment finding: judgmental tone was a bigger dropout cause than effort. Photo logging removes the numbers that read as diet culture.",
              },
              {
                title: "Dark mode as the default",
                body: "Dark by default keeps AIRA calm and personal instead of clinical. Most health and medical apps default to stark white, which reads sterile and diagnostic, the opposite of the permission-to-rest tone this project is built on. A softer, darker interface feels more like a companion than a chart. Honest note: this was locked in late in the process, and a teammate had pushed for light mode. A light-mode version and a full accessibility pass are on the v2 list.",
              },
              {
                title: "The Energy Wave visualization",
                body: "Nobody in the interviews was tracking mood, despite it being one of the clearest ways to spot symptom triggers. The Energy Wave gives a non-numeric, pattern-over-time view instead of reducing energy or mood to a single score.",
              },
            ],
          },
          { type: "asset", label: "Readiness Score diagram — sleep, stress, symptoms, energy inputs" },
          { type: "asset", label: "Annotated home dashboard — Energy Wave + Readiness Score" },
        ],
      },
      {
        id: "solution",
        number: "06",
        heading: "The Solution",
        blocks: [
          { type: "p", text: "AIRA: a PCOS management app built around capacity, not compliance." },
          {
            type: "list",
            items: [
              "Period tracker — toggle between phase names and seasons",
              "Food tracking — photo-based, no calorie counts",
              "Readiness Score — reflects today's capacity, not a streak",
              "Energy Wave — mood and energy, tracked as a pattern, not a number",
            ],
          },
          {
            type: "note",
            text: "Prototype scope (v1): a few happy paths of an established “day 15” user, not a day-0 signup. The point is to show the payoff, tracking that has run long enough to surface patterns, not the onboarding plumbing. This is why the sign-up/onboarding screens (built by a teammate in light mode, at a different screen size) are out of scope for v1. Dark mode is the locked default throughout. Priority flows: quick daily log → readiness/energy pattern → what your body needs this week.",
          },
          {
            type: "screens",
            images: [
              { src: "/AIRAScreens/Energy PAge 4.png", caption: "Energy Wave" },
              { src: "/AIRAScreens/Menstrual Phase.png", caption: "Menstrual Phase" },
              { src: "/AIRAScreens/Winter (M).png", caption: "Winter (Menstrual)" },
              { src: "/AIRAScreens/Follicular Phase.png", caption: "Follicular Phase" },
              { src: "/AIRAScreens/Spring (F).png", caption: "Spring (Follicular)" },
              { src: "/AIRAScreens/Ovulation.png", caption: "Ovulation" },
              { src: "/AIRAScreens/Summer (O).png", caption: "Summer (Ovulation)" },
              { src: "/AIRAScreens/Luteal.png", caption: "Luteal" },
              { src: "/AIRAScreens/Luteal-1.png", caption: "Luteal (alt)" },
              { src: "/AIRAScreens/Workout - Cycle Insight.png", caption: "Workout — Cycle Insight" },
              { src: "/AIRAScreens/Learn tab - Global NAV.png", caption: "Learn — Global Nav" },
            ],
          },
        ],
      },
      {
        id: "outcomes",
        number: "07",
        heading: "Outcomes",
        blocks: [
          {
            type: "fields",
            items: [
              {
                label: "Validated",
                value:
                  "The core premise, PCOS needs multi-symptom, non-judgmental management, held up across every interview and the survey. Nobody questioned why mood tracking was missing from existing tools once it was pointed out.",
              },
              {
                label: "Not yet done",
                value:
                  "No confirmed prototype or usability testing yet, this validated the need, not the interface. Honest next step, not a finished outcome.",
              },
            ],
          },
        ],
      },
      {
        id: "retro",
        number: "08",
        heading: "What I'd Do Differently",
        blocks: [
          {
            type: "p",
            text: "Get the interface in front of real users, not just the concept. The research is strong; the readiness score formula and the phase/season toggle haven't been tested with anyone yet.",
          },
          {
            type: "p",
            text: "I'd also revisit the dark-mode call properly instead of defaulting to it under deadline pressure. A teammate pushed for light mode, and the honest answer is we never validated either way. A light-mode version and a full accessibility pass (contrast, tap targets, not relying on color alone) are the clear next step, alongside reworking the period and seasonal-tracker screens with stronger data visualization, since those screens are the direct solution to the irregular-cycle shame finding and deserve to be the strongest visual in the project.",
          },
        ],
      },
      {
        id: "learnings",
        number: "09",
        heading: "What This Taught Me",
        blocks: [
          {
            type: "p",
            text: "A condition that shows up differently in every person needs a tool that doesn't moralize consistency. Health isn't one number, and neither is a good day.",
          },
        ],
      },
    ],
  },

  // ── Street Paws ──────────────────────────────────────────────────────────
  {
    slug: "street-paws",
    title: "Street Paws",
    hidden: true,
    cardDescription:
      "“Helpless. There aren't a lot of avenues except some WhatsApp groups and my story. People usually ignore these messages.”",
    homeOneLiner: "Connecting the people who already want to help street dogs",
    coverImage: "/covers/street-paws.jpg",
    homeTags: ["Research", "UX Design"],
    subtitle: "A proximity-based platform for community street-dog care",
    role: "Researcher & Designer",
    year: "2026",
    status: "Research stage — prototype in progress",
    disciplines: ["UX Research", "Product Design"],
    color: "#6B4226",
    meta: {
      team: "Solo",
      researchMethods: ["User Interviews", "Competitive Analysis", "Persona Development"],
      platform: "Mobile App",
      duration: "In progress",
    },
    sections: [
      { id: "hook", number: "01", heading: "Hook", empty: true },
      { id: "role", number: "02", heading: "My Role", empty: true },
      {
        id: "research",
        number: "03",
        heading: "Research",
        blocks: [
          {
            type: "fields",
            items: [
              {
                label: "Methods",
                value: "6 in-depth user interviews, competitive & comparative analysis, persona development.",
              },
              {
                label: "Who we spoke to",
                value:
                  "People already involved with street dogs — feeders, fosterers, adopters, and ex-volunteers across cities (Goa, Delhi).",
              },
            ],
          },
          {
            type: "list",
            items: [
              "The blocker isn't willingness, it's infrastructure and network. People want to help and don't know who to contact.",
              "Existing “solutions” are scattered WhatsApp groups and Instagram stories that get ignored.",
              "Trust comes from association — credibility increases when a tool is linked to known NGOs.",
              "Strong appetite for SOS alerts and community, with a real concern about misuse to design around.",
              "Fostering and shelter capacity gaps leave people stuck even when willing.",
            ],
          },
          {
            type: "quote",
            text: "Helpless. There aren't a lot of avenues except some WhatsApp groups and my story. People usually ignore these messages.",
            attribution: "Palak, interview participant",
          },
        ],
      },
      { id: "insight", number: "04", heading: "The Insight That Changed Everything", empty: true },
      {
        id: "decisions",
        number: "05",
        heading: "Design Decisions",
        blocks: [
          {
            type: "decisions",
            items: [
              {
                title: "Neighbourhood dashboard as home",
                body: "Proximity-first: NGO/emergency numbers, vet contacts, 24x7 pickup, all filtered by how close they are.",
              },
              {
                title: "SOS alert to nearby community",
                body: "The most-requested feature. Alerts nearby caretakers for urgent cases.",
              },
              {
                title: "Trust via NGO association",
                body: "Participants said credibility comes from known NGOs.",
              },
              {
                title: "Multiple help modes, not just physical",
                body: "Report / respond nearby / help from a distance (donate, share). Built because willingness existed at every level of involvement.",
              },
              {
                title: "Emergency “what to do” guide",
                body: "Directly answers the in-the-moment helplessness finding.",
              },
            ],
          },
        ],
      },
      {
        id: "solution",
        number: "06",
        heading: "The Solution",
        blocks: [
          {
            type: "p",
            text: "Street Paws Connect: a proximity-based platform for community street-dog care.",
          },
          {
            type: "list",
            items: [
              "Neighbourhood dashboard — nearby NGOs, vets, emergency pickup, sorted by distance",
              "Report a dog in need — structured, fast, in the emotional moment",
              "SOS alert — notifies nearby caretakers for urgent cases",
              "Help from a distance — donate or share when you can't go physically",
              "Emergency what-to-do guide — for when you don't know the next step",
            ],
          },
          { type: "asset", label: "Prototype — Report a dog in need → Respond nearby → SOS alert (coming soon)" },
        ],
      },
      { id: "outcomes", number: "07", heading: "Outcomes", empty: true },
      { id: "retro", number: "08", heading: "What I'd Do Differently", empty: true },
      { id: "learnings", number: "09", heading: "What This Taught Me", empty: true },
    ],
  },
];

// Everything downstream (cards, the /work list, the generated routes, and the
// "next project" chain) reads this, so a hidden project drops off the site in one move.
const caseStudies = allCaseStudies.filter((p) => !p.hidden);

export default caseStudies;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((p) => p.slug === slug);
}

export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  const i = caseStudies.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return caseStudies[(i + 1) % caseStudies.length];
}
