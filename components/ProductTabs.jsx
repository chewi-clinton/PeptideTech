"use client";

import { useEffect, useState } from "react";

const SPEC_RE = /specification/i;
const STORAGE_RE = /storage|handling|shipping/i;

// The scraped description_html is one flow of `.pep-pdp-ov-section` blocks
// (Overview, Research Background, Specifications, Storage & Handling, ...).
// Split it back into named groups so it can render as real tab panels
// instead of one long scroll, without inventing any content that wasn't
// actually scraped.
function splitSections(html) {
  if (!html) return { overview: html, specs: null, storage: null };
  const doc = new DOMParser().parseFromString(html, "text/html");
  const sections = Array.from(doc.querySelectorAll(".pep-pdp-ov-section"));
  if (sections.length === 0) return { overview: html, specs: null, storage: null };

  const overview = document.createElement("div");
  const specs = document.createElement("div");
  const storage = document.createElement("div");

  for (const section of sections) {
    const heading = section.querySelector(".pep-pdp-ov-h")?.textContent || "";
    if (SPEC_RE.test(heading)) specs.appendChild(section);
    else if (STORAGE_RE.test(heading)) storage.appendChild(section);
    else overview.appendChild(section);
  }

  return {
    overview: overview.childNodes.length ? overview.innerHTML : null,
    specs: specs.childNodes.length ? specs.innerHTML : null,
    storage: storage.childNodes.length ? storage.innerHTML : null,
  };
}

export default function ProductTabs({ descriptionHtml, coas = [] }) {
  // Render the full block under "Overview" on first paint (matches the
  // server-rendered markup exactly), then split it into real tab panels
  // once mounted — splitting during the initial render would make the
  // client's first render disagree with the server's and trigger a
  // hydration mismatch.
  const [sections, setSections] = useState({ overview: descriptionHtml, specs: null, storage: null });

  useEffect(() => {
    setSections(splitSections(descriptionHtml));
  }, [descriptionHtml]);

  const { overview, specs, storage } = sections;

  const tabs = [
    overview && { key: "overview", label: "Overview" },
    coas.length > 0 && { key: "coa", label: "Certificate of Analysis" },
    specs && { key: "specs", label: "Specifications" },
    storage && { key: "storage", label: "Shipping & Storage" },
  ].filter(Boolean);

  const [active, setActive] = useState(tabs[0]?.key);
  const current = active || tabs[0]?.key;

  if (tabs.length === 0) return null;

  return (
    <div style={{ maxWidth: 820 }}>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", borderBottom: "1px solid var(--line)" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            style={{
              padding: "12px 16px",
              background: "none",
              border: "none",
              borderBottom: `2px solid ${current === t.key ? "var(--brand)" : "transparent"}`,
              color: current === t.key ? "var(--ink)" : "var(--ink-3)",
              fontWeight: current === t.key ? 700 : 500,
              fontSize: 14,
              cursor: "pointer",
              marginBottom: -1,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ paddingTop: 24 }}>
        {current === "overview" && overview && (
          <div className="pep-pdp-overview" dangerouslySetInnerHTML={{ __html: overview }} />
        )}
        {current === "specs" && specs && (
          <div className="pep-pdp-overview" dangerouslySetInnerHTML={{ __html: specs }} />
        )}
        {current === "storage" && storage && (
          <div className="pep-pdp-overview" dangerouslySetInnerHTML={{ __html: storage }} />
        )}
        {current === "coa" && coas.length > 0 && (
          <div style={{ display: "grid", gap: 10 }}>
            {coas.map((coa) => (
              <div key={coa.id} className="card" style={{ padding: 14, display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13 }}>
                <span style={{ fontFamily: "var(--font-mono-stack)" }}>Lot {coa.lot_number}</span>
                {coa.purity_percent && <span>HPLC purity {coa.purity_percent}</span>}
                {coa.test_date && <span>Tested {coa.test_date}</span>}
                {coa.issuing_lab && <span>{coa.issuing_lab}</span>}
                {coa.file && (
                  <a
                    href={coa.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "auto", color: "var(--brand-2)", fontWeight: 600, textDecoration: "none" }}
                  >
                    View PDF →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
