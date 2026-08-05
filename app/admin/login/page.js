"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { IconLock, IconEye, IconEyeOff } from "@/components/icons";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const { token } = await api.auth.login(username, password);
      window.localStorage.setItem("peptidetech_admin_token", token);
      router.push("/admin/orders");
    } catch {
      setError("Invalid credentials.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-tint)",
        padding: 24,
      }}
    >
      <div className="card" style={{ width: "100%", maxWidth: 380, padding: 32 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 18, color: "var(--ink)" }}>
            <span style={{ color: "var(--brand)" }}>PEPTIDE</span>TECH
          </span>
        </div>
        <h1 style={{ fontSize: 20, textAlign: "center", color: "var(--ink)" }}>Admin login</h1>
        <p style={{ marginTop: 6, fontSize: 13, textAlign: "center", color: "var(--ink-3)" }}>
          Sign in to manage products and orders.
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: 24, display: "grid", gap: 12 }}>
          <input
            required
            autoFocus
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
          <div style={{ position: "relative" }}>
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...inputStyle, width: "100%", paddingRight: 40 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{
                position: "absolute",
                top: "50%",
                right: 10,
                transform: "translateY(-50%)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "none",
                padding: 4,
                cursor: "pointer",
                color: "var(--ink-4)",
              }}
            >
              {showPassword ? <IconEyeOff size={17} /> : <IconEye size={17} />}
            </button>
          </div>
          {error && <p style={{ color: "var(--red)", fontSize: 13, margin: 0 }}>{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, border: "none", cursor: "pointer", padding: "12px" }}
          >
            <IconLock size={14} style={{ color: "#fff" }} />
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px 14px",
  border: "1px solid var(--line)",
  borderRadius: "var(--radius-md)",
  fontSize: 14,
  fontFamily: "inherit",
  background: "var(--bg)",
  color: "var(--ink)",
};
