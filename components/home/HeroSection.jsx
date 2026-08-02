import Link from "next/link";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import WaveBackground from "@/components/WaveBackground";
import QrCodePattern from "@/components/QrCodePattern";
import { IconArrowRight, IconCheck, IconClockSimple, IconShield } from "@/components/icons";

export default function HeroSection() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--bg)", borderBottom: "1px solid var(--line)" }}>
      <WaveBackground />
      <div className="container" style={{ position: "relative", padding: "56px 24px" }}>
        <div className="pep-home-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <Eyebrow>US-made research peptides</Eyebrow>
            <h1 style={{ fontSize: 52, lineHeight: 1.06, margin: 0 }}>
              Peptides for sale,{" "}
              <em className="font-serif-italic" style={{ color: "var(--brand-2)" }}>
                verified to the molecule.
              </em>
            </h1>
            <p style={{ margin: 0, maxWidth: 520, fontSize: 16, color: "var(--ink-3)", lineHeight: 1.6 }}>
              HPLC-verified &ge;99% purity with a third-party Certificate of Analysis on every batch,
              cold-chain shipping, and full transparency — from synthesis to your bench.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/shop" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                Shop catalog
                <IconArrowRight size={16} style={{ color: "#fff" }} />
              </Link>
              <Link
                href="/coa"
                style={{
                  padding: "12px 20px",
                  border: "1px solid var(--brand)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--brand-2)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View COA library
              </Link>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 4 }}>
              <a
                href="https://www.finnrick.com/vendors/peptide-technologies"
                target="_blank"
                rel="noopener noreferrer"
                style={trustPillStyle}
              >
                <Image src="/finnrick-logo.png" width={60} height={16} alt="Finnrick" style={{ objectFit: "contain", height: 14, width: "auto" }} />
                Verified · A-rated vendor
                <IconArrowRight size={11} style={{ opacity: 0.6 }} />
              </a>
              <a href="https://americanpeptide.co/" target="_blank" rel="noopener noreferrer" style={trustPillStyle}>
                <Image src="/apa-logo.png" width={80} height={20} alt="American Peptide Association" style={{ objectFit: "contain", height: 16, width: "auto" }} />
              </a>
              <Link href="/about" style={trustPillStyle}>
                <span
                  style={{
                    width: 17,
                    height: 17,
                    flexShrink: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--brand)",
                    color: "#fff",
                    borderRadius: "50%",
                  }}
                >
                  <IconClockSimple size={11} />
                </span>
                2+ years in business
                <IconArrowRight size={11} style={{ opacity: 0.6 }} />
              </Link>
              <a href="https://peptidebase.io/research-vendors/peptidetech" target="_blank" rel="noopener noreferrer" style={trustPillStyle}>
                <IconShield size={13} style={{ color: "var(--brand-2)" }} />
                A Rated on Peptidebase.io
                <IconArrowRight size={11} style={{ opacity: 0.6 }} />
              </a>
            </div>
          </div>

          <div className="card" style={{ padding: 20, background: "var(--bg)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--brand-tint)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--brand-2)",
                  }}
                >
                  <IconCheck size={16} />
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>Certificate of Analysis</div>
                  <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>BPC-157 · Lot BPC-A2614</span>
                </div>
              </div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  background: "var(--brand-tint)",
                  color: "var(--brand-2)",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                <IconCheck size={10} />
                Verified
              </span>
            </div>
            <div style={{ marginTop: 6 }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", color: "var(--ink-4)", textTransform: "uppercase" }}>
                Representative example
              </span>
            </div>

            <div className="card" style={{ marginTop: 14, padding: 16, background: "var(--bg-tint)", border: "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "var(--font-mono-stack)", color: "var(--ink-3)" }}>
                <span>RP-HPLC · 220 nm</span>
                <span>Lot BPC-A2614</span>
              </div>
              <svg viewBox="0 0 400 90" width="100%" height="80" style={{ marginTop: 8 }}>
                <defs>
                  <linearGradient id="heroTraceFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polyline
                  points="0,80 60,80 72,76 84,68 96,74 108,80 118,80 122,44 126,14 130,44 134,80 144,80 220,80 235,77 245,68 255,77 270,80 300,80 312,76 320,80 350,80 358,77 366,80 400,80 400,90 0,90"
                  fill="url(#heroTraceFill)"
                  stroke="none"
                />
                <polyline
                  points="0,80 60,80 72,76 84,68 96,74 108,80 118,80 122,44 126,14 130,44 134,80 144,80 220,80 235,77 245,68 255,77 270,80 300,80 312,76 320,80 350,80 358,77 366,80 400,80"
                  fill="none"
                  stroke="var(--brand-2)"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[
                ["99.4%", "Purity"],
                ["Confirmed", "Identity"],
                ["<0.1 EU/mg", "Endotoxin"],
              ].map(([value, label]) => (
                <div key={label} className="card" style={{ padding: "10px 8px", textAlign: "center" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{value}</div>
                  <span style={{ fontSize: 11, color: "var(--ink-4)" }}>{label}</span>
                </div>
              ))}
            </div>

            <div
              className="card"
              style={{
                marginTop: 14,
                padding: 14,
                background: "var(--brand-tint)",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 6, flexShrink: 0, overflow: "hidden", border: "1px solid var(--line)" }}>
                <QrCodePattern size={48} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--ink)" }}>Scan the vial QR</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Pulls this exact lot&apos;s live COA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const trustPillStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 12px",
  border: "1px solid var(--line)",
  borderRadius: "var(--radius-md)",
  fontSize: 12.5,
  fontWeight: 600,
  color: "var(--ink-2)",
  textDecoration: "none",
};
