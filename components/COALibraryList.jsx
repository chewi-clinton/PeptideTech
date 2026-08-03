"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IconCheck, IconFileText, IconSearchLarge, IconShield } from "@/components/icons";

const PAGE_SIZE = 24;

const SORTS = {
  newest: { label: "Newest batch", fn: (a, b) => new Date(b.test_date || 0) - new Date(a.test_date || 0) },
  purity: { label: "Highest purity", fn: (a, b) => parseFloat(b.purity_percent) - parseFloat(a.purity_percent) },
  name: { label: "Product name (A–Z)", fn: (a, b) => a.product_title.localeCompare(b.product_title) },
};

export default function COALibraryList({ records }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? records.filter(
          (r) => r.product_title.toLowerCase().includes(q) || r.lot_number.toLowerCase().includes(q)
        )
      : records;
    return [...base].sort(SORTS[sort].fn);
  }, [records, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const pageItems = filtered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  return (
    <div>
      <div style={{ position: "relative", maxWidth: 480, margin: "-52px auto 0" }}>
        <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--ink-4)" }}>
          <IconSearchLarge size={16} />
        </span>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search products or batch numbers, e.g. SEM-A2614"
          style={{
            width: "100%",
            height: 48,
            padding: "0 16px 0 44px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--line)",
            background: "var(--bg)",
            fontSize: 14,
            boxShadow: "var(--shadow)",
          }}
        />
      </div>

      <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 13.5, color: "var(--ink-3)" }}>{filtered.length} verified lots</span>
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          style={{
            padding: "8px 12px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--line)",
            background: "var(--bg)",
            fontSize: 13,
            color: "var(--ink)",
          }}
        >
          {Object.entries(SORTS).map(([key, s]) => (
            <option key={key} value={key}>
              Sort: {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="pep-coa-grid" style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 }}>
        {pageItems.map((r) => (
          <div key={r.id} className="card" style={{ padding: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
              <div style={{ display: "flex", gap: 10, minWidth: 0 }}>
                <div
                  style={{ width: 40, height: 40, flexShrink: 0 }}
                  dangerouslySetInnerHTML={{ __html: r.qrSvg }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {r.product_title}
                  </div>
                  <div style={{ fontSize: 11.5, fontFamily: "var(--font-mono-stack)", color: "var(--ink-4)" }}>Lot {r.lot_number}</div>
                </div>
              </div>
              <span
                style={{
                  flexShrink: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "var(--brand-2)",
                  background: "var(--brand-tint)",
                  padding: "3px 8px",
                  borderRadius: 999,
                }}
              >
                <IconCheck size={9} /> Released
              </span>
            </div>

            <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 10, fontSize: 12.5 }}>
              <Stat label="HPLC purity" value={r.purity_percent || "—"} />
              <Stat label="Tested" value={formatDate(r.test_date)} />
              <Stat label="Testing lab" value={r.issuing_lab || "—"} />
              <Stat label="Identity" value="Confirmed" />
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
              {r.file ? (
                <a
                  href={r.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, textDecoration: "none", padding: "9px 0", fontSize: 12.5 }}
                >
                  <IconFileText size={13} style={{ color: "#fff" }} />
                  COA PDF
                </a>
              ) : (
                <span style={{ flex: 1 }} />
              )}
              <Link
                href={`/coa/${r.lot_number}`}
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "9px 0",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--line)",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "var(--ink-2)",
                  textDecoration: "none",
                }}
              >
                <IconShield size={13} />
                Verify
              </Link>
            </div>
          </div>
        ))}
        {pageItems.length === 0 && <p style={{ color: "var(--ink-4)", gridColumn: "1 / -1" }}>No matching lots.</p>}
      </div>

      {totalPages > 1 && (
        <div style={{ marginTop: 28, display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={pageSafe <= 1} style={pagerButtonStyle(pageSafe <= 1)}>
            ← Prev
          </button>
          <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
            Page {pageSafe} of {totalPages}
          </span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={pageSafe >= totalPages} style={pagerButtonStyle(pageSafe >= totalPages)}>
            Next →
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 1000px) {
          .pep-coa-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 560px) {
          .pep-coa-grid { grid-template-columns: minmax(0, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink-4)" }}>{label}</div>
      <div style={{ marginTop: 2, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
    </div>
  );
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function pagerButtonStyle(disabled) {
  return {
    padding: "8px 16px",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--line)",
    background: "var(--bg)",
    fontSize: 13,
    fontWeight: 600,
    color: disabled ? "var(--ink-4)" : "var(--ink-2)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  };
}
