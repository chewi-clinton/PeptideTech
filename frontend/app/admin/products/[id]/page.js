"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import AdminShell from "@/components/admin/AdminShell";
import ProductForm from "@/components/admin/ProductForm";

function EditProductView({ token }) {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    api.adminProducts
      .get(params.id, token)
      .then(setProduct)
      .catch(() => setError("Could not load this product."));
  }, [token, params.id]);

  if (error) return <p style={{ color: "var(--red)" }}>{error}</p>;
  if (!product) return <p style={{ color: "var(--ink-4)" }}>Loading…</p>;

  return (
    <div>
      <h1 style={{ fontSize: 26, color: "var(--ink)", marginBottom: 20 }}>Edit {product.title}</h1>
      <ProductForm token={token} product={product} />
    </div>
  );
}

export default function EditProductPage() {
  return <AdminShell>{(token) => <EditProductView token={token} />}</AdminShell>;
}
