import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import ProductFaqAccordion from "@/components/ProductFaqAccordion";

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
      <nav style={{ fontSize: 12, color: "var(--ink-4)", marginBottom: 16 }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </Link>
        {" / "}
        <Link href="/shop" style={{ textDecoration: "none", color: "inherit" }}>
          Shop
        </Link>
        {" / "}
        {category.name}
      </nav>
      <h1 style={{ fontSize: 34 }}>{category.name}</h1>
      {category.description && (
        <p style={{ color: "var(--ink-3)", marginTop: 10, maxWidth: 720 }}>{category.description}</p>
      )}
      <div
        className="pep-product-grid"
        style={{
          marginTop: 28,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 18,
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} mode="view" />
        ))}
      </div>

      {category.extra_html && (
        <div
          className="pep-pdp-prose"
          style={{ marginTop: 48, maxWidth: 780, fontSize: 14.5, lineHeight: 1.75, color: "var(--ink-2)" }}
          dangerouslySetInnerHTML={{ __html: category.extra_html }}
        />
      )}

      <ProductFaqAccordion faqHtml={category.faq_html} title={category.name} />
    </div>
  );
}
