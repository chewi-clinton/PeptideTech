import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import PriceMatchInteractivity from "@/components/PriceMatchInteractivity";
import WholesalePriceList from "@/components/WholesalePriceList";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  try {
    const page = await api.pages.get("price-match");
    return buildMetadata({
      title: page.title,
      description: page.meta_description,
      keywords: ["peptide price list", "wholesale peptide pricing", "cheapest research peptides", "Peptech pricing"],
      path: "/pricelist",
    });
  } catch {
    return {};
  }
}

export default async function PriceMatchPage() {
  let page;
  try {
    page = await api.pages.get("price-match");
  } catch {
    notFound();
  }

  return (
    <PriceMatchInteractivity>
      <div className="container" style={{ padding: "40px 24px 0", maxWidth: 1040 }}>
        <WholesalePriceList />
      </div>
      <article
        className="pep-pdp-prose"
        style={{ fontSize: 14.5, lineHeight: 1.75, color: "var(--ink-2)" }}
        dangerouslySetInnerHTML={{ __html: page.body_html }}
      />
    </PriceMatchInteractivity>
  );
}
