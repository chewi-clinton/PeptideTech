"use client";

import { useState } from "react";
import Link from "next/link";
import { IconChevronDown } from "@/components/icons";

const SHOP_LINKS = [
  { href: "/shop", label: "All products" },
  { href: "/c/peptides", label: "Peptides" },
  { href: "/c/glp-peptides", label: "GLP Peptides" },
  { href: "/c/bioregulators", label: "Bioregulators" },
  { href: "/c/peptide-blends", label: "Peptide Blends" },
  { href: "/c/capsules", label: "Capsules" },
  { href: "/c/liquids-aminos-solvents", label: "Liquids & topicals" },
  { href: "/c/cases-accessories", label: "Cases & Accessories" },
];

export default function ShopDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href="/shop"
        aria-haspopup="true"
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          textDecoration: "none",
          padding: "21px 0",
          fontSize: 14,
          fontWeight: 500,
          color: "var(--ink-2)",
          whiteSpace: "nowrap",
        }}
      >
        Shop
        <IconChevronDown
          size={13}
          style={{ opacity: 0.65, transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms ease" }}
        />
      </Link>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            minWidth: 200,
            background: "var(--bg)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lg)",
            padding: 8,
            zIndex: 50,
          }}
        >
          {SHOP_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "block",
                padding: "9px 12px",
                borderRadius: "var(--radius-sm)",
                fontSize: 14,
                color: "var(--ink-2)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
