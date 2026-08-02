import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import {
  IconCheck,
  IconMail,
  IconPhone,
  IconTikTok,
  IconWarningTriangle,
  IconX,
} from "@/components/icons";
import PaymentBadges from "@/components/PaymentBadges";

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
      { href: "/coa", label: "Verify a batch" },
      { href: "/about", label: "About / Lab" },
      { href: "/about", label: "Quality standards" },
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
      { href: "/account/affiliate", label: "Affiliate dashboard" },
      { href: "/affiliates/access", label: "Affiliate dashboard help" },
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
        <div className="pep-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(5, 1fr)", gap: 32 }}>
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
              <Image src="/logo-pt.png" width={24} height={24} alt="Peptech" />
              <span style={{ fontWeight: 600, fontSize: 17, color: "var(--ink)" }}>
                <span style={{ color: "var(--brand)" }}>PEPTIDE</span>TECH
              </span>
            </Link>
            <p style={{ marginTop: 12, fontSize: 13, color: "var(--ink-3)", lineHeight: 1.6 }}>
              US-made research peptides. Third-party Certificate of Analysis on every batch. Cold-chain
              shipping, always included.
            </p>

            <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <span style={pillBadge}>
                <IconCheck size={11} style={{ color: "var(--brand-2)" }} />
                ISO 17025 verified
              </span>
              <span style={pillBadge}>
                <IconCheck size={11} style={{ color: "var(--brand-2)" }} />
                Made in USA
              </span>
            </div>

            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="tel:+13073033166" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--ink-2)", textDecoration: "none" }}>
                <IconPhone size={14} style={{ color: "var(--ink-4)" }} />
                +1 (307) 303-3166
                <span style={{ fontSize: 11, color: "var(--ink-4)" }}>24/7 AI support line</span>
              </a>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--ink-2)", textDecoration: "none" }}>
                <IconMail size={14} style={{ color: "var(--ink-4)" }} />
                Contact support
              </Link>
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <a href="https://x.com/peptide_tech" target="_blank" rel="noopener noreferrer" style={socialIcon}>
                <IconX size={16} />
              </a>
              <a href="https://www.tiktok.com/@pep_technologies" target="_blank" rel="noopener noreferrer" style={socialIcon}>
                <IconTikTok size={16} />
              </a>
            </div>

            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 11, fontFamily: "var(--font-mono-stack)", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                Mailing / legal
              </div>
              <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "var(--ink-3)" }}>
                1309 Coffeen Ave, Ste 14346
                <br />
                Sheridan, WY 82801
              </p>
            </div>

            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Stay in the loop</div>
              <form style={{ display: "flex", gap: 8, marginTop: 8, maxWidth: 320 }}>
                <input
                  type="email"
                  placeholder="you@email.com"
                  style={{ minWidth: 0, flex: 1, padding: "8px 10px", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", fontSize: 13 }}
                />
                <button type="submit" className="btn-primary" style={{ padding: "8px 14px", fontSize: 13, border: "none", cursor: "pointer" }}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-4)", textTransform: "uppercase", marginBottom: 10 }}>
                {col.title}
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} style={{ fontSize: 13, color: "var(--ink-2)", textDecoration: "none" }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, borderTop: "1px solid var(--line)", paddingTop: 24, display: "flex", gap: 12 }}>
          <span style={{ flexShrink: 0, color: "#d97706" }}>
            <IconWarningTriangle size={18} />
          </span>
          <div>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-3)" }}>
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
        </div>

        <div
          style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 12,
            color: "var(--ink-4)",
          }}
        >
          <span>© {new Date().getFullYear()} Peptide Tech LLC · Sheridan, WY</span>
          <PaymentBadges />
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 20, fontSize: 12.5 }}>
          <Link href="/terms" style={{ color: "var(--ink-3)", textDecoration: "none" }}>
            Terms
          </Link>
          <Link href="/privacy" style={{ color: "var(--ink-3)", textDecoration: "none" }}>
            Privacy
          </Link>
          <Link href="/privacy/do-not-sell" style={{ color: "var(--ink-3)", textDecoration: "none" }}>
            Do Not Sell or Share My Personal Information
          </Link>
        </div>
      </div>
    </footer>
  );
}

const pillBadge = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  background: "var(--bg)",
  border: "1px solid var(--line)",
  borderRadius: 999,
  padding: "4px 10px",
  fontSize: 11.5,
  color: "var(--ink-2)",
};

const socialIcon = {
  width: 32,
  height: 32,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid var(--line)",
  borderRadius: "50%",
  color: "var(--ink-2)",
};
