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
  meta: {
    team: string;
    researchMethods: string[];
    platform: string;
    duration: string;
  };
  sections: Section[];
}

const caseStudies: CaseStudy[] = [
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
    title: "Resy Celebrations",
    cardDescription:
      "I was planning my own birthday dinner and somehow ended up doing venue scouting on foot.",
    homeOneLiner: "Making large-group booking work for both sides",
    coverImage: "/covers/resy.jpg",
    homeTags: ["Research", "Design"],
    subtitle: "A large-party booking feature for the Resy platform",
    role: "UX Researcher & Product Designer",
    year: "2024",
    disciplines: ["UX Research", "Feature Design", "Service Design"],
    color: "#C4472A",
    prototypeUrl: "https://resy-celebrations-portfolio.surge.sh",
    meta: {
      team: "4-person team",
      researchMethods: [
        "User Interviews",
        "Restaurant Manager Interviews",
        "Survey",
        "Affinity Mapping",
        "Journey Mapping",
      ],
      platform: "Mobile App (iOS/Android)",
      duration: "8 weeks",
    },
    sections: [
      {
        id: "hook",
        number: "01",
        heading: "Hook",
        blocks: [
          {
            type: "p",
            text: "I was planning my own birthday dinner in New York and somehow ended up doing venue scouting on foot. That's when I knew something was broken.",
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
              { label: "Team size", value: "4 — mostly engineers" },
              {
                label: "My specific responsibilities",
                value:
                  "I led the project direction, owned the research end-to-end (interviews, surveys, need-finding, user journey), and delegated from there.",
              },
              {
                label: "What I did NOT do (owned by teammates)",
                value: "Research analysis, user personas, some restaurant manager interviews.",
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
                value:
                  "A survey to define the target user, followed by two rounds of interviews — consumers first, then restaurant managers.",
              },
              {
                label: "Who we spoke to",
                value:
                  "Working professionals in NYC, ages 24–35, plus four Brooklyn restaurants (Nuaa Table, Wayward Fare, Convivium Osteria, and La Rina).",
              },
            ],
          },
          {
            type: "stats",
            items: [
              { value: "93%", label: "Contact restaurants directly for large group bookings" },
              { value: "67%", label: "Only found out about minimums after reaching out" },
            ],
          },
          {
            type: "p",
            text: "We started with a survey to figure out who we were designing for. Students dropped out of our target group fast. Most don't use Resy because the app requires a credit card on file, and the budget for a sit-down dinner for 15 just isn't there. That pointed us toward working professionals in NYC, ages 24-35.",
          },
          {
            type: "p",
            text: "From there we ran two rounds of interviews: consumers first, then restaurant managers. The consumer side confirmed what I already knew. Everyone had tried Resy for a large group at some point. None of them had actually booked through it. They'd all ended up calling, emailing, or just picking whatever restaurant responded first.",
          },
          {
            type: "p",
            text: "The restaurant interviews were the ones that changed how we saw the problem. We talked to four Brooklyn restaurants: Nuaa Table, Wayward Fare, Convivium Osteria, and La Rina. Every single manager said the same thing: Resy works fine for regular tables, but for groups of 8 or more, it can't collect what they actually need. Event type. Space preference. Menu selection. Minimum spend. None of it is in the standard flow. So guests email, find out the policies, and most of them disappear. One manager put it plainly: “If guests saw pricing and policies before emailing us, that would filter out groups who aren't serious.”",
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
            text: "We almost didn't interview restaurant managers. Our professor pushed us to go beyond the user side and actually talk to the people running these places.",
          },
          { type: "p", text: "That's when the problem got more interesting." },
          {
            type: "p",
            text: "The managers weren't refusing large bookings. They were doing work that Resy had no infrastructure for. Event type, seating preferences, dietary needs, minimum spend: none of it fits a standard reservation flow. So they took it to email because that was the only place that conversation could happen.",
          },
          {
            type: "p",
            text: "The back-and-forth email wasn't the problem alone. Resy just didn't have a way for restaurants and users to communicate the specifics at all. Once we understood that, we knew the solution had to work for both sides, not just the user.",
          },
          { type: "asset", label: "Two-sided problem diagram — user side vs. restaurant side" },
          {
            type: "hmw",
            text: "How might we build the booking infrastructure that lets restaurants and large groups actually coordinate, instead of routing them back to email?",
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
                title: "Celebrations as a separate mode, not a filter",
                body: "The first call was structural. We could have added a party size filter to the existing Resy flow. But large-group bookings aren't a variation of a regular reservation. It's a different kind of transaction, with different information needs, a longer timeline, and higher stakes for both sides. A dedicated Celebrations tab made that clear upfront, for users and restaurants both.",
              },
              {
                title: "Preference-first discovery (input before results)",
                body: "Before showing any restaurants, we ask for event type, party size, date, budget, and vibe. Most discovery flows show results first and let you filter after. We didn't do that because the research told us why it wouldn't work: users were reaching out to restaurants that couldn't accommodate them, only to find out 2-3 emails in. Collecting preferences first meant every result was already a real option.",
              },
              {
                title: "Swipe-based restaurant cards",
                body: "For browsing, we went with swipe cards instead of a list. Each card shows minimum spend, capacity, layout previews, and event badges. One option at a time. The research kept coming back to the same thing: people weren't overwhelmed by the process; they were overwhelmed by not having the right information at the right moment. The card format puts everything on the table before anyone reaches out.",
              },
              {
                title: "Structured booking request (replacing open email)",
                body: "Instead of redirecting to email, we designed an in-app booking request form that collects what a restaurant actually needs: event type, headcount, dietary needs, budget range, timing flexibility. Restaurants get enough context to respond properly without asking follow-up questions. Users get a progress tracker so they're not just waiting and wondering.",
              },
              {
                title: "Manager dashboard",
                body: "On the restaurant side, incoming requests arrive in a dashboard, pre-filled with party details. Managers can accept, modify, or decline without touching their inbox. Every manager we talked to said the same thing: the email wasn't the problem; it was that there was nowhere else for that conversation to happen. The dashboard gives them a structured version of the same exchange.",
              },
              {
                title: "Group coordination and payment split",
                body: "The last piece was group coordination. Once a booking was confirmed, the host could send an RSVP link to the group directly through the app. Guests could confirm attendance and split any upfront deposit in-app, so the restaurant had a live headcount, and the host wasn't chasing 12 people on Venmo. Changes to party size before a reasonable cutoff window updated the restaurant automatically.",
              },
            ],
          },
          { type: "asset", label: "Annotated screen — swipe card or booking request form" },
        ],
      },
      {
        id: "solution",
        number: "06",
        heading: "The Solution",
        blocks: [
          { type: "note", text: "Prototype status: Lo-fi complete. Hi-fi in progress." },
          { type: "asset", label: "Before/after — booking a large party today vs. through Celebrations" },
          {
            type: "p",
            text: "Resy Celebrations is a dedicated tab inside the existing Resy app for groups of 8 or more. Not a filter, not a workaround. A separate mode that signals to both the user and the restaurant that this is a different kind of booking.",
          },
          {
            type: "p",
            text: "A user opening Celebrations first tells the app what they're looking for: event type, party size, date, rough budget, vibe. That input filters the restaurant results before they even appear, so everything shown is already a realistic option.",
          },
          {
            type: "p",
            text: "From there, browsing happens through swipe cards. Each card has the minimum spend, capacity, layout previews, and a Celebrations badge if the restaurant has opted in and shared their policies upfront. No hidden costs discovered 3 emails later.",
          },
          {
            type: "p",
            text: "When a user finds a place they want, they send a structured in-app request instead of an email. Party size, event type, dietary needs, budget range, timing. The restaurant receives this through a manager dashboard and can respond, counter-propose, or decline without leaving the platform. The user sees the status update in real time through a progress tracker.",
          },
          {
            type: "p",
            text: "Once confirmed, the booking becomes a shared space. The host sends an RSVP link to the group through the app. Guests confirm attendance and split any upfront deposit in-app. The restaurant sees the headcount update automatically if anything changes before the cutoff window.",
          },
          { type: "prototype", url: "https://resy-celebrations-portfolio.surge.sh" },
        ],
      },
      {
        id: "outcomes",
        number: "07",
        heading: "Outcomes",
        blocks: [
          {
            type: "p",
            text: "The project delivered end-to-end research: consumer and restaurant manager interviews, an online survey, affinity mapping, personas, user journey mapping, and a lo-fi prototype covering the full booking flow for both sides.",
          },
          {
            type: "p",
            text: "The feedback from our professor and class was largely positive. Two things stood out. First, the solution didn't go far enough in showing how Resy Celebrations protects restaurants from no-shows and last-minute cancellations. We understood the restaurant side through research but didn't fully translate that into the design. Second, the swipe mechanic got some valid pushback. A few reviewers felt it worked better as a discovery tool than a primary interaction pattern, which is a fair read.",
          },
          {
            type: "p",
            text: "Our professor also noted we had one persona too many, with two of them overlapping more than they needed to.",
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
            text: "I'd have tried to speak to someone at Resy. We understood the problem from both the user and restaurant side, but we never pressure-tested whether the solution was actually viable for Resy as a business. Why does this gap exist on their end? Is it a technical constraint, a strategic choice, a resource problem? That conversation would have made the solution a lot sharper.",
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
            text: "This was my first time working on a two-sided problem and I didn't fully understand what that meant until we were in it. Once the restaurant side came in, almost every decision we'd made about the user had to be reconsidered. You can't design for one without understanding what the other actually needs.",
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
              { src: "/AIRAScreens/TalkAboutFeelings.png", caption: "Talk About Feelings" },
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

export default caseStudies;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((p) => p.slug === slug);
}

export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  const i = caseStudies.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return caseStudies[(i + 1) % caseStudies.length];
}
