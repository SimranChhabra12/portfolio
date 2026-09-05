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
  kind: PlaygroundKind;
  teaser: string;
  cover: PlaygroundImage | null;
  images: PlaygroundImage[];
  videos?: PlaygroundVideo[];
  href?: string;
  /** Gallery shown on the full page (FULL entries only) — the pop-up itself never shows a gallery. */
  pageImages?: PlaygroundImage[];
}

const playgroundEntries: PlaygroundEntry[] = [
  // ── FULL cards ──────────────────────────────────────────────────────────
  {
    slug: "si-ch",
    title: "Si.Ch",
    tags: "Fashion · Brand",
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
    slug: "road-trip-experience",
    title: "The Road Trip Experience",
    tags: "Art · Documentary",
    kind: "full",
    teaser:
      "Sixteen artists, one car, across Gujarat. I ran the experience and operations, and we ended up preserving the lost music of Kutchh on film.",
    cover: { src: "/playground/rtx/IMG_20200117_171155.jpg", alt: "Hand-painting a vehicle with folk-art patterns", width: 1200, height: 900 },
    images: [],
    pageImages: [
    { src: `/playground/rtx/IMG-20200118-WA0029.jpg`, alt: "RTX — folk-art painting on site", width: 698, height: 1200 },
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
    { src: `/playground/rtx/IMG_20200118_124702.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG_20200118_185523.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG_20200117_135911.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG_20190922_150325.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/rtx/IMG_20200118_182137_286.jpg`, alt: "RTX — folk-art painting on site", width: 624, height: 1200 },
    { src: `/playground/rtx/IMG_20190922_122820.jpg`, alt: "RTX — folk-art painting on site", width: 1200, height: 900 },
    { src: `/playground/poetry-festivals/IMG-20200121-WA0003.jpg`, alt: "An artist taking a break beside the hand-painted car, paintbrush still in hand", width: 1200, height: 799 },
    ],
    videos: [
      { src: "/playground/rtx/VID_38910113_014527_132.mp4", alt: "The Road Trip Experience — video from site" },
      { src: "/playground/rtx/VID_40031012_123331_087.mp4", alt: "The Road Trip Experience — video from site" },
      { src: "/playground/rtx/VID-20200120-WA0015.mp4", alt: "The Road Trip Experience — video from site" },
    ],
    href: "/playground/road-trip-experience",
  },
  {
    slug: "nightmare-in-neverland",
    title: "Nightmare in Neverland",
    tags: "VR · Art Direction",
    kind: "full",
    teaser:
      "A surreal VR dreamscape, built by three of us. I made the tea party, where a little horror stays fun as long as you keep it whimsical.",
    cover: null,
    images: [],
    href: "/playground/nightmare-in-neverland",
  },

  // ── LIGHT cards ─────────────────────────────────────────────────────────
  {
    slug: "humans-were-made-to-love",
    title: "Humans Were Made To Love",
    tags: "Styling · Art Direction",
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
    kind: "light",
    teaser:
      "Assistant stylist on an editorial story and two supplement covers, with Shriya Saran and Tamannah Bhatia.",
    cover: { src: "/playground/Styling Assistant - Verve/Shriya Saran - Assisting/Shriya Cover.jpg", alt: "Styling assistant on set with Shriya Saran, for Verve Magazine", width: 916, height: 1200 },
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
    title: "Niluk by Nilima Mehta",
    tags: "Styling · Art Direction",
    kind: "light",
    teaser:
      "Creative direction and styling for the 'Safar' collection, Indian embroidery on Western silhouettes.",
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
    kind: "light",
    teaser:
      "Creative direction and styling for the debut campaign of an Indian contemporary label.",
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
    title: "Spoken Word",
    tags: "Poetry · Performance",
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
    kind: "light",
    teaser:
      "Organizing committee, artist relations, for Fangirl Live's eight-week indie arts festival.",
    cover: { src: "/playground/poetry-festivals/27163986_1765914430120340_6600117073842964069_o.jpg", alt: "Performing at Big Squat, an indie arts festival", width: 1200, height: 638 },
    images: [
    { src: `/playground/poetry-festivals/27163986_1765914430120340_6600117073842964069_o.jpg`, alt: "Performing at an indie arts festival", width: 1200, height: 638 },
    ],
  },
];

export default playgroundEntries;

export function getPlaygroundEntry(slug: string) {
  return playgroundEntries.find((p) => p.slug === slug);
}
