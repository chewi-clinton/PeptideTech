"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Eyebrow from "@/components/Eyebrow";
import HexBackground from "@/components/HexBackground";
import { IconChevronDown, IconFilter, IconSearchLarge } from "@/components/icons";

const SORT_OPTIONS = [
  ["featured", "Sort: Featured"],
  ["newest", "Newest"],
  ["price_asc", "Price: Low to high"],
  ["price_desc", "Price: High to low"],
  ["az", "Name: A-Z"],
];

const PRICE_OPTIONS = [
  ["all", "Any price"],
  ["under_50", "Under $50"],
  ["50_100", "$50-$100"],
  ["100_200", "$100-$200"],
  ["200_plus", "$200+"],
];

const FILTER_PILLS = ["In stock", "Backorder", "COA available", "On sale"];

function defaultVariant(p) {
  return p.variants?.find((v) => v.is_default) || p.variants?.[0];
}

export default function ShopCatalog({ products, categories }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [price, setPrice] = useState("all");
  const [activeFilters, setActiveFilters] = useState([]);

  function toggleFilter(name) {
    setActiveFilters((prev) => (prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]));
  }

  const filtered = useMemo(() => {
    let list = [...products];

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    for (const filter of activeFilters) {
      if (filter === "In stock") list = list.filter((p) => defaultVariant(p)?.in_stock);
      if (filter === "Backorder") list = list.filter((p) => !defaultVariant(p)?.in_stock);
      if (filter === "COA available") list = list.filter((p) => p.purity);
      if (filter === "On sale") list = list.filter((p) => defaultVariant(p)?.compare_at_price);
    }

    if (price !== "all") {
      list = list.filter((p) => {
        const val = Number(defaultVariant(p)?.price || 0);
        if (price === "under_50") return val < 50;
        if (price === "50_100") return val >= 50 && val <= 100;
        if (price === "100_200") return val >= 100 && val <= 200;
        if (price === "200_plus") return val > 200;
        return true;
      });
    }

    if (sort === "price_asc") list.sort((a, b) => Number(defaultVariant(a)?.price) - Number(defaultVariant(b)?.price));
    if (sort === "price_desc") list.sort((a, b) => Number(defaultVariant(b)?.price) - Number(defaultVariant(a)?.price));
    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [products, query, sort, price, activeFilters]);

  return (
    <div>
      <section style={{ position: "relative", overflow: "hidden", background: "var(--bg-tint)", padding: "56px 24px" }}>
        <HexBackground />
        <div className="container" style={{ position: "relative", maxWidth: 760, textAlign: "center", margin: "0 auto" }}>
          <Eyebrow>The catalog</Eyebrow>
          <h1 style={{ fontSize: 44, marginTop: 10 }}>
            Research peptides <em className="font-serif-italic" style={{ color: "var(--brand-2)" }}>for sale.</em>
          </h1>
          <p style={{ marginTop: 10, fontSize: 16, color: "var(--ink-3)" }}>
            {products.length} HPLC-verified SKUs — each batch third-party tested with a public
            Certificate of Analysis.
          </p>

          <div style={{ position: "relative", maxWidth: 520, margin: "26px auto 0" }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--ink-4)" }}>
              <IconSearchLarge size={18} />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search peptides, blends, supplies…"
              aria-label="Search catalog"
              style={{
                width: "100%",
                height: 52,
                padding: "0 16px 0 46px",
                borderRadius: "var(--radius-md)",
                background: "var(--bg)",
                border: "1px solid var(--line)",
                fontSize: 15,
              }}
            />
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: 40, padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <PillLink href="/shop" active>
              All products
            </PillLink>
            {categories.map((c) => (
              <PillLink key={c.slug} href={`/c/${c.slug}`}>
                {c.name}
              </PillLink>
            ))}
          </div>
          <SelectDropdown value={sort} onChange={setSort} options={SORT_OPTIONS} />
        </div>

        <div
          className="card"
          style={{
            marginTop: 16,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            background: "var(--bg-tint)",
            border: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-mono-stack)",
                fontSize: 11,
                color: "var(--ink-4)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              <IconFilter size={14} />
              Filters
            </span>
            {FILTER_PILLS.map((f) => (
              <PillButton key={f} active={activeFilters.includes(f)} onClick={() => toggleFilter(f)} small>
                {f}
              </PillButton>
            ))}
          </div>
          <SelectDropdown value={price} onChange={setPrice} options={PRICE_OPTIONS} />
        </div>

        <p style={{ marginTop: 20, fontSize: 13, color: "var(--ink-4)" }}>
          {filtered.length} of {products.length} products
        </p>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 18,
          }}
        >
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        {filtered.length === 0 && <p style={{ color: "var(--ink-4)", marginTop: 20 }}>No products match your filters.</p>}
      </div>
    </div>
  );
}

function PillLink({ href, active, children }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 38,
        padding: "0 16px",
        borderRadius: 999,
        fontSize: 13.5,
        fontWeight: 500,
        textDecoration: "none",
        background: active ? "var(--brand)" : "var(--bg)",
        color: active ? "#fff" : "var(--ink-2)",
        border: `1px solid ${active ? "var(--brand)" : "var(--line-2)"}`,
        transition: "160ms",
      }}
    >
      {children}
    </Link>
  );
}

function PillButton({ active, onClick, children, small }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: small ? 34 : 38,
        padding: small ? "0 14px" : "0 16px",
        borderRadius: 999,
        fontSize: small ? 13 : 13.5,
        fontWeight: 500,
        cursor: "pointer",
        background: active ? "var(--brand)" : "var(--bg)",
        color: active ? "#fff" : "var(--ink-2)",
        border: `1px solid ${active ? "var(--brand)" : "var(--line-2)"}`,
        transition: "160ms",
      }}
    >
      {children}
    </button>
  );
}

function SelectDropdown({ value, onChange, options }) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          appearance: "none",
          height: 38,
          padding: "0 34px 0 14px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--line-2)",
          background: "var(--bg)",
          fontSize: 13.5,
          color: "var(--ink-2)",
        }}
      >
        {options.map(([val, label]) => (
          <option key={val} value={val}>
            {label}
          </option>
        ))}
      </select>
      <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-4)", pointerEvents: "none" }}>
        <IconChevronDown size={16} />
      </span>
    </div>
  );
}
