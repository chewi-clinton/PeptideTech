"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const STATUS_OPTIONS = ["pending", "paid", "fulfilled", "cancelled"];

export default function AdminOrdersPage() {
  const [token, setToken] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const t = window.localStorage.getItem("peptidetech_admin_token");
    if (!t) {
      router.push("/admin/login");
      return;
    }
    setToken(t);
  }, [router]);

  useEffect(() => {
    if (!token) return;
    api.orders
      .list(token)
      .then(setOrders)
      .catch(() => setError("Could not load orders — your session may have expired."));
  }, [token]);

  async function handleStatusChange(order, status) {
    try {
      await api.orders.updateStatus(order.id, status, token);
      setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status } : o)));
    } catch {
      setError("Could not update order status.");
    }
  }

  if (!token) return null;

  return (
    <div className="container" style={{ padding: "40px 24px" }}>
      <h1 style={{ fontSize: 28 }}>Orders</h1>
      {error && <p style={{ color: "var(--red)", marginTop: 12 }}>{error}</p>}

      <div style={{ marginTop: 24, display: "grid", gap: 10 }}>
        {orders.map((order) => (
          <div key={order.id} className="card" style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div>
                <strong style={{ fontFamily: "var(--font-mono-stack)" }}>{order.order_number}</strong>
                <span style={{ marginLeft: 12, fontSize: 13, color: "var(--ink-3)" }}>
                  {order.customer_name} · {order.email}
                </span>
              </div>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order, e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--line)",
                  fontSize: 13,
                }}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: 10, fontSize: 13, color: "var(--ink-3)" }}>
              {order.payment_method} · ${order.total} ·{" "}
              {order.items.map((i) => `${i.quantity}× ${i.product_title}`).join(", ")}
            </div>
          </div>
        ))}
        {orders.length === 0 && !error && <p style={{ color: "var(--ink-4)" }}>No orders yet.</p>}
      </div>
    </div>
  );
}
