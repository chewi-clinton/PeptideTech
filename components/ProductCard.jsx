import Image from "next/image";
import Link from "next/link";
import { IconCheck, IconClockSimple, IconFileText, IconIdentity, IconPlus } from "@/components/icons";

export default function ProductCard({ product }) {
  const defaultVariant = product.variants?.find((v) => v.is_default) || product.variants?.[0];
  const hasCoa = product.purity;
  const backordered = defaultVariant && !defaultVariant.in_stock;

  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <Link href={`/p/${product.slug}`} style={{ display: "block", position: "relative", aspectRatio: "1", background: "var(--bg-tint)" }}>
        {product.primary_image && (
          <Image
            src={product.primary_image}
            alt={product.title}
            fill
            style={{ objectFit: "contain", padding: 16 }}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
        <div style={{ position: "absolute", top: 10, left: 10, right: 10, display: "flex", justifyContent: "space-between" }}>
          {backordered ? (
            <span style={badgeStyle("var(--brand-tint)", "var(--brand-2)")}>
              <IconClockSimple size={11} />
              Backorder
            </span>
          ) : (
            <span />
          )}
          {hasCoa && (
            <span style={badgeStyle("var(--bg)", "var(--ink-3)")}>
              <IconIdentity size={11} />
              COA
            </span>
          )}
        </div>
      </Link>

      <div style={{ padding: "14px 14px 4px" }}>
        {product.category && (
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--brand-2)" }}>{product.category.name}</span>
        )}
        <Link href={`/p/${product.slug}`} style={{ display: "block", textDecoration: "none" }}>
          <div style={{ marginTop: 2, fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>{product.title}</div>
        </Link>

        <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--ink-4)" }}>From</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>
              ${defaultVariant?.price}
              {defaultVariant?.compare_at_price && (
                <span style={{ marginLeft: 6, fontSize: 12, fontWeight: 400, color: "var(--ink-4)", textDecoration: "line-through" }}>
                  ${defaultVariant.compare_at_price}
                </span>
              )}
            </div>
          </div>
          <Link
            href={`/p/${product.slug}`}
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "9px 14px", fontSize: 13, textDecoration: "none" }}
          >
            <IconPlus size={14} />
            Add
          </Link>
        </div>

        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 12 }}>
          <Link href={`/p/${product.slug}#coa`} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 600, color: "var(--brand-2)", textDecoration: "none" }}>
            <IconFileText size={13} />
            View COA
          </Link>
          {product.purity && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11.5, color: "var(--ink-3)", background: "var(--bg-tint)", padding: "3px 8px", borderRadius: 999 }}>
              <IconCheck size={10} style={{ color: "var(--brand-2)" }} />
              Purity {product.purity}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function badgeStyle(bg, color) {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    background: bg,
    color,
    fontSize: 10.5,
    fontWeight: 700,
    padding: "4px 8px",
    borderRadius: 999,
    boxShadow: "var(--shadow-sm)",
  };
}
