"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function COALibraryList({ records }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return records;
    return records.filter(
      (r) =>
        r.product_title.toLowerCase().includes(q) || r.lot_number.toLowerCase().includes(q)
    );
  }, [records, query]);

  return (
    <div>
      <input
        placeholder="Search by product or lot number…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 420,
          padding: "11px 14px",
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-md)",
          fontSize: 14,
        }}
      />
      <p style={{ marginTop: 8, fontSize: 12, color: "var(--ink-4)" }}>
        {filtered.length} of {records.length} verified lots
      </p>

      <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
        {filtered.map((r) => (
          <div
            key={r.id}
            className="card"
            style={{
              padding: 14,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 14,
              fontSize: 13,
            }}
          >
            <Link href={`/p/${r.product_slug}`} style={{ fontWeight: 600, color: "var(--ink)", textDecoration: "none", minWidth: 180 }}>
              {r.product_title}
            </Link>
            <span style={{ fontFamily: "var(--font-mono-stack)", color: "var(--ink-3)" }}>
              Lot {r.lot_number}
            </span>
            {r.purity_percent && <span style={{ color: "var(--brand-2)" }}>{r.purity_percent} purity</span>}
            {r.test_date && <span style={{ color: "var(--ink-4)" }}>Tested {r.test_date}</span>}
            {r.issuing_lab && <span style={{ color: "var(--ink-4)" }}>{r.issuing_lab}</span>}
            {r.file && (
              <a
                href={r.file}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "auto", color: "var(--brand-2)", fontWeight: 600, textDecoration: "none" }}
              >
                View PDF →
              </a>
            )}
          </div>
        ))}
        {filtered.length === 0 && <p style={{ color: "var(--ink-4)" }}>No matching lots.</p>}
      </div>
    </div>
  );
}
