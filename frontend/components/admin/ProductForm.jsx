"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/lib/api";
import { IconPlus, IconX } from "@/components/icons";

const EMPTY_VARIANT = { label: "", sku: "", price: "", compare_at_price: "", in_stock: true, is_default: false };

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProductForm({ token, product }) {
  const isEdit = !!product;
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState(product?.title || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [categoryId, setCategoryId] = useState(product?.category?.id || "");
  const [shortDescription, setShortDescription] = useState(product?.short_description || "");
  const [purity, setPurity] = useState(product?.purity || "");
  const [isActive, setIsActive] = useState(product?.is_active ?? true);
  const [descriptionHtml, setDescriptionHtml] = useState(product?.description_html || "");
  const [faqHtml, setFaqHtml] = useState(product?.faq_html || "");
  const [variants, setVariants] = useState(
    product?.variants?.length ? product.variants : [{ ...EMPTY_VARIANT, is_default: true }]
  );
  const [images, setImages] = useState(product?.images || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.categories.list().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  function updateVariant(index, field, value) {
    setVariants((cur) => cur.map((v, i) => (i === index ? { ...v, [field]: value } : v)));
  }

  function setDefaultVariant(index) {
    setVariants((cur) => cur.map((v, i) => ({ ...v, is_default: i === index })));
  }

  function addVariant() {
    setVariants((cur) => [...cur, { ...EMPTY_VARIANT }]);
  }

  function removeVariant(index) {
    setVariants((cur) => cur.filter((_, i) => i !== index));
  }

  async function handleImageSelect(e) {
    const file = e.target.files?.[0];
    if (!file || !isEdit) return;
    setUploading(true);
    setError("");
    try {
      const created = await api.adminProducts.uploadImage(product.id, file, token, {
        isPrimary: images.length === 0,
      });
      setImages((cur) => [...cur, created]);
    } catch {
      setError("Image upload failed.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleImageDelete(imageId) {
    try {
      await api.adminProducts.deleteImage(product.id, imageId, token);
      setImages((cur) => cur.filter((img) => img.id !== imageId));
    } catch {
      setError("Could not remove image.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title,
      slug,
      category: categoryId || null,
      short_description: shortDescription,
      purity,
      is_active: isActive,
      description_html: descriptionHtml,
      faq_html: faqHtml,
      variants: variants.map((v) => ({
        ...(v.id ? { id: v.id } : {}),
        label: v.label,
        sku: v.sku,
        price: v.price,
        compare_at_price: v.compare_at_price || null,
        in_stock: !!v.in_stock,
        is_default: !!v.is_default,
      })),
    };

    try {
      if (isEdit) {
        await api.adminProducts.update(product.id, payload, token);
      } else {
        const created = await api.adminProducts.create(payload, token);
        router.push(`/admin/products/${created.id}`);
        return;
      }
      router.push("/admin/products");
    } catch (err) {
      setError("Could not save product. Check that the slug and SKUs are unique.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>
      {error && (
        <div className="card" style={{ padding: 12, background: "#fee2e2", border: "1px solid #fecaca", color: "#991b1b", fontSize: 13.5 }}>
          {error}
        </div>
      )}

      <div className="card" style={{ padding: 20, display: "grid", gap: 14 }}>
        <h2 style={{ fontSize: 16, margin: 0, color: "var(--ink)" }}>Basics</h2>
        <Field label="Title">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
        </Field>
        <Field label="Slug">
          <input
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            style={{ ...inputStyle, fontFamily: "var(--font-mono-stack)" }}
          />
        </Field>
        <div className="pep-admin-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Field label="Category">
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={inputStyle}>
              <option value="">— None —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Purity">
            <input value={purity} onChange={(e) => setPurity(e.target.value)} placeholder="e.g. ≥99%" style={inputStyle} />
          </Field>
        </div>
        <Field label="Short description">
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
          />
        </Field>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--ink-2)" }}>
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Active (visible in the shop)
        </label>
      </div>

      <div className="card" style={{ padding: 20, display: "grid", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: 16, margin: 0, color: "var(--ink)" }}>Variants</h2>
          <button type="button" onClick={addVariant} style={smallBtnStyle}>
            <IconPlus size={12} /> Add variant
          </button>
        </div>
        {variants.map((v, i) => (
          <div key={v.id || i} className="pep-admin-variant-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 0.7fr 0.7fr auto auto auto", gap: 8, alignItems: "center" }}>
            <input placeholder="Label (e.g. 5mg)" value={v.label} onChange={(e) => updateVariant(i, "label", e.target.value)} style={inputStyle} />
            <input placeholder="SKU" value={v.sku} onChange={(e) => updateVariant(i, "sku", e.target.value)} style={{ ...inputStyle, fontFamily: "var(--font-mono-stack)" }} />
            <input placeholder="Price" type="number" step="0.01" value={v.price} onChange={(e) => updateVariant(i, "price", e.target.value)} style={inputStyle} />
            <input placeholder="Compare at" type="number" step="0.01" value={v.compare_at_price || ""} onChange={(e) => updateVariant(i, "compare_at_price", e.target.value)} style={inputStyle} />
            <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "var(--ink-3)", whiteSpace: "nowrap" }}>
              <input type="checkbox" checked={!!v.in_stock} onChange={(e) => updateVariant(i, "in_stock", e.target.checked)} />
              In stock
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "var(--ink-3)", whiteSpace: "nowrap" }}>
              <input type="radio" name="default_variant" checked={!!v.is_default} onChange={() => setDefaultVariant(i)} />
              Default
            </label>
            <button type="button" onClick={() => removeVariant(i)} aria-label="Remove variant" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-4)" }}>
              <IconX size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 20, display: "grid", gap: 14 }}>
        <h2 style={{ fontSize: 16, margin: 0, color: "var(--ink)" }}>Images</h2>
        {isEdit ? (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {images.map((img) => (
                <div key={img.id} style={{ position: "relative", width: 80, height: 80, borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--line)" }}>
                  <Image src={img.image} alt="" fill style={{ objectFit: "contain", padding: 4 }} />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(img.id)}
                    aria-label="Remove image"
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "rgba(10,24,40,0.7)",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconX size={11} />
                  </button>
                </div>
              ))}
            </div>
            <div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} disabled={uploading} style={{ fontSize: 13 }} />
              {uploading && <span style={{ marginLeft: 10, fontSize: 12.5, color: "var(--ink-4)" }}>Uploading…</span>}
            </div>
          </>
        ) : (
          <p style={{ fontSize: 13, color: "var(--ink-4)", margin: 0 }}>Save the product first, then add images.</p>
        )}
      </div>

      <div className="card" style={{ padding: 20, display: "grid", gap: 14 }}>
        <h2 style={{ fontSize: 16, margin: 0, color: "var(--ink)" }}>Content (advanced)</h2>
        <Field label="Description HTML">
          <textarea
            value={descriptionHtml}
            onChange={(e) => setDescriptionHtml(e.target.value)}
            rows={6}
            style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--font-mono-stack)", fontSize: 12.5 }}
          />
        </Field>
        <Field label="FAQ HTML">
          <textarea
            value={faqHtml}
            onChange={(e) => setFaqHtml(e.target.value)}
            rows={6}
            style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--font-mono-stack)", fontSize: 12.5 }}
          />
        </Field>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button type="submit" disabled={saving} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          style={{ padding: "12px 20px", borderRadius: "var(--radius-md)", border: "1px solid var(--line)", background: "var(--bg)", fontSize: 14, fontWeight: 600, color: "var(--ink-2)", cursor: "pointer" }}
        >
          Cancel
        </button>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .pep-admin-form-row { grid-template-columns: 1fr !important; }
          .pep-admin-variant-row { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "grid", gap: 6, fontSize: 12.5, fontWeight: 600, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
      {label}
      {children}
    </label>
  );
}

const inputStyle = {
  padding: "10px 12px",
  border: "1px solid var(--line)",
  borderRadius: "var(--radius-md)",
  fontSize: 14,
  fontFamily: "inherit",
  fontWeight: 400,
  textTransform: "none",
  letterSpacing: "normal",
  background: "var(--bg)",
  color: "var(--ink)",
  width: "100%",
};

const smallBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "7px 12px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--brand)",
  background: "var(--brand-tint)",
  color: "var(--brand-2)",
  fontSize: 12.5,
  fontWeight: 600,
  cursor: "pointer",
};
