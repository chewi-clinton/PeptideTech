import Link from "next/link";

export const metadata = { title: "Affiliate dashboard — Peptide Technologies" };

// The live site's /account/affiliate is a sign-in gate behind a full
// customer-account system (login/register) this rebuild doesn't have —
// that was an explicit scope decision (no accounts) from day one. Rather
// than fake a working login, this reproduces the real copy/layout and
// routes "Sign in" / "Create account" to real support instead of a
// nonexistent auth flow.
export default function AffiliateDashboardPage() {
  return (
    <div className="container" style={{ padding: "80px 24px", maxWidth: 480 }}>
      <h1 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", color: "var(--ink)" }}>
        Affiliate dashboard
      </h1>
      <p style={{ marginTop: 10, fontSize: 14, textAlign: "center", color: "var(--ink-3)" }}>
        Sign in to view your referral link, earnings, and payouts.
      </p>

      <div
        className="card"
        style={{ marginTop: 24, padding: 16, textAlign: "left", background: "var(--brand-tint)", border: "1px solid var(--brand)" }}
      >
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
          Accessing your affiliate dashboard
        </p>
        <p style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.55, color: "var(--ink-3)" }}>
          Sign in with the <strong>same email as your affiliate application</strong>. Applying
          doesn&apos;t create a password — contact support or use the email link if this is your
          first login.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          <Link
            href="/contact"
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", height: 36, padding: "0 16px", fontSize: 13, textDecoration: "none" }}
          >
            Create account
          </Link>
          <Link
            href="/affiliates/access"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 36,
              padding: "0 16px",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--line)",
              color: "var(--ink-2)",
              background: "var(--bg)",
              textDecoration: "none",
            }}
          >
            Help &amp; troubleshooting
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
        <Link href="/contact" className="btn-primary" style={{ width: "100%", textAlign: "center", padding: "12px", textDecoration: "none" }}>
          Sign in
        </Link>
        <Link href="/contact" style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-2)", textDecoration: "none" }}>
          Create account
        </Link>
        <Link href="/affiliates" style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-4)", textDecoration: "none" }}>
          Not an affiliate yet? Apply
        </Link>
      </div>
    </div>
  );
}
