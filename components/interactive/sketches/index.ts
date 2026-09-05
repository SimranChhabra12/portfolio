import type { SketchFactory } from "./types";

/**
 * Registry of live sketches, keyed by the `sketch` id on a PlaygroundEntry.
 *
 * Entries are loaders, not modules: nothing here is in the bundle until P5Sketch
 * actually scrolls into view and calls one. Adding a sketch is two steps — drop the
 * module in this folder, add a line here — and then `sketch: "<id>"` on the entry.
 */
const sketches: Record<string, () => Promise<SketchFactory>> = {
  "flow-field": () => import("./flowField").then((m) => m.default),
};

export default sketches;
export type { SketchFactory };
