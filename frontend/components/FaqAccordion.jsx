"use client";

import { useMemo, useState } from "react";
import { IconChevronDown, IconSearchLarge } from "@/components/icons";

export default function FaqAccordion({ items }) {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) => it.question.toLowerCase().includes(q) || it.answer.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div>
      <div style={{ position: "relative", marginBottom: 20 }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--ink-4)" }}>
          <IconSearchLarge size={16} />
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search help articles…"
          aria-label="Search help articles"
          style={{
            width: "100%",
            height: 44,
            padding: "0 14px 0 40px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--line-2)",
            background: "var(--bg)",
            color: "var(--ink)",
            fontSize: 15,
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.question} className="card" style={{ overflow: "hidden" }}>
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "18px 20px",
                  background: "none",
                  border: 0,
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--ink)",
                }}
              >
                {item.question}
                <span
                  style={{
                    flexShrink: 0,
                    color: "var(--brand)",
                    display: "inline-flex",
                    transform: isOpen ? "rotate(180deg)" : "none",
                    transition: "transform 240ms ease",
                  }}
                >
                  <IconChevronDown size={18} />
                </span>
              </button>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 260ms ease",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <div style={{ padding: "0 20px 20px", fontSize: 14, lineHeight: 1.65, color: "var(--ink-3)", whiteSpace: "pre-line" }}>
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p style={{ color: "var(--ink-4)", fontSize: 14, padding: "12px 4px" }}>
            No help articles match &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>
    </div>
  );
}
