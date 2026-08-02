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

  // The scraped body_html already contains its own heading and layout
  // (some pages ship full custom designs with their own width/columns via
  // Tailwind utility classes reusing the same CSS variables this app
  // defines) — render it as-is rather than wrapping it in a second,
  // duplicate <h1> and an artificial max-width.
  // No outer max-width wrapper here: some pages (about, affiliates) ship
  // full-bleed sections with their own internal max-width via Tailwind
  // classes reusing this app's CSS variables — wrapping them would clip
  // their hero backgrounds. Plain-text legal pages get a readable line
  // length via the .pep-pdp-prose > p rule in globals.css instead.
  return (
    <article
      className="pep-pdp-prose"
      style={{ fontSize: 14.5, lineHeight: 1.75, color: "var(--ink-2)" }}
      dangerouslySetInnerHTML={{ __html: page.body_html }}
    />
  );
}
