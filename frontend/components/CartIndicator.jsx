"use client";

import Link from "next/link";
import { useCart } from "@/context/CartProvider";

export default function CartIndicator() {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      aria-label="Cart"
      style={{ position: "relative", display: "inline-flex", padding: "8px", color: "var(--ink)" }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 6h15l-1.5 9h-12L5 3H2"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="20" r="1.5" fill="currentColor" />
        <circle cx="18" cy="20" r="1.5" fill="currentColor" />
      </svg>
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            background: "var(--brand)",
            color: "#fff",
            borderRadius: "999px",
            fontSize: "10px",
            fontWeight: 700,
            padding: "1px 5px",
          }}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
