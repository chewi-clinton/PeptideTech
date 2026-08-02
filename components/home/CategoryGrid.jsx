import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { IconArrowRight } from "@/components/icons";

export default function CategoryGrid({ categories }) {
  return (
    <section style={{ background: "var(--bg-tint)", padding: "72px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <Eyebrow>Browse the catalog</Eyebrow>
          <h2 style={{ fontSize: 34, marginTop: 10 }}>Shop by category</h2>
          <p style={{ marginTop: 10, color: "var(--ink-3)", fontSize: 15 }}>
            HPLC-verified research SKUs across every category — each third-party tested with a public
            Certificate of Analysis.
          </p>
        </div>

        <div
          className="pep-category-grid"
          style={{
            marginTop: 32,
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 16,
          }}
        >
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/c/${c.slug}`}
              className="card"
              style={{ padding: 18, textDecoration: "none", display: "flex", flexDirection: "column", gap: 12 }}
            >
              <div style={{ position: "relative", width: 40, height: 40, background: "var(--bg-tint)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                {c.image && <Image src={c.image} alt="" fill style={{ objectFit: "contain", padding: 4 }} />}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>{c.name}</span>
                  <span style={{ fontSize: 12, color: "var(--ink-4)" }}>{c.count}</span>
                </div>
                <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.5 }}>{c.description}</p>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "var(--brand-2)" }}>
                Shop now
                <IconArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
