// WP1 — composed cover scenes (DESIGN_DOC §5).
// 2-3 phone screens arranged on a ground in the product's own palette.
// Flat: radius 0, no drop shadows, no device chrome — presence from scale, not framing.
// Output 5:3 at 2x (2000x1200).
import sharp from "sharp";

const W = 2000;
const H = 1200;

async function compose({ name, ground, screens, outPath }) {
  const overlap = 0.32; // each subsequent screen overlaps the previous by this fraction

  const prepared = [];
  for (const s of screens) {
    const targetHeight = Math.round(H * (s.scale ?? 0.94)); // stays inside the canvas
    const meta = await sharp(s.src).metadata();
    const w = Math.round((meta.width / meta.height) * targetHeight);
    const buf = await sharp(s.src).resize({ height: targetHeight }).toBuffer();
    let top = Math.round((H - targetHeight) / 2) + (s.yOffset || 0);
    top = Math.max(0, Math.min(top, H - targetHeight));
    prepared.push({ buf, w, h: targetHeight, top });
  }

  let totalWidth = prepared[0].w;
  for (let i = 1; i < prepared.length; i++) {
    totalWidth += Math.round(prepared[i].w * (1 - overlap));
  }

  const startX = Math.round((W - totalWidth) / 2);

  const composites = [];
  let x = startX;
  prepared.forEach((p, i) => {
    composites.push({ input: p.buf, left: x, top: p.top });
    x += Math.round(p.w * (1 - overlap));
  });

  await sharp({
    create: { width: W, height: H, channels: 3, background: ground },
  })
    .composite(composites)
    .jpeg({ quality: 90 })
    .toFile(outPath);

  console.log(`${name} -> ${outPath}`);
}

const root = "public";

await compose({
  name: "whspr",
  ground: "#07080A", // Whspr midnight, DESIGN_DOC §3
  outPath: `${root}/covers/whspr.jpg`,
  screens: [
    { src: `${root}/whspr3x/Splash Screen.png`, scale: 0.84, yOffset: 55 },
    { src: `${root}/whspr3x/Home/Hi-Fi.png`, scale: 0.96, yOffset: -20 },
    { src: `${root}/whspr3x/Place Profile/NightTime.png`, scale: 0.84, yOffset: 55 },
  ],
});

await compose({
  name: "aira",
  ground: "#0A0A0C", // AIRA bg, DESIGN_DOC §3
  outPath: `${root}/covers/aira.jpg`,
  screens: [
    { src: `${root}/aira/aira 3x/HOme tab_.png`, scale: 0.84, yOffset: 55 },
    { src: `${root}/aira/aira 3x/Menstrual Cycle Main Screen.png`, scale: 0.96, yOffset: -20 },
    { src: `${root}/aira/aira 3x/Workout - Cycle Insight.png`, scale: 0.84, yOffset: 55 },
  ],
});

await compose({
  name: "resy",
  ground: "#15100E", // warm near-black, complements Resy's berry lead (DESIGN_DOC §3)
  outPath: `${root}/covers/resy.jpg`,
  screens: [
    { src: "scripts/resy-source/home.png", scale: 0.84, yOffset: 55 },
    { src: "scripts/resy-source/preferences.png", scale: 0.96, yOffset: -20 },
    { src: "scripts/resy-source/matches.png", scale: 0.84, yOffset: 55 },
  ],
});
