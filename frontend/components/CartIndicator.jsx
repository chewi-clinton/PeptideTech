"use client";

import Link from "next/link";
import { useCart } from "@/context/CartProvider";
import { IconCart } from "@/components/icons";

export default function CartIndicator() {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      aria-label="Cart"
      style={{
        position: "relative",
        display: "inline-flex",
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-md)",
        color: "var(--ink)",
      }}
    >
      <IconCart size={19} />
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: 2,
            right: 2,
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
