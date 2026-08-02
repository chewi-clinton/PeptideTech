import Link from "next/link";
import Image from "next/image";
import CartIndicator from "@/components/CartIndicator";
import MobileNavToggle from "@/components/MobileNavToggle";
import ShopDropdown from "@/components/ShopDropdown";
import { IconAccount, IconSearch } from "@/components/icons";

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

export default function SiteHeader() {
  return (
    <header
      style={{
        position: "relative",
        zIndex: 40,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="container" style={{ height: 64, display: "flex", alignItems: "center", gap: 24 }}>
        <MobileNavToggle links={NAV_LINKS} />

        <Link
          href="/"
          aria-label="PeptideTech home"
          style={{ display: "inline-flex", textDecoration: "none" }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontWeight: 600, letterSpacing: "-0.01em", fontSize: 17, color: "var(--ink)" }}>
            <Image src="/logo-pt.png" width={26} height={26} alt="Peptech" style={{ display: "inline-block", objectFit: "contain" }} />
            <span>
              <span style={{ color: "var(--brand)" }}>PEPTIDE</span>TECH
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex" style={{ gap: 26 }}>
          <ShopDropdown />
          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
                padding: "21px 0",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--ink-2)",
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
          <button
            aria-label="Search products"
            style={{
              width: 40,
              height: 40,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "var(--radius-md)",
              border: "none",
              background: "transparent",
              color: "var(--ink)",
              cursor: "pointer",
            }}
          >
            <IconSearch size={18} stroke="currentColor" strokeWidth="1.8" />
          </button>
          <Link
            href="/account"
            className="hidden md:inline-flex"
            aria-label="Account"
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "var(--radius-md)",
              color: "var(--ink)",
            }}
          >
            <IconAccount size={19} />
          </Link>
          <CartIndicator />
          <Link
            href="/shop"
            className="hidden md:inline-flex"
            style={{
              marginLeft: 8,
              padding: "10px 18px",
              background: "var(--brand)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: "var(--radius-md)",
              textDecoration: "none",
            }}
          >
            Shop catalog
          </Link>
        </div>
      </div>
    </header>
  );
}
