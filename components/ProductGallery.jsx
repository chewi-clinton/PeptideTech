"use client";

import { useState } from "react";
import Image from "next/image";
import WaveBackground from "@/components/WaveBackground";
import { IconSearchLarge, IconX } from "@/components/icons";

export default function ProductGallery({ images, title }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const current = images?.[active];

  return (
    <div>
      <div
        className="card"
        style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "var(--bg)" }}
      >
        <WaveBackground opacity={0.06} />
        {current && (
          <Image
            src={current.image}
            alt={current.alt_text || title}
            fill
            style={{ objectFit: "contain", padding: 24 }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
        {current && (
          <button
            onClick={() => setZoomed(true)}
            aria-label="Expand image"
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 34,
              height: 34,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg)",
              border: "1px solid var(--line)",
              borderRadius: "50%",
              color: "var(--ink-2)",
              cursor: "pointer",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <IconSearchLarge size={15} />
          </button>
        )}
      </div>

      <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, color: "var(--ink-4)" }}>
        <span>Scan vial QR → live COA</span>
      </div>

      {images?.length > 1 && (
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className="card"
              style={{
                position: "relative",
                width: 64,
                height: 64,
                background: "var(--bg)",
                padding: 0,
                cursor: "pointer",
                border: i === active ? "1px solid var(--brand)" : "1px solid var(--line)",
              }}
            >
              <Image src={img.image} alt={img.alt_text || ""} fill style={{ objectFit: "contain", padding: 6 }} />
            </button>
          ))}
        </div>
      )}

      {zoomed && current && (
        <div
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-label={`${title} — expanded image`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(10,24,40,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
          }}
        >
          <button
            onClick={() => setZoomed(false)}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              width: 38,
              height: 38,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg)",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              color: "var(--ink)",
            }}
          >
            <IconX size={17} />
          </button>
          <div style={{ position: "relative", width: "min(720px, 90vw)", height: "min(720px, 80vh)" }}>
            <Image src={current.image} alt={current.alt_text || title} fill style={{ objectFit: "contain" }} />
          </div>
        </div>
      )}
    </div>
  );
}
