import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import {
  IconArrowRight,
  IconCheck,
  IconChevronDown,
  IconClockSimple,
  IconFlag,
  IconGlobe,
  IconLightning,
  IconTag,
} from "@/components/icons";

const BULLETS = [
  {
    icon: IconGlobe,
    title: "We watch the market daily",
    body: "Our system tracks the live, published prices of major vendors who advertise USA-made peptides.",
  },
  {
    icon: IconLightning,
    title: "We auto-adjust to undercut",
    body: "Prices recalculate every single day to come in under those verified USA-made competitors — automatically.",
  },
  {
    icon: IconFlag,
    title: "USA-made, proven",
    body: "We only compare against vendors who can prove end lyophilization and finishing in the USA.",
  },
];

const COMPARISON_ROWS = [
  { name: "USA-made vendor A", price: "45.00" },
  { name: "USA-made vendor B", price: "39.00" },
  { name: "USA-made vendor C", price: "34.50" },
];

const TERMS = [
  "Comparison applies to equivalent products, strengths, and net content only, against vendors who can prove end lyophilization and finishing in the USA.",
  "Not applicable to competitor sales, coupon codes, or bulk discounts — these change too often to track reliably.",
  "Prices are aggregated from public sources and shown for comparison only. Peptide Tech is not affiliated with, and does not endorse, the vendors listed.",
];

export default function PriceMatchSection() {
  return (
    <section style={{ padding: "72px 0" }}>
      <div className="container">
        <div className="pep-2col" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Eyebrow>Price match guarantee</Eyebrow>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  background: "var(--brand-tint)",
                  color: "var(--brand-2)",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 9px",
                  borderRadius: 999,
                }}
              >
                <IconLightning size={11} />
                Live · updated daily
              </span>
            </div>
            <h2 className="pep-pm-h2" style={{ fontSize: 34, marginTop: 10 }}>
              Always priced to <em className="font-serif-italic" style={{ color: "var(--brand-2)" }}>undercut.</em>
            </h2>
            <div style={{ marginTop: 6, fontSize: 14, color: "var(--ink-3)" }}>
              Auto-checked every day against USA-made competitors
            </div>
            <p style={{ marginTop: 14, fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.7 }}>
              We track our largest USA-made competitors and automatically adjust our prices to come in
              under them — every single day. And on <strong>every product page</strong> you can see their
              live prices side-by-side with ours, so you never have to take our word for it.{" "}
              <Link href="/purity-guarantee-terms" style={{ color: "var(--brand-2)" }}>
                Terms apply.
              </Link>
            </p>

            <div style={{ marginTop: 20, display: "grid", gap: 16 }}>
              {BULLETS.map((b) => (
                <div key={b.title} style={{ display: "flex", gap: 12 }}>
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      flexShrink: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--brand-tint)",
                      color: "var(--brand-2)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    <b.icon size={16} />
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{b.title}</div>
                    <p style={{ margin: 0, marginTop: 2, fontSize: 13.5, color: "var(--ink-3)" }}>{b.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <Link href="/pricelist" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                See every price
                <IconArrowRight size={16} style={{ color: "#fff" }} />
              </Link>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ink-3)" }}>
                <IconTag size={14} />
                Live competitor prices on every product page
              </span>
            </div>
          </div>

          <div>
            <div className="card" style={{ padding: 18, background: "var(--brand-tint)", border: "1px solid var(--brand)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--ink-3)" }}>
                <IconTag size={14} style={{ color: "var(--brand-2)" }} />
                <span style={{ fontWeight: 700, color: "var(--ink)" }}>Live price comparison</span>
                <span>· BPC-157 · 5 mg</span>
                <span
                  style={{
                    marginLeft: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    background: "var(--bg)",
                    color: "var(--brand-2)",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 999,
                  }}
                >
                  <IconCheck size={10} />
                  Lowest price
                </span>
              </div>

              <div
                className="card"
                style={{
                  marginTop: 12,
                  padding: 14,
                  background: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--brand)",
                      color: "#fff",
                      borderRadius: 6,
                    }}
                  >
                    <IconCheck size={12} />
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--ink)" }}>Peptide Tech</div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>In stock · ships fast · COA on file</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: 17, color: "var(--ink)" }}>$29.99</div>
                  <div style={{ fontSize: 11, color: "var(--brand-2)", fontWeight: 600 }}>Save $4.51</div>
                </div>
              </div>

              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.name}
                  style={{
                    padding: "12px 4px",
                    borderBottom: "1px solid var(--line-2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: 13.5,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <IconChevronDown size={12} style={{ color: "var(--ink-4)" }} />
                    <span style={{ color: "var(--ink-2)" }}>{row.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontWeight: 600, color: "var(--ink)" }}>${row.price}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 12, color: "var(--ink-3)" }}>
                      View <IconArrowRight size={10} />
                    </span>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--ink-4)" }}>
                <IconClockSimple size={12} style={{ flexShrink: 0 }} />
                Re-checked daily — this exact comparison appears on every product page.
              </div>
            </div>

            <Link
              href="/pricelist"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                justifyContent: "center",
                marginTop: 16,
                fontSize: 13.5,
                fontWeight: 600,
                color: "var(--brand-2)",
                textDecoration: "none",
              }}
            >
              Compare prices across the whole catalog
              <IconArrowRight size={13} />
            </Link>
          </div>
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--line)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {TERMS.map((t) => (
            <div key={t} style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--ink-4)" }}>
              <span style={{ flexShrink: 0 }}>—</span>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
