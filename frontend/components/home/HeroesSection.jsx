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
      <div className="container pep-2col" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 48, alignItems: "center" }}>
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <svg width="196" height="196" viewBox="0 0 120 120" role="img" aria-label="Verified — 10% off for those who serve">
              <defs>
                <path id="sealTop" d="M 13 60 A 47 47 0 0 1 107 60" />
                <path id="sealBot" d="M 107 60 A 47 47 0 0 1 13 60" />
              </defs>
              <circle cx="60" cy="60" r="58" fill="none" stroke="var(--brand)" strokeWidth="4.2" strokeLinecap="round" strokeDasharray="0 10.1228" opacity="0.35" />
              <circle cx="60" cy="60" r="54" fill="var(--bg)" stroke="var(--brand)" strokeWidth="1.5" />
              <circle cx="60" cy="60" r="49" fill="none" stroke="var(--brand)" strokeWidth="0.75" opacity="0.4" />
              <g fontFamily="var(--font-mono-stack)" fontSize="6.6" fontWeight="600" letterSpacing="0.16em" fill="var(--brand-2)">
                <text>
                  <textPath href="#sealTop" startOffset="50%" textAnchor="middle">
                    VERIFIED · THOSE WHO SERVE
                  </textPath>
                </text>
                <text>
                  <textPath href="#sealBot" startOffset="50%" textAnchor="middle">
                    PEPTECH · EST. 2024
                  </textPath>
                </text>
              </g>
              <text x="14" y="62.4" textAnchor="middle" fontSize="7" fill="var(--brand)" opacity="0.7">★</text>
              <text x="106" y="62.4" textAnchor="middle" fontSize="7" fill="var(--brand)" opacity="0.7">★</text>
              <circle cx="60" cy="60" r="34" fill="var(--brand-tint)" />
              <text x="60" y="57" textAnchor="middle" fontFamily="var(--font-sans-stack)" fontSize="30" fontWeight="700" letterSpacing="-0.03em" fill="var(--brand-2)">
                10%
              </text>
              <text x="60" y="73" textAnchor="middle" fontFamily="var(--font-mono-stack)" fontSize="6" fontWeight="600" letterSpacing="0.14em" fill="var(--ink-3)">
                OFF · ALWAYS
              </text>
              <line x1="42" y1="64" x2="78" y2="64" stroke="var(--brand)" strokeWidth="0.75" opacity="0.4" />
            </svg>
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
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <Icon size={14} />
                  <span
                    style={{
                      position: "absolute",
                      top: -6,
                      left: -6,
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
