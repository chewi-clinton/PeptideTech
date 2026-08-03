"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";
import AdminShell from "@/components/admin/AdminShell";
import { IconPlus, IconSearchLarge } from "@/components/icons";

function ProductsView({ token }) {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!token) return;
    api.adminProducts
      .list(token)
      .then(setProducts)
      .catch(() => setError("Could not load products — your session may have expired."))
      .finally(() => setLoading(false));
  }, [token]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q));
  }, [products, query]);

  async function handleDelete(product) {
    if (!window.confirm(`Delete "${product.title}"? This cannot be undone.`)) return;
    setDeletingId(product.id);
    try {
      await api.adminProducts.remove(product.id, token);
      setProducts((cur) => cur.filter((p) => p.id !== product.id));
    } catch {
      setError("Could not delete product.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 26, color: "var(--ink)" }}>Products</h1>
        <Link
          href="/admin/products/new"
          className="btn-primary"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}
        >
          <IconPlus size={14} style={{ color: "#fff" }} />
          Add product
        </Link>
      </div>

      <div style={{ position: "relative", marginTop: 20, maxWidth: 360 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-4)" }}>
          <IconSearchLarge size={15} />
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          style={{
            width: "100%",
            height: 40,
            padding: "0 12px 0 36px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--line)",
            background: "var(--bg)",
            fontSize: 14,
            color: "var(--ink)",
          }}
        />
      </div>

      {error && <p style={{ color: "var(--red)", marginTop: 16, fontSize: 13.5 }}>{error}</p>}

      <div style={{ marginTop: 20, display: "grid", gap: 8 }}>
        {filtered.map((p) => {
          const defaultVariant = p.variants?.find((v) => v.is_default) || p.variants?.[0];
          const image = p.images?.[0]?.image;
          return (
            <div
              key={p.id}
              className="card pep-admin-prod-row"
              style={{ padding: 12, opacity: deletingId === p.id ? 0.5 : 1 }}
            >
              <div className="pep-admin-prod-top">
                <div style={{ position: "relative", width: 48, height: 48, flexShrink: 0, borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--bg-tint)" }}>
                  {image && <Image src={image} alt="" fill style={{ objectFit: "contain", padding: 4 }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-4)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {p.category?.name || "Uncategorized"} · {p.slug}
                    {!p.is_active && <span style={{ color: "var(--red)", fontWeight: 600 }}> · inactive</span>}
                  </div>
                </div>
              </div>
              <div className="pep-admin-prod-actions">
                {defaultVariant && (
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", flexShrink: 0 }}>${defaultVariant.price}</div>
                )}
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <Link
                    href={`/admin/products/${p.id}`}
                    style={{
                      padding: "7px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--line)",
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "var(--ink-2)",
                      textDecoration: "none",
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p)}
                    disabled={deletingId === p.id}
                    style={{
                      padding: "7px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--line)",
                      background: "var(--bg)",
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "var(--red)",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {!loading && filtered.length === 0 && !error && (
          <p style={{ color: "var(--ink-4)" }}>No products match your search.</p>
        )}
      </div>

      <style>{`
        .pep-admin-prod-row { display: flex; align-items: center; gap: 14px; }
        .pep-admin-prod-top { display: flex; align-items: center; gap: 14px; flex: 1; min-width: 0; }
        .pep-admin-prod-actions { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
        @media (max-width: 480px) {
          .pep-admin-prod-row { flex-wrap: wrap; }
          .pep-admin-prod-actions { flex-basis: 100%; justify-content: space-between; margin-top: 8px; }
        }
      `}</style>
    </div>
  );
}

export default function AdminProductsPage() {
  return <AdminShell>{(token) => <ProductsView token={token} />}</AdminShell>;
}
