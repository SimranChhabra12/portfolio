export type PlaygroundKind = "full" | "light";

export interface PlaygroundImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PlaygroundVideo {
  src: string;
  alt: string;
}

export interface PlaygroundEntry {
  slug: string;
  title: string;
  tags: string;
  /**
   * The half of the card title that says what the piece actually was. Rendered on the
   * same line as `title` at the same size — "Zebein: Creative direction for ...".
   * Matches the `Project — Problem` format the work cards use.
   */
  oneLiner: string;
  /**
   * Cards show the title alone by default; the one-liner stays as the subtitle on the
   * entry's own page. Set this where the name needs the one-liner to make sense.
   */
  oneLinerOnCard?: boolean;
  /**
   * How the piece started, shown on the /playground card as "Started with …". Only set
   * where the real origin is known; cards without one simply show no tag.
   */
  origin?: string;
  /**
   * Routing only. `full` entries carry a written body on their page; `light` ones are
   * carried by their gallery. Every entry gets a page and an identical card either way —
   * this must never reach the card treatment.
   */
  kind: PlaygroundKind;
  teaser: string;
  /** Paragraphs of page body copy, rendered under the teaser. */
  body?: string[];
  /**
   * `object-position` for the cover inside the uniform 5:3 card slot. Portrait covers
   * lose their subject to a centred crop, so those name their own focal point.
   */
  coverPosition?: string;
  /** Id in the sketch registry (components/interactive/sketches). Renders live via P5Sketch. */
  sketch?: string;
  cover: PlaygroundImage | null;
  /**
   * Hand-picked frames the cover cycles through, cover first. Overrides the mosaic's
   * automatic sampling of `images`, and makes the /playground card cycle too.
   */
  coverFrames?: PlaygroundImage[];
  images: PlaygroundImage[];
  videos?: PlaygroundVideo[];
  href?: string;
  /** Overrides `images` as the page gallery where the two sets differ. */
  pageImages?: PlaygroundImage[];
  /**
   * Separate, titled carousels on the entry's page, in order. Overrides `pageImages` and
   * `images` there; the homepage mosaic still samples `images`.
   */
  pageGalleries?: { title: string; details?: string[]; images: PlaygroundImage[] }[];
}

const playgroundEntries: PlaygroundEntry[] = [
  // Order is the running order of the grid. `kind` below is routing, not presentation:
  // every entry renders the same card at the same scale (review, 2026-09-05).
  // GestureSketch lives here rather than in the work grid (2026-09-05), but its write-up
  // is still the full case study at /work/gesture-sketch — hence `href`. Listing it in the
  // playground is a statement about where it belongs among the projects, not a decision to
  // throw away the research behind it, so nothing about that page changes.
  {
    slug: "si-ch",
    title: "Si.Ch",
    tags: "Fashion · Brand",
    oneLiner: "My gender-neutral clothing label",
    oneLinerOnCard: true,
    origin: "a trip to Sri Lanka, and the sky I kept photographing",
    kind: "full",
    teaser:
      "A gender-neutral fashion label I designed and ran for a year. It started on a trip to Sri Lanka and the sky I kept photographing.",
    cover: { src: "/si-ch/dsc00788.jpg", alt: "Si.Ch campaign shot, hands reaching up against a clear sky", width: 2400, height: 1350 },
    images: [],
    pageImages: [
      { src: "/si-ch/dsc00788.jpg", alt: "Si.Ch campaign shot, hands reaching up against a clear sky", width: 2400, height: 1350 },
      { src: "/si-ch/dsc00808.jpg", alt: "Si.Ch campaign shot", width: 2400, height: 1350 },
      { src: "/si-ch/dsc00776.jpg", alt: "Si.Ch campaign shot", width: 2400, height: 1350 },
      { src: "/si-ch/dsc00812.jpg", alt: "Si.Ch campaign shot", width: 2400, height: 1350 },
      { src: "/si-ch/dsc00849.jpg", alt: "Si.Ch campaign shot, two models facing each other at golden hour", width: 2400, height: 1350 },
      { src: "/si-ch/dsc00893.jpg", alt: "Si.Ch campaign shot", width: 2400, height: 1350 },
    ],
    videos: [{ src: "/si-ch/brand-film.mp4", alt: "Si.Ch brand film" }],
    href: "/playground/si-ch",
  },
  {
    slug: "gesture-sketch",
    title: "GestureSketch",
    tags: "Creative Coding · AI",
    oneLiner: "Drawing in the air with your hands, as a way into art therapy",
    kind: "light",
    href: "/work/gesture-sketch",
    teaser:
      "An AI art therapist concept, built as a working p5.js prototype: your hand becomes the brush, so starting costs nothing.",
    cover: {
      src: "/images/covers/gesture-sketch.jpg",
      alt: "GestureSketch — hand-tracked drawing canvas",
      width: 2000,
      height: 1200,
    },
    images: [],
  },
  {
    slug: "road-trip-experience",
    title: "The Roadtrip Experience",
    tags: "Art · Documentary",
    oneLiner: "Sixteen artists, one car, and the lost music of Kutchh on film",
    origin: "friends I made at the Kochi Biennale",
    kind: "full",
    teaser:
      "Gujarat is home, so when friends I'd made at an art festival needed someone to take 16 artists around it, I said yes. It became The Roadtrip Experience, a project with Mahindra & Mahindra exploring the state's indigenous art forms.",
    body: [
      "I met them at the Kochi-Muziris Biennale in Kerala, India's biggest contemporary art festival, where they were just fellow community builders I got talking to. I had no idea they ran experiences like this.",
      "I ran the experience and operations, which meant showing artists from around the world the places I grew up with, and watching them see it for the first time.",
      "Along the way we made a documentary on the lost music of Kutchh, a tradition that's slowly disappearing, and gave local artists resources and mentorship to work alongside the visiting ones.",
    ],
    cover: { src: "/playground/rtx/RTX-.png", alt: "The Roadtrip Experience", width: 918, height: 996 },
    coverFrames: [
      { src: "/playground/rtx/RTX-.png", alt: "The Roadtrip Experience", width: 918, height: 996 },
      { src: "/playground/rtx/RTX1.png", alt: "The Roadtrip Experience", width: 910, height: 988 },
      { src: "/playground/rtx/RTX2.jpg", alt: "The Roadtrip Experience", width: 698, height: 1200 },
      { src: "/playground/rtx/RTX3.jpg", alt: "The Roadtrip Experience", width: 1200, height: 900 },
    ],
    images: [],
    pageImages: [
    { src: `/playground/rtx/IMG-20200118-WA0028.jpg`, alt: "RTX — folk-art painting on site", width: 1280, height: 1185 },
    { src: `/playground/rtx/IMG-20190921-WA0019.jpg`, alt: "RTX — folk-art painting on site", width: 1280, height: 960 },
    { src: `/playground/rtx/IMG-20200118-WA0003.jpg`, alt: "RTX — folk-art painting on site", width: 720, height: 1280 },
    { src: `/playground/rtx/IMG_20200117_171155.jpg`, alt: "RTX — hand-painting a vehicle with folk-art patterns", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG_20190922_121700.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG-20190924-WA0025.jpg`, alt: "RTX — folk-art painting on site", width: 960, height: 1280 },
    { src: `/playground/rtx/IMG_20190922_121702.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG_20200120_103834.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG_20190922_142808.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG_20200120_114219.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG-20190924-WA0050.jpg`, alt: "RTX — folk-art painting on site", width: 1280, height: 960 },
    { src: `/playground/rtx/Screenshot_20200117-101143.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 568 },
    { src: `/playground/rtx/IMG_20200117_081632.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG_20200119_165741.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG_20200118_185523.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG_20200117_135911.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG_20190922_150325.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG_20200118_182137_286.jpg`, alt: "RTX — folk-art painting on site", width: 624, height: 1200 },
    { src: `/playground/rtx/IMG_20190922_122820.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/poetry-festivals/IMG-20200121-WA0003.jpg`, alt: "An artist taking a break beside the hand-painted car, paintbrush still in hand", width: 1200, height: 799 },
    ],
    videos: [
      { src: "/playground/rtx/VID-20200120-WA0015.mp4", alt: "The Roadtrip Experience — video from site" },
    ],
    href: "/playground/road-trip-experience",
  },
  {
    slug: "nightmare-in-neverland",
    title: "Nightmare in Neverland",
    tags: "VR · Art Direction",
    oneLiner: "Keeping a VR nightmare fun by keeping it whimsical",
    kind: "full",
    teaser:
      "A surreal VR dreamscape, built by three of us. I made the tea party, where a little horror stays fun as long as you keep it whimsical.",
    body: [
      "A three-level VR experience for a class project, built in Unreal with hand tracking. You move through a dream that gets stranger with each level: a mysterious room where you wake up, a tea party in a forest, then a maze that shifts around you. Ana Eremina built Level One, Sarah Sun led the technical build and Level Three, and I did art direction and Level Two, the tea party.",
      "The hard part was tone. The idea started dark and dystopian, and I steered my level toward whimsical instead: unsettling, but still fun to be in. Pink and green light, giant floating teacups and an animated cat at the head of the table make it inviting at first. Then you notice the skull teapots and the half-buried closets.",
      "There's no dialogue, so light, scale and sound tell the story. Playtesting showed people needed stronger cues to find their way, and small lighting and audio changes made the biggest difference.",
    ],
    cover: { src: "/playground/neverland/tea-party-cropped.jpg", alt: "The tea party forest lit pink and green, giant teacups floating above the table", width: 2000, height: 969 },
    images: [],
    pageImages: [
      { src: "/playground/neverland/tea-party-cropped.jpg", alt: "The tea party forest lit pink and green, giant teacups floating above the table", width: 2000, height: 969 },
      { src: "/playground/neverland/blueprint-1.jpg", alt: "Unreal blueprint: Event Tick driving the teacup rotation", width: 1084, height: 1231 },
      { src: "/playground/neverland/blueprint-2.jpg", alt: "Unreal blueprint for the teacup rotation", width: 1114, height: 1231 },
    ],
    videos: [
      { src: "/playground/neverland/promo-film.mp4", alt: "Nightmare in Neverland promotional film" },
      { src: "/playground/neverland/tea-party-walkthrough.mp4", alt: "Walkthrough of Level Two, the tea party in the forest" },
    ],
    href: "/playground/nightmare-in-neverland",
  },

  {
    slug: "humans-were-made-to-love",
    title: "Humans Were Made to Love",
    tags: "Styling · Art Direction",
    oneLiner: "A gender-fluid fashion spread I directed in design school",
    coverPosition: "center 25%",
    kind: "light",
    teaser:
      "A gender-fluid fashion spread I conceptualized, directed, and styled in design school.",
    cover: { src: "/playground/Resized Huemn/IMG_1442.jpg", alt: "Huemn editorial shoot, studio portrait", width: 800, height: 1200 },
    images: [
    { src: `/playground/Resized Huemn/IMG_1651.jpg`, alt: "Huemn editorial shoot", width: 1200, height: 800 },
    { src: `/playground/Resized Huemn/IMG_1442.jpg`, alt: "Huemn editorial shoot, studio portrait", width: 800, height: 1200 },
    { src: `/playground/Resized Huemn/IMG_1388.jpg`, alt: "Huemn editorial shoot", width: 1200, height: 800 },
    { src: `/playground/Resized Huemn/IMG_1416.jpg`, alt: "Huemn editorial shoot", width: 800, height: 1200 },
    { src: `/playground/Resized Huemn/20191214190015_IMG_1331.jpg`, alt: "Huemn editorial shoot", width: 800, height: 1200 },
    { src: `/playground/Resized Huemn/20191214192033_IMG_1439.jpg`, alt: "Huemn editorial shoot", width: 800, height: 1200 },
    { src: `/playground/Resized Huemn/20191214192251_IMG_1459.jpg`, alt: "Huemn editorial shoot", width: 1200, height: 800 },
    { src: `/playground/Resized Huemn/20191214192422_IMG_1472.jpg`, alt: "Huemn editorial shoot", width: 800, height: 1200 },
    { src: `/playground/Resized Huemn/20191214193558_IMG_1501.jpg`, alt: "Huemn editorial shoot", width: 800, height: 1200 },
    { src: `/playground/Resized Huemn/20191214193702_IMG_1514.jpg`, alt: "Huemn editorial shoot", width: 1200, height: 800 },
    { src: `/playground/Resized Huemn/20191214200233_IMG_1615.jpg`, alt: "Huemn editorial shoot", width: 1200, height: 800 },
    { src: `/playground/Resized Huemn/20191214200325_IMG_1620.jpg`, alt: "Huemn editorial shoot", width: 1200, height: 800 },
    { src: `/playground/Resized Huemn/20191214201029_IMG_1660.jpg`, alt: "Huemn editorial shoot", width: 800, height: 1200 },
    { src: `/playground/Resized Huemn/20191214201132_IMG_1666.jpg`, alt: "Huemn editorial shoot", width: 1200, height: 800 },
    { src: `/playground/Resized Huemn/20191214201415_IMG_1675.jpg`, alt: "Huemn editorial shoot", width: 1200, height: 800 },
    { src: `/playground/Resized Huemn/20191214201554_IMG_1683.jpg`, alt: "Huemn editorial shoot", width: 1200, height: 800 },
    { src: `/playground/Resized Huemn/20191214201616_IMG_1687.jpg`, alt: "Huemn editorial shoot", width: 1200, height: 800 },
    { src: `/playground/Resized Huemn/20191214202423_IMG_1714.jpg`, alt: "Huemn editorial shoot", width: 800, height: 1200 },
    { src: `/playground/Resized Huemn/20191214203004_IMG_1744.jpg`, alt: "Huemn editorial shoot", width: 800, height: 1200 },
    { src: `/playground/Resized Huemn/20191214205238_IMG_1835.jpg`, alt: "Huemn editorial shoot", width: 800, height: 1200 },
    { src: `/playground/Resized Huemn/20191214205437_IMG_1852.jpg`, alt: "Huemn editorial shoot", width: 800, height: 1200 },
    { src: `/playground/Resized Huemn/IMG-20191214-WA0031.jpg`, alt: "Huemn editorial shoot", width: 213, height: 320 },
    ],
  },
  {
    slug: "verve-magazine",
    title: "Verve Magazine",
    tags: "Styling · Editorial",
    oneLiner: "Assistant stylist on an editorial story and two supplement covers",
    coverPosition: "center 20%",
    kind: "light",
    teaser:
      "I was a styling intern at Verve India while I was still in undergrad, and worked on three shoots: an editorial story for the January 2018 issue, and two supplement shoots, one with Tamannah Bhatia and one with Shriya Saran. I was there for each one from the first moodboard to the last return, putting looks together, sourcing, and assisting on set.",
    cover: { src: "/playground/Styling Assistant - Verve/Shriya Saran - Assisting/Shriya Cover.jpg", alt: "Styling assistant on set with Shriya Saran, for Verve Magazine", width: 916, height: 1200 },
    pageGalleries: [
      {
        title: "Welcome Spring with These Cascading Silhouettes",
        details: ["Assistant stylist · Editorial story, Verve Magazine, January 2018 issue", "Styled by Nikhil D"],
        images: [
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/a.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 800, height: 1200 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/b.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 805, height: 1200 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/c.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 1200, height: 755 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/d.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 956, height: 1200 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/e.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 800, height: 1200 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/f.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 797, height: 1200 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/g.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 1200, height: 798 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/h.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 960, height: 1200 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/i.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 973, height: 1200 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/j.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 973, height: 1200 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/k.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 797, height: 1200 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/l.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 808, height: 1200 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/m.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 1200, height: 1194 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/n.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 956, height: 1200 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/o.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 800, height: 1200 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/p.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 956, height: 1200 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/q.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 1200, height: 784 },
          { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/r.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 782, height: 1200 },
        ],
      },
      {
        title: "Tamannah Bhatia",
        details: ["Assistant stylist · Verve Magazine supplement shoot"],
        images: [
          { src: `/playground/Styling Assistant - Verve/Tamannah Bhatia - Assisting/Tamannah Cover 2.jpg`, alt: "Styling assistant on set with Tamannah Bhatia, for Verve Magazine", width: 916, height: 1200 },
          { src: `/playground/Styling Assistant - Verve/Tamannah Bhatia - Assisting/Tamannah 1 2.jpg`, alt: "Styling assistant on set with Tamannah Bhatia, for Verve Magazine", width: 1200, height: 785 },
          { src: `/playground/Styling Assistant - Verve/Tamannah Bhatia - Assisting/Tamannah 2 2.jpg`, alt: "Styling assistant on set with Tamannah Bhatia, for Verve Magazine", width: 1200, height: 785 },
          { src: `/playground/Styling Assistant - Verve/Tamannah Bhatia - Assisting/Tamannah 3 2.jpg`, alt: "Styling assistant on set with Tamannah Bhatia, for Verve Magazine", width: 1200, height: 785 },
        ],
      },
      {
        title: "Shriya Saran",
        details: ["Assistant stylist · Verve Magazine supplement shoot"],
        images: [
          { src: `/playground/Styling Assistant - Verve/Shriya Saran - Assisting/Shriya Cover.jpg`, alt: "Styling assistant on set with Shriya Saran, for Verve Magazine", width: 916, height: 1200 },
          { src: `/playground/Styling Assistant - Verve/Shriya Saran - Assisting/Shriya 1 2.jpg`, alt: "Styling assistant on set with Shriya Saran, for Verve Magazine", width: 1200, height: 785 },
          { src: `/playground/Styling Assistant - Verve/Shriya Saran - Assisting/Shriya 2 2.jpg`, alt: "Styling assistant on set with Shriya Saran, for Verve Magazine", width: 1200, height: 785 },
          { src: `/playground/Styling Assistant - Verve/Shriya Saran - Assisting/Shriya 3 2.jpg`, alt: "Styling assistant on set with Shriya Saran, for Verve Magazine", width: 1200, height: 785 },
          { src: `/playground/Styling Assistant - Verve/Shriya Saran - Assisting/Shriya 4 2.jpg`, alt: "Styling assistant on set with Shriya Saran, for Verve Magazine", width: 1200, height: 785 },
        ],
      },
    ],
    images: [
    { src: `/playground/Styling Assistant - Verve/Shriya Saran - Assisting/Shriya Cover.jpg`, alt: "Styling assistant on set with Shriya Saran, for Verve Magazine", width: 916, height: 1200 },
    { src: `/playground/Styling Assistant - Verve/Shriya Saran - Assisting/Shriya 1 2.jpg`, alt: "Styling assistant on set with Shriya Saran, for Verve Magazine", width: 1200, height: 785 },
    { src: `/playground/Styling Assistant - Verve/Shriya Saran - Assisting/Shriya 2 2.jpg`, alt: "Styling assistant on set with Shriya Saran, for Verve Magazine", width: 1200, height: 785 },
    { src: `/playground/Styling Assistant - Verve/Shriya Saran - Assisting/Shriya 3 2.jpg`, alt: "Styling assistant on set with Shriya Saran, for Verve Magazine", width: 1200, height: 785 },
    { src: `/playground/Styling Assistant - Verve/Shriya Saran - Assisting/Shriya 4 2.jpg`, alt: "Styling assistant on set with Shriya Saran, for Verve Magazine", width: 1200, height: 785 },
    { src: `/playground/Styling Assistant - Verve/Tamannah Bhatia - Assisting/Tamannah Cover 2.jpg`, alt: "Styling assistant on set with Tamannah Bhatia, for Verve Magazine", width: 916, height: 1200 },
    { src: `/playground/Styling Assistant - Verve/Tamannah Bhatia - Assisting/Tamannah 1 2.jpg`, alt: "Styling assistant on set with Tamannah Bhatia, for Verve Magazine", width: 1200, height: 785 },
    { src: `/playground/Styling Assistant - Verve/Tamannah Bhatia - Assisting/Tamannah 2 2.jpg`, alt: "Styling assistant on set with Tamannah Bhatia, for Verve Magazine", width: 1200, height: 785 },
    { src: `/playground/Styling Assistant - Verve/Tamannah Bhatia - Assisting/Tamannah 3 2.jpg`, alt: "Styling assistant on set with Tamannah Bhatia, for Verve Magazine", width: 1200, height: 785 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/a.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 800, height: 1200 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/b.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 805, height: 1200 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/c.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 1200, height: 755 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/d.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 956, height: 1200 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/e.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 800, height: 1200 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/f.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 797, height: 1200 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/g.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 1200, height: 798 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/h.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 960, height: 1200 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/i.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 973, height: 1200 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/j.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 973, height: 1200 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/k.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 797, height: 1200 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/l.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 808, height: 1200 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/m.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 1200, height: 1194 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/n.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 956, height: 1200 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/o.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 800, height: 1200 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/p.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 956, height: 1200 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/q.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 1200, height: 784 },
    { src: `/playground/Verve Magazine - Editorial Shoot (Jan 2018) 2/r.jpg`, alt: "Verve Magazine editorial shoot, January 2018", width: 782, height: 1200 },
    ],
  },
  {
    slug: "niluk",
    title: "Niluk: Safar Collection",
    tags: "Styling · Art Direction",
    oneLiner: "Indian embroidery on Western silhouettes",
    coverPosition: "center 65%",
    kind: "light",
    teaser:
      "Nilima Mehta's photographer, a senior from my fashion school, got in touch. Nilima had designed pieces around different moods, and I helped her reframe them into one story: Safar, Indian embroidery on Western silhouettes. I did the creative direction, styling and sourcing.",
    cover: { src: "/playground/Niluk/DSC08043.jpg", alt: "Niluk portrait session, profile with styled makeup", width: 800, height: 1200 },
    images: [
    { src: `/playground/Niluk/DSC08819.jpg`, alt: "Niluk portrait session", width: 800, height: 1200 },
    { src: `/playground/Niluk/DSC08777.jpg`, alt: "Niluk portrait session", width: 800, height: 1200 },
    { src: `/playground/Niluk/DSC08772.jpg`, alt: "Niluk portrait session", width: 800, height: 1200 },
    { src: `/playground/Niluk/DSC08605.jpg`, alt: "Niluk portrait session", width: 800, height: 1200 },
    { src: `/playground/Niluk/DSC08043.jpg`, alt: "Niluk portrait session, profile with styled makeup", width: 800, height: 1200 },
    { src: `/playground/Niluk/DSC08320.jpg`, alt: "Niluk portrait session", width: 800, height: 1200 },
    { src: `/playground/Niluk/DSC08356.jpg`, alt: "Niluk portrait session", width: 1200, height: 800 },
    { src: `/playground/Niluk/DSC08397.jpg`, alt: "Niluk portrait session", width: 1200, height: 800 },
    ],
  },
  {
    slug: "zebein",
    title: "Zebein",
    tags: "Styling · Art Direction",
    oneLiner: "Creative direction for an Indian label's debut campaign",
    coverPosition: "center 20%",
    kind: "light",
    teaser:
      "Zebein was a new label bringing out stylish linen dresses, with pockets. We split the collection into three themes by colour, and I planned the shoot around them: locations with the photographer, then the styling and sourcing for every look, plus the jewellery, make-up and poses. It was a big campaign for two people, the photographer and me, with 7 models over 2 weeks.",
    cover: { src: "/playground/Resized Zebein/IMG_1523.jpg", alt: "Zebein portrait session, golden hour outdoors", width: 800, height: 1200 },
    images: [
    { src: `/playground/Resized Zebein/IMG_3043.jpg`, alt: "Zebein portrait session", width: 800, height: 1200 },
    { src: `/playground/Resized Zebein/IMG_1523.jpg`, alt: "Zebein portrait session, golden hour outdoors", width: 800, height: 1200 },
    { src: `/playground/Resized Zebein/IMG_1810.jpg`, alt: "Zebein portrait session", width: 800, height: 1200 },
    { src: `/playground/Resized Zebein/IMG_2842.jpg`, alt: "Zebein portrait session", width: 800, height: 1200 },
    { src: `/playground/Resized Zebein/IMG_2248.jpg`, alt: "Zebein portrait session", width: 800, height: 1200 },
    { src: `/playground/Resized Zebein/IMG_2521.jpg`, alt: "Zebein portrait session", width: 800, height: 1200 },
    { src: `/playground/Resized Zebein/IMG_2519.jpg`, alt: "Zebein portrait session", width: 800, height: 1200 },
    { src: `/playground/Resized Zebein/IMG_3016.jpg`, alt: "Zebein portrait session", width: 800, height: 1200 },
    { src: `/playground/Resized Zebein/IMG_2683 2.jpg`, alt: "Zebein portrait session", width: 800, height: 1200 },
    { src: `/playground/Resized Zebein/IMG_2566 2.jpg`, alt: "Zebein portrait session", width: 1200, height: 800 },
    { src: `/playground/Resized Zebein/IMG_2234.jpg`, alt: "Zebein portrait session", width: 800, height: 1200 },
    ],
  },
  {
    slug: "spoken-word",
    title: "Spoken Word Ahmedabad",
    tags: "Poetry · Performance",
    oneLiner: "Twenty open mics that gave Ahmedabad a stage of its own",
    origin: "a few friends obsessed with Button Poetry",
    kind: "light",
    teaser:
      "In 2017, a few friends and I, all obsessed with Button Poetry, started a spoken word movement in our home city of Ahmedabad. Over the next two years we ran more than 20 open mics, tapping into the city's creative nerve and building a space for storytelling and performance.",
    cover: { src: "/playground/poetry-festivals/IMG_20170501_155006_858.jpg", alt: "Performing spoken word on stage, backlit silhouette", width: 774, height: 683 },
    images: [
    { src: `/playground/Screenshot_20170724-231651_01.png`, alt: "Performing spoken word on stage", width: 1080, height: 728 },
    { src: `/playground/poetry-festivals/IMG_20170501_155006_858.jpg`, alt: "Poetry festival", width: 774, height: 683 },
    { src: `/playground/poetry-festivals/received_1668367066507585.jpeg`, alt: "Poetry festival", width: 900, height: 1200 },
    { src: `/playground/poetry-festivals/98744900-7F70-4258-9A84-08C9B529A0A8.JPG`, alt: "Poetry festival", width: 1200, height: 798 },
    { src: `/playground/poetry-festivals/FB_IMG_1565649456536.jpg`, alt: "Poetry festival", width: 1080, height: 720 },
    ],
  },
  {
    slug: "big-squat-festival",
    title: "Big Squat Festival",
    tags: "Events · Artist Relations",
    oneLiner: "Artist relations for an eight-week indie arts festival",
    kind: "light",
    teaser:
      "After my Verve internship I came back to Ahmedabad, and since I was already organising festivals, I found a group of people doing the same thing who also happened to be my friends. Together we put on Big Squat, Fangirl Live's eight-week indie arts festival. I found artists and booked them, hosted on stage, and did a little of everything else. It was a labour of love from a few kids who loved indie music and comedy and wanted to bring that culture to their home city.",
    cover: { src: "/playground/poetry-festivals/27163986_1765914430120340_6600117073842964069_o.jpg", alt: "Hosting on stage at Big Squat, an indie arts festival", width: 1200, height: 638 },
    images: [
    { src: `/playground/poetry-festivals/27163986_1765914430120340_6600117073842964069_o.jpg`, alt: "Hosting on stage at an indie arts festival", width: 1200, height: 638 },
    ],
  },
];

export default playgroundEntries;

export function getPlaygroundEntry(slug: string) {
  return playgroundEntries.find((p) => p.slug === slug);
}
