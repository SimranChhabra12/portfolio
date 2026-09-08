// Mock content for the Resy Celebrations prototype.
//
// Photography is committed locally under /public/projects/resy/prototype/. The
// standalone Surge build hotlinked loremflickr.com, which has since died — every
// restaurant image on the live prototype is currently a broken-image icon. Nothing
// here reaches the network.

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  neighborhood: string;
  /** 1–5, indexes BUDGET_LABELS. Compared against the guest's budget filter. */
  price: number;
  capacity: number;
  minSpend: number;
  chargeType: string;
  /** Matched against the guest's selected vibes. */
  tags: string[];
  rating: number;
  reviews: number;
  includes: string[];
  photo: string;
  gallery: string[];
  /** Percentage position on the map view. */
  pin: { x: number; y: number };
  policy: Policy;
};

/**
 * The deposit and cancellation terms. Absent entirely from the old build — the
 * case study names no-show protection as an honest gap, and the manager research
 * is the reason the feature exists at all, so the terms belong in front of the
 * guest before they inquire rather than nowhere.
 */
export type Policy = {
  depositPct: number;
  /** Days before the booking after which the deposit is non-refundable. */
  refundableUntilDays: number;
  /** Days before the booking that final headcount locks. */
  headcountLockDays: number;
  cancellation: string;
};

const IMG = "/projects/resy/prototype";

export const BUDGET_LABELS = ["$", "$$", "$$$", "$$$$", "$$$$$"] as const;

export const RESTAURANTS: Restaurant[] = [
  {
    id: "nuaa",
    name: "Nuaa Table",
    cuisine: "Thai",
    neighborhood: "Prospect Heights",
    price: 3,
    capacity: 20,
    minSpend: 800,
    chargeType: "Flat fee",
    tags: ["private room", "intimate"],
    rating: 4.8,
    reviews: 212,
    includes: [
      "Private dining room",
      "Dedicated event server",
      "Custom set menu",
      "In-house AV for toasts",
    ],
    photo: `${IMG}/nuaa.jpg`,
    gallery: [`${IMG}/nuaa.jpg`, `${IMG}/room-a.jpg`, `${IMG}/room-b.jpg`],
    pin: { x: 30, y: 25 },
    policy: {
      depositPct: 30,
      refundableUntilDays: 7,
      headcountLockDays: 3,
      cancellation: "Full refund up to 7 days before. Inside 7 days the deposit is retained.",
    },
  },
  {
    id: "wayward",
    name: "Wayward Fare",
    cuisine: "New American",
    neighborhood: "Fort Greene",
    price: 2,
    capacity: 16,
    minSpend: 500,
    chargeType: "Per person",
    tags: ["lively", "cocktail-focused"],
    rating: 4.6,
    reviews: 388,
    includes: [
      "Semi-private mezzanine",
      "Welcome cocktail round",
      "Family-style menu",
      "Flexible 3-hour hold",
    ],
    photo: `${IMG}/wayward.jpg`,
    gallery: [`${IMG}/wayward.jpg`, `${IMG}/room-a.jpg`, `${IMG}/casamarea.jpg`],
    pin: { x: 58, y: 42 },
    policy: {
      depositPct: 25,
      refundableUntilDays: 5,
      headcountLockDays: 2,
      cancellation: "Full refund up to 5 days before. Inside 5 days the deposit is retained.",
    },
  },
  {
    id: "convivium",
    name: "Convivium Osteria",
    cuisine: "Italian",
    neighborhood: "Park Slope",
    price: 4,
    capacity: 14,
    minSpend: 1200,
    chargeType: "Flat fee",
    tags: ["private room", "intimate"],
    rating: 4.9,
    reviews: 147,
    includes: [
      "Wine cellar room",
      "Sommelier pairing",
      "Four-course prix fixe",
      "Cake service, no fee",
    ],
    photo: `${IMG}/convivium.jpg`,
    gallery: [`${IMG}/convivium.jpg`, `${IMG}/room-b.jpg`, `${IMG}/nuaa.jpg`],
    pin: { x: 42, y: 63 },
    policy: {
      depositPct: 35,
      refundableUntilDays: 10,
      headcountLockDays: 4,
      cancellation: "Full refund up to 10 days before. Inside 10 days the deposit is retained.",
    },
  },
  {
    id: "larina",
    name: "La Rina",
    cuisine: "Pizzeria",
    neighborhood: "Greenpoint",
    price: 2,
    capacity: 24,
    minSpend: 450,
    chargeType: "Per person",
    tags: ["lively", "casual"],
    rating: 4.5,
    reviews: 521,
    includes: [
      "Long communal table",
      "Unlimited pizza service",
      "BYO cake",
      "Street-level, step-free",
    ],
    photo: `${IMG}/larina.jpg`,
    gallery: [`${IMG}/larina.jpg`, `${IMG}/room-a.jpg`, `${IMG}/wayward.jpg`],
    pin: { x: 70, y: 20 },
    policy: {
      depositPct: 20,
      refundableUntilDays: 3,
      headcountLockDays: 2,
      cancellation: "Full refund up to 3 days before. Inside 3 days the deposit is retained.",
    },
  },
  {
    id: "casamarea",
    name: "Casa Marea",
    cuisine: "Spanish",
    neighborhood: "Cobble Hill",
    price: 3,
    capacity: 18,
    minSpend: 700,
    chargeType: "Per person",
    tags: ["lively", "cocktail-focused"],
    rating: 4.7,
    reviews: 264,
    includes: [
      "Back patio, heated",
      "Tapas service for the table",
      "Sherry flight on arrival",
      "DJ-ready sound system",
    ],
    photo: `${IMG}/casamarea.jpg`,
    gallery: [`${IMG}/casamarea.jpg`, `${IMG}/room-b.jpg`, `${IMG}/farmstead.jpg`],
    pin: { x: 22, y: 52 },
    policy: {
      depositPct: 30,
      refundableUntilDays: 7,
      headcountLockDays: 3,
      cancellation: "Full refund up to 7 days before. Inside 7 days the deposit is retained.",
    },
  },
  {
    id: "farmstead",
    name: "Farmstead Rooftop",
    cuisine: "Seasonal",
    neighborhood: "Williamsburg",
    price: 4,
    capacity: 30,
    minSpend: 1500,
    chargeType: "Flat fee",
    tags: ["outdoor", "lively"],
    rating: 4.4,
    reviews: 193,
    includes: [
      "Full rooftop buyout",
      "Covered and heated",
      "Passed canapés",
      "Skyline for photos",
    ],
    photo: `${IMG}/farmstead.jpg`,
    gallery: [`${IMG}/farmstead.jpg`, `${IMG}/room-a.jpg`, `${IMG}/casamarea.jpg`],
    pin: { x: 80, y: 70 },
    policy: {
      depositPct: 40,
      refundableUntilDays: 14,
      headcountLockDays: 5,
      cancellation: "Full refund up to 14 days before. Inside 14 days the deposit is retained.",
    },
  },
];

export const HERO_IMAGE = `${IMG}/hero-celebration.jpg`;

export const EVENT_TYPES = ["Birthday", "Work dinner", "Engagement", "Casual group", "Other"];
export const VIBES = ["lively", "intimate", "private room", "outdoor", "cocktail-focused"];
export const VIBE_LABELS: Record<string, string> = {
  lively: "Lively",
  intimate: "Intimate",
  "private room": "Private room",
  outdoor: "Outdoor",
  "cocktail-focused": "Cocktail-focused",
  casual: "Casual",
};
export const DIETARY = ["Vegetarian", "Vegan", "Gluten-free", "Nut allergy", "No restrictions"];
export const TIMINGS = ["6:30–7:30 PM", "7–8:30 PM", "8–9 PM", "Flexible all evening"];

export type Guest = { id: string; name: string };

export const GUESTS: Guest[] = [
  { id: "g1", name: "Emma Rossi" },
  { id: "g2", name: "Jordan Kim" },
  { id: "g3", name: "Priya Shah" },
  { id: "g4", name: "Marcus Lee" },
  { id: "g5", name: "Sofia Marin" },
  { id: "g6", name: "Liam Tran" },
  { id: "g7", name: "Ava Patel" },
  { id: "g8", name: "Noah Brooks" },
  { id: "g9", name: "Iris Chen" },
  { id: "g10", name: "Dev Anand" },
  { id: "g11", name: "Maya Okafor" },
  { id: "g12", name: "Theo Blanc" },
  { id: "g13", name: "Nina Duarte" },
  { id: "g14", name: "Omar Haddad" },
  { id: "g15", name: "Clara Beck" },
  { id: "g16", name: "Ravi Menon" },
  { id: "g17", name: "Jonah Silva" },
  { id: "g18", name: "Yuki Tanaka" },
  { id: "g19", name: "Elena Petrov" },
  { id: "g20", name: "Sam Okonkwo" },
];

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
