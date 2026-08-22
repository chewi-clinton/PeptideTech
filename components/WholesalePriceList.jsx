"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { WHOLESALE_PRICE_SHEET } from "@/lib/wholesalePriceSheet";
import { IconSearch } from "@/components/icons";

export default function WholesalePriceList() {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return WHOLESALE_PRICE_SHEET;
    return WHOLESALE_PRICE_SHEET.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.catNo.toLowerCase().includes(q) ||
        r.spec.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section style={{ marginTop: 8 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Wholesale Price List</h2>
          <p style={{ margin: "6px 0 0", fontSize: 13.5, color: "var(--ink-3)", maxWidth: 60 + "ch" }}>
            Full catalog and per-size pricing, 10-vial kits. Search by product or catalog number — items already in
            our shop are clickable.
          </p>
        </div>
        <div style={{ position: "relative", width: "100%", maxWidth: 320 }}>
          <IconSearch
            size={14}
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-4)" }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search product or catalog no."
            style={{
              width: "100%",
              padding: "9px 12px 9px 34px",
              fontSize: 13.5,
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-sm)",
              background: "var(--bg)",
              color: "var(--ink)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 18,
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-md)",
          overflowX: "auto",
          background: "var(--surface, var(--bg))",
        }}
      >
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 620 }}>
          <thead>
            <tr>
              {["Cat. No", "Product", "Specification", "Price"].map((h, i) => (
                <th
                  key={h}
                  style={{
                    textAlign: i === 3 ? "right" : "left",
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--ink-4)",
                    padding: "10px 14px",
                    borderBottom: "1px solid var(--line)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const price = r.price == null ? "—" : `$${r.price.toFixed(2).replace(/\.00$/, "")}`;
              const content = (
                <>
                  <td style={{ padding: "9px 14px", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--ink-4)", borderBottom: "1px solid var(--line)", whiteSpace: "nowrap" }}>
                    {r.catNo}
                  </td>
                  <td style={{ padding: "9px 14px", fontSize: 13.5, color: "var(--ink)", fontWeight: 600, borderBottom: "1px solid var(--line)" }}>
                    {r.name}
                    {r.slug && (
                      <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 600, color: "var(--brand-2)" }}>
                        View in shop →
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "9px 14px", fontSize: 13, color: "var(--ink-3)", borderBottom: "1px solid var(--line)", whiteSpace: "nowrap" }}>
                    {r.spec}
                  </td>
                  <td
                    style={{
                      padding: "9px 14px",
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: "var(--ink)",
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {price}
                  </td>
                </>
              );

              return r.slug ? (
                <tr
                  key={`${r.catNo}-${i}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => window.location.assign(`/p/${r.slug}`)}
                >
                  {content}
                </tr>
              ) : (
                <tr key={`${r.catNo}-${i}`}>{content}</tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: "24px 14px", textAlign: "center", fontSize: 13, color: "var(--ink-4)" }}>
                  No products match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
