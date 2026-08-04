import Link from "next/link";
import { api } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Eyebrow from "@/components/Eyebrow";
import { IconArrowRight } from "@/components/icons";
import { buildMetadata } from "@/lib/seo";
import HeroSection from "@/components/home/HeroSection";
import PriceMatchSection from "@/components/home/PriceMatchSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import SixReasonsSection from "@/components/home/SixReasonsSection";
import BuildKitSection from "@/components/home/BuildKitSection";
import FiveTestsSection from "@/components/home/FiveTestsSection";
import HeroesSection from "@/components/home/HeroesSection";
import InsightsSection from "@/components/home/InsightsSection";
import NewsletterSection from "@/components/home/NewsletterSection";

// Short homepage-card blurbs (real copy from the live site's category grid,
// distinct from — and shorter than — each category's full page description).
const HOMEPAGE_CATEGORY_BLURBS = {
  peptides: "Single research peptides — BPC-157, TB-500, GHK-Cu & more.",
  bioregulators: "Short peptide bioregulators for targeted research.",
  "cases-accessories": "Storage cases, vials & lab supplies.",
  "peptide-blends": "Pre-combined research stacks in a single vial.",
  capsules: "Capsule-format research compounds.",
  "liquids-aminos-solvents": "Sterile lab diluents, aminos & research solvents.",
  "glp-peptides": "GLP-1 / GIP metabolic peptides — semaglutide, tirzepatide, retatrutide.",
};

// The homepage "Shop by category" grid features 6 of the 7 categories
// (Capsules is omitted there — it's still reachable from the header/shop),
// in this exact order, matching the live site.
const HOMEPAGE_CATEGORY_ORDER = [
  "peptides",
  "bioregulators",
  "cases-accessories",
  "peptide-blends",
  "liquids-aminos-solvents",
  "glp-peptides",
];

// Exact slugs/order of the live site's "Featured peptides" (12 items) and
// "Research peptides, ready to ship" (8 items) homepage grids.
const FEATURED_SLUGS = [
  "bpc-157",
  "igf-1-lr3-1mg",
  "glutathione-1500mg",
  "mots-c-10mg",
  "nad",
  "semax-5mg",
  "tesamorelin",
  "tb-500",
  "mtii-10mg",
  "ghk-cu",
  "glow-blend-bpc-157-tb-500-ghk-cu-10mg-10mg-50mg",
  "pt-141-10mg",
];

const READY_TO_SHIP_SLUGS = [
  "ru58841-5-liquid-dropper",
  "pp405-0-05-liquid-dropper",
  "5-amino-1mq-capsules",
  "rad-140-capsules",
  "tesofensine-research-capsules",
  "deluxe-peptide-case-black-holographic-with-blue-latches",
  "tesamorelin",
  "methylene-blue-500mg-research-liquid",
];

function pickBySlug(products, slugs) {
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  return slugs.map((s) => bySlug.get(s)).filter(Boolean);
}

export const metadata = buildMetadata({
  title: "Peptide Technologies — Research Peptides, Made in the USA",
  absoluteTitle: true,
  description:
    "Shop research peptides, peptide blends, bioregulators, GLP-1 compounds, and lab supplies — every batch verified by a third-party Certificate of Analysis with full lot traceability. US-made, for laboratory research use only.",
  keywords: [
    "research peptides for sale",
    "buy research peptides USA",
    "BPC-157",
    "TB-500",
    "GHK-Cu",
    "GLP-1 research peptides",
    "peptide bioregulators",
    "peptide blends",
    "Certificate of Analysis peptides",
    "Peptide Technologies",
    "Peptech",
  ],
  path: "/",
});

export default async function Home() {
  const [categories, products] = await Promise.all([
    api.categories.list().catch(() => []),
    api.products.list().catch(() => []),
  ]);

  const categoriesWithMeta = HOMEPAGE_CATEGORY_ORDER.map((slug) => categories.find((c) => c.slug === slug))
    .filter(Boolean)
    .map((c) => {
      const inCategory = products.filter((p) => p.category?.slug === c.slug);
      return {
        ...c,
        count: inCategory.length,
        image: inCategory[0]?.primary_image || null,
        description: HOMEPAGE_CATEGORY_BLURBS[c.slug] || c.description,
      };
    });

  const featured = pickBySlug(products, FEATURED_SLUGS);
  const readyToShip = pickBySlug(products, READY_TO_SHIP_SLUGS);

  return (
    <div>
      <HeroSection />
      <PriceMatchSection />
      <CategoryGrid categories={categoriesWithMeta} />
      <SixReasonsSection />

      <section style={{ padding: "72px 0 40px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
            <div>
              <Eyebrow>Shop the catalog</Eyebrow>
              <h2 style={{ fontSize: 32, marginTop: 8 }}>Featured peptides</h2>
              <p style={{ marginTop: 6, color: "var(--ink-3)", fontSize: 14.5, maxWidth: 520 }}>
                Researcher-favorite single peptides and blends — each HPLC-verified with a public
                Certificate of Analysis on every batch.
              </p>
            </div>
            <Link
              href="/shop"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-md)",
                fontSize: 13.5,
                fontWeight: 600,
                color: "var(--ink)",
                textDecoration: "none",
              }}
            >
              View all peptides
              <IconArrowRight size={13} />
            </Link>
          </div>
          <div
            className="pep-product-grid"
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 18,
            }}
          >
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <BuildKitSection />
      <FiveTestsSection />

      <section style={{ padding: "72px 0 40px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
            <div>
              <Eyebrow>Featured this month</Eyebrow>
              <h2 style={{ fontSize: 32, marginTop: 8 }}>Research peptides, ready to ship</h2>
            </div>
            <Link
              href="/shop"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-md)",
                fontSize: 13.5,
                fontWeight: 600,
                color: "var(--ink)",
                textDecoration: "none",
              }}
            >
              View all
              <IconArrowRight size={13} />
            </Link>
          </div>
          <div
            className="pep-product-grid"
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 18,
            }}
          >
            {readyToShip.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <HeroesSection />
      <InsightsSection />
      <NewsletterSection />
    </div>
  );
}
