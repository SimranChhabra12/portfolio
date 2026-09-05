import type p5 from "p5";

/**
 * A sketch in instance mode. `container` is the element the canvas is mounted into —
 * size the canvas off its `clientWidth` rather than the window, so the canvas tracks
 * the media column (`--col-media`) instead of the viewport.
 */
export type SketchFactory = (p: p5, container: HTMLElement) => void;
