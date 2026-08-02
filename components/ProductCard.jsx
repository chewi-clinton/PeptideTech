import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const defaultVariant = product.variants?.find((v) => v.is_default) || product.variants?.[0];
  return (
    <Link
      href={`/p/${product.slug}`}
      className="card"
      style={{ display: "block", overflow: "hidden", textDecoration: "none" }}
    >
      <div style={{ position: "relative", aspectRatio: "1", background: "var(--bg-tint)" }}>
        {product.primary_image && (
          <Image
            src={product.primary_image}
            alt={product.title}
            fill
            style={{ objectFit: "contain", padding: 16 }}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
      </div>
      <div style={{ padding: 14 }}>
        {product.purity && (
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--brand-2)", marginBottom: 4 }}>
            {product.purity} PURITY
          </div>
        )}
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{product.title}</div>
        {defaultVariant && (
          <div style={{ marginTop: 8, display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 11, color: "var(--ink-4)" }}>From</span>
            <span style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)" }}>
              ${defaultVariant.price}
            </span>
            {defaultVariant.compare_at_price && (
              <span style={{ fontSize: 12, color: "var(--ink-4)", textDecoration: "line-through" }}>
                ${defaultVariant.compare_at_price}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
