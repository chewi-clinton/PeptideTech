"use client";

import { useState } from "react";
import Eyebrow from "@/components/Eyebrow";
import {
  IconCheck,
  IconEye,
  IconFlag,
  IconFlask,
  IconGrid,
  IconHeadphones,
  IconMedal,
} from "@/components/icons";

const REASONS = [
  {
    icon: IconEye,
    title: "Transparent",
    subtitle: "Every claim has a receipt.",
    stat: "100%",
    statCaption: "batches with a public COA",
    body: "In business 2+ years on one principle: we don't make a claim we can't back with a document. Every batch's certificate is public.",
    pills: ["2+ years in business", "Public COA per batch", "Lot-traceable QR"],
  },
  {
    icon: IconHeadphones,
    title: "24/7 support",
    subtitle: "Live chat & email, any hour.",
    stat: "24/7",
    statCaption: "always reachable",
    body: "Questions about handling, storage, or a specific lot's COA get answered around the clock — not just business hours.",
    pills: ["Live chat", "Email support", "24/7 coverage"],
  },
  {
    icon: IconFlag,
    title: "USA made",
    subtitle: "Made on US soil.",
    stat: "100%",
    statCaption: "domestic lyophilization",
    body: "Every batch is finished and lyophilized on US soil — not just labeled and repackaged from an unverified overseas source.",
    pills: ["Domestic finishing", "US soil", "No relabeling"],
  },
  {
    icon: IconGrid,
    title: "Largest catalog",
    subtitle: "From single peptides to blends.",
    stat: "160+",
    statCaption: "SKUs across every category",
    body: "Single peptides, bioregulators, blends, capsules, and liquids — one catalog covering the research compounds labs actually order.",
    pills: ["Single peptides", "Blends", "Capsules & liquids"],
  },
  {
    icon: IconFlask,
    title: "5× testing",
    subtitle: "Five tests, every batch.",
    stat: "5×",
    statCaption: "assays per batch",
    body: "Identity, purity, net content, conformity, and endotoxin — no batch is listed until it clears the full analytical panel.",
    pills: ["Identity", "Purity", "Endotoxin"],
  },
  {
    icon: IconMedal,
    title: "Purity guarantee",
    subtitle: "Put it to the test.",
    stat: "97%",
    statCaption: "minimum guaranteed purity",
    body: "If a batch tests below our published purity guarantee, we back it — see the Purity Guarantee terms for specifics.",
    pills: ["Guaranteed minimum", "Independent lab", "Public results"],
  },
];

export default function SixReasonsSection() {
  const [active, setActive] = useState(0);
  const reason = REASONS[active];

  return (
    <section style={{ padding: "72px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <Eyebrow>Why Peptide Tech</Eyebrow>
          <h2 style={{ fontSize: 34, marginTop: 10 }}>
            Six reasons researchers <em className="font-serif-italic" style={{ color: "var(--brand-2)" }}>choose us.</em>
          </h2>
          <p style={{ marginTop: 10, color: "var(--ink-3)", fontSize: 15 }}>
            Every reason below comes with a receipt — a number, a document, or a guarantee you can hold
            us to.
          </p>
        </div>

        <div className="pep-2col" style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, alignItems: "stretch" }}>
          <div className="card" style={{ padding: 32 }}>
            <div
              style={{
                width: 44,
                height: 44,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--brand)",
                color: "#fff",
                borderRadius: "var(--radius-md)",
              }}
            >
              <reason.icon size={22} />
            </div>
            <div style={{ marginTop: 14 }}>
              <Eyebrow>Why Peptide Tech</Eyebrow>
              <div style={{ fontWeight: 700, fontSize: 18, color: "var(--ink)", marginTop: 2 }}>{reason.title}</div>
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 56, fontWeight: 800, color: "var(--brand-2)", lineHeight: 1 }}>{reason.stat}</div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                {reason.statCaption}
              </span>
            </div>

            <h3 style={{ fontSize: 24, marginTop: 20 }}>
              {reason.title}, <em className="font-serif-italic" style={{ color: "var(--brand-2)" }}>{reason.subtitle}</em>
            </h3>
            <p style={{ marginTop: 10, fontSize: 14.5, color: "var(--ink-3)", lineHeight: 1.7 }}>{reason.body}</p>

            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {reason.pills.map((pill) => (
                <span
                  key={pill}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    background: "var(--brand-tint)",
                    color: "var(--brand-2)",
                    fontSize: 12.5,
                    fontWeight: 600,
                    padding: "6px 12px",
                    borderRadius: 999,
                  }}
                >
                  <IconCheck size={11} />
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {REASONS.map((r, i) => (
              <button
                key={r.title}
                onClick={() => setActive(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: 16,
                  background: i === active ? "var(--bg)" : "transparent",
                  border: `1px solid ${i === active ? "var(--brand)" : "var(--line)"}`,
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
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
                  <r.icon size={16} />
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{r.title}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{r.subtitle}</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-3)" }}>{r.stat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
