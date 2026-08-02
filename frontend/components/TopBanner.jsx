import { IconLock } from "@/components/icons";

export default function TopBanner() {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 60 }}>
      <div style={{ background: "var(--brand)", color: "#fff" }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            minHeight: 30,
            padding: "5px 24px",
            textAlign: "center",
          }}
        >
          <IconLock size={12} style={{ flexShrink: 0, opacity: 0.9 }} />
          <span style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.4 }}>
            You are viewing the official PeptideTech site at <strong>peptidetech.is</strong>.
          </span>
        </div>
      </div>
      <div style={{ background: "var(--ink)", color: "#c7d2dd" }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            minHeight: 28,
            padding: "5px 24px",
            textAlign: "center",
          }}
        >
          <IconLock size={11} style={{ flexShrink: 0, opacity: 0.8 }} />
          <span
            style={{
              fontFamily: "var(--font-mono-stack)",
              fontSize: "10.5px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            For laboratory research use only · Not for human or veterinary use · 21+
          </span>
        </div>
      </div>
    </div>
  );
}
