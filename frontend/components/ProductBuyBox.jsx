"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartProvider";
import { IconCheck, IconGift, IconIdentity, IconLightning, IconPurity, IconShield } from "@/components/icons";

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
      image: product.primary_image,
      openDrawer: true,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div>
      {product.purity && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, fontSize: 12.5, fontWeight: 600, color: "var(--brand-2)" }}>
          <IconIdentity size={13} />
          Third-party COA on file
        </div>
      )}

      {variants.length >= 1 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--ink-4)", marginBottom: 6 }}>
            <span style={{ textTransform: "uppercase", letterSpacing: "0.04em" }}>Strength</span>
            <span style={{ fontFamily: "var(--font-mono-stack)" }}>{variant.sku}</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
                  textAlign: "left",
                }}
              >
                <div>{v.label}</div>
                <div style={{ fontWeight: 700, fontSize: 12.5, marginTop: 2 }}>
                  ${v.price}
                  {!v.in_stock && <span style={{ fontWeight: 400, color: "var(--ink-4)" }}> · backorder</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="card" style={{ padding: 20, background: "var(--brand-tint)", border: "1px solid var(--brand)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 30, fontWeight: 700, color: "var(--ink)" }}>${variant.price}</span>
            {variant.compare_at_price && (
              <span style={{ fontSize: 15, color: "var(--ink-4)", textDecoration: "line-through" }}>
                ${variant.compare_at_price}
              </span>
            )}
          </div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12.5,
              fontWeight: 600,
              color: variant.in_stock ? "var(--brand-2)" : "var(--ink-4)",
            }}
          >
            <IconLightning size={13} />
            {variant.in_stock ? "Fast shipping · in stock" : "Backordered — ships once restocked"}
          </span>
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: "var(--radius-md)" }}>
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
          No card required at checkout — pay via Zelle, Chime, Apple Pay, Cash App, E-Transfer, Bank
          Transfer, PayID, or Crypto after your order is placed.
        </p>
      </div>

      <ul style={{ marginTop: 16, display: "grid", gap: 10, listStyle: "none", padding: 0 }}>
        <li style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--ink-2)" }}>
          <IconGift size={16} style={{ color: "var(--brand-2)", flexShrink: 0, marginTop: 1 }} />
          Free gifts unlock as you spend
        </li>
        <li style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--ink-2)" }}>
          <IconShield size={14} style={{ color: "var(--brand-2)", flexShrink: 0, marginTop: 1 }} />
          Lot-traceable QR on every vial
        </li>
        <li style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--ink-2)" }}>
          <IconCheck size={14} style={{ color: "var(--brand-2)", flexShrink: 0, marginTop: 1 }} />
          98%+ purity or $1,000 back{" "}
          <Link href="/purity-guarantee-terms" style={{ color: "var(--brand-2)", textDecoration: "underline" }}>
            *Terms apply
          </Link>
        </li>
        <li style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--ink-2)" }}>
          <IconPurity size={14} style={{ color: "var(--brand-2)", flexShrink: 0, marginTop: 1 }} />
          HPLC-verified purity
        </li>
      </ul>
    </div>
  );
}
