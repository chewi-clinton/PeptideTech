"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartProvider";

export default function ProductBuyBox({ product }) {
  const variants = product.variants || [];
  const [variantId, setVariantId] = useState(
    (variants.find((v) => v.is_default) || variants[0])?.id
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const variant = variants.find((v) => v.id === variantId);
  if (!variant) return null;

  function handleAddToCart() {
    addItem({
      variantId: variant.id,
      productTitle: product.title,
      variantLabel: variant.label,
      price: variant.price,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="card" style={{ padding: 20 }}>
      {variants.length > 1 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setVariantId(v.id)}
              style={{
                padding: "8px 14px",
                borderRadius: "var(--radius-md)",
                border: `1px solid ${v.id === variantId ? "var(--brand)" : "var(--line)"}`,
                background: v.id === variantId ? "var(--brand-tint)" : "transparent",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--ink)",
                cursor: "pointer",
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontSize: 30, fontWeight: 700, color: "var(--ink)" }}>${variant.price}</span>
        {variant.compare_at_price && (
          <span style={{ fontSize: 15, color: "var(--ink-4)", textDecoration: "line-through" }}>
            ${variant.compare_at_price}
          </span>
        )}
      </div>
      <div style={{ marginTop: 4, fontSize: 12, color: variant.in_stock ? "var(--green)" : "var(--red)" }}>
        {variant.in_stock ? "In stock · fast shipping" : "Out of stock"}
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            style={{ padding: "10px 14px", background: "none", border: "none", cursor: "pointer" }}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span style={{ width: 28, textAlign: "center", fontSize: 14 }}>{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            style={{ padding: "10px 14px", background: "none", border: "none", cursor: "pointer" }}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!variant.in_stock}
          className="btn-primary"
          style={{
            flex: 1,
            border: "none",
            cursor: variant.in_stock ? "pointer" : "not-allowed",
            opacity: variant.in_stock ? 1 : 0.5,
          }}
        >
          {added ? "Added ✓" : "Add to cart"}
        </button>
      </div>

      {added && (
        <button
          onClick={() => router.push("/cart")}
          style={{
            marginTop: 10,
            width: "100%",
            background: "none",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-md)",
            padding: "10px",
            fontSize: 13,
            color: "var(--ink-2)",
            cursor: "pointer",
          }}
        >
          View cart
        </button>
      )}

      <p style={{ marginTop: 14, fontSize: 11.5, color: "var(--ink-4)" }}>
        No card required at checkout — pay via Zelle, Chime, Apple Pay, Cash App, E-Transfer, Venmo,
        PayID, or Crypto after your order is placed.
      </p>
    </div>
  );
}
