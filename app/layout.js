import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const fontSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Peptide Technologies",
  description:
    "US-made research peptides. Third-party Certificate of Analysis on every batch.",
};

// The whole site is database-backed (prices, stock, orders, COA lots all
// change independently of deploys) and the backend isn't reachable during
// the Docker build step anyway — statically prerendering any route bakes in
// whatever (usually empty) data was fetchable at build time, permanently,
// until the next rebuild. Force every route to render per-request instead.
export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable} ${fontSerif.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
