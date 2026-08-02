"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileNavToggle({ links }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden" style={{ position: "static" }}>
      <button
        aria-label="Menu"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          border: 0,
          background: "transparent",
          color: "var(--ink)",
          cursor: "pointer",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M3 7h18M3 12h18M3 17h18" />
          </g>
        </svg>
      </button>

      {open && (
        <nav
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 50,
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            background: "var(--bg)",
            padding: "12px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            boxShadow: "var(--shadow)",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ padding: "10px 0", fontSize: 15, fontWeight: 500, color: "var(--ink-2)", textDecoration: "none" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
