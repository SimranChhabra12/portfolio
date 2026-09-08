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
    team: string;
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
      "Almost none of them answered in product categories. They answered in hair.",
    // Drafted from the prototype, for Simran to edit. The site's whole structure is proof —
    // 95%-of-testers, before/after, ingredients — which is the honest design problem for a
    // dry shampoo nobody believes works yet.
    homeOneLiner: "Building a haircare shop around hair type, not product type",
    homeTags: ["Internship", "UX Research", "E-commerce"],
    coverImage: "/images/covers/dream-of.jpg",
    subtitle:
      "Research and the first e-commerce experience for Dream Of, a haircare label for Indian women",
    role: "Product Design Intern",
    year: "2025",
    disciplines: ["UX Research", "Information Architecture", "E-commerce"],
    // Sampled from the brand's own campaign photography — the sage tile the range is shot
    // against, darkened enough to hold as an accent against cream.
    color: "#6C8B6B",
    meta: {
      team: "[TBD: who else was on it, and who you reported to]",
      researchMethods: ["Surveys", "User Interviews", "Usability Testing"],
      platform: "Web — direct-to-consumer storefront",
      duration: "3 months (Jun–Aug 2025)",
    },
    // The `asset` blocks are the codebase's existing way of naming a visual that is not in
    // the repo yet (see Whspr and AIRA): the slot is written down so the page says what is
    // missing, rather than the gap being invisible. Each one below names a specific export
    // to drop into public/projects/dream-of/.
    sections: [
      {
        id: "hook",
        number: "01",
        heading: "Hook",
        blocks: [
          {
            type: "p",
            text: "I spent the first stretch of the internship talking to Indian women between 25 and 40, across Tier 1 and Tier 2 cities, about their hair.",
          },
          {
            type: "p",
            text: "Almost none of them answered in product categories. They answered in hair. Oily at the roots and dry at the ends. Frizz back by noon. A scalp that itches all summer.",
          },
          {
            type: "p",
            text: "It kept happening, so it stopped being an anecdote. People weren\u2019t shopping for a shampoo. They were shopping for their hair.",
          },
        ],
      },
      {
        id: "role",
        number: "02",
        heading: "My Role",
        blocks: [
          {
            type: "p",
            text: "Product design intern, June to August 2025. I ran the research, and I designed the first version of the e-commerce experience in Figma: homepage, shop, product page, bundles and checkout.",
          },
          {
            type: "p",
            text: "The brand was already Dream Of\u2019s. The identity, the packaging and the campaign photography on this page are theirs, and they\u2019re here because they\u2019re what the store had to sell. What I owned is the research underneath it and the way the store is put together.",
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
              { label: "Who", value: "Indian women, 25 to 40" },
              { label: "Where", value: "Tier 1 and Tier 2 cities" },
              { label: "How", value: "Surveys, then interviews" },
            ],
          },
          {
            type: "p",
            text: "What I was actually listening for was how people decide. What came back was that hair type does nearly all the deciding, and that buying haircare mostly feels like guessing whether something was made with your hair in mind.",
          },
          {
            type: "p",
            text: "For oily and flat hair. For dry and unmanageable hair. For a greasy, itchy scalp. That\u2019s the language on the front of every Dream Of bottle, and it\u2019s the same language people were already using about themselves.",
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
            text: "I went in thinking my job was to organise a shop. The shop turned out to be the wrong unit.",
          },
          {
            type: "p",
            text: "A grid of four products sorted by category makes the customer do the translating. Read the name, read the category, work out whether it\u2019s for you. If hair type is doing the deciding, the store should lead with who a product is for and what\u2019s in it, and treat the name as the last thing you need.",
          },
          {
            type: "p",
            text: "That\u2019s the order the bottles already use. It wasn\u2019t the order the store used.",
          },
          {
            type: "hmw",
            text: "How might we let someone find their product by describing their own hair, instead of decoding a category?",
          },
        ],
      },
      {
        id: "brand",
        number: "05",
        heading: "The Brand",
        blocks: [
          {
            type: "p",
            text: "Four products, and the lead one is a tinted dry shampoo. That\u2019s a hard first sell. You\u2019re asking someone to put a powder near their roots and trust it comes out.",
          },
          {
            type: "p",
            text: "The photography almost never poses the product in a white void. It gets shot on hibiscus, on a bathroom ledge, in a hand, in a pocket. Real light, real hair. The wordmark is DREAM in caps with a script \u201cof\u201d cutting into it, sitting above a short claim line in small caps. This is the material the store had to sell.",
          },
          {
            type: "screens",
            images: [
              { src: "/projects/dream-of/hero-hibiscus.jpg", caption: "The hero still — Instant Refresh, shot on hibiscus" },
              { src: "/projects/dream-of/campaign-model-bottle.jpg", caption: "Campaign portrait — Soft Landing" },
              { src: "/projects/dream-of/campaign-hands-up.jpg", caption: "Campaign — Instant Refresh" },
            ],
          },
          { type: "asset", label: "Logo, wordmark and type system — the lockup on its own, not yet exported" },
        ],
      },
      {
        id: "packaging",
        number: "06",
        heading: "Packaging",
        blocks: [
          {
            type: "p",
            text: "Four products, one bottle language. Every piece is a gradient with a pink cap at the top, the wordmark centred, and the claim line under it. Then the category and who it\u2019s for on the left, the product name and its ingredients on the right, and the weight below. Same order every time.",
          },
          {
            type: "p",
            text: "What changes is the colour the pink fades into. Instant Refresh runs pink to blue, Soft Landing pink to green, Smooth Route pink to a pale yellow-green. The pink holds the range together on a shelf and the second colour tells you which one you picked up.",
          },
          {
            type: "p",
            text: "Formats follow the use. Instant Refresh is a 12 g stick with a puff applicator, small enough for the in-pocket shot the campaign leans on. Fresh Start and Smooth Route are 150 g tubs. Soft Landing is a 120 ml bottle.",
          },
          {
            type: "screens",
            images: [
              { src: "/projects/dream-of/packaging-instant-refresh.jpg", caption: "Instant Refresh — tinted dry shampoo, for oily and flat hair" },
              { src: "/projects/dream-of/packaging-instant-refresh-open.jpg", caption: "Instant Refresh — the puff applicator" },
              { src: "/projects/dream-of/packaging-soft-landing.jpg", caption: "Soft Landing — lightweight leave-in conditioner" },
              { src: "/projects/dream-of/packaging-smooth-route.jpg", caption: "Smooth Route — frizz taming mask" },
              { src: "/projects/dream-of/packaging-fresh-start.jpg", caption: "Fresh Start — clarifying shampoo scrub" },
              { src: "/projects/dream-of/packaging-soft-landing-white.jpg", caption: "Soft Landing, on white" },
            ],
          },
        ],
      },
      {
        id: "ingredients",
        number: "07",
        heading: "Ingredients",
        blocks: [
          {
            type: "p",
            text: "Every product carries its ingredients on the front instead of the back. Fresh Start reads Sea Salt, Caffeine, Botanical Blend. Smooth Route reads Botanical Blend, Cationic Blend, Raspberry Seed Oil.",
          },
          {
            type: "p",
            text: "The site gives them a page of their own, shot the way food gets shot. Hibiscus, ginseng, taro, sea salt, each one on its own. It\u2019s the same argument the before and afters make, told with a different picture. Here\u2019s what\u2019s in it. Look at it.",
          },
          {
            type: "screens",
            images: [
              { src: "/projects/dream-of/ingredient-hibiscus.jpg", caption: "Hibiscus" },
              { src: "/projects/dream-of/ingredient-ginseng.jpg", caption: "Ginseng" },
              { src: "/projects/dream-of/ingredient-taro.jpg", caption: "Taro" },
              { src: "/projects/dream-of/ingredient-shell.jpg", caption: "Sea salt" },
            ],
          },
        ],
      },
      {
        id: "storefront",
        number: "08",
        heading: "The Storefront",
        blocks: [
          {
            type: "p",
            text: "The nav is four items: Home, Ingredients, Dream Story, Sustainability. Three of the four are the brand explaining itself rather than selling, which says a lot about what the site is for.",
          },
          {
            type: "p",
            text: "The hero reads \u201cYour Dream Of Good Hair Days Starts Here\u201d with a single SHOP ALL button, and the product grid sits under \u201cBetter Care That Your Hair Deserves.\u201d Then the page stops selling and starts proving. A claims block built on a question, removes oil but not your scalp. 95% of testers. Before and after strips of the same scalp. Tester videos that play inline.",
          },
          {
            type: "p",
            text: "That order is the design. Nobody believes a dry shampoo works yet, so the page spends most of its length on evidence and very little on adjectives.",
          },
          {
            type: "screens",
            images: [
              { src: "/projects/dream-of/proof-scalp-before.jpg", caption: "Before — the scalp shot the claims are made against" },
              { src: "/projects/dream-of/proof-after.jpg", caption: "After" },
              { src: "/projects/dream-of/testimonial-1.jpg", caption: "Tester video, as it runs on the page" },
              { src: "/projects/dream-of/testimonial-2.jpg", caption: "Tester video" },
              { src: "/projects/dream-of/campaign-pocket.jpg", caption: "In-pocket — the size story, told in the photography" },
              { src: "/projects/dream-of/lifestyle-vanity.jpg", caption: "Lifestyle still from the storefront" },
            ],
          },
          { type: "asset", label: "Full-page storefront captures — home, product detail, Ingredients, Dream Story, Sustainability" },
        ],
      },
      {
        id: "outcomes",
        number: "09",
        heading: "Outcomes",
        blocks: [
          {
            type: "stats",
            items: [
              { value: "25%", label: "Projected improvement in product-page engagement" },
              { value: "15%", label: "Projected increase in add-to-cart rate" },
            ],
          },
          {
            type: "p",
            text: "Both numbers come out of usability testing on the prototype, against the information architecture I designed. They\u2019re projections from testing rather than takings from a live store, and I\u2019d rather say that than round them up.",
          },
        ],
      },
    ],
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
      { src: "/projects/whspr/whspr/search.png", alt: "Whspr search — recently active places" },
      { src: "/projects/whspr/whspr/house-of-yes.png", alt: "Whspr place profile — first-hand signals" },
      { src: "/projects/whspr/whspr/area-info-expanded.png", alt: "Whspr area info — getting there and back" },
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
              { src: "/projects/whspr/whspr/splash.png", caption: "Onboarding" },
              { src: "/projects/whspr/whspr/search.png", caption: "Search" },
              { src: "/projects/whspr/whspr/search-results.png", caption: "Signals" },
              { src: "/projects/whspr/whspr/area-info.png", caption: "Area Info" },
              { src: "/projects/whspr/whspr/post-submission.png", caption: "Submit a signal" },
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
      {
        src: "/projects/resy/celebrations-home.png",
        alt: "Resy Celebrations home — booking a table for a whole group",
      },
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
          { type: "prototype", url: "/work/resy/prototype" },
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
              { src: "/projects/aira-pcos/AIRAScreens/Energy PAge 4.png", caption: "Energy Wave" },
              { src: "/projects/aira-pcos/AIRAScreens/Menstrual Phase.png", caption: "Menstrual Phase" },
              { src: "/projects/aira-pcos/AIRAScreens/Winter (M).png", caption: "Winter (Menstrual)" },
              { src: "/projects/aira-pcos/AIRAScreens/Follicular Phase.png", caption: "Follicular Phase" },
              { src: "/projects/aira-pcos/AIRAScreens/Spring (F).png", caption: "Spring (Follicular)" },
              { src: "/projects/aira-pcos/AIRAScreens/Ovulation.png", caption: "Ovulation" },
              { src: "/projects/aira-pcos/AIRAScreens/Summer (O).png", caption: "Summer (Ovulation)" },
              { src: "/projects/aira-pcos/AIRAScreens/Luteal.png", caption: "Luteal" },
              { src: "/projects/aira-pcos/AIRAScreens/Luteal-1.png", caption: "Luteal (alt)" },
              { src: "/projects/aira-pcos/AIRAScreens/Workout - Cycle Insight.png", caption: "Workout — Cycle Insight" },
              { src: "/projects/aira-pcos/AIRAScreens/Learn tab - Global NAV.png", caption: "Learn — Global Nav" },
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
    sections: [
      {
        id: "hook",
        number: "01",
        heading: "Hook",
        blocks: [
          {
            type: "p",
            text: "Art therapy works. Starting is the hard part.",
          },
          {
            type: "p",
            text: "Most people don't freeze because they have nothing to say. They freeze because on paper, one wrong line feels permanent, so it's easier not to begin. I wanted to see if AI could take the pressure off the mechanics without taking over the meaning. I mapped where AI should help and where it shouldn't, landed on three ideas, and built one.",
          },
        ],
      },
      {
        id: "role",
        number: "02",
        heading: "My Role",
        blocks: [
          {
            type: "p",
            text: "Solo project for NYU's UX & AI course. I ran the research, built the framework for where AI should and shouldn't sit in a session, designed the interaction, and wrote the prototype in p5.js with HandPose. The concept test and the therapist review were mine too.",
          },
          {
            type: "fields",
            items: [
              { label: "Role", value: "Research, framework, interaction design, build" },
              { label: "Course", value: "NYU · UX & AI" },
              { label: "Scope", value: "Research, concept framework, working prototype" },
              { label: "Built with", value: "p5.js · MediaPipe" },
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
            type: "p",
            text: "I kept coming back to one thing about art therapy: everyone I talked to believed it could help them, and almost no one actually did it.",
          },
          {
            type: "p",
            text: "So I ran 7 interviews and a short survey to find out where the gap was. The answers were consistent. People didn't know how to start, they'd sit down to do something creative and feel stuck before they'd made a single mark. A lot of them were anxious about being bad at it, worried the thing they made would be judged, or would just prove they couldn't draw. And the younger people I spoke to didn't really want a person in the room for this. They wanted something private, on their own time, no one watching.",
          },
          {
            type: "p",
            text: "Three problems, one shape. Getting in is the hard part. Not the drawing, the starting.",
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
            text: "People wanted support, but the moment AI did too much, the drawing stopped being theirs. Smooth every line, fix every shape, and it's the AI's art, not yours. The whole point of art therapy is that the thing you made came from you.",
          },
          {
            type: "p",
            text: "So I mapped it before designing anything. One axis: how much a moment should lean on AI. The other: whether it's mechanical or personal. The split was clear. Hand off the friction, getting started, loosening up, the tools. Protect the meaning, the choices, the reflection, what the piece is about. A few things sit in between, where AI helps but you stay in control.",
          },
          {
            type: "note",
            text: "Build the parts that make starting easier and leave the meaning alone.",
          },
        ],
      },
      {
        id: "decisions",
        number: "05",
        heading: "Design Decisions",
        blocks: [
          {
            type: "p",
            text: "The map pointed to three ideas, each for a different moment in a session.",
          },
          {
            type: "decisions",
            items: [
              {
                title: "Gesture drawing, for starting",
                body: "Draw in the air with your hand, nothing permanent, nothing to ruin. I built this one. Starting was the problem almost everyone named, so that's where a real prototype beat a mockup.",
              },
              {
                title: "A prompt assistant, for when you're stuck — tried, then cut",
                body: "Gentle nudges you could take or ignore, never an instruction. I built it and removed it. The therapists kept saying people need to draw without being interrupted, and the AI prompts fought the quiet the drawing was there to create.",
              },
              {
                title: "Audio-visual calm, for before you begin",
                body: "Sound and visuals to settle you in. Scoped, not built.",
              },
              {
                title: "Nothing you do is permanent",
                body: "The whole tool is built around this. Undo is a gesture, not a buried button. Clear is one tap. Every stroke keeps its own color and size, so nothing you draw later can overwrite what's already there. You can't wreck it, which is the point — that's the fear the research kept turning up, and taking it away is the whole design.",
              },
              {
                title: "Dead-zones on every gesture",
                body: "Small buffers, so a shaky hand doesn't jitter into a mark you didn't mean.",
              },
              {
                title: "Undo and clear exist as real buttons too",
                body: "Not just as gestures. Having a visible way out is what builds the confidence to make a mess in the first place.",
              },
              {
                title: "A welcome screen with exactly one job",
                body: "Concept testing turned up the same freeze at the very start: people weren't sure which gesture actually draws. So the opening screen shows the three gestures and nothing else. No settings, no options, nothing to read past what you need to make your first mark. The camera never turns on cold.",
              },
            ],
          },
          {
            type: "p",
            text: "The concept was decided. The interface wasn't. So I sketched five layouts, each with the tools and the AI in a different place, and showed them to 6 people one at a time.",
          },
          {
            type: "p",
            text: "I was looking for where they agreed, and they agreed on a lot. Color and stroke size belong together, not on opposite sides of the screen. Save and clear belong together too, and away from everything else, so you don't hit one when you meant the other. The prompt had to stay on the same screen, people said they'd forget it if it opened another page. The camera window should be the biggest thing. And undo came up a lot, some people wanted it as a gesture, not a button to hunt for.",
          },
          {
            type: "p",
            text: "Most people preferred Layout 5, so I built from it and added the fixes they named.",
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
            text: "A webcam turns your hand into a brush. Pinch thumb and index to draw, tap thumb and ring to change color, tap thumb and pinky to undo. No stylus, no menus to learn, no blank sheet waiting to be ruined. You move, and a line follows.",
          },
        ],
      },
      {
        id: "outcomes",
        number: "07",
        heading: "Outcomes",
        blocks: [
          {
            type: "p",
            text: "GestureSketch is a working prototype, not a finished product, and it's the one piece of the larger concept I actually built. It does the thing it set out to do, which is make starting feel safe enough to begin. But it's early, and I haven't tested it where it would actually live, in a real session with a real client.",
          },
          {
            type: "p",
            text: "The closest I got was showing it to Tanak Bajaj, an art therapist in London, who saw the thing I was hoping for:",
          },
          {
            type: "quote",
            text: "Clients simply move their hands to express what they're feeling, and I can watch their creations unfold in real time. It really bridges the gap that screens often put between therapist and client.",
            attribution: "Tanak Bajaj, art therapist",
          },
          {
            type: "p",
            text: "That's one therapist's reaction, not a study, so whether it holds up in actual therapy is still the open question, and it's the one that matters most.",
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
            text: "I'd try prompts again, but built the opposite way from the ones I cut. The version I removed interrupted you mid-drawing. A better one would wait until you asked for it, on-demand, right beside the canvas, there when you're stuck and invisible when you're not.",
          },
          {
            type: "p",
            text: "I'd add gesture-triggered shapes, so a pinch could pull in a simple circle or wave to build from when a blank canvas still feels like too much. And the real next step is proper testing with therapists and their clients, to find out whether any of this actually helps where it counts.",
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
            text: "The thing I keep coming back to is the feature I removed. I built an AI prompt assistant that pushed suggestions on you while you were drawing, and it fought the quiet the drawing was supposed to create, so I took it out. What I learned wasn't that AI doesn't belong here. It was that it can't be the one deciding when to speak. The prompts weren't the problem. The interruption was.",
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
