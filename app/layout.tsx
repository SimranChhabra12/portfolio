import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Serif_Gurmukhi } from "next/font/google";
import KaiserCursor from "@/components/interactive/KaiserCursor";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// The wordmark is set in Gurmukhi, and Playfair carries no Gurmukhi glyphs — without
// this the nav would fall back to whatever the OS happens to have (or tofu on Windows).
// Noto Serif Gurmukhi is the closest serif companion to Playfair in the script.
const notoSerifGurmukhi = Noto_Serif_Gurmukhi({
  variable: "--font-gurmukhi",
  subsets: ["gurmukhi"],
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Simran Chhabra — Product Designer",
  description:
    "Portfolio of Simran Chhabra, a product designer focused on research-driven, human-centered experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable} ${notoSerifGurmukhi.variable}`}>
      <head>
        {/* `.reveal` starts at opacity 0 in CSS and is only un-hidden by Reveal's client
            effect, so with JS off the scroll-revealed content never appears at all — the
            homepage Playground section, the whole /about timeline and every recognition
            card render blank. Reduced motion is already handled in globals.css; this covers
            the no-JS case the same way. */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body>
        {children}
        {/* Sitewide on purpose — Nav is imported per page, but Kaiser should
            survive every route, including the bespoke case studies. */}
        <KaiserCursor />
      </body>
    </html>
  );
}
