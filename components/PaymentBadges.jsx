import { IconLock } from "@/components/icons";

const badge = {
  height: 26,
  padding: "0 8px",
  borderRadius: 5,
  border: "1px solid var(--line-2)",
  background: "#fff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 10,
  fontWeight: 800,
  letterSpacing: "0.02em",
};

export default function PaymentBadges() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <span style={{ ...badge, color: "#1a1f71" }}>VISA</span>
      <span style={{ ...badge, gap: 2 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#eb001b", marginRight: -4 }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f79e1b", opacity: 0.85 }} />
      </span>
      <span style={{ ...badge, color: "#006fcf", fontSize: 8.5 }}>AMEX</span>
      <span style={{ ...badge, color: "#ff6000", fontSize: 8.5 }}>DISCOVER</span>
      <span style={{ ...badge, color: "var(--ink)" }}>&#63743; Pay</span>
      <span style={{ ...badge, color: "var(--ink)" }}>G Pay</span>
      <span style={{ ...badge, color: "#f7931a" }}>&#8383;</span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          height: 26,
          padding: "0 10px",
          borderRadius: 999,
          border: "1px solid var(--line-2)",
          background: "var(--bg)",
          fontFamily: "var(--font-mono-stack)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.04em",
          color: "var(--ink-3)",
          whiteSpace: "nowrap",
        }}
      >
        <IconLock size={12} style={{ color: "var(--brand-2)" }} />
        Secure checkout · SSL
      </span>
    </div>
  );
}
