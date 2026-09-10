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
  // Optional looping hero for the homepage card (task D2). When set, WorkChapters
  // stacks it over `coverImage`, which stays the poster and the reduced-motion
  // fallback — so this is purely additive and a card without it is unchanged.
  // Expects a muted, seamless-looping 5:3 mp4 in `public/`; task D3 produces them.
  coverVideo?: string;
  realCover?: string; // real screenshot to use instead of the placeholder, when available
  // Product screens for the homepage card to cycle through (ScreenCycler). Deliberately
  // SCREENS, not deck slides: the card is showing what was built, and a slide of frameworks
  // reads as a presentation about the work rather than the work. `coverImage` stays the
  // ground under them, so a project without this is unchanged.
  cardScreens?: { src: string; alt: string }[];
  subtitle: string;
  role: string;
  year: string;
  status?: string; // e.g. "Research stage — prototype in progress"
  disciplines: string[];
  color: string;
  // Pale ground for the homepage work card. NOT picked by eye and not derived from
  // `color` — every project's `color` is its dark UI chrome, and #1B1B2F vs #2D2D2D
  // reduce to the same grey, which made all the cards look like one card. Each value
  // below is the product's own accent, sampled from its actual screens (the hue that
  // owns the most saturated pixels across them), then tuned so every ground sits the
  // SAME PERCEPTUAL DISTANCE from the --surface band the cards sit on: dE 14-19 (CIE76).
  //
  // Distance, not "same L and S" — that was the first rule and it failed. --surface is
  // itself a warm cream at hue ~35, and Whspr's amber is hue 39, so at equal saturation
  // it landed at dE 7.1 against the band and read as no colour at all, while the lilac
  // and blue at the same L/S sat at 19.3 and 14.4. A hue near the ground's own hue needs
  // more saturation to travel the same distance. Whspr is therefore L 88.5 / S 92, the
  // others L 90 / S 55, and it is the dE column that makes them a family, not the inputs.
  cardTint?: string;
  prototypeUrl?: string;
  // Keeps a project written but off the site: no card, no page, skipped by "next project".
  // Delete the flag to bring it back.
  hidden?: boolean;
  // Listed in the playground rather than the work grid, while keeping its case study page
  // and its place in the "next project" chain. GestureSketch moved here on 2026-09-05: the
  // page is unchanged, only where it is advertised.
  listInPlayground?: boolean;
  meta: {
    team?: string;
    researchMethods: string[];
    platform: string;
    duration: string;
  };
  sections: Section[];
}

const allCaseStudies: CaseStudy[] = [
  // ── Dream Of ─────────────────────────────────────────────────────────────
  // Added 2026-09-05 at Simran's request, to hold the second slot in the homepage row.
  // Scope and framing confirmed by her: Dream Of is the COMPANY she interned at, and the
  // haircare brand is theirs — she worked on its identity, packaging and storefront. So this
  // is real professional work rather than a student concept, and the framing has to hold
  // both halves: named industry experience, without implying the brand was hers to own.
  // That is why `role` leads with "Design Intern" and `homeTags` opens on "Internship".
  // Source: the public prototype at
  // figma.com/proto/TpTYwn4pXksmEmIWaj6xEM/DREAM-OF--Copy- (read 2026-09-05) — a desktop
  // storefront for a tinted dry shampoo ("Instant Refresh") and a leave-in conditioner
  // ("Soft Landing"), selling on tester stats and before/after strips rather than claims.
  //
  // Artwork is IN (2026-09-06): pulled from the prototype's own image store with Simran's
  // confirmation that the work and the permission are hers, then curated, downsized and
  // committed under public/projects/dream-of. The cover is her bath campaign shot cropped
  // to the card's 5:3.
  //
  // Rewritten 2026-09-06 against Simran's revised resume ("Simran Resume (1).pdf", which
  // now carries a Dream Of entry the earlier version did not). The resume is the source of
  // truth for role, dates, research and outcomes:
  //   "Product Design Intern, Dream Of | Jun 2025 - Aug 2025
  //    - Conducted surveys and interviews with Indian women ages 25-40 across Tier 1 and 2
  //      cities, uncovering a strong preference for haircare formulated for their specific
  //      hair types; insights directly shaped the shop and product-page strategy.
  //    - Designed the initial e-commerce experience in Figma (homepage, shop, product,
  //      bundle, and checkout flows). The information architecture I designed led to a
  //      projected 25% improvement in product-page engagement and a 15% increase in
  //      add-to-cart rate in prototype usability tests."
  //
  // SCOPE CORRECTION. The earlier framing here ("Identity, packaging and the storefront",
  // role "Design Intern — brand, packaging & web", disciplines Brand/Packaging/Web) was
  // guessed off the artwork by a previous session, not stated by Simran. Her own resume
  // claims research + e-commerce IA and says nothing about brand identity or packaging, so
  // the entry now claims only that. The packaging and campaign imagery stays as CONTEXT for
  // what the store had to sell, and My Role says out loud that the brand is Dream Of's.
  // If she did own brand or packaging work, this undersells her and should be widened.
  //
  // The 25% / 15% figures are labelled as PROJECTIONS FROM PROTOTYPE TESTING on the page,
  // matching the resume's own wording. Do not restate them as live-store results.
  //
  // The four artwork sections (The Brand, Packaging, Ingredients, The Storefront) are
  // written strictly off what is readable in the committed images and the public prototype:
  // bottle copy, weights, gradient colours, nav items, hero lines, the 95% figure.
  //
  // Still open: meta.team is a visible [TBD] (DESIGN_DOC §8: a real marker, never invented
  // copy), and the shop / bundle / checkout screens the resume names are NOT in the repo.
  // The Figma design file (node-id=12-2) is view-only canvas, so those need exports from
  // Simran before The Storefront can show her actual IA work rather than the brand's.
  {
    slug: "dream-of",
    title: "Dream Of",
    cardDescription:
      "Four products, one of them a tinted dry shampoo nobody believes works yet. A storefront that had to answer two questions: is this for my hair, and does it actually work.",
    // Drafted from the prototype, for Simran to edit. The site's whole structure is proof —
    // 95%-of-testers, before/after, ingredients — which is the honest design problem for a
    // dry shampoo nobody believes works yet.
    homeOneLiner: "Haircare solutions formulated for Indian hair",
    homeTags: ["Internship", "UX Research", "E-commerce"],
    coverImage: "/images/covers/dream-of.jpg",
    subtitle:
      "Research and the first e-commerce experience for Dream Of, a haircare brand",
    role: "Product Design Intern",
    year: "2025",
    disciplines: ["UX Research", "Information Architecture", "E-commerce"],
    // Sampled from the brand's own campaign photography — the sage tile the range is shot
    // against, darkened enough to hold as an accent against cream.
    color: "#6C8B6B",
    meta: {
      researchMethods: ["Surveys", "User Interviews", "Usability Testing"],
      platform: "Web — direct-to-consumer storefront",
      duration: "3 months (Jun–Aug 2025)",
    },
    // The `asset` blocks are the codebase's existing way of naming a visual that is not in
    // the repo yet (see Whspr and AIRA): the slot is written down so the page says what is
    // missing, rather than the gap being invisible. Each one below names a specific export
    // to drop into public/projects/dream-of/.
    // Body content lives in app/work/dream-of/page.tsx. Nothing here renders it.
    sections: [],
  },

  // ── Whspr ────────────────────────────────────────────────────────────────
  {
    slug: "whspr",
    title: "Whspr",
    cardDescription:
      "That knowledge lives in DMs and disappears the second the conversation ends.",
    homeOneLiner: "Giving women's place knowledge somewhere to live",
    homeTags: ["Research", "Interaction Design"],
    coverImage: "/images/covers/whspr.jpg",
    realCover: "/projects/whspr/whspr/area-info-expanded.png",
    // Five screens across the whole product, not five states of one flow: search, a place
    // profile, the area detail, contributing, and what you keep. All 402px-wide exports.
    cardScreens: [
      { src: "/projects/whspr/whspr/search-fit.png", alt: "Whspr search — recently active places" },
      { src: "/projects/whspr/whspr/house-of-yes-fit.png", alt: "Whspr place profile — first-hand signals" },
      { src: "/projects/whspr/whspr/area-info-expanded-fit.png", alt: "Whspr area info — getting there and back" },
      { src: "/projects/whspr/whspr/post-submission.png", alt: "Whspr contribution — after submitting" },
      { src: "/projects/whspr/whspr/saved.png", alt: "Whspr saved places" },
    ],
    subtitle:
      "A crowdsourced urban intelligence platform for women navigating city spaces",
    role: "Product Lead & Designer",
    year: "2026",
    disciplines: ["Product Design", "Full-Stack", "AI Integration"],
    color: "#1B1B2F",
    cardTint: "#FDEAC7", // amber CTA button, 296 px across 5 screens
    meta: {
      team: "Solo — product lead & designer",
      researchMethods: ["User Interviews", "Secondary Research", "Competitive Analysis"],
      platform: "Mobile Web App",
      duration: "6 sprints",
    },
    // Body content lives in app/work/whspr/page.tsx. Nothing here renders it.
    sections: [],
  },

  // ── Resy ─────────────────────────────────────────────────────────────────
  {
    slug: "resy",
    title: "Resy Celebrations",
    cardDescription:
      "I was planning my own birthday dinner and somehow ended up doing venue scouting on foot.",
    homeOneLiner: "Making in-app large party reservations simpler",
    coverImage: "/images/covers/resy.jpg",
    // "Student concept" leads the eyebrow on purpose. The bespoke /work/resy page carries
    // the full disclaimer, but the homepage card is where someone forms the impression that
    // this shipped — the framing has to be on the card too, not only behind the click.
    homeTags: ["Student concept", "Research", "Design"],
    subtitle: "A large-party booking feature for the Resy platform",
    role: "UX Researcher & Product Designer",
    year: "2024",
    disciplines: ["UX Research", "Feature Design", "Service Design"],
    color: "#C4472A",
    cardTint: "#D7E1F4", // primary blue, 175 px in the cover
    // Captured from the Celebrations prototype itself (the HTML one in
    // 03_Portfolio_Reference/Resy), rendered headless at 3x and cropped to the screen —
    // so this is the real design, not a crop out of the composed cover, whose three
    // phones overlap each other and cannot yield an uncropped screen.
    cardScreens: [
      // Cropped from the rebuilt prototype (the live screens in the case study's
      // cover band), not the old Surge build.
      { src: "/projects/resy/resy-card-home.png", alt: "Resy Celebrations home — minimums shown before you ask" },
      { src: "/projects/resy/resy-card-matches.png", alt: "Resy Celebrations matches — only rooms that fit the party" },
      { src: "/projects/resy/resy-card-manager.png", alt: "Resy Celebrations restaurant view — requests to accept or counter" },
    ],
    prototypeUrl: "/work/resy/prototype",
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
    // Body content lives in app/work/resy/page.tsx. Nothing here renders it.
    sections: [],
  },

  // ── AIRA ─────────────────────────────────────────────────────────────────
  {
    slug: "aira-pcos",
    title: "AIRA",
    cardDescription:
      "I know what it's like to open four different apps just to understand why today feels harder than yesterday.",
    homeOneLiner: "Turning PCOS tracking from guilt into permission",
    homeTags: ["Research", "Product Design"],
    coverImage: "/images/covers/aira.jpg",
    realCover: "/projects/aira-pcos/AIRAScreens/Energy PAge 4.png",
    cardScreens: [
      { src: "/projects/aira-pcos/AIRAScreens/HOme tab_.png", alt: "AIRA home tab" },
      { src: "/projects/aira-pcos/AIRAScreens/Energy PAge 4.png", alt: "AIRA energy wave and readiness score" },
      { src: "/projects/aira-pcos/AIRAScreens/Menstrual Phase.png", alt: "AIRA cycle, phases view" },
      { src: "/projects/aira-pcos/AIRAScreens/Wind down landing tab.png", alt: "AIRA wind down" },
      { src: "/projects/aira-pcos/AIRAScreens/Learn tab - Global NAV.png", alt: "AIRA learn tab" },
    ],
    subtitle: "A circadian rhythm app for PCOS management",
    role: "Product Designer & Researcher",
    year: "2024",
    disciplines: ["UX Research", "Product Design", "Interaction Design"],
    color: "#2D2D2D",
    cardTint: "#E2D7F4", // phase-ring purple, 533 px across 5 screens
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
    // Body content lives in app/work/aira-pcos/page.tsx. Nothing here renders it.
    sections: [],
  },

  // ── GestureSketch ────────────────────────────────────────────────────────
  {
    slug: "gesture-sketch",
    listInPlayground: true,
    title: "GestureSketch",
    cardDescription:
      "Most people don't freeze because they have nothing to say. They freeze because on paper, one wrong line feels permanent.",
    homeOneLiner: "Taking the pressure off starting, without taking over the meaning",
    homeTags: ["Research", "Prototyping"],
    coverImage: "/images/covers/gesture-sketch.jpg",
    subtitle:
      "An AI art therapist concept — research, a framework for where AI belongs, and one working prototype",
    role: "Researcher, Designer & Builder",
    year: "2025",
    disciplines: ["UX Research", "Interaction Design", "Creative Coding"],
    color: "#3E6B5A",
    cardTint: "#E0F4D7", // sketch-line green
    prototypeUrl: "https://simranchhabra12.github.io/gesturedrawing",
    meta: {
      team: "Solo",
      researchMethods: [
        "User Interviews",
        "Survey",
        "Concept Testing",
        "Expert Review",
      ],
      platform: "Web (browser + webcam)",
      duration: "Course project — NYU UX & AI",
    },
    // /work/gesture-sketch is a hand-built route now (app/work/gesture-sketch), so
    // these sections no longer render — the card, tags and next-project chain still
    // read from here. The [visual: ...] placeholders that used to sit in them are
    // built components under components/casestudy2/gesture/.
    // Body content lives in app/work/gesture-sketch/page.tsx. Nothing here renders it.
    sections: [],
  },

  // ── Street Paws ──────────────────────────────────────────────────────────
  {
    slug: "street-paws",
    title: "Street Paws",
    hidden: true,
    cardDescription:
      "“Helpless. There aren't a lot of avenues except some WhatsApp groups and my story. People usually ignore these messages.”",
    homeOneLiner: "Connecting the people who already want to help street dogs",
    coverImage: "/images/covers/street-paws.jpg",
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
