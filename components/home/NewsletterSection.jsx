"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section style={{ padding: "72px 0" }}>
      <div className="container">
        <div
          className="card"
          style={{
            background: "var(--brand-tint)",
            border: "none",
            padding: "48px 24px",
            textAlign: "center",
            maxWidth: 640,
            margin: "0 auto",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              background: "var(--bg)",
              fontSize: 12,
              fontWeight: 700,
              padding: "5px 12px",
              borderRadius: 999,
              color: "var(--ink-2)",
            }}
          >
            Restock alerts &amp; new-batch COAs
          </span>
          <h2 style={{ fontSize: 28, marginTop: 16 }}>Get the latest research, first.</h2>
          <p style={{ marginTop: 8, fontSize: 14.5, color: "var(--ink-3)" }}>
            New batch releases, restock alerts, and analytical insights — straight to your inbox. No
            spam, ever.
          </p>

          <form onSubmit={handleSubmit} style={{ marginTop: 20, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                padding: "12px 16px",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                width: 260,
                background: "var(--bg)",
                color: "var(--ink)",
              }}
            />
            <button type="submit" className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
              {submitted ? "Joined ✓" : "Join the list"}
            </button>
          </form>
          <p style={{ marginTop: 10, fontSize: 11.5, fontFamily: "var(--font-mono-stack)", color: "var(--ink-4)", letterSpacing: "0.04em" }}>
            Research professionals only · 21+
          </p>
        </div>
      </div>
    </section>
  );
}
