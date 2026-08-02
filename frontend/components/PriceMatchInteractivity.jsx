"use client";

import { useEffect, useRef } from "react";

const ACTIVE = { background: "var(--bg)", boxShadow: "0 1px 2px rgba(15, 23, 42, 0.08)", color: "var(--ink)" };
const INACTIVE = { background: "transparent", boxShadow: "none", color: "var(--ink-3)" };

function priceOf(row) {
  const el = row.querySelector('div[style*="font-weight:800"]');
  return el ? parseFloat(el.textContent.replace(/[^0-9.]/g, "")) || 0 : 0;
}

function titleOf(row) {
  return row.querySelector("button span")?.textContent.trim() || "";
}

// Progressively enhances the live site's scraped price-comparison table:
// real search (filters the 73 real product rows), real sort (Price / A-Z,
// re-ordering the actual DOM rows by their real displayed values), and
// visual press-state for the Coverage/Sort toggle groups. There's no backend
// behind "Full catalog" in this rebuild (that view pulls in un-compared
// catalog items we never scraped), so that toggle stays visual-only.
export default function PriceMatchInteractivity({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cleanups = [];

    const rows = Array.from(root.querySelectorAll('div[style*="border-bottom:1px solid var(--line)"]')).filter(
      (div) => div.querySelector("button")
    );
    const rowsParent = rows[0]?.parentElement;
    const originalOrder = rows.slice();

    // Toggle groups: [role="group"] with aria-pressed buttons (Coverage, Sort).
    root.querySelectorAll('[role="group"]').forEach((group) => {
      const buttons = Array.from(group.querySelectorAll("button[aria-pressed]"));
      buttons.forEach((btn) => {
        const onClick = () => {
          buttons.forEach((b) => {
            const active = b === btn;
            b.setAttribute("aria-pressed", String(active));
            Object.assign(b.style, active ? ACTIVE : INACTIVE);
          });

          if (group.getAttribute("aria-label") === "Sort" && rowsParent) {
            const label = btn.textContent.trim();
            let ordered = originalOrder;
            if (label === "Price") ordered = [...rows].sort((a, b2) => priceOf(a) - priceOf(b2));
            else if (label === "A-Z") ordered = [...rows].sort((a, b2) => titleOf(a).localeCompare(titleOf(b2)));
            ordered.forEach((row) => rowsParent.appendChild(row));
          }
        };
        btn.addEventListener("click", onClick);
        cleanups.push(() => btn.removeEventListener("click", onClick));
      });
    });

    // Real search: filters the actual comparison rows by visible text.
    const searchInput = root.querySelector('input[aria-label="Search product or strength"]');
    if (searchInput) {
      const onInput = () => {
        const q = searchInput.value.trim().toLowerCase();
        for (const row of rows) {
          row.style.display = !q || row.textContent.toLowerCase().includes(q) ? "" : "none";
        }
      };
      searchInput.addEventListener("input", onInput);
      cleanups.push(() => searchInput.removeEventListener("input", onInput));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <div ref={ref}>{children}</div>;
}
