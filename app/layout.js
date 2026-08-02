import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartProvider";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TopBanner from "@/components/TopBanner";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable} ${fontSerif.variable}`}>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <TopBanner />
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
