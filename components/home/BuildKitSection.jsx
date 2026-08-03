"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Eyebrow from "@/components/Eyebrow";
import { IconArrowRight, IconCube, IconGift, IconPlus, IconStar, IconTag } from "@/components/icons";

const KitCase3D = dynamic(() => import("@/components/KitCase3D"), { ssr: false });

const COLORS = ["#0d9488", "#0f172a", "#e5e7eb", "#2563eb", "#dc2626", "#7f1d1d", "#c2410c", "#64748b"];

export default function BuildKitSection() {
  const [lid, setLid] = useState(0);
  const [body, setBody] = useState(1);
  const [open, setOpen] = useState(false);

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
            <button
              onClick={() => setOpen((v) => !v)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-md)",
                background: "var(--bg)",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--ink)",
                cursor: "pointer",
              }}
            >
              <IconPlus size={12} style={{ color: "var(--brand-2)" }} />
              {open ? "Close case" : "Open case"}
            </button>

            <KitCase3D lidColor={COLORS[lid]} bodyColor={COLORS[body]} open={open} height={260} autoRotate interactive={false} />

            <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
              <ColorRow label="Lid" colors={COLORS} value={lid} onChange={setLid} />
              <ColorRow label="Body" colors={COLORS} value={body} onChange={setBody} />
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
                <li key={label} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--ink-2)" }}>
                  <span
                    style={{
                      width: 30,
                      height: 30,
                      flexShrink: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--brand-tint)",
                      color: "var(--brand-2)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
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
              <span
                style={{
                  fontFamily: "var(--font-mono-stack)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--brand-2)",
                }}
              >
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
