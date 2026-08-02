"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IconMenu, IconX } from "@/components/icons";

const NAV = [
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
];

export default function AdminShell({ children }) {
  const [token, setToken] = useState(null);
  const [checked, setChecked] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const t = window.localStorage.getItem("peptidetech_admin_token");
    if (!t) {
      router.push("/admin/login");
      return;
    }
    setToken(t);
    setChecked(true);
  }, [router]);

  function logout() {
    window.localStorage.removeItem("peptidetech_admin_token");
    router.push("/admin/login");
  }

  if (!checked) return null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-tint)" }}>
      <header
        style={{
          background: "var(--bg)",
          borderBottom: "1px solid var(--line)",
          padding: "0 20px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>
            <span style={{ color: "var(--brand)" }}>PEPTIDE</span>TECH{" "}
            <span style={{ color: "var(--ink-4)", fontWeight: 500, fontSize: 13 }}>Admin</span>
          </span>
          <nav className="pep-admin-nav-desktop" style={{ display: "flex", gap: 4 }}>
            {NAV.map((item) => {
              const active = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "var(--radius-md)",
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: "none",
                    color: active ? "var(--brand-2)" : "var(--ink-2)",
                    background: active ? "var(--brand-tint)" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={logout}
          className="pep-admin-logout-desktop"
          style={{
            padding: "8px 14px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--line)",
            background: "var(--bg)",
            fontSize: 13.5,
            fontWeight: 600,
            color: "var(--ink-2)",
            cursor: "pointer",
          }}
        >
          Log out
        </button>

        <button
          onClick={() => setNavOpen((v) => !v)}
          className="pep-admin-nav-toggle"
          aria-label="Menu"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink)", display: "none" }}
        >
          {navOpen ? <IconX size={22} /> : <IconMenu size={22} />}
        </button>
      </header>

      {navOpen && (
        <div className="pep-admin-nav-mobile" style={{ background: "var(--bg)", borderBottom: "1px solid var(--line)", padding: 12, display: "none", flexDirection: "column", gap: 6 }}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setNavOpen(false)}
              style={{
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                color: pathname?.startsWith(item.href) ? "var(--brand-2)" : "var(--ink-2)",
                background: pathname?.startsWith(item.href) ? "var(--brand-tint)" : "transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={logout}
            style={{
              marginTop: 6,
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--line)",
              background: "var(--bg)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--ink-2)",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            Log out
          </button>
        </div>
      )}

      <main style={{ padding: "24px 20px 64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children(token)}</div>
      </main>

      <style>{`
        @media (max-width: 720px) {
          .pep-admin-nav-desktop, .pep-admin-logout-desktop { display: none !important; }
          .pep-admin-nav-toggle { display: inline-flex !important; }
          .pep-admin-nav-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
