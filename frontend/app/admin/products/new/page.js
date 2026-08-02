"use client";

import AdminShell from "@/components/admin/AdminShell";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <AdminShell>
      {(token) => (
        <div>
          <h1 style={{ fontSize: 26, color: "var(--ink)", marginBottom: 20 }}>Add product</h1>
          <ProductForm token={token} />
        </div>
      )}
    </AdminShell>
  );
}
