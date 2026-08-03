import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import PriceMatchInteractivity from "@/components/PriceMatchInteractivity";

export async function generateMetadata() {
  try {
    const page = await api.pages.get("price-match");
    return { title: `${page.title} — Peptide Technologies`, description: page.meta_description };
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
      <article
        className="pep-pdp-prose"
        style={{ fontSize: 14.5, lineHeight: 1.75, color: "var(--ink-2)" }}
        dangerouslySetInnerHTML={{ __html: page.body_html }}
      />
    </PriceMatchInteractivity>
  );
}
