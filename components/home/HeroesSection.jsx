import Link from "next/link";
import WaveBackground from "@/components/WaveBackground";
import {
  IconAccount,
  IconArrowRight,
  IconFlag,
  IconIdentity,
  IconLock,
  IconNetContent,
  IconShield,
  IconTag,
} from "@/components/icons";

const GROUPS = [
  ["First responders", IconShield],
  ["Law enforcement", IconLock],
  ["Military & veterans", IconShield],
  ["Teachers", IconIdentity],
  ["Nurses & healthcare", IconNetContent],
];

const STEPS = [
  [IconAccount, "Choose your group", "Select your eligible profession."],
  [IconLock, "Verify in seconds", "Secure check via our partner."],
  [IconTag, "Save 10%, always", "Auto-applied to every order."],
];

export default function HeroesSection() {
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "72px 0" }}>
      <WaveBackground opacity={0.05} />
      <div className="container" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 48, alignItems: "center" }}>
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
            <IconShield size={12} />
            Extra 10% off
          </span>
          <h2 style={{ fontSize: 30, marginTop: 14 }}>A thank-you to those who serve</h2>
          <p style={{ marginTop: 12, fontSize: 15, color: "var(--ink-2)", lineHeight: 1.7 }}>
            First responders, law enforcement, active &amp; veteran military, teachers, nurses, and
            healthcare workers get an additional <strong>10% off</strong> every order — on top of any
            active promotion.
          </p>

          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {GROUPS.map(([label, Icon]) => (
              <span
                key={label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  border: "1px solid var(--line)",
                  borderRadius: 999,
                  padding: "7px 12px",
                  fontSize: 13,
                  color: "var(--ink-2)",
                }}
              >
                <Icon size={13} style={{ color: "var(--brand-2)" }} />
                {label}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
            <Link href="/heroes" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              Verify &amp; claim your discount
              <IconArrowRight size={16} style={{ color: "#fff" }} />
            </Link>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ink-4)" }}>
              <IconLock size={11} />
              Secure · under a minute · never shared
            </span>
          </div>
        </div>

        <div>
          <div
            style={{
              width: 200,
              height: 200,
              margin: "0 auto",
              borderRadius: "50%",
              border: "2px dashed var(--brand)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg)",
              }}
            >
              <div style={{ fontSize: 42, fontWeight: 800, color: "var(--brand-2)" }}>10%</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "var(--ink-3)" }}>OFF · ALWAYS</div>
            </div>
          </div>

          <div style={{ marginTop: 24, display: "grid", gap: 10 }}>
            {STEPS.map(([Icon, title, body], i) => (
              <div key={title} className="card" style={{ padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 30,
                    height: 30,
                    flexShrink: 0,
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--brand-tint)",
                    color: "var(--brand-2)",
                    borderRadius: "50%",
                  }}
                >
                  <Icon size={14} />
                  <span
                    style={{
                      position: "absolute",
                      bottom: -4,
                      right: -4,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "var(--brand)",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {i + 1}
                  </span>
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--ink)" }}>{title}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
