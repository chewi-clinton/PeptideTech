import { notFound } from "next/navigation";
import { api } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const page = await api.pages.get(slug);
    return { title: `${page.title} — Peptide Technologies`, description: page.meta_description };
  } catch {
    return {};
  }
}

export default async function StaticContentPage({ params }) {
  const { slug } = await params;
  let page;
  try {
    page = await api.pages.get(slug);
  } catch {
    notFound();
  }

  return (
    <article className="container" style={{ padding: "40px 24px", maxWidth: 820 }}>
      <h1 style={{ fontSize: 32 }}>{page.title}</h1>
      <div
        className="pep-pdp-prose"
        style={{ marginTop: 24, fontSize: 14.5, lineHeight: 1.75, color: "var(--ink-2)" }}
        dangerouslySetInnerHTML={{ __html: page.body_html }}
      />
    </article>
  );
}
