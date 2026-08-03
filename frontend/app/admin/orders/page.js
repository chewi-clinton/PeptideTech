"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import AdminShell from "@/components/admin/AdminShell";

const STATUS_OPTIONS = ["pending", "paid", "fulfilled", "cancelled"];

const STATUS_COLOR = {
  pending: { bg: "#fef3c7", color: "#92400e" },
  paid: { bg: "var(--brand-tint)", color: "var(--brand-2)" },
  fulfilled: { bg: "#dcfce7", color: "#166534" },
  cancelled: { bg: "#fee2e2", color: "#991b1b" },
};

function OrdersView({ token }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    api.orders
      .list(token)
      .then((data) => setOrders(data))
      .catch(() => setError("Could not load orders — your session may have expired."))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleStatusChange(order, status) {
    const prev = order.status;
    setOrders((cur) => cur.map((o) => (o.id === order.id ? { ...o, status } : o)));
    try {
      await api.orders.updateStatus(order.id, status, token);
    } catch {
      setOrders((cur) => cur.map((o) => (o.id === order.id ? { ...o, status: prev } : o)));
      setError("Could not update order status.");
    }
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 26, color: "var(--ink)" }}>Orders</h1>
        <span style={{ fontSize: 13, color: "var(--ink-4)" }}>{orders.length} total</span>
      </div>
      {error && <p style={{ color: "var(--red)", marginTop: 12, fontSize: 13.5 }}>{error}</p>}

      <div style={{ marginTop: 20, display: "grid", gap: 10 }}>
        {orders.map((order) => {
          const colors = STATUS_COLOR[order.status] || STATUS_COLOR.pending;
          return (
            <div key={order.id} className="card" style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      style={{ fontFamily: "var(--font-mono-stack)", fontSize: 13.5, fontWeight: 700, color: "var(--brand-2)", textDecoration: "none" }}
                    >
                      {order.order_number}
                    </Link>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        padding: "3px 9px",
                        borderRadius: 999,
                        background: colors.bg,
                        color: colors.color,
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div style={{ marginTop: 4, fontSize: 13, color: "var(--ink-3)" }}>
                    {order.customer_name} · {order.email}
                  </div>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order, e.target.value)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    fontSize: 13,
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
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--line)", fontSize: 13, color: "var(--ink-3)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <span>{order.items.map((i) => `${i.quantity}× ${i.product_title}`).join(", ")}</span>
                <span style={{ fontWeight: 700, color: "var(--ink)" }}>
                  {order.payment_method} · ${order.total}
                </span>
              </div>
            </div>
          );
        })}
        {!loading && orders.length === 0 && !error && <p style={{ color: "var(--ink-4)" }}>No orders yet.</p>}
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  return <AdminShell>{(token) => <OrdersView token={token} />}</AdminShell>;
}
