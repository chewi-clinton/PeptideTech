import Link from "next/link";
import Image from "next/image";
import { IconShield } from "@/components/icons";

export default function CheckoutLayout({ children }) {
  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 24px",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <Image src="/logo-pt.png" alt="Peptech" width={26} height={26} style={{ objectFit: "contain" }} />
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em" }}>
            <span style={{ color: "var(--brand)" }}>PEPTIDE</span>
            <span style={{ color: "var(--ink)" }}>TECH</span>
          </span>
        </Link>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--ink-3)" }}>
          <IconShield size={15} style={{ color: "var(--brand-2)" }} />
          Secure checkout
        </span>
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <footer style={{ padding: "24px", borderTop: "1px solid var(--line)", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "var(--ink-3)" }}>Research use only. Not for human consumption.</p>
        <div style={{ marginTop: 8, display: "flex", justifyContent: "center", gap: 16, fontSize: 12.5 }}>
          <Link href="/terms" style={{ color: "var(--ink-4)", textDecoration: "none" }}>
            Terms
          </Link>
          <Link href="/privacy" style={{ color: "var(--ink-4)", textDecoration: "none" }}>
            Privacy
          </Link>
          <Link href="/shipping" style={{ color: "var(--ink-4)", textDecoration: "none" }}>
            Shipping
          </Link>
        </div>
      </footer>
    </>
  );
}
