import { IconBank, IconLock } from "@/components/icons";

// Real logos for the payment methods actually offered at checkout (see
// PAYMENT_METHODS in app/(checkout)/checkout/page.js) — fetched from each
// provider's own brand assets, not the generic card-network badges this
// used to show. PayID and Bank Transfer have no single official mark, so
// they render as a plain labeled pill instead of an invented logo.
const badgeShell = {
  height: 32,
  padding: "0 10px",
  borderRadius: 6,
  border: "1px solid var(--line-2)",
  background: "#fff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const LOGO_METHODS = [
  { key: "zelle", label: "Zelle", src: "/payment/zelle.svg", logoHeight: 16 },
  { key: "chime", label: "Chime", src: "/payment/chime.svg", logoHeight: 13 },
  { key: "apple_pay", label: "Apple Pay", src: "/payment/applepay.svg", logoHeight: 16 },
  { key: "cash_app", label: "Cash App", src: "/payment/cashapp.svg", logoHeight: 20 },
  { key: "e_transfer", label: "Interac e-Transfer", src: "/payment/interac.svg", logoHeight: 22 },
  { key: "crypto", label: "Crypto", src: "/payment/bitcoin.svg", logoHeight: 20 },
];

export default function PaymentBadges() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      {LOGO_METHODS.map((m) => (
        <span key={m.key} style={badgeShell} title={m.label}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={m.src} alt={m.label} height={m.logoHeight} style={{ height: m.logoHeight, width: "auto" }} />
        </span>
      ))}

      <span style={{ ...badgeShell, gap: 5, fontSize: 11, fontWeight: 700, color: "var(--ink-2)", letterSpacing: "0.01em" }}>
        <IconBank size={14} style={{ color: "var(--ink-3)" }} />
        Bank Transfer
      </span>

      <span style={{ ...badgeShell, fontSize: 11, fontWeight: 800, color: "var(--ink-2)", letterSpacing: "0.02em" }}>
        PayID
      </span>

      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          height: 32,
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
