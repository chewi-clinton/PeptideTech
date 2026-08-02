import Link from "next/link";
import { api } from "@/lib/api";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All products" },
      { href: "/c/peptides", label: "Peptides" },
      { href: "/c/glp-peptides", label: "GLP Peptides" },
      { href: "/c/bioregulators", label: "Bioregulators" },
      { href: "/c/peptide-blends", label: "Peptide Blends" },
      { href: "/c/capsules", label: "Capsules" },
      { href: "/c/liquids-aminos-solvents", label: "Liquids & topicals" },
      { href: "/c/cases-accessories", label: "Cases & Accessories" },
    ],
  },
  {
    title: "Trust",
    links: [
      { href: "/coa", label: "COA Library" },
      { href: "/verified-peptides", label: "Verified peptides" },
      { href: "/price-match", label: "Price match" },
      { href: "/about", label: "About / Lab" },
      { href: "/compliance", label: "Quality standards" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of Sale" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/shipping", label: "Shipping Policy" },
      { href: "/returns", label: "Returns & Refunds" },
      { href: "/purity-guarantee-terms", label: "Purity Guarantee" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Earn",
    links: [
      { href: "/affiliates", label: "Affiliate program" },
      { href: "/heroes", label: "Heroes discount" },
      { href: "/membership", label: "Loyalty rewards" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
      { href: "/wholesale", label: "Wholesale & bulk" },
      { href: "/shipping", label: "Shipping & returns" },
      { href: "/order-status", label: "Order status" },
    ],
  },
];

export default async function SiteFooter() {
  let disclaimers = [];
  try {
    disclaimers = await api.disclaimers.list();
  } catch {
    disclaimers = [];
  }
  const sections = disclaimers.filter((d) => !["top-banner", "footer-intro"].includes(d.key));
  const intro = disclaimers.find((d) => d.key === "footer-intro");

  return (
    <footer style={{ background: "var(--bg-tint)", borderTop: "1px solid var(--line)", marginTop: 64 }}>
      <div className="container" style={{ padding: "48px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr repeat(5, 1fr)",
            gap: 32,
          }}
        >
          <div>
            <div style={{ fontWeight: 600, fontSize: 17, color: "var(--ink)" }}>
              <span style={{ color: "var(--brand)" }}>PEPTIDE</span>TECH
            </div>
            <p style={{ marginTop: 12, fontSize: 13, color: "var(--ink-3)" }}>
              US-made research peptides. Third-party Certificate of Analysis on every batch.
              Cold-chain shipping, always included.
            </p>
            <p style={{ marginTop: 16, fontSize: 12, color: "var(--ink-3)" }}>
              1309 Coffeen Ave, Ste 14346
              <br />
              Sheridan, WY 82801
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-4)", textTransform: "uppercase", marginBottom: 10 }}>
                {col.title}
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} style={{ fontSize: 13, color: "var(--ink-2)", textDecoration: "none" }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-3)" }}>
            For laboratory research use only · Not for human, veterinary, or diagnostic use
          </p>
          {intro && (
            <div
              style={{ marginTop: 10, fontSize: 12, lineHeight: 1.6, color: "var(--ink-3)" }}
              dangerouslySetInnerHTML={{ __html: intro.body_html }}
            />
          )}
          <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
            {sections.map((s) => (
              <div
                key={s.key}
                style={{ fontSize: 12, lineHeight: 1.6, color: "var(--ink-3)" }}
                dangerouslySetInnerHTML={{ __html: s.body_html }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 12,
            color: "var(--ink-4)",
          }}
        >
          <span>© {new Date().getFullYear()} Peptide Tech LLC · Sheridan, WY</span>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/terms" style={{ textDecoration: "none", color: "var(--ink-4)" }}>
              Terms
            </Link>
            <Link href="/privacy" style={{ textDecoration: "none", color: "var(--ink-4)" }}>
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
