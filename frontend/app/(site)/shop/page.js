import { api } from "@/lib/api";
import ShopCatalog from "@/components/ShopCatalog";

export const metadata = { title: "Shop — Peptide Technologies" };

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    api.products.list().catch(() => []),
    api.categories.list().catch(() => []),
  ]);

  return <ShopCatalog products={products} categories={categories} />;
}
