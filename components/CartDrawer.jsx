"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartProvider";
import { IconCheck, IconX } from "@/components/icons";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, total } = useCart();

  return (
    <>
      <div
        onClick={closeDrawer}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10,24,40,0.4)",
          zIndex: 90,
          opacity: isDrawerOpen ? 1 : 0,
          pointerEvents: isDrawerOpen ? "auto" : "none",
          transition: "opacity 200ms ease",
        }}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-label="Cart"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(420px, 100vw)",
          background: "var(--bg)",
          zIndex: 91,
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-lg)",
          transform: isDrawerOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 220ms ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>
            <span
              style={{
                width: 22,
                height: 22,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--brand-tint)",
                color: "var(--brand-2)",
                borderRadius: "50%",
              }}
            >
              <IconCheck size={12} />
            </span>
            Added to cart
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-3)", padding: 4 }}
          >
            <IconX size={16} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px" }}>
          {items.length === 0 ? (
            <p style={{ color: "var(--ink-4)", fontSize: 13.5, marginTop: 20 }}>Your cart is empty.</p>
          ) : (
            <div style={{ display: "grid", gap: 14 }}>
              {items.map((item) => (
                <div key={item.variantId} style={{ display: "flex", gap: 12, paddingBottom: 14, borderBottom: "1px solid var(--line)" }}>
                  <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0, background: "var(--bg-tint)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                    {item.image && <Image src={item.image} alt="" fill style={{ objectFit: "contain", padding: 4 }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{item.productTitle}</div>
                    {item.variantLabel && <div style={{ fontSize: 12, color: "var(--ink-4)" }}>{item.variantLabel}</div>}
                    <div style={{ marginTop: 6, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)" }}>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          style={{ padding: "3px 9px", background: "none", border: "none", cursor: "pointer" }}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span style={{ fontSize: 12.5, width: 20, textAlign: "center" }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          style={{ padding: "3px 9px", background: "none", border: "none", cursor: "pointer" }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.variantId)}
                    aria-label="Remove item"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-4)", alignSelf: "flex-start" }}
                  >
                    <IconX size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: 20, borderTop: "1px solid var(--line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="btn-primary"
              style={{ display: "block", textAlign: "center", marginTop: 14, textDecoration: "none" }}
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeDrawer}
              style={{ display: "block", textAlign: "center", marginTop: 10, fontSize: 13, fontWeight: 600, color: "var(--ink-2)", textDecoration: "none" }}
            >
              View cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
