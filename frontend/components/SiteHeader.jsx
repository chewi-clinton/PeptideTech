import Link from "next/link";
import { api } from "@/lib/api";
import CartIndicator from "@/components/CartIndicator";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/build-a-kit", label: "Build a Kit" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/coa", label: "COA Library" },
  { href: "/blog", label: "Blog" },
  { href: "/affiliates", label: "Affiliates" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default async function SiteHeader() {
  let categories = [];
  try {
    categories = await api.categories.list();
  } catch {
    categories = [];
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="container" style={{ height: 64, display: "flex", alignItems: "center", gap: 24 }}>
        <Link
          href="/"
          aria-label="PeptideTech home"
          style={{ display: "inline-flex", alignItems: "center", gap: 9, fontWeight: 600, fontSize: 17, color: "var(--ink)" }}
        >
          <span style={{ color: "var(--brand)" }}>PEPTIDE</span>TECH
        </Link>

        <nav style={{ display: "flex", gap: 22, flex: 1 }} className="hidden md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-2)", textDecoration: "none" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <CartIndicator />
      </div>

      {categories.length > 0 && (
        <div className="container hidden md:flex" style={{ gap: 16, paddingBottom: 10 }}>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/c/${c.slug}`}
              style={{ fontSize: 12.5, color: "var(--ink-3)", textDecoration: "none" }}
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
