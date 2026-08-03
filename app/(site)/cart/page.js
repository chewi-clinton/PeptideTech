"use client";

import Link from "next/link";
import { useCart } from "@/context/CartProvider";

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, hydrated } = useCart();

  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 28 }}>Your cart is empty</h1>
        <Link href="/shop" className="btn-primary" style={{ display: "inline-block", marginTop: 20, textDecoration: "none" }}>
          Shop catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "40px 24px", maxWidth: 780 }}>
      <h1 style={{ fontSize: 30 }}>Your cart</h1>
      <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
        {items.map((item) => (
          <div
            key={item.variantId}
            className="card"
            style={{ padding: 16, display: "flex", alignItems: "center", gap: 16 }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: "var(--ink)" }}>{item.productTitle}</div>
              <div style={{ fontSize: 12, color: "var(--ink-4)" }}>{item.variantLabel}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: "var(--radius-md)" }}>
              <button
                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer" }}
              >
                −
              </button>
              <span style={{ width: 24, textAlign: "center", fontSize: 13 }}>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer" }}
              >
                +
              </button>
            </div>
            <div style={{ width: 70, textAlign: "right", fontWeight: 600 }}>
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button
              onClick={() => removeItem(item.variantId)}
              aria-label="Remove"
              style={{ background: "none", border: "none", color: "var(--ink-4)", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700 }}>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Link
        href="/checkout"
        className="btn-primary"
        style={{ display: "block", textAlign: "center", marginTop: 20, textDecoration: "none" }}
      >
        Proceed to checkout
      </Link>
    </div>
  );
}
