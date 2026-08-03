"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartProvider";
import FreeShippingProgress from "@/components/FreeShippingProgress";

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
    <div className="container" style={{ padding: "40px 24px", maxWidth: 1080 }}>
      <h1 style={{ fontSize: 30 }}>Shopping cart</h1>

      <div className="pep-cart-grid" style={{ marginTop: 24, display: "grid", gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)", gap: 24, alignItems: "start" }}>
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((item) => (
            <div key={item.variantId} className="card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0, background: "var(--bg-tint)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                {item.image && <Image src={item.image} alt="" fill style={{ objectFit: "contain", padding: 4 }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>{item.productTitle}</div>
                <div style={{ fontSize: 12, color: "var(--ink-4)" }}>{item.variantLabel}</div>
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
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
                  <button
                    onClick={() => removeItem(item.variantId)}
                    aria-label="Remove"
                    style={{ background: "none", border: "none", color: "var(--ink-4)", cursor: "pointer" }}
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div style={{ fontWeight: 700, color: "var(--ink)", flexShrink: 0 }}>${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)", marginBottom: 14 }}>Order summary</div>
            <FreeShippingProgress subtotal={total} variant="card" />

            <div style={{ marginTop: 16, display: "grid", gap: 8, fontSize: 13.5 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--ink-3)" }}>Subtotal</span>
                <span style={{ fontWeight: 600, color: "var(--ink)" }}>${total.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--ink-3)" }}>Shipping</span>
                <span style={{ color: "var(--ink-4)" }}>Calculated at checkout</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--ink-3)" }}>Tax</span>
                <span style={{ color: "var(--ink-4)" }}>Calculated at checkout</span>
              </div>
            </div>

            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>
              <span>Estimated total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="btn-primary"
              style={{ display: "block", textAlign: "center", marginTop: 16, textDecoration: "none" }}
            >
              Proceed to checkout
            </Link>

            <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 11.5, color: "var(--ink-4)", textAlign: "center" }}>
              We accept Apple Pay &amp; Google Pay at checkout
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pep-cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
