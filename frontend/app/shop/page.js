import { api } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export const metadata = { title: "Shop — Peptide Technologies" };

export default async function ShopPage() {
  const products = await api.products.list().catch(() => []);
  return (
    <div className="container" style={{ padding: "40px 24px" }}>
      <h1 style={{ fontSize: 34 }}>Shop all products</h1>
      <p style={{ color: "var(--ink-3)", marginTop: 8 }}>{products.length} research peptides</p>
      <div
        style={{
          marginTop: 28,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 18,
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
