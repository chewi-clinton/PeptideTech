"use client";

import { useEffect, useRef } from "react";

// Progressively enhances scraped `dangerouslySetInnerHTML` content that was
// captured from a React page and therefore already carries the *markup* of
// interactive widgets (accordion buttons with aria-expanded, a search input)
// but none of the JS that used to drive them. Rather than reparsing the HTML
// back into React state (and risking dropping/duplicating real scraped
// content), this wires real event listeners onto the existing DOM nodes.
export default function StaticInteractivity({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cleanups = [];

    // Accordion pattern: <button aria-expanded="…">…</button> followed by a
    // sibling `grid-template-rows: 0fr|1fr` collapse panel, exactly as
    // scraped from the live FAQ/wholesale pages.
    root.querySelectorAll("button[aria-expanded]").forEach((btn) => {
      const panel = btn.nextElementSibling;
      if (!panel || !panel.style.gridTemplateRows) return;
      const chevron = btn.querySelector("span");
      const onClick = () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        panel.style.gridTemplateRows = open ? "0fr" : "1fr";
        if (chevron) chevron.style.transform = open ? "none" : "rotate(180deg)";
      };
      btn.addEventListener("click", onClick);
      cleanups.push(() => btn.removeEventListener("click", onClick));
    });

    // Search pattern: an <input aria-label="Search …"> filters the nearby
    // repeating accordion cards by visible text.
    root.querySelectorAll('input[aria-label^="Search"]').forEach((input) => {
      const items = Array.from(root.querySelectorAll("button[aria-expanded]")).map(
        (btn) => btn.parentElement
      );
      if (items.length === 0) return;
      const onInput = () => {
        const q = input.value.trim().toLowerCase();
        for (const item of items) {
          item.style.display = !q || item.textContent.toLowerCase().includes(q) ? "" : "none";
        }
      };
      input.addEventListener("input", onInput);
      cleanups.push(() => input.removeEventListener("input", onInput));
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <div ref={ref}>{children}</div>;
}
