import Link from "next/link";
import { api } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const [categories, products] = await Promise.all([
    api.categories.list().catch(() => []),
    api.products.list().catch(() => []),
  ]);
  const featured = products.slice(0, 8);

  return (
    <div>
      <section style={{ padding: "56px 0 40px" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
          <h1>
            Peptides for sale,
            <br />
            <span className="font-serif-italic">verified to the molecule.</span>
          </h1>
          <p style={{ marginTop: 16, color: "var(--ink-3)", fontSize: 16 }}>
            HPLC-verified 98%+ purity with a third-party Certificate of Analysis on every batch.
            Cold-chain shipping and lot traceability included.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
            <Link href="/shop" className="btn-primary" style={{ textDecoration: "none" }}>
              Shop catalog
            </Link>
            <Link
              href="/coa"
              style={{
                padding: "12px 20px",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                color: "var(--ink-2)",
                fontWeight: 600,
              }}
            >
              Verify a batch
            </Link>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-tint)", padding: "48px 0" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", fontSize: 28 }}>Shop by category</h2>
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 16,
            }}
          >
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/c/${c.slug}`}
                className="card"
                style={{ padding: 20, textDecoration: "none", textAlign: "center" }}
              >
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{c.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <h2 style={{ fontSize: 28 }}>Featured peptides</h2>
            <Link href="/shop" style={{ fontSize: 13, color: "var(--brand-2)", textDecoration: "none" }}>
              View all products →
            </Link>
          </div>
          <div
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
