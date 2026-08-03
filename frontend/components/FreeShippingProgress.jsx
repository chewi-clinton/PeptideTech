import { IconGift, IconLightning, IconTruck } from "@/components/icons";

// Reward tiers copied verbatim from the live site's own cart bundle
// (labels, thresholds, and icon choices), not approximated.
const TIERS = [
  { at: 200, label: "Free Ground shipping", icon: IconTruck },
  { at: 500, label: "Free case + expedited shipping", icon: IconLightning },
  { at: 1000, label: "FREE custom Build-a-Kit case", icon: IconGift },
];

export default function FreeShippingProgress({ subtotal, variant = "card" }) {
  const next = TIERS.find((t) => subtotal < t.at);
  const remaining = next ? next.at - subtotal : 0;
  const progressPct = Math.max(0, Math.min(100, (subtotal / 1000) * 100));

  const wrapperStyle =
    variant === "drawer"
      ? { padding: "14px 20px", background: "var(--bg-tint)", borderBottom: "1px solid var(--line)", flexShrink: 0 }
      : { padding: 12, borderRadius: "var(--radius-md)", border: "1px solid var(--line)" };

  return (
    <div style={wrapperStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 13 }}>
        <IconGift size={15} style={{ color: "var(--brand-2)" }} />
        {next ? (
          <span style={{ color: "var(--ink-2)" }}>
            Add <strong style={{ color: "var(--ink)" }}>${remaining.toFixed(2)}</strong> to unlock{" "}
            <strong style={{ color: "var(--brand-2)" }}>{next.at === 1000 ? next.label : next.label.toLowerCase()}</strong>.
          </span>
        ) : (
          <span style={{ color: "var(--green)", fontWeight: 600 }}>
            All rewards unlocked — including a FREE custom Build-a-Kit case.
          </span>
        )}
      </div>
      <div style={{ position: "relative", height: 8, borderRadius: 999, background: "var(--bg-deep)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${progressPct}%`,
            background: "linear-gradient(90deg, var(--brand), var(--teal))",
            borderRadius: 999,
            transition: "width 320ms",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        {TIERS.map((t) => (
          <span key={t.at} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: "var(--ink-4)" }}>
            <t.icon size={12} />${t.at.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        ))}
      </div>
    </div>
  );
}
