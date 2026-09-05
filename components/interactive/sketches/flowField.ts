import type { SketchFactory } from "./types";

/**
 * Reference sketch for the P5Sketch embed — a particle flow field over Perlin noise,
 * in the site's ink/accent palette.
 *
 * It exists to exercise the embed (mount, resize, pause off-screen, reduced-motion
 * fallback) end to end. It is deliberately not attached to any playground entry: the
 * real sketches are Simran's, and standing this in for one would misrepresent the work.
 * Wiring a real sketch is `sketch: "<id>"` on the entry plus a line in `index.ts`.
 */
const flowField: SketchFactory = (p, container) => {
  const COUNT = 900;
  const SCALE = 0.0045;
  const ASPECT = 3 / 5; // matches the 5:3 media slot

  let particles: { x: number; y: number }[] = [];

  const seed = () => {
    particles = Array.from({ length: COUNT }, () => ({
      x: p.random(p.width),
      y: p.random(p.height),
    }));
  };

  const paintGround = () => {
    p.background(247, 243, 238); // --cream
  };

  p.setup = () => {
    const w = container.clientWidth || 640;
    p.createCanvas(w, Math.round(w * ASPECT));
    p.noStroke();
    paintGround();
    seed();
  };

  // p5 calls this on window resize; re-fit to the container, not the viewport.
  p.windowResized = () => {
    const w = container.clientWidth || 640;
    p.resizeCanvas(w, Math.round(w * ASPECT));
    paintGround();
    seed();
  };

  p.draw = () => {
    // Fade rather than clear, so the particles leave a trail.
    p.fill(247, 243, 238, 14);
    p.rect(0, 0, p.width, p.height);

    p.fill(139, 74, 106, 90); // --accent
    for (const particle of particles) {
      const angle =
        p.noise(particle.x * SCALE, particle.y * SCALE, p.frameCount * 0.0016) * p.TWO_PI * 2;
      particle.x += Math.cos(angle) * 1.1;
      particle.y += Math.sin(angle) * 1.1;

      // Wrap at the edges so the field never empties out.
      if (particle.x < 0) particle.x = p.width;
      if (particle.x > p.width) particle.x = 0;
      if (particle.y < 0) particle.y = p.height;
      if (particle.y > p.height) particle.y = 0;

      p.rect(particle.x, particle.y, 1.4, 1.4);
    }
  };
};

export default flowField;
