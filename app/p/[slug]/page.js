import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import ProductBuyBox from "@/components/ProductBuyBox";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const product = await api.products.get(slug);
    return { title: `${product.title} — Peptide Technologies` };
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

  return (
    <div className="container" style={{ padding: "24px" }}>
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
          <div
            className="card"
            style={{ position: "relative", aspectRatio: "1", background: "var(--bg-tint)" }}
          >
            {product.images?.[0] && (
              <Image
                src={product.images[0].image}
                alt={product.images[0].alt_text || product.title}
                fill
                style={{ objectFit: "contain", padding: 24 }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>
          {product.images?.length > 1 && (
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              {product.images.map((img) => (
                <div
                  key={img.id}
                  className="card"
                  style={{ position: "relative", width: 64, height: 64, background: "var(--bg-tint)" }}
                >
                  <Image src={img.image} alt={img.alt_text || ""} fill style={{ objectFit: "contain", padding: 6 }} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.category && (
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--brand-2)", letterSpacing: "0.06em" }}>
              RESEARCH PEPTIDE · {product.category.name.toUpperCase()}
            </div>
          )}
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

      {product.description_html && (
        <div
          className="pep-pdp-overview"
          style={{ marginTop: 56, maxWidth: 820 }}
          dangerouslySetInnerHTML={{ __html: product.description_html }}
        />
      )}

      {product.coas?.length > 0 && (
        <section style={{ marginTop: 40, maxWidth: 820 }}>
          <h2 style={{ fontSize: 22 }}>Certificates of Analysis</h2>
          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            {product.coas.map((coa) => (
              <div key={coa.id} className="card" style={{ padding: 14, display: "flex", gap: 16, fontSize: 13 }}>
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
        </section>
      )}

      {product.faq_html && (
        <section style={{ marginTop: 56, maxWidth: 820 }}>
          <h2 style={{ fontSize: 26 }}>{product.title} — frequently asked questions</h2>
          <div style={{ marginTop: 14 }} dangerouslySetInnerHTML={{ __html: product.faq_html }} />
        </section>
      )}
    </div>
  );
}
