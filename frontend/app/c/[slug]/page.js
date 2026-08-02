import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const category = await api.categories.get(slug);
    return { title: `${category.name} — Peptide Technologies` };
  } catch {
    return {};
  }
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  let category;
  try {
    category = await api.categories.get(slug);
  } catch {
    notFound();
  }
  const products = await api.products.list(`?category__slug=${slug}`).catch(() => []);

  return (
    <div className="container" style={{ padding: "40px 24px" }}>
      <h1 style={{ fontSize: 34 }}>{category.name}</h1>
      {category.description && (
        <p style={{ color: "var(--ink-3)", marginTop: 10, maxWidth: 720 }}>{category.description}</p>
      )}
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
