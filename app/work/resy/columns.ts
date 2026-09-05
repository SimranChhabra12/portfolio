// Column widths for the Resy case study.
//
// Task E6 ("normalise image scale") calls for two named widths — --col-media
// (1000px) for wide visuals and --col-text (640px) for inline prose. Those
// tokens live in app/globals.css on the Track A branch, which this route must
// not touch, so they are mirrored here at the same values. When the globals
// tokens land, swap these for var(--col-media) / var(--col-text).
//
// Every visual on this page picks one of these. No arbitrary pixel widths.
export const COL = {
  media: 1000, // wide visuals: diagrams, flow blocks, full-width figures
  text: 640, // inline visuals sitting in the prose column
} as const;

// Phone screenshots never go full-bleed — they go in PhoneMockup at one of
// two sizes, so a screen is always recognisably "a device", not a raw capture.
export const PHONE = {
  feature: 340, // the one hero screen in a section
  row: 240, // supporting screens in a ScreensRow
} as const;
