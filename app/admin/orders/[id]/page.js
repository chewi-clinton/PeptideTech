"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import AdminShell from "@/components/admin/AdminShell";
import { IconArrowRight } from "@/components/icons";

const STATUS_OPTIONS = ["pending", "paid", "fulfilled", "cancelled"];

const STATUS_COLOR = {
  pending: { bg: "#fef3c7", color: "#92400e" },
  paid: { bg: "var(--brand-tint)", color: "var(--brand-2)" },
  fulfilled: { bg: "#dcfce7", color: "#166534" },
  cancelled: { bg: "#fee2e2", color: "#991b1b" },
};

function OrderDetailView({ token }) {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!token) return;
    api.orders
      .get(params.id, token)
      .then(setOrder)
      .catch(() => setError("Could not load this order — your session may have expired."));
  }, [token, params.id]);

  async function handleStatusChange(status) {
    setUpdating(true);
    try {
      await api.orders.updateStatus(order.id, status, token);
      setOrder((cur) => ({ ...cur, status }));
    } catch {
      setError("Could not update order status.");
    } finally {
      setUpdating(false);
    }
  }

  if (error) return <p style={{ color: "var(--red)" }}>{error}</p>;
  if (!order) return <p style={{ color: "var(--ink-4)" }}>Loading…</p>;

  const colors = STATUS_COLOR[order.status] || STATUS_COLOR.pending;

  return (
    <div>
      <Link
        href="/admin/orders"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--ink-3)", textDecoration: "none", marginBottom: 16 }}
      >
        ← All orders
      </Link>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, color: "var(--ink)", fontFamily: "var(--font-mono-stack)" }}>{order.order_number}</h1>
          <span
            style={{
              display: "inline-flex",
              marginTop: 6,
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              padding: "4px 10px",
              borderRadius: 999,
              background: colors.bg,
              color: colors.color,
            }}
          >
            {order.status}
          </span>
        </div>
        <select
          value={order.status}
          disabled={updating}
          onChange={(e) => handleStatusChange(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--line)",
            background: "var(--bg)",
            fontSize: 14,
            color: "var(--ink)",
          }}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }} className="pep-order-detail-grid">
        <div className="card" style={{ padding: 20 }}>
          <h2 style={{ fontSize: 15, color: "var(--ink)", margin: "0 0 14px" }}>Items</h2>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 10 }}>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, paddingBottom: 10, borderBottom: i < order.items.length - 1 ? "1px solid var(--line)" : "none" }}>
                <span style={{ color: "var(--ink-2)" }}>
                  {item.quantity} × {item.product_title}
                </span>
                <span style={{ fontWeight: 600, color: "var(--ink)" }}>${item.price}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>
            <span>Total</span>
            <span>${order.total}</span>
          </div>
          <div style={{ marginTop: 10, fontSize: 13, color: "var(--ink-3)" }}>
            Payment method: <strong style={{ color: "var(--ink)" }}>{order.payment_method}</strong>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: 15, color: "var(--ink)", margin: "0 0 10px" }}>Contact</h2>
            <div style={{ fontSize: 14, color: "var(--ink-2)" }}>{order.customer_name}</div>
            <div style={{ fontSize: 13, color: "var(--ink-3)", overflowWrap: "anywhere" }}>{order.email}</div>
            {order.phone && <div style={{ fontSize: 13, color: "var(--ink-3)" }}>{order.phone}</div>}
          </div>

          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: 15, color: "var(--ink)", margin: "0 0 10px" }}>Shipping address</h2>
            <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.6 }}>
              {order.address_line1}
              <br />
              {order.address_line2 && (
                <>
                  {order.address_line2}
                  <br />
                </>
              )}
              {order.city}, {order.state} {order.postal_code}
              <br />
              {order.country}
            </div>
          </div>

          <a
            href={`mailto:${order.email}`}
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none" }}
          >
            Email customer
            <IconArrowRight size={14} style={{ color: "#fff" }} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .pep-order-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default function AdminOrderDetailPage() {
  return <AdminShell>{(token) => <OrderDetailView token={token} />}</AdminShell>;
}
