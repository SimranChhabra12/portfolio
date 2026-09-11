import type { SketchFactory } from "./types";

// Turtles: a polished version of Simran's fall 2024 midterm draft.
//
// What changed from the draft, and why:
// - Depth. The draft was one flat blue with a single row of everything. The water is now
//   a vertical gradient with light shafts from the surface, and turtles and kelp live on
//   three depth layers: far ones are smaller, paler and slower, which is what sells
//   "underwater" more than any single detail.
// - The turtles. The draft's seven turtles bobbed in perfect sync (they all shared
//   sin(frameCount)), so the school read as one sprite. Each turtle now has its own phase,
//   speed and wander, a patterned shell, a beaked head, and front flippers that paddle.
// - The kelp. The draft's seaweed was a dense even band. Strands now taper, vary in
//   height and colour, and sway on noise rather than a shared sine.
// - Interaction. Moving the pointer leaves a trail of bubbles; clicking or tapping drops
//   a piece of food that sinks, and the nearest turtles turn and swim to eat it.
//
// Sticks to p5 calls that are stable across 1.x and 2.x (no bezier/curve vertices).

type Turtle = {
  x: number; y: number; depth: number; speed: number; dir: number; heading: number;
  size: number; phase: number; wander: number; hue: [number, number, number];
};
type Kelp = { x: number; height: number; width: number; depth: number; seed: number; tint: number };
type Bubble = { x: number; y: number; r: number; vy: number; life: number };
type Food = { x: number; y: number; vy: number; eaten: boolean };
type Mote = { x: number; y: number; r: number; vy: number; drift: number };

const turtles: SketchFactory = (p, container) => {
  let W = 0, H = 0;
  let school: Turtle[] = [];
  let kelp: Kelp[] = [];
  let motes: Mote[] = [];
  const bubbles: Bubble[] = [];
  const food: Food[] = [];
  let seabed: number[] = [];

  const rnd = (a: number, b: number) => a + Math.random() * (b - a);

  function build() {
    W = container.clientWidth;
    H = container.clientHeight;

    // Seabed: a gentle sandy curve along the bottom 14% of the frame.
    seabed = [];
    for (let x = 0; x <= W + 20; x += 20) {
      seabed.push(H * 0.88 + (p.noise(x * 0.004) - 0.5) * H * 0.08);
    }

    // Kelp on three depth layers (0 = far, 2 = near).
    kelp = [];
    const strands = Math.round(W / 38);
    for (let i = 0; i < strands; i++) {
      const depth = i % 3;
      kelp.push({
        x: rnd(0, W),
        height: H * rnd(0.25, 0.55) * (0.7 + depth * 0.2),
        width: rnd(5, 9) * (0.6 + depth * 0.25),
        depth,
        seed: rnd(0, 1000),
        tint: rnd(-12, 12),
      });
    }
    kelp.sort((a, b) => a.depth - b.depth);

    // Turtles, also on depth layers, each with its own rhythm.
    const count = Math.max(5, Math.round(W / 140));
    school = [];
    for (let i = 0; i < count; i++) {
      const depth = rnd(0, 1);
      const dir = Math.random() < 0.5 ? 1 : -1;
      school.push({
        x: rnd(0, W), y: rnd(H * 0.18, H * 0.7),
        depth, dir, heading: dir === 1 ? 0 : Math.PI,
        speed: (0.35 + depth * 0.7) * rnd(0.8, 1.2),
        size: (38 + depth * 34) * Math.min(1.4, W / 900 + 0.4),
        phase: rnd(0, Math.PI * 2), wander: rnd(0, 1000),
        hue: [rnd(80, 110), rnd(95, 120), rnd(60, 80)],
      });
    }
    school.sort((a, b) => a.depth - b.depth);

    motes = Array.from({ length: Math.round(W / 12) }, () => ({
      x: rnd(0, W), y: rnd(0, H), r: rnd(0.6, 1.8), vy: rnd(-0.15, -0.04), drift: rnd(0, 1000),
    }));
  }

  function water() {
    // Native gradient: lighter teal at the surface, deep blue below.
    const ctx = p.drawingContext as CanvasRenderingContext2D;
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#3f9fb8");
    g.addColorStop(0.45, "#1f6d93");
    g.addColorStop(1, "#0d3558");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Light shafts from the surface, slowly shifting.
    const t = p.millis() / 1000;
    p.noStroke();
    for (let i = 0; i < 5; i++) {
      const cx = ((i + 0.5) / 5) * W + Math.sin(t * 0.3 + i * 1.7) * W * 0.05;
      const spread = W * (0.05 + 0.02 * Math.sin(t * 0.5 + i));
      p.fill(255, 255, 255, 14 + 6 * Math.sin(t * 0.7 + i * 2));
      p.beginShape();
      p.vertex(cx - spread * 0.3, 0);
      p.vertex(cx + spread * 0.3, 0);
      p.vertex(cx + spread * 2 + W * 0.08, H);
      p.vertex(cx - spread + W * 0.08, H);
      p.endShape(p.CLOSE);
    }

    // Surface ripple band.
    p.fill(255, 255, 255, 22);
    p.beginShape();
    for (let x = 0; x <= W; x += 16) p.vertex(x, 10 + Math.sin(x * 0.02 + t * 1.6) * 4);
    p.vertex(W, 0);
    p.vertex(0, 0);
    p.endShape(p.CLOSE);
  }

  function drawSeabed() {
    p.noStroke();
    p.fill(194, 170, 120);
    p.beginShape();
    seabed.forEach((y, i) => p.vertex(i * 20, y));
    p.vertex(W, H);
    p.vertex(0, H);
    p.endShape(p.CLOSE);
    // A few dark rocks sitting in the sand.
    p.fill(92, 86, 80);
    for (let i = 0; i < 6; i++) {
      const x = ((i * 173) % 100) / 100 * W;
      const y = seabed[Math.min(seabed.length - 1, Math.round(x / 20))] ?? H * 0.9;
      p.ellipse(x, y + 4, 40 + (i % 3) * 16, 18 + (i % 2) * 8);
    }
  }

  function drawKelp(k: Kelp) {
    const t = p.millis() / 1000;
    const base = seabed[Math.min(seabed.length - 1, Math.round(k.x / 20))] ?? H;
    const fade = 0.55 + k.depth * 0.22;
    p.noStroke();
    p.fill(40 + k.tint, 120 + k.tint, 70, 255 * fade);
    const left: [number, number][] = [];
    const right: [number, number][] = [];
    const steps = 14;
    for (let s = 0; s <= steps; s++) {
      const u = s / steps;
      const y = base - u * k.height;
      const sway = (p.noise(k.seed, u * 1.5, t * 0.35) - 0.5) * 60 * u;
      const w = k.width * (1 - u * 0.85);
      left.push([k.x + sway - w, y]);
      right.push([k.x + sway + w, y]);
    }
    p.beginShape();
    left.forEach(([x, y]) => p.vertex(x, y));
    right.reverse().forEach(([x, y]) => p.vertex(x, y));
    p.endShape(p.CLOSE);
  }

  function drawTurtle(tu: Turtle) {
    const t = p.millis() / 1000;
    const s = tu.size;
    const fade = 0.55 + tu.depth * 0.45; // far turtles are paler
    const [r, g, b] = tu.hue;
    const paddle = Math.sin(t * (1.6 + tu.speed) + tu.phase);

    p.push();
    p.translate(tu.x, tu.y + Math.sin(t * 0.9 + tu.phase) * 3);
    p.rotate(tu.heading);
    p.noStroke();

    // Rear flippers, small.
    p.fill(r * 0.8, g * 0.85, b * 0.8, 255 * fade);
    for (const side of [-1, 1]) {
      p.push();
      p.translate(-s * 0.36, side * s * 0.2);
      p.rotate(side * (0.5 + paddle * 0.15));
      p.ellipse(0, 0, s * 0.3, s * 0.13);
      p.pop();
    }

    // Front flippers, long, paddling in alternation.
    for (const side of [-1, 1]) {
      p.push();
      p.translate(s * 0.14, side * s * 0.26);
      p.rotate(side * (0.9 + paddle * 0.45 * side));
      p.ellipse(s * 0.2, 0, s * 0.55, s * 0.16);
      p.pop();
    }

    // Head with a slight beak.
    p.fill(r * 0.9, g * 0.95, b * 0.85, 255 * fade);
    p.ellipse(s * 0.56, 0, s * 0.3, s * 0.22);
    p.fill(r * 0.75, g * 0.8, b * 0.7, 255 * fade);
    p.triangle(s * 0.68, -s * 0.04, s * 0.76, 0, s * 0.68, s * 0.04);
    p.fill(20, 20, 20, 220 * fade);
    p.circle(s * 0.6, -s * 0.06, s * 0.035);
    p.circle(s * 0.6, s * 0.06, s * 0.035);

    // Shell: dark rim, lighter carapace, and a pattern of scutes.
    p.fill(92, 70, 40, 255 * fade);
    p.ellipse(0, 0, s * 0.98, s * 0.74);
    p.fill(132, 104, 58, 255 * fade);
    p.ellipse(0, 0, s * 0.86, s * 0.62);
    p.fill(110, 84, 44, 255 * fade);
    p.ellipse(0, 0, s * 0.22, s * 0.2);
    for (const [dx, dy] of [[-0.22, 0], [0.2, 0], [0, -0.17], [0, 0.17], [-0.14, -0.14], [0.14, -0.14], [-0.14, 0.14], [0.14, 0.14]]) {
      p.ellipse(s * dx, s * dy, s * 0.15, s * 0.12);
    }
    // Soft highlight from the light above.
    p.fill(255, 255, 255, 26 * fade);
    p.ellipse(-s * 0.06, -s * 0.12, s * 0.5, s * 0.22);
    p.pop();
  }

  function steer(tu: Turtle) {
    const t = p.millis() / 1000;
    // Nearest uneaten food within reach pulls the turtle toward it.
    let target: Food | null = null;
    let best = Infinity;
    for (const f of food) {
      if (f.eaten) continue;
      const d = Math.hypot(f.x - tu.x, f.y - tu.y);
      if (d < W * 0.45 && d < best) { best = d; target = f; }
    }

    let desired: number;
    let speed = tu.speed;
    if (target) {
      desired = Math.atan2(target.y - tu.y, target.x - tu.x);
      speed = tu.speed * 2.2;
      if (best < tu.size * 0.45) target.eaten = true;
    } else {
      // Wander: mostly along its direction of travel, with a slow noise drift in y.
      const base = tu.dir === 1 ? 0 : Math.PI;
      desired = base + (p.noise(tu.wander, t * 0.15) - 0.5) * 0.9;
      // Keep inside the water column.
      if (tu.y < H * 0.14) desired = base + 0.4 * tu.dir;
      if (tu.y > H * 0.74) desired = base - 0.4 * tu.dir;
    }

    // Turn smoothly toward the desired heading.
    let diff = desired - tu.heading;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    tu.heading += diff * 0.04;
    tu.x += Math.cos(tu.heading) * speed;
    tu.y += Math.sin(tu.heading) * speed;

    // Wrap around the sides; when a turtle turns back after food, flip its travel direction.
    tu.dir = Math.cos(tu.heading) >= 0 ? 1 : -1;
    if (tu.x > W + tu.size) tu.x = -tu.size;
    if (tu.x < -tu.size) tu.x = W + tu.size;
  }

  // Pointer: move for bubbles, click or tap to drop food.
  let lastBubble = 0;
  const local = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  container.addEventListener("pointermove", (e) => {
    const now = performance.now();
    if (now - lastBubble < 60) return;
    lastBubble = now;
    const { x, y } = local(e);
    bubbles.push({ x, y, r: rnd(2, 5), vy: rnd(-1.4, -0.6), life: 1 });
  });
  container.addEventListener("pointerdown", (e) => {
    const { x, y } = local(e);
    for (let i = 0; i < 3; i++) food.push({ x: x + rnd(-10, 10), y: y + rnd(-6, 6), vy: rnd(0.3, 0.6), eaten: false });
  });

  p.setup = () => {
    p.createCanvas(container.clientWidth, container.clientHeight);
    p.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
    build();
    new ResizeObserver(() => {
      if (Math.abs(container.clientWidth - W) < 2 && Math.abs(container.clientHeight - H) < 2) return;
      p.resizeCanvas(container.clientWidth, container.clientHeight);
      build();
    }).observe(container);
  };

  p.draw = () => {
    water();

    // Drifting specks in the water.
    p.noStroke();
    for (const m of motes) {
      m.y += m.vy;
      m.x += (p.noise(m.drift, p.millis() * 0.0002) - 0.5) * 0.4;
      if (m.y < 0) { m.y = H; m.x = rnd(0, W); }
      p.fill(255, 255, 255, 70);
      p.circle(m.x, m.y, m.r * 2);
    }

    drawSeabed();

    // Far kelp, then far turtles, then near kelp, then near turtles, for depth.
    kelp.filter((k) => k.depth < 2).forEach(drawKelp);
    for (const tu of school) {
      steer(tu);
      if (tu.depth < 0.5) drawTurtle(tu);
    }
    kelp.filter((k) => k.depth === 2).forEach(drawKelp);
    school.filter((tu) => tu.depth >= 0.5).forEach(drawTurtle);

    // Food sinks until eaten or it reaches the sand.
    for (let i = food.length - 1; i >= 0; i--) {
      const f = food[i];
      const floor = seabed[Math.min(seabed.length - 1, Math.round(f.x / 20))] ?? H;
      if (f.y < floor - 4) f.y += f.vy;
      p.fill(214, 186, 120);
      p.circle(f.x, f.y, 6);
      if (f.eaten) food.splice(i, 1);
    }
    if (food.length > 40) food.splice(0, food.length - 40);

    // Bubbles rise and fade.
    p.noFill();
    p.strokeWeight(1.2);
    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      b.y += b.vy;
      b.x += Math.sin(b.y * 0.05) * 0.3;
      b.life -= 0.008;
      p.stroke(255, 255, 255, 180 * b.life);
      p.circle(b.x, b.y, b.r * 2);
      if (b.life <= 0 || b.y < 0) bubbles.splice(i, 1);
    }
  };
};

export default turtles;
