"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="container" style={{ padding: "60px 24px", maxWidth: 360 }}>
      <h1 style={{ fontSize: 26 }}>Admin login</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: 20, display: "grid", gap: 12 }}>
        <input
          required
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        {error && <p style={{ color: "var(--red)", fontSize: 13 }}>{error}</p>}
        <button type="submit" disabled={submitting} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
          {submitting ? "Signing in…" : "Sign in"}
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
