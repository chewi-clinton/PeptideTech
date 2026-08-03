"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconX } from "@/components/icons";

export default function MobileNavToggle({ links }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        aria-label="Menu"
        onClick={() => setOpen(true)}
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

      {open && mounted && createPortal(
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(10, 24, 40, 0.4)",
              backdropFilter: "blur(2px)",
              animation: "pep-mobile-nav-fade 200ms ease",
            }}
          />
          <aside
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 300,
              maxWidth: "86vw",
              background: "var(--bg)",
              boxShadow: "var(--shadow-lg)",
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              animation: "pep-mobile-nav-slide 260ms ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontWeight: 600, letterSpacing: "-0.01em", fontSize: 15.84, color: "var(--ink)" }}>
                <Image src="/logo-pt.png" alt="Peptech" width={24} height={24} style={{ display: "inline-block", objectFit: "contain" }} />
                <span>
                  <span style={{ color: "var(--brand)" }}>PEPTIDE</span>TECH
                </span>
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  border: 0,
                  background: "transparent",
                  color: "var(--ink)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconX size={20} />
              </button>
            </div>

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  textAlign: "left",
                  padding: "13px 12px",
                  borderRadius: 10,
                  fontFamily: "var(--font-sans-stack)",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "var(--ink)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}

            <div style={{ marginTop: "auto" }}>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  height: 44,
                  padding: "0 20px",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  background: "var(--brand)",
                  color: "#fff",
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                Shop catalog
              </Link>
            </div>
          </aside>

          <style>{`
            @keyframes pep-mobile-nav-fade { from { opacity: 0; } to { opacity: 1; } }
            @keyframes pep-mobile-nav-slide { from { transform: translateX(-100%); } to { transform: none; } }
          `}</style>
        </div>,
        document.body
      )}
    </div>
  );
}
