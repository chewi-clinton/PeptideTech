"use client";

import { useState } from "react";
import { IconChevronDown } from "@/components/icons";

// Products scrape their FAQ as `.faq-item` h4/p pairs; categories scrape
// theirs as a `<dl>` of dt/dd pairs (each site section used a different
// component on the live site) — support both shapes.
const FAQ_ITEM_RE = /<div class="faq-item">\s*<h4>([\s\S]*?)<\/h4>\s*<p>([\s\S]*?)<\/p>\s*<\/div>/g;
const DT_DD_RE = /<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/g;

function parseFaq(html) {
  if (!html) return [];
  const items = [];
  let match;
  while ((match = FAQ_ITEM_RE.exec(html)) !== null) {
    items.push({ question: match[1], answer: match[2] });
  }
  while ((match = DT_DD_RE.exec(html)) !== null) {
    items.push({ question: match[1], answer: match[2] });
  }
  return items;
}

export default function ProductFaqAccordion({ faqHtml, title }) {
  const items = parseFaq(faqHtml);
  const [openIndex, setOpenIndex] = useState(0);

  if (items.length === 0) return null;

  return (
    <section style={{ marginTop: 56, maxWidth: 820 }}>
      <h2 style={{ fontSize: 26 }}>{title} — frequently asked questions</h2>
      <div style={{ marginTop: 14 }}>
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="faq-item">
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <h4 style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: item.question }} />
                <span
                  style={{
                    flexShrink: 0,
                    color: "var(--ink-4)",
                    transform: isOpen ? "rotate(180deg)" : "none",
                    transition: "transform 150ms ease",
                  }}
                >
                  <IconChevronDown size={16} />
                </span>
              </button>
              {isOpen && (
                <p style={{ marginTop: 8 }} dangerouslySetInnerHTML={{ __html: item.answer }} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
