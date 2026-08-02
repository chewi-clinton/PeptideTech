"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";

function OrderStatusForm() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(searchParams.get("order_number") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function lookup(e) {
    e?.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const result = await api.orders.lookup(orderNumber, email);
      setOrder(result);
    } catch {
      setError("No matching order found. Check your order number and email.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (searchParams.get("order_number") && searchParams.get("email")) {
      lookup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container" style={{ padding: "40px 24px", maxWidth: 520 }}>
      <h1 style={{ fontSize: 30 }}>Order status</h1>
      <p style={{ marginTop: 8, color: "var(--ink-3)", fontSize: 14 }}>
        Enter your order number and the email used at checkout.
      </p>

      <form onSubmit={lookup} style={{ marginTop: 20, display: "grid", gap: 12 }}>
        <input
          required
          placeholder="Order number (e.g. ZC-MRGOGG921HW3)"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          style={inputStyle}
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" disabled={loading} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
          {loading ? "Checking…" : "Check status"}
        </button>
      </form>

      {error && <p style={{ marginTop: 16, color: "var(--red)", fontSize: 13 }}>{error}</p>}

      {order && (
        <div className="card" style={{ marginTop: 24, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{order.order_number}</strong>
            <span
              style={{
                textTransform: "uppercase",
                fontSize: 11,
                fontWeight: 700,
                color: "var(--brand-2)",
              }}
            >
              {order.status}
            </span>
          </div>
          <div style={{ marginTop: 10, fontSize: 13, color: "var(--ink-3)" }}>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span>
                  {item.quantity} × {item.product_title}
                </span>
                <span>${item.price}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
            <span>Total</span>
            <span>${order.total}</span>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  padding: "11px 14px",
  border: "1px solid var(--line)",
  borderRadius: "var(--radius-md)",
  fontSize: 14,
  fontFamily: "inherit",
};

export default function OrderStatusPage() {
  return (
    <Suspense fallback={null}>
      <OrderStatusForm />
    </Suspense>
  );
}
