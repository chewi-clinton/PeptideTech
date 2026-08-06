"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartProvider";
import { api, generateOrderNumber } from "@/lib/api";
import { IconArrowRight, IconCart } from "@/components/icons";

const PAYMENT_METHODS = [
  { value: "zelle", label: "Zelle" },
  { value: "chime", label: "Chime" },
  { value: "apple_pay", label: "Apple Pay" },
  { value: "cash_app", label: "Cash App" },
  { value: "e_transfer", label: "E-Transfer" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "payid", label: "PayID" },
  { value: "crypto", label: "Crypto" },
];

const initialForm = {
  customer_name: "",
  email: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "US",
};

const CRYPTO_DISCOUNT_RATE = 0.1;

export default function CheckoutPage() {
  const { items, total, clearCart, hydrated } = useCart();
  const [form, setForm] = useState(initialForm);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const router = useRouter();

  if (!hydrated) return null;

  const isCrypto = paymentMethod === "crypto";
  const payableTotal = isCrypto ? total * (1 - CRYPTO_DISCOUNT_RATE) : total;

  if (confirmedOrder) {
    return (
      <div className="container" style={{ padding: "60px 24px", maxWidth: 560, textAlign: "center" }}>
        <h1 style={{ fontSize: 28 }}>Order received</h1>
        <p style={{ marginTop: 12, color: "var(--ink-3)" }}>
          Your order number is{" "}
          <strong style={{ fontFamily: "var(--font-mono-stack)", color: "var(--ink)" }}>
            {confirmedOrder.order_number}
          </strong>
          . We have not charged you yet — payment instructions for{" "}
          {PAYMENT_METHODS.find((m) => m.value === confirmedOrder.payment_method)?.label} will follow
          by email.
        </p>
        <button
          onClick={() => router.push(`/order-status?order_number=${confirmedOrder.order_number}&email=${confirmedOrder.email}`)}
          className="btn-primary"
          style={{ marginTop: 20, border: "none", cursor: "pointer" }}
        >
          Track this order
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: "90px 24px", textAlign: "center" }}>
        <IconCart size={32} style={{ color: "var(--brand-2)" }} />
        <h1 style={{ fontSize: 26, marginTop: 16 }}>Your cart is empty</h1>
        <p style={{ marginTop: 8, color: "var(--ink-3)", fontSize: 14.5 }}>Add a research peptide to begin checkout.</p>
        <Link
          href="/shop"
          className="btn-primary"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20, textDecoration: "none" }}
        >
          Shop catalog
          <IconArrowRight size={14} style={{ color: "#fff" }} />
        </Link>
      </div>
    );
  }

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!paymentMethod) {
      setError("Select a payment method.");
      return;
    }
    if (!ageConfirmed) {
      setError("You must confirm you are at least 21 years old to place an order.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        order_number: generateOrderNumber(),
        ...form,
        payment_method: paymentMethod,
        status: "pending",
        total: payableTotal.toFixed(2),
        items: items.map((i) => ({
          product_title: `${i.productTitle} (${i.variantLabel})`,
          quantity: i.quantity,
          price: i.price,
          image_url: i.image || "",
        })),
      };
      const order = await api.orders.create(payload);
      clearCart();
      setConfirmedOrder(order);
    } catch (err) {
      setError("Could not submit order. Please check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container" style={{ padding: "40px 24px", maxWidth: 640 }}>
      <h1 style={{ fontSize: 30 }}>Checkout</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 24, display: "grid", gap: 24 }}>
        <fieldset style={{ border: "none", padding: 0, display: "grid", gap: 12 }}>
          <legend style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-4)", marginBottom: 8 }}>
            CONTACT
          </legend>
          <input
            required
            placeholder="Full name"
            value={form.customer_name}
            onChange={(e) => updateField("customer_name", e.target.value)}
            style={inputStyle}
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            style={inputStyle}
          />
        </fieldset>

        <fieldset style={{ border: "none", padding: 0, display: "grid", gap: 12 }}>
          <legend style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-4)", marginBottom: 8 }}>
            SHIPPING ADDRESS
          </legend>
          <input
            required
            placeholder="Address line 1"
            value={form.address_line1}
            onChange={(e) => updateField("address_line1", e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Address line 2 (optional)"
            value={form.address_line2}
            onChange={(e) => updateField("address_line2", e.target.value)}
            style={inputStyle}
          />
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)", gap: 12 }}>
            <input
              required
              placeholder="City"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="State"
              value={form.state}
              onChange={(e) => updateField("state", e.target.value)}
              style={inputStyle}
            />
            <input
              required
              placeholder="ZIP"
              value={form.postal_code}
              onChange={(e) => updateField("postal_code", e.target.value)}
              style={inputStyle}
            />
          </div>
          <input
            required
            placeholder="Country"
            value={form.country}
            onChange={(e) => updateField("country", e.target.value)}
            style={inputStyle}
          />
        </fieldset>

        <fieldset style={{ border: "none", padding: 0 }}>
          <legend style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-4)", marginBottom: 8 }}>
            PAYMENT METHOD
          </legend>
          <div className="pep-payment-grid" style={{ display: "grid", gap: 8 }}>
            {PAYMENT_METHODS.map((m) => (
              <button
                type="button"
                key={m.value}
                onClick={() => setPaymentMethod(m.value)}
                style={{
                  padding: "12px 8px",
                  fontSize: 12.5,
                  fontWeight: 600,
                  borderRadius: "var(--radius-md)",
                  border: `1px solid ${paymentMethod === m.value ? "var(--brand)" : "var(--line)"}`,
                  background: paymentMethod === m.value ? "var(--brand-tint)" : "transparent",
                  cursor: "pointer",
                  color: "var(--ink)",
                }}
              >
                {m.label}
                {m.value === "crypto" && (
                  <span style={{ display: "block", fontSize: 10, fontWeight: 700, color: "var(--brand-2)", marginTop: 2 }}>
                    10% off
                  </span>
                )}
              </button>
            ))}
          </div>
          <p style={{ marginTop: 10, fontSize: 12, color: "var(--ink-4)" }}>
            No card details are collected here — payment instructions for your selected method are
            sent after your order is placed.
          </p>
        </fieldset>

        <div>
          {isCrypto && (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--ink-3)" }}>
              <span>Subtotal</span>
              <span style={{ textDecoration: "line-through" }}>${total.toFixed(2)}</span>
            </div>
          )}
          {isCrypto && (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--brand-2)", marginTop: 4 }}>
              <span>Crypto discount (10%)</span>
              <span>-${(total - payableTotal).toFixed(2)}</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700, marginTop: isCrypto ? 8 : 0 }}>
            <span>Total</span>
            <span>${payableTotal.toFixed(2)}</span>
          </div>
        </div>

        <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: "var(--ink-3)", cursor: "pointer" }}>
          <input
            type="checkbox"
            required
            checked={ageConfirmed}
            onChange={(e) => setAgeConfirmed(e.target.checked)}
            style={{ marginTop: 2 }}
          />
          I confirm I am at least 21 years old and am purchasing these research materials for
          qualified laboratory research use only.
        </label>

        {error && <p style={{ color: "var(--red)", fontSize: 13 }}>{error}</p>}

        <button type="submit" disabled={submitting} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
          {submitting ? "Placing order…" : "Place order"}
        </button>
      </form>
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
