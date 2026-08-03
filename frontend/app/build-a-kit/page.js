"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartProvider";
import Eyebrow from "@/components/Eyebrow";
import { IconArrowRight, IconGift, IconPlus } from "@/components/icons";

const KitCase3D = dynamic(() => import("@/components/KitCase3D"), { ssr: false });

const FILAMENT_COLORS = [
  "#0f172a", "#f1f5f9", "#0d9488", "#2563eb", "#1e3a8a", "#ef4444", "#dc2626", "#7f1d1d",
  "#450a0a", "#64748b", "#f59e0b", "#f97316", "#9a3412", "#8d7346", "#14532d", "#7c3aed",
];

const LAB_STYLES = [
  { key: "lab-classic", label: "Lab Classic", desc: "Teal lid on midnight black", lid: "#0d9488", body: "#0f172a" },
  { key: "stealth", label: "Stealth", desc: "All black, engraved text", lid: "#0f172a", body: "#0f172a", tag: "RESEARCH" },
  { key: "arctic", label: "Arctic", desc: "Clean white on slate gray", lid: "#f1f5f9", body: "#64748b" },
  { key: "hi-vis", label: "Hi-Vis", desc: "Amber lid — easy to spot in the freezer", lid: "#f59e0b", body: "#0f172a" },
];

const GAMEDAY_COLORWAYS = [
  { key: "college-station", label: "College Station", desc: "Maroon & white — Aggieland", lid: "#7f1d1d", body: "#f1f5f9", tag: "TAMU" },
  { key: "austin", label: "Austin", desc: "Burnt orange & white — Forty Acres", lid: "#f97316", body: "#f1f5f9", tag: "UT" },
  { key: "tuscaloosa", label: "Tuscaloosa", desc: "Crimson & white — Roll Tide country", lid: "#dc2626", body: "#f1f5f9", tag: "BAMA" },
  { key: "lubbock", label: "Lubbock", desc: "Scarlet & black — West Texas", lid: "#dc2626", body: "#0f172a", tag: "TTU" },
  { key: "san-marcos", label: "San Marcos", desc: "Maroon & gold — the hill country", lid: "#7f1d1d", body: "#8d7346", tag: "TXST" },
  { key: "huntsville", label: "Huntsville", desc: "Orange & white — Bearkat country", lid: "#f97316", body: "#f1f5f9", tag: "SHSU" },
];

const MATERIALS = [
  { key: "pla", label: "PLA", pct: 0, desc: "Matte finish, crisp detail — our standard" },
  { key: "petg", label: "PETG", pct: 10, desc: "Impact- and heat-resistant, slight gloss" },
];

const FINISHES = [
  { key: "standard", label: "Standard finish", pct: 0, desc: "0.20 mm layers — our default look" },
  { key: "fine", label: "Fine finish", pct: 15, desc: "0.12 mm layers — smoother surfaces, longer print" },
];

const STRENGTHS = [
  { key: "standard", label: "Standard", pct: 0, desc: "15% infill, 3 walls — everyday bench use" },
  { key: "heavy", label: "Heavy-duty", pct: 10, desc: "30% infill, 4 walls — field/transport kits" },
];

const PLACEMENTS = ["Lid — top center", "Case — front"];
const PERSONALIZE_METHODS = [
  { key: "none", label: "None", flat: 0 },
  { key: "text", label: "Text", flat: 5 },
  { key: "logo", label: "Logo", flat: 15 },
  { key: "draw", label: "Draw", flat: 15 },
];

const BASE_PRICE = 39.99;

function leaveLabDate() {
  const d = new Date();
  d.setDate(d.getDate() + 8); // ~48 business hours print + standard fulfillment
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

export default function BuildAKitPage() {
  const router = useRouter();
  const { addItem } = useCart();

  const [lidColor, setLidColor] = useState(FILAMENT_COLORS[2]);
  const [bodyColor, setBodyColor] = useState(FILAMENT_COLORS[0]);
  const [open, setOpen] = useState(false);
  const [material, setMaterial] = useState("pla");
  const [finish, setFinish] = useState("standard");
  const [strength, setStrength] = useState("standard");
  const [placement, setPlacement] = useState(PLACEMENTS[0]);
  const [method, setMethod] = useState("none");
  const [ackBuild, setAckBuild] = useState(false);
  const [ackIp, setAckIp] = useState(false);

  const price = useMemo(() => {
    const pctTotal =
      MATERIALS.find((m) => m.key === material).pct +
      FINISHES.find((f) => f.key === finish).pct +
      STRENGTHS.find((s) => s.key === strength).pct;
    const flat = PERSONALIZE_METHODS.find((m) => m.key === method).flat;
    return BASE_PRICE * (1 + pctTotal / 100) + flat;
  }, [material, finish, strength, method]);

  function applyPreset(preset) {
    setLidColor(preset.lid);
    setBodyColor(preset.body);
  }

  function handleAddToCart() {
    const materialLabel = MATERIALS.find((m) => m.key === material).label;
    const finishLabel = FINISHES.find((f) => f.key === finish).label;
    const strengthLabel = STRENGTHS.find((s) => s.key === strength).label;
    const methodLabel = PERSONALIZE_METHODS.find((m) => m.key === method).label;
    addItem({
      variantId: `custom-kit-${Date.now()}`,
      productTitle: "Deluxe Vial Case — Custom Build",
      variantLabel: `${materialLabel} · ${finishLabel} · ${strengthLabel}${method !== "none" ? ` · ${methodLabel} (${placement})` : ""}`,
      price: price.toFixed(2),
      quantity: 1,
      openDrawer: true,
    });
  }

  const canSubmit = ackBuild && ackIp;

  return (
    <div className="container" style={{ padding: "32px 24px 64px" }}>
      <Eyebrow>Custom 3D-printed lab hardware</Eyebrow>
      <h1 style={{ fontSize: 34, marginTop: 8 }}>Build a Kit</h1>
      <p style={{ marginTop: 10, maxWidth: 680, fontSize: 14.5, color: "var(--ink-3)", lineHeight: 1.65 }}>
        Configure a made-to-order vial storage case: choose filament colors, engrave or emboss
        text, and add your lab&apos;s logo — then spin it around and open it up in the live 3D
        preview. Custom builds are made to order and add +48 business hours of print time on top
        of current fulfillment and shipping lead times.
      </p>

      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginTop: 16,
          background: "var(--brand-tint)",
          color: "var(--brand-2)",
          fontSize: 13,
          fontWeight: 700,
          padding: "8px 16px",
          borderRadius: 999,
        }}
      >
        <IconGift size={14} />
        FREE with any $1,000+ order — your custom case is on us at checkout.
      </span>

      <div className="pep-kit-grid" style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, alignItems: "start" }}>
        {/* Left: 3D preview + price */}
        <div>
          <div className="card" style={{ padding: 20, position: "relative" }}>
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

            <KitCase3D lidColor={lidColor} bodyColor={bodyColor} open={open} height={420} />

            <p style={{ marginTop: 10, fontSize: 12, color: "var(--ink-4)", textAlign: "center" }}>
              On-screen colors and finish are approximate — the final part is 3D-printed and
              filament batches vary.
            </p>
          </div>

          <div className="card" style={{ marginTop: 16, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontSize: 13, color: "var(--ink-3)" }}>Server-confirmed price</div>
              <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--ink-2)" }}>
                <strong style={{ color: "var(--ink)" }}>Estimated to leave the lab by {leaveLabDate()}.</strong>{" "}
                Made to order: printing adds +48 business hours on top of standard fulfillment.
              </p>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "var(--ink)", flexShrink: 0 }}>${price.toFixed(2)}</div>
          </div>
        </div>

        {/* Right: steps */}
        <div style={{ display: "grid", gap: 16 }}>
          <StepCard n={1} title="Case">
            <div className="card" style={{ padding: 16, background: "var(--brand-tint)", border: "1px solid var(--brand)" }}>
              <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--ink)" }}>Deluxe Vial Case</div>
              <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55 }}>
                Our real two-part deluxe storage case — hinged lid, latching front, molded bays for
                9 vials plus accessory and supply compartments. Printed to order in your colors,
                with optional engraved or embossed text and logo on the lid.
              </p>
              <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700, color: "var(--brand-2)" }}>from ${BASE_PRICE.toFixed(2)}</div>
            </div>
          </StepCard>

          <StepCard n={2} title="Style (optional)">
            <SectionLabel>Lab styles</SectionLabel>
            <PresetGrid presets={LAB_STYLES} lidColor={lidColor} bodyColor={bodyColor} onSelect={applyPreset} />
            <SectionLabel style={{ marginTop: 14 }}>Game-day colorways</SectionLabel>
            <PresetGrid presets={GAMEDAY_COLORWAYS} lidColor={lidColor} bodyColor={bodyColor} onSelect={applyPreset} />
            <p style={{ marginTop: 12, fontSize: 12, color: "var(--ink-4)", lineHeight: 1.55 }}>
              Collegiate presets are fan colorways with plain text initials — not official
              university logos or licensed merchandise. Want your organization&apos;s actual
              artwork? Upload it as a logo (you must own or have rights to it).
            </p>
          </StepCard>

          <StepCard n={3} title="Filament colors">
            <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--ink-3)" }}>
              Colors shown are our standard palette — subject to filament availability;
              we&apos;ll match the closest in-stock spool.
            </p>
            <SectionLabel>Lid (top)</SectionLabel>
            <ColorSwatchRow colors={FILAMENT_COLORS} value={lidColor} onChange={setLidColor} />
            <SectionLabel style={{ marginTop: 14 }}>Body (bottom)</SectionLabel>
            <ColorSwatchRow colors={FILAMENT_COLORS} value={bodyColor} onChange={setBodyColor} />
          </StepCard>

          <StepCard n={4} title="Material & print quality">
            <SectionLabel>Material</SectionLabel>
            <OptionGrid options={MATERIALS} value={material} onChange={setMaterial} />
            <SectionLabel style={{ marginTop: 14 }}>Surface finish</SectionLabel>
            <OptionGrid options={FINISHES} value={finish} onChange={setFinish} />
            <SectionLabel style={{ marginTop: 14 }}>Strength</SectionLabel>
            <OptionGrid options={STRENGTHS} value={strength} onChange={setStrength} />
          </StepCard>

          <StepCard n={5} title="Personalize (optional)">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {PLACEMENTS.map((p) => (
                <ToggleButton key={p} active={placement === p} onClick={() => setPlacement(p)}>
                  {p}
                </ToggleButton>
              ))}
            </div>
            <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }} className="pep-kit-personalize-grid">
              {PERSONALIZE_METHODS.map((m) => (
                <ToggleButton key={m.key} active={method === m.key} onClick={() => setMethod(m.key)}>
                  {m.label}
                  {m.flat > 0 && ` (+$${m.flat})`}
                </ToggleButton>
              ))}
            </div>
          </StepCard>

          <StepCard n={6} title="Review & add to cart">
            <label style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, cursor: "pointer" }}>
              <input type="checkbox" checked={ackBuild} onChange={(e) => setAckBuild(e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
              I understand this custom build is made to order, adds +48 business hours of print
              time, and is non-cancellable / all-sales-final once submitted.
            </label>
            <label style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, cursor: "pointer", marginTop: 12 }}>
              <input type="checkbox" checked={ackIp} onChange={(e) => setAckIp(e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
              I confirm that I own, or have the legal right to use, all artwork and text in this
              design, and I agree to indemnify Peptide Technologies against any third-party
              intellectual-property claim arising from printing it.
            </label>

            <button
              onClick={handleAddToCart}
              disabled={!canSubmit}
              className="btn-primary"
              style={{
                marginTop: 16,
                width: "100%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                border: "none",
                cursor: canSubmit ? "pointer" : "not-allowed",
                opacity: canSubmit ? 1 : 0.5,
                padding: "13px",
              }}
            >
              Add to cart — ${price.toFixed(2)}
              <IconArrowRight size={15} style={{ color: "#fff" }} />
            </button>
            <p style={{ marginTop: 10, fontSize: 11.5, color: "var(--ink-4)", textAlign: "center" }}>
              Custom builds are non-cancellable and all-sales-final once submitted. On-screen
              colors are approximate.
            </p>
          </StepCard>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pep-kit-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .pep-kit-personalize-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function StepCard({ n, title, children }) {
  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span
          style={{
            width: 22,
            height: 22,
            flexShrink: 0,
            borderRadius: "50%",
            background: "var(--brand-tint)",
            color: "var(--brand-2)",
            fontSize: 12,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {n}
        </span>
        <h2 style={{ fontSize: 15.5, margin: 0, color: "var(--ink)" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SectionLabel({ children, style }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 8, ...style }}>
      {children}
    </div>
  );
}

function PresetGrid({ presets, lidColor, bodyColor, onSelect }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }} className="pep-kit-preset-grid">
      {presets.map((p) => {
        const active = lidColor === p.lid && bodyColor === p.body;
        return (
          <button
            key={p.key}
            onClick={() => onSelect(p)}
            style={{
              textAlign: "left",
              padding: 12,
              borderRadius: "var(--radius-md)",
              border: `1px solid ${active ? "var(--brand)" : "var(--line)"}`,
              background: active ? "var(--brand-tint)" : "var(--bg)",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 4 }}>
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: p.lid, border: "1px solid var(--line)" }} />
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: p.body, border: "1px solid var(--line)" }} />
              </div>
              {p.tag && (
                <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink-4)", fontFamily: "var(--font-mono-stack)" }}>
                  &ldquo;{p.tag}&rdquo;
                </span>
              )}
            </div>
            <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{p.label}</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.4 }}>{p.desc}</div>
          </button>
        );
      })}
      <style>{`
        @media (max-width: 480px) {
          .pep-kit-preset-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function ColorSwatchRow({ colors, value, onChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {colors.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          aria-label={c}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: c,
            cursor: "pointer",
            border: value === c ? "2px solid var(--brand)" : "2px solid var(--line)",
            boxShadow: value === c ? "0 0 0 2px var(--bg), 0 0 0 3px var(--brand)" : "none",
          }}
        />
      ))}
    </div>
  );
}

function OptionGrid({ options, value, onChange }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }} className="pep-kit-option-grid">
      {options.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            style={{
              textAlign: "left",
              padding: 12,
              borderRadius: "var(--radius-md)",
              border: `1px solid ${active ? "var(--brand)" : "var(--line)"}`,
              background: active ? "var(--brand-tint)" : "var(--bg)",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>
              {o.label}
              {o.pct > 0 && <span style={{ color: "var(--brand-2)" }}> +{o.pct}%</span>}
            </div>
            <div style={{ marginTop: 3, fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.4 }}>{o.desc}</div>
          </button>
        );
      })}
      <style>{`
        @media (max-width: 480px) {
          .pep-kit-option-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function ToggleButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: "var(--radius-md)",
        border: `1px solid ${active ? "var(--brand)" : "var(--line)"}`,
        background: active ? "var(--brand-tint)" : "var(--bg)",
        color: active ? "var(--brand-2)" : "var(--ink-2)",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
