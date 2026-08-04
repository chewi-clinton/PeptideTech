import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import ProductBuyBox from "@/components/ProductBuyBox";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import ProductTabs from "@/components/ProductTabs";
import ProductFaqAccordion from "@/components/ProductFaqAccordion";
import Eyebrow from "@/components/Eyebrow";
import { IconArrowRight } from "@/components/icons";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, productJsonLd, stripHtml, truncate } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const product = await api.products.get(slug);
    const image = product.images?.find((img) => img.is_primary)?.image || product.images?.[0]?.image;
    return buildMetadata({
      title: product.title,
      description: truncate(stripHtml(product.short_description), 160),
      keywords: [
        product.title,
        product.category?.name,
        "research peptide",
        `${product.title} for sale`,
        `buy ${product.title}`,
        product.purity ? `${product.title} ${product.purity} purity` : undefined,
        "Certificate of Analysis",
      ].filter(Boolean),
      path: `/p/${slug}`,
      image,
      type: "website",
    });
  } catch {
    return {};
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  let product;
  try {
    product = await api.products.get(slug);
  } catch {
    notFound();
  }

  const [relatedAll, guides] = await Promise.all([
    product.category
      ? api.products.list(`?category__slug=${product.category.slug}`).catch(() => [])
      : Promise.resolve([]),
    api.blog.list().catch(() => []),
  ]);
  const related = relatedAll.filter((p) => p.slug !== product.slug).slice(0, 4);
  const relatedGuides = guides.slice(0, 2);

  return (
    <div className="container" style={{ padding: "24px" }}>
      <JsonLd data={productJsonLd(product, `/p/${slug}`)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          ...(product.category ? [{ name: product.category.name, path: `/c/${product.category.slug}` }] : []),
          { name: product.title, path: `/p/${slug}` },
        ])}
      />
      <nav style={{ fontSize: 12, color: "var(--ink-4)", marginBottom: 16 }}>
        <Link href="/shop" style={{ textDecoration: "none", color: "inherit" }}>
          Shop
        </Link>
        {product.category && (
          <>
            {" / "}
            <Link href={`/c/${product.category.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              {product.category.name}
            </Link>
          </>
        )}
        {" / "}
        {product.title}
      </nav>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="md:grid-cols-2">
        <div>
          <ProductGallery images={product.images} title={product.title} />
        </div>

        <div>
          {product.category && <Eyebrow>Research peptide · {product.category.name}</Eyebrow>}
          <h1 style={{ fontSize: 34, marginTop: 6 }}>{product.title}</h1>
          {product.short_description && (
            <p style={{ marginTop: 12, color: "var(--ink-3)", fontSize: 14, lineHeight: 1.6 }}>
              {product.short_description}
            </p>
          )}

          <div style={{ marginTop: 20 }}>
            <ProductBuyBox product={product} />
          </div>
        </div>
      </div>

      {(product.description_html || product.coas?.length > 0) && (
        <div style={{ marginTop: 56 }}>
          <ProductTabs descriptionHtml={product.description_html} coas={product.coas} />
        </div>
      )}

      <ProductFaqAccordion faqHtml={product.faq_html} title={product.title} />

      {relatedGuides.length > 0 && (
        <section style={{ marginTop: 56, maxWidth: 820 }}>
          <Eyebrow>From the lab</Eyebrow>
          <h2 style={{ fontSize: 24, marginTop: 8 }}>Research &amp; guides</h2>
          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
            {relatedGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/blog/${g.slug}`}
                className="card"
                style={{ padding: 16, textDecoration: "none", display: "block" }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{g.title}</div>
                {g.excerpt && <p style={{ marginTop: 6, fontSize: 12.5, color: "var(--ink-3)" }}>{g.excerpt}</p>}
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 8, fontSize: 12.5, fontWeight: 600, color: "var(--brand-2)" }}>
                  Read the article
                  <IconArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section style={{ marginTop: 56 }}>
          <Eyebrow>Keep exploring</Eyebrow>
          <h2 style={{ fontSize: 24, marginTop: 8 }}>Related research peptides</h2>
          <div
            className="pep-product-grid"
            style={{
              marginTop: 16,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
