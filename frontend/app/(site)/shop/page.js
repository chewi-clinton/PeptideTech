import { api } from "@/lib/api";
import ShopCatalog from "@/components/ShopCatalog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shop Research Peptides",
  description:
    "Browse the full Peptide Technologies catalog — research peptides, peptide blends, bioregulators, GLP-1 compounds, capsules, and lab supplies. Every batch COA-verified.",
  keywords: [
    "shop research peptides",
    "research peptides for sale",
    "buy peptides online",
    "peptide catalog",
    "Peptide Technologies",
  ],
  path: "/shop",
});

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    api.products.list().catch(() => []),
    api.categories.list().catch(() => []),
  ]);

  return <ShopCatalog products={products} categories={categories} />;
}
