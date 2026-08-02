"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import Eyebrow from "@/components/Eyebrow";
import { IconClockSimple } from "@/components/icons";

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
    <div>
      <section style={{ background: "var(--bg-tint)", padding: "48px 24px" }}>
        <div className="container" style={{ maxWidth: 520 }}>
          <nav style={{ fontSize: 12, color: "var(--ink-4)" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
            {" / "}
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>Order status</span>
          </nav>
          <Eyebrow>Track an order</Eyebrow>
          <h1 style={{ fontSize: 34, marginTop: 8 }}>Order status</h1>
          <p style={{ marginTop: 8, color: "var(--ink-3)", fontSize: 14.5 }}>
            Enter your order number and the email used at checkout.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "32px 24px 56px", maxWidth: 520 }}>
        <form onSubmit={lookup} className="card" style={{ padding: 22, display: "grid", gap: 12 }}>
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
          <div className="card" style={{ marginTop: 20, padding: 20, background: "var(--brand-tint)", border: "1px solid var(--brand)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: 15, color: "var(--ink)" }}>{order.order_number}</strong>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  textTransform: "uppercase",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--brand-2)",
                  background: "var(--bg)",
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                <IconClockSimple size={11} />
                {order.status}
              </span>
            </div>
            <div style={{ marginTop: 14, background: "var(--bg)", borderRadius: "var(--radius-md)", padding: 14, fontSize: 13, color: "var(--ink-3)" }}>
              {order.items.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                  <span>
                    {item.quantity} × {item.product_title}
                  </span>
                  <span>${item.price}</span>
                </div>
              ))}
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", fontWeight: 700, color: "var(--ink)" }}>
                <span>Total</span>
                <span>${order.total}</span>
              </div>
            </div>
          </div>
        )}

        <p style={{ marginTop: 20, fontSize: 12.5, color: "var(--ink-4)", textAlign: "center" }}>
          Can&apos;t find your order?{" "}
          <Link href="/contact" style={{ color: "var(--brand-2)" }}>
            Contact support
          </Link>
        </p>
      </div>
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
