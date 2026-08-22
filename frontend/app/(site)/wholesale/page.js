import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import StaticInteractivity from "@/components/StaticInteractivity";
import WholesalePriceList from "@/components/WholesalePriceList";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  try {
    const page = await api.pages.get("wholesale");
    return buildMetadata({
      title: page.title,
      description: page.meta_description,
      keywords: [page.title, "wholesale peptide price list", "Peptide Technologies", "research peptides"],
      path: "/wholesale",
    });
  } catch {
    return {};
  }
}

export default async function WholesalePage() {
  let page;
  try {
    page = await api.pages.get("wholesale");
  } catch {
    notFound();
  }

  return (
    <StaticInteractivity>
      <div className="container" style={{ padding: "40px 24px 0", maxWidth: 1040 }}>
        <WholesalePriceList />
      </div>
      <article
        className="pep-pdp-prose"
        style={{ fontSize: 14.5, lineHeight: 1.75, color: "var(--ink-2)" }}
        dangerouslySetInnerHTML={{ __html: page.body_html }}
      />
    </StaticInteractivity>
  );
}
