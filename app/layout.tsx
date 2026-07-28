import type { Metadata } from "next";
import { Fraunces, Albert_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const albertSans = Albert_Sans({
  variable: "--font-albert",
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
    <html lang="en" className={`${fraunces.variable} ${albertSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
