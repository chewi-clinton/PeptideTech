import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartProvider";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Peptide Technologies — US Research Peptides with Third-Party COA",
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Peptide Technologies (Peptech) sells research peptides made in the USA, each batch verified by a third-party Certificate of Analysis (HPLC purity, MS identity) with lot traceability. For laboratory research use only.",
  keywords: [
    "research peptides",
    "buy research peptides",
    "peptides for sale",
    "USA research peptides",
    "Certificate of Analysis peptides",
    "COA verified peptides",
    "Peptide Technologies",
    "Peptech",
    "peptidetech.cc",
  ],
  applicationName: SITE_NAME,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "X0-xHgbev6PI6aXqLAOERfLhsAEdpmQUZjolwBfloc8",
  },
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
      <body className="min-h-screen flex flex-col">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
