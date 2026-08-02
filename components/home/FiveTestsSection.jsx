"use client";

import { useEffect, useState } from "react";
import Eyebrow from "@/components/Eyebrow";
import WaveBackground from "@/components/WaveBackground";
import {
  IconCheck,
  IconConformity,
  IconEndotoxin,
  IconIdentity,
  IconNetContent,
  IconPurity,
  IconShield,
} from "@/components/icons";

const TESTS = [
  {
    icon: IconIdentity,
    title: "Identity",
    body: "ESI-MS confirms the exact compound.",
    linkLabel: "ESI-MS method",
    href: "https://en.wikipedia.org/wiki/Electrospray_ionization",
  },
  {
    icon: IconPurity,
    title: "Purity",
    body: "RP-HPLC ≥ 99% by area.",
    linkLabel: "RP-HPLC method",
    href: "https://en.wikipedia.org/wiki/Reversed-phase_chromatography",
  },
  {
    icon: IconNetContent,
    title: "Net content",
    body: "Mass verified within ±3%.",
    linkLabel: "Gravimetric analysis",
    href: "https://en.wikipedia.org/wiki/Gravimetric_analysis",
  },
  {
    icon: IconConformity,
    title: "Conformity",
    body: "Appearance & reconstitution checked.",
    linkLabel: "Lyophilization & reconstitution",
    href: "https://en.wikipedia.org/wiki/Freeze-drying",
  },
  {
    icon: IconShield,
    title: "Heavy metals",
    body: "ICP-MS, < 10 ppm pass.",
    linkLabel: "ICP-MS method",
    href: "https://en.wikipedia.org/wiki/Inductively_coupled_plasma_mass_spectrometry",
  },
  {
    icon: IconEndotoxin,
    title: "Endotoxins",
    body: "LAL assay, < 0.1 EU/mg.",
    linkLabel: "LAL endotoxin assay",
    href: "https://en.wikipedia.org/wiki/Limulus_amebocyte_lysate",
  },
];

const LABS = ["Janoshik Analytical", "ILS Laboratories", "Ethos Analytical", "Freedom Diagnostics", "Vanguard Laboratory", "MZBiolabs", "ISO 17025"];

export default function FiveTestsSection() {
  const [mau, setMau] = useState(982);

  useEffect(() => {
    const id = setInterval(() => {
      setMau((v) => {
        const next = v + (Math.random() > 0.5 ? 1 : -1) * (1 + Math.floor(Math.random() * 3));
        return Math.min(999, Math.max(970, next));
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--bg-tint)", padding: "72px 0" }}>
      <WaveBackground opacity={0.06} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <Eyebrow>Testing standards</Eyebrow>
          <h2 style={{ fontSize: 34, marginTop: 10 }}>
            Five tests. <em className="font-serif-italic" style={{ color: "var(--brand-2)" }}>One certificate.</em>
          </h2>
          <p style={{ marginTop: 10, color: "var(--ink-3)", fontSize: 15 }}>
            No batch is listed until it clears the full analytical panel at an independent ISO 17025
            laboratory — then we publish the certificate.
          </p>
        </div>

        <div className="pep-2col" style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 24, alignItems: "start" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {TESTS.map((t) => (
              <div key={t.title} className="card" style={{ padding: 20 }}>
                <span
                  style={{
                    width: 34,
                    height: 34,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--brand-tint)",
                    color: "var(--brand-2)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <t.icon size={17} />
                </span>
                <div style={{ marginTop: 10, fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>{t.title}</div>
                <p style={{ margin: "4px 0 8px", fontSize: 13, color: "var(--ink-3)" }}>{t.body}</p>
                <a href={t.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, fontWeight: 600, color: "var(--brand-2)", textDecoration: "none" }}>
                  {t.linkLabel} ↗
                </a>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 32,
                    height: 32,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--brand-tint)",
                    color: "var(--brand-2)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <IconPurity size={16} />
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>RP-HPLC trace</div>
                  <span style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Lot SEM-A2614 · 220 nm</span>
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
                99.4%
              </span>
            </div>

            <div className="card" style={{ marginTop: 14, padding: 14, background: "var(--bg-tint)", border: "none", position: "relative", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "var(--bg)",
                    border: "1px solid var(--line)",
                    borderRadius: 999,
                    padding: "3px 10px",
                    fontSize: 11,
                    fontFamily: "var(--font-mono-stack)",
                    color: "var(--ink-3)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#16a34a",
                      animation: "pep-pulse-dot 1.8s ease-in-out infinite",
                    }}
                  />
                  {mau} mAU · 220 nm
                </span>
              </div>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <svg viewBox="0 0 400 100" width="100%" height="90">
                  <defs>
                    <linearGradient id="fiveTestsFade" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--brand-2)" stopOpacity="0" />
                      <stop offset="12%" stopColor="var(--brand-2)" stopOpacity="1" />
                      <stop offset="88%" stopColor="var(--brand-2)" stopOpacity="1" />
                      <stop offset="100%" stopColor="var(--brand-2)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polyline
                    points="0,90 40,90 70,88 90,84 100,20 110,84 130,88 180,88 200,80 210,64 220,80 260,88 300,86 315,78 325,60 335,78 360,88 400,88"
                    fill="none"
                    stroke="url(#fiveTestsFade)"
                    strokeWidth="1.6"
                  />
                </svg>
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: "35%",
                    background: "linear-gradient(90deg, transparent, rgba(13,148,136,0.16), transparent)",
                    animation: "pep-scan-x 3.2s linear infinite",
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {LABS.map((lab) => (
                <span
                  key={lab}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    border: "1px solid var(--line)",
                    borderRadius: 999,
                    padding: "5px 10px",
                    fontSize: 12,
                    color: "var(--ink-2)",
                  }}
                >
                  <IconCheck size={10} style={{ color: "var(--brand-2)" }} />
                  {lab}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
