"use client";

import { useState } from "react";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { IconArrowRight, IconCube, IconGift, IconPlus, IconStar, IconTag } from "@/components/icons";

const COLORS = ["#0d9488", "#0f172a", "#e5e7eb", "#2563eb", "#dc2626", "#7f1d1d", "#c2410c", "#64748b"];

export default function BuildKitSection() {
  const [lid, setLid] = useState(0);
  const [body, setBody] = useState(1);
  const [text, setText] = useState("YOUR LAB");

  return (
    <section style={{ background: "var(--bg-tint)", padding: "72px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <Eyebrow>New — Build a Kit</Eyebrow>
          <h2 style={{ fontSize: 34, marginTop: 10 }}>
            Design your own case. <em className="font-serif-italic" style={{ color: "var(--brand-2)" }}>We print it.</em>
          </h2>
          <p style={{ marginTop: 10, color: "var(--ink-3)", fontSize: 15 }}>
            A real two-part storage case, 3D-printed to order in your colors — engrave your lab&apos;s
            name, add a logo or a hand-drawn design, and watch it render live in 3D.
          </p>
        </div>

        <div className="pep-2col" style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center" }}>
          <div className="card" style={{ padding: 24, position: "relative" }}>
            <Link
              href="/build-a-kit"
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-md)",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--ink)",
                textDecoration: "none",
              }}
            >
              <IconPlus size={12} style={{ color: "var(--brand-2)" }} />
              Open case
            </Link>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0 24px" }}>
              <div
                style={{
                  width: 220,
                  height: 60,
                  background: COLORS[lid],
                  borderRadius: "10px 10px 4px 4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  fontFamily: "var(--font-mono-stack)",
                }}
              >
                {text || "YOUR LAB"}
              </div>
              <div
                style={{
                  width: 220,
                  height: 70,
                  background: COLORS[body],
                  borderRadius: "4px 4px 10px 10px",
                  marginTop: -2,
                }}
              />
              <div style={{ width: 240, height: 10, background: "var(--line)", borderRadius: "50%", marginTop: 6, opacity: 0.5 }} />
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <ColorRow label="Lid" colors={COLORS} value={lid} onChange={setLid} />
              <ColorRow label="Body" colors={COLORS} value={body} onChange={setBody} />
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 40, fontSize: 11, fontFamily: "var(--font-mono-stack)", color: "var(--ink-4)" }}>Text</span>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 20))}
                  placeholder="Engrave text"
                  style={{
                    flex: 1,
                    padding: "9px 12px",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius-md)",
                    fontSize: 13,
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "var(--brand-tint)",
                color: "var(--brand-2)",
                fontSize: 12,
                fontWeight: 700,
                padding: "5px 12px",
                borderRadius: 999,
              }}
            >
              <IconGift size={12} />
              FREE with any $1,000+ order
            </span>
            <h3 style={{ fontSize: 24, marginTop: 14 }}>The exact case that ships — rendered live before you buy.</h3>
            <ul style={{ marginTop: 16, display: "grid", gap: 12, listStyle: "none", padding: 0 }}>
              {[
                [IconTag, "Any filament colors in stock — lid and body independently"],
                [IconStar, "Engrave or emboss text, upload a logo, or draw your own design"],
                [IconCube, "Real 3D preview of the actual print files — open it, spin it"],
                [IconGift, "PETG, fine-finish, and heavy-duty print options"],
              ].map(([Icon, label]) => (
                <li key={label} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--ink-2)" }}>
                  <span style={{ color: "var(--brand-2)", flexShrink: 0 }}>
                    <Icon size={14} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <Link href="/build-a-kit" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                Start building
                <IconArrowRight size={16} style={{ color: "#fff" }} />
              </Link>
              <span style={{ fontFamily: "var(--font-mono-stack)", fontSize: 12, color: "var(--ink-3)" }}>
                from $79.99 · ships in days
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ColorRow({ label, colors, value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ width: 40, fontSize: 11, fontFamily: "var(--font-mono-stack)", color: "var(--ink-4)" }}>{label}</span>
      <div style={{ display: "flex", gap: 6 }}>
        {colors.map((c, i) => (
          <button
            key={c}
            aria-label={`${label} color ${c}`}
            onClick={() => onChange(i)}
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: c,
              border: value === i ? "2px solid var(--brand)" : "2px solid transparent",
              boxShadow: value === i ? "0 0 0 2px var(--bg)" : "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}
