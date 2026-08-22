import WholesalePriceList from "@/components/WholesalePriceList";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Wholesale Price List",
  description: "Full wholesale peptide price list — per-size pricing across our catalog, searchable by product or catalog number.",
  keywords: ["wholesale peptide price list", "Peptide Technologies", "research peptide pricing"],
  path: "/pricelist",
});

export default function PriceListPage() {
  return (
    <div className="container" style={{ padding: "40px 24px 80px", maxWidth: 1040 }}>
      <WholesalePriceList />
    </div>
  );
}
